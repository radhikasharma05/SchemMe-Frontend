import React from 'react';
import { motion } from 'motion/react';
import { HeartPulse, Leaf, Home, Rocket, Wallet, Stethoscope, Baby, GraduationCap } from 'lucide-react';

const SCHEMES = [
  {
    title: "Ayushman Bharat",
    subtitle: "Health insurance coverage up to ₹5 Lakhs per family per year.",
    tag: "Healthcare",
    icon: HeartPulse,
    featured: true,
  },
  {
    title: "PM Kisan Samman Nidhi",
    subtitle: "Direct financial support of ₹6,000 per year to farmers.",
    tag: "Agriculture",
    icon: Leaf,
    featured: false,
  },
  {
    title: "PM Awas Yojana",
    subtitle: "Affordable housing for all with subsidized interest rates.",
    tag: "Housing",
    icon: Home,
    featured: false,
  },
  {
    title: "Startup India",
    subtitle: "Empowering startups with tax benefits and easy compliance.",
    tag: "Business",
    icon: Rocket,
    featured: false,
  },
  {
    title: "Mudra Yojana",
    subtitle: "Micro-credit facility up to ₹10 Lakhs for small enterprises.",
    tag: "Finance",
    icon: Wallet,
    featured: false,
  },
  {
    title: "Beti Bachao Beti Padhao",
    subtitle: "Ensuring survival, protection, and education of the girl child.",
    tag: "Women & Child",
    icon: Baby,
    featured: false,
  },
];

export const SchemeCarousel = () => {
  // Duplicate array for seamless infinite scroll
  const duplicatedSchemes = [...SCHEMES, ...SCHEMES];

  return (
    <section className="relative overflow-hidden bg-[#F9FAFB] py-24 min-h-[500px] flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-30, 30, -30], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] bg-[#F59E0B]/20 rounded-full blur-[100px] top-[10%] left-[10%]"
        />
        <motion.div
          animate={{ y: [40, -40, 40], x: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-[#10B981]/20 rounded-full blur-[120px] top-[30%] right-[10%]"
        />
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-30, 30, -30] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[450px] h-[450px] bg-[#1E3A8A]/15 rounded-full blur-[100px] bottom-[-10%] left-[40%]"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Inline CSS for the infinite marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.75rem)); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex w-max animate-infinite-scroll gap-6 px-6">
          {duplicatedSchemes.map((scheme, idx) => {
            const Icon = scheme.icon;
            return (
              <div 
                key={idx}
                className={`
                  w-[340px] flex-shrink-0 bg-white/60 backdrop-blur-xl border border-white rounded-[20px] p-6 shadow-sm
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer
                  ${scheme.featured ? 'border-[#10B981]/30 shadow-[0_8px_30px_rgba(16,185,129,0.15)] ring-1 ring-[#10B981]/20' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center shadow-inner">
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-bold rounded-full uppercase tracking-wider">
                    {scheme.tag}
                  </span>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#111827] mb-3">
                  {scheme.title}
                </h3>
                
                <p className="font-['DM_Sans'] text-[#111827]/60 text-sm leading-relaxed mb-6">
                  {scheme.subtitle}
                </p>

                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#10B981] w-1/3 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="relative z-10 flex justify-center gap-2 mt-12">
        <div className="w-8 h-2 rounded-full bg-[#10B981]" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </section>
  );
};
