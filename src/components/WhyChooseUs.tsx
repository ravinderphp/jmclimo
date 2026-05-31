"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, Plane, Lock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Professional Chauffeurs",
    description:
      "Every driver is licensed, background-checked, and trained to deliver a professional, courteous experience. Our chauffeurs are the finest in Los Angeles.",
  },
  {
    icon: Star,
    title: "Immaculate Fleet",
    description:
      "Our vehicles are meticulously detailed before every trip. From luxury sedans to stretch limousines — pristine presentation, every time.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "We are available around the clock, 365 days a year — including holidays. Early morning flights, late-night events, we are always ready.",
  },
  {
    icon: Plane,
    title: "Flight Tracking",
    description:
      "We monitor your flight in real time. Whether your flight is early, delayed, or on time — your chauffeur will be there waiting when you land.",
  },
  {
    icon: Lock,
    title: "Discretion & Privacy",
    description:
      "Trusted by executives, celebrities, and public figures. We maintain the highest standards of privacy and confidentiality for every client.",
  },
  {
    icon: CheckCircle,
    title: "On-Time Guarantee",
    description:
      "Punctuality is our promise. We arrive early so you are never late. Your time is valuable — we treat it that way.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative py-24 lg:py-36"
      style={{
        background: "linear-gradient(180deg, #030304 0%, #07070e 50%, #030304 100%)",
      }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='50' x2='50' y2='0' stroke='rgba(196%2C30%2C58%2C0.5)' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-4"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Why JMC Limo
          </motion.p>
          <motion.h2
            className="text-[clamp(2.2rem,5vw,3.6rem)] leading-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-white">The Standard of</span>
            <br />
            <span
              className="italic font-light"
              style={{
                background:
                  "linear-gradient(135deg, #c48c38, #d4a85c, #f0d8a8, #d4a85c, #c48c38)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              True Excellence
            </span>
          </motion.h2>
          <motion.span
            className="gold-separator"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="relative p-7 rounded-sm group overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,14,22,0.95) 0%, rgba(7,7,14,0.97) 100%)",
                  border: "1px solid rgba(196,30,58,0.12)",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{
                  borderColor: "rgba(196,30,58,0.38)",
                  y: -3,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gold top line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)",
                  }}
                />

                {/* Icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(196,30,58,0.14), rgba(196,30,58,0.05))",
                      border: "1px solid rgba(196,30,58,0.22)",
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.6}
                      style={{ color: "#c41e3a" }}
                    />
                  </div>
                  <h3
                    className="text-[1rem] font-semibold text-white"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {f.title}
                  </h3>
                </div>

                <p
                  className="text-[0.86rem] text-gray-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
