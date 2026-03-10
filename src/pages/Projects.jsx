import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal } from '../components/AnimatedElements';
import { projects } from '../data/siteData';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const types = ['all', ...new Set(projects.map(p => p.type))];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[70vh] sm:h-[75vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&q=80"
            alt="Our Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28 px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/60 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            Homes we've<br />
            brought to <span className="italic">life</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* ===== FILTER + GRID ===== */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Filter tabs */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                    filter === type
                      ? 'bg-charcoal-900 text-white'
                      : 'bg-white text-charcoal-400 hover:text-charcoal-700 border border-charcoal-200'
                  }`}
                >
                  {type === 'all' ? 'All Projects' : type}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={`/projects/${project.id}`} className="group block">
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <motion.img
                      src={project.hero}
                      alt={project.name}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-normal text-charcoal-900 tracking-tight group-hover:text-warm-600 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <MapPin size={12} className="text-charcoal-300" />
                        <p className="text-sm text-charcoal-400">{project.location}</p>
                      </div>
                      <div className="flex gap-3 mt-2 text-xs text-charcoal-300">
                        <span>{project.beds} Bed</span>
                        <span>&middot;</span>
                        <span>{project.baths} Bath</span>
                        <span>&middot;</span>
                        <span>{project.sqm}m&sup2;</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-charcoal-200 flex items-center justify-center mt-1 group-hover:bg-charcoal-900 group-hover:border-charcoal-900 group-hover:text-white transition-all flex-shrink-0">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
