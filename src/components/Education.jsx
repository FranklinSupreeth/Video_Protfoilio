import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import kjPhoto from '../assets/education/kristu-jayanti.jpg';
import kjCrest from '../assets/education/kristu-jayanti-crest.png';
import seshadripuramCrest from '../assets/education/seshadripuram-crest.png';
import sfgcPhoto from '../assets/education/sfgc.jpg';
import scpucPhoto from '../assets/education/seshadripuram-puc.jpg';
import vpsPhoto from '../assets/education/vinayaka.jpg';
import vpsCrest from '../assets/education/vinayaka-crest.png';

// Newest first. `photo` is optional — without one the back of the card
// shows the crest on a red backdrop instead.
const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institute: 'Kristu Jayanti University',
    years: '2025 – 2027',
    current: true,
    url: 'https://kristujayanti.edu.in/',
    photo: kjPhoto,
    crest: kjCrest,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institute: 'Seshadripuram First Grade College',
    years: '2022 – 2025',
    url: 'https://www.sfgc.ac.in/',
    photo: sfgcPhoto,
    crest: seshadripuramCrest,
  },
  {
    degree: 'Pre-University Course (Computer Science & Accountancy)',
    institute: 'Seshadripuram Pre-University College',
    years: '2020 – 2022',
    url: 'https://www.scpuc.ac.in/',
    photo: scpucPhoto,
    crest: seshadripuramCrest,
  },
  {
    degree: 'Secondary School (10th Grade)',
    institute: 'Vinayaka Public School',
    years: '2019 – 2020',
    url: 'https://vinayakapublicschool.com/',
    photo: vpsPhoto,
    crest: vpsCrest,
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

/* ---------- Flip card ---------- */
const EducationCard = ({ item, index }) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="perspective-[1400px] w-full max-w-md">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${item.degree} at ${item.institute}. ${flipped ? 'Showing campus' : 'Flip to see campus'}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        className={`relative h-[300px] cursor-pointer transform-3d transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-4 focus-visible:ring-[#ff2a2a]/40 rounded-[2rem] ${flipped ? 'rotate-y-180' : ''
          }`}
      >
        {/* ----- Front ----- */}
        <div className="absolute inset-0 backface-hidden rounded-[2rem] p-2 flex flex-col items-center bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
          {/* Hole punch */}
          <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20" />
          </div>

          <div className="w-full flex-1 rounded-[1.5rem] mt-8 p-6 sm:p-7 flex flex-col bg-[#f4f4f4]">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xl font-bold font-serif italic text-gray-400">{number}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff2a2a] text-white text-[11px] font-black tracking-wide shadow-[0_6px_16px_rgba(255,42,42,0.3)]">
                {item.years}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-snug mb-2">
              {item.degree}
            </h3>
            <p className="text-sm font-bold text-gray-500">{item.institute}</p>

            <div className="mt-auto pt-4 flex items-center justify-between gap-3">
              {item.current ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#ff2a2a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-pulse" />
                  Pursuing
                </span>
              ) : (
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400">Completed</span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                <FlipIcon /> Tap to flip
              </span>
            </div>
          </div>
        </div>

        {/* ----- Back ----- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(255,42,42,0.35)] bg-[#ff2a2a]">
          {item.photo ? (
            <img
              src={item.photo}
              alt={`${item.institute} campus`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out ${flipped ? 'scale-100' : 'scale-110'
                }`}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[size:14px_14px]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pb-14">
            <div
              className={`w-24 h-24 rounded-full bg-white p-2.5 ring-4 ring-white/40 shadow-[0_15px_40px_rgba(0,0,0,0.45)] transition-all duration-700 delay-300 ${flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
            >
              <img src={item.crest} alt={`${item.institute} crest`} className="w-full h-full object-contain" />
            </div>

            <p
              className={`mt-4 text-white text-lg font-black tracking-tight leading-snug transition-all duration-700 delay-[400ms] ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
            >
              {item.institute}
            </p>
            <p
              className={`text-red-100 text-xs font-bold tracking-[0.2em] uppercase mt-1 transition-all duration-700 delay-500 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
            >
              {item.years}
            </p>

            <div className="absolute bottom-5 inset-x-5 flex items-center justify-between gap-3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={flipped ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-[#ff2a2a] hover:text-white transition-colors duration-300"
              >
                Visit website <ArrowUpRight />
              </a>
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

/* ---------- Timeline row ---------- */
const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-20 items-center">
      {/* Dot on the line */}
      <motion.span
        initial={{ scale: 0.6, backgroundColor: '#d1d5db' }}
        whileInView={{ scale: 1, backgroundColor: '#ff2a2a' }}
        viewport={{ once: false, margin: '0px 0px -45% 0px' }}
        transition={{ duration: 0.5 }}
        className="absolute left-[22px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-[0_0_0_2px_#e5e7eb,0_6px_16px_rgba(255,42,42,0.35)] z-10"
      />

      {/* Card */}
      <div
        data-aos={isLeft ? 'fade-right' : 'fade-left'}
        data-aos-delay="100"
        className={`pl-14 md:pl-0 flex ${isLeft ? 'md:justify-end md:col-start-1' : 'md:justify-start md:col-start-2 md:row-start-1'
          }`}
      >
        <div className={`w-full max-w-md ${isLeft ? 'md:-rotate-1' : 'md:rotate-1'} hover:rotate-0 transition-transform duration-500`}>
          <EducationCard item={item} index={index} />
        </div>
      </div>

      {/* Year label on the opposite side (desktop) */}
      <div
        data-aos="fade-up"
        data-aos-delay="250"
        className={`hidden md:flex ${isLeft ? 'md:col-start-2 justify-start' : 'md:col-start-1 md:row-start-1 justify-end'
          }`}
      >
        <span className="font-serif italic text-5xl lg:text-6xl font-bold text-gray-200 select-none">
          {item.years.split(' – ')[0]}
        </span>
      </div>
    </div>
  );
};

const Education = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const fillHeight = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="education"
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            My education
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Where I've been learning
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            From School in Yelahanka to a Master's in Computer Applications — tap any card to flip it and see the campus.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Base dashed line */}
          <div className="absolute top-0 bottom-0 left-[22px] md:left-1/2 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />
          {/* Scroll-revealed black line */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute top-0 left-[22px] md:left-1/2 -translate-x-1/2 overflow-hidden"
          >
            <div className="h-[4000px] border-l-2 border-dashed border-black" />
          </motion.div>

          <div className="flex flex-col gap-14 md:gap-20 py-4">
            {education.map((item, i) => (
              <TimelineItem key={item.degree} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* End marker */}
        <div
          data-aos="fade-in"
          data-aos-delay="300"
          className="hidden md:block text-center mt-12 font-['Caveat',cursive] text-3xl text-gray-600 -rotate-2"
        >
          …and still learning every day!
        </div>
      </div>
    </section>
  );
};

export default Education;
