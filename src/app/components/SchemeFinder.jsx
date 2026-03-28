import React, { useState, useRef, useEffect, useMemo } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 6;
const TEAL = 'linear-gradient(135deg,#2E9F75,#10B981)';
const NAVY = '#0B2545';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh',
  'Dadra & Nagar Haveli','Daman & Diu','Delhi','Jammu & Kashmir','Ladakh',
  'Lakshadweep','Puducherry',
];

const SOCIAL_CATEGORIES = [
  { val:'General', full:'General Category' },
  { val:'OBC',     full:'Other Backward Classes (OBC)' },
  { val:'SC',      full:'Scheduled Caste (SC)' },
  { val:'ST',      full:'Scheduled Tribe (ST)' },
  { val:'PVTG',    full:'Particularly Vulnerable Tribal Groups (PVTG)' },
  { val:'DNT',     full:'De-notified, Nomadic & Semi-Nomadic Tribes (DNT)' },
];

const OCCUPATION_ROLES = [
  { val:'Farmer',              icon:'🌾' },
  { val:'Student',             icon:'🎓' },
  { val:'Government Employee', icon:'🏛️' },
  { val:'Private Employee',    icon:'💼' },
  { val:'Daily Wage Worker',   icon:'🔨' },
  { val:'Unemployed',          icon:'🔍' },
  { val:'Defence Personnel',   icon:'🪖' },
  { val:'Self Employed',       icon:'🏪' },
];

const INCOME_OPTIONS = ['Below ₹1L','₹1L – ₹3L','₹3L – ₹5L','₹5L – ₹10L','Above ₹10L'];

const STEP_META = [
  { label:'Personal Info',   icon:'👤' },
  { label:'Location',        icon:'📍' },
  { label:'Social Category', icon:'🏷️' },
  { label:'Special Status',  icon:'♿' },
  { label:'Occupation',      icon:'💼' },
  { label:'Financial Info',  icon:'💰' },
];

// ─── Master schemes list ──────────────────────────────────────────────────────
const SCHEMES = [
  {
    id:1, name:'Beti Bachao Beti Padhao',
    description:'Promotes survival, protection and education of the girl child across India.',
    gender:['Female'], ageGroups:['Below 18','18 – 25'],
    maritalStatus:['Unmarried'], schemeCategory:'Women',
    socialCategories:['General','OBC','SC','ST'],
    areas:['Urban','Rural'], roles:['Student'],
    bpl: false, eligibilityTags:['Female','Below 25','Unmarried'],
  },
  {
    id:2, name:'PM Kisan Samman Nidhi',
    description:'₹6,000/year direct income support for small & marginal farmers.',
    gender:['Male','Female','Transgender'], ageGroups:['26 – 35','36 – 45','46 – 60','Above 60'],
    maritalStatus:['Married','Widowed'], schemeCategory:'Farmer',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Rural'], roles:['Farmer'],
    bpl: false, eligibilityTags:['All Genders','26+','Farmer'],
  },
  {
    id:3, name:'Ayushman Bharat Yojana',
    description:'Health insurance coverage up to ₹5 Lakhs per family per year.',
    gender:['Male','Female','Transgender'], ageGroups:['26 – 35','36 – 45','46 – 60','Above 60'],
    maritalStatus:['Married','Widowed','Divorced','Separated'], schemeCategory:'Health',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Farmer','Daily Wage Worker','Unemployed','Self Employed'],
    bpl: true, eligibilityTags:['All Genders','26+','BPL'],
  },
  {
    id:4, name:'Post-Matric Scholarship SC/ST',
    description:'Financial assistance for SC/ST students pursuing higher education.',
    gender:['Male','Female','Transgender'], ageGroups:['18 – 25'],
    maritalStatus:['Unmarried','Married'], schemeCategory:'Education',
    socialCategories:['SC','ST'],
    areas:['Urban','Rural'], roles:['Student'],
    bpl: false, eligibilityTags:['SC/ST','18–25','Student'],
  },
  {
    id:5, name:'PM Awas Yojana (Urban)',
    description:'Subsidised housing loan interest for economically weaker sections.',
    gender:['Male','Female','Transgender'], ageGroups:['26 – 35','36 – 45','46 – 60'],
    maritalStatus:['Married','Unmarried','Widowed'], schemeCategory:'Housing',
    socialCategories:['General','OBC','SC','ST'],
    areas:['Urban'], roles:['Private Employee','Government Employee','Self Employed','Daily Wage Worker'],
    bpl: false, eligibilityTags:['All Genders','26–60','Urban'],
  },
  {
    id:6, name:'Pradhan Mantri Mudra Yojana',
    description:'Micro-loans up to ₹10 Lakhs for small business & self-employment.',
    gender:['Male','Female','Transgender'], ageGroups:['18 – 25','26 – 35','36 – 45'],
    maritalStatus:['Married','Unmarried','Divorced'], schemeCategory:'Employment',
    socialCategories:['General','OBC','SC','ST','DNT'],
    areas:['Urban','Rural'], roles:['Self Employed','Daily Wage Worker','Unemployed'],
    bpl: false, eligibilityTags:['All Genders','18–45','Entrepreneurship'],
  },
  {
    id:7, name:'Sukanya Samriddhi Yojana',
    description:'High-interest savings scheme for the girl child up to age 10.',
    gender:['Female'], ageGroups:['Below 18'],
    maritalStatus:['Unmarried'], schemeCategory:'Women',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Student'],
    bpl: false, eligibilityTags:['Female','Below 10','Savings'],
  },
  {
    id:8, name:'National Old Age Pension Scheme',
    description:'Monthly pension for BPL elderly citizens above 60 years.',
    gender:['Male','Female','Transgender'], ageGroups:['Above 60'],
    maritalStatus:['Married','Widowed','Divorced','Separated','Unmarried'], schemeCategory:'Pension',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Unemployed','Farmer','Daily Wage Worker'],
    bpl: true, eligibilityTags:['All Genders','60+','BPL'],
  },
  {
    id:9, name:'Skill India – PMKVY',
    description:'Free skill training & certification for unemployed youth across India.',
    gender:['Male','Female','Transgender'], ageGroups:['18 – 25','26 – 35'],
    maritalStatus:['Unmarried','Married','Divorced'], schemeCategory:'Employment',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Unemployed','Student','Daily Wage Worker'],
    bpl: false, eligibilityTags:['All Genders','18–35','Youth'],
  },
  {
    id:10, name:'Stand Up India',
    description:'Bank loans ₹10L–₹1Cr for SC/ST and women entrepreneurs.',
    gender:['Female'], ageGroups:['18 – 25','26 – 35','36 – 45'],
    maritalStatus:['Married','Unmarried','Divorced','Widowed'], schemeCategory:'Women',
    socialCategories:['SC','ST'],
    areas:['Urban','Rural'], roles:['Self Employed','Unemployed'],
    bpl: false, eligibilityTags:['Female/SC/ST','18–45','Business'],
  },
  {
    id:11, name:'Rashtriya Swasthya Bima Yojana',
    description:'Health insurance for BPL families with cashless hospitalization.',
    gender:['Male','Female','Transgender'], ageGroups:['36 – 45','46 – 60','Above 60'],
    maritalStatus:['Married','Widowed'], schemeCategory:'Health',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Farmer','Daily Wage Worker','Unemployed'],
    bpl: true, eligibilityTags:['All Genders','36+','BPL Family'],
  },
  {
    id:12, name:'National Scholarship Portal',
    description:'Central portal for merit & means-based scholarships for all categories.',
    gender:['Male','Female','Transgender'], ageGroups:['Below 18','18 – 25'],
    maritalStatus:['Unmarried'], schemeCategory:'Education',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Student'],
    bpl: false, eligibilityTags:['All Genders','Student','Merit-based'],
  },
  {
    id:13, name:'PM Ujjwala Yojana',
    description:'Free LPG connections to women from BPL households.',
    gender:['Female'], ageGroups:['26 – 35','36 – 45','46 – 60'],
    maritalStatus:['Married','Widowed'], schemeCategory:'Women',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Rural','Urban'], roles:['Farmer','Daily Wage Worker','Unemployed'],
    bpl: true, eligibilityTags:['Female','BPL','Free LPG'],
  },
  {
    id:14, name:'Pradhan Mantri Jan Dhan Yojana',
    description:'Zero-balance bank account with RuPay debit card & ₹2L accident cover.',
    gender:['Male','Female','Transgender'], ageGroups:['18 – 25','26 – 35','36 – 45','46 – 60','Above 60'],
    maritalStatus:['Married','Unmarried','Widowed','Divorced','Separated'], schemeCategory:'Finance',
    socialCategories:['General','OBC','SC','ST','PVTG','DNT'],
    areas:['Urban','Rural'], roles:['Farmer','Student','Daily Wage Worker','Unemployed','Self Employed'],
    bpl: false, eligibilityTags:['All Genders','All Ages','Banking'],
  },
  {
    id:15, name:'Atal Pension Yojana',
    description:'Guaranteed ₹1,000–₹5,000/month pension for unorganised sector workers.',
    gender:['Male','Female','Transgender'], ageGroups:['18 – 25','26 – 35','36 – 45'],
    maritalStatus:['Married','Unmarried'], schemeCategory:'Pension',
    socialCategories:['General','OBC','SC','ST'],
    areas:['Urban','Rural'], roles:['Farmer','Daily Wage Worker','Self Employed'],
    bpl: false, eligibilityTags:['All Genders','18–40','Unorganised Sector'],
  },
];

// ─── Category display config ──────────────────────────────────────────────────
const SCHEME_CAT_CFG = {
  Women:      { bg:'rgba(236,72,153,0.12)',  text:'#db2777', icon:'👩', grad:'from-pink-500 to-rose-500' },
  Farmer:     { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'🌾', grad:'from-emerald-500 to-green-600' },
  Health:     { bg:'rgba(59,130,246,0.12)',  text:'#2563eb', icon:'🏥', grad:'from-blue-500 to-indigo-600' },
  Education:  { bg:'rgba(245,158,11,0.12)',  text:'#d97706', icon:'🎓', grad:'from-amber-500 to-orange-500' },
  Housing:    { bg:'rgba(99,102,241,0.12)',  text:'#4f46e5', icon:'🏠', grad:'from-indigo-500 to-purple-600' },
  Employment: { bg:'rgba(20,184,166,0.12)',  text:'#0d9488', icon:'💼', grad:'from-teal-500 to-cyan-600' },
  Pension:    { bg:'rgba(239,68,68,0.12)',   text:'#dc2626', icon:'🏦', grad:'from-red-500 to-rose-600' },
  Finance:    { bg:'rgba(16,185,129,0.12)',  text:'#059669', icon:'💳', grad:'from-green-500 to-emerald-600' },
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes sf-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sf-pulse {
    0%  {box-shadow:0 0 0 0 rgba(46,159,117,0.40)}
    70% {box-shadow:0 0 0 10px rgba(46,159,117,0)}
    100%{box-shadow:0 0 0 0 rgba(46,159,117,0)}
  }
  @keyframes sf-cards-in {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .sf-in  { animation: sf-up 0.35s ease both }
  .sf-cards-in { animation: sf-cards-in 0.4s ease both }
  .sf-sel:focus { outline:none; border-color:#2E9F75 !important; box-shadow:0 0 0 3px rgba(46,159,117,0.15) }
  .sf-hover { transition:all 0.18s ease; cursor:pointer }
  .sf-hover:hover { transform:scale(1.03) }
  .sf-card { transition:all 0.28s cubic-bezier(0.4,0,0.2,1) }
  .sf-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(11,37,69,0.14) !important }
  .sf-know:hover { background:linear-gradient(135deg,#2E9F75,#10B981) !important; color:#fff !important }
  .sf-show-btn:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(46,159,117,0.45) !important }
  .sf-next-btn:hover { background:rgba(46,159,117,0.08) !important; transform:translateY(-1px) }
  .sf-back-btn:hover { border-color:#2E9F75 !important; color:#2E9F75 !important }
`;

// ─── Reusable atoms ───────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p className="font-['DM_Sans'] text-xs font-bold uppercase tracking-widest mb-3"
       style={{ color: NAVY, opacity: 0.60 }}>
      {children}
    </p>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className="sf-hover font-['DM_Sans'] text-sm font-semibold px-5 py-2 rounded-full border-2 focus:outline-none"
      style={{
        borderColor: active ? '#2E9F75' : 'rgba(11,37,69,0.12)',
        background: active ? TEAL : 'rgba(255,255,255,0.85)',
        color: active ? '#fff' : NAVY,
        boxShadow: active ? '0 4px 14px rgba(46,159,117,0.25)' : 'none',
      }}>
      {label}
    </button>
  );
}

function StyledSelect({ value, onChange, placeholder, children }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="sf-sel w-full font-['DM_Sans'] rounded-xl px-4 py-3 text-sm border-2 appearance-none"
      style={{
        borderColor: 'rgba(11,37,69,0.10)',
        color: value ? NAVY : 'rgba(11,37,69,0.40)',
        background: 'rgba(255,255,255,0.88)',
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%232E9F75' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
        backgroundRepeat:'no-repeat', backgroundPosition:'right 14px center',
      }}>
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}

function YesNo({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {[{ v:true, l:yesLabel }, { v:false, l:noLabel }].map(({ v, l }) => {
        const on = value === v;
        return (
          <button key={String(v)} onClick={() => onChange(on ? null : v)}
            className="sf-hover font-['DM_Sans'] text-sm font-semibold px-6 py-2.5 rounded-full border-2 focus:outline-none"
            style={{
              borderColor: on ? '#2E9F75' : 'rgba(11,37,69,0.12)',
              background: on ? TEAL : 'rgba(255,255,255,0.85)',
              color: on ? '#fff' : NAVY,
              boxShadow: on ? '0 4px 14px rgba(46,159,117,0.25)' : 'none',
            }}>
            {on && '✓ '}{l}
          </button>
        );
      })}
    </div>
  );
}

// ─── Step progress bar ────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(n => (
        <React.Fragment key={n}>
          <div title={STEP_META[n-1].label}
            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all duration-300"
            style={{
              background: step >= n ? TEAL : 'rgba(11,37,69,0.08)',
              color: step >= n ? '#fff' : 'rgba(11,37,69,0.35)',
              boxShadow: step === n ? '0 0 0 4px rgba(46,159,117,0.18)' : 'none',
              transform: step === n ? 'scale(1.2)' : 'scale(1)',
            }}>
            {step > n ? '✓' : n}
          </div>
          {n < TOTAL_STEPS && (
            <div className="flex-1 h-0.5 rounded-full transition-all duration-500"
              style={{ background: step > n ? TEAL : 'rgba(11,37,69,0.09)' }} />
          )}
        </React.Fragment>
      ))}
      <span className="ml-2 font-['DM_Sans'] text-xs font-semibold flex-shrink-0 hidden sm:block"
        style={{ color:'rgba(11,37,69,0.38)' }}>
        {step}/{TOTAL_STEPS}
      </span>
    </div>
  );
}

// ─── Step action buttons ──────────────────────────────────────────────────────
function StepActions({ step, onBack, onNext, onShow }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-[rgba(11,37,69,0.07)] mt-6">
      {step > 1 && (
        <button onClick={onBack}
          className="sf-back-btn sf-hover font-['DM_Sans'] font-bold text-sm px-6 py-2.5 rounded-full border-2 focus:outline-none transition-all"
          style={{ borderColor:'rgba(11,37,69,0.15)', color:NAVY, background:'transparent' }}>
          ← Back
        </button>
      )}
      {/* Always present: Show Schemes */}
      <button onClick={onShow}
        className="sf-show-btn font-['DM_Sans'] font-bold text-sm text-white px-7 py-2.5 rounded-full focus:outline-none transition-all duration-200"
        style={{ background: TEAL, boxShadow:'0 4px 16px rgba(46,159,117,0.30)' }}>
        🔍 Show Me Schemes
      </button>
      {step < TOTAL_STEPS && (
        <button onClick={onNext}
          className="sf-next-btn sf-hover font-['DM_Sans'] font-bold text-sm px-6 py-2.5 rounded-full border-2 focus:outline-none transition-all"
          style={{ borderColor:'#2E9F75', color:'#2E9F75', background:'transparent' }}>
          Next →
        </button>
      )}
    </div>
  );
}

// ═════════════════════════════════ MAIN ══════════════════════════════════════
export default function SchemeFinder() {
  const [formOpen, setFormOpen] = useState(false);
  const [step,     setStep]     = useState(1);
  const [ctaHover, setCtaHover] = useState(false);
  const formRef    = useRef(null);
  const resultsRef = useRef(null);

  // Step 1
  const [gender,  setGender]  = useState('');
  const [age,     setAge]     = useState('');
  const [marital, setMarital] = useState('');
  // Step 2
  const [state,   setState]   = useState('');
  const [area,    setArea]    = useState('');
  // Step 3
  const [socCat,  setSocCat]  = useState('');
  // Step 4
  const [isPwd,   setIsPwd]   = useState(null);
  const [isMinor, setIsMinor] = useState(null);
  // Step 5
  const [role,    setRole]    = useState('');
  // Step 6
  const [isBpl,   setIsBpl]   = useState(null);
  const [income,  setIncome]  = useState('');

  const [showResults, setShowResults] = useState(false);

  // ── Scroll helpers ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (formOpen && formRef.current)
      setTimeout(() => formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
  }, [formOpen]);

  useEffect(() => {
    if (showResults && resultsRef.current)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 120);
  }, [showResults]);

  // ── Live filtered results (recalculate every time any filter changes) ────────
  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter(s =>
      (!gender  || s.gender.includes(gender))             &&
      (!age     || s.ageGroups.includes(age))              &&
      (!marital || s.maritalStatus.includes(marital))      &&
      (!area    || s.areas?.includes(area))                &&
      (!socCat  || s.socialCategories?.includes(socCat))   &&
      (!role    || s.roles?.includes(role))                &&
      (isBpl === null || s.bpl === isBpl)
    );
  }, [gender, age, marital, area, socCat, role, isBpl]);

  // Count active filters for display
  const activeFilterCount = [gender, age, marital, area, socCat, role]
    .filter(Boolean).length + (isBpl !== null ? 1 : 0);

  const handleShowSchemes = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setGender(''); setAge(''); setMarital('');
    setState(''); setArea(''); setSocCat('');
    setIsPwd(null); setIsMinor(null); setRole('');
    setIsBpl(null); setIncome('');
    setShowResults(false); setStep(1);
  };

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <section id="scheme-finder"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background:'linear-gradient(135deg,#FFF9F0 0%,#F0FDF4 50%,#EFF6FF 100%)' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Bg orbs */}
      <div className="absolute top-[-80px] left-[-100px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(46,159,117,0.10) 0%,transparent 70%)' }} />
      <div className="absolute bottom-[-60px] right-[-80px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(255,122,69,0.08) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

        {/* Section title */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ background:'rgba(46,159,117,0.12)', color:'#2E9F75' }}>
            Smart Eligibility Filter · {TOTAL_STEPS} Steps
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold mb-3" style={{ color: NAVY }}>
            Find the Right Scheme,{' '}
            <span style={{ background:'linear-gradient(90deg,#2E9F75,#FF7A45)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Right Now
            </span>
          </h2>
          <p className="font-['DM_Sans'] text-[#111827]/60 text-base max-w-xl mx-auto">
            Fill any number of filters — hit <strong style={{ color:'#2E9F75' }}>Show Me Schemes</strong> at any step to see live results.
          </p>
        </div>

        {/* CTA button */}
        <div className="flex justify-center mb-2">
          <button id="find-schemes-btn"
            onClick={() => setFormOpen(v => !v)}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            className="inline-flex items-center gap-3 font-['DM_Sans'] font-bold text-base text-white rounded-2xl px-8 py-4 transition-all duration-200"
            style={{
              background: ctaHover ? 'linear-gradient(135deg,#1a7a52,#2E9F75)' : TEAL,
              boxShadow:  ctaHover ? '0 10px 32px rgba(46,159,117,0.50)' : '0 4px 20px rgba(46,159,117,0.35)',
              transform:  ctaHover ? 'translateY(-2px)' : 'translateY(0)',
              animation: !formOpen ? 'sf-pulse 2.5s infinite' : 'none',
            }}>
            {formOpen ? (
              <><span>Close Filter</span><span>✕</span></>
            ) : (
              <>
                <span>Find Schemes For You</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
                  style={{ background:'rgba(255,255,255,0.2)', transition:'transform 0.2s',
                    transform: ctaHover ? 'translateX(4px)':'translateX(0)' }}>
                  →
                </span>
              </>
            )}
          </button>
        </div>

        {/* Animated form */}
        <div ref={formRef}
          style={{
            maxHeight: formOpen ? '4000px' : '0',
            opacity:   formOpen ? 1 : 0,
            transform: formOpen ? 'translateY(0)' : 'translateY(-14px)',
            overflow:  'hidden',
            transition:'max-height 0.55s ease, opacity 0.38s ease, transform 0.38s ease',
            marginTop: formOpen ? '2rem' : '0',
          }}>

          <div className="rounded-3xl p-6 sm:p-10 border"
            style={{
              background:'rgba(255,255,255,0.76)',
              backdropFilter:'blur(20px)',
              WebkitBackdropFilter:'blur(20px)',
              boxShadow:'0 8px 48px rgba(11,37,69,0.10)',
              borderColor:'rgba(46,159,117,0.15)',
            }}>

            {/* Header */}
            <div className="mb-5">
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold mb-1" style={{ color: NAVY }}>
                Tell us about yourself
              </h3>
              <p className="font-['DM_Sans'] text-sm" style={{ color:'rgba(17,24,39,0.50)' }}>
                Step <strong style={{ color:'#2E9F75' }}>{step}</strong> of {TOTAL_STEPS} —{' '}
                <span style={{ color:'#2E9F75', fontWeight:600 }}>
                  {STEP_META[step-1].icon} {STEP_META[step-1].label}
                </span>
                {activeFilterCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background:'rgba(46,159,117,0.12)', color:'#2E9F75' }}>
                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                  </span>
                )}
              </p>
            </div>

            <StepBar step={step} />

            {/* ════ STEP 1 — Personal ════ */}
            {step === 1 && (
              <div className="sf-in">
                <Label>Select Your Gender</Label>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{val:'Male',icon:'👨'},{val:'Female',icon:'👩'},{val:'Transgender',icon:'🏳️‍🌈'}].map(g => {
                    const on = gender === g.val;
                    return (
                      <button key={g.val} onClick={() => setGender(on ? '' : g.val)}
                        className="relative py-5 px-2 rounded-2xl text-center sf-hover focus:outline-none"
                        style={{
                          border:`2px solid ${on ? '#2E9F75' : 'rgba(11,37,69,0.10)'}`,
                          background: on ? 'linear-gradient(135deg,rgba(46,159,117,0.12),rgba(16,185,129,0.07))' : 'rgba(255,255,255,0.7)',
                          boxShadow: on ? '0 6px 20px rgba(46,159,117,0.20)' : '0 2px 8px rgba(11,37,69,0.06)',
                          transform: on ? 'scale(1.03)' : 'scale(1)',
                        }}>
                        {on && (
                          <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: TEAL }}>✓</span>
                        )}
                        <div className="text-3xl mb-2">{g.icon}</div>
                        <div className="font-['DM_Sans'] text-xs sm:text-sm font-semibold"
                          style={{ color: on ? '#2E9F75' : NAVY }}>{g.val}</div>
                      </button>
                    );
                  })}
                </div>

                <Label>Select Your Age Group</Label>
                <div className="mb-6">
                  <StyledSelect value={age} onChange={setAge} placeholder="-- Select Age Group --">
                    {['Below 18','18 – 25','26 – 35','36 – 45','46 – 60','Above 60'].map(o =>
                      <option key={o} value={o}>{o}</option>)}
                  </StyledSelect>
                </div>

                <Label>Marital Status</Label>
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {['Married','Unmarried','Divorced','Separated','Widowed'].map(m => (
                    <Chip key={m} label={m} active={marital === m} onClick={() => setMarital(marital === m ? '' : m)} />
                  ))}
                </div>

                <StepActions step={step} onNext={next} onShow={handleShowSchemes} />
              </div>
            )}

            {/* ════ STEP 2 — Location ════ */}
            {step === 2 && (
              <div className="sf-in">
                <Label>Select Your State / UT</Label>
                <div className="mb-6">
                  <StyledSelect value={state} onChange={setState} placeholder="-- Select State / UT --">
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </StyledSelect>
                </div>

                <Label>Area of Residence</Label>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  {[
                    { val:'Urban', icon:'🏙️', desc:'City / Town / Municipality' },
                    { val:'Rural', icon:'🌾', desc:'Village / Gram Panchayat' },
                  ].map(a => {
                    const on = area === a.val;
                    return (
                      <button key={a.val} onClick={() => setArea(on ? '' : a.val)}
                        className="relative p-5 rounded-2xl text-left sf-hover focus:outline-none"
                        style={{
                          border:`2px solid ${on ? '#2E9F75' : 'rgba(11,37,69,0.10)'}`,
                          background: on ? 'linear-gradient(135deg,rgba(46,159,117,0.10),rgba(16,185,129,0.06))' : 'rgba(255,255,255,0.7)',
                          boxShadow: on ? '0 6px 20px rgba(46,159,117,0.18)' : '0 2px 8px rgba(11,37,69,0.06)',
                        }}>
                        {on && (
                          <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: TEAL }}>✓</span>
                        )}
                        <div className="text-2xl mb-2">{a.icon}</div>
                        <div className="font-['DM_Sans'] font-bold text-sm" style={{ color: on ? '#2E9F75' : NAVY }}>{a.val}</div>
                        <div className="font-['DM_Sans'] text-xs mt-0.5" style={{ color:'rgba(17,24,39,0.50)' }}>{a.desc}</div>
                      </button>
                    );
                  })}
                </div>

                <StepActions step={step} onBack={back} onNext={next} onShow={handleShowSchemes} />
              </div>
            )}

            {/* ════ STEP 3 — Social Category ════ */}
            {step === 3 && (
              <div className="sf-in">
                <Label>Your Social Category</Label>
                <p className="font-['DM_Sans'] text-xs mb-4" style={{ color:'rgba(17,24,39,0.48)' }}>
                  Select as per government records.
                </p>
                <div className="flex flex-col gap-3 mb-2">
                  {SOCIAL_CATEGORIES.map(c => {
                    const on = socCat === c.val;
                    return (
                      <button key={c.val} onClick={() => setSocCat(on ? '' : c.val)}
                        className="flex items-center gap-4 p-4 rounded-xl text-left sf-hover focus:outline-none"
                        style={{
                          border:`2px solid ${on ? '#2E9F75' : 'rgba(11,37,69,0.10)'}`,
                          background: on ? 'linear-gradient(135deg,rgba(46,159,117,0.10),rgba(16,185,129,0.06))' : 'rgba(255,255,255,0.7)',
                          boxShadow: on ? '0 4px 16px rgba(46,159,117,0.18)' : '0 1px 4px rgba(11,37,69,0.05)',
                        }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: on ? TEAL : 'rgba(11,37,69,0.07)', color: on ? '#fff' : NAVY }}>
                          {c.val}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-['DM_Sans'] font-bold text-sm" style={{ color: on ? '#2E9F75' : NAVY }}>{c.val}</div>
                          <div className="font-['DM_Sans'] text-xs mt-0.5" style={{ color:'rgba(17,24,39,0.48)' }}>{c.full}</div>
                        </div>
                        {on && (
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: TEAL }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <StepActions step={step} onBack={back} onNext={next} onShow={handleShowSchemes} />
              </div>
            )}

            {/* ════ STEP 4 — Special Status ════ */}
            {step === 4 && (
              <div className="sf-in">
                <div className="p-5 rounded-2xl mb-5"
                  style={{ background:'rgba(99,102,241,0.06)', border:'1.5px solid rgba(99,102,241,0.18)' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0">♿</span>
                    <div>
                      <div className="font-['DM_Sans'] font-bold text-sm" style={{ color: NAVY }}>Person with Disability (PwD)</div>
                      <div className="font-['DM_Sans'] text-xs mt-0.5" style={{ color:'rgba(17,24,39,0.50)' }}>
                        As defined under the Rights of Persons with Disabilities Act, 2016
                      </div>
                    </div>
                  </div>
                  <YesNo value={isPwd} onChange={setIsPwd} yesLabel="Yes, I am PwD" noLabel="No" />
                </div>

                <div className="p-5 rounded-2xl mb-2"
                  style={{ background:'rgba(245,158,11,0.06)', border:'1.5px solid rgba(245,158,11,0.18)' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0">🧒</span>
                    <div>
                      <div className="font-['DM_Sans'] font-bold text-sm" style={{ color: NAVY }}>Are you a Minor?</div>
                      <div className="font-['DM_Sans'] text-xs mt-0.5" style={{ color:'rgba(17,24,39,0.50)' }}>
                        Below 18 years of age as per Indian law
                      </div>
                    </div>
                  </div>
                  <YesNo value={isMinor} onChange={setIsMinor} yesLabel="Yes, I am a Minor" noLabel="No, I am an Adult" />
                </div>

                <StepActions step={step} onBack={back} onNext={next} onShow={handleShowSchemes} />
              </div>
            )}

            {/* ════ STEP 5 — Occupation ════ */}
            {step === 5 && (
              <div className="sf-in">
                <Label>Your Current Occupation / Role</Label>
                <p className="font-['DM_Sans'] text-xs mb-4" style={{ color:'rgba(17,24,39,0.48)' }}>
                  Select what best describes your employment status.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  {OCCUPATION_ROLES.map(r => {
                    const on = role === r.val;
                    return (
                      <button key={r.val} onClick={() => setRole(on ? '' : r.val)}
                        className="flex items-center gap-3 p-4 rounded-xl text-left sf-hover focus:outline-none"
                        style={{
                          border:`2px solid ${on ? '#2E9F75' : 'rgba(11,37,69,0.10)'}`,
                          background: on ? 'linear-gradient(135deg,rgba(46,159,117,0.10),rgba(16,185,129,0.06))' : 'rgba(255,255,255,0.7)',
                          boxShadow: on ? '0 4px 16px rgba(46,159,117,0.18)' : '0 1px 4px rgba(11,37,69,0.05)',
                        }}>
                        <span className="text-xl flex-shrink-0">{r.icon}</span>
                        <span className="font-['DM_Sans'] font-semibold text-sm flex-1"
                          style={{ color: on ? '#2E9F75' : NAVY }}>{r.val}</span>
                        {on && (
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: TEAL }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <StepActions step={step} onBack={back} onNext={next} onShow={handleShowSchemes} />
              </div>
            )}

            {/* ════ STEP 6 — Financial ════ */}
            {step === 6 && (
              <div className="sf-in">
                <div className="p-5 rounded-2xl mb-6"
                  style={{ background:'rgba(239,68,68,0.05)', border:'1.5px solid rgba(239,68,68,0.18)' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0">📋</span>
                    <div>
                      <div className="font-['DM_Sans'] font-bold text-sm" style={{ color: NAVY }}>
                        Below Poverty Line (BPL) Card Holder
                      </div>
                      <div className="font-['DM_Sans'] text-xs mt-0.5" style={{ color:'rgba(17,24,39,0.50)' }}>
                        Do you hold a BPL ration card issued by the State Government?
                      </div>
                    </div>
                  </div>
                  <YesNo value={isBpl} onChange={setIsBpl} yesLabel="Yes, I am BPL" noLabel="No, I am APL" />
                </div>

                <Label>Annual Household Income</Label>
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {INCOME_OPTIONS.map(i => (
                    <Chip key={i} label={i} active={income === i} onClick={() => setIncome(income === i ? '' : i)} />
                  ))}
                </div>

                <StepActions step={step} onBack={back} onShow={handleShowSchemes} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════ LIVE RESULTS ══════ */}
      {showResults && (
        <div ref={resultsRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-14 sf-cards-in">

          {/* Results header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold mb-1" style={{ color: NAVY }}>
                Schemes For You
              </h2>
              <p className="font-['DM_Sans'] text-sm" style={{ color:'rgba(17,24,39,0.60)' }}>
                {activeFilterCount > 0
                  ? <>Showing <strong style={{ color:'#2E9F75' }}>{filteredSchemes.length}</strong> of {SCHEMES.length} schemes
                      {' '}matching <strong style={{ color:'#2E9F75' }}>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}</strong></>
                  : <>Showing <strong style={{ color:'#2E9F75' }}>all {SCHEMES.length}</strong> schemes — no filters applied</>
                }
              </p>
            </div>
            <div className="flex gap-2 flex-wrap self-start sm:self-auto">
              {activeFilterCount > 0 && (
                <button onClick={handleReset}
                  className="sf-hover font-['DM_Sans'] text-sm font-semibold px-4 py-2 rounded-full border-2 focus:outline-none"
                  style={{ borderColor:'rgba(239,68,68,0.30)', color:'#dc2626', background:'rgba(239,68,68,0.05)' }}>
                  ✕ Clear Filters
                </button>
              )}
              <button onClick={() => { setShowResults(false); setFormOpen(true); }}
                className="sf-hover font-['DM_Sans'] text-sm font-semibold px-4 py-2 rounded-full border-2 focus:outline-none"
                style={{ borderColor:'rgba(11,37,69,0.12)', color:NAVY, background:'rgba(255,255,255,0.85)' }}>
                ← Back to Filter
              </button>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                gender && { label: `👤 ${gender}`, clear: () => setGender('') },
                age    && { label: `🎂 ${age}`,    clear: () => setAge('') },
                marital&& { label: `💍 ${marital}`,clear: () => setMarital('') },
                area   && { label: `📍 ${area}`,   clear: () => setArea('') },
                socCat && { label: `🏷️ ${socCat}`, clear: () => setSocCat('') },
                role   && { label: `💼 ${role}`,   clear: () => setRole('') },
                isBpl !== null && { label: isBpl ? '📋 BPL':'📋 APL', clear: () => setIsBpl(null) },
              ].filter(Boolean).map((f, i) => (
                <button key={i} onClick={() => { f.clear(); }}
                  className="inline-flex items-center gap-1.5 font-['DM_Sans'] text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                  style={{ background:'rgba(46,159,117,0.10)', color:'#2E9F75', border:'1px solid rgba(46,159,117,0.25)' }}>
                  {f.label}
                  <span className="text-xs opacity-70">✕</span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-3xl border"
              style={{ background:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', borderColor:'rgba(11,37,69,0.08)', boxShadow:'0 8px 32px rgba(11,37,69,0.08)' }}>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2" style={{ color:NAVY }}>
                No schemes match this profile
              </h3>
              <p className="font-['DM_Sans'] text-sm mb-6" style={{ color:'rgba(17,24,39,0.55)' }}>
                Try removing some filters to see more results.
              </p>
              <button onClick={handleReset}
                className="font-['DM_Sans'] font-bold text-sm text-white px-7 py-3 rounded-full"
                style={{ background: TEAL, boxShadow:'0 4px 16px rgba(46,159,117,0.35)' }}>
                ↺ Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSchemes.map((s, idx) => <SchemeCard key={s.id} s={s} idx={idx} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Scheme Card ──────────────────────────────────────────────────────────────
function SchemeCard({ s, idx }) {
  const [hov, setHov] = useState(false);
  const cfg = SCHEME_CAT_CFG[s.schemeCategory] || { bg:'rgba(11,37,69,0.08)', text:'#0B2545', icon:'📋', grad:'from-gray-400 to-gray-500' };
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="sf-card flex flex-col rounded-3xl overflow-hidden border sf-cards-in"
      style={{
        animationDelay:`${idx * 0.05}s`,
        background:'rgba(255,255,255,0.74)',
        backdropFilter:'blur(16px)',
        WebkitBackdropFilter:'blur(16px)',
        border: hov ? '1.5px solid rgba(46,159,117,0.35)' : '1.5px solid rgba(11,37,69,0.08)',
        boxShadow: hov ? '0 16px 40px rgba(11,37,69,0.14)' : '0 2px 16px rgba(11,37,69,0.07)',
      }}>
      <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.grad}`} />
      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
        <span className="inline-flex items-center gap-1.5 font-['DM_Sans'] text-xs font-bold px-3 py-1.5 rounded-full self-start"
          style={{ background: cfg.bg, color: cfg.text }}>
          {cfg.icon} {s.schemeCategory}
        </span>
        <h3 className="font-['Playfair_Display'] text-lg font-bold leading-snug" style={{ color:'#0B2545' }}>{s.name}</h3>
        <p className="font-['DM_Sans'] text-sm leading-relaxed flex-1" style={{ color:'rgba(17,24,39,0.60)' }}>{s.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {s.eligibilityTags.map(t => (
            <span key={t} className="font-['DM_Sans'] text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background:'rgba(46,159,117,0.10)', color:'#2E9F75' }}>{t}</span>
          ))}
        </div>
        <button className="sf-know mt-1 font-['DM_Sans'] font-bold text-sm py-2.5 rounded-xl border-2 w-full focus:outline-none transition-all duration-200"
          style={{ borderColor:'#2E9F75', color:'#2E9F75', background:'transparent' }}>
          Know More →
        </button>
      </div>
    </div>
  );
}
