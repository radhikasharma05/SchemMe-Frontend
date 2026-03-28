import React, { useState, useRef, useEffect } from 'react';

// ─── Indian States ────────────────────────────────────────────────────────────
const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh',
  'Dadra & Nagar Haveli','Daman & Diu','Delhi','Jammu & Kashmir','Ladakh',
  'Lakshadweep','Puducherry',
];

// ─── Dummy Schemes Data ───────────────────────────────────────────────────────
const SCHEMES = [
  {
    id: 1, name: 'Beti Bachao Beti Padhao',
    description: 'Promotes survival, protection and education of the girl child across India.',
    gender: ['Female'], ageGroups: ['Below 18','18 – 25'],
    maritalStatus: ['Unmarried'], category: 'Women',
    eligibilityTags: ['Female','Below 25','Unmarried'],
  },
  {
    id: 2, name: 'PM Kisan Samman Nidhi',
    description: '₹6,000/year direct income support for small & marginal farmers.',
    gender: ['Male','Female','Transgender'], ageGroups: ['26 – 35','36 – 45','46 – 60','Above 60'],
    maritalStatus: ['Married','Widowed'], category: 'Farmer',
    eligibilityTags: ['All Genders','26+','Farmer'],
  },
  {
    id: 3, name: 'Ayushman Bharat Yojana',
    description: 'Health insurance coverage up to ₹5 Lakhs per family per year.',
    gender: ['Male','Female','Transgender'], ageGroups: ['26 – 35','36 – 45','46 – 60','Above 60'],
    maritalStatus: ['Married','Widowed','Divorced','Separated'], category: 'Health',
    eligibilityTags: ['All Genders','26+','Health Cover'],
  },
  {
    id: 4, name: 'Post-Matric Scholarship SC/ST',
    description: 'Financial assistance for SC/ST students pursuing higher education.',
    gender: ['Male','Female','Transgender'], ageGroups: ['18 – 25'],
    maritalStatus: ['Unmarried','Married'], category: 'Education',
    eligibilityTags: ['SC/ST','18–25','Student'],
  },
  {
    id: 5, name: 'PM Awas Yojana (Urban)',
    description: 'Subsidised housing loan interest for economically weaker sections.',
    gender: ['Male','Female','Transgender'], ageGroups: ['26 – 35','36 – 45','46 – 60'],
    maritalStatus: ['Married','Unmarried','Widowed'], category: 'Housing',
    eligibilityTags: ['All Genders','26–60','Urban'],
  },
  {
    id: 6, name: 'Pradhan Mantri Mudra Yojana',
    description: 'Micro-loans up to ₹10 Lakhs for small business & self-employment.',
    gender: ['Male','Female','Transgender'], ageGroups: ['18 – 25','26 – 35','36 – 45'],
    maritalStatus: ['Married','Unmarried','Divorced'], category: 'Employment',
    eligibilityTags: ['All Genders','18–45','Entrepreneurship'],
  },
  {
    id: 7, name: 'Sukanya Samriddhi Yojana',
    description: 'High-interest savings scheme for the girl child (up to age 10).',
    gender: ['Female'], ageGroups: ['Below 18'],
    maritalStatus: ['Unmarried'], category: 'Women',
    eligibilityTags: ['Female','Below 10','Savings'],
  },
  {
    id: 8, name: 'National Old Age Pension Scheme',
    description: 'Monthly pension for BPL elderly citizens above 60 years.',
    gender: ['Male','Female','Transgender'], ageGroups: ['Above 60'],
    maritalStatus: ['Married','Widowed','Divorced','Separated','Unmarried'], category: 'Pension',
    eligibilityTags: ['All Genders','60+','BPL'],
  },
  {
    id: 9, name: 'Skill India – PMKVY',
    description: 'Free skill training & certification for unemployed youth across India.',
    gender: ['Male','Female','Transgender'], ageGroups: ['18 – 25','26 – 35'],
    maritalStatus: ['Unmarried','Married','Divorced'], category: 'Employment',
    eligibilityTags: ['All Genders','18–35','Youth'],
  },
  {
    id: 10, name: 'Stand Up India',
    description: 'Bank loans ₹10L–₹1Cr for SC/ST and women entrepreneurs.',
    gender: ['Female'], ageGroups: ['18 – 25','26 – 35','36 – 45'],
    maritalStatus: ['Married','Unmarried','Divorced','Widowed'], category: 'Women',
    eligibilityTags: ['Female / SC/ST','18–45','Business'],
  },
  {
    id: 11, name: 'Rashtriya Swasthya Bima Yojana',
    description: 'Health insurance for BPL families with cashless hospitalization.',
    gender: ['Male','Female','Transgender'], ageGroups: ['36 – 45','46 – 60','Above 60'],
    maritalStatus: ['Married','Widowed'], category: 'Health',
    eligibilityTags: ['All Genders','36+','BPL Family'],
  },
  {
    id: 12, name: 'National Scholarship Portal',
    description: 'Central portal for merit & means-based scholarships across all categories.',
    gender: ['Male','Female','Transgender'], ageGroups: ['Below 18','18 – 25'],
    maritalStatus: ['Unmarried'], category: 'Education',
    eligibilityTags: ['All Genders','Student','Merit-based'],
  },
];

// ─── Category styling ────────────────────────────────────────────────────────
const CAT_CONFIG = {
  Women:      { bg: 'rgba(236,72,153,0.12)',  text: '#db2777', icon: '👩', gradient: 'from-pink-500 to-rose-500' },
  Farmer:     { bg: 'rgba(16,185,129,0.12)',  text: '#059669', icon: '🌾', gradient: 'from-emerald-500 to-green-600' },
  Health:     { bg: 'rgba(59,130,246,0.12)',  text: '#2563eb', icon: '🏥', gradient: 'from-blue-500 to-indigo-600' },
  Education:  { bg: 'rgba(245,158,11,0.12)',  text: '#d97706', icon: '🎓', gradient: 'from-amber-500 to-orange-500' },
  Housing:    { bg: 'rgba(99,102,241,0.12)',  text: '#4f46e5', icon: '🏠', gradient: 'from-indigo-500 to-purple-600' },
  Employment: { bg: 'rgba(20,184,166,0.12)',  text: '#0d9488', icon: '💼', gradient: 'from-teal-500 to-cyan-600' },
  Pension:    { bg: 'rgba(239,68,68,0.12)',   text: '#dc2626', icon: '🏦', gradient: 'from-red-500 to-rose-600' },
};

// ─── KeyFrame CSS ─────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes sf-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sf-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes sf-pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(46,159,117,0.4); }
    70%  { box-shadow: 0 0 0 10px rgba(46,159,117,0); }
    100% { box-shadow: 0 0 0 0 rgba(46,159,117,0); }
  }
  .sf-fade-up { animation: sf-fadeUp 0.45s ease both; }
  .sf-card-hover {
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .sf-card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(11,37,69,0.15) !important;
  }
  .sf-select:focus { outline: none; border-color: #2E9F75 !important; box-shadow: 0 0 0 3px rgba(46,159,117,0.15); }
  .sf-chip-btn { transition: all 0.2s ease; }
  .sf-chip-btn:hover { transform: scale(1.04); }
  .sf-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(46,159,117,0.45) !important; }
  .sf-next-btn:hover { background: rgba(46,159,117,0.08) !important; transform: translateY(-2px); }
  .sf-know-more:hover { background: linear-gradient(135deg, #2E9F75, #10B981) !important; color: #fff !important; transform: translateY(-1px); }
`;

// ═════════════════════════════════════════════════════════════════════════════
export default function SchemeFinder() {
  const [formOpen, setFormOpen]     = useState(false);
  const [step, setStep]             = useState(1);
  const [btnHover, setBtnHover]     = useState(false);
  const formRef                     = useRef(null);
  const resultsRef                  = useRef(null);

  // Step 1
  const [gender,  setGender]  = useState('');
  const [age,     setAge]     = useState('');
  const [marital, setMarital] = useState('');

  // Step 2
  const [state,    setState]    = useState('');
  const [category, setCategory] = useState('');
  const [income,   setIncome]   = useState('');

  // Results
  const [results,   setResults]   = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Scroll form into view on open
  useEffect(() => {
    if (formOpen && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [formOpen]);

  // Scroll results into view after submit
  useEffect(() => {
    if (submitted && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [submitted]);

  const handleSubmit = () => {
    const filtered = SCHEMES.filter(s =>
      (!gender   || s.gender.includes(gender))        &&
      (!age      || s.ageGroups.includes(age))         &&
      (!marital  || s.maritalStatus.includes(marital)) &&
      (!category || s.category === category)
    );
    setResults(filtered);
    setSubmitted(true);
  };

  const handleReset = () => {
    setGender(''); setAge(''); setMarital('');
    setState(''); setCategory(''); setIncome('');
    setResults(null); setSubmitted(false); setStep(1);
  };

  return (
    <section
      id="scheme-finder"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F0FDF4 50%, #EFF6FF 100%)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Animated bg orbs (matching site style) ── */}
      <div
        className="absolute top-[-80px] left-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(46,159,117,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-60px] right-[-80px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,122,69,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(11,37,69,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

        {/* ── Section heading ─────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(46,159,117,0.12)', color: '#2E9F75' }}
          >
            Smart Eligibility Filter
          </span>
          <h2
            className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: '#0B2545' }}
          >
            Find the Right Scheme,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #2E9F75, #FF7A45)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Right Now
            </span>
          </h2>
          <p className="font-['DM_Sans'] text-[#111827]/60 text-base max-w-xl mx-auto">
            Answer a few quick questions and we'll match you with government schemes you actually qualify for.
          </p>
        </div>

        {/* ── CTA Button ───────────────────────────────────────────────── */}
        <div className="flex justify-center mb-2">
          <button
            id="find-schemes-btn"
            onClick={() => setFormOpen(v => !v)}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="inline-flex items-center gap-3 font-['DM_Sans'] font-bold text-base text-white rounded-2xl px-8 py-4 transition-all duration-200"
            style={{
              background: btnHover
                ? 'linear-gradient(135deg, #1a7a52, #2E9F75)'
                : 'linear-gradient(135deg, #2E9F75, #10B981)',
              boxShadow: btnHover
                ? '0 10px 32px rgba(46,159,117,0.50)'
                : '0 4px 20px rgba(46,159,117,0.35)',
              transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
              animation: !formOpen ? 'sf-pulse-ring 2.5s infinite' : 'none',
            }}
          >
            {formOpen ? (
              <>
                <span>Close Filter</span>
                <span className="text-lg">✕</span>
              </>
            ) : (
              <>
                <span>Find Schemes For You</span>
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm transition-transform duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.20)',
                    transform: btnHover ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  →
                </span>
              </>
            )}
          </button>
        </div>

        {/* ── Animated Form Container ──────────────────────────────────── */}
        <div
          ref={formRef}
          style={{
            maxHeight: formOpen ? '2400px' : '0',
            opacity:   formOpen ? 1 : 0,
            transform: formOpen ? 'translateY(0)' : 'translateY(-16px)',
            overflow:  'hidden',
            transition: 'max-height 0.55s ease, opacity 0.4s ease, transform 0.4s ease',
            marginTop: formOpen ? '2rem' : '0',
          }}
        >
          <div
            className="rounded-3xl p-6 sm:p-10 border"
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 48px rgba(11,37,69,0.10), 0 1px 0 rgba(255,255,255,0.8) inset',
              borderColor: 'rgba(46,159,117,0.15)',
            }}
          >
            {/* Form heading */}
            <div className="mb-8">
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold mb-1" style={{ color: '#0B2545' }}>
                Tell us about yourself
              </h3>
              <p className="font-['DM_Sans'] text-sm" style={{ color: '#111827', opacity: 0.5 }}>
                We'll find the right schemes for you. All fields are optional — fill what you know.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map(n => (
                <React.Fragment key={n}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                    style={{
                      background: step >= n
                        ? 'linear-gradient(135deg, #2E9F75, #10B981)'
                        : 'rgba(11,37,69,0.08)',
                      color: step >= n ? '#fff' : 'rgba(11,37,69,0.4)',
                      boxShadow: step >= n ? '0 4px 12px rgba(46,159,117,0.30)' : 'none',
                    }}
                  >
                    {n}
                  </div>
                  {n < 2 && (
                    <div
                      className="flex-1 h-0.5 rounded-full transition-all duration-500"
                      style={{ background: step >= 2 ? 'linear-gradient(90deg, #2E9F75, #10B981)' : 'rgba(11,37,69,0.10)' }}
                    />
                  )}
                </React.Fragment>
              ))}
              <span
                className="ml-2 font-['DM_Sans'] text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'rgba(11,37,69,0.40)' }}
              >
                Step {step} of 2
              </span>
            </div>

            {/* ════ STEP 1 ════ */}
            {step === 1 && (
              <div className="sf-fade-up">

                {/* Gender */}
                <FieldLabel>Select Your Gender</FieldLabel>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { val: 'Male',        icon: '👨', label: 'Male' },
                    { val: 'Female',      icon: '👩', label: 'Female' },
                    { val: 'Transgender', icon: '🏳️‍🌈', label: 'Transgender' },
                  ].map(g => {
                    const active = gender === g.val;
                    return (
                      <button
                        key={g.val}
                        onClick={() => setGender(active ? '' : g.val)}
                        className="relative py-5 px-2 rounded-2xl text-center cursor-pointer transition-all duration-200 focus:outline-none"
                        style={{
                          border: active ? '2px solid #2E9F75' : '2px solid rgba(11,37,69,0.10)',
                          background: active
                            ? 'linear-gradient(135deg, rgba(46,159,117,0.12), rgba(16,185,129,0.08))'
                            : 'rgba(255,255,255,0.7)',
                          boxShadow: active
                            ? '0 6px 20px rgba(46,159,117,0.20)'
                            : '0 2px 8px rgba(11,37,69,0.06)',
                          transform: active ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        {active && (
                          <span
                            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: 'linear-gradient(135deg, #2E9F75, #10B981)' }}
                          >
                            ✓
                          </span>
                        )}
                        <div className="text-3xl mb-2">{g.icon}</div>
                        <div
                          className="font-['DM_Sans'] text-xs sm:text-sm font-semibold"
                          style={{ color: active ? '#2E9F75' : '#0B2545' }}
                        >
                          {g.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Age */}
                <FieldLabel>Select Your Age Group</FieldLabel>
                <div className="relative mb-6">
                  <select
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="sf-select w-full font-['DM_Sans'] rounded-xl px-4 py-3 text-sm appearance-none border cursor-pointer transition-all duration-200"
                    style={{
                      border: '2px solid rgba(11,37,69,0.10)',
                      color: age ? '#0B2545' : 'rgba(11,37,69,0.40)',
                      background: 'rgba(255,255,255,0.8)',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%232E9F75' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                    }}
                  >
                    <option value="">-- Select Age Group --</option>
                    {['Below 18','18 – 25','26 – 35','36 – 45','46 – 60','Above 60'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Marital Status */}
                <FieldLabel>Marital Status</FieldLabel>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {['Married','Unmarried','Divorced','Separated','Widowed'].map(m => {
                    const active = marital === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setMarital(active ? '' : m)}
                        className="sf-chip-btn font-['DM_Sans'] text-sm font-semibold px-5 py-2 rounded-full border focus:outline-none"
                        style={{
                          border: `2px solid ${active ? '#2E9F75' : 'rgba(11,37,69,0.12)'}`,
                          background: active
                            ? 'linear-gradient(135deg, #2E9F75, #10B981)'
                            : 'rgba(255,255,255,0.8)',
                          color: active ? '#fff' : '#0B2545',
                          boxShadow: active ? '0 4px 14px rgba(46,159,117,0.25)' : 'none',
                        }}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>

                {/* Step 1 action buttons */}
                <ActionButtons
                  onSubmit={handleSubmit}
                  onNext={() => setStep(2)}
                />
              </div>
            )}

            {/* ════ STEP 2 ════ */}
            {step === 2 && (
              <div className="sf-fade-up">

                {/* State */}
                <FieldLabel>Your State / UT</FieldLabel>
                <div className="relative mb-6">
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="sf-select w-full font-['DM_Sans'] rounded-xl px-4 py-3 text-sm appearance-none border cursor-pointer"
                    style={{
                      border: '2px solid rgba(11,37,69,0.10)',
                      color: state ? '#0B2545' : 'rgba(11,37,69,0.40)',
                      background: 'rgba(255,255,255,0.8)',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%232E9F75' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                    }}
                  >
                    <option value="">-- Select Your State --</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Category */}
                <FieldLabel>Scheme Category</FieldLabel>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {[
                    { val: 'Education', icon: '🎓' },
                    { val: 'Health',    icon: '🏥' },
                    { val: 'Farmer',    icon: '🌾' },
                    { val: 'Housing',   icon: '🏠' },
                    { val: 'Employment',icon: '💼' },
                    { val: 'Women',     icon: '👩' },
                  ].map(c => {
                    const active = category === c.val;
                    return (
                      <button
                        key={c.val}
                        onClick={() => setCategory(active ? '' : c.val)}
                        className="sf-chip-btn font-['DM_Sans'] text-sm font-semibold px-5 py-2 rounded-full border focus:outline-none"
                        style={{
                          border: `2px solid ${active ? '#2E9F75' : 'rgba(11,37,69,0.12)'}`,
                          background: active
                            ? 'linear-gradient(135deg, #2E9F75, #10B981)'
                            : 'rgba(255,255,255,0.8)',
                          color: active ? '#fff' : '#0B2545',
                          boxShadow: active ? '0 4px 14px rgba(46,159,117,0.25)' : 'none',
                        }}
                      >
                        {c.icon} {c.val}
                      </button>
                    );
                  })}
                </div>

                {/* Income */}
                <FieldLabel>Annual Household Income</FieldLabel>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {['Below ₹1L','₹1L – ₹3L','₹3L – ₹5L','Above ₹5L'].map(i => {
                    const active = income === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setIncome(active ? '' : i)}
                        className="sf-chip-btn font-['DM_Sans'] text-sm font-semibold px-5 py-2 rounded-full border focus:outline-none"
                        style={{
                          border: `2px solid ${active ? '#2E9F75' : 'rgba(11,37,69,0.12)'}`,
                          background: active
                            ? 'linear-gradient(135deg, #2E9F75, #10B981)'
                            : 'rgba(255,255,255,0.8)',
                          color: active ? '#fff' : '#0B2545',
                          boxShadow: active ? '0 4px 14px rgba(46,159,117,0.25)' : 'none',
                        }}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>

                {/* Step 2 action buttons */}
                <ActionButtons
                  onSubmit={handleSubmit}
                  onBack={() => setStep(1)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── Results Section ─────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {submitted && (
        <div
          ref={resultsRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-14 sf-fade-up"
        >
          {/* Results header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2
                className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold mb-1"
                style={{ color: '#0B2545' }}
              >
                Schemes For You
              </h2>
              <p className="font-['DM_Sans'] text-sm" style={{ color: 'rgba(17,24,39,0.60)' }}>
                Showing{' '}
                <strong style={{ color: '#2E9F75' }}>{results.length}</strong>{' '}
                scheme{results.length !== 1 ? 's' : ''} based on your profile
              </p>
            </div>
            <button
              onClick={handleReset}
              className="font-['DM_Sans'] text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 hover:shadow-md self-start sm:self-auto"
              style={{
                border: '2px solid rgba(11,37,69,0.12)',
                color: '#0B2545',
                background: 'rgba(255,255,255,0.8)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2E9F75';
                e.currentTarget.style.color = '#2E9F75';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(11,37,69,0.12)';
                e.currentTarget.style.color = '#0B2545';
              }}
            >
              ↺ Reset Filters
            </button>
          </div>

          {/* No results */}
          {results.length === 0 && (
            <div
              className="text-center py-16 px-6 rounded-3xl border"
              style={{
                background: 'rgba(255,255,255,0.70)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(11,37,69,0.08)',
                boxShadow: '0 8px 32px rgba(11,37,69,0.08)',
              }}
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3
                className="font-['Playfair_Display'] text-xl font-bold mb-2"
                style={{ color: '#0B2545' }}
              >
                No schemes found for this profile
              </h3>
              <p
                className="font-['DM_Sans'] text-sm mb-6"
                style={{ color: 'rgba(17,24,39,0.55)' }}
              >
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={handleReset}
                className="font-['DM_Sans'] font-bold text-sm text-white px-7 py-3 rounded-full transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #2E9F75, #10B981)',
                  boxShadow: '0 4px 16px rgba(46,159,117,0.35)',
                }}
              >
                ↺ Reset Filters
              </button>
            </div>
          )}

          {/* Cards grid */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((s, idx) => (
                <SchemeCard key={s.id} s={s} idx={idx} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Action Buttons ───────────────────────────────────────────────────────────
function ActionButtons({ onSubmit, onNext, onBack }) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={onSubmit}
        className="sf-submit-btn font-['DM_Sans'] font-bold text-sm text-white px-8 py-3.5 rounded-full transition-all duration-200 focus:outline-none"
        style={{
          background: 'linear-gradient(135deg, #2E9F75, #10B981)',
          boxShadow: '0 4px 20px rgba(46,159,117,0.35)',
        }}
      >
        ✔ Show My Schemes
      </button>

      {onNext && (
        <button
          onClick={onNext}
          className="sf-next-btn font-['DM_Sans'] font-bold text-sm px-8 py-3.5 rounded-full border-2 transition-all duration-200 focus:outline-none"
          style={{
            borderColor: '#2E9F75',
            color: '#2E9F75',
            background: 'transparent',
          }}
        >
          Next →
        </button>
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="sf-next-btn font-['DM_Sans'] font-bold text-sm px-8 py-3.5 rounded-full border-2 transition-all duration-200 focus:outline-none"
          style={{
            borderColor: 'rgba(11,37,69,0.15)',
            color: '#0B2545',
            background: 'transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#2E9F75';
            e.currentTarget.style.color = '#2E9F75';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(11,37,69,0.15)';
            e.currentTarget.style.color = '#0B2545';
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}

// ─── Scheme Card ──────────────────────────────────────────────────────────────
function SchemeCard({ s, idx }) {
  const [hover, setHover] = useState(false);
  const cfg = CAT_CONFIG[s.category] || { bg: 'rgba(11,37,69,0.08)', text: '#0B2545', icon: '📋', gradient: 'from-gray-500 to-gray-600' };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="sf-card-hover flex flex-col rounded-3xl overflow-hidden border"
      style={{
        animationDelay: `${idx * 0.06}s`,
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: hover ? '1.5px solid rgba(46,159,117,0.35)' : '1.5px solid rgba(11,37,69,0.08)',
        boxShadow: hover
          ? '0 16px 40px rgba(11,37,69,0.14)'
          : '0 2px 16px rgba(11,37,69,0.07)',
      }}
    >
      {/* Card top band */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${cfg.gradient}`}
      />

      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
        {/* Category badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 font-['DM_Sans'] text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: cfg.bg, color: cfg.text }}
          >
            {cfg.icon} {s.category}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-['Playfair_Display'] text-lg font-bold leading-snug"
          style={{ color: '#0B2545' }}
        >
          {s.name}
        </h3>

        {/* Description */}
        <p
          className="font-['DM_Sans'] text-sm leading-relaxed flex-1"
          style={{ color: 'rgba(17,24,39,0.60)' }}
        >
          {s.description}
        </p>

        {/* Eligibility tags */}
        <div className="flex flex-wrap gap-1.5">
          {s.eligibilityTags.map(tag => (
            <span
              key={tag}
              className="font-['DM_Sans'] text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(46,159,117,0.10)',
                color: '#2E9F75',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Know More button */}
        <button
          className="sf-know-more mt-1 font-['DM_Sans'] font-bold text-sm py-2.5 rounded-xl border-2 w-full transition-all duration-200 focus:outline-none"
          style={{
            borderColor: '#2E9F75',
            color: '#2E9F75',
            background: 'transparent',
          }}
        >
          Know More →
        </button>
      </div>
    </div>
  );
}

// ─── Field Label ──────────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <p
      className="font-['DM_Sans'] text-sm font-bold mb-3 uppercase tracking-wide"
      style={{ color: '#0B2545', opacity: 0.75 }}
    >
      {children}
    </p>
  );
}
