"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah & Michael D.",
    title: "Wedding Clients",
    location: "Beverly Hills, CA",
    rating: 5,
    text: "JMC Limo made our wedding day absolutely perfect. The stretch limousine was immaculate, our chauffeur was impeccably dressed and attentive, and everything ran flawlessly. Our guests were so impressed. We cannot recommend them highly enough for such a special occasion.",
  },
  {
    name: "Robert K.",
    title: "Chief Executive Officer",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I use JMC Limo exclusively for all corporate travel and client entertainment. Always early, always professional, always spotless. When you need a service that reflects the caliber of your business, there is simply no better choice in Los Angeles.",
  },
  {
    name: "Jennifer T.",
    title: "Frequent Traveler",
    location: "Santa Monica, CA",
    rating: 5,
    text: "Best airport transfer experience I have ever had. They tracked my flight, met me at baggage claim with my name displayed, and had me in the car within minutes. The vehicle was pristine and the driver was a true professional. I will never use anyone else.",
  },
  {
    name: "Marcus L.",
    title: "Event Planner",
    location: "Hollywood, CA",
    rating: 5,
    text: "I have worked with JMC Limo for dozens of events and they always deliver. The communication is excellent, the vehicles are stunning, and the drivers understand the importance of discretion and punctuality. A truly world-class operation.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={13}
          strokeWidth={0}
          style={{ fill: "#d4a85c" }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <section
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #07070e 0%, #0d0d16 50%, #07070e 100%)",
      }}
    >
      {/* Faint quote mark bg */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(18rem, 35vw, 30rem)",
          color: "#c41e3a",
          lineHeight: 1,
        }}
      >
        &#8220;
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-4"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Client Testimonials
          </motion.p>
          <motion.h2
            className="text-[clamp(2.2rem,5vw,3.4rem)] leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-white">What Our Clients</span>
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
              Are Saying
            </span>
          </motion.h2>
        </div>

        {/* Testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="rounded-sm p-8 md:p-12 relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,20,30,0.98) 0%, rgba(13,13,22,0.99) 100%)",
                border: "1px solid rgba(196,30,58,0.18)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Gold top line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)",
                }}
              />

              {/* Quote icon */}
              <Quote
                size={32}
                strokeWidth={1.2}
                className="mb-6"
                style={{ color: "rgba(196,30,58,0.5)" }}
              />

              {/* Stars */}
              <div className="mb-5">
                <StarRating count={reviews[active].rating} />
              </div>

              {/* Review text */}
              <blockquote
                className="text-[1.05rem] md:text-[1.15rem] text-gray-200 leading-relaxed mb-8 italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                &ldquo;{reviews[active].text}&rdquo;
              </blockquote>

              {/* Reviewer info */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(196,30,58,0.2), rgba(196,30,58,0.08))",
                    border: "1px solid rgba(196,30,58,0.3)",
                  }}
                >
                  <span
                    className="text-[0.9rem] font-semibold text-[#d4a85c]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {reviews[active].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-[0.95rem]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {reviews[active].name}
                  </p>
                  <p
                    className="text-[0.72rem] text-gray-500"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {reviews[active].title} &bull; {reviews[active].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === active
                        ? "#c41e3a"
                        : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
