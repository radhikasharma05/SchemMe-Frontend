import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout, HeartPulse, GraduationCap, Briefcase, Home,
  Baby, Building, PiggyBank, Users, Bus, ArrowRight,
  FileText, Cpu, CheckCircle, Search, ShieldCheck, Leaf,
  Menu, X
} from 'lucide-react';

// ─── Logo ────────────────────────────────────────────────────────────────────
const SchemeLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#1a5c42] flex items-center justify-center shadow-md flex-shrink-0">
      <Leaf size={20} className="text-white" />
    </div>
    <span className="font-['Playfair_Display'] text-white text-xl sm:text-2xl font-bold tracking-tight leading-none">
      Scheme<span className="text-[#FFD166]">Me</span>
    </span>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', active: true },
    { label: 'Schemes', active: false },
    { label: 'About', active: false },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B2545]/95 backdrop-blur-md shadow-sm">
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer flex-shrink-0">
          <SchemeLogo />
        </div>

        {/* Center Search — hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search government schemes..."
              className="w-full px-5 py-2.5 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#2E9F75]/50 focus:border-white/30 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white p-2 rounded-full hover:shadow-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`font-['DM_Sans'] text-sm font-medium transition-colors ${
                link.active
                  ? 'text-white relative after:content-[\'\'] after:absolute after:w-full after:h-[2px] after:bg-[#FF7A45] after:bottom-[-4px] after:left-0'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button className="font-['DM_Sans'] text-white px-4 py-2 text-sm font-semibold hover:text-[#2E9F75] transition-colors">
            Sign In
          </button>
          <button className="font-['DM_Sans'] bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all shadow-md whitespace-nowrap">
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0B2545]/98 border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search government schemes..."
                  className="w-full px-4 py-2.5 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#2E9F75]/50 transition-all"
                />
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
              </div>

              {/* Nav links */}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className={`font-['DM_Sans'] text-base py-3 px-2 border-b border-white/10 transition-colors ${
                    link.active ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* Auth buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full font-['DM_Sans'] text-white border border-white/20 px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                  Sign In
                </button>
                <button className="w-full font-['DM_Sans'] bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-4 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all shadow-md">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Stats Strip ──────────────────────────────────────────────────────────────
export const StatsStrip = () => {
  const stats = [
    { label: 'Schemes Available', value: '500+' },
    { label: 'Beneficiaries', value: '2.8Cr+' },
    { label: 'Verified Benefits', value: '100%' },
    { label: 'AI Support', value: '24/7' },
  ];

  return (
    <section className="bg-white/80 backdrop-blur-sm py-8 sm:py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center py-5 sm:py-6 md:py-0 px-2">
              <span className="font-['Playfair_Display'] text-3xl sm:text-4xl font-black text-[#0B2545] mb-1 sm:mb-2">
                {stat.value}
              </span>
              <span className="font-['DM_Sans'] text-[#111827]/60 font-medium text-xs sm:text-sm uppercase tracking-wider text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
export const HowItWorks = () => {
  const steps = [
    { title: 'Enter Details', icon: FileText, desc: 'Fill in your basic profile info securely.' },
    { title: 'AI Matching', icon: Cpu, desc: 'Our engine scans 500+ schemes instantly.' },
    { title: 'Review Schemes', icon: Search, desc: "See exact benefits you're eligible for." },
    { title: 'Apply Easily', icon: CheckCircle, desc: 'One-click guidance to official portals.' },
  ];

  return (
    <section className="bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] py-16 sm:py-24 relative overflow-hidden">
      {/* Animated bg blobs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-40 sm:w-64 h-40 sm:h-64 bg-[#2E9F75]/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 left-10 w-56 sm:w-96 h-56 sm:h-96 bg-[#FFD166]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="font-['DM_Sans'] text-[#111827]/60 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
            Discovering your government benefits is now easier than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#2E9F75]/10 text-[#2E9F75] rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                <step.icon size={28} />
              </div>
              <h3 className="font-['Playfair_Display'] text-lg sm:text-xl font-bold text-[#0B2545] mb-2 sm:mb-3">
                {idx + 1}. {step.title}
              </h3>
              <p className="font-['DM_Sans'] text-[#111827]/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Categories Grid ──────────────────────────────────────────────────────────
export const CategoriesGrid = () => {
  const categories = [
    { name: 'Agriculture', count: '24 Schemes', icon: Sprout },
    { name: 'Healthcare', count: '18 Schemes', icon: HeartPulse },
    { name: 'Education', count: '32 Schemes', icon: GraduationCap },
    { name: 'Business', count: '15 Schemes', icon: Briefcase },
    { name: 'Housing', count: '8 Schemes', icon: Home },
    { name: 'Women & Child', count: '12 Schemes', icon: Baby },
    { name: 'Infrastructure', count: '5 Schemes', icon: Building },
    { name: 'Pension', count: '10 Schemes', icon: PiggyBank },
    { name: 'Minority', count: '9 Schemes', icon: Users },
    { name: 'Transport', count: '4 Schemes', icon: Bus },
  ];

  return (
    <section className="bg-white/50 backdrop-blur-sm py-16 sm:py-24 relative overflow-hidden">
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-10%] left-[-5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-[#2E9F75]/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-5%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-tl from-[#FF7A45]/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0B2545] mb-3 sm:mb-4">
              Browse by Category
            </h2>
            <p className="font-['DM_Sans'] text-[#111827]/60 text-sm sm:text-base max-w-2xl">
              Explore government initiatives segmented by your specific needs.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[#0B2545] font-medium hover:text-[#2E9F75] transition-colors whitespace-nowrap">
            View All <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 hover:border-[#2E9F75]/40 hover:shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] flex items-center justify-center mb-3 sm:mb-6 shadow-md">
                <cat.icon size={18} className="text-white sm:hidden" />
                <cat.icon size={24} className="text-white hidden sm:block" />
              </div>
              <h3 className="font-['DM_Sans'] text-[#0B2545] font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 leading-tight">
                {cat.name}
              </h3>
              <p className="font-['DM_Sans'] text-[#111827]/50 text-xs sm:text-sm">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="flex sm:hidden justify-center mt-8">
          <button className="flex items-center gap-2 text-[#0B2545] font-semibold border border-[#0B2545]/20 px-6 py-2.5 rounded-full hover:text-[#2E9F75] hover:border-[#2E9F75]/40 transition-colors text-sm">
            View All <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Personalisation CTA ──────────────────────────────────────────────────────
export const PersonalisationCTA = () => {
  return null;
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const Footer = () => {
  return (
    <footer className="bg-[#0B2545] pt-14 sm:pt-20 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <SchemeLogo />
            </div>
            <p className="font-['DM_Sans'] text-white/60 text-sm leading-relaxed">
              Connecting You to Government Benefits That Matter
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {['Home', 'How it Works', 'All Schemes', 'About Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Categories
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {['Agriculture', 'Healthcare', 'Education', 'Business & Startups'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Legal & Help
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Help Center', 'Contact Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['DM_Sans'] text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Schemme Inc. All rights reserved.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <span className="text-white/40 text-xs sm:text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Made in India
            </span>
            <span className="text-[#2E9F75] text-xs sm:text-sm px-3 py-1 bg-[#2E9F75]/10 rounded-full border border-[#2E9F75]/20 flex items-center gap-1">
              <ShieldCheck size={13} /> Secure Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};