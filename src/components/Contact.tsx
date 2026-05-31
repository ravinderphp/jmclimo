"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, MapPin, ChevronRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-36"
      style={{
        background:
          "linear-gradient(180deg, #030304 0%, #07070e 40%, #0d0d16 70%, #07070e 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute left-0 bottom-0 w-1/2 h-1/2 pointer-events-none opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(196,30,58,1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-4"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="text-[clamp(2.2rem,5vw,3.6rem)] leading-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-white">Reserve Your</span>
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
              Luxury Experience
            </span>
          </motion.h2>
          <motion.span
            className="gold-separator"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
          <motion.p
            className="text-gray-400 text-[0.95rem] max-w-lg mx-auto mt-5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Contact us directly for personalized service, fare information, and
            availability. We respond promptly — 24 hours a day.
          </motion.p>
        </div>

        {/* Contact cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Phone */}
          <div
            className="p-6 rounded-sm relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,30,0.96), rgba(13,13,22,0.98))",
              border: "1px solid rgba(196,30,58,0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,168,92,0.4), transparent)",
              }}
            />
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(196,30,58,0.12)",
                  border: "1px solid rgba(196,30,58,0.25)",
                }}
              >
                <Phone size={17} strokeWidth={1.6} style={{ color: "#c41e3a" }} />
              </div>
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.2em] uppercase text-[#d4a85c] mb-1"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Call Us 24/7
                </p>
                <a
                  href="tel:+15105068201"
                  className="text-white text-lg font-semibold hover:text-[#d4a85c] transition-colors block"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  (510) 506-8201
                </a>
                <p
                  className="text-gray-500 text-[0.78rem] mt-0.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Available around the clock
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div
            className="p-6 rounded-sm relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,30,0.96), rgba(13,13,22,0.98))",
              border: "1px solid rgba(196,30,58,0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,168,92,0.4), transparent)",
              }}
            />
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(196,30,58,0.12)",
                  border: "1px solid rgba(196,30,58,0.25)",
                }}
              >
                <MessageCircle size={17} strokeWidth={1.6} style={{ color: "#c41e3a" }} />
              </div>
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.2em] uppercase text-[#d4a85c] mb-1"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/15105068201?text=Hello%20JMC%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-semibold hover:text-[#d4a85c] transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Message Us Now
                  <ChevronRight size={16} />
                </a>
                <p
                  className="text-gray-500 text-[0.78rem] mt-0.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Quick response guaranteed
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="p-6 rounded-sm relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,30,0.96), rgba(13,13,22,0.98))",
              border: "1px solid rgba(196,30,58,0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,168,92,0.4), transparent)",
              }}
            />
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(196,30,58,0.12)",
                  border: "1px solid rgba(196,30,58,0.25)",
                }}
              >
                <Mail size={17} strokeWidth={1.6} style={{ color: "#c41e3a" }} />
              </div>
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.2em] uppercase text-[#d4a85c] mb-1"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Email Us
                </p>
                <a
                  href="mailto:jmclimo85@gmail.com"
                  className="text-white font-semibold hover:text-[#d4a85c] transition-colors block text-[0.95rem]"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  jmclimo85@gmail.com
                </a>
                <p
                  className="text-gray-500 text-[0.78rem] mt-0.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  We reply within hours
                </p>
              </div>
            </div>
          </div>

          {/* Hours & area */}
          <div
            className="p-6 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,30,0.96), rgba(13,13,22,0.98))",
              border: "1px solid rgba(212,168,92,0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock size={15} style={{ color: "#d4a85c" }} />
              <p
                className="text-[0.68rem] tracking-[0.18em] uppercase text-[#d4a85c]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Hours of Service
              </p>
            </div>
            <p
              className="text-white font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              24 Hours / 7 Days a Week
            </p>
            <p
              className="text-gray-500 text-[0.8rem] mb-4"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Including all holidays
            </p>
            <div className="flex items-center gap-3">
              <MapPin size={15} style={{ color: "#d4a85c" }} />
              <p
                className="text-gray-400 text-[0.8rem]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                San Francisco Bay Area &amp; Northern California
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
