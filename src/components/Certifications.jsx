import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import certifications from '../data/certifications';

// Every file in src/assets/certifications/, keyed by file name → built URL.
// Lets the data file refer to badges / certificates by plain file name.
const files = Object.fromEntries(
  Object.entries(
    import.meta.glob('../assets/certifications/*', { eager: true, query: '?url', import: 'default' })
  ).map(([path, url]) => [path.split('/').pop(), url])
);
const fileUrl = (name) => (name ? files[name] ?? null : null);

const visible = certifications.filter((c) => !c.pending);
// Tabs come from whatever categories the visible entries use, in order.
const categories = ['All', ...new Set(visible.map((c) => c.category))];

const ArrowUpRight = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ShieldCheck = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />
  </svg>
);

// Shown when a certification has no badge: a neutral certificate icon,
// never a made-up badge or a company logo.
const NoBadge = () => (
  <div className="w-[110px] h-[110px] rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center text-[#ff2a2a]">
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4 5h16v10H4zM8 9h8M8 12h5" />
      <circle cx="16.5" cy="16.5" r="2.5" strokeWidth="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 18.5V22l1.5-1 1.5 1v-3.5" />
    </svg>
  </div>
);

const CertCard = ({ cert }) => {
  const badge = fileUrl(cert.badge);
  const certificate = fileUrl(cert.certificateFile);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full rounded-[2rem] p-2 flex flex-col bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(0,0,0,0.13)] transition-[translate,box-shadow] duration-500"
    >
      <div className="flex-1 rounded-[1.5rem] p-6 flex flex-col bg-[#f4f4f4]">
        <div className="h-[130px] flex items-center justify-center mb-5">
          {badge ? (
            <img
              src={badge}
              alt={cert.badgeAlt ?? `${cert.name} badge`}
              loading="lazy"
              className="h-[110px] w-auto max-w-[200px] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.15)]"
            />
          ) : (
            <NoBadge />
          )}
        </div>

        <h3 className="text-lg font-black tracking-tight text-gray-900 leading-snug">{cert.name}</h3>
        {cert.issuer && <p className="text-sm font-bold text-gray-500 mt-1.5">{cert.issuer}</p>}
        {cert.issued && (
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#ff2a2a] mt-2">
            Issued {cert.issued}
          </p>
        )}
        {cert.extra && <p className="text-xs font-medium text-gray-500 leading-relaxed mt-3">{cert.extra}</p>}

        {(cert.credlyUrl || cert.verifyUrl || certificate) && (
          <div className="mt-auto pt-5 flex flex-wrap gap-2">
            {cert.credlyUrl && (
              <a
                href={cert.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} on Credly (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff2a2a] text-white text-xs font-bold shadow-[0_6px_16px_rgba(255,42,42,0.3)] hover:bg-black transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40"
              >
                <ShieldCheck /> Verify on Credly
              </a>
            )}
            {!cert.credlyUrl && cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff2a2a] text-white text-xs font-bold shadow-[0_6px_16px_rgba(255,42,42,0.3)] hover:bg-black transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40"
              >
                <ShieldCheck /> Verify credential
              </a>
            )}
            {certificate && (
              <a
                href={certificate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${cert.name} certificate (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-900 text-xs font-bold hover:bg-black hover:text-white hover:border-black transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40"
              >
                View Certificate <ArrowUpRight />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

const Certifications = () => {
  const [active, setActive] = useState('All');
  const shown = useMemo(
    () => (active === 'All' ? visible : visible.filter((c) => c.category === active)),
    [active]
  );

  return (
    <section
      id="certifications"
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Certifications
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Credentials I've earned
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            Verified badges and certificates in cybersecurity, data and development.
          </p>
        </div>

        {/* Filter tabs */}
        <div data-aos="fade-up" className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter certifications">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40 ${active === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence initial={false}>
            {shown.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
