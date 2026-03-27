import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Calendar, Maximize2, BedDouble, Bath, X } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal, AnimatedLine } from '../components/AnimatedElements';
import { projects } from '../data/siteData';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[75vh] sm:h-[80vh] min-h-137.5 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={project.hero}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28 px-5 sm:px-8 lg:px-12 max-w-350 mx-auto"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/60 text-sm mb-6 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-4"
          >
            {project.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4 sm:gap-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {project.year}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 size={14} />
              {project.sqm}m&sup2;
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {project.beds} Bedrooms
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={14} />
              {project.baths} Bathrooms
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== PROJECT DETAILS ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Story */}
            <div className="lg:col-span-2">
              <SectionLabel>The Build Story</SectionLabel>
              <TextReveal
                text={project.name}
                className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal-900 leading-tight mb-6"
                tag="h2"
              />
              <RevealOnScroll>
                <p className="text-charcoal-500 text-base sm:text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
              </RevealOnScroll>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
                {project.images.map((img, i) => (
                  <RevealOnScroll key={i} delay={i * 0.1}>
                    <div
                      className={`overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? 'col-span-2' : ''}`}
                      onClick={() => openLightbox(i)}
                    >
                      <motion.img
                        src={img}
                        alt={`${project.name} - Image ${i + 1}`}
                        loading="lazy"
                        className={`w-full object-cover ${i === 0 ? 'aspect-video' : 'aspect-4/3'}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <RevealOnScroll>
                <div className="bg-warm-50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg font-normal text-charcoal-900 tracking-tight mb-6">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    {[
                      { label: "Location", value: project.location },
                      { label: "Build Type", value: project.type },
                      { label: "Year Completed", value: project.year },
                      { label: "Size", value: `${project.sqm}m²` },
                      { label: "Bedrooms", value: project.beds },
                      { label: "Bathrooms", value: project.baths },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-charcoal-100 last:border-0">
                        <span className="text-sm text-charcoal-400">{item.label}</span>
                        <span className="text-sm font-medium text-charcoal-800">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <AnimatedLine className="my-6" />

                  <h4 className="text-sm font-medium text-charcoal-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-charcoal-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-warm-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact#form"
                    className="w-full inline-flex items-center justify-center gap-2 bg-charcoal-900 text-white px-6 py-3.5 rounded-full text-sm tracking-wide hover:bg-charcoal-800 transition-colors mt-8 group"
                  >
                    Build Something Similar
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEXT/PREV PROJECTS ===== */}
      <section className="bg-warm-50 py-12 sm:py-16 border-t border-charcoal-100">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <Link to={`/projects/${prevProject.id}`} className="group flex items-center gap-4">
              <ArrowLeft size={20} className="text-charcoal-300 group-hover:text-charcoal-600 group-hover:-translate-x-1 transition-all" />
              <div>
                <p className="text-xs text-charcoal-400 mb-1">Previous Project</p>
                <p className="text-lg font-normal text-charcoal-900 tracking-tight group-hover:text-warm-600 transition-colors">
                  {prevProject.name}
                </p>
              </div>
            </Link>

            <Link to={`/projects/${nextProject.id}`} className="group flex items-center justify-end gap-4 text-right">
              <div>
                <p className="text-xs text-charcoal-400 mb-1">Next Project</p>
                <p className="text-lg font-normal text-charcoal-900 tracking-tight group-hover:text-warm-600 transition-colors">
                  {nextProject.name}
                </p>
              </div>
              <ArrowRight size={20} className="text-charcoal-300 group-hover:text-charcoal-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-9999 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-4 w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + project.images.length) % project.images.length)}
              className="text-white/40 hover:text-white transition-colors shrink-0"
            >
              <ArrowLeft size={24} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={project.images[lightboxIndex]}
              alt={`${project.name} gallery`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % project.images.length)}
              className="text-white/40 hover:text-white transition-colors shrink-0"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === lightboxIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
