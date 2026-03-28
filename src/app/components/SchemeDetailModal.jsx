import React, { useEffect } from 'react';


/* ──────────────────────────────────────────
   Constants
────────────────────────────────────────── */
const TEAL = 'linear-gradient(135deg,#2E9F75,#10B981)';
const NAVY = '#0B2545';

const SCHEME_CAT_CFG = {
  Education:          { bg:'rgba(245,158,11,0.12)',  text:'#d97706', icon:'🎓', grad:'from-amber-500 to-orange-500' },
  Health:             { bg:'rgba(59,130,246,0.12)',  text:'#2563eb', icon:'🏥', grad:'from-blue-500 to-indigo-600' },
  Women:              { bg:'rgba(236,72,153,0.12)',  text:'#db2777', icon:'👩', grad:'from-pink-500 to-rose-500' },
  'Social Welfare':   { bg:'rgba(139,92,246,0.12)',  text:'#7c3aed', icon:'🤝', grad:'from-violet-500 to-purple-600' },
  Agriculture:        { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'🌾', grad:'from-emerald-500 to-green-600' },
  Business:           { bg:'rgba(20,184,166,0.12)',  text:'#0d9488', icon:'💼', grad:'from-teal-500 to-cyan-600' },
  Finance:            { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'💳', grad:'from-green-500 to-emerald-600' },
  Employment:         { bg:'rgba(14,165,233,0.12)',  text:'#0284c7', icon:'🛠️', grad:'from-sky-500 to-blue-600' },
  Housing:            { bg:'rgba(99,102,241,0.12)',  text:'#4f46e5', icon:'🏠', grad:'from-indigo-500 to-purple-600' },
  Transport:          { bg:'rgba(249,115,22,0.12)',  text:'#ea580c', icon:'🚌', grad:'from-orange-500 to-red-500' },
  Utility:            { bg:'rgba(6,182,212,0.12)',   text:'#0891b2', icon:'💧', grad:'from-cyan-500 to-teal-600' },
  'Science & Tech':   { bg:'rgba(59,130,246,0.12)',  text:'#1d4ed8', icon:'🔬', grad:'from-blue-600 to-indigo-700' },
  'Sports & Culture': { bg:'rgba(239,68,68,0.12)',   text:'#dc2626', icon:'🏅', grad:'from-red-500 to-rose-600' },
  Legal:              { bg:'rgba(107,114,128,0.12)', text:'#374151', icon:'⚖️', grad:'from-gray-500 to-gray-600' },
  Other:              { bg:'rgba(11,37,69,0.08)',    text:'#0B2545', icon:'📋', grad:'from-gray-400 to-gray-500' },
};

/* ──────────────────────────────────────────
   API normalizer (same shape as SchemeFinder)
────────────────────────────────────────── */
const CAT_KEYWORDS = [
  'Education','Health','Women','Social Welfare','Agriculture',
  'Business','Finance','Employment','Housing','Transport',
  'Utility','Science & Tech','Sports & Culture','Legal',
];

function normalizeScheme(s) {
  if (!s) return null;
  let category = s.category || '';
  if (!category && s.schemeCategory) {
    const parts = s.schemeCategory.split(',').map(p => p.trim()).filter(Boolean);
    category = parts[0] || 'Other';
  }
  const matchedCat = CAT_KEYWORDS.find(k =>
    category.toLowerCase().includes(k.toLowerCase())
  ) || 'Other';

  let tags = s.tags;
  if (!Array.isArray(tags)) {
    const raw = s.search_tags || s.tags || '';
    tags = String(raw).split(',').map(t => t.trim()).filter(Boolean);
  }

  return {
    id:              s.id,
    name:            s.name            || s.scheme_name   || '',
    slug:            s.slug            || '',
    description:     s.description     || s.details        || '',
    descriptionFull: s.descriptionFull || s.details        || '',
    benefits:        s.benefits        || '',
    eligibility:     s.eligibility     || '',
    application:     s.application     || '',
    documents:       s.documents       || '',
    level:           s.level           || 'Central',
    stateName:       s.stateName       || s.level_name     || '',
    category:        matchedCat,
    rawCategory:     s.schemeCategory  || category,
    tags,
  };
}

/* ──────────────────────────────────────────
   CSS
────────────────────────────────────────── */
const MODAL_CSS = `
  @keyframes mdl-in {
    from { opacity:0; transform:scale(0.93) translateY(24px); }
    to   { opacity:1; transform:scale(1)    translateY(0);    }
  }
  @keyframes mdl-bg {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes badge-pop {
    0%   { transform: scale(0.7); opacity:0; }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1); opacity:1; }
  }
  .mdl-wrap    { animation: mdl-bg 0.22s ease both; }
  .mdl-panel   { animation: mdl-in 0.32s cubic-bezier(0.22,0.68,0,1.18) both; }
  .mdl-body::-webkit-scrollbar { width: 5px; }
  .mdl-body::-webkit-scrollbar-thumb { background:#a5d6a7; border-radius:5px; }
  .mdl-badge-pop { animation: badge-pop 0.4s cubic-bezier(0.22,0.68,0,1.22) both; }

  /* Bullet point styles */
  .info-bullet {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(11,37,69,0.06);
  }
  .info-bullet:last-child { border-bottom: none; }
  .bullet-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: linear-gradient(135deg,#2E9F75,#10B981);
    flex-shrink: 0; margin-top: 6px;
  }
`;

/* ──────────────────────────────────────────
   Helpers
────────────────────────────────────────── */
function parseBullets(text = '') {
  if (!text) return [];
  return text
    .split(/\n|(?<=[.!?])\s+(?=[A-Z])/)
    .map(l => l.trim().replace(/^[-•*]\s*/, ''))
    .filter(l => l.length > 5);
}

function parseSteps(text = '') {
  if (!text) return null;
  const parts = text.split(/(?=Step\s+\d+[\s:.])/i).filter(p => p.trim());
  return parts.length > 1 ? parts : null;
}

/* ──────────────────────────────────────────
   Section wrapper
────────────────────────────────────────── */
function Section({ icon, title, color = '#2E9F75', bg = 'rgba(46,159,117,0.05)', border = 'rgba(46,159,117,0.14)', children }) {
  return (
    <div style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 18, padding: '18px 20px', marginBottom: 14 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight: 800, fontSize: 13, color, letterSpacing: '0.02em', textTransform:'uppercase' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────
   Bullet list component
────────────────────────────────────────── */
function BulletList({ items, dotColor = 'linear-gradient(135deg,#2E9F75,#10B981)' }) {
  return (
    <ul style={{ listStyle:'none', padding:0, margin:0 }}>
      {items.map((item, i) => (
        <li key={i} className="info-bullet">
          <span className="bullet-dot" style={{ background: dotColor }} />
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color: NAVY, lineHeight: 1.55 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ──────────────────────────────────────────
   Info badge (small key-value chip)
────────────────────────────────────────── */
function InfoBadge({ label, value, icon, bg, color }) {
  return (
    <div style={{ background: bg, border: `1.5px solid ${color}33`, borderRadius: 14, padding: '12px 16px', flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 10.5, fontWeight: 800, color, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 700, color: NAVY }}>{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Modal
────────────────────────────────────────── */
export default function SchemeDetailModal({ scheme: schemeProp, onClose }) {
  const scheme = normalizeScheme(schemeProp);
  const cfg = SCHEME_CAT_CFG[scheme?.category] || SCHEME_CAT_CFG['Other'];
  const isCentral = scheme?.level === 'Central';

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!scheme) return null;

  const eligibilityBullets = parseBullets(scheme.eligibility);
  const docBullets         = parseBullets(scheme.documents);
  const steps              = parseSteps(scheme.application);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MODAL_CSS }} />

      {/* ── Backdrop ── */}
      <div
        className="mdl-wrap"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99998,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center',
          padding: 0,
          background: 'rgba(11,37,69,0.60)',
          backdropFilter: 'blur(5px)',
        }}
      >
        {/* ── Panel ── */}
        <div
          className="mdl-panel"
          style={{
            position: 'relative',
            width: '100%', maxWidth: 720,
            maxHeight: '93vh',
            borderRadius: '28px 28px 0 0',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            background: '#F8FBF9',
            boxShadow: '0 -8px 60px rgba(11,37,69,0.30)',
          }}
        >
          {/* Color accent bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.grad} flex-shrink-0`} />

          {/* ── HEADER ── */}
          <div
            style={{
              flexShrink: 0,
              padding: '20px 24px 16px',
              background: 'rgba(255,255,255,0.97)',
              borderBottom: '1px solid rgba(11,37,69,0.07)',
            }}
          >
            {/* Badges row */}
            <div style={{ display:'flex', flexWrap:'wrap', gap: 8, marginBottom: 10 }}>
              {/* Category badge - show full raw category string */}
              <span className="mdl-badge-pop" style={{
                display:'inline-flex', alignItems:'center', gap: 5,
                fontFamily:"'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 800,
                paddingInline: 12, paddingBlock: 5, borderRadius: 99,
                background: cfg.bg, color: cfg.text,
                animationDelay: '0.05s',
              }}>
                {cfg.icon} {scheme.rawCategory || scheme.category}
              </span>

              {/* Central / State badge */}
              <span className="mdl-badge-pop" style={{
                display:'inline-flex', alignItems:'center', gap: 5,
                fontFamily:"'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 800,
                paddingInline: 12, paddingBlock: 5, borderRadius: 99,
                background: isCentral ? 'rgba(37,99,235,0.10)' : 'rgba(124,58,237,0.10)',
                color: isCentral ? '#1d4ed8' : '#6d28d9',
                animationDelay: '0.10s',
              }}>
                {isCentral ? '🏛️ Central Government' : `📍 ${scheme.stateName || 'State'} Government`}
              </span>
            </div>

            {/* Title + close */}
            <div style={{ display:'flex', alignItems:'flex-start', gap: 12 }}>
              <h2 style={{
                flex: 1,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                fontWeight: 800, lineHeight: 1.3, color: NAVY, margin: 0,
              }}>
                {scheme.name}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  flexShrink: 0,
                  width: 34, height: 34, borderRadius: '50%',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems:'center', justifyContent:'center',
                  background: 'rgba(11,37,69,0.07)', color: NAVY,
                  fontSize: 13, fontWeight: 800, transition: 'all 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.10)'; e.currentTarget.style.color = '#dc2626'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(11,37,69,0.07)'; e.currentTarget.style.color = NAVY; }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── SCROLLABLE BODY ── */}
          <div
            className="mdl-body"
            style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 16px' }}
          >

            {/* 1. About */}
            {scheme.descriptionFull && (
              <Section icon="📄" title="About This Scheme">
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.65, color:'rgba(17,24,39,0.72)', margin: 0 }}>
                  {scheme.descriptionFull}
                </p>
              </Section>
            )}

            {/* 2. Quick info row */}
            <div style={{ display:'flex', flexWrap:'wrap', gap: 10, marginBottom: 14 }}>
              <InfoBadge
                icon="🏛️" label="Scheme Type"
                value={isCentral ? 'Central Government' : `${scheme.stateName || 'State'} Government`}
                bg={isCentral ? 'rgba(37,99,235,0.06)' : 'rgba(124,58,237,0.06)'}
                color={isCentral ? '#1d4ed8' : '#6d28d9'}
              />
              <InfoBadge
                icon="📂" label="Category"
                value={scheme.category || 'General'}
                bg={cfg.bg} color={cfg.text}
              />
              <InfoBadge
                icon="📅" label="Last Date"
                value="As per notification"
                bg="rgba(239,68,68,0.05)"
                color="#dc2626"
              />
              <InfoBadge
                icon="🔄" label="Application"
                value="Ongoing / Rolling"
                bg="rgba(99,102,241,0.06)"
                color="#4f46e5"
              />
            </div>

            {/* 3. For Whom (Eligibility) */}
            {scheme.eligibility && (
              <Section
                icon="👥" title="For Whom Is This Scheme?"
                color="#d97706" bg="rgba(245,158,11,0.05)" border="rgba(245,158,11,0.18)"
              >
                {eligibilityBullets.length > 1 ? (
                  <BulletList items={eligibilityBullets} dotColor="linear-gradient(135deg,#f59e0b,#d97706)" />
                ) : (
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color: NAVY, lineHeight: 1.6, margin: 0, whiteSpace:'pre-line' }}>
                    {scheme.eligibility}
                  </p>
                )}
              </Section>
            )}

            {/* 4. Benefits */}
            {scheme.benefits && (
              <Section
                icon="💰" title="Benefits & Financial Assistance"
                color="#059669" bg="rgba(16,185,129,0.05)" border="rgba(16,185,129,0.18)"
              >
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color: NAVY, lineHeight: 1.6, margin: 0, whiteSpace:'pre-line' }}>
                  {scheme.benefits}
                </p>
              </Section>
            )}

            {/* 5. Documents Required */}
            {scheme.documents && (
              <Section
                icon="📂" title="Documents Required"
                color="#7c3aed" bg="rgba(139,92,246,0.05)" border="rgba(139,92,246,0.18)"
              >
                {docBullets.length > 1 ? (
                  <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                    {docBullets.map((doc, i) => (
                      <li key={i} className="info-bullet">
                        <span style={{ fontSize:14, flexShrink:0, marginTop:2 }}>📌</span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color: NAVY, lineHeight: 1.55 }}>
                          {doc}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color: NAVY, lineHeight: 1.6, margin: 0, whiteSpace:'pre-line' }}>
                    {scheme.documents}
                  </p>
                )}
              </Section>
            )}

            {/* 6. How to Apply */}
            {scheme.application && (
              <Section
                icon="📝" title="How to Apply"
                color="#0284c7" bg="rgba(14,165,233,0.05)" border="rgba(14,165,233,0.18)"
              >
                {steps ? (
                  <ol style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 10 }}>
                    {steps.map((step, i) => (
                      <li key={i} style={{ display:'flex', alignItems:'flex-start', gap: 10 }}>
                        <span style={{
                          flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          background: TEAL, color:'#fff', fontSize: 11, fontWeight: 800, marginTop: 2,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color:'rgba(17,24,39,0.75)', lineHeight: 1.55 }}>
                          {step.replace(/^Step\s*\d+[\s:.]+/i, '').trim()}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 13.5, color:'rgba(17,24,39,0.72)', lineHeight: 1.6, margin: 0, whiteSpace:'pre-line' }}>
                    {scheme.application}
                  </p>
                )}
              </Section>
            )}

            {/* 7. Tags */}
            {scheme.tags?.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap: 7, paddingBottom: 6 }}>
                {scheme.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 700,
                    paddingInline: 12, paddingBlock: 5, borderRadius: 99,
                    background:'rgba(46,159,117,0.10)', color:'#2E9F75',
                    border:'1px solid rgba(46,159,117,0.20)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── STICKY FOOTER ── */}
          <div style={{
            flexShrink: 0, padding: '14px 22px',
            display:'flex', gap: 10,
            background: 'rgba(255,255,255,0.97)',
            borderTop: '1px solid rgba(11,37,69,0.07)',
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                fontFamily:"'DM Sans',sans-serif", fontWeight: 800, fontSize: 13.5,
                padding: '12px 0', borderRadius: 14, cursor:'pointer',
                border: '2px solid rgba(11,37,69,0.14)',
                background:'transparent', color: NAVY,
                transition:'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#2E9F75'; e.currentTarget.style.color='#2E9F75'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(11,37,69,0.14)'; e.currentTarget.style.color=NAVY; }}
            >
              ← Back to Results
            </button>
            <button
              onClick={() => window.open(`https://www.myscheme.gov.in/schemes/${scheme.slug}`, '_blank')}
              style={{
                flex: 1,
                fontFamily:"'DM Sans',sans-serif", fontWeight: 800, fontSize: 13.5,
                padding: '12px 0', borderRadius: 14, cursor:'pointer',
                border: 'none', color:'#fff',
                background: TEAL,
                boxShadow:'0 4px 18px rgba(46,159,117,0.38)',
                transition:'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
