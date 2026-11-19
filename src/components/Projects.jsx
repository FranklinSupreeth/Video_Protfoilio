import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import intellilearnImg from '../assets/projects/intellilearn.jpg';
import nikeImg from '../assets/projects/nike.jpg';
import timeauraImg from '../assets/projects/timeaura.jpg';
import melodyImg from '../assets/projects/melody.jpg';
import neuroscanImg from '../assets/projects/neuroscan.jpg';
import riceImg from '../assets/projects/rice.jpg';
import rrgiftsImg from '../assets/projects/rrgifts.jpg';
import portfolioFsImg from '../assets/projects/portfolio-fs.jpg';

const GITHUB_PROFILE = 'https://github.com/FranklinSupreeth';

// To add a link later, fill in `liveUrl` / `githubUrl`.
// A project with no `image` shows a "Preview coming soon" banner;
// a project with no `liveUrl` shows a disabled "Coming soon" button.
const projects = [
  {
    title: 'RR Gifts',
    tag: 'Client Project',
    desc: 'A custom gifting storefront built for a client — product catalogue, personalised gift options, and a smooth checkout experience.',
    stack: ['React', 'Node.js', 'Payments'],
    image: rrgiftsImg,
    liveUrl: 'https://rr-gifts.vercel.app/',
    githubUrl: '',
  },
  {
    title: 'IntelliLearn',
    tag: 'Web App',
    desc: 'A learning management platform with student, faculty and admin roles — lectures, assignments, quizzes, weak-topic detection and a course-aware AI tutor.',
    stack: ['React', 'LMS', 'AI Tutor'],
    image: intellilearnImg,
    liveUrl: 'https://intellilearn-eight.vercel.app/login',
    githubUrl: '',
  },
  {
    title: 'TimeAura',
    tag: 'E-commerce',
    desc: 'A luxury watch store with collections, cart and an integrated payment gateway, deployed on Vercel with a serverless-ready Express backend.',
    stack: ['React', 'Node.js', 'Payments'],
    image: timeauraImg,
    liveUrl: 'https://timeaura-psi.vercel.app/',
    githubUrl: 'https://github.com/FranklinSupreeth/TimeAura_E-Commerce',
  },
  {
    title: 'Nike Store',
    tag: 'E-commerce',
    desc: 'A Nike-inspired sneaker store with wishlist, cart, user profiles and a payment gateway at checkout — built around a bold dark, lime-accented UI.',
    stack: ['JavaScript', 'PHP', 'Payments'],
    image: nikeImg,
    liveUrl: 'https://nikeecommerce-dun.vercel.app/',
    githubUrl: 'https://github.com/FranklinSupreeth/Nike-Ecommerce',
  },
  {
    title: 'NeuroScan',
    tag: 'Machine Learning',
    desc: 'Brain MRI tumour classifier using HOG + LBP + GLCM features and an SVM — 90.8% test accuracy, served with Flask.',
    stack: ['Python', 'Flask', 'scikit-learn'],
    image: neuroscanImg,
    liveUrl: 'https://neuroscan-kwg9.onrender.com/',
    githubUrl: 'https://github.com/FranklinSupreeth/NeuroScan',
  },
  {
    title: 'Rice Grain Classifier',
    tag: 'Machine Learning',
    desc: 'Upload a grain sample and the model identifies the rice variety along with its confidence score, in a clean, warm-toned web interface.',
    stack: ['Python', 'Flask', 'Deep Learning'],
    image: riceImg,
    liveUrl: 'https://rice-ml-model-2-albz.onrender.com/',
    githubUrl: 'https://github.com/FranklinSupreeth/rice_ml_model',
  },
  {
    title: 'Melody Madness',
    tag: 'Web App',
    desc: 'A music streaming app for discovering and playing tracks — trending charts, song search and a sleek dark listening experience.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: melodyImg,
    liveUrl: 'https://melodymadness.netlify.app/',
    githubUrl: 'https://github.com/FranklinSupreeth/Music_player',
  },
  {
    title: 'Personal Portfolio',
    tag: 'Web App',
    desc: 'My earlier personal portfolio — an editorial red-and-cream design showcasing my skills, education, internship, projects and certifications, with a working EmailJS contact form.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: portfolioFsImg,
    liveUrl: 'https://franklin-supreeth-fs.netlify.app/',
    githubUrl: '',
  },
];

const filters = ['All', 'Client Project', 'Web App', 'E-commerce', 'Machine Learning'];

const hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/* ---------- Icons ---------- */
const ArrowUpRight = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 015.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54 4.46-1.49 7.68-5.7 7.68-10.67C23.25 5.48 18.27.5 12 .5z" />
  </svg>
);

const LockIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="2" />
    <path strokeLinecap="round" strokeWidth="2" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const GiftIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);

/* ---------- Browser frame bar ---------- */
const BrowserBar = ({ url }) => (
  <div className="flex items-center gap-2 px-3 py-2 border-b bg-white border-gray-200">
    <div className="flex gap-1 shrink-0">
      <span className="w-2 h-2 rounded-full bg-[#ff2a2a]" />
      <span className="w-2 h-2 rounded-full bg-gray-300" />
      <span className="w-2 h-2 rounded-full bg-gray-300" />
    </div>
    <div className="flex-1 min-w-0 truncate text-[10px] font-semibold rounded-full px-3 py-0.5 text-center bg-[#f4f4f4] text-gray-400">
      {url}
    </div>
  </div>
);

/* ---------- Action buttons ---------- */
const btnBase =
  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300';

const LiveButton = ({ href }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} bg-[#ff2a2a] text-white hover:bg-black shadow-[0_6px_16px_rgba(255,42,42,0.25)]`}
    >
      Live demo
      <ArrowUpRight />
    </a>
  ) : (
    <span className={`${btnBase} bg-gray-200 text-gray-400 cursor-not-allowed`}>Coming soon</span>
  );

const GithubButton = ({ href }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} border border-gray-300 text-gray-900 hover:bg-black hover:text-white hover:border-black`}
    >
      <GithubIcon />
      GitHub
    </a>
  ) : (
    <span
      title="Source code is private"
      className={`${btnBase} border border-dashed border-gray-300 text-gray-400 cursor-not-allowed`}
    >
      <LockIcon />
      Private repo
    </span>
  );

/* ---------- Banner ---------- */
const Banner = ({ project }) => {
  const inner = project.image ? (
    <>
      <img
        src={project.image}
        alt={`${project.title} homepage screenshot`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      {project.liveUrl && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500 flex items-center justify-center">
          <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-bold shadow-xl">
            Visit live site <ArrowUpRight />
          </span>
        </div>
      )}
    </>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center text-center bg-[#0b0b0b] bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.18),transparent_70%)]">
      <div className="w-11 h-11 rounded-xl bg-[#ff2a2a] text-white flex items-center justify-center mb-3 shadow-[0_8px_24px_rgba(255,42,42,0.45)] transition-transform duration-500 group-hover:scale-110">
        <GiftIcon className="w-5 h-5" />
      </div>
      <p className="text-white font-black text-base tracking-tight">{project.title}</p>
      <p className="text-white/40 text-[11px] font-semibold mt-1">Preview coming soon</p>
    </div>
  );

  const frame = (
    <>
      <BrowserBar url={project.liveUrl ? hostOf(project.liveUrl) : 'link coming soon'} />
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">{inner}</div>
    </>
  );

  const cls = 'block rounded-[1rem] overflow-hidden bg-white border border-gray-200';

  return project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} live site`}
      className={cls}
    >
      {frame}
    </a>
  ) : (
    <div className={cls}>{frame}</div>
  );
};

/* ---------- Project card ---------- */
const ProjectCard = ({ project, index }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-[#f4f4f4] rounded-[1.4rem] p-2.5 flex flex-col border border-gray-200 hover:border-[#ff2a2a]/40 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,42,42,0.16)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-500"
  >
    <Banner project={project} />

    <div className="px-3 pt-4 pb-2 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-block text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${
            project.tag === 'Client Project' ? 'bg-[#ff2a2a] text-white' : 'bg-white text-gray-500'
          }`}
        >
          {project.tag}
        </span>
        <span className="text-sm font-bold font-serif italic text-gray-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-lg font-black text-gray-900 group-hover:text-[#ff2a2a] mb-2 tracking-tight transition-colors duration-500">
        {project.title}
      </h3>
      <p className="text-[13px] leading-relaxed font-medium text-gray-500 mb-4 line-clamp-3">{project.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((s) => (
          <span key={s} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white text-gray-600">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <LiveButton href={project.liveUrl} />
        <GithubButton href={project.githubUrl} />
      </div>
    </div>
  </motion.article>
);

const Projects = () => {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <section
      id="projects"
      className="bg-white pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div data-aos="fade-up" className="max-w-2xl">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Selected work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              A few projects I've shipped
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
              From e-commerce builds with payment gateways to machine-learning-powered apps — deployed, debugged, and live.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end lg:max-w-sm" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors duration-300 ${
                  active === f
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="flex flex-wrap justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div data-aos="fade-up" className="mt-14 flex justify-center">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-900 font-bold flex items-center gap-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
          >
            View more on GitHub
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
