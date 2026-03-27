import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal, AnimatedLine, StaggerContainer, StaggerItem } from '../components/AnimatedElements';
import { testimonials } from '../data/siteData';

export default function Testimonials() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[55vh] sm:h-[65vh] lg:h-[70vh] min-h-87.5 sm:min-h-112.5 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
            alt="Client Testimonials"
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
            Testimonials
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            Hear from the<br />
            <span className="italic">families</span> we've built for
          </motion.h1>
        </motion.div>
      </section>

      {/* ===== FEATURED TESTIMONIAL ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto text-center">
              <Quote size={40} className="text-warm-300 mx-auto mb-8" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-charcoal-800 leading-relaxed tracking-tight mb-8">
                "{testimonials[0].quote}"
              </p>
              <AnimatedLine className="max-w-24 mx-auto mb-6" />
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-warm-200 flex items-center justify-center text-sm font-medium text-warm-700">
                  {testimonials[0].avatar}
                </div>
                <div className="text-left">
                  <p className="text-base font-medium text-charcoal-900">{testimonials[0].name}</p>
                  <p className="text-sm text-charcoal-400">
                    {testimonials[0].location} &middot; {testimonials[0].project}
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== ALL TESTIMONIALS ===== */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <SectionLabel>Client Stories</SectionLabel>
            <TextReveal
              text="Every home has a story"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
              tag="h2"
            />
          </div>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.12}>
            {testimonials.map((item) => (
              <StaggerItem key={item.id}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-500">
                  <div className="flex gap-1 mb-5">
                    {[...Array(item.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-warm-500 text-warm-500" />
                    ))}
                  </div>
                  <p className="text-charcoal-600 text-base leading-relaxed grow mb-6">
                    "{item.quote}"
                  </p>
                  <AnimatedLine className="mb-5" />
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-warm-200 flex items-center justify-center text-sm font-medium text-warm-700">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">{item.name}</p>
                      <p className="text-xs text-charcoal-400">
                        {item.location} &middot; {item.project}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== VIDEO TESTIMONIALS ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Video Testimonials</SectionLabel>
            <TextReveal
              text="See what our clients have to say"
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
              tag="h2"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((_, i) => (
              <RevealOnScroll key={i} delay={i * 0.15}>
                <div className="aspect-video rounded-2xl overflow-hidden bg-charcoal-100 relative group">
                  <img
                    src={`https://images.unsplash.com/photo-160058515${i === 0 ? '4340-be6161a56a0c' : '4526-990dced4db0d'}?w=800&q=80`}
                    alt="Video testimonial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-charcoal-900 border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60">
                    <p className="text-white text-sm font-medium">
                      {i === 0 ? 'The Mitchell Family' : 'Michael Chen'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {i === 0 ? 'City Beach Build' : 'Dalkeith Custom Home'}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.3}>
            <p className="text-center text-sm text-charcoal-400 mt-8 max-w-lg mx-auto">
              Video testimonials will be available soon. Our clients will share their experiences
              and walk you through their completed homes.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
