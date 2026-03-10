import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Instagram, Facebook, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';
import { useFadeIn } from '../hooks/useAnimations';

/* Separate CTA Section */
export function CTASection() {
  const { ref, isInView } = useFadeIn();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="bg-charcoal-900 py-20 sm:py-28 lg:py-32">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-warm-400 text-sm tracking-widest uppercase mb-4">
              Ready to start?
            </p>
            <h2 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-tight mb-6 max-w-3xl mx-auto">
              Let's build the home<br />you've been dreaming of.
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Start with a conversation. Tell us your vision and let's explore what's possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact#form"
                className="inline-flex items-center gap-3 bg-white text-charcoal-900 px-8 py-4 rounded-full text-sm tracking-wide hover:bg-warm-100 transition-colors group"
              >
                Start your journey
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white border-t border-white/5">
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-light tracking-tight">
                Welcome <span className="font-normal">Homes</span>
                <span className="text-warm-500 ml-1 text-sm opacity-60">WA</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Custom homes designed around the lifestyle of the owner. Building quality homes across Perth, Western Australia.
            </p>
            {/* Social */}
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
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Navigate</h4>
            <ul className="space-y-2.5">
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
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-white/30 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-white/50 hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/30 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-white/50 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/30 shrink-0 mt-0.5" />
                <span className="text-white/50">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-5">Hours</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white/70">8am - 5pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white/70">By appointment</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white/70">Closed</span>
              </li>
            </ul>
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
