import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal, ImageReveal, StaggerContainer, StaggerItem, AnimatedLine } from '../components/AnimatedElements';
import { services } from '../data/siteData';

export default function Services() {
  return (
    <>
      {/* ===== HERO ===== */}
      <ServiceHero />

      {/* ===== CUSTOM HOMES ===== */}
      <section id="custom-homes" className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel>Primary Service</SectionLabel>
              <TextReveal
                text={services.customHomes.title}
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight mb-4"
                tag="h2"
              />
              <RevealOnScroll delay={0.1}>
                <p className="text-lg sm:text-xl text-charcoal-400 font-light tracking-tight mb-6">
                  {services.customHomes.subtitle}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-charcoal-500 text-base leading-relaxed mb-10">
                  {services.customHomes.description}
                </p>
              </RevealOnScroll>

              <StaggerContainer className="space-y-5" staggerDelay={0.08}>
                {services.customHomes.features.map((feature, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-warm-600" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-charcoal-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-charcoal-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <RevealOnScroll delay={0.3}>
                <Link
                  to="/contact#form"
                  className="inline-flex items-center gap-3 bg-charcoal-900 text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal-800 transition-colors mt-10 group"
                >
                  Discuss Your Custom Home
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </RevealOnScroll>
            </div>

            <div className="space-y-4 lg:sticky lg:top-28">
              <ImageReveal
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Custom home build"
                className="rounded-2xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILD PROCESS ===== */}
      <section className="section-slide section-padding bg-charcoal-900">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 sm:mb-20">
            <SectionLabel light>Our Process</SectionLabel>
            <TextReveal
              text="From vision to reality"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight"
              tag="h2"
            />
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-white/10" />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {services.customHomes.process.map((step, i) => (
                <RevealOnScroll key={i} delay={i * 0.12}>
                  <div className="text-center relative group">
                    <div className="w-14 h-14 rounded-full border-2 border-warm-500/30 bg-charcoal-800 flex items-center justify-center mx-auto mb-6 group-hover:border-warm-500 group-hover:bg-warm-500/10 transition-all duration-500">
                      <span className="text-sm font-medium text-warm-400 group-hover:text-warm-300 transition-colors">{step.step}</span>
                    </div>
                    <h3 className="text-base font-medium text-white tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-50 mx-auto">
                      {step.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEVELOPMENT / MULTI-LOT ===== */}
      <section id="development" className="section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="order-2 lg:order-1 space-y-4 lg:sticky lg:top-28">
              <ImageReveal
                src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80"
                alt="Development project"
                className="rounded-2xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>

            <div className="order-1 lg:order-2">
              <SectionLabel>Secondary Service</SectionLabel>
              <TextReveal
                text={services.development.title}
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight mb-4"
                tag="h2"
              />
              <RevealOnScroll delay={0.1}>
                <p className="text-lg sm:text-xl text-charcoal-400 font-light tracking-tight mb-6">
                  {services.development.subtitle}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-charcoal-500 text-base leading-relaxed mb-10">
                  {services.development.description}
                </p>
              </RevealOnScroll>

              <StaggerContainer className="space-y-5" staggerDelay={0.08}>
                {services.development.features.map((feature, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-warm-600" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-charcoal-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-charcoal-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <RevealOnScroll delay={0.3}>
                <Link
                  to="/contact#form"
                  className="inline-flex items-center gap-3 bg-charcoal-900 text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal-800 transition-colors mt-10 group"
                >
                  Discuss a Development Project
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[55vh] sm:h-[65vh] lg:h-[75vh] min-h-87.5 sm:min-h-125 overflow-hidden">
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80"
          alt="Our Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28 px-5 sm:px-8 lg:px-12 max-w-350 mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
        >
          Our Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl mb-6"
        >
          Crafting homes<br />
          with <span className="italic">precision</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <a
            href="#custom-homes"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Custom Homes
          </a>
          <a
            href="#development"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Development
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
