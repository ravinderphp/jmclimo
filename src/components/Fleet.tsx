"use client";
import { motion } from "framer-motion";
import { Users, Phone } from "lucide-react";

export interface VehicleData {
  id: string; name: string; model: string; category: string;
  capacity: string; features: string[]; image?: string;
  active?: boolean; featured?: boolean; order?: number;
}

// Fallback SVG silhouettes
function CarSilhouette({ type }: { type: string }) {
  const c = "rgba(196,30,58,0.55)";
  if (type === "Van" || type === "Coach") {
    return (
      <svg viewBox="0 0 280 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M18,86 L18,55 Q22,32 55,30 L80,22 Q105,18 140,18 L195,18 Q218,22 232,35 L248,55 L255,86 Z" fill="rgba(196,30,58,0.05)" stroke={c} strokeWidth="1.2" />
        <path d="M23,55 L90,30 L90,55 Z" fill="rgba(196,30,58,0.05)" stroke={c} strokeWidth="0.8" />
        <line x1="90" y1="22" x2="90" y2="86" stroke="rgba(196,30,58,0.18)" strokeWidth="0.7" />
        <line x1="155" y1="20" x2="155" y2="86" stroke="rgba(196,30,58,0.18)" strokeWidth="0.7" />
        {[60, 205].map(cx => (<g key={cx}><circle cx={cx} cy="90" r="22" fill="rgba(3,3,6,0.92)" stroke={c} strokeWidth="1.4" /><circle cx={cx} cy="90" r="13" fill="none" stroke="rgba(212,168,92,0.3)" strokeWidth="1.2" /></g>))}
        <line x1="0" y1="112" x2="280" y2="112" stroke="rgba(196,30,58,0.2)" strokeWidth="0.7" />
        <rect x="19" y="55" width="14" height="7" rx="1.5" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.9)" strokeWidth="0.5" />
        <rect x="245" y="55" width="10" height="7" rx="1.5" fill="rgba(196,30,58,0.7)" stroke={c} strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === "Stretch" || type === "Stretch SUV") {
    return (
      <svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M18,88 L18,68 Q24,48 58,42 L95,32 Q118,26 145,25 L220,25 Q248,27 272,38 L288,56 L295,88 Z" fill="rgba(196,30,58,0.05)" stroke={c} strokeWidth="1.2" />
        <path d="M100,25 L120,12 Q138,7 155,6 L185,6 Q200,7 212,12 L228,25 Z" fill="rgba(196,30,58,0.04)" stroke={c} strokeWidth="1.2" />
        <line x1="160" y1="25" x2="160" y2="88" stroke="rgba(196,30,58,0.16)" strokeWidth="0.7" />
        <line x1="228" y1="25" x2="228" y2="88" stroke="rgba(196,30,58,0.16)" strokeWidth="0.7" />
        {[65, 248].map(cx => (<g key={cx}><circle cx={cx} cy="94" r="24" fill="rgba(3,3,6,0.92)" stroke={c} strokeWidth="1.4" /><circle cx={cx} cy="94" r="14" fill="none" stroke="rgba(212,168,92,0.3)" strokeWidth="1.2" /></g>))}
        <rect x="19" y="62" width="14" height="8" rx="1.5" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.9)" strokeWidth="0.5" />
        <rect x="278" y="62" width="12" height="8" rx="1.5" fill="rgba(196,30,58,0.7)" stroke={c} strokeWidth="0.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 280 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M18,88 L18,70 Q25,52 55,46 L88,36 Q108,30 130,29 L168,29 Q192,31 212,40 L240,52 Q262,60 268,78 L270,88 Z" fill="rgba(196,30,58,0.05)" stroke={c} strokeWidth="1.2" />
      <path d="M96,29 L114,14 Q128,8 145,7 L165,7 Q180,8 192,14 L205,29 Z" fill="rgba(196,30,58,0.05)" stroke={c} strokeWidth="1.2" />
      {[68, 220].map(cx => (<g key={cx}><circle cx={cx} cy="93" r="23" fill="rgba(3,3,6,0.92)" stroke={c} strokeWidth="1.4" /><circle cx={cx} cy="93" r="14" fill="none" stroke="rgba(212,168,92,0.3)" strokeWidth="1.2" /><circle cx={cx} cy="93" r="6" fill="rgba(196,30,58,0.18)" stroke="rgba(212,168,92,0.45)" strokeWidth="0.8" /></g>))}
      <rect x="19" y="62" width="14" height="8" rx="1.5" fill="rgba(212,168,92,0.5)" stroke="rgba(212,168,92,0.9)" strokeWidth="0.5" />
      <rect x="257" y="62" width="12" height="8" rx="1.5" fill="rgba(196,30,58,0.7)" stroke={c} strokeWidth="0.5" />
    </svg>
  );
}

const DEFAULT_VEHICLES: VehicleData[] = [
  { id: "executive-sedan", name: "Executive Sedan", model: "Lincoln Continental / Cadillac CT6", category: "Sedan", capacity: "1–3 Passengers", features: ["Professional Chauffeur", "Climate Control", "Complimentary Water", "WiFi Available"] },
  { id: "luxury-suv", name: "Luxury SUV", model: "Cadillac Escalade", category: "SUV", capacity: "1–6 Passengers", features: ["Premium Leather Interior", "Privacy Partition", "Entertainment System", "Extra Luggage"] },
  { id: "executive-van", name: "Executive Van", model: "Mercedes-Benz Sprinter", category: "Van", capacity: "1–12 Passengers", features: ["Corporate Group Travel", "Conference Seating", "USB Charging Ports", "Climate Control"] },
  { id: "classic-stretch", name: "Classic Stretch Limo", model: "Lincoln Navigator Stretch", category: "Stretch", capacity: "2–10 Passengers", features: ["Full Bar Setup", "Mood Lighting", "Premium Sound System", "Privacy Divider"] },
  { id: "suv-stretch", name: "SUV Stretch Limo", model: "Cadillac Escalade Stretch", category: "Stretch SUV", capacity: "2–16 Passengers", features: ["VIP Lounge Interior", "Custom Lighting", "Surround Sound", "Premium Bar"] },
  { id: "mini-coach", name: "Mini Coach", model: "Executive Mini Coach", category: "Coach", capacity: "2–24 Passengers", features: ["Corporate Groups", "Reclining Seats", "PA System", "Luggage Storage"] },
];

interface Props { vehicles?: VehicleData[]; }

export default function Fleet({ vehicles: vehiclesProp }: Props) {
  const vehicles = (vehiclesProp || DEFAULT_VEHICLES).filter(v => v.active !== false);

  return (
    <section id="fleet" className="relative py-24 lg:py-36" style={{ background: "linear-gradient(180deg, #030304 0%, #07070e 50%, #030304 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            Our Fleet
          </motion.p>
          <motion.h2 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-tight mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="text-white">Premium Vehicles,</span>
            <br />
            <span className="italic font-light" style={{ background: "linear-gradient(135deg, #c48c38, #d4a85c, #f0d8a8, #d4a85c, #c48c38)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Impeccably Maintained</span>
          </motion.h2>
          <motion.span className="gold-separator" initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} />
          <motion.p className="text-gray-400 text-[0.95rem] max-w-xl mx-auto mt-5 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}>
            Every vehicle in our fleet is meticulously maintained and professionally appointed to deliver the ultimate in comfort and style.
          </motion.p>
        </div>

        {/* Vehicle grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <motion.div key={v.id} className="vehicle-card rounded-sm overflow-hidden" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              {/* Card header — real image or SVG fallback */}
              <div className="relative overflow-hidden" style={{ height: "160px", background: "linear-gradient(160deg, #14141e 0%, #0d0d16 60%, #07070e 100%)", borderBottom: "1px solid rgba(212,168,92,0.1)" }}>
                {v.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="px-4 pt-4 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[1.8rem] font-light leading-none opacity-20" style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#d4a85c" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.58rem] tracking-[0.2em] uppercase px-2 py-1 rounded-sm" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.22)", color: "#c41e3a" }}>
                        {v.category}
                      </span>
                    </div>
                    <div className="flex-1 px-1 pb-2" style={{ maxHeight: "100px" }}>
                      <CarSilhouette type={v.category} />
                    </div>
                  </div>
                )}
                {v.image && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[0.58rem] tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", background: "rgba(3,3,4,0.82)", border: "1px solid rgba(212,168,92,0.25)", color: "#d4a85c" }}>
                      {v.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-[1.1rem] font-semibold text-white mb-0.5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{v.name}</h3>
                <p className="text-[0.72rem] text-gray-500 mb-3" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{v.model}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Users size={12} style={{ color: "#d4a85c" }} />
                  <span className="text-[0.7rem] text-[#d4a85c]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{v.capacity}</span>
                </div>
                <ul className="space-y-1.5 mb-6">
                  {v.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[0.8rem] text-gray-400" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#c41e3a" }} />{f}
                    </li>
                  ))}
                </ul>
                <a href="tel:+13105550199" className="btn-luxury btn-outline-gold w-full px-4 py-3 text-[0.65rem] tracking-[0.18em] rounded-sm flex items-center justify-center gap-2">
                  <Phone size={11} strokeWidth={2} /><span>Inquire About This Vehicle</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
