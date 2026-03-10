import { motion } from 'motion/react';

/* Reveal-on-scroll wrapper */
export function RevealOnScroll({ children, delay = 0, direction = 'up', className = '' }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger children animations */
export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Text reveal line by line */
export function TextReveal({ text, className = '', tag = 'h2' }) {
  const words = text.split(' ');
  const Tag = tag;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Image with reveal effect */
export function ImageReveal({ src, alt, className = '', aspectRatio = 'aspect-[4/3]', loading = 'lazy' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden ${aspectRatio} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
      />
    </motion.div>
  );
}

/* Section label/overline */
export function SectionLabel({ children, light = false }) {
  return (
    <RevealOnScroll>
      <p className={`text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6 ${
        light ? 'text-white/50' : 'text-warm-500'
      }`}>
        {children}
      </p>
    </RevealOnScroll>
  );
}

/* Magnetic button effect */
export function MagneticButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* Counter animation */
export function AnimatedCounter({ target, suffix = '', className = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {target}{suffix}
    </motion.span>
  );
}

/* Horizontal line animation */
export function AnimatedLine({ className = '' }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`h-px bg-charcoal-200 origin-left ${className}`}
    />
  );
}
