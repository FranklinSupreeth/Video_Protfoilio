// HTML + plain-text email templates.
// Built with tables and inline styles so they render consistently in Gmail, Outlook and Apple Mail.

export const BRAND = {
  name: 'Franklin Supreeth',
  red: '#ff2a2a',
  black: '#0a0a0a',
  linkedin: 'https://www.linkedin.com/in/franklin-supreeth-230683294',
  github: 'https://github.com/FranklinSupreeth',
};

export const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (str) => escapeHtml(str).replace(/\r?\n/g, '<br />');

// Fallback avatar source when no hosted URL is available (embedded via CID).
export const AVATAR_CID = 'cid:franklin-avatar';

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const shell = ({ preheader, body }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <title>${escapeHtml(BRAND.name)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;font-family:${FONT};">
          ${body}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const header = (eyebrow, avatarSrc = AVATAR_CID) => `
  <tr>
    <td align="center" style="background:${BRAND.red};padding:40px 24px 32px;">
      <img src="${escapeHtml(avatarSrc)}" width="112" height="112" alt="${escapeHtml(BRAND.name)}" style="display:block;width:112px;height:112px;border-radius:50%;border:0;outline:none;text-decoration:none;margin:0 auto 18px;" />
      <div style="font-family:${FONT};font-size:24px;line-height:1.2;font-weight:900;letter-spacing:-0.5px;color:#ffffff;">
        Franklin Supreeth<span style="color:${BRAND.black};">.</span>
      </div>
      <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#ffe1e1;margin-top:8px;">
        ${escapeHtml(eyebrow)}
      </div>
    </td>
  </tr>`;

const button = (href, label, { primary = true } = {}) => `
  <a href="${href}" target="_blank" style="display:inline-block;padding:14px 26px;border-radius:999px;font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;${
    primary
      ? `background:${BRAND.red};color:#ffffff;`
      : `background:#ffffff;color:${BRAND.black};border:1px solid #d4d4d4;`
  }">${label}</a>`;

const footer = (siteUrl) => `
  <tr>
    <td style="background:${BRAND.black};padding:28px 32px;" align="center">
      <div style="font-family:${FONT};font-size:13px;color:#ffffff;font-weight:700;margin-bottom:10px;">
        <a href="${BRAND.linkedin}" target="_blank" style="color:#ffffff;text-decoration:underline;">LinkedIn</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="${BRAND.github}" target="_blank" style="color:#ffffff;text-decoration:underline;">GitHub</a>
        ${siteUrl ? `&nbsp;&nbsp;·&nbsp;&nbsp;<a href="${siteUrl}" target="_blank" style="color:#ffffff;text-decoration:underline;">Portfolio</a>` : ''}
      </div>
      <div style="font-family:${FONT};font-size:11px;color:#8a8a8a;letter-spacing:1px;">
        Full Stack Developer · Bengaluru, India
      </div>
    </td>
  </tr>`;

/* ------------------------------------------------------------------ */
/* Auto-reply sent to the person who filled in the form                */
/* ------------------------------------------------------------------ */
export const autoReplyEmail = ({ firstName, message, siteUrl, avatarSrc }) => {
  const name = escapeHtml(firstName || 'there');
  const html = shell({
    preheader: `Thanks for reaching out, ${firstName || 'there'}! You'll hear back within 24–48 hours.`,
    body: `
      ${header('Message received', avatarSrc)}
      <tr>
        <td style="padding:40px 36px 8px;">
          <h1 style="margin:0 0 16px;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:900;color:${BRAND.black};letter-spacing:-0.5px;">
            Thank you for contacting Franklin Supreeth
          </h1>
          <p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:#404040;">
            Hi ${name},
          </p>
          <p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:#404040;">
            Thanks for getting in touch! Your message has landed safely in my inbox and I'm looking forward to reading it properly.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff1f1;border-radius:16px;">
            <tr>
              <td style="padding:18px 20px;font-family:${FONT};font-size:15px;line-height:1.6;color:${BRAND.black};">
                <span style="font-size:20px;">⏱</span>&nbsp; <strong>You will get a reply within 24–48 hours.</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ${
        message
          ? `<tr>
        <td style="padding:28px 36px 0;">
          <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8a8a8a;margin-bottom:10px;">Your message</div>
          <div style="border-left:3px solid ${BRAND.red};background:#f7f7f7;border-radius:0 12px 12px 0;padding:16px 18px;font-family:${FONT};font-size:14px;line-height:1.7;color:#404040;">
            ${nl2br(message)}
          </div>
        </td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding:28px 36px 8px;">
          <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;line-height:1.7;color:#404040;">
            In the meantime, feel free to connect with me on LinkedIn or take a look at my recent work.
          </p>
          ${button(BRAND.linkedin, 'Connect on LinkedIn')}
          ${siteUrl ? `&nbsp; ${button(`${siteUrl}#projects`, 'View my work', { primary: false })}` : ''}
        </td>
      </tr>
      <tr>
        <td style="padding:28px 36px 40px;">
          <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.7;color:#404040;">
            Warm regards,<br />
            <strong style="color:${BRAND.black};">Franklin Supreeth</strong><br />
            <span style="color:#8a8a8a;font-size:13px;">Full Stack Developer</span>
          </p>
          <p style="margin:24px 0 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#a3a3a3;">
            This is an automatic confirmation — no need to reply to it. I'll write back to you personally.
          </p>
        </td>
      </tr>
      ${footer(siteUrl)}`,
  });

  const text = `Thank you for contacting Franklin Supreeth

Hi ${firstName || 'there'},

Thanks for getting in touch! Your message has landed safely in my inbox.
You will get a reply within 24–48 hours.
${message ? `\nYour message:\n${message}\n` : ''}
Connect with me on LinkedIn: ${BRAND.linkedin}
${siteUrl ? `See my work: ${siteUrl}\n` : ''}
Warm regards,
Franklin Supreeth
Full Stack Developer · Bengaluru, India`;

  return { html, text };
};

/* ------------------------------------------------------------------ */
/* Notification sent to Franklin                                        */
/* ------------------------------------------------------------------ */
export const notificationEmail = ({ firstName, lastName, email, message, ip, userAgent, avatarSrc }) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-family:${FONT};font-size:15px;color:${BRAND.black};vertical-align:top;">${value}</td>
    </tr>`;

  const html = shell({
    preheader: `${fullName}: ${message.slice(0, 90)}`,
    body: `
      ${header('New portfolio enquiry', avatarSrc)}
      <tr>
        <td style="padding:36px 36px 8px;">
          <h1 style="margin:0 0 20px;font-family:${FONT};font-size:22px;font-weight:900;color:${BRAND.black};">
            ${escapeHtml(fullName)} sent you a message
          </h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${row('Name', escapeHtml(fullName))}
            ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND.red};font-weight:700;">${escapeHtml(email)}</a>`)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 36px 0;">
          <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8a8a8a;margin-bottom:10px;">Message</div>
          <div style="border-left:3px solid ${BRAND.red};background:#f7f7f7;border-radius:0 12px 12px 0;padding:18px 20px;font-family:${FONT};font-size:15px;line-height:1.7;color:#262626;">
            ${nl2br(message)}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 36px 36px;">
          ${button(`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: your message to Franklin Supreeth')}`, `Reply to ${escapeHtml(firstName || 'sender')}`)}
          <p style="margin:24px 0 0;font-family:${FONT};font-size:11px;line-height:1.6;color:#a3a3a3;">
            An automatic thank-you has been sent to the sender.${ip ? ` · IP ${escapeHtml(ip)}` : ''}${userAgent ? `<br />${escapeHtml(userAgent.slice(0, 160))}` : ''}
          </p>
        </td>
      </tr>
      ${footer()}`,
  });

  const text = `New portfolio enquiry

Name: ${fullName}
Email: ${email}

Message:
${message}`;

  return { html, text };
};
