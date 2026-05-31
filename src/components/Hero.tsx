"use client";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";

const stats = [
  { num: "15+", label: "Years Experience" },
  { num: "1000+", label: "Happy Clients" },
  { num: "24/7", label: "Available" },
  { num: "100%", label: "Satisfaction" },
];

export default function Hero() {
  const scrollToServices = () =>
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #030304 0%, #07070e 35%, #0d0d16 65%, #030304 100%)",
      }}
    >
      {/* Atmospheric glow layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 12% 88%, rgba(196,30,58,0.13) 0%, transparent 52%), radial-gradient(ellipse at 88% 12%, rgba(138,78,0,0.07) 0%, transparent 48%)",
        }}
      />

      {/* Hex grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='58' height='58' viewBox='0 0 58 58' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29 2 L54 16.5 L54 45.5 L29 60 L4 45.5 L4 16.5 Z' fill='none' stroke='rgba(196%2C30%2C58%2C0.14)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "58px 58px",
        }}
      />

      {/* Luxury car silhouette — right side */}
      <div className="absolute right-[-2%] bottom-0 w-[55%] max-w-[680px] h-[55%] pointer-events-none opacity-[0.18] float-anim">
        <svg viewBox="0 0 620 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main body */}
          <path
            d="M28,248 L28,198 Q42,162 88,150 L168,120 Q205,108 245,106 L340,106 Q382,108 418,120 L498,150 Q545,162 590,198 L590,248 Z"
            fill="rgba(196,30,58,0.055)"
            stroke="rgba(196,30,58,0.55)"
            strokeWidth="1.4"
          />
          {/* Roofline / cabin */}
          <path
            d="M193,106 L234,68 Q260,52 290,50 L330,50 Q358,52 380,68 L412,106 Z"
            fill="rgba(196,30,58,0.045)"
            stroke="rgba(196,30,58,0.45)"
            strokeWidth="1.4"
          />
          {/* Windshield */}
          <path
            d="M200,105 L236,68 Q260,53 290,51 L302,51 L302,105 Z"
            fill="rgba(196,30,58,0.06)"
            stroke="rgba(196,30,58,0.28)"
            strokeWidth="1"
          />
          {/* Rear window */}
          <path
            d="M405,105 L374,68 Q354,53 330,51 L302,51 L302,105 Z"
            fill="rgba(196,30,58,0.06)"
            stroke="rgba(196,30,58,0.28)"
            strokeWidth="1"
          />
          {/* Door lines */}
          <line x1="302" y1="108" x2="302" y2="205" stroke="rgba(196,30,58,0.18)" strokeWidth="0.8" />
          <line x1="400" y1="110" x2="400" y2="202" stroke="rgba(196,30,58,0.18)" strokeWidth="0.8" />
          <line x1="208" y1="108" x2="208" y2="202" stroke="rgba(196,30,58,0.18)" strokeWidth="0.8" />
          {/* Side mirror */}
          <rect x="70" y="158" width="20" height="11" rx="2" fill="rgba(10,10,20,0.9)" stroke="rgba(196,30,58,0.4)" strokeWidth="0.6" />
          {/* Front wheel */}
          <circle cx="135" cy="250" r="48" fill="rgba(3,3,6,0.85)" stroke="rgba(196,30,58,0.65)" strokeWidth="1.8" />
          <circle cx="135" cy="250" r="30" fill="none" stroke="rgba(212,168,92,0.3)" strokeWidth="1.5" />
          <circle cx="135" cy="250" r="13" fill="rgba(196,30,58,0.18)" stroke="rgba(212,168,92,0.5)" strokeWidth="1" />
          {/* Rear wheel */}
          <circle cx="474" cy="250" r="48" fill="rgba(3,3,6,0.85)" stroke="rgba(196,30,58,0.65)" strokeWidth="1.8" />
          <circle cx="474" cy="250" r="30" fill="none" stroke="rgba(212,168,92,0.3)" strokeWidth="1.5" />
          <circle cx="474" cy="250" r="13" fill="rgba(196,30,58,0.18)" stroke="rgba(212,168,92,0.5)" strokeWidth="1" />
          {/* Ground line */}
          <line x1="0" y1="298" x2="620" y2="298" stroke="rgba(196,30,58,0.22)" strokeWidth="0.8" />
          {/* Wheel glow */}
          <ellipse cx="135" cy="298" rx="56" ry="6" fill="rgba(196,30,58,0.18)" />
          <ellipse cx="474" cy="298" rx="56" ry="6" fill="rgba(196,30,58,0.18)" />
          {/* Headlight */}
          <rect x="29" y="180" width="24" height="11" rx="2.5" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.95)" strokeWidth="0.5" />
          {/* Taillight */}
          <rect x="564" y="180" width="22" height="11" rx="2.5" fill="rgba(196,30,58,0.75)" stroke="rgba(196,30,58,1)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-[680px]">
          {/* Eyebrow tag */}
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <span className="w-8 h-px" style={{ background: "#c41e3a" }} />
            <span
              className="text-[0.62rem] font-medium tracking-[0.28em] uppercase text-[#d4a85c]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              San Francisco Bay Area Premier Chauffeur Service
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.93] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white font-semibold">Arrive in</span>
            <br />
            <span
              className="italic font-light"
              style={{
                background:
                  "linear-gradient(135deg, #c48c38 0%, #d4a85c 28%, #f0d8a8 50%, #d4a85c 72%, #c48c38 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Extraordinary
            </span>
            <br />
            <span className="text-white font-semibold">Style.</span>
          </motion.h1>

          {/* Decorative separator */}
          <motion.div
            className="flex items-center gap-2.5 mb-7"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            style={{ originX: 0 }}
          >
            <span
              className="w-14 h-px"
              style={{ background: "linear-gradient(90deg, #d4a85c, transparent)" }}
            />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c41e3a" }} />
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #c41e3a, transparent)" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[1.02rem] text-gray-400 max-w-[500px] mb-11 leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
          >
            Experience the pinnacle of luxury transportation across the San Francisco Bay Area.
            Premium black car service for airport transfers, corporate travel,
            weddings, and VIP events — available around the clock.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <a
              href="tel:+15105068201"
              className="btn-luxury btn-crimson px-7 py-4 text-[0.7rem] tracking-[0.14em] rounded-sm group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors pulse-crimson mr-1">
                <Phone size={13} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[0.52rem] text-white/55 tracking-widest uppercase">
                  Call 24/7
                </span>
                <span className="font-medium">(510) 506-8201</span>
              </div>
            </a>

            <a
              href="https://wa.me/15105068201?text=Hello%20JMC%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20your%20chauffeur%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-outline-gold px-7 py-4 text-[0.7rem] tracking-[0.14em] rounded-sm"
            >
              <div className="w-8 h-8 rounded-full border border-[rgba(212,168,92,0.3)] flex items-center justify-center mr-1">
                <MessageCircle size={13} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[0.52rem] text-[rgba(212,168,92,0.55)] tracking-widest uppercase">
                  WhatsApp Us
                </span>
                <span className="font-medium">Chat Now</span>
              </div>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <span
                  className="text-xl font-semibold leading-tight"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    background:
                      "linear-gradient(135deg, #c48c38, #d4a85c, #f0d8a8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="text-[0.62rem] text-gray-500 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 hover:text-[#d4a85c] transition-colors cursor-pointer"
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span
          className="text-[0.58rem] tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
