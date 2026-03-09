import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { RevealOnScroll, SectionLabel, TextReveal, AnimatedLine, StaggerContainer, StaggerItem } from '../components/AnimatedElements';
import { siteConfig, budgetRanges, landStatuses, timelines } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    landStatus: '',
    timeline: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  const inputClasses = (field) => `
    w-full px-4 py-3.5 rounded-xl border text-sm bg-white
    transition-all duration-300 outline-none
    ${errors[field]
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-charcoal-200 focus:border-charcoal-400 focus:ring-2 focus:ring-charcoal-100'
    }
    placeholder:text-charcoal-300
  `;

  const selectClasses = (field) => `
    w-full px-4 py-3.5 rounded-xl border text-sm bg-white appearance-none
    transition-all duration-300 outline-none cursor-pointer
    ${formData[field] ? 'text-charcoal-800' : 'text-charcoal-300'}
    ${errors[field]
      ? 'border-red-300 focus:border-red-400'
      : 'border-charcoal-200 focus:border-charcoal-400 focus:ring-2 focus:ring-charcoal-100'
    }
  `;

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[65vh] sm:h-[70vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
            alt="Start Your Build"
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
            Get Started
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Let's build your<br />
            <span className="italic font-normal">dream</span> home
          </motion.h1>
        </motion.div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionLabel>Start Your Journey</SectionLabel>
              <TextReveal
                text="Tell us about your vision"
                className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal-900 leading-tight mb-3"
                tag="h2"
              />
              <RevealOnScroll>
                <p className="text-charcoal-400 text-base leading-relaxed mb-10">
                  Every great home starts with a conversation. Fill in the form below and
                  we'll be in touch to discuss your project.
                </p>
              </RevealOnScroll>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 sm:p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={28} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-light text-charcoal-900 tracking-tight mb-3">
                    Thank you!
                  </h3>
                  <p className="text-charcoal-400 max-w-md mx-auto">
                    We've received your enquiry and will be in touch within 24 hours
                    to discuss your project.
                  </p>
                </motion.div>
              ) : (
                <RevealOnScroll>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClasses('name')}
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className={inputClasses('phone')}
                        />
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClasses('email')}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    {/* Budget & Land Status */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                          Budget Range
                        </label>
                        <div className="relative">
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={selectClasses('budget')}
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-charcoal-400" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                          Land Status
                        </label>
                        <div className="relative">
                          <select
                            name="landStatus"
                            value={formData.landStatus}
                            onChange={handleChange}
                            className={selectClasses('landStatus')}
                          >
                            <option value="">Select land status</option>
                            {landStatuses.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-charcoal-400" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                        Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className={selectClasses('timeline')}
                        >
                          <option value="">When would you like to start?</option>
                          {timelines.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-charcoal-400" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-charcoal-500 mb-2 tracking-wide">
                        Tell Us About Your Dream Home
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your vision... What's important to you in your new home?"
                        rows={5}
                        className={`${inputClasses('message')} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-charcoal-900 text-white px-10 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal-800 transition-colors"
                    >
                      <Send size={16} />
                      Submit Enquiry
                    </motion.button>
                  </form>
                </RevealOnScroll>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 space-y-8">
                <RevealOnScroll direction="right">
                  <div className="bg-white rounded-2xl p-6 sm:p-8">
                    <h3 className="text-lg font-normal text-charcoal-900 tracking-tight mb-6">
                      Get in Touch
                    </h3>
                    <div className="space-y-5">
                      {[
                        { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                        { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                        { icon: MapPin, label: "Location", value: siteConfig.address },
                        { icon: Clock, label: "Hours", value: "Mon - Fri, 8am - 5pm" },
                      ].map(({ icon: Icon, label, value, href }, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0">
                            <Icon size={16} className="text-warm-600" />
                          </div>
                          <div>
                            <p className="text-xs text-charcoal-400 mb-0.5">{label}</p>
                            {href ? (
                              <a href={href} className="text-sm text-charcoal-800 hover:text-warm-600 transition-colors">
                                {value}
                              </a>
                            ) : (
                              <p className="text-sm text-charcoal-800">{value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll direction="right" delay={0.1}>
                  <div className="bg-charcoal-900 rounded-2xl p-6 sm:p-8 text-white">
                    <h3 className="text-lg font-normal tracking-tight mb-4">
                      What happens next?
                    </h3>
                    <div className="space-y-4">
                      {[
                        { step: "01", text: "We'll call you within 24 hours to discuss your project." },
                        { step: "02", text: "We'll arrange a meeting to understand your vision and requirements." },
                        { step: "03", text: "We'll provide an initial concept and indicative pricing." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-xs text-white/30 font-medium mt-0.5">{item.step}</span>
                          <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP PLACEHOLDER ===== */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
          <RevealOnScroll>
            <div className="rounded-2xl overflow-hidden bg-warm-100 h-[300px] sm:h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-warm-400 mx-auto mb-3" />
                <p className="text-charcoal-500 text-lg font-light">Perth, Western Australia</p>
                <p className="text-charcoal-400 text-sm mt-1">Serving all of the Perth metropolitan area</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
