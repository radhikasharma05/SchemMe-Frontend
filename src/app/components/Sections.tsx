import image_7f5e0fee18015700bb712cd959957fea12d80504 from 'figma:asset/7f5e0fee18015700bb712cd959957fea12d80504.png'
import image_c512d0fe078cfb783d5b5e125549a01da120883c from 'figma:asset/c512d0fe078cfb783d5b5e125549a01da120883c.png'
import image_ed00409f87186415fd4cfe9d98c65547b16a72cc from 'figma:asset/ed00409f87186415fd4cfe9d98c65547b16a72cc.png'
import React from 'react';
import { motion } from 'motion/react';
import {
  Sprout, HeartPulse, GraduationCap, Briefcase, Home,
  Baby, Building, PiggyBank, Users, Bus, ArrowRight,
  FileText, Cpu, CheckCircle, Search, ShieldCheck
} from 'lucide-react';

// Logo Component
const SchemeLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative">
      {/* Icon Circle */}
      <div className="w-12 h-12 flex items-center justify-center">
        <img 
          src={image_7f5e0fee18015700bb712cd959957fea12d80504}
          alt="SchemeMe Logo"
          className="w-full h-full object-contain m-[0px]"
        />
      </div>
    </div>
    {/* Text Logo */}
    <div className="flex flex-col leading-none">
      <span className="font-['Playfair_Display'] text-white text-2xl font-bold tracking-tight">
        Scheme<span className="text-[#FFD166]">Me</span>
      </span>
    </div>
  </div>
);

// --- Navbar ---
export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B2545]/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto pr-8 pl-0 h-20 flex items-center justify-between gap-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer h-full mr-auto">
          <SchemeLogo />
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search government schemes..."
              className="w-full px-5 py-2.5 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 font-['DM_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#2E9F75]/50 focus:border-white/30 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white p-2 rounded-full hover:shadow-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="font-['DM_Sans'] text-white font-semibold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#FF7A45] after:bottom-[-4px] after:left-0 text-sm">
            Home
          </a>
          <a href="#" className="font-['DM_Sans'] text-white/80 hover:text-white transition-colors font-medium text-sm">Schemes</a>
          <a href="#" className="font-['DM_Sans'] text-white/80 hover:text-white transition-colors font-medium text-sm">About</a>
          
          <button className="font-['DM_Sans'] text-white px-4 py-2 text-sm font-semibold hover:text-[#2E9F75] transition-colors">
            Sign In
          </button>
          <button className="font-['DM_Sans'] bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Stats Strip ---
export const StatsStrip = () => {
  const stats = [
    { label: "Schemes Available", value: "500+" },
    { label: "Beneficiaries", value: "2.8Cr+" },
    { label: "Verified Direct Benefits", value: "100%" },
    { label: "AI Support", value: "24/7" },
  ];

  return (
    <section className="bg-white/80 backdrop-blur-sm py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center py-6 md:py-0">
              <span className="font-['Playfair_Display'] text-4xl font-black text-[#0B2545] mb-2">{stat.value}</span>
              <span className="font-['DM_Sans'] text-[#111827]/60 font-medium text-sm uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- How It Works ---
export const HowItWorks = () => {
  const steps = [
    { title: "Enter Details", icon: FileText, desc: "Fill in your basic profile info securely." },
    { title: "AI Matching", icon: Cpu, desc: "Our engine scans 500+ schemes instantly." },
    { title: "Review Schemes", icon: Search, desc: "See exact benefits you're eligible for." },
    { title: "Apply Easily", icon: CheckCircle, desc: "One-click guidance to official portals." },
  ];

  return (
    <section className="bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 bg-[#2E9F75]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFD166]/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0B2545] mb-4">How It Works</h2>
          <p className="font-['DM_Sans'] text-[#111827]/60 max-w-2xl mx-auto">Discovering your government benefits is now easier than ever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#2E9F75]/10 text-[#2E9F75] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon size={32} />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0B2545] mb-3">{idx + 1}. {step.title}</h3>
              <p className="font-['DM_Sans'] text-[#111827]/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Categories Grid ---
export const CategoriesGrid = () => {
  const categories = [
    { name: "Agriculture", count: "24 Schemes", icon: Sprout },
    { name: "Healthcare", count: "18 Schemes", icon: HeartPulse },
    { name: "Education", count: "32 Schemes", icon: GraduationCap },
    { name: "Business", count: "15 Schemes", icon: Briefcase },
    { name: "Housing", count: "8 Schemes", icon: Home },
    { name: "Women & Child", count: "12 Schemes", icon: Baby },
    { name: "Infrastructure", count: "5 Schemes", icon: Building },
    { name: "Pension", count: "10 Schemes", icon: PiggyBank },
    { name: "Minority", count: "9 Schemes", icon: Users },
    { name: "Transport", count: "4 Schemes", icon: Bus },
  ];

  return (
    <section className="bg-white/50 backdrop-blur-sm py-24 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#2E9F75]/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-[#FF7A45]/20 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0B2545] mb-4">Browse by Category</h2>
            <p className="font-['DM_Sans'] text-[#111827]/60 max-w-2xl">Explore government initiatives segmented by your specific needs.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#0B2545] font-medium hover:text-[#2E9F75] transition-colors">
            View All <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-6 hover:border-[#2E9F75]/40 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] flex items-center justify-center mb-6 shadow-md">
                <cat.icon size={24} className="text-white" />
              </div>
              <h3 className="font-['DM_Sans'] text-[#0B2545] font-bold text-lg mb-1">{cat.name}</h3>
              <p className="font-['DM_Sans'] text-[#111827]/50 text-sm">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Personalisation CTA ---
export const PersonalisationCTA = () => {
  return null;
};

// --- Footer ---
export const Footer = () => {
  return (
    <footer className="bg-[#0B2545] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <SchemeLogo />
            </div>
            <p className="font-['DM_Sans'] text-white/60 text-sm leading-relaxed mb-6">
              Connecting You to Government Benefits That Matter
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Home</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">How it Works</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">All Schemes</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-6 uppercase tracking-wider text-sm">Categories</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Agriculture</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Healthcare</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Education</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Business & Startups</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal & Help</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="font-['DM_Sans'] text-white/60 hover:text-[#2E9F75] text-sm transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['DM_Sans'] text-white/40 text-sm">
            © 2026 Schemme Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-white/40 text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">Made in India</span>
            <span className="text-[#2E9F75] text-sm px-3 py-1 bg-[#2E9F75]/10 rounded-full border border-[#2E9F75]/20 flex items-center gap-1">
              <ShieldCheck size={14} /> Secure Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};