import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { Navbar } from './components/Sections';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useIsAuthenticated } from './context/AuthContext';
import SBotWidget from './components/SBotWidget';

// Pages
import HomePage       from './pages/HomePage';
import LoginPage      from './pages/LoginPage';
import SignupPage     from './pages/SignupPage';
import SchemesPage    from './pages/SchemesPage';
import AboutPage      from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CategoriesPage from './pages/CategoriesPage';
import DashboardPage  from './pages/DashboardPage';

// ─── Shared shell — wraps pages with Navbar + SBot ────────────────────────────
const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-hidden font-['DM_Sans',sans-serif] text-[#111827] bg-gradient-to-br from-[#FFF9F0] via-[#F0FDF4] to-[#FEF3E2] selection:bg-[#2E9F75] selection:text-white">
    <Navbar />
    <main>{children}</main>
    <SBotWidget />
  </div>
);

// ─── Protected route — redirects to /login if not authenticated ───────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useIsAuthenticated();
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

// ─── App routes ───────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"             element={<AppShell><HomePage /></AppShell>} />
      <Route path="/schemes"      element={<AppShell><SchemesPage /></AppShell>} />
      <Route path="/how-it-works" element={<AppShell><HowItWorksPage /></AppShell>} />
      <Route path="/categories"   element={<AppShell><CategoriesPage /></AppShell>} />
      <Route path="/about"        element={<AppShell><AboutPage /></AppShell>} />

      {/* Auth pages (no shell) */}
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected pages */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppShell>
            <DashboardPage />
          </AppShell>
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: { fontFamily: 'DM Sans, sans-serif' },
          }}
        />
        <AppRoutes />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;