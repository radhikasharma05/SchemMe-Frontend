import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, RefreshCw, AlertCircle } from 'lucide-react';
import { Footer } from '../components/Sections';
import SchemeDetailModal from '../components/SchemeDetailModal';
import localSchemes from '../../res/schemes.json';

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = 'http://192.168.137.1:3000/api';

// ─── Categories (with visual config) ─────────────────────────────────────────
const CATEGORIES = [
  { label: 'All',           api: null,             icon: '🏛️', color: '#2E9F75', grad: 'from-emerald-500 to-teal-500' },
  { label: 'Agriculture',   api: 'Agriculture',    icon: '🌾', color: '#84CC16', grad: 'from-lime-500 to-green-500' },
  { label: 'Banking',       api: 'Banking',        icon: '🏦', color: '#14B8A6', grad: 'from-teal-500 to-cyan-500' },
  { label: 'Business',      api: 'Business',       icon: '💼', color: '#8B5CF6', grad: 'from-violet-500 to-purple-600' },
  { label: 'Education',     api: 'Education',      icon: '🎓', color: '#3B82F6', grad: 'from-blue-500 to-indigo-600' },
  { label: 'Health',        api: 'Health',         icon: '🏥', color: '#10B981', grad: 'from-emerald-500 to-green-600' },
  { label: 'Housing',       api: 'Housing',        icon: '🏠', color: '#6366F1', grad: 'from-indigo-500 to-purple-600' },
  { label: 'Law',           api: 'Law',            icon: '⚖️', color: '#64748B', grad: 'from-slate-500 to-gray-600' },
  { label: 'Science',       api: 'Science',        icon: '🔬', color: '#0EA5E9', grad: 'from-sky-500 to-blue-600' },
  { label: 'Skills',        api: 'Skills',         icon: '🛠️', color: '#F97316', grad: 'from-orange-500 to-amber-500' },
  { label: 'Social Welfare',api: 'Social Welfare', icon: '🤝', color: '#7C3AED', grad: 'from-violet-600 to-purple-700' },
  { label: 'Sports',        api: 'Sports',         icon: '🏅', color: '#EF4444', grad: 'from-red-500 to-rose-600' },
  { label: 'Transport',     api: 'Transport',      icon: '🚌', color: '#06B6D4', grad: 'from-cyan-500 to-teal-600' },
  { label: 'Tourism',       api: 'Tourism',        icon: '✈️', color: '#F59E0B', grad: 'from-amber-500 to-orange-500' },
  { label: 'Utility',       api: 'Utility',        icon: '💧', color: '#0891B2', grad: 'from-cyan-600 to-blue-600' },
  { label: 'Women & Child', api: 'Women & Child',  icon: '👩‍👧', color: '#EC4899', grad: 'from-pink-500 to-rose-500' },
];

// ─── Category visual config (mirrors SchemeDetailModal) ───────────────────────
const CAT_CFG: Record<string, { bg: string; text: string; icon: string; grad: string }> = {
  Education:        { bg:'rgba(245,158,11,0.12)',  text:'#d97706', icon:'🎓', grad:'from-amber-500 to-orange-500' },
  Health:           { bg:'rgba(59,130,246,0.12)',  text:'#2563eb', icon:'🏥', grad:'from-blue-500 to-indigo-600' },
  Women:            { bg:'rgba(236,72,153,0.12)',  text:'#db2777', icon:'👩', grad:'from-pink-500 to-rose-500' },
  'Women & Child':  { bg:'rgba(236,72,153,0.12)',  text:'#db2777', icon:'👩‍👧', grad:'from-pink-500 to-rose-500' },
  'Social Welfare': { bg:'rgba(139,92,246,0.12)',  text:'#7c3aed', icon:'🤝', grad:'from-violet-500 to-purple-600' },
  Agriculture:      { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'🌾', grad:'from-emerald-500 to-green-600' },
  Business:         { bg:'rgba(20,184,166,0.12)',  text:'#0d9488', icon:'💼', grad:'from-teal-500 to-cyan-600' },
  Banking:          { bg:'rgba(20,184,166,0.12)',  text:'#0d9488', icon:'🏦', grad:'from-teal-500 to-cyan-600' },
  Finance:          { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'💳', grad:'from-green-500 to-emerald-600' },
  Employment:       { bg:'rgba(14,165,233,0.12)',  text:'#0284c7', icon:'🛠️', grad:'from-sky-500 to-blue-600' },
  Skills:           { bg:'rgba(249,115,22,0.12)',  text:'#ea580c', icon:'🛠️', grad:'from-orange-500 to-amber-500' },
  Housing:          { bg:'rgba(99,102,241,0.12)',  text:'#4f46e5', icon:'🏠', grad:'from-indigo-500 to-purple-600' },
  Transport:        { bg:'rgba(249,115,22,0.12)',  text:'#ea580c', icon:'🚌', grad:'from-orange-500 to-red-500' },
  Tourism:          { bg:'rgba(245,158,11,0.12)',  text:'#d97706', icon:'✈️', grad:'from-amber-500 to-orange-500' },
  Utility:          { bg:'rgba(6,182,212,0.12)',   text:'#0891b2', icon:'💧', grad:'from-cyan-500 to-teal-600' },
  'Science & Tech': { bg:'rgba(59,130,246,0.12)',  text:'#1d4ed8', icon:'🔬', grad:'from-blue-600 to-indigo-700' },
  Science:          { bg:'rgba(59,130,246,0.12)',  text:'#1d4ed8', icon:'🔬', grad:'from-sky-500 to-blue-600' },
  Sports:           { bg:'rgba(239,68,68,0.12)',   text:'#dc2626', icon:'🏅', grad:'from-red-500 to-rose-600' },
  Law:              { bg:'rgba(107,114,128,0.12)', text:'#374151', icon:'⚖️', grad:'from-gray-500 to-gray-600' },
  Legal:            { bg:'rgba(107,114,128,0.12)', text:'#374151', icon:'⚖️', grad:'from-gray-500 to-gray-600' },
  Other:            { bg:'rgba(11,37,69,0.08)',    text:'#0B2545', icon:'📋', grad:'from-gray-400 to-gray-500' },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApiScheme {
  id?: string | number;
  scheme_name?: string;   // field name used by backend API
  name?: string;
  title?: string;
  description?: string;
  descriptionFull?: string;
  benefits?: string;
  eligibility?: string;
  application?: string;
  documents?: string;
  category?: string;
  level?: string;
  stateName?: string;
  slug?: string;
  tags?: string[];
  [key: string]: unknown;
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white/70 rounded-2xl overflow-hidden border border-white/60 shadow-sm animate-pulse">
      <div className="h-1.5 w-full bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-5/6 bg-gray-100 rounded" />
        <div className="h-16 w-full bg-gray-100 rounded-xl" />
        <div className="flex gap-1.5">
          <div className="h-6 w-14 bg-gray-100 rounded-full" />
          <div className="h-6 w-14 bg-gray-100 rounded-full" />
        </div>
        <div className="h-10 w-full bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Scheme Card ──────────────────────────────────────────────────────────────
function SchemeCard({ scheme, onExplore, idx }: { scheme: ApiScheme; onExplore: (s: ApiScheme) => void; idx: number }) {
  const [hov, setHov] = useState(false);
  const name     = scheme.scheme_name || scheme.name || scheme.title || 'Unnamed Scheme';
  const desc     = scheme.description || scheme.descriptionFull || '';
  const category = scheme.category || 'Other';

  // Normalise before passing to modal so it always has a `name` field
  const normalised = { ...scheme, name: name };
  const cfg      = CAT_CFG[category] || CAT_CFG['Other'];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(16px)',
        border: hov ? '1.5px solid rgba(46,159,117,0.35)' : '1.5px solid rgba(11,37,69,0.08)',
        boxShadow: hov ? '0 20px 48px rgba(11,37,69,0.14)' : '0 2px 16px rgba(11,37,69,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        animationDelay: `${Math.min(idx, 11) * 0.05}s`,
      }}
    >
      {/* Category color bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.grad}`} />

      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 800,
            paddingInline: 10, paddingBlock: 4, borderRadius: 99,
            background: cfg.bg, color: cfg.text,
          }}>
            {cfg.icon} {category}
          </span>
          {scheme.level && (
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 700,
              paddingInline: 10, paddingBlock: 4, borderRadius: 99,
              background: scheme.level === 'Central' ? 'rgba(37,99,235,0.10)' : 'rgba(124,58,237,0.10)',
              color: scheme.level === 'Central' ? '#1d4ed8' : '#6d28d9',
            }}>
              {scheme.level === 'Central' ? '🏛️ Central' : `📍 ${scheme.stateName || 'State'}`}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 16, fontWeight: 800, lineHeight: 1.35,
          color: hov ? '#2E9F75' : '#0B2545',
          transition: 'color 0.2s', margin: 0,
        }}>
          {name}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.6,
          color: 'rgba(17,24,39,0.60)', margin: 0, flex: 1,
        }}>
          {desc.slice(0, 140)}{desc.length > 140 ? '…' : ''}
        </p>

        {/* Benefits preview */}
        {scheme.benefits && (
          <div style={{ background: 'rgba(46,159,117,0.06)', border: '1px solid rgba(46,159,117,0.15)', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 800, color: '#2E9F75', marginBottom: 3 }}>
              💰 Benefits
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#0B2545', lineHeight: 1.5 }}>
              {scheme.benefits.slice(0, 150)}{scheme.benefits.length > 150 ? '…' : ''}
            </div>
          </div>
        )}

        {/* Tags */}
        {Array.isArray(scheme.tags) && scheme.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {scheme.tags.slice(0, 4).map((tag: string) => (
              <span key={tag} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
                paddingInline: 9, paddingBlock: 3, borderRadius: 99,
                background: 'rgba(46,159,117,0.10)', color: '#2E9F75',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Explore button */}
        <button
          onClick={() => onExplore(normalised)}
          style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 13,
            paddingBlock: 11, borderRadius: 12,
            border: `2px solid ${hov ? 'transparent' : '#2E9F75'}`,
            background: hov ? 'linear-gradient(135deg,#2E9F75,#10B981)' : 'transparent',
            color: hov ? '#fff' : '#2E9F75',
            cursor: 'pointer', width: '100%',
            transition: 'all 0.22s ease',
            boxShadow: hov ? '0 4px 16px rgba(46,159,117,0.30)' : 'none',
          }}
        >
          Explore Scheme →
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [schemes,        setSchemes]        = useState<ApiScheme[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<ApiScheme | null>(null);

  // ── Fetch schemes from API ─────────────────────────────────────────────────
  const fetchSchemes = useCallback(async (cat: typeof CATEGORIES[0]) => {
    setLoading(true);
    setError(null);
    setSchemes([]);

    // "All" tab → use local JSON (no all-schemes API available)
    if (!cat.api) {
      setSchemes(localSchemes as ApiScheme[]);
      setLoading(false);
      return;
    }

    try {
      const url = `${API_BASE}/schemes?category=${encodeURIComponent(cat.api)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      // Handle both array and { schemes: [...] } shapes
      const list: ApiScheme[] = Array.isArray(data)
        ? data
        : data.schemes ?? data.data ?? [];
      setSchemes(list);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load schemes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchemes(activeCategory);
  }, [activeCategory, fetchSchemes]);

  // ── Client-side search filter ──────────────────────────────────────────────
  const filtered = searchQuery.trim()
    ? schemes.filter(s => {
        const q = searchQuery.toLowerCase();
        const schemeName = (s.scheme_name || s.name || s.title || '').toLowerCase();
        return (
          schemeName.includes(q) ||
          (s.description || '').toLowerCase().includes(q) ||
          (s.benefits || '').toLowerCase().includes(q) ||
          (s.category || '').toLowerCase().includes(q) ||
          (Array.isArray(s.tags) && s.tags.some((t: string) => t.includes(q)))
        );
      })
    : schemes;

  const activeCfg = CAT_CFG[activeCategory.label] || CAT_CFG['Other'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF9F0 50%, #F0F4FF 100%)' }}>

      {/* ── Hero banner ── */}
      <div style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1a3a6b 60%, #0d3d2e 100%)', position: 'relative', paddingTop: 120, paddingBottom: 60, paddingInline: 20, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.10, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 40, left: 40, width: 260, height: 260, background: '#2E9F75', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 40, width: 340, height: 340, background: '#FFD166', borderRadius: '50%', filter: 'blur(100px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, fontWeight: 700,
              paddingInline: 16, paddingBlock: 6, borderRadius: 99,
              background: 'rgba(46,159,117,0.20)', border: '1px solid rgba(46,159,117,0.30)',
              color: '#4ecca3', marginBottom: 16,
            }}>
              3,400+ Schemes · 15 Categories · Live API Data
            </span>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#fff',
              margin: '0 0 14px', lineHeight: 1.2,
            }}>
              Browse All{' '}
              <span style={{ background: 'linear-gradient(90deg,#FFD166,#FF7A45)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Government Schemes
              </span>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.70)', margin: '0 auto 28px', maxWidth: 560 }}>
              Select a category below and instantly see real schemes from the backend database.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
            <Search size={17} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.40)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, benefit or keyword…"
              style={{
                width: '100%', paddingLeft: 44, paddingRight: 44, paddingBlock: 14,
                borderRadius: 16, border: '1.5px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
                color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 14,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.50)' }}>
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(11,37,69,0.06)', position: 'sticky', top: 64, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 20px', overflowX: 'auto', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory.label === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                style={{
                  whiteSpace: 'nowrap', flexShrink: 0,
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13,
                  paddingInline: 16, paddingBlock: 8, borderRadius: 99,
                  border: isActive ? 'none' : '1.5px solid rgba(11,37,69,0.10)',
                  background: isActive
                    ? 'linear-gradient(135deg,#2E9F75,#10B981)'
                    : 'rgba(255,255,255,0.70)',
                  color: isActive ? '#fff' : '#0B2545',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 14px rgba(46,159,117,0.30)' : 'none',
                  transition: 'all 0.20s ease',
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 20px 60px' }}>

        {/* Results header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 800, color: '#0B2545', margin: '0 0 4px' }}>
              {activeCategory.icon} {activeCategory.label === 'All' ? 'All Schemes' : `${activeCategory.label} Schemes`}
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(17,24,39,0.55)', margin: 0 }}>
            {loading
              ? 'Loading…'
              : error
                ? 'Could not load schemes'
                : activeCategory.api === null
                  ? `Showing ${filtered.length.toLocaleString()} of ${(localSchemes as unknown[]).length.toLocaleString()} saved schemes${searchQuery ? ' (filtered)' : ''}`
                  : `${filtered.length} scheme${filtered.length !== 1 ? 's' : ''} from API${searchQuery ? ' (filtered)' : ''}`}
            </p>
          </div>
          {error && (
            <button
              onClick={() => fetchSchemes(activeCategory)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13,
                paddingInline: 16, paddingBlock: 8, borderRadius: 99,
                border: '1.5px solid rgba(239,68,68,0.30)',
                background: 'rgba(239,68,68,0.06)', color: '#dc2626', cursor: 'pointer',
              }}
            >
              <RefreshCw size={14} /> Retry
            </button>
          )}
        </div>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Error state ── */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.75)', borderRadius: 20, border: '1.5px solid rgba(239,68,68,0.15)' }}
          >
            <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 14px' }} />
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 800, color: '#0B2545', margin: '0 0 8px' }}>
              Unable to reach the server
            </h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(17,24,39,0.55)', margin: '0 0 20px' }}>
              {error} — Make sure the backend is running at <code style={{ background: 'rgba(11,37,69,0.08)', padding: '2px 6px', borderRadius: 6 }}>{API_BASE}</code>
            </p>
            <button
              onClick={() => fetchSchemes(activeCategory)}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14,
                paddingInline: 24, paddingBlock: 12, borderRadius: 12,
                border: 'none', background: 'linear-gradient(135deg,#2E9F75,#10B981)',
                color: '#fff', cursor: 'pointer', boxShadow: '0 4px 16px rgba(46,159,117,0.30)',
              }}
            >
              ↺ Retry
            </button>
          </motion.div>
        )}

        {/* ── Scheme grid ── */}
        {!loading && !error && (
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.75)', borderRadius: 20 }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>🔍</div>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 800, color: '#0B2545', margin: '0 0 8px' }}>
                  {searchQuery ? 'No matching schemes' : 'No schemes found'}
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(17,24,39,0.55)', margin: '0 0 20px' }}>
                  {searchQuery ? 'Try a different keyword.' : 'This category has no schemes from the API yet.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13, paddingInline: 20, paddingBlock: 9, borderRadius: 99, border: 'none', background: 'linear-gradient(135deg,#2E9F75,#10B981)', color: '#fff', cursor: 'pointer' }}
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                layout
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}
              >
                {filtered.map((scheme, idx) => (
                  <motion.div
                    key={scheme.id ?? idx}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.30, delay: Math.min(idx, 11) * 0.05 }}
                  >
                    <SchemeCard scheme={scheme} idx={idx} onExplore={setSelectedScheme} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <Footer />

      {/* ── Scheme Detail Modal ── */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
}
