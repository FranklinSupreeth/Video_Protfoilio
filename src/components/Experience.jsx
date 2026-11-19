import { useState } from 'react';

import aitchnuLogo from '../assets/experience/aitchnu-logo.png';
import aitchnuIcon from '../assets/experience/aitchnu-icon.png';
import nasscomLogo from '../assets/experience/nasscom-foundation-logo.png';
import capgeminiLogo from '../assets/experience/capgemini-logo.svg';
import dataScienceCert from '../assets/certifications/data-science-python-certificate.jpg';
import fullStackCert from '../assets/certifications/python-fullstack-internship-certificate.jpg';

// Newest first. `logos` with more than one entry render side by side
// with a "×" between them (used for partnership / CSR programs).
const experience = [
  {
    role: 'Data Science Intern',
    type: 'Training-Based Internship',
    company: 'Nasscom Foundation × Capgemini',
    program: 'CSR Program – AI for Skilling',
    dates: 'Jun 2026 – Sep 2026',
    location: 'Bengaluru · Offline',
    chipLogo: nasscomLogo,
    logos: [
      { src: nasscomLogo, alt: 'Nasscom Foundation logo' },
      { src: capgeminiLogo, alt: 'Capgemini logo' },
    ],
    points: [
      "Completed an offline Data Science with Python training program under Capgemini's CSR initiative, run by Nasscom Foundation",
      'Worked hands-on with Python, NumPy, Pandas, Matplotlib/Seaborn and Scikit-learn for data cleaning, analysis and visualisation',
      'Built and evaluated machine learning models (regression and classification) on real-world datasets',
      'Certified Gold grade (70%+) by nasscom IT-ITeS Sector Skills Council (FutureSkills Prime)',
      'Recognised by Kristu Jayanti University as an academic internship',
    ],
    stack: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    certificate: dataScienceCert,
    links: [
      { label: 'Nasscom Foundation', url: 'https://nasscomfoundation.org/' },
      { label: 'Capgemini', url: 'https://www.capgemini.com/' },
    ],
  },
  {
    role: 'Python Full Stack Intern',
    company: 'Aitch Nu Global Technologies Pvt. Ltd.',
    dates: 'Feb 2025 – Apr 2025',
    duration: '90 hours',
    location: 'Bengaluru',
    credentialId: 'Internship ID: ANGT/FEB/614910',
    chipLogo: aitchnuIcon,
    logos: [{ src: aitchnuLogo, alt: 'Aitch Nu Global Technologies logo' }],
    points: [
      'Completed a Python Full Stack internship covering front-end and back-end web development',
      'Applied concepts in practical assignments and met project deadlines as part of a team',
    ],
    stack: ['Python', 'Flask', 'Django', 'MySQL', 'JavaScript', 'Git'],
    certificate: fullStackCert,
    links: [{ label: 'Visit website', url: 'https://aitchnu.tech/' }],
  },
];

const FlipIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h5M20 20v-5h-5M5.1 15A7 7 0 0018.4 17M18.9 9A7 7 0 005.6 7" />
  </svg>
);

const ArrowUpRight = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/* ---------- Flip card ----------
   Both faces share one grid cell, so the card is as tall as its
   taller face — no fixed height needed for longer bullet lists. */
const ExperienceCard = ({ item, index }) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  const number = String(index + 1).padStart(2, '0');
  const pair = item.logos.length > 1;

  return (
    <div className="perspective-[1600px] w-full">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${item.role} at ${item.company}. ${flipped ? 'Showing company' : 'Flip to see company'}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        className={`grid cursor-pointer transform-3d transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40 rounded-[2rem] ${flipped ? 'rotate-y-180' : ''
          }`}
      >
        {/* ----- Front ----- */}
        <div className="[grid-area:1/1] backface-hidden rounded-[2rem] p-2 flex flex-col bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
          <div className="flex-1 rounded-[1.5rem] p-6 sm:p-8 flex flex-col bg-[#f4f4f4]">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xl font-bold font-serif italic text-gray-400">{number}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff2a2a] text-white text-[11px] font-black tracking-wide shadow-[0_6px_16px_rgba(255,42,42,0.3)]">
                  {item.dates}
                </span>
                {item.duration && (
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400">{item.duration}</span>
                )}
              </div>
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm p-2 flex items-center justify-center">
                <img src={item.chipLogo} alt="" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-snug">
              {item.role}
              {item.type && (
                <span className="block sm:inline text-sm sm:text-base font-bold text-gray-400 sm:ml-2">({item.type})</span>
              )}
            </h3>
            <p className="text-sm font-bold text-gray-700 mt-1">{item.company}</p>
            {(item.program || item.location) && (
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mt-1">
                {[item.program, item.location].filter(Boolean).join(' · ')}
              </p>
            )}

            <ul className="mt-5 space-y-2.5">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm sm:text-[15px] text-gray-600 font-medium leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#ff2a2a]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {item.credentialId && (
              <p className="mt-4 text-xs font-bold text-gray-500 tracking-wide">{item.credentialId}</p>
            )}

            <div className="mt-6 pt-5 border-t border-dashed border-gray-300 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {item.stack.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-600">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {item.certificate && (
                  <a
                    href={item.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? -1 : 0}
                    aria-label={`View ${item.role} certificate (opens in a new tab)`}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-[#ff2a2a] transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40"
                  >
                    View Certificate <ArrowUpRight />
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                  <FlipIcon /> Tap to flip
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----- Back ----- */}
        <div className="[grid-area:1/1] backface-hidden rotate-y-180 relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(255,42,42,0.35)] bg-[#ff2a2a]">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10 gap-6">
            {/* Logo plate */}
            <div
              className={`w-full max-w-xl bg-white rounded-[1.5rem] px-6 sm:px-10 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center justify-center gap-4 sm:gap-8 transition-all duration-700 delay-300 ${flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
            >
              {item.logos.map((logo, i) => (
                <div key={logo.alt} className="contents">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-3xl sm:text-4xl font-light text-gray-300 select-none">
                      ×
                    </span>
                  )}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`object-contain min-w-0 ${pair ? 'h-10 sm:h-14 max-w-[42%]' : 'h-14 sm:h-20 max-w-full'}`}
                  />
                </div>
              ))}
            </div>

            <div
              className={`transition-all duration-700 delay-[400ms] ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
            >
              <p className="text-white text-lg sm:text-xl font-black tracking-tight leading-snug">{item.company}</p>
              <p className="text-red-100 text-xs font-bold tracking-[0.2em] uppercase mt-1">
                {[item.dates, item.location].filter(Boolean).join(' · ')}
              </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {item.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/70">
                <FlipIcon /> Flip back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => (
  <section
    id="experience"
    className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
  >
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div data-aos="fade-up" className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
          Experience &amp; internships
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
          Where I've been working
        </h2>
        <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
          Hands-on roles in full stack development and data science. Tap any card to flip it and meet the company.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {experience.map((item, i) => (
          <div
            key={item.role}
            data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
            data-aos-delay="100"
            className={`${i % 2 === 0 ? 'md:-rotate-[0.6deg]' : 'md:rotate-[0.6deg]'} hover:rotate-0 transition-transform duration-500`}
          >
            <ExperienceCard item={item} index={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
