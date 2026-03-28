import React from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { FloatingLines } from './FloatingLines';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #F5ECD8 0%, #EDD5B5 25%, #E8C49A 45%, #D4E8CE 70%, #C8D8E4 90%, #DDD0E8 100%)'
      }}
    >
      {/* FloatingLines Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingLines
          linesGradient={[
            "#F5ECD8",
            "#EDD5B5",
            "#E8C49A",
            "#EAD6C0",
            "#D4E8CE",
            "#C2DFC9",
            "#DDD0E8",
            "#C8D8E4",
          ]}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[12, 20, 12]}
          lineDistance={[2.2, 1.8, 2.5]}
          topWavePosition={{ x: 9.0, y: 0.70, rotate: -0.25 }}
          middleWavePosition={{ x: 4.5, y: 0.15, rotate: 0.12 }}
          bottomWavePosition={{ x: 2.0, y: -0.50, rotate: -0.6 }}
          animationSpeed={0.35}
          interactive={true}
          bendRadius={3.5}
          bendStrength={-0.25}
          mouseDamping={0.025}
          parallax={true}
          parallaxStrength={0.08}
          mixBlendMode="normal"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        {/* Headline */}
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0B2545] leading-tight mb-4 sm:mb-6">
          {t.hero_headline_1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94F20] to-[#D9A030]">
            {t.hero_headline_highlight}
          </span>
          {t.hero_headline_sep}
          <br className="hidden sm:block" />
          {' '}{t.hero_headline_2}
        </h1>

        {/* Subtitle */}
        <p className="font-['DM_Sans'] text-base sm:text-lg md:text-xl text-[#111827]/70 max-w-xl sm:max-w-2xl mb-8 sm:mb-12 leading-relaxed font-bold px-2 sm:px-0">
          {t.hero_subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row sm:flex-row items-center gap-3 sm:gap-5 mb-10 sm:mb-16 w-full sm:w-auto px-4 sm:px-0">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl transition-all shadow-lg">
            <Search size={18} />
            {t.hero_cta_explore}
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E9F75] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-[#1a7a52] transition-all shadow-md">
            {t.hero_cta_learn}
          </button>
        </div>

        {/* Moving Logo Carousel */}
        <div className="w-full max-w-5xl overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-left {
              animation: scroll-left 40s linear infinite;
            }
            @media (max-width: 640px) {
              .hero-card-std { width: 160px !important; height: 200px !important; }
            }
            @media (min-width: 641px) and (max-width: 1023px) {
              .hero-card-std { width: 200px !important; height: 240px !important; }
            }
          `}} />

          <div className="flex gap-4 sm:gap-6 items-center animate-scroll-left">
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {/* Agriculture Card */}
                <div className="hero-card-std relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img
                    src="/src/assets/agriculture.jpg"
                    alt="Agriculture"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-['Playfair_Display'] text-base sm:text-xl font-bold text-white mb-1">PM-KISAN</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Support for Farmers</p>
                  </div>
                </div>

                {/* Scholarship Card */}
                <div className="hero-card-std relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img
                    src="/src/assets/scholarship.jpg"
                    alt="Scholarship"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-['Playfair_Display'] text-base sm:text-xl font-bold text-white mb-1">{t.hero_card_scholarship_title}</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">{t.hero_card_scholarship_sub}</p>
                  </div>
                </div>

                {/* Education Card */}
                <div className="hero-card-std relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img
                    src="/src/assets/education.jpg"
                    alt="Education"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Scholarship</h3>
                    <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/90">Education Assistance</p>
                  </div>
                </div>

                {/* Healthcare Card */}
                <div className="hero-card-std relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img
                    src="/src/assets/healthcare.jpg"
                    alt="Healthcare"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-['Playfair_Display'] text-base sm:text-xl font-bold text-white mb-1">Ayushman Bharat</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Health Care for All</p>
                  </div>
                </div>

                {/* Infrastructure Card */}
                <div className="hero-card-std relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img
                    src="/src/assets/infrastructure.jpg"
                    alt="Infrastructure"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-['Playfair_Display'] text-base sm:text-xl font-bold text-white mb-1">PM Awas Yojana</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Affordable Housing</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tagline Text */}
        <div
          className="font-['DM_Sans'] text-sm sm:text-[17px] md:text-[18px] text-[#4B7F6A] font-semibold mt-8 sm:mt-10 tracking-wide leading-relaxed flex items-center gap-3 sm:gap-4 px-4 sm:px-0 text-center"
          style={{ textShadow: '0 2px 8px rgba(75, 127, 106, 0.1)' }}
        >
          <div className="hidden sm:block w-[1px] h-8 bg-gradient-to-b from-transparent via-[#2E9F75] to-transparent flex-shrink-0" />
          <span>{t.hero_tagline}</span>
          <div className="hidden sm:block w-[1px] h-8 bg-gradient-to-b from-transparent via-[#2E9F75] to-transparent flex-shrink-0" />
        </div>
      </motion.div>
    </section>
  );
};