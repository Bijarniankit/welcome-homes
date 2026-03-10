import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, ArrowRight, Palette, Hammer, Eye, CheckCircle, Star, ChevronRight } from 'lucide-react';
import { RevealOnScroll, StaggerContainer, StaggerItem, SectionLabel, TextReveal, ImageReveal, AnimatedLine } from '../components/AnimatedElements';
import { stats, whyChooseUs, projects, testimonials, siteConfig } from '../data/siteData';

const iconMap = { Palette, Hammer, Eye, CheckCircle };

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative h-screen min-h-150 max-h-250 overflow-hidden">
        {/* Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Custom home by Welcome Homes WA"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28 px-5 sm:px-8 lg:px-12 max-w-350 mx-auto"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/60 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 sm:mb-6"
            >
              Custom Home Builders &middot; Perth, WA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6 sm:mb-8"
            >
              Home that<br />
              <span className="italic">welcomes</span> you<br />
              everytime
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 bg-white text-charcoal-900 px-6 sm:px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-warm-100 transition-colors group"
              >
                View Our Work
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-6 sm:px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
                Start Your Build
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 right-5 sm:right-8 lg:right-12 hidden sm:flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-[10px] tracking-widest uppercase vertical-text"
              style={{ writingMode: 'vertical-lr' }}>
              Scroll
            </span>
            <motion.div
              animate={{ height: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px bg-white/40"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="section-slide bg-white border-b border-charcoal-100">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 mb-1">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-400 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE BUILD ===== */}
      <section className="section-slide section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>What We Build</SectionLabel>
              <TextReveal
                text="Custom homes designed around your lifestyle"
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight mb-6"
                tag="h2"
              />
              <RevealOnScroll delay={0.2}>
                <p className="text-charcoal-500 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  Every Welcome Homes WA build starts with your vision. We don't work from
                  templates — we design and build homes that are uniquely tailored to how you
                  live, entertain, and grow.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors group"
                >
                  Explore our services
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ImageReveal
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Custom home interior"
                className="rounded-2xl"
                aspectRatio="aspect-[3/4]"
              />
              <ImageReveal
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Modern home exterior"
                className="rounded-2xl mt-8 sm:mt-12"
                aspectRatio="aspect-[3/4]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-slide section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight whitespace-nowrap">
              <TextReveal
                text="Building with care, delivering with pride"
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight"
                tag="span"
              />
            </h2>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6" staggerDelay={0.1}>
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <StaggerItem key={i}>
                  <div className="group">
                    <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center mb-5 group-hover:bg-warm-200 transition-colors">
                      <Icon size={20} className="text-warm-600" />
                    </div>
                    <h3 className="text-lg font-normal text-charcoal-900 mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-slide section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <SectionLabel>Featured Projects</SectionLabel>
              <TextReveal
                text="Recent custom builds"
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
                tag="h2"
              />
            </div>
            <RevealOnScroll>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-900 transition-colors group"
              >
                View all projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 0.15}>
                <Link to={`/projects/${project.id}`} className="group block">
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <motion.img
                      src={project.hero}
                      alt={project.name}
                      loading="lazy"
                      className="w-full aspect-4/3 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-normal text-charcoal-900 tracking-tight group-hover:text-warm-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-charcoal-400 mt-1">
                        {project.location}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-charcoal-200 flex items-center justify-center mt-1 group-hover:bg-charcoal-900 group-hover:border-charcoal-900 group-hover:text-white transition-all">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FULL WIDTH IMAGE BREAK ===== */}
      <section className="section-slide relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
          alt="Custom home design"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <RevealOnScroll>
            <div className="text-center px-5">
              <p className="text-white/60 text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">Our Promise</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight max-w-2xl">
                A home built for you,<br />
                <span className="italic font-normal">not from a catalogue</span>
              </h2>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-slide section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <SectionLabel>Testimonials</SectionLabel>
            <TextReveal
              text="What our clients say"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
              tag="h2"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item, i) => (
              <RevealOnScroll key={item.id} delay={i * 0.12}>
                <div className="bg-warm-50 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(item.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-warm-500 text-warm-500" />
                    ))}
                  </div>
                  <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed grow mb-6">
                    "{item.quote}"
                  </p>
                  <AnimatedLine className="mb-5" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warm-200 flex items-center justify-center text-sm font-medium text-warm-700">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">{item.name}</p>
                      <p className="text-xs text-charcoal-400">{item.location} &middot; {item.project}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.3}>
            <div className="text-center mt-10">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-900 transition-colors group"
              >
                Read more testimonials
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* Parallax Image Component */
function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover absolute -top-[10%]"
      />
    </div>
  );
}
