import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { FloatingLines } from './FloatingLines';

export const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #F5ECD8 0%, #EDD5B5 25%, #E8C49A 45%, #D4E8CE 70%, #C8D8E4 90%, #DDD0E8 100%)'
      }}
    >
      {/* FloatingLines Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingLines
          linesGradient={[
            "#F5ECD8",   // warm cream — dominant base
            "#EDD5B5",   // soft peach-beige
            "#E8C49A",   // warm peach-orange glow
            "#EAD6C0",   // light apricot blend
            "#D4E8CE",   // pale mint-green
            "#C2DFC9",   // soft sage-green
            "#DDD0E8",   // very faint lavender
            "#C8D8E4",   // pale blue-grey
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
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        {/* Headline */}
        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-black text-[#0B2545] leading-tight mb-6">
          Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94F20] to-[#D9A030]">Right Scheme</span>,<br className="hidden md:block" />
          Made for You
        </h1>

        {/* Subtitle */}
        <p className="font-['DM_Sans'] text-lg md:text-xl text-[#111827]/70 max-w-2xl mb-12 leading-relaxed font-bold">
          Personalized Government Schemes at Your Fingertips
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-16">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all shadow-lg">
            <Search size={20} />
            Explore Schemes
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#2E9F75] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a7a52] transition-all shadow-md">
            Learn More
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
          `}} />
          
          <div className="flex gap-6 items-center animate-scroll-left">
            {/* Duplicate the cards twice for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {/* PM-KISAN Card */}
                <div className="relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img 
                    src="https://images.unsplash.com/photo-1623211269755-569fec0536d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc3NDYxODc0MXww&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="PM-KISAN" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mb-1">PM-KISAN</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Support for Farmers</p>
                  </div>
                </div>

                {/* Scholarship Card */}
                <div className="relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img 
                    src="https://images.unsplash.com/photo-1758525866582-5c74fb7d9378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZHlpbmclMjBib29rc3xlbnwxfHx8fDE3NzQ2MzI4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Scholarship" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mb-1">Scholarship</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Education Assistance</p>
                  </div>
                </div>

                {/* Center Featured Card - Larger */}
                <div className="relative w-[280px] h-[320px] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 group border-4 border-white/80">
                  <img 
                    src="https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50JTIwc3R1ZHlpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0NjE0MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Scholarship" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-2">Scholarship</h3>
                    <p className="font-['DM_Sans'] text-sm text-white/90">Education Assistance</p>
                  </div>
                </div>

                {/* Ayushman Bharat Card */}
                <div className="relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img 
                    src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBlbGRlcmx5JTIwcGF0aWVudCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzc0NTkxNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Ayushman Bharat" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mb-1">Ayushman Bharat</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Health Care for All</p>
                  </div>
                </div>

                {/* PM Awas Yojana Card */}
                <div className="relative w-[240px] h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group">
                  <img 
                    src="https://images.unsplash.com/photo-1753161618091-b4cf35b9aa99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaG9sZGluZyUyMHRhYmxldCUyMHNtaWxpbmd8ZW58MXx8fHwxNzc0NjMyODExfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="PM Awas Yojana" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mb-1">PM Awas Yojana</h3>
                    <p className="font-['DM_Sans'] text-xs text-white/90">Affordable Housing</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tagline Text */}
        <div className="font-['DM_Sans'] text-[17px] md:text-[18px] text-[#4B7F6A] font-semibold mt-10 tracking-wide leading-relaxed flex items-center gap-4" style={{ textShadow: '0 2px 8px rgba(75, 127, 106, 0.1)' }}>
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#2E9F75] to-transparent"></div>
          <span>Connecting You to Government Benefits That Matter</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#2E9F75] to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};