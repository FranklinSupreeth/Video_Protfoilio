import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const LINKEDIN = 'https://www.linkedin.com/in/franklin-supreeth-230683294';
const GITHUB = 'https://github.com/FranklinSupreeth';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialForm = { firstName: '', lastName: '', email: '', message: '', consent: false, company: '' };

const validate = (f) => {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.';
  if (!f.consent) e.consent = 'Please allow me to contact you at this email.';
  return e;
};

const inputBase =
  'w-full bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors placeholder-white/90 font-medium rounded-none text-white';

const FieldError = ({ msg }) =>
  msg ? (
    <p className="mt-2 text-xs font-bold text-black flex items-center gap-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black" />
      {msg}
    </p>
  ) : null;

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const [sentTo, setSentTo] = useState({ name: '', email: '' });

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSentTo({ name: form.firstName.trim(), email: form.email.trim() });
      setForm(initialForm);
      setStatus('success');
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const borderFor = (key) => (errors[key] ? 'border-black' : 'border-white/40 focus:border-white');

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-gray-900"
    >
      {/* Huge Background Text */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div
          data-aos="fade-up"
          className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-6 sm:p-8 md:p-16 text-white flex flex-col justify-between"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 md:mb-20">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90 mb-3">Reach Me</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Let's build something<span className="text-black">.</span>
              </h2>
            </div>
            <div className="flex gap-3 text-sm font-bold">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/40 hover:bg-white hover:text-[#ff2a2a] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/40 hover:bg-white hover:text-[#ff2a2a] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start gap-6 py-6 md:py-10"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-white text-[#ff2a2a] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    Thank you{sentTo.name ? `, ${sentTo.name}` : ''}!
                  </h3>
                  <p className="text-base md:text-lg font-semibold text-red-50 max-w-xl leading-relaxed">
                    Your message is on its way. A confirmation has been sent to{' '}
                    <span className="text-black font-black break-all">{sentTo.email}</span> — you'll get a reply within
                    24–48 hours.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-white text-[#ff2a2a] font-black hover:bg-black hover:text-white transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 rounded-full border border-white/40 font-bold hover:bg-white hover:text-[#ff2a2a] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-12 md:gap-16 w-full"
              >
                {/* Honeypot (hidden from people, catches bots) */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} />
                </div>

                <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full">
                  {/* Left Column */}
                  <div className="flex-1 flex flex-col gap-10">
                    <div>
                      <label htmlFor="firstName" className="sr-only">First name</label>
                      <input
                        type="text"
                        id="firstName"
                        autoComplete="given-name"
                        placeholder="First Name *"
                        value={form.firstName}
                        onChange={update('firstName')}
                        aria-invalid={!!errors.firstName}
                        className={`${inputBase} ${borderFor('firstName')}`}
                      />
                      <FieldError msg={errors.firstName} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="sr-only">Last name</label>
                      <input
                        type="text"
                        id="lastName"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={update('lastName')}
                        className={`${inputBase} ${borderFor('lastName')}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={update('email')}
                        aria-invalid={!!errors.email}
                        className={`${inputBase} ${borderFor('email')}`}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      placeholder="Type your message here *"
                      value={form.message}
                      onChange={update('message')}
                      maxLength={5000}
                      aria-invalid={!!errors.message}
                      className={`${inputBase} ${borderFor('message')} flex-1 min-h-[160px] resize-none`}
                    />
                    <FieldError msg={errors.message} />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-12 md:items-end">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 text-sm font-medium text-white/90">
                      <input
                        type="checkbox"
                        id="permission"
                        checked={form.consent}
                        onChange={update('consent')}
                        aria-invalid={!!errors.consent}
                        className="mt-1 w-4 h-4 shrink-0 rounded-sm cursor-pointer"
                        style={{ accentColor: 'white' }}
                      />
                      <label htmlFor="permission" className="cursor-pointer max-w-[300px] leading-snug">
                        I give permission to contact me at this email address.
                      </label>
                    </div>
                    <FieldError msg={errors.consent} />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 text-xs text-white/75 font-medium">
                    <p className="max-w-[260px] leading-relaxed">
                      Your details are only used to reply to you. You'll get an instant confirmation email.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="px-8 py-3 rounded-full bg-white text-[#ff2a2a] text-base font-black flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300 group whitespace-nowrap self-start sm:self-auto disabled:opacity-70 disabled:cursor-wait shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {status === 'error' && serverError && (
                  <div role="alert" className="rounded-2xl bg-black/25 border border-black/20 px-5 py-4 text-sm font-bold text-white">
                    {serverError}
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
