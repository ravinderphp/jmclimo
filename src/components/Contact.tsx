"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, MapPin, ChevronRight, CheckCircle } from "lucide-react";

const services = [
  "Airport Transfer",
  "Corporate Travel",
  "Wedding Transportation",
  "Special Event",
  "City Tour",
  "Hourly Charter",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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

          {/* Right — Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="p-8 md:p-10 rounded-sm relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,20,30,0.97), rgba(13,13,22,0.99))",
                border: "1px solid rgba(196,30,58,0.18)",
              }}
            >
              {/* Gold top line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)",
                }}
              />

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(196,30,58,0.12)",
                      border: "1px solid rgba(196,30,58,0.3)",
                    }}
                  >
                    <CheckCircle size={28} style={{ color: "#c41e3a" }} />
                  </div>
                  <h3
                    className="text-2xl font-semibold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Message Received
                  </h3>
                  <p
                    className="text-gray-400 text-[0.9rem] max-w-sm"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    Thank you for contacting JMC Limo. A member of our team will
                    reach out to you shortly. For immediate assistance, please call
                    us at (510) 506-8201.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="text-xl font-semibold text-white mb-6"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="luxury-input rounded-sm"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="(xxx) xxx-xxxx"
                        className="luxury-input rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="luxury-input rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="luxury-input rounded-sm"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="" style={{ background: "#0d0d16" }}>
                          Select a service
                        </option>
                        {services.map((s) => (
                          <option key={s} value={s} style={{ background: "#0d0d16" }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        Date Needed
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="luxury-input rounded-sm"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Pickup location, destination, number of passengers, special requests..."
                      className="luxury-input rounded-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-luxury btn-crimson w-full py-4 text-[0.72rem] tracking-[0.18em] rounded-sm mt-2"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p
                    className="text-center text-gray-600 text-[0.72rem]"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    Or call us directly at{" "}
                    <a
                      href="tel:+15105068201"
                      className="text-[#d4a85c] hover:text-white transition-colors"
                    >
                      (510) 506-8201
                    </a>{" "}
                    for immediate assistance
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
