import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Droplets,
  Sparkles,
  Coffee,
  Phone,
  MapPin,
  ArrowUpRight,
  Star,
  Menu,
  X,
  Clock,
  ShieldCheck,
  ExternalLink,
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

// Main landing page data
const SERVICES = [
  {
    id: 'wash',
    title: 'Premium Foam Wash',
    icon: Droplets,
    description: 'A touchless pH-neutral active foam treatment designed to safely lift dirt without scratching your clear coat.',
    features: ['Triple-bucket grit guard method', 'Deep wheel barrel & tire cleaning', 'Warm air blowout for crevices', 'Spot-free water filtration rinse'],
    price: '₹349 onwards',
    badge: 'Popular'
  },
  {
    id: 'detailing',
    title: 'Ultra Detailing & Polishing',
    icon: Sparkles,
    description: 'Professional paint correction, clay-bar decontamination, and state-of-the-art ceramic coating protection.',
    features: ['Dual-action machine paint correction', 'Interior deep clean & steam sanitize', 'Hydrophobic windshield treatment', 'Premium 9H ceramic sealant layer'],
    price: '₹3,499 onwards',
    badge: 'Elite Quality'
  },
  {
    id: 'cafe',
    title: 'The Perfecto Cafe',
    icon: Coffee,
    description: 'Relax in our temperature-controlled lounge, featuring artisan espresso beverages, gourmet snacks, and high-speed fiber Wi-Fi.',
    features: ['Artisanal espresso & pour-overs', 'Comfortable working desks & couches', 'Complimentary fast Wi-Fi access', 'Fresh gourmet pastries & snacks'],
    price: 'Complimentary with select detailing services',
    badge: 'Cozy Lounge'
  }
]

const AMENITIES = [
  { text: '100% Scratch-Free Hand Wash Guarantee', icon: ShieldCheck },
  { text: 'Premium Car Detailing & Paint Protection', icon: Award },
  { text: 'Aromatic Cafe Lounge with Workstations', icon: Coffee },
]

const SLIDES = [
  {
    url: '/car_wash_foam.png',
    title: 'Active Foam Wash',
    description: 'Touchless active snow foam treatment lifting surface contaminants safely.'
  },
  {
    url: '/car_wash_polishing.png',
    title: 'Precision Paint Polishing',
    description: 'Professional dual-action paint correction eliminating swirls for a mirror reflection.'
  }
]

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedService, setSelectedService] = useState('wash')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Dynamic status: open daily 8:00 AM - 8:00 PM
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if current time is between 8 AM and 8 PM Kochi time
  useEffect(() => {
    const checkOpenStatus = () => {
      try {
        // Kochi is UTC+5:30
        const d = new Date()
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        const kochiTime = new Date(utc + (3600000 * 5.5))
        const hours = kochiTime.getHours()
        setIsOpen(hours >= 8 && hours < 20)
      } catch (e) {
        setIsOpen(true) // Fallback to true
      }
    }
    checkOpenStatus()
    const timer = setInterval(checkOpenStatus, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Top Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Sticky Navigation Bar */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0B0F17]/85 backdrop-blur-md border-b border-gray-800/80 py-4 shadow-lg shadow-black/20'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-3 group">
              <img
                src="/perfecto_logo.jpg"
                alt="The Perfecto Logo"
                className="w-10 h-10 rounded-full border border-gray-800/80 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-widest text-white leading-none">THE PERFECTO</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 leading-none mt-1">Car Wash & Cafe</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-medium">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, 'home')}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#monthly-plan"
                onClick={(e) => handleLinkClick(e, 'monthly-plan')}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Monthly Plan
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>

            {/* Desktop CTA Call Button */}
            <div className="hidden md:block">
              <motion.a
                href="tel:+919992225924"
                animate={{
                  backgroundColor: ['#22d3ee', '#ef4444', '#22d3ee'],
                  boxShadow: ['0px 0px 15px rgba(34,211,238,0.4)', '0px 0px 25px rgba(239,68,68,0.7)', '0px 0px 15px rgba(34,211,238,0.4)'],
                  color: ['#000000', '#ffffff', '#000000']
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-6 py-2.5 font-bold rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Free Pickup & Drop</span>
              </motion.a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-gray-800 bg-[#0B0F17]/95 backdrop-blur-xl absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-lg font-medium text-gray-300 hover:text-cyan-400 py-2 border-b border-gray-800/30 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-lg font-medium text-gray-300 hover:text-cyan-400 py-2 border-b border-gray-800/30 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#monthly-plan"
                  onClick={(e) => handleLinkClick(e, 'monthly-plan')}
                  className="text-lg font-medium text-gray-300 hover:text-cyan-400 py-2 border-b border-gray-800/30 transition-colors"
                >
                  Monthly Plan
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="text-lg font-medium text-gray-300 hover:text-cyan-400 py-2 transition-colors"
                >
                  Contact Us
                </a>

                <motion.a
                  href="tel:+919992225924"
                  animate={{
                    backgroundColor: ['#22d3ee', '#ef4444', '#22d3ee'],
                    boxShadow: ['0px 0px 15px rgba(34,211,238,0.4)', '0px 0px 25px rgba(239,68,68,0.7)', '0px 0px 15px rgba(34,211,238,0.4)'],
                    color: ['#000000', '#ffffff', '#000000']
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-full active:scale-95 transition-transform duration-200"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Free Pickup & Drop</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 md:pb-28 flex flex-col items-center justify-center relative">

        {/* Widescreen Banner Image Slider - Full Screen Width with zero gaps */}
        <div className="w-full mt-0 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full border-b border-gray-800/80 rounded-none overflow-hidden shadow-2xl relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={SLIDES[currentSlide].url}
                  alt={SLIDES[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

                {/* Caption Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="z-20">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-1 rounded-full mb-2 inline-block">
                      Showcase
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{SLIDES[currentSlide].title}</h3>
                    <p className="text-sm text-gray-300 mt-1 max-w-md">{SLIDES[currentSlide].description}</p>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex gap-2 z-20">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-cyan-400 w-6' : 'bg-gray-600 hover:bg-gray-400'
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Buttons */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-gray-800 hover:bg-black/90 hover:border-cyan-500/50 text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-30 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-gray-800 hover:bg-black/90 hover:border-cyan-500/50 text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-30 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Text Container: max-w-4xl - placed after the slider banner */}
        <div className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center mt-16 md:mt-24">

          {/* Main H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            The Ultimate Shine for Your Ride.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent block mt-2 md:inline md:mt-0 drop-shadow-sm">
              A Perfect Brew for You.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10"
          >
            Treat your vehicle to Cochin's premier luxury detailing and paint correction services while you unwind in our design-forward, climate-controlled coffee lounge in Vazhakkala, Kakkanad.
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <a
              href="https://maps.google.com/?q=The+Perfecto+Car+Wash+and+Cafe+Kakkanad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-300 hover:to-teal-400 text-black font-bold rounded-xl shadow-xl shadow-cyan-400/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900/60 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white font-semibold rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg backdrop-blur-sm"
            >
              <span>View Timings</span>
            </a>
          </motion.div>
        </div>

        {/* Amenities Grid wrapper */}
        <div className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full border-t border-gray-800/60 pt-10"
          >
            {AMENITIES.map((amenity, index) => {
              const IconComp = amenity.icon
              return (
                <div key={index} className="flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm font-medium">
                  <div className="bg-cyan-950/50 p-1.5 rounded-lg border border-cyan-800/40 text-cyan-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-left">{amenity.text}</span>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Ambient background glow elements */}
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
      </section>

      {/* High-Trust Reviews Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="-mt-12 md:-mt-16 bg-gradient-to-r from-[#131A2A]/90 to-[#0F1422]/90 border border-gray-800/90 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 hover:border-cyan-500/30 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Google Rating Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-gray-800/80 shadow-inner flex flex-col items-center">
                <span className="text-4xl font-extrabold text-white">4.8</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Google Score</span>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1.5">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current text-amber-400/80" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Verified Google Business Reviews</h3>
                <p className="text-sm text-gray-400 mt-0.5">Highly praised for meticulous foam wash attention and premium coffee selection.</p>
              </div>
            </div>

            {/* Quick testimonial overlay inside card */}
            <div className="h-px md:h-12 w-full md:w-px bg-gray-800/80" />

            <div className="text-center md:text-right max-w-sm md:max-w-xs">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">Customer Sentiment</span>
              <p className="text-sm text-gray-300 italic">"The detailing was absolute perfection, and having a freshly brewed cappuccino while I worked in their cozy workspace made the wait fly by!"</p>
              <span className="text-[11px] font-bold text-gray-500 block mt-2">— Rohit K., Kochi Resident</span>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Services & Highlights Section */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-xs uppercase font-extrabold text-cyan-400 tracking-widest mb-3">Our Operations</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Curated Services For You & Your Car
            </h3>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              We have merged professional automotive preservation with luxury hospitality. Explore our main pillars of care below.
            </p>
          </div>

          {/* Operational Feature Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {SERVICES.map((service) => {
              const IconComp = service.icon
              const isSelected = selectedService === service.id

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative bg-[#131A2A]/40 rounded-2xl p-8 border border-gray-800/80 cursor-pointer shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 flex flex-col justify-between ${isSelected ? 'ring-2 ring-cyan-400/50 border-cyan-400/50 bg-[#131A2A]/70 shadow-cyan-500/5' : ''
                    }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-[#0F1422] border border-gray-800 text-cyan-400">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 uppercase tracking-wider">
                        {service.badge}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{service.description}</p>
                  </div>

                  <div>
                    <div className="h-px bg-gray-800/80 my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Starting At</span>
                      <span className="text-base font-extrabold text-white text-right">{service.price}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Interactive Dynamic Detail Dashboard */}
          <motion.div
            layout
            className="bg-[#0F1422] border border-gray-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none rounded-2xl" />

            {SERVICES.map((service) => {
              if (service.id !== selectedService) return null;

              return (
                <div key={service.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {/* Left Column: Summary */}
                  <div>
                    <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest block mb-2">Package Details</span>
                    <h4 className="text-2xl sm:text-3xl font-black text-white mb-4">{service.title} Components</h4>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                      Our process relies on state-of-the-art tools and premium materials. Every step is optimized to deliver outstanding visual depth and protection while ensuring a relaxed environment.
                    </p>

                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Price Range</span>
                        <span className="text-lg font-black text-white">{service.price}</span>
                      </div>
                      <div className="h-8 w-px bg-gray-800" />
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Time Commitment</span>
                        <span className="text-lg font-black text-cyan-400">
                          {service.id === 'wash' ? '30 - 60 Mins' : service.id === 'detailing' ? '4 - 8 Hours' : 'Open Stay'}
                        </span>
                      </div>
                    </div>

                    <a
                      href="tel:+919992225924"
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:scale-[1.02] active:scale-[0.97] transition-all"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      <span>Book Slot / Call Us</span>
                    </a>
                  </div>

                  {/* Right Column: Key Components checklist */}
                  <div className="bg-[#131A2A]/50 border border-gray-800 rounded-xl p-6 sm:p-8 flex flex-col justify-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Key Deliverables Included:</span>

                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 bg-cyan-950 p-1 rounded border border-cyan-800 text-cyan-400 flex-shrink-0">
                            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-sm sm:text-base text-gray-300 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </motion.div>

        </div>
      </section>

      {/* Monthly Plans Section */}
      <section id="monthly-plan" className="py-24 md:py-32 relative bg-[#0B0F17] border-t border-gray-800/60 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Centered Header Content */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2 uppercase tracking-wide">
              EXCLUSIVE FOR <span className="text-cyan-400 font-serif italic text-3xl sm:text-4xl capitalize">Monthly Plans</span>
            </h3>
            <h4 className="text-lg sm:text-xl text-gray-400 italic mb-6 font-serif">Trusted Premium Car Care</h4>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
              Your car deserves the best, and we are here to provide it. With 6 years of professional experience and the trust of many happy customers, we ensure your vehicle gets the expert care it needs to shine like new.
            </p>

            {/* Premium Microfiber moved here */}
            <div className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#131A2A] to-[#0F1422] border border-gray-700/80 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-black text-white uppercase tracking-widest">Premium Microfiber <span className="font-serif italic text-cyan-400 font-normal normal-case">Finish</span></span>
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div className="flex flex-col gap-12 mb-16">

            {/* Offer Banner (Full Width) */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between bg-[#131A2A]/80 border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">EXCLUSIVE RESIDENTIAL OFFER</h2>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-500 mt-2 uppercase tracking-widest">Monthly Plans</h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl">
                    Keep your car sparkling year-round with our affordable and convenient monthly subscription plans
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 3, -3, 3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex items-center gap-4 bg-[#0F1422] p-4 rounded-xl border border-cyan-900/50 flex-shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  <div className="bg-cyan-950 p-3 rounded-lg text-cyan-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div className="text-center pr-2">
                    <span className="block text-base font-black text-white uppercase tracking-wider">Free</span>
                    <span className="block text-xs font-bold text-cyan-400 uppercase tracking-widest">Pickup & Drop</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Table (Full Width) */}
            <div className="w-full">
              <div className="bg-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] border-4 border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-white border-b-2 border-gray-200">
                        <th className="py-6 px-6 text-black font-black text-lg sm:text-xl uppercase tracking-wider w-1/4 text-left">Vehicle <br /><span className="text-sm text-gray-500 font-bold">Category</span></th>
                        <th className="py-6 px-6 text-black font-black text-lg sm:text-xl uppercase tracking-wider w-1/4">Normal</th>
                        <th className="py-6 px-6 text-black font-black text-lg sm:text-xl uppercase tracking-wider w-1/4">Monthly</th>
                        <th className="py-6 px-6 text-black font-black text-lg sm:text-xl uppercase tracking-wider w-1/4">Year</th>
                      </tr>
                    </thead>
                    <tbody className="text-black bg-white">
                      {/* Hatchback */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-7 px-6 font-black text-xl text-left tracking-wide">HATCHBACK</td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">499</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">PER WASH</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative bg-gray-50/50">
                          <span className="block font-black text-3xl">1799</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">(4 WASH)</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">12599</span>
                          <span className="block text-[10px] font-bold text-gray-600 leading-tight mt-1 uppercase tracking-widest">(24 WASH) + 1 INTERIOR<br />CLEANING</span>
                        </td>
                      </tr>
                      {/* Sedan */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-7 px-6 font-black text-xl text-left leading-tight tracking-wide">SEDAN &<br />COMPACT SUV</td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">549</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">PER WASH</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative bg-gray-50/50">
                          <span className="block font-black text-3xl">1999</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">(4 WASH)</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">13999</span>
                          <span className="block text-[10px] font-bold text-gray-600 leading-tight mt-1 uppercase tracking-widest">(24 WASH) + 1 INTERIOR<br />CLEANING</span>
                        </td>
                      </tr>
                      {/* SUV */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-7 px-6 font-black text-2xl text-left tracking-wide">SUV</td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">599</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">PER WASH</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative bg-gray-50/50">
                          <span className="block font-black text-3xl">2199</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">(4 WASH)</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">15999</span>
                          <span className="block text-[10px] font-bold text-gray-600 leading-tight mt-1 uppercase tracking-widest">(24 WASH) + 1 INTERIOR<br />CLEANING</span>
                        </td>
                      </tr>
                      {/* Premium */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="py-7 px-6 font-black text-xl text-left tracking-wide">PREMIUM</td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">699</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">PER WASH</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative bg-gray-50/50">
                          <span className="block font-black text-3xl">2599</span>
                          <span className="block text-[11px] font-bold text-gray-500 tracking-widest mt-1">(4 WASH)</span>
                        </td>
                        <td className="py-7 px-6 border-l border-gray-100 relative">
                          <span className="block font-black text-3xl">19999</span>
                          <span className="block text-[10px] font-bold text-gray-600 leading-tight mt-1 uppercase tracking-widest">(24 WASH) + 1 INTERIOR<br />CLEANING</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Cleaning Process Features (Full Width) */}
            <div className="w-full">
              <div className="bg-gradient-to-r from-[#131A2A]/80 via-[#0B0F17]/90 to-[#131A2A]/80 border border-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">

                <div className="text-center lg:text-left flex-shrink-0 lg:w-1/3">
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider mb-2">Our Specialized</h3>
                  <span className="font-serif italic text-2xl sm:text-3xl text-cyan-400 block mb-6">Cleaning Process</span>
                  <div className="h-1 w-24 bg-cyan-500/50 mx-auto lg:ml-0 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center lg:text-left">
                  <div className="bg-[#0B0F17]/50 p-6 rounded-2xl border border-gray-800/50 hover:border-cyan-900/50 transition-colors">
                    <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3 text-cyan-50">Deep Underbody Cleaning</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">High-pressure cleaning to remove hidden dirt and prevent corrosion.</p>
                  </div>
                  <div className="bg-[#0B0F17]/50 p-6 rounded-2xl border border-gray-800/50 hover:border-cyan-900/50 transition-colors">
                    <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3 text-cyan-50">Step-By-Step Washing</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">A scientific, multi-stage process for a thorough and safe clean.</p>
                  </div>
                  <div className="bg-[#0B0F17]/50 p-6 rounded-2xl border border-gray-800/50 hover:border-cyan-900/50 transition-colors">
                    <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3 text-cyan-50">Detailed Interior Care</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Preferred cleaning techniques for your dashboard, mats, and upholstery.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-24 md:py-32 relative bg-[#131A2A]/10 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Details Cards */}
            <div>
              <span className="text-xs uppercase font-extrabold text-cyan-400 tracking-widest mb-3 block">Contact Us</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-8">
                Drop By The Perfecto
              </h2>

              <div className="space-y-6">
                {/* Hours Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0F1422]/90 border border-gray-800/80 rounded-xl p-5 flex items-start gap-4 shadow-lg"
                >
                  <div className="bg-[#131A2A] p-3 rounded-lg border border-gray-800 text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Business Hours</span>

                      {/* Live Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${isOpen
                        ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-400'
                        : 'bg-red-950/80 border-red-800/80 text-red-400'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 pulse-emerald' : 'bg-red-400'}`} />
                        {isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-lg mt-2">Open Daily: 8:00 AM - 8:00 PM</p>
                    <p className="text-sm text-gray-400 mt-1">Cafe operations align with wash timings. Stop by anytime.</p>
                  </div>
                </motion.div>

                {/* Address Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-[#0F1422]/90 border border-gray-800/80 rounded-xl p-5 flex items-start gap-4 shadow-lg"
                >
                  <div className="bg-[#131A2A] p-3 rounded-lg border border-gray-800 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block">Physical Address</span>
                    <p className="text-white font-semibold text-lg mt-2 leading-relaxed">
                      Kunneparambu Rd, Vazhakkala, Kakkanad, Kochi, Kerala 682021
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Conveniently situated right near the Kakkanad IT Expressway corridor.</p>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-[#0F1422]/90 border border-gray-800/80 rounded-xl p-5 flex items-start gap-4 shadow-lg hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="bg-[#131A2A] p-3 rounded-lg border border-gray-800 text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block font-semibold">Immediate Assistance</span>
                    <a
                      href="tel:+919992225924"
                      className="inline-flex items-center gap-1.5 text-white font-black text-xl hover:text-cyan-400 transition-colors mt-2"
                    >
                      <span>+91 99922 25924</span>
                      <ExternalLink className="w-4 h-4 text-cyan-400/70" />
                    </a>
                    <p className="text-sm text-gray-400 mt-1">Call to inquire about wait times or reserve a detail bay.</p>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Right Column: Premium Dark Map Graphic Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            >

              {/* Premium dark filter spatial image container */}
              <div className="aspect-[4/3] w-full bg-gray-950 relative overflow-hidden flex items-center justify-center">

                {/* Map Graphic */}
                <img
                  src="/perfecto_map_graphic.png"
                  alt="Minimalist Map of Kakkanad, Kochi showcasing The Perfecto"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110 filter brightness-90 grayscale-[10%]"
                />

                {/* Subtle outer overlay shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />

                {/* Centered Map Action Overlay Canvas */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950/45 backdrop-blur-[1px] group-hover:backdrop-blur-[2px] transition-all duration-300 opacity-100">
                  <a
                    href="https://maps.google.com/?q=The+Perfecto+Car+Wash+and+Cafe+Kakkanad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-black font-extrabold rounded-full shadow-xl shadow-cyan-400/20 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>

              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-950 border-t border-gray-900 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 The Perfecto. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
