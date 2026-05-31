"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { num: 15, suffix: "+", label: "Years of Excellence" },
  { num: 1000, suffix: "+", label: "Happy Clients" },
  { num: 50, suffix: "+", label: "Luxury Vehicles" },
  { num: 100, suffix: "%", label: "On-Time Rate" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #07070e 0%, #0d0d16 50%, #07070e 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(196,30,58,1) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Our Story
            </p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.2rem)] leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              <span className="text-white">A Legacy of</span>
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
                Luxury &amp; Trust
              </span>
            </h2>

            <div
              className="w-12 h-px mb-7"
              style={{
                background: "linear-gradient(90deg, #c41e3a, transparent)",
              }}
            />

            <div
              className="space-y-4 text-gray-400 text-[0.92rem] leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <p>
                Founded in the San Francisco Bay Area, JMC Limo has been the trusted choice of
                executives, celebrities, and discerning travelers for over fifteen years.
                We built our reputation on a simple promise: extraordinary service,
                every single time.
              </p>
              <p>
                Our hand-selected fleet of premium black cars and luxury limousines is
                maintained to immaculate standards. Each chauffeur is professionally
                trained, background-checked, and committed to delivering a first-class
                experience from the moment they arrive.
              </p>
              <p>
                Whether you need a seamless airport transfer from SFO, OAK, or SJC, a discreet corporate
                driver, or a memorable vehicle for your wedding day — JMC Limo
                delivers the level of sophistication that defines truly exceptional
                transportation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-luxury btn-crimson px-7 py-3.5 text-[0.68rem] tracking-[0.14em] rounded-sm"
              >
                Contact Us Today
              </a>
              <a
                href="tel:+15105068201"
                className="btn-luxury btn-outline-gold px-7 py-3.5 text-[0.68rem] tracking-[0.14em] rounded-sm"
              >
                (510) 506-8201
              </a>
            </div>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            className="grid grid-cols-2 gap-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="relative p-7 rounded-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,20,30,0.96) 0%, rgba(13,13,22,0.98) 100%)",
                  border: "1px solid rgba(212,168,92,0.12)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(196,30,58,0.5), transparent)",
                  }}
                />
                <div
                  className="text-[2.6rem] font-semibold leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    background:
                      "linear-gradient(135deg, #c48c38, #d4a85c, #f0d8a8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <CountUp target={s.num} suffix={s.suffix} />
                </div>
                <p
                  className="text-[0.72rem] text-gray-400 leading-tight"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
