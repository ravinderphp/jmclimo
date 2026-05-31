"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 7000;

export interface SlideData {
  id: number;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  image: string;
  accentColor: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  carType: string;
}

// CSS gradient fallbacks — used when no image is uploaded
const GRADIENT_BG: Record<number, string> = {
  1: `radial-gradient(ellipse at 18% 85%, rgba(196,30,58,0.22) 0%, transparent 52%),
      radial-gradient(ellipse at 75% 25%, rgba(100,20,0,0.14) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 100%, rgba(80,0,0,0.3) 0%, transparent 40%),
      linear-gradient(158deg, #020204 0%, #070710 38%, #0d0d18 65%, #030308 100%)`,
  2: `radial-gradient(ellipse at 82% 28%, rgba(15,30,100,0.28) 0%, transparent 55%),
      radial-gradient(ellipse at 15% 75%, rgba(10,20,60,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(5,10,40,0.2) 0%, transparent 60%),
      linear-gradient(158deg, #020208 0%, #04060e 38%, #060810 65%, #020208 100%)`,
  3: `radial-gradient(ellipse at 50% 90%, rgba(138,78,0,0.28) 0%, transparent 52%),
      radial-gradient(ellipse at 82% 20%, rgba(100,60,0,0.18) 0%, transparent 48%),
      radial-gradient(ellipse at 20% 50%, rgba(80,40,0,0.12) 0%, transparent 45%),
      linear-gradient(158deg, #080604 0%, #0e0a04 38%, #100c04 65%, #080604 100%)`,
  4: `radial-gradient(ellipse at 25% 72%, rgba(60,0,80,0.22) 0%, transparent 52%),
      radial-gradient(ellipse at 78% 30%, rgba(40,0,60,0.16) 0%, transparent 48%),
      radial-gradient(ellipse at 50% 50%, rgba(20,0,30,0.2) 0%, transparent 60%),
      linear-gradient(158deg, #030304 0%, #070710 38%, #09090e 65%, #030304 100%)`,
};

const DEFAULT_SLIDES: SlideData[] = [
  { id: 1, eyebrow: "Los Angeles Premier Chauffeur Service", heading: "The Art of", headingAccent: "Arrival.", body: "Seamless airport transfers from LAX, BUR, SNA, LGB & ONT. Professional meet & greet, real-time flight tracking, and complimentary wait time. Available 24/7.", image: "", accentColor: "#c41e3a", ctaSecondaryLabel: "Airport Transfers", ctaSecondaryHref: "/services/airport-transfers", carType: "sedan" },
  { id: 2, eyebrow: "Executive & Corporate Travel", heading: "Driven by", headingAccent: "Excellence.", body: "First-class corporate chauffeur service for executives, client meetings, roadshows, and business events. Discreet, punctual, impeccably presented — every time.", image: "", accentColor: "#4a70c0", ctaSecondaryLabel: "Corporate Travel", ctaSecondaryHref: "/services/corporate-travel", carType: "suv" },
  { id: 3, eyebrow: "Wedding & Special Occasions", heading: "Your Perfect", headingAccent: "Journey.", body: "Elegant luxury transportation for your wedding day and most memorable occasions. Every detail perfected — from the bridal party to the reception and beyond.", image: "", accentColor: "#d4a85c", ctaSecondaryLabel: "Wedding Limo", ctaSecondaryHref: "/services/wedding-limo", carType: "stretch" },
  { id: 4, eyebrow: "VIP & Celebrity Transportation", heading: "Command Every", headingAccent: "Entrance.", body: "Discreet, luxurious, and unforgettable. Premium black car service for LA's most discerning clients, executives, and public figures. Privacy guaranteed.", image: "", accentColor: "#9966cc", ctaSecondaryLabel: "Contact Us", ctaSecondaryHref: "/contact", carType: "suv" },
];

// SVG Car silhouettes
function SedanSilhouette({ color }: { color: string }) {
  const c = color;
  return (
    <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="350" cy="290" rx="340" ry="12" fill={`${c}18`} />
      <path d="M30,240 L30,190 Q45,155 95,142 L180,112 Q220,100 265,98 L400,98 Q450,100 490,114 L575,142 Q625,155 660,190 L660,240 Z" fill={`${c}12`} stroke={c} strokeWidth="1.6" />
      <path d="M220,98 L265,58 Q295,44 330,42 L380,42 Q412,44 438,58 L475,98 Z" fill={`${c}0e`} stroke={c} strokeWidth="1.5" />
      <path d="M228,97 L270,58 Q295,45 330,43 L345,43 L345,97 Z" fill={`${c}0c`} stroke={`${c}55`} strokeWidth="0.9" />
      <path d="M467,97 L432,58 Q410,45 382,43 L345,43 L345,97 Z" fill={`${c}0c`} stroke={`${c}55`} strokeWidth="0.9" />
      <line x1="345" y1="100" x2="345" y2="220" stroke={`${c}28`} strokeWidth="0.8" />
      <line x1="455" y1="102" x2="455" y2="218" stroke={`${c}28`} strokeWidth="0.8" />
      <line x1="238" y1="100" x2="238" y2="218" stroke={`${c}28`} strokeWidth="0.8" />
      {[145, 542].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="242" r="52" fill="rgba(3,3,6,0.92)" stroke={c} strokeWidth="2" />
          <circle cx={cx} cy="242" r="34" fill="none" stroke={`${c}40`} strokeWidth="1.5" />
          <circle cx={cx} cy="242" r="18" fill={`${c}16`} stroke={`${c}65`} strokeWidth="1.2" />
          {[0,60,120,180,240,300].map(a => <line key={a} x1={cx} y1="242" x2={cx + 28*Math.cos(a*Math.PI/180)} y2={242 + 28*Math.sin(a*Math.PI/180)} stroke={`${c}45`} strokeWidth="1.2" />)}
        </g>
      ))}
      <line x1="0" y1="295" x2="700" y2="295" stroke={`${c}22`} strokeWidth="0.8" />
      <ellipse cx="145" cy="295" rx="64" ry="7" fill={`${c}1e`} />
      <ellipse cx="542" cy="295" rx="64" ry="7" fill={`${c}1e`} />
      <rect x="31" y="180" width="28" height="14" rx="3" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.9)" strokeWidth="0.6" />
      <rect x="636" y="180" width="24" height="14" rx="3" fill={`${c}bb`} stroke={c} strokeWidth="0.7" />
    </svg>
  );
}

function StretchSilhouette({ color }: { color: string }) {
  const c = color;
  return (
    <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="400" cy="252" rx="390" ry="10" fill={`${c}18`} />
      <path d="M20,210 L20,175 Q30,148 70,138 L130,118 Q165,108 200,106 L570,106 Q610,108 648,118 L710,138 Q748,148 768,172 L772,210 Z" fill={`${c}10`} stroke={c} strokeWidth="1.4" />
      <path d="M205,106 L240,72 Q262,58 285,56 L335,56 Q358,58 375,68 L400,106 Z" fill={`${c}0c`} stroke={c} strokeWidth="1.3" />
      <line x1="310" y1="108" x2="310" y2="190" stroke={`${c}25`} strokeWidth="0.8" />
      <line x1="400" y1="108" x2="400" y2="188" stroke={`${c}25`} strokeWidth="0.8" />
      <line x1="490" y1="108" x2="490" y2="188" stroke={`${c}25`} strokeWidth="0.8" />
      {[110, 660].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="215" r="44" fill="rgba(3,3,6,0.92)" stroke={c} strokeWidth="1.8" />
          <circle cx={cx} cy="215" r="28" fill="none" stroke={`${c}40`} strokeWidth="1.4" />
          {[0,60,120,180,240,300].map(a => <line key={a} x1={cx} y1="215" x2={cx+22*Math.cos(a*Math.PI/180)} y2={215+22*Math.sin(a*Math.PI/180)} stroke={`${c}45`} strokeWidth="1" />)}
        </g>
      ))}
      <line x1="0" y1="258" x2="800" y2="258" stroke={`${c}20`} strokeWidth="0.8" />
      <ellipse cx="110" cy="258" rx="56" ry="6" fill={`${c}1c`} />
      <ellipse cx="660" cy="258" rx="56" ry="6" fill={`${c}1c`} />
      <rect x="21" y="160" width="24" height="12" rx="3" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.9)" strokeWidth="0.6" />
      <rect x="742" y="160" width="22" height="12" rx="3" fill={`${c}bb`} stroke={c} strokeWidth="0.6" />
    </svg>
  );
}

interface Props {
  slides?: SlideData[];
}

export default function HeroBanner({ slides: slidesProp }: Props) {
  // Merge incoming slide data (from JSON) with defaults
  const slides = DEFAULT_SLIDES.map((def) => {
    const override = slidesProp?.find((s) => s.id === def.id);
    if (!override) return def;
    return {
      ...def,
      eyebrow: override.eyebrow || def.eyebrow,
      heading: override.heading || def.heading,
      headingAccent: override.headingAccent || def.headingAccent,
      body: override.body || def.body,
      image: override.image || "",
      accentColor: override.accentColor || def.accentColor,
      ctaSecondaryLabel: override.ctaSecondaryLabel || def.ctaSecondaryLabel,
      ctaSecondaryHref: override.ctaSecondaryHref || def.ctaSecondaryHref,
      carType: override.carType || def.carType,
    };
  });

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => { setCurrent(index); setProgress(0); }, []);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length]);

  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    progressTimer.current = setInterval(() => {
      const p = Math.min(((Date.now() - start) / SLIDE_DURATION) * 100, 100);
      setProgress(p);
      if (p >= 100) { clearInterval(progressTimer.current!); next(); }
    }, 40);
    return () => { if (progressTimer.current) clearInterval(progressTimer.current); };
  }, [current, paused, next]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const slide = slides[current];

  // Determine background: real image with overlay, or CSS gradient fallback
  const bgStyle = slide.image
    ? {
        backgroundImage: `linear-gradient(rgba(3,3,4,0.70) 0%, rgba(7,7,14,0.62) 60%, rgba(3,3,4,0.75) 100%), url('${slide.image}')`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
        backgroundRepeat: "no-repeat" as const,
      }
    : { background: GRADIENT_BG[slide.id] || GRADIENT_BG[1] };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? next() : prev(); }}
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* Background with Ken Burns effect */}
          <motion.div
            className="absolute inset-0"
            style={bgStyle}
            initial={{ scale: 1.0 }}
            animate={{ scale: slide.image ? 1.04 : 1.07 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 2, ease: "linear" }}
          />
          {/* Hex grid overlay */}
          <div className="absolute inset-0 opacity-[0.14] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 2 L52 16 L52 44 L28 58 L4 44 L4 16 Z' fill='none' stroke='rgba(255%2C255%2C255%2C0.06)' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "56px 56px" }} />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Car silhouette (only when no real image) */}
      {!slide.image && (
        <div className="absolute right-[-3%] md:right-[2%] bottom-0 w-[60%] md:w-[52%] max-w-[720px] opacity-[0.14] md:opacity-[0.18] pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div key={`car-${slide.id}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.9, delay: 0.3 }}>
              {slide.carType === "stretch" ? <StretchSilhouette color={slide.accentColor} /> : <SedanSilhouette color={slide.accentColor} />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen pt-24 pb-24">
        <div className="max-w-[680px]">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {/* Eyebrow */}
              <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
                <span className="w-8 h-px" style={{ background: slide.accentColor }} />
                <span className="text-[0.6rem] font-medium tracking-[0.28em] uppercase" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", color: slide.accentColor }}>
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 className="leading-[0.93] mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(3.2rem, 8vw, 6.8rem)" }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <span className="text-white font-semibold">{slide.heading}</span>
                <br />
                <span className="italic font-light" style={{ background: `linear-gradient(135deg, ${slide.accentColor} 0%, ${slide.accentColor}dd 40%, #f0f0f0 55%, ${slide.accentColor}dd 70%, ${slide.accentColor} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {slide.headingAccent}
                </span>
              </motion.h1>

              {/* Separator */}
              <motion.div className="flex items-center gap-2.5 mb-6" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 0.85 }} style={{ originX: 0 }}>
                <span className="w-14 h-px" style={{ background: `linear-gradient(90deg, ${slide.accentColor}, transparent)` }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: slide.accentColor }} />
                <span className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${slide.accentColor}70, transparent)` }} />
              </motion.div>

              {/* Body */}
              <motion.p className="text-[1rem] text-gray-300 max-w-[500px] mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}>
                {slide.body}
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.15 }}>
                <a href="tel:+15105068201" className="btn-luxury btn-crimson px-7 py-4 text-[0.7rem] tracking-[0.14em] rounded-sm flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center pulse-crimson group-hover:bg-white/20 transition-colors">
                    <Phone size={13} strokeWidth={2.2} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[0.5rem] text-white/55 tracking-widest uppercase">Call 24/7</span>
                    <span className="font-semibold">(510) 506-8201</span>
                  </div>
                </a>
                <Link href={slide.ctaSecondaryHref} className="btn-luxury btn-outline-gold px-7 py-4 text-[0.7rem] tracking-[0.14em] rounded-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[rgba(212,168,92,0.3)] flex items-center justify-center">
                    <MessageCircle size={13} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[0.5rem] text-[rgba(212,168,92,0.55)] tracking-widest uppercase">Learn More</span>
                    <span className="font-medium">{slide.ctaSecondaryLabel}</span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Vertical slide counter */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
            <span className="block transition-all duration-400 rounded-px" style={{ width: i === current ? "2px" : "1px", height: i === current ? "32px" : "18px", background: i === current ? slide.accentColor : "rgba(255,255,255,0.22)", display: "block" }} />
          </button>
        ))}
        <span className="text-[0.62rem] tracking-[0.2em] mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", color: "rgba(255,255,255,0.28)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress bars */}
        <div className="flex gap-1 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }} aria-label={`Slide ${i + 1}`}>
              <motion.div className="h-full rounded-full" style={{ background: i < current ? "rgba(255,255,255,0.4)" : i === current ? slide.accentColor : "transparent" }} initial={{ width: i < current ? "100%" : "0%" }} animate={{ width: i < current ? "100%" : i === current ? `${progress}%` : "0%" }} transition={{ duration: 0 }} />
            </button>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 flex items-center justify-between">
          <p className="hidden sm:block text-[0.58rem] tracking-[0.25em] uppercase text-white/28" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Available 24/7 · Los Angeles &amp; Southern California
          </p>
          <div className="flex items-center gap-3 ml-auto">
            {[{ fn: prev, label: "Previous", Icon: ChevronLeft }, { fn: next, label: "Next", Icon: ChevronRight }].map(({ fn, label, Icon }) => (
              <button key={label} onClick={fn} className="w-11 h-11 rounded-sm flex items-center justify-center text-white/45 hover:text-white transition-all duration-200" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} aria-label={label}>
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
