import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { navLinks, siteConfig } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link to="/" className="relative z-10 group">
              <span className={`text-lg sm:text-xl font-light tracking-[-0.04em] transition-colors duration-300 ${
                scrolled ? 'text-charcoal-900' : 'text-white'
              }`}>
                Welcome
                <span className="font-normal"> Homes</span>
                <span className="text-accent font-light ml-1 text-sm opacity-60">WA</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-[0.8125rem] tracking-wide transition-colors duration-300 ${
                    isActive(link.path)
                      ? scrolled ? 'text-charcoal-900' : 'text-white'
                      : scrolled
                        ? 'text-charcoal-500 hover:text-charcoal-900'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-px bg-current"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className={`ml-4 px-6 py-2.5 text-[0.8125rem] tracking-wide rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'bg-charcoal-900 text-white hover:bg-charcoal-800'
                    : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                }`}
              >
                Start Your Build
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-10 p-2 transition-colors ${
                isOpen ? 'text-charcoal-900' : scrolled ? 'text-charcoal-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="flex flex-col justify-center h-full px-8 pt-20">
              <nav className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between py-4 border-b border-charcoal-100 group ${
                        isActive(link.path) ? 'text-charcoal-900' : 'text-charcoal-400'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-light tracking-tight">
                        {link.name}
                      </span>
                      <ChevronRight
                        size={20}
                        className="text-charcoal-300 group-hover:text-charcoal-600 transition-all group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 space-y-2 text-sm text-charcoal-400"
              >
                <p>{siteConfig.phone}</p>
                <p>{siteConfig.email}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
