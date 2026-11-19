import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Home', 'About', 'Skills', 'Experience', 'Education', 'Certifications', 'Projects', 'Contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const navRef = useRef(null);

  // Stronger glass once the page has scrolled
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.toLowerCase()))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape, outside click, or resize to desktop
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setIsOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const glass =
    isScrolled || isOpen
      ? 'bg-[#0a0a0a]/75 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]'
      : 'bg-black/25 border-white/15 shadow-[0_6px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]';

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 md:pt-4 pointer-events-none">
      <nav
        ref={navRef}
        aria-label="Main"
        className={`pointer-events-auto relative mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full border pl-5 pr-2 py-2 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ${glass}`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="shrink-0 text-white text-lg md:text-xl font-black tracking-tight whitespace-nowrap"
        >
          Franklin Supreeth
          <span className={`transition-colors duration-500 ${isScrolled || isOpen ? 'text-[#ff2a2a]' : 'text-black'}`}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  onClick={(e) => scrollToSection(e, id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/15 border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-[#ff2a2a] text-white text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_6px_20px_rgba(255,42,42,0.35)]"
          >
            Hire Me
          </a>

          {/* Hamburger (mobile + tablet) */}
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-[5px] text-white hover:bg-white/20 transition-colors"
          >
            <span
              className={`block w-4 h-0.5 bg-current rounded-full transition-transform duration-300 ${
                isOpen ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current rounded-full transition-transform duration-300 ${
                isOpen ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile / tablet dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute left-0 right-0 top-full mt-2 rounded-3xl border border-white/10 bg-black/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-2 origin-top"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const id = link.toLowerCase();
                  const isActive = active === id;
                  return (
                    <li key={link}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => scrollToSection(e, id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                          isActive ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a]" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="sm:hidden mt-2 block w-full text-center px-6 py-3 rounded-2xl bg-[#ff2a2a] text-white font-black hover:bg-white hover:text-black transition-colors"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
