import React from 'react';
import { Routes, Route } from 'react-router';
import { Navbar, StatsStrip, HowItWorks, CategoriesGrid, PersonalisationCTA, Footer } from './components/Sections';
import { Hero } from './components/Hero';
import { SchemeCarousel } from './components/SchemeCarousel';
import { LanguageProvider } from './context/LanguageContext';
import SBotWidget from './components/SBotWidget';
import SchemeFinder from './components/SchemeFinder';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// ─── Home layout (with Navbar + all sections) ─────────────────────────────────
const HomeLayout = () => (
  <div className="min-h-screen overflow-x-hidden font-['DM_Sans',sans-serif] text-[#111827] bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] selection:bg-[#2E9F75] selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <SchemeFinder />
      <div id="popular-schemes"><SchemeCarousel /></div>
      <StatsStrip />
      <HowItWorks />
      <CategoriesGrid />
      <PersonalisationCTA />
    </main>
    <Footer />
    <SBotWidget />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;