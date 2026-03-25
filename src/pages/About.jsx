import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Heart, Shield, MessageCircle, Clock, Play } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal, ImageReveal, StaggerContainer, StaggerItem, AnimatedLine } from '../components/AnimatedElements';
import { founderStory, stats } from '../data/siteData';

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const philosophyIcons = [Heart, Shield, MessageCircle, Clock];

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[55vh] sm:h-[65vh] lg:h-[75vh] min-h-[350px] sm:min-h-125 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1920&q=80"
            alt="Our Story"
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            Built on trust,<br />
            driven by <span className="italic">passion</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* ===== FOUNDER STORY ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionLabel>Who We Are</SectionLabel>
              <TextReveal
                text="A team dedicated to building homes with heart"
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight mb-8"
                tag="h2"
              />
              <div className="space-y-5">
                {founderStory.paragraphs.map((para, i) => (
                  <RevealOnScroll key={i} delay={i * 0.1}>
                    <p className="text-charcoal-500 text-base sm:text-lg leading-relaxed">
                      {para}
                    </p>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <ImageReveal
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Welcome Homes WA team"
                className="rounded-2xl"
                aspectRatio="aspect-[4/3]"
              />
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80"
                  alt="Construction quality"
                  className="rounded-2xl"
                  aspectRatio="aspect-square"
                />
                <ImageReveal
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"
                  alt="Home interior"
                  className="rounded-2xl"
                  aspectRatio="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-charcoal-900 py-14 sm:py-20">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-1">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-white/40 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section className="section-slide section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <SectionLabel>Our Philosophy</SectionLabel>
            <TextReveal
              text="The principles that guide every build"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight"
              tag="h2"
            />
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" staggerDelay={0.1}>
            {founderStory.philosophy.map((item, i) => {
              const Icon = philosophyIcons[i];
              return (
                <StaggerItem key={i}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 h-full group hover:shadow-lg transition-shadow duration-500 text-center">
                    <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center mb-6 group-hover:bg-warm-200 transition-colors mx-auto">
                      <Icon size={20} className="text-warm-600" />
                    </div>
                    <h3 className="text-lg font-normal text-charcoal-900 tracking-tight mb-3">
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

      {/* ===== WHY CUSTOM BUILDS ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                  alt="Why custom builds matter"
                  className="rounded-2xl"
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </RevealOnScroll>

            <div>
              <SectionLabel>Why Custom?</SectionLabel>
              <TextReveal
                text="Why custom builds matter"
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 leading-tight mb-6"
                tag="h2"
              />
              <div className="space-y-6">
                {[
                  {
                    title: "Your lifestyle, your layout",
                    desc: "A custom home is designed around how you actually live. No wasted space, no compromises — just smart design that works for your family.",
                  },
                  {
                    title: "Quality you can feel",
                    desc: "With a custom build, you choose the materials and finishes. The result is a home that looks and feels premium in every detail.",
                  },
                  {
                    title: "Future-proofed investment",
                    desc: "Custom homes are built with longevity in mind. Smart design choices today mean your home adapts with you for decades to come.",
                  },
                  {
                    title: "Emotional connection",
                    desc: "There's nothing quite like walking into a home that was designed specifically for you. It's personal, meaningful, and truly yours.",
                  },
                ].map((item, i) => (
                  <RevealOnScroll key={i} delay={i * 0.1}>
                    <div>
                      <h3 className="text-base sm:text-lg font-normal text-charcoal-900 mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-charcoal-400 leading-relaxed">
                        {item.desc}
                      </p>
                      {i < 3 && <AnimatedLine className="mt-6" />}
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Watch Our Story</SectionLabel>
            <TextReveal
              text="See our craft in action"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
              tag="h2"
            />
          </div>

          <RevealOnScroll>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-charcoal-100 max-w-4xl mx-auto">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Welcome Homes WA"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-center text-sm text-charcoal-400 mt-6 max-w-lg mx-auto">
              Take a look at how we bring our clients' visions to life — from initial concept
              through to the final handover.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
