import React, { useState, useEffect, useRef } from 'react';

/* ── Keyframes & CSS ─────────────────────────────────────── */
const STYLES = `
  @keyframes float {
    0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}
  }
  @keyframes walk-bounce {
    0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-7px) rotate(2deg)}
  }
  @keyframes happy-dance {
    0%{transform:translateY(0) rotate(0)}15%{transform:translateY(-16px) rotate(-9deg)}
    30%{transform:translateY(-4px) rotate(9deg)}50%{transform:translateY(-12px) rotate(-6deg)}
    70%{transform:translateY(-3px) rotate(5deg)}85%{transform:translateY(-7px) rotate(-3deg)}100%{transform:translateY(0) rotate(0)}
  }
  @keyframes leg-stride-l {
    0%,100%{transform:rotate(22deg)}50%{transform:rotate(-22deg)}
  }
  @keyframes leg-stride-r {
    0%,100%{transform:rotate(-22deg)}50%{transform:rotate(22deg)}
  }
  @keyframes arm-wave {
    0%,100%{transform:rotate(0deg)}30%{transform:rotate(-55deg)}60%{transform:rotate(-38deg)}
  }
  @keyframes slideUp {
    from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}
  }
  @keyframes blink-dot {
    0%,100%{opacity:1}50%{opacity:0}
  }
  @keyframes typing-bounce {
    0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}
  }
  @keyframes bubble-fade {
    0%,100%{opacity:0;transform:translateY(6px)}15%,82%{opacity:1;transform:translateY(0)}
  }
  @keyframes notif-ping {
    0%,100%{transform:scale(1);opacity:1}60%{transform:scale(1.5);opacity:0.5}
  }
  @keyframes halo-glow {
    0%,100%{filter:drop-shadow(0 0 3px #ff9800)}50%{filter:drop-shadow(0 0 11px #ffcc00)}
  }
  @keyframes sparkle-pop {
    0%,100%{opacity:.55;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.4)}
  }
  @keyframes eyes-blink {
    0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.08)}
  }
  @keyframes shadow-pulse {
    0%,100%{transform:scaleX(1);opacity:.18}50%{transform:scaleX(.72);opacity:.09}
  }

  .sbot-idle  { animation: float      3.2s ease-in-out infinite; }
  .sbot-walk  { animation: walk-bounce  .36s ease-in-out infinite; }
  .sbot-dance { animation: happy-dance  .95s ease-in-out; }
  .sbot-halo  { animation: halo-glow     2s  ease-in-out infinite; }
  .sbot-spark { animation: sparkle-pop  1.7s ease-in-out infinite; }
  .sbot-eyes  { animation: eyes-blink    5s  ease-in-out infinite; transform-origin:center; }
  .sbot-notif { animation: notif-ping   1.5s ease-in-out infinite; }
  .sbot-bubble{ animation: bubble-fade  3.9s ease-in-out both; }
  .sbot-win   { animation: slideUp      .36s cubic-bezier(.22,.68,0,1.22) both; }
  .sbot-online{ animation: blink-dot    1.2s ease-in-out infinite; }
  .sbot-d1    { animation: typing-bounce 1.2s ease-in-out 0s    infinite; }
  .sbot-d2    { animation: typing-bounce 1.2s ease-in-out .18s  infinite; }
  .sbot-d3    { animation: typing-bounce 1.2s ease-in-out .36s  infinite; }
  .sbot-shadow{ animation: shadow-pulse  3.2s ease-in-out infinite; }

  .sbot-walking .sbot-leg-l {
    animation: leg-stride-l .36s ease-in-out infinite;
    transform-box:fill-box; transform-origin:50% 0%;
  }
  .sbot-walking .sbot-leg-r {
    animation: leg-stride-r .36s ease-in-out infinite;
    transform-box:fill-box; transform-origin:50% 0%;
  }
  .sbot-arm-wave {
    animation: arm-wave .55s ease-in-out infinite;
    transform-box:fill-box; transform-origin:50% 0%;
  }
  .sbot-wrap:hover .sbot-svg { filter:drop-shadow(0 8px 22px rgba(76,175,80,.5)); }

  .sbot-msgs::-webkit-scrollbar{width:4px}
  .sbot-msgs::-webkit-scrollbar-thumb{background:#a5d6a7;border-radius:4px}
  .sbot-qbar::-webkit-scrollbar{height:3px}
  .sbot-qbar::-webkit-scrollbar-thumb{background:#a5d6a7;border-radius:3px}
  .sbot-input:focus{outline:none;border-color:#4caf50!important}
  .sbot-send:hover{background:#2e7d32!important}
  .sbot-wa:hover{background:#1ebe57!important}
  .sbot-qbtn:hover{background:#4caf50!important;color:#fff!important}
  .sbot-xbtn:hover{background:rgba(255,255,255,.35)!important}
`;

/* ── Robot SVG ───────────────────────────────────────────── */
function RobotSVG({ isWalking, facingLeft, armWaving, svgWidth = 110, svgHeight = 148 }) {
  return (
    <svg
      width={svgWidth} height={svgHeight}
      viewBox="0 0 130 168"
      xmlns="http://www.w3.org/2000/svg"
      className={`sbot-svg${isWalking ? ' sbot-walking' : ''}`}
      style={{ display:'block', transform: facingLeft ? 'scaleX(-1)' : 'none', transition:'transform .2s' }}
    >
      {/* glow rings */}
      <circle cx="65" cy="95" r="60" fill="rgba(76,175,80,.07)"/>
      <circle cx="65" cy="95" r="46" fill="rgba(76,175,80,.11)"/>

      {/* sparkles */}
      <g className="sbot-spark">
        <line x1="34" y1="29" x2="25" y2="11" stroke="#ffb300" strokeWidth="3.2" strokeLinecap="round"/>
        <line x1="65" y1="23" x2="65"  y2="5"  stroke="#ffb300" strokeWidth="3.2" strokeLinecap="round"/>
        <line x1="96" y1="29" x2="105" y2="11" stroke="#ffb300" strokeWidth="3.2" strokeLinecap="round"/>
      </g>

      {/* halo */}
      <g className="sbot-halo">
        <path d="M 21 43 Q 65 10 109 43" stroke="#ff9800" strokeWidth="9" fill="none" strokeLinecap="round"/>
      </g>

      {/* leaf */}
      <g transform="translate(97,30) rotate(-38)">
        <ellipse cx="0" cy="0" rx="13" ry="6.5" fill="#4caf50"/>
        <line x1="-10" y1="3" x2="10" y2="-3" stroke="#2e7d32" strokeWidth="1.4" strokeLinecap="round"/>
      </g>

      {/* body */}
      <circle cx="65" cy="95" r="50" fill="#7bcf7b"/>
      <ellipse cx="48" cy="74" rx="18" ry="12" fill="rgba(255,255,255,.17)"/>

      {/* left arm — wave applied here */}
      <circle cx="12" cy="107" r="14" fill="#7bcf7b" className={armWaving ? 'sbot-arm-wave' : ''}/>
      {/* right arm */}
      <circle cx="118" cy="107" r="14" fill="#7bcf7b"/>

      {/* eyes */}
      <g className="sbot-eyes">
        <circle cx="50" cy="88" r="11" fill="white"/>
        <circle cx="80" cy="88" r="11" fill="white"/>
        <circle cx="51" cy="88" r="6.5" fill="#1565c0"/>
        <circle cx="81" cy="88" r="6.5" fill="#1565c0"/>
        <circle cx="53.5" cy="85" r="2.5" fill="white"/>
        <circle cx="83.5" cy="85" r="2.5" fill="white"/>
      </g>

      {/* cheeks */}
      <ellipse cx="38" cy="100" rx="9" ry="5.5" fill="rgba(200,120,80,.23)"/>
      <ellipse cx="92" cy="100" rx="9" ry="5.5" fill="rgba(200,120,80,.23)"/>

      {/* smile */}
      <path d="M 49 107 Q 65 122 81 107" stroke="#2e7d32" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* nameplate */}
      <rect x="28" y="118" width="74" height="30" rx="6" fill="#1a237e"/>
      <rect x="31" y="121" width="68" height="24" rx="4" fill="#162057"/>
      <text x="65" y="138" textAnchor="middle" fill="#4fc3f7" fontSize="16"
            fontWeight="bold" fontFamily="Arial,sans-serif" letterSpacing="2">SBot</text>

      {/* legs */}
      <g className="sbot-leg-l">
        <rect x="44" y="144" width="16" height="19" rx="5" fill="#1a237e"/>
        <rect x="37" y="157" width="29" height="9"  rx="4.5" fill="#1a237e"/>
      </g>
      <g className="sbot-leg-r">
        <rect x="70" y="144" width="16" height="19" rx="5" fill="#1a237e"/>
        <rect x="64" y="157" width="29" height="9"  rx="4.5" fill="#1a237e"/>
      </g>
    </svg>
  );
}

/* ── Mini robot for chat header ─────────────────────────── */
function MiniRobot({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="#7bcf7b"/>
      <circle cx="28" cy="36" r="9"  fill="white"/>
      <circle cx="52" cy="36" r="9"  fill="white"/>
      <circle cx="29" cy="36" r="5"  fill="#1565c0"/>
      <circle cx="53" cy="36" r="5"  fill="#1565c0"/>
      <circle cx="30" cy="34" r="2"  fill="white"/>
      <circle cx="54" cy="34" r="2"  fill="white"/>
      <path d="M 28 50 Q 40 62 52 50" stroke="#2e7d32" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Responses ───────────────────────────────────────────── */
function getBotResponse(text) {
  const t = text.toLowerCase();
  if (/scheme|yojana|government|gov|pm |pradhan/.test(t))
    return "SchemMe helps you find government schemes tailored to you! 🇮🇳 Tell me your category (farmer, student, woman, senior) for personalised results!";
  if (/service|web|mobile|app\b|ai\b/.test(t))
    return "We offer Web Development, Mobile Apps, AI/ML Solutions, SaaS, Cloud & DevOps, and API Backend services. Visit schemme.com/services!";
  if (/course|training|learn|mern|react/.test(t))
    return "Industry-leading courses: Full-Stack MERN (₹50k), AI/ML Mastery (₹60k), React & Next.js (₹40k), DevOps & Cloud (₹55k). Visit schemme.com/courses!";
  if (/project|buy|source\s*code/.test(t))
    return "Ready-made projects: E-Commerce (₹30k), AI Chatbot (₹40k), Food Delivery (₹35k) and more at schemme.com/projects!";
  if (/contact|phone|email|address/.test(t))
    return "📧 contact@schemme.com | 📞 +91 98881 19100 | 📍 Nexa Tower, Sector 74, Mohali, Punjab";
  if (/whatsapp|wa\b/.test(t)) {
    window.open("https://wa.me/919390220006", "_blank");
    return "Opening WhatsApp... 🟢 Chat with us at +91 93902 20006!";
  }
  if (/hello|hi\b|hey/.test(t)) return "Hello! 😊 Great to meet you! How can SBot assist you today?";
  if (/price|cost|fee/.test(t))  return "Pricing varies by service. Contact us at +91 98881 19100 or WhatsApp for a custom quote!";
  return "I'm not sure about that, but our team can help! Reach us at contact@schemme.com or WhatsApp below 👇";
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const QUICK_REPLIES = [
  { label: "🏛️ Find Schemes",  value: "government schemes" },
  { label: "🌐 Our Services",  value: "services"           },
  { label: "📚 Courses",       value: "courses"            },
  { label: "💼 Projects",      value: "projects"           },
  { label: "📞 Contact Us",    value: "contact"            },
  { label: "💬 WhatsApp",      value: "whatsapp"           },
];

const SPEECH = [
  "Hi! Need help? 👋",
  "Find gov. schemes! 🏛️",
  "I'm SBot by SchemMe 🤖",
  "Let me guide you! 💡",
  "Ask me anything! 😊",
];

/* ── Main Component ──────────────────────────────────────── */
export default function SBotWidget({ avatarSrc = undefined }) {
  const [isOpen,     setIsOpen]     = useState(false);
  const [messages,   setMessages]   = useState([]);
  const [input,      setInput]      = useState('');
  const [typing,     setTyping]     = useState(false);
  const [greetDone,  setGreetDone]  = useState(false);
  const [showQuick,  setShowQuick]  = useState(false);
  const [robotLeft,  setRobotLeft]  = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth - 150 : 900
  );
  const [isWalking,  setIsWalking]  = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [armWaving,  setArmWaving]  = useState(false);
  const [isDancing,  setIsDancing]  = useState(false);
  const [speechIdx,  setSpeechIdx]  = useState(0);
  const [speechKey,  setSpeechKey]  = useState(0);

  const msgsEndRef  = useRef(null);
  const prevScrollY = useRef(0);
  const walkTimer   = useRef(null);
  const waveTimer   = useRef(null);
  const danceTimer  = useRef(null);

  /* Scroll → walk across screen */
  useEffect(() => {
    const onScroll = () => {
      if (isOpen) return;
      const sy       = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio     = Math.min(1, Math.max(0, sy / maxScroll));
      const maxLeft   = window.innerWidth - 130 - 20;
      const newLeft   = maxLeft - ratio * (maxLeft - 20);

      setFacingLeft(sy > prevScrollY.current);
      setIsWalking(true);
      setRobotLeft(newLeft);
      prevScrollY.current = sy;

      clearTimeout(walkTimer.current);
      walkTimer.current = setTimeout(() => setIsWalking(false), 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(walkTimer.current); };
  }, [isOpen]);

  /* Window resize */
  useEffect(() => {
    const onResize = () => {
      const sy        = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio     = Math.min(1, Math.max(0, sy / maxScroll));
      setRobotLeft(window.innerWidth - 130 - 20 - ratio * (window.innerWidth - 170));
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Periodic arm wave */
  useEffect(() => {
    const schedule = () => {
      waveTimer.current = setTimeout(() => {
        if (!isOpen) { setArmWaving(true); setTimeout(() => setArmWaving(false), 1600); }
        schedule();
      }, 5000 + Math.random() * 5000);
    };
    schedule();
    return () => clearTimeout(waveTimer.current);
  }, [isOpen]);

  /* Periodic happy dance */
  useEffect(() => {
    const schedule = () => {
      danceTimer.current = setTimeout(() => {
        if (!isOpen && !isWalking) { setIsDancing(true); setTimeout(() => setIsDancing(false), 950); }
        schedule();
      }, 9000 + Math.random() * 7000);
    };
    schedule();
    return () => clearTimeout(danceTimer.current);
  }, [isOpen, isWalking]);

  /* Cycling speech bubble */
  useEffect(() => {
    if (isOpen) return;
    const t = setInterval(() => {
      setSpeechIdx(i => (i + 1) % SPEECH.length);
      setSpeechKey(k => k + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [isOpen]);

  /* Auto-scroll */
  useEffect(() => { msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  /* Greeting */
  useEffect(() => {
    if (isOpen && !greetDone) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages([{ id: Date.now(), from: 'bot',
          text: "Hi there! 👋 I'm SBot, your SchemMe assistant. How can I help you today?",
          time: timestamp() }]);
        setShowQuick(true); setGreetDone(true);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [isOpen, greetDone]);

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(p => [...p, { id: Date.now(), from: 'user', text: trimmed, time: timestamp() }]);
    setInput(''); setShowQuick(false); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { id: Date.now()+1, from: 'bot', text: getBotResponse(trimmed), time: timestamp() }]);
    }, 900 + Math.random() * 400);
  }
  function handleKey(e) { if (e.key === 'Enter') sendMessage(input); }

  const BotFace = ({ size = 24 }) => avatarSrc
    ? <img src={avatarSrc} alt="SBot" style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', display:'block' }}/>
    : <MiniRobot size={size}/>;

  /* Position helpers */
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const rLeft    = robotLeft;
  const chatLeft = Math.max(10, Math.min(rLeft - 250, window.innerWidth - (isMobile ? 320 : 375)));
  const wrapAnim = isDancing ? 'sbot-dance' : isWalking ? 'sbot-walk' : 'sbot-idle';

  /* ── JSX ── */
  return (
    <>
      <style>{STYLES}</style>

      {/* ════ FLOATING ROBOT ════ */}
      <div style={{
        position: 'fixed', bottom: 16, left: rLeft,
        zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transition: isWalking ? 'left 0.14s linear' : 'left 0.5s cubic-bezier(.34,1.56,.64,1)',
        willChange: 'left',
      }}>
        {/* Speech bubble */}
        {!isOpen && (
          <div key={speechKey} className="sbot-bubble" style={{
            position: 'relative', background: '#fff', color: '#1a3a6b',
            fontWeight: 700, fontSize: 12.5, padding: '7px 14px', borderRadius: 20,
            boxShadow: '0 6px 24px rgba(0,0,0,0.13)', whiteSpace: 'nowrap',
            border: '1.5px solid #e8f5e9', pointerEvents: 'none', marginBottom: 6,
          }}>
            {SPEECH[speechIdx]}
            <span style={{
              position:'absolute', bottom:-7, left:'50%', transform:'translateX(-50%)',
              width:0, height:0,
              borderLeft:'7px solid transparent', borderRight:'7px solid transparent',
              borderTop:'7px solid #fff',
            }}/>
          </div>
        )}

        {/* Robot wrapper + shadow */}
        <div style={{ position: 'relative' }}>
          {/* Notification dot */}
          {!isOpen && (
            <span className="sbot-notif" style={{
              position:'absolute', top:26, right:2,
              width:13, height:13, background:'#f44336',
              borderRadius:'50%', border:'2px solid #fff', zIndex:2,
            }}/>
          )}

          <div
            className={`sbot-wrap ${wrapAnim}`}
            onClick={() => setIsOpen(v => !v)}
            role="button" tabIndex={0}
            aria-label={isOpen ? 'Close SBot' : 'Open SBot'}
            onKeyDown={e => e.key === 'Enter' && setIsOpen(v => !v)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <RobotSVG isWalking={isWalking} facingLeft={facingLeft} armWaving={armWaving}
              svgWidth={isMobile ? 82 : 110} svgHeight={isMobile ? 110 : 148}/>
          </div>

          {/* Ground shadow */}
          <div className="sbot-shadow" style={{
            width: 68, height: 14, margin: '-6px auto 0',
            background: 'radial-gradient(ellipse, rgba(0,0,0,.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}/>
        </div>
      </div>

      {/* ════ CHAT WINDOW ════ */}
      {isOpen && (
        <div className="sbot-win" style={{
          position: 'fixed', bottom: 200, left: chatLeft,
          width: isMobile ? 'min(300px, calc(100vw - 16px))' : 'min(360px, calc(100vw - 20px))',
          height: isMobile ? 430 : 500,
          borderRadius: 18, boxShadow: '0 24px 64px rgba(0,0,0,.21)',
          background: '#fff', display: 'flex', flexDirection: 'column',
          overflow: 'hidden', zIndex: 9998,
          transition: 'left 0.5s cubic-bezier(.34,1.56,.64,1)',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#1b5e20,#2e7d32 45%,#4caf50)',
            padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
          }}>
            <div style={{
              width:44, height:44, borderRadius:'50%',
              border:'2px solid rgba(255,255,255,.45)', overflow:'hidden', flexShrink:0,
              background:'rgba(255,255,255,.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <BotFace size={44}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ color:'#fff', fontWeight:800, fontSize:15 }}>SBot</span>
                <span className="sbot-online" style={{ width:8, height:8, borderRadius:'50%', background:'#b9f6ca', flexShrink:0 }}/>
              </div>
              <div style={{ color:'#b9f6ca', fontSize:11, marginTop:1, fontWeight:500 }}>
                SchemMe Assistant • Online
              </div>
            </div>
            <button className="sbot-xbtn" onClick={() => setIsOpen(false)} aria-label="Close" style={{
              background:'rgba(255,255,255,.18)', border:'none', color:'#fff',
              width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:15,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s',
            }}>✕</button>
          </div>

          {/* Messages */}
          <div className="sbot-msgs" style={{
            flex:1, overflowY:'auto', padding:'14px 12px',
            display:'flex', flexDirection:'column', gap:10, background:'#f4f6f8',
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display:'flex', flexDirection: msg.from==='bot' ? 'row' : 'row-reverse',
                alignItems:'flex-end', gap:6,
              }}>
                {msg.from === 'bot' && (
                  <div style={{
                    width:26, height:26, borderRadius:'50%', overflow:'hidden', flexShrink:0,
                    border:'1.5px solid #a5d6a7', background:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <BotFace size={26}/>
                  </div>
                )}
                <div style={{ maxWidth:'76%' }}>
                  <div style={{
                    background: msg.from==='bot' ? '#e8f5e9' : '#1a3a6b',
                    color:      msg.from==='bot' ? '#1b5e20' : '#fff',
                    padding:'9px 13px',
                    borderRadius: msg.from==='bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    fontSize:13.5, lineHeight:1.55, wordBreak:'break-word',
                    boxShadow:'0 1px 4px rgba(0,0,0,.07)',
                  }}>{msg.text}</div>
                  <div style={{
                    fontSize:10, color:'#9e9e9e', marginTop:3,
                    textAlign: msg.from==='bot' ? 'left' : 'right',
                    paddingLeft:  msg.from==='bot'  ? 4 : 0,
                    paddingRight: msg.from==='user' ? 4 : 0,
                  }}>{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {typing && (
              <div style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
                <div style={{
                  width:26, height:26, borderRadius:'50%', overflow:'hidden', flexShrink:0,
                  border:'1.5px solid #a5d6a7', background:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}><BotFace size={26}/></div>
                <div style={{
                  background:'#e8f5e9', borderRadius:'16px 16px 16px 4px',
                  padding:'11px 14px', display:'flex', gap:5, alignItems:'center',
                  boxShadow:'0 1px 4px rgba(0,0,0,.07)',
                }}>
                  <span className="sbot-d1" style={{ width:7, height:7, borderRadius:'50%', background:'#4caf50', display:'inline-block' }}/>
                  <span className="sbot-d2" style={{ width:7, height:7, borderRadius:'50%', background:'#4caf50', display:'inline-block' }}/>
                  <span className="sbot-d3" style={{ width:7, height:7, borderRadius:'50%', background:'#4caf50', display:'inline-block' }}/>
                </div>
              </div>
            )}
            <div ref={msgsEndRef}/>
          </div>

          {/* Quick replies */}
          {showQuick && (
            <div className="sbot-qbar" style={{
              display:'flex', gap:7, padding:'8px 12px',
              overflowX:'auto', flexShrink:0,
              background:'#f4f6f8', borderTop:'1px solid #e8f5e9',
            }}>
              {QUICK_REPLIES.map(qr => (
                <button key={qr.value} className="sbot-qbtn" onClick={() => sendMessage(qr.value)} style={{
                  whiteSpace:'nowrap', padding:'5px 12px', borderRadius:20,
                  border:'1.5px solid #4caf50', background:'#fff', color:'#2e7d32',
                  fontSize:12, fontWeight:600, cursor:'pointer', transition:'background .2s,color .2s',
                }}>{qr.label}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding:'10px 12px', borderTop:'1px solid #e8f5e9',
            background:'#fff', display:'flex', flexDirection:'column', gap:8, flexShrink:0,
          }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input
                className="sbot-input"
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Type your message..." aria-label="Chat message"
                style={{
                  flex:1, padding:'9px 14px', borderRadius:24,
                  border:'1.5px solid #c8e6c9', fontSize:13.5,
                  color:'#1a3a6b', background:'#f9fafb', transition:'border .2s',
                }}
              />
              <button className="sbot-send" onClick={() => sendMessage(input)} aria-label="Send" style={{
                width:38, height:38, borderRadius:'50%', background:'#4caf50', border:'none',
                color:'#fff', cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', flexShrink:0, transition:'background .2s',
              }}>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <a href="https://wa.me/919390220006" target="_blank" rel="noopener noreferrer"
              className="sbot-wa" style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                padding:'7px 12px', borderRadius:24, background:'#25d366',
                color:'#fff', textDecoration:'none', fontSize:12.5, fontWeight:600, transition:'background .2s',
              }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
