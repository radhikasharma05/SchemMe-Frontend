import React from 'react';
import { Routes, Route } from 'react-router';
import { Navbar } from './components/Sections';
import { LanguageProvider } from './context/LanguageContext';
import SBotWidget from './components/SBotWidget';

// Pages
import HomePage       from './pages/HomePage';
import LoginPage      from './pages/LoginPage';
import SignupPage     from './pages/SignupPage';
import SchemesPage    from './pages/SchemesPage';
import AboutPage      from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CategoriesPage from './pages/CategoriesPage';

// Shared shell that wraps all pages with Navbar + SBot
const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-hidden font-['DM_Sans',sans-serif] text-[#111827] bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] selection:bg-[#2E9F75] selection:text-white">
    <Navbar />
    <main>{children}</main>
    <SBotWidget />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/"             element={<AppShell><HomePage /></AppShell>} />
        <Route path="/schemes"      element={<AppShell><SchemesPage /></AppShell>} />
        <Route path="/how-it-works" element={<AppShell><HowItWorksPage /></AppShell>} />
        <Route path="/categories"   element={<AppShell><CategoriesPage /></AppShell>} />
        <Route path="/about"        element={<AppShell><AboutPage /></AppShell>} />
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/signup"       element={<SignupPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;