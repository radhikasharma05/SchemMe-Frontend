import React from 'react';
import { Routes, Route } from 'react-router';
import { Navbar } from './components/Sections';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden font-['DM_Sans',sans-serif] text-[#111827] selection:bg-[#2E9F75] selection:text-white">
        <Routes>
          {/* Login — full screen, no shared navbar */}
          <Route path="/login" element={<LoginPage />} />

          {/* All other pages share the Navbar */}
          <Route path="/" element={<><Navbar /><main><HomePage /></main></>} />
          <Route path="/schemes" element={<><Navbar /><main><SchemesPage /></main></>} />
          <Route path="/how-it-works" element={<><Navbar /><main><HowItWorksPage /></main></>} />
          <Route path="/categories" element={<><Navbar /><main><CategoriesPage /></main></>} />
          <Route path="/about" element={<><Navbar /><main><AboutPage /></main></>} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;