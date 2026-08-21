import React from 'react';

const projects = [
  {
    title: 'TimeAura',
    tag: 'E-commerce',
    desc: 'A full-stack watch store with a cart context, checkout flow, and a production deployment on Vercel — including a fix for Express\'s app.listen() incompatibility on serverless.',
    stack: ['React', 'Node.js', 'Vercel'],
  },
  {
    title: 'The Vault of Seven',
    tag: 'Machine Learning',
    desc: 'A Flask app wrapping seven Hugging Face NLP and vision pipelines behind a themed UI — persistent instrument rail, glass console panel, and playful emoji reactions.',
    stack: ['Flask', 'Hugging Face', 'Python'],
  },
  {
    title: 'NeuroScan AI',
    tag: 'Machine Learning',
    desc: 'Brain tumor MRI classification using a hand-crafted HOG + LBP + GLCM feature pipeline feeding an SVM classifier, wrapped in a navy-to-teal branded interface.',
    stack: ['Flask', 'scikit-learn', 'OpenCV'],
  },
  {
    title: 'Nike Clone',
    tag: 'E-commerce',
    desc: 'A pixel-conscious clone of the Nike e-commerce experience, focused on responsive layout, product browsing, and clean component architecture.',
    stack: ['React', 'Tailwind CSS'],
  },
  {
    title: 'Melody Madness',
    tag: 'Web App',
    desc: 'A music discovery and playback app built around a clean, dark-themed listening experience.',
    stack: ['React', 'Flask'],
  },
  {
    title: 'Portfolio Website',
    tag: 'Web App',
    desc: 'A personal portfolio with a working contact form (migrated from Zapier to EmailJS), deployed and iterated through several rounds of UI polish.',
    stack: ['React', 'EmailJS', 'Netlify'],
  },
];

const ProjectCard = ({ project, delay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="group bg-[#f4f4f4] hover:bg-[#ff2a2a] rounded-[1.75rem] p-8 flex flex-col justify-between min-h-[280px] transition-colors duration-500 border border-gray-200 hover:border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(255,42,42,0.35)]"
  >
    <div>
      <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white text-gray-500 group-hover:bg-black/20 group-hover:text-white mb-6 transition-colors duration-500">
        {project.tag}
      </span>
      <h3 className="text-2xl font-black text-gray-900 group-hover:text-white mb-3 tracking-tight transition-colors duration-500">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed font-medium text-gray-500 group-hover:text-red-50 transition-colors duration-500">
        {project.desc}
      </p>
    </div>
    <div className="flex flex-wrap gap-2 mt-6">
      {project.stack.map((s) => (
        <span
          key={s}
          className="text-xs font-bold px-3 py-1 rounded-full bg-white text-gray-600 group-hover:bg-black/20 group-hover:text-white transition-colors duration-500"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-white pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="max-w-2xl mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Selected work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            A few projects I've shipped
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            From e-commerce builds to machine-learning-powered apps — deployed, debugged, and live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={100 * (i % 3)} />
          ))}
        </div>

        <div data-aos="fade-up" className="mt-14 flex justify-center">
          <a
            href="https://github.com/FranklinSupreeth"
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
