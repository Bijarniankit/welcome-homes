// Welcome Homes WA - Site-wide data

export const siteConfig = {
  name: "Welcome Homes WA",
  tagline: "Home that welcomes you everytime",
  phone: "+61 8 9000 0000",
  email: "info@welcomehomeswa.com.au",
  address: "Perth, Western Australia",
  abn: "00 000 000 000",
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  }
};

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Start Your Build", path: "/contact" },
];

export const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "120+", label: "Homes Built" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "Perth", label: "Based & Proud" },
];

export const whyChooseUs = [
  {
    title: "Personalised Design",
    description: "Every home is uniquely designed around your lifestyle, preferences, and the way you live.",
    icon: "Palette",
  },
  {
    title: "Quality Craftsmanship",
    description: "We partner with the finest tradespeople and use premium materials on every build.",
    icon: "Hammer",
  },
  {
    title: "Transparent Process",
    description: "Clear communication, honest pricing, and no surprises from start to handover.",
    icon: "Eye",
  },
  {
    title: "End-to-End Service",
    description: "From initial concept through to final handover, we manage every detail.",
    icon: "CheckCircle",
  },
];

export const projects = [
  {
    id: "coastal-retreat",
    name: "The Coastal Retreat",
    location: "City Beach, Perth",
    type: "Custom Home",
    year: "2024",
    sqm: "320",
    beds: 4,
    baths: 3,
    description: "A contemporary coastal home designed to embrace ocean breezes and natural light. Floor-to-ceiling glazing connects interior living spaces with the outdoor landscape.",
    features: ["Open-plan living", "Ocean views", "Infinity pool", "Spotted gum timber"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  {
    id: "modern-elegance",
    name: "Modern Elegance",
    location: "Dalkeith, Perth",
    type: "Custom Home",
    year: "2024",
    sqm: "450",
    beds: 5,
    baths: 4,
    description: "A luxurious family home blending modern architecture with warm, liveable interiors. Double-height void and cantilevered first floor create a striking streetscape presence.",
    features: ["Double-height void", "Home theatre", "Wine cellar", "Smart home system"],
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  },
  {
    id: "riverside-haven",
    name: "Riverside Haven",
    location: "Applecross, Perth",
    type: "Custom Home",
    year: "2023",
    sqm: "380",
    beds: 4,
    baths: 3,
    description: "Nestled along the Swan River, this home was crafted to maximise river views from every living space. Natural stone and timber create a warm, grounded aesthetic.",
    features: ["River views", "Alfresco dining", "Natural stone facade", "Landscaped gardens"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
  },
  {
    id: "urban-sanctuary",
    name: "Urban Sanctuary",
    location: "Mount Lawley, Perth",
    type: "Custom Home",
    year: "2023",
    sqm: "280",
    beds: 3,
    baths: 2,
    description: "A thoughtfully designed inner-city home that balances urban living with private retreat spaces. Clever use of courtyards brings light and greenery into every room.",
    features: ["Internal courtyards", "Green roof", "Polished concrete", "Bamboo screening"],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
  },
  {
    id: "hills-estate",
    name: "The Hills Estate",
    location: "Kalamunda, Perth",
    type: "Custom Home",
    year: "2022",
    sqm: "520",
    beds: 5,
    baths: 4,
    description: "A grand estate home set among the Perth Hills, designed to harmonise with the natural bush landscape. Expansive outdoor entertaining areas embrace the elevated position.",
    features: ["Bush views", "Outdoor kitchen", "Guest quarters", "3-car garage"],
    images: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1600&q=80",
  },
  {
    id: "south-perth-contemporary",
    name: "South Perth Contemporary",
    location: "South Perth, WA",
    type: "Custom Home",
    year: "2022",
    sqm: "400",
    beds: 4,
    baths: 3,
    description: "A striking contemporary residence with city skyline views. Crisp white render and dark feature cladding create a bold architectural statement.",
    features: ["City views", "Rooftop terrace", "Heated pool", "Home gym"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "James & Sarah Mitchell",
    location: "City Beach",
    project: "The Coastal Retreat",
    quote: "Welcome Homes WA turned our dream into reality. The attention to detail throughout the entire build was exceptional. We felt involved at every stage and the result exceeded our expectations.",
    rating: 5,
    avatar: "JM",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Dalkeith",
    project: "Modern Elegance",
    quote: "From the first meeting, we knew we were in safe hands. The team's professionalism and genuine care for delivering a quality home was evident in every interaction. Our home is absolutely stunning.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma & David Taylor",
    location: "Applecross",
    project: "Riverside Haven",
    quote: "Building a custom home felt daunting, but Welcome Homes WA made it seamless. Their transparent pricing and regular updates meant we always knew exactly where our build was at.",
    rating: 5,
    avatar: "ET",
  },
  {
    id: 4,
    name: "Rachel Nguyen",
    location: "Mount Lawley",
    project: "Urban Sanctuary",
    quote: "We wanted something unique that reflected how we live. The design team really listened and created spaces that feel perfectly tailored to our family. We couldn't be happier.",
    rating: 5,
    avatar: "RN",
  },
  {
    id: 5,
    name: "Andrew & Lisa Brooks",
    location: "Kalamunda",
    project: "The Hills Estate",
    quote: "The craftsmanship in our home is outstanding. Every corner shows the level of care and skill that went into the build. Welcome Homes WA delivered beyond what we imagined.",
    rating: 5,
    avatar: "AB",
  },
];

export const services = {
  customHomes: {
    title: "Custom Homes",
    subtitle: "Your vision, expertly crafted",
    description: "Every Welcome Homes WA custom home begins with your story. We design and build homes that reflect how you live, entertain, and create memories with family.",
    features: [
      {
        title: "Bespoke Design",
        description: "Working closely with you and our architect partners to create a home that's uniquely yours.",
      },
      {
        title: "Premium Materials",
        description: "We source the finest materials and finishes to ensure longevity and aesthetic appeal.",
      },
      {
        title: "Project Management",
        description: "Dedicated project manager overseeing every aspect from foundation to handover.",
      },
      {
        title: "Fixed Price Contracts",
        description: "Transparent pricing with no hidden costs. Know exactly what your home will cost.",
      },
      {
        title: "Quality Guarantee",
        description: "Every build backed by comprehensive structural and maintenance warranties.",
      },
      {
        title: "Aftercare Support",
        description: "Our relationship doesn't end at handover. We provide ongoing support and maintenance guidance.",
      },
    ],
    process: [
      { step: "01", title: "Discovery", description: "We listen to your vision, understand your lifestyle, and explore your block." },
      { step: "02", title: "Design", description: "Collaborate with our design team to create plans that bring your vision to life." },
      { step: "03", title: "Approval", description: "Final plans, fixed pricing, and all approvals secured before we break ground." },
      { step: "04", title: "Build", description: "Expert construction with regular updates and site visits throughout." },
      { step: "05", title: "Handover", description: "Your completed home, delivered to the highest standards and ready to welcome you." },
    ],
  },
  development: {
    title: "Development & Multi-Lot",
    subtitle: "Strategic development solutions",
    description: "For investors and developers seeking quality multi-lot residential projects. We bring the same attention to detail and quality of our custom homes to development projects.",
    features: [
      {
        title: "Site Analysis",
        description: "Comprehensive feasibility and site analysis to maximise your development potential.",
      },
      {
        title: "Design & Planning",
        description: "Efficient layouts that balance quality living with commercial viability.",
      },
      {
        title: "Council Approvals",
        description: "We navigate the approval process and manage all compliance requirements.",
      },
      {
        title: "Construction Management",
        description: "End-to-end build management across multiple dwellings simultaneously.",
      },
      {
        title: "Quality Standards",
        description: "Every dwelling built to the same premium standard as our custom homes.",
      },
      {
        title: "Market Ready",
        description: "Delivering finished homes that attract quality buyers and strong returns.",
      },
    ],
  },
};

export const founderStory = {
  name: "Welcome Homes WA",
  paragraphs: [
    "Welcome Homes WA was born from a simple belief: that everyone deserves a home built around their life, not the other way around. Our journey began in Perth with a passion for quality construction and a commitment to making the custom home building experience genuinely enjoyable.",
    "Over the years, we've had the privilege of bringing countless families' visions to life across Perth. Each project has reinforced our founding philosophy — that the best homes are built through collaboration, transparency, and an unwavering commitment to quality.",
    "Today, Welcome Homes WA continues to grow, but our values remain the same. We're a team of dedicated builders, designers, and project managers who genuinely care about delivering homes that our clients love to live in. Every home we build is a reflection of the family it's built for.",
  ],
  philosophy: [
    {
      title: "Listen First",
      description: "Understanding how you live is the foundation of great home design.",
    },
    {
      title: "Quality Always",
      description: "We never compromise on materials, craftsmanship, or attention to detail.",
    },
    {
      title: "Full Transparency",
      description: "Open communication and honest pricing from day one.",
    },
    {
      title: "Built to Last",
      description: "Homes designed and constructed to stand the test of time.",
    },
  ],
};

export const budgetRanges = [
  "$300,000 - $500,000",
  "$500,000 - $750,000",
  "$750,000 - $1,000,000",
  "$1,000,000 - $1,500,000",
  "$1,500,000+",
  "Not sure yet",
];

export const landStatuses = [
  "I own my land",
  "I'm looking for land",
  "I have land under contract",
  "I need help finding land",
];

export const timelines = [
  "Ready to start now",
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
  "Just exploring options",
];
