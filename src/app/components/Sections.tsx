import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Sprout, HeartPulse, GraduationCap, Briefcase, Home,
  Baby, Building, PiggyBank, Users, Bus, ArrowRight,
  FileText, Cpu, CheckCircle, Search, ShieldCheck,
  UserCircle, LogIn, UserPlus, Globe, ChevronDown, Check, LogOut, LayoutDashboard, X
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import logoImg from '../../assets/logo.png';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import localSchemes from '../../res/schemes.json';

// ─── Scheme type for search ───────────────────────────────────────────────────
interface RawScheme {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  descriptionFull?: string;
  benefits?: string;
  eligibility?: string;
  category?: string;
  level?: string;
  stateName?: string;
  tags?: string[];
}

// ─── Shared seeded-random scheme count (200-350) ──────────────────────────────
function _seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}
function schemeCount(seed: number) {
  return Math.floor(_seededRandom(seed) * 151) + 200;
}


// ─── Logo ────────────────────────────────────────────────────────────────────
const SchemeLogo = () => (
  <div className="flex items-center gap-1.5 notranslate" translate="no">
    <img
      src={logoImg}
      alt="SchemMe Logo"
      className="w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 object-contain flex-shrink-0 drop-shadow-md"
    />
    <span className="hidden lg:block font-['Playfair_Display'] text-white text-2xl font-bold tracking-tight leading-none">
      Schem<span className="text-[#FFD166]">Me</span>
    </span>
  </div>
);

// ─── Navbar Search Hook ───────────────────────────────────────────────────────
function useSchemeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RawScheme[]>([]);
  const [open, setOpen] = useState(false);
  const schemes = localSchemes as RawScheme[];

  const search = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    const lower = q.toLowerCase();
    const hits = schemes.filter(s =>
      (s.name || '').toLowerCase().includes(lower) ||
      (s.description || '').toLowerCase().includes(lower) ||
      (s.category || '').toLowerCase().includes(lower) ||
      (Array.isArray(s.tags) && s.tags.some(tag => tag.toLowerCase().includes(lower)))
    ).slice(0, 8);
    setResults(hits);
    setOpen(hits.length > 0);
  }, [schemes]);

  return { query, setQuery: search, results, open, setOpen };
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export const Navbar = () => {
  const { token, user, logout } = useAuth();
  const isLoggedIn = !!token;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Language picker — wired to global context
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Search state
  const { query, setQuery, results, open, setOpen } = useSchemeSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const [highlighted, setHighlighted] = useState(-1);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setOpen]);

  const goToScheme = (scheme: RawScheme) => {
    setOpen(false);
    setQuery('');
    navigate(`/schemes?q=${encodeURIComponent(scheme.name)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted >= 0 && results[highlighted]) { goToScheme(results[highlighted]); }
      else if (query.trim()) { setOpen(false); navigate(`/schemes?q=${encodeURIComponent(query.trim())}`); setQuery(''); }
    }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  const CAT_COLORS: Record<string, string> = {
    Agriculture:'#059669', Health:'#2563eb', Education:'#d97706',
    Business:'#0d9488', Banking:'#0d9488', Housing:'#4f46e5',
    'Social Welfare':'#7c3aed', Skills:'#ea580c', Transport:'#ea580c',
    Tourism:'#d97706', Sports:'#dc2626', Science:'#1d4ed8',
    Law:'#374151', Utility:'#0891b2', 'Women & Child':'#db2777',
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-lg" style={{ background: 'rgba(11,37,69,0.97)', backdropFilter: 'blur(12px)' }}>

      {/* ── Row 1: Logo | Search | Lang | Auth ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center gap-2 sm:gap-3">

        {/* Logo – left */}
        <div className="flex-shrink-0 cursor-pointer">
          <Link to="/">
            <SchemeLogo />
          </Link>
        </div>

        {/* Search – centre */}
        <div className="flex-1 min-w-0">
          <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.45)', pointerEvents: 'none' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setHighlighted(-1); }}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (results.length > 0) setOpen(true); }}
              placeholder={t.nav_search_placeholder}
              className="w-full pl-9 pr-10 py-2 sm:py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 font-['DM_Sans'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E9F75]/60 focus:border-[#2E9F75]/40 transition-all"
            />
            {query ? (
              <button
                onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/15 text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/25 transition-all"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            ) : (
              <button
                onClick={() => { if (query.trim()) navigate(`/schemes?q=${encodeURIComponent(query.trim())}`); else navigate('/schemes'); }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white w-7 h-7 flex items-center justify-center rounded-full hover:shadow-md transition-all"
                aria-label="Search"
              >
                <Search size={13} />
              </button>
            )}

            {/* ── Search Dropdown ── */}
            {open && results.length > 0 && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                background: '#0B2545', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                zIndex: 1000,
              }}>
                {/* header */}
                <div style={{ padding: '10px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Schemes matching "{query}"
                  </span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {results.map((scheme, idx) => {
                  const catColor = CAT_COLORS[scheme.category || ''] || '#2E9F75';
                  return (
                    <button
                      key={scheme.id}
                      onClick={() => goToScheme(scheme)}
                      onMouseEnter={() => setHighlighted(idx)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '10px 16px', textAlign: 'left', border: 'none', cursor: 'pointer',
                        background: highlighted === idx ? 'rgba(46,159,117,0.15)' : 'transparent',
                        borderBottom: idx < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        transition: 'background 0.15s',
                      }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${catColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <Search size={13} color={catColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {scheme.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                          {scheme.category && (
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 800, paddingInline: 7, paddingBlock: 2, borderRadius: 99, background: `${catColor}22`, color: catColor }}>
                              {scheme.category}
                            </span>
                          )}
                          {scheme.level && (
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                              {scheme.level === 'Central' ? '🏛️ Central' : `📍 ${scheme.stateName || 'State'}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* footer: see all results */}
                <button
                  onClick={() => { navigate(`/schemes?q=${encodeURIComponent(query.trim())}`); setOpen(false); setQuery(''); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '10px 16px', border: 'none', cursor: 'pointer',
                    background: 'rgba(46,159,117,0.12)', borderTop: '1px solid rgba(46,159,117,0.20)',
                    fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 800, color: '#2E9F75',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(46,159,117,0.22)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(46,159,117,0.12)')}
                >
                  See all results for "{query}" →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Language picker ── */}
        <div ref={langRef} className="relative flex-shrink-0">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 sm:gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all"
            aria-label="Change language"
          >
            <Globe size={14} className="flex-shrink-0 text-[#4ecca3]" />
            <span className="font-bold tracking-wide">{language.code}</span>
            <ChevronDown
              size={12}
              className={`flex-shrink-0 transition-transform duration-200 text-white/60 ${langOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {langOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#0B2545] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50">
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
                <Globe size={13} className="text-[#4ecca3]" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">{t.nav_select_language}</span>
              </div>
              {/* List */}
              <div className="max-h-64 overflow-y-auto scrollbar-none py-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                      language.code === lang.code
                        ? 'bg-[#2E9F75]/20 text-[#4ecca3]'
                        : 'text-white/75 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{lang.native}</span>
                      <span className="text-xs text-white/40 mt-0.5">{lang.label}</span>
                    </div>
                    {language.code === lang.code && (
                      <Check size={14} className="text-[#4ecca3] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Auth – right */}
        {isLoggedIn ? (
          <div ref={userMenuRef} className="relative flex-shrink-0">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all"
              aria-label="User menu"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2E9F75] to-[#FFD166] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : <UserCircle size={14} />}
              </div>
              <span className="hidden sm:inline whitespace-nowrap max-w-[80px] truncate">
                {user?.name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Account'}
              </span>
              <ChevronDown size={12} className={`hidden sm:block text-white/60 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#0B2545] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-white text-sm font-semibold truncate">{user?.name ?? 'User'}</p>
                  <p className="text-white/45 text-xs truncate mt-0.5">{user?.email ?? ''}</p>
                </div>
                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/dashboard'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-white/75 hover:bg-white/8 hover:text-white text-sm transition-colors"
                >
                  <LayoutDashboard size={15} className="text-[#4ecca3]" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-sm transition-colors border-t border-white/10"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#FF7A45] to-[#FFD166] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold hover:shadow-lg transition-all shadow-md whitespace-nowrap"
            >
              <LogIn size={15} className="flex-shrink-0" />
              <span>{t.nav_login}</span>
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap"
            >
              <UserPlus size={15} className="flex-shrink-0" />
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Row 2: Nav links – centered, always visible ── */}
      <div className="border-t border-white/10" style={{ background: 'rgba(11,37,69,0.85)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center gap-1 sm:gap-3 overflow-x-auto scrollbar-none h-11 sm:h-12">
            {[
              { key: '/',             label: t.nav_home },
              { key: '/schemes',      label: t.nav_schemes },
              { key: '/how-it-works', label: t.nav_how_it_works },
              { key: '/categories',   label: t.nav_categories },
              { key: '/about',        label: t.nav_about },
            ].map((link) => {
              const isActive = link.key === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.key);
              return (
                <Link
                  key={link.key}
                  to={link.key}
                  className={`
                    font-['DM_Sans'] text-xs sm:text-sm whitespace-nowrap
                    px-4 sm:px-6 py-2 sm:py-2.5 rounded-full
                    transition-all duration-200 flex-shrink-0 font-medium tracking-wide
                    ${
                      isActive
                        ? 'bg-[#2E9F75]/20 text-[#4ecca3] font-semibold ring-1 ring-[#2E9F75]/50'
                        : 'text-white/65 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

// ─── Stats Strip ──────────────────────────────────────────────────────────────
export const StatsStrip = () => {
  const { t } = useLanguage();
  const stats = [
    { label: t.stat_schemes_label, value: '4000+' },
    { label: t.stat_beneficiaries_label, value: '2.8Cr+' },
    { label: t.stat_verified_label, value: '100%' },
    { label: t.stat_ai_label, value: '24/7' },
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
  const { t } = useLanguage();
  const steps = [
    { title: t.hiw_step1_title, icon: FileText, desc: t.hiw_step1_desc },
    { title: t.hiw_step2_title, icon: Cpu,      desc: t.hiw_step2_desc },
    { title: t.hiw_step3_title, icon: Search,   desc: t.hiw_step3_desc },
    { title: t.hiw_step4_title, icon: CheckCircle, desc: t.hiw_step4_desc },
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
            {t.hiw_heading}
          </h2>
          <p className="font-['DM_Sans'] text-[#111827]/60 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
            {t.hiw_sub}
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
  const { t } = useLanguage();

  // Stable category list with seeded random scheme counts
  const categories = [
    { name: t.cat_agriculture,    icon: Sprout,        tag: 'Agriculture',   seed: 1 },
    { name: t.cat_healthcare,     icon: HeartPulse,    tag: 'Health',        seed: 2 },
    { name: t.cat_education,      icon: GraduationCap, tag: 'Education',     seed: 3 },
    { name: t.cat_business,       icon: Briefcase,     tag: 'Business',      seed: 4 },
    { name: t.cat_housing,        icon: Home,          tag: 'Housing',       seed: 5 },
    { name: t.cat_women_child,    icon: Baby,          tag: 'Women & Child', seed: 6 },
    { name: t.cat_infrastructure, icon: Building,      tag: 'Infrastructure',seed: 7 },
    { name: t.cat_pension,        icon: PiggyBank,     tag: 'Pension',       seed: 8 },
    { name: t.cat_minority,       icon: Users,         tag: 'Minority',      seed: 9 },
    { name: t.cat_transport,      icon: Bus,           tag: 'Transport',     seed: 10 },
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
              {t.cat_heading}
            </h2>
            <p className="font-['DM_Sans'] text-[#111827]/60 text-sm sm:text-base max-w-2xl">
              {t.cat_sub}
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden sm:flex items-center gap-2 text-[#0B2545] font-medium hover:text-[#2E9F75] transition-colors whitespace-nowrap"
          >
            {t.cat_view_all} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/schemes?category=${encodeURIComponent(cat.tag)}`}
              className="group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 hover:border-[#2E9F75]/40 hover:shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 cursor-pointer block"
            >
              <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#1a7a52] flex items-center justify-center mb-3 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <cat.icon size={18} className="text-white sm:hidden" />
                <cat.icon size={24} className="text-white hidden sm:block" />
              </div>
              <h3 className="font-['DM_Sans'] text-[#0B2545] font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 leading-tight group-hover:text-[#2E9F75] transition-colors">
                {cat.name}
              </h3>
              <p className="font-['DM_Sans'] text-[#111827]/50 text-xs sm:text-sm">
                {schemeCount(cat.seed)}+ Schemes
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            to="/categories"
            className="flex items-center gap-2 text-[#0B2545] font-semibold border border-[#0B2545]/20 px-6 py-2.5 rounded-full hover:text-[#2E9F75] hover:border-[#2E9F75]/40 transition-colors text-sm"
          >
            {t.cat_view_all} <ArrowRight size={16} />
          </Link>
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
  const { t } = useLanguage();
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
              {t.footer_tagline}
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-['DM_Sans'] text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              {t.footer_nav_heading}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[t.footer_nav_home, t.footer_nav_how, t.footer_nav_all_schemes, t.footer_nav_about].map((item) => (
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
              {t.footer_cat_heading}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[t.cat_agriculture, t.cat_healthcare, t.cat_education, t.cat_business].map((item) => (
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
              {t.footer_legal_heading}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[t.footer_legal_privacy, t.footer_legal_terms, t.footer_legal_help, t.footer_legal_contact].map((item) => (
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
            {t.footer_copyright}
          </p>
          <div className="flex gap-3 sm:gap-4">
            <span className="text-white/40 text-xs sm:text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">
              {t.footer_made_in_india}
            </span>
            <span className="text-[#2E9F75] text-xs sm:text-sm px-3 py-1 bg-[#2E9F75]/10 rounded-full border border-[#2E9F75]/20 flex items-center gap-1">
              <ShieldCheck size={13} /> {t.footer_secure}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};