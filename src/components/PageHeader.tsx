"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string }

interface Props {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  accentColor?: string;
  bgImage?: string;
}

export default function PageHeader({
  title,
  titleAccent,
  subtitle,
  breadcrumbs = [],
  accentColor = "#c41e3a",
  bgImage,
}: Props) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* ── Background ── */}
      {bgImage ? (
        <>
          {/* Real photo with Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 8, ease: "linear" }}
          />
          {/* Multi-layer dark overlay — keeps text readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgba(3,3,4,0.82) 0%, rgba(5,5,10,0.74) 40%, rgba(13,13,22,0.88) 80%, #0d0d16 100%)",
            }}
          />
          {/* Subtle vignette on sides */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 100%)",
            }}
          />
        </>
      ) : (
        <>
          {/* Gradient fallback */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #030304 0%, #07070e 60%, #0d0d16 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 20% 60%, ${accentColor}18 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(138,78,0,0.07) 0%, transparent 50%)`,
            }}
          />
        </>
      )}

      {/* Hex grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgImage ? 0.06 : 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 2 L47 14.5 L47 39.5 L25 52 L3 39.5 L3 14.5 Z' fill='none' stroke='rgba(255%2C255%2C255%2C0.12)' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.28)" }} />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[0.68rem] tracking-[0.12em] uppercase text-gray-400 hover:text-[#d4a85c] transition-colors"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-[0.68rem] tracking-[0.12em] uppercase text-[#d4a85c]"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          className="leading-tight mb-4"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
            textShadow: bgImage ? "0 2px 20px rgba(0,0,0,0.6)" : "none",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white font-semibold">{title}</span>
          {titleAccent && (
            <>
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
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        {/* Separator */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          style={{ originX: 0 }}
        >
          <span
            className="w-14 h-px"
            style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
          />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          <span
            className="w-8 h-px"
            style={{ background: `linear-gradient(90deg, ${accentColor}70, transparent)` }}
          />
        </motion.div>

        {subtitle && (
          <motion.p
            className="text-gray-300 text-[0.95rem] max-w-xl leading-relaxed"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              textShadow: bgImage ? "0 1px 8px rgba(0,0,0,0.5)" : "none",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0d0d16)" }}
      />
    </section>
  );
}
