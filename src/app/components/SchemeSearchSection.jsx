import React, { useState } from 'react';



// ─── Component ─────────────────────────────────────────────────────────────────
export default function SchemeSearchSection() {
  const [btnHover, setBtnHover] = useState(false);

  // ── Scroll to popular schemes section ────────────────────────────────────────
  const scrollToPopular = () => {
    const el = document.getElementById('popular-schemes');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  return (
    <section
      id="scheme-search"
      style={{
        background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 50%, #e3f2fd 100%)',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-60px', left: '-80px',
        width: 320, height: 320,
        background: 'radial-gradient(circle, rgba(46,127,50,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-40px', right: '-60px',
        width: 260, height: 260,
        background: 'radial-gradient(circle, rgba(33,150,243,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Heading ─────────────────────────────────────────────── */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700,
          color: '#1a3a6b',
          marginBottom: '0.5rem',
          fontFamily: "'Playfair Display', Georgia, serif",
          lineHeight: 1.25,
        }}>
          Find the Right Scheme,{' '}
          <span style={{
            background: 'linear-gradient(90deg, #2e7d32, #1565c0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Right Now
          </span>
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '1rem',
          color: '#555',
          marginBottom: '2rem',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Search from hundreds of government schemes tailored for you
        </p>

        {/* ── CTA Button ──────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
          <button
            onClick={scrollToPopular}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: btnHover
                ? 'linear-gradient(135deg, #1b5e20, #2e7d32)'
                : 'linear-gradient(135deg, #2e7d32, #388e3c)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '15px 36px',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.02em',
              boxShadow: btnHover
                ? '0 8px 28px rgba(46,125,50,0.45)'
                : '0 4px 18px rgba(46,125,50,0.30)',
              transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.22s ease',
            }}
          >
            Find Schemes For You
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '50%',
              fontSize: '1rem',
              transition: 'transform 0.22s ease',
              transform: btnHover ? 'translateX(3px)' : 'translateX(0)',
            }}>
              →
            </span>
          </button>
        </div>



      </div>
    </section>
  );
}
