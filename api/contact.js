// POST /api/contact
// Sends the form submission to Franklin over SMTP and an automatic
// thank-you reply to the sender. Runs as a Vercel serverless function,
// and locally through the dev middleware in vite.config.js.
import nodemailer from 'nodemailer';
import { AVATAR_CID, autoReplyEmail, notificationEmail } from './_lib/emails.js';
import { AVATAR_PNG_BASE64 } from './_lib/avatar.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { firstName: 60, lastName: 60, email: 254, message: 5000 };

// Best-effort rate limit (per warm function instance): 5 messages / 10 min / IP.
const hits = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};

let transporter;
const getTransporter = () => {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
};

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
// Strip CR/LF so values can't inject extra mail headers.
const oneLine = (v) => v.replace(/[\r\n]+/g, ' ');

export function validate(body = {}) {
  const data = {
    firstName: oneLine(clean(body.firstName, LIMITS.firstName)),
    lastName: oneLine(clean(body.lastName, LIMITS.lastName)),
    email: oneLine(clean(body.email, LIMITS.email)),
    message: clean(body.message, LIMITS.message),
  };
  const errors = {};
  if (!data.firstName) errors.firstName = 'Please enter your first name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.message.length < 10) errors.message = 'Please write a message of at least 10 characters.';
  if (body.consent !== true) errors.consent = 'Please allow me to contact you at this email.';
  return { data, errors };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const missing = ['SMTP_USER', 'SMTP_PASS'].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error('Contact form: missing env vars', missing);
    return res.status(500).json({ ok: false, error: 'Email service is not configured yet.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid request.' });
    }
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body?.company) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '')
    .split(',')[0]
    .trim();
  if (isRateLimited(ip || 'unknown')) {
    return res.status(429).json({ ok: false, error: 'Too many messages — please try again in a few minutes.' });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', fields: errors });
  }

  const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
  const ownerEmail = process.env.CONTACT_TO || process.env.SMTP_USER;
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
  const from = { name: 'Franklin Supreeth', address: fromAddress };
  // The profile picture is loaded from the live site (public/email/franklin-avatar.png),
  // so it shows inside the email design and never appears as an attachment.
  // Only when SITE_URL isn't set do we fall back to an inline CID image.
  // Bump `?v=` whenever the picture changes so mail-client image caches refresh.
  const avatarSrc = siteUrl ? `${siteUrl}/email/franklin-avatar.png?v=3` : AVATAR_CID;
  const attachments = siteUrl
    ? []
    : [
        {
          filename: 'franklin-supreeth.png',
          content: Buffer.from(AVATAR_PNG_BASE64, 'base64'),
          cid: AVATAR_CID.replace('cid:', ''),
          contentType: 'image/png',
          contentDisposition: 'inline',
        },
      ];
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  try {
    const mailer = getTransporter();
    const notify = notificationEmail({ ...data, ip, userAgent: req.headers['user-agent'] || '', avatarSrc });
    const reply = autoReplyEmail({ firstName: data.firstName, message: data.message, siteUrl, avatarSrc });

    // 1) Message to Franklin — "Reply" goes straight to the sender.
    await mailer.sendMail({
      from: { name: 'Portfolio Contact Form', address: fromAddress },
      to: ownerEmail,
      replyTo: { name: fullName, address: data.email },
      subject: `New message from ${fullName}`,
      html: notify.html,
      text: notify.text,
      attachments,
    });

    // 2) Automatic thank-you to the sender. A failure here shouldn't fail
    //    the request, because Franklin already has the message.
    try {
      await mailer.sendMail({
        from,
        to: { name: fullName, address: data.email },
        replyTo: ownerEmail,
        subject: 'Thank you for contacting Franklin Supreeth',
        html: reply.html,
        text: reply.text,
        attachments,
      });
    } catch (err) {
      console.error('Contact form: auto-reply failed', err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form: send failed', err);
    return res.status(502).json({ ok: false, error: "Couldn't send your message right now. Please try again shortly." });
  }
}
