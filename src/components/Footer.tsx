"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Airport Transfers", href: "/services/airport-transfers" },
  { label: "Corporate Travel", href: "/services/corporate-travel" },
  { label: "Wedding Limo", href: "/services/wedding-limo" },
  { label: "Special Events", href: "/services/special-events" },
  { label: "City Tours", href: "/services/city-tours" },
  { label: "Hourly Charter", href: "/services/hourly-charter" },
];

const serviceAreas = [
  "San Francisco",
  "Oakland",
  "San Jose",
  "Silicon Valley",
  "Walnut Creek",
  "Pleasanton",
  "Fremont",
  "Concord",
  "Antioch",
  "Napa Valley",
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: "linear-gradient(180deg, #07070e 0%, #030304 100%)",
      }}
    >
      {/* Gold top border */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,30,58,0.5), rgba(212,168,92,0.5), rgba(196,30,58,0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5">
              <Logo />
            </div>
            <p
              className="text-gray-400 text-[0.85rem] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              San Francisco Bay Area premier luxury black car and chauffeur service. Setting the
              standard for executive transportation since 2009.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Instagram",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: "X / Twitter",
                  href: "#",
                  svg: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-sm flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  aria-label={label}
                >
                  {svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <h4
              className="text-[0.65rem] tracking-[0.22em] uppercase text-[#d4a85c] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-[0.86rem] transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    <span
                      className="w-0 h-px group-hover:w-4 transition-all duration-300"
                      style={{ background: "#c41e3a" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            <h4
              className="text-[0.65rem] tracking-[0.22em] uppercase text-[#d4a85c] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((svc) => (
                <li key={svc.href}>
                  <Link
                    href={svc.href}
                    className="text-gray-400 hover:text-white text-[0.86rem] transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    <span
                      className="w-0 h-px group-hover:w-4 transition-all duration-300"
                      style={{ background: "#c41e3a" }}
                    />
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <h4
              className="text-[0.65rem] tracking-[0.22em] uppercase text-[#d4a85c] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+15105068201"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone size={14} strokeWidth={1.6} style={{ color: "#c41e3a", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "0.86rem" }}>
                  (510) 506-8201
                </span>
              </a>
              <a
                href="mailto:jmclimo85@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={14} strokeWidth={1.6} style={{ color: "#c41e3a", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "0.86rem" }}>
                  jmclimo85@gmail.com
                </span>
              </a>
              <a
                href="https://wa.me/15105068201"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={14} strokeWidth={1.6} style={{ color: "#c41e3a", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "0.86rem" }}>
                  WhatsApp
                </span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={14} strokeWidth={1.6} style={{ color: "#c41e3a", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "0.86rem" }}>
                  San Francisco Bay Area &amp; Northern California
                </span>
              </div>
            </div>

            {/* Service areas */}
            <div className="mt-6">
              <p
                className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-600 mb-3"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Service Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="text-[0.65rem] text-gray-500 px-2 py-0.5 rounded-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-gray-600 text-[0.75rem]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            &copy; {new Date().getFullYear()} JMC Limo. All rights reserved. Bay
            Area, CA.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-400 text-[0.72rem] transition-colors"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
