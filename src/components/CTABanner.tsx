"use client";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3d0012 0%, #7c0022 30%, #9e0030 50%, #7c0022 70%, #3d0012 100%)",
      }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[0.6rem] font-medium tracking-[0.28em] uppercase text-white/60 mb-2"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Premium Chauffeur Service
            </p>
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Contact Us for Fare &amp; Availability
            </h2>
            <p
              className="text-white/65 text-[0.9rem] mt-3 max-w-lg"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              No online booking. No automated quotes. Just premium personal service —
              call or message us directly for immediate assistance.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <a
              href="tel:+13105550199"
              className="btn-luxury flex items-center gap-2.5 px-7 py-4 text-[0.68rem] tracking-[0.14em] rounded-sm"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#7c0022",
                border: "none",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              <Phone size={14} strokeWidth={2.2} />
              <div className="flex flex-col items-start">
                <span className="text-[0.52rem] text-[#7c0022]/60 tracking-widest uppercase">
                  Call 24/7
                </span>
                <span className="font-semibold">(310) 555-0199</span>
              </div>
            </a>

            <a
              href="https://wa.me/13105550199?text=Hello%20JMC%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20your%20chauffeur%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury flex items-center gap-2.5 px-7 py-4 text-[0.68rem] tracking-[0.14em] rounded-sm"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              <MessageCircle size={14} strokeWidth={2} />
              <div className="flex flex-col items-start">
                <span className="text-[0.52rem] text-white/60 tracking-widest uppercase">
                  WhatsApp
                </span>
                <span className="font-medium">Chat with Us</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
