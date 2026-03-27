import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
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

  const closeMenu = () => setIsOpen(false);

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
            <Link to="/" onClick={closeMenu} className="relative z-60 group">
              <img
                src={scrolled && !isOpen ? '/logo2.png' : isOpen ? '/logo2.png' : '/logo1.png'}
                alt="Welcome Homes WA"
                className="h-12 sm:h-14 w-auto transition-opacity duration-300"
                style={!scrolled && !isOpen ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
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
                onClick={closeMenu}
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
              className={`lg:hidden relative z-60 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                isOpen
                  ? 'bg-charcoal-100 text-charcoal-900'
                  : scrolled
                    ? 'text-charcoal-900'
                    : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X size={20} strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Menu size={20} strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ===== MOBILE MENU (LIGHT) ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 lg:hidden bg-white"
          >
            {/* Content */}
            <div className="flex flex-col justify-center h-full px-8 sm:px-12">
              {/* Navigation links */}
              <nav className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className="group flex items-center gap-3 py-3"
                    >
                      <span className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors ${
                        isActive(link.path)
                          ? 'text-charcoal-900'
                          : 'text-charcoal-300 group-hover:text-charcoal-600'
                      }`}>
                        {link.name}
                      </span>
                      {isActive(link.path) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                          className="w-1.5 h-1.5 rounded-full bg-warm-500 mt-1"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-6 border-t border-charcoal-100"
              >
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal-700 transition-colors"
                >
                  <Phone size={14} />
                  {siteConfig.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
