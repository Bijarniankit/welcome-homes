import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';
import { useFadeIn } from '../hooks/useAnimations';

export default function Footer() {
  const { ref, isInView } = useFadeIn();

  return (
    <footer ref={ref} className="bg-charcoal-900 text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-warm-400 text-sm tracking-widest uppercase mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight mb-8">
              Let's build the home<br />you've been dreaming of.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-lg text-white/80 group-hover:text-white transition-colors">
                Start your journey
              </span>
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-charcoal-900 transition-all">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-light tracking-tight">
                Welcome <span className="font-normal">Homes</span>
                <span className="text-warm-500 ml-1 text-sm opacity-60">WA</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Custom homes designed around the lifestyle of the owner. Building quality homes across Perth, Western Australia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Follow</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
