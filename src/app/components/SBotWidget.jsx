import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

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

/* ── API ─────────────────────────────────────────────────── */
const CHAT_API = 'http://192.168.137.1:3000/api/chat';

async function fetchBotResponse(message, language) {
  const res = await fetch(CHAT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  const data = await res.json();
  return data.botResponse;
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── Markdown Renderer ───────────────────────────────────── */
function parseInline(text) {
  // Handle **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 700, color: '#1b5e20' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function FormattedMessage({ text }) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Numbered list: 1. or 1)
    const numMatch = line.match(/^(\d+)[.)\s]\s*(.+)/);
    if (numMatch) {
      elements.push(
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', margin: '4px 0' }}>
          <span style={{
            minWidth: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg,#2e7d32,#4caf50)',
            color: '#fff', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{numMatch[1]}</span>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: '#1b4332' }}>{parseInline(numMatch[2])}</span>
        </div>
      );
      i++;
      continue;
    }

    // Bullet list: - or •
    const bulletMatch = line.match(/^[-•*]\s+(.+)/);
    if (bulletMatch) {
      elements.push(
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', margin: '3px 0' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#4caf50', flexShrink: 0, marginTop: 5,
          }}/>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: '#1b4332' }}>{parseInline(bulletMatch[1])}</span>
        </div>
      );
      i++;
      continue;
    }

    // Section header: line ending with colon or all-caps label
    const isHeader = line.endsWith(':') || /^[A-Z][A-Za-z &]+:$/.test(line);
    if (isHeader || (line.startsWith('**') && line.endsWith('**'))) {
      const headerText = line.replace(/\*\*/g, '').replace(/:$/, '');
      elements.push(
        <div key={i} style={{
          borderLeft: '3px solid #4caf50', paddingLeft: 8,
          margin: '8px 0 3px', fontWeight: 700,
          fontSize: 12.5, color: '#1b5e20', letterSpacing: 0.2,
        }}>
          {headerText}
        </div>
      );
      i++;
      continue;
    }

    // Plain text paragraph
    elements.push(
      <p key={i} style={{ margin: '3px 0', fontSize: 13, lineHeight: 1.55, color: '#1b4332' }}>
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{elements}</div>;
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
  const { language } = useLanguage();
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
  const chatRef     = useRef(null);
  const robotRef    = useRef(null);

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

  /* Click-outside → close chat */
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e) => {
      const clickedChat  = chatRef.current  && chatRef.current.contains(e.target);
      const clickedRobot = robotRef.current && robotRef.current.contains(e.target);
      if (!clickedChat && !clickedRobot) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
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

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(p => [...p, { id: Date.now(), from: 'user', text: trimmed, time: timestamp() }]);
    setInput(''); setShowQuick(false); setTyping(true);
    try {
      const reply = await fetchBotResponse(trimmed, language.code);
      setTyping(false);
      setMessages(p => [...p, { id: Date.now() + 1, from: 'bot', text: reply, time: timestamp() }]);
    } catch (err) {
      console.error('[SBot] API error:', err);
      setTyping(false);
      setMessages(p => [...p, {
        id: Date.now() + 1, from: 'bot',
        text: "Oops! I couldn't reach the server right now. Please try again in a moment. 🔄",
        time: timestamp(),
      }]);
    }
  }
  function handleKey(e) { if (e.key === 'Enter') sendMessage(input); }

  const BotFace = ({ size = 24 }) => avatarSrc
    ? <img src={avatarSrc} alt="SBot" style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', display:'block' }}/>
    : <MiniRobot size={size}/>;

  /* Position helpers */
  const isMobile     = typeof window !== 'undefined' && window.innerWidth < 480;
  const NAVBAR_HEIGHT = 70;            // approximate navbar height in px
  const CHAT_HEIGHT   = isMobile ? 430 : 500;  // chat window height
  const CHAT_WIDTH    = isMobile ? 300 : 360;  // chat window width
  const ROBOT_BOTTOM  = 16;            // robot bottom offset
  const ROBOT_HEIGHT  = 148;           // robot SVG height

  const rLeft    = robotLeft;
  // Keep chat horizontally inside the viewport with 10 px margins
  const chatLeft = Math.max(10, Math.min(rLeft - 250, window.innerWidth - CHAT_WIDTH - 10));
  // Position chat above the robot; clamp so it never goes above the navbar
  const chatBottomRaw = ROBOT_BOTTOM + ROBOT_HEIGHT + 16;
  // Maximum allowed bottom = viewport height − navbar height − chat height
  const chatBottomMax = window.innerHeight - NAVBAR_HEIGHT - CHAT_HEIGHT;
  const chatBottom   = Math.max(chatBottomMax > 0 ? chatBottomMax : 0, chatBottomRaw) > chatBottomRaw
    ? chatBottomRaw
    : Math.max(0, chatBottomMax);
  const wrapAnim = isDancing ? 'sbot-dance' : isWalking ? 'sbot-walk' : 'sbot-idle';

  /* ── JSX ── */
  return (
    <>
      <style>{STYLES}</style>

      {/* ════ FLOATING ROBOT ════ */}
      <div ref={robotRef} style={{
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
        <div ref={chatRef} className="sbot-win" style={{
          position: 'fixed',
          bottom: chatBottom,
          left: chatLeft,
          width: `min(${CHAT_WIDTH}px, calc(100vw - ${isMobile ? '16px' : '20px'}))`,
          height: Math.min(CHAT_HEIGHT, window.innerHeight - NAVBAR_HEIGHT - 20),
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
                    padding: msg.from==='bot' ? '10px 14px' : '9px 13px',
                    borderRadius: msg.from==='bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    fontSize:13.5, lineHeight:1.55, wordBreak:'break-word',
                    boxShadow:'0 1px 4px rgba(0,0,0,.07)',
                  }}>
                    {msg.from === 'bot' ? <FormattedMessage text={msg.text} /> : msg.text}
                  </div>
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
            background:'#fff', display:'flex', gap:8, alignItems:'center', flexShrink:0,
          }}>
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
        </div>
      )}
    </>
  );
}
