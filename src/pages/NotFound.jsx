import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-warm-50 flex items-center justify-center px-5 sm:px-8">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-heading text-8xl sm:text-9xl text-charcoal-200 leading-none mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-charcoal-900 mb-3">
            Page not found
          </h2>
          <p className="text-charcoal-400 text-base leading-relaxed mb-10">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-charcoal-900 text-white px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-charcoal-800 transition-colors group"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-charcoal-200 text-charcoal-600 px-7 py-3.5 rounded-full text-sm tracking-wide hover:border-charcoal-400 hover:text-charcoal-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-warm-300" />
            <span className="text-xs text-warm-400 tracking-widest uppercase">Welcome Homes WA</span>
            <div className="w-8 h-px bg-warm-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
