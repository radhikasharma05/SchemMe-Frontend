import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { getSavedSchemes } from '../utils/matchSchemes';
import SchemeDetailModal from './SchemeDetailModal';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Scheme {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  benefits?: string;
  category?: string;
  level?: string;
  stateName?: string;
}

// ─── Category colours ─────────────────────────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Education:      { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200'    },
  Agriculture:    { bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200'   },
  Health:         { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200'    },
  Business:       { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200'   },
  Women:          { bg: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-200'    },
  'Social Welfare':{ bg:'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200'  },
};
const DEFAULT_COLOR = { bg: 'bg-[#2E9F75]/10', text: 'text-[#2E9F75]', border: 'border-[#2E9F75]/20' };

function catColor(cat?: string) {
  return CAT_COLORS[cat ?? ''] ?? DEFAULT_COLOR;
}

// ─── Personalising animation ──────────────────────────────────────────────────
const PersonalisingOverlay = () => {
  const steps = [
    'Reading your profile…',
    'Matching eligibility criteria…',
    'Filtering by state & category…',
    'Ranking best schemes for you…',
    'Almost ready!',
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 gap-6"
    >
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#2E9F75]/20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
        <div className="absolute inset-0 rounded-full border-t-4 border-[#2E9F75] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={24} className="text-[#2E9F75]" />
        </div>
      </div>

      {/* Step text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="font-['DM_Sans'] text-[#0B2545] text-base font-medium"
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2E9F75] to-[#FFD166] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// ─── Scheme card ──────────────────────────────────────────────────────────────
const SchemeCard = ({ scheme, index, onClick }: { scheme: Scheme; index: number; onClick: () => void }) => {
  const cc = catColor(scheme.category);
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#2E9F75]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-lg border ${cc.bg} ${cc.text} ${cc.border}`}>
          {scheme.category ?? 'General'}
        </span>
        {scheme.level && (
          <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
            {scheme.level}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-['DM_Sans'] text-[#0B2545] text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#2E9F75] transition-colors">
        {scheme.name}
      </h3>

      {/* Description */}
      {scheme.description && (
        <p className="font-['DM_Sans'] text-[#111827]/55 text-xs leading-relaxed line-clamp-2">
          {scheme.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
        {scheme.stateName && scheme.stateName !== 'Center' && (
          <span className="text-[10px] text-gray-400 font-medium truncate max-w-[120px]">
            📍 {scheme.stateName}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="ml-auto flex items-center gap-1 text-[#2E9F75] text-xs font-bold hover:text-[#1a7a52] transition-colors bg-transparent border-none"
        >
          View <ExternalLink size={11} />
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main section component ───────────────────────────────────────────────────
interface Props {
  /** 'dashboard' gives a card-wrapped look; 'home' gives a full-section look */
  variant?: 'dashboard' | 'home';
}

const PersonalisedSchemesSection = ({ variant = 'home' }: Props) => {
  const [schemes, setSchemes]         = useState<Scheme[]>([]);
  const [loading, setLoading]         = useState(true);
  const [visible, setVisible]         = useState(12);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    // Simulate personalising animation duration (2.5s), then reveal
    const timer = setTimeout(() => {
      const saved = getSavedSchemes();
      setSchemes(saved);
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (variant === 'dashboard') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm p-7"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2E9F75] to-[#FFD166] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-['Playfair_Display'] text-[#0B2545] text-lg font-bold">
                Personalised Schemes For You
              </h2>
              <p className="font-['DM_Sans'] text-[#111827]/45 text-xs">
                Curated based on your profile from today
              </p>
            </div>
          </div>
          {!loading && schemes.length > 0 && (
            <Link
              to="/schemes"
              className="font-['DM_Sans'] text-xs text-[#2E9F75] hover:text-[#1a7a52] font-semibold flex items-center gap-1 transition-colors"
            >
              Browse All <ArrowRight size={13} />
            </Link>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <PersonalisingOverlay key="loading" />
          ) : schemes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-10 text-center"
            >
              <BookOpen size={32} className="text-gray-300" />
              <p className="font-['DM_Sans'] text-gray-400 text-sm">No personalised schemes found. Try browsing all schemes.</p>
              <Link to="/schemes" className="text-[#2E9F75] font-semibold text-sm hover:underline">Browse Schemes →</Link>
            </motion.div>
          ) : (
            <motion.div key="content">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {schemes.slice(0, visible).map((s, i) => (
                  <SchemeCard key={s.id} scheme={s} index={i} onClick={() => setSelectedScheme(s)} />
                ))}
              </div>
              {visible < schemes.length && (
                <div className="mt-5 text-center">
                  <button
                    onClick={() => setVisible(v => v + 6)}
                    className="font-['DM_Sans'] text-sm text-[#2E9F75] font-semibold hover:text-[#1a7a52] flex items-center gap-1 mx-auto"
                  >
                    <Loader2 size={14} /> Load more ({schemes.length - visible} remaining)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedScheme && (
            <SchemeDetailModal
              scheme={selectedScheme}
              onClose={() => setSelectedScheme(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ── Home variant ─────────────────────────────────────────────────────────────
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#0B2545] via-[#0e2d56] to-[#0B2545] relative overflow-hidden">
      {/* Background sparkle blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#2E9F75]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] bg-[#FFD166]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#2E9F75]/15 border border-[#2E9F75]/30 text-[#2E9F75] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Just For You
          </div>
          <h2 className="font-['Playfair_Display'] text-white text-3xl sm:text-4xl font-bold mb-3">
            Personalised Schemes For You
          </h2>
          <p className="font-['DM_Sans'] text-white/55 text-base max-w-xl mx-auto">
            Curated from 4,000+ schemes — matched to your state, occupation, income, and eligibility in seconds.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <PersonalisingOverlay key="loading-home" />
            </div>
          ) : schemes.length === 0 ? (
            <motion.div
              key="empty-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/50 font-['DM_Sans']">No personalised schemes found yet.</p>
              <Link to="/schemes" className="mt-3 inline-flex items-center gap-2 text-[#2E9F75] font-semibold hover:underline">
                Browse All Schemes <ArrowRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <motion.div key="content-home">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {schemes.slice(0, visible).map((s, i) => (
                  <SchemeCard key={s.id} scheme={s} index={i} onClick={() => setSelectedScheme(s)} />
                ))}
              </div>

              {visible < schemes.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setVisible(v => v + 8)}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-['DM_Sans'] font-semibold text-sm transition-all"
                  >
                    <Loader2 size={15} /> Load More ({schemes.length - visible} left)
                  </button>
                </div>
              )}

              <div className="mt-10 text-center">
                <Link
                  to="/schemes"
                  className="inline-flex items-center gap-2 bg-[#2E9F75] hover:bg-[#259968] text-white px-8 py-3.5 rounded-xl font-['DM_Sans'] font-bold text-sm transition-all shadow-lg shadow-[#2E9F75]/30"
                >
                  <BookOpen size={16} /> Browse All 4,000+ Schemes
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedScheme && (
          <SchemeDetailModal
            scheme={selectedScheme}
            onClose={() => setSelectedScheme(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PersonalisedSchemesSection;
