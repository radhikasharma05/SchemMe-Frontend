import React from 'react';
import { Hero } from './components/Hero';
import { SchemeCarousel } from './components/SchemeCarousel';
import { Navbar, StatsStrip, HowItWorks, CategoriesGrid, PersonalisationCTA, Footer } from './components/Sections';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden font-['DM_Sans',sans-serif] text-[#111827] bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] selection:bg-[#2E9F75] selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <SchemeCarousel />
          <StatsStrip />
          <HowItWorks />
          <CategoriesGrid />
          <PersonalisationCTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;