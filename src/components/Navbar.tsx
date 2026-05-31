"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown, Plane, Briefcase, Heart, Sparkles, Map, Clock } from "lucide-react";
import Logo from "./Logo";

const serviceLinks = [
  { label: "Airport Transfers", href: "/services/airport-transfers", icon: Plane, desc: "SFO, OAK, SJC" },
  { label: "Corporate Travel", href: "/services/corporate-travel", icon: Briefcase, desc: "Executive & business class" },
  { label: "Wedding Limo", href: "/services/wedding-limo", icon: Heart, desc: "Your perfect day" },
  { label: "Special Events", href: "/services/special-events", icon: Sparkles, desc: "Galas, proms, concerts" },
  { label: "City Tours", href: "/services/city-tours", icon: Map, desc: "VIP Bay Area experiences" },
  { label: "Hourly Charter", href: "/services/hourly-charter", icon: Clock, desc: "Flexible as-directed" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const scrolled_or_not_home = scrolled || pathname !== "/";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled_or_not_home ? "rgba(5,5,10,0.97)" : "transparent",
          borderBottom: scrolled_or_not_home ? "1px solid rgba(196,30,58,0.16)" : "1px solid transparent",
          backdropFilter: scrolled_or_not_home ? "blur(14px)" : "none",
          boxShadow: scrolled_or_not_home ? "0 4px 30px rgba(0,0,0,0.6)" : "none",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[84px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <div key={link.label} className="relative" ref={link.dropdown ? dropdownRef : undefined}>
                  {link.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors duration-200 relative group ${
                          isActive(link.href) ? "text-[#d4a85c]" : "text-gray-400 hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={12} strokeWidth={2} />
                        </motion.span>
                        <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#c41e3a] to-[#d4a85c] transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px] rounded-sm overflow-hidden"
                            style={{
                              background: "rgba(7,7,14,0.98)",
                              border: "1px solid rgba(196,30,58,0.2)",
                              backdropFilter: "blur(20px)",
                              boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(196,30,58,0.08)",
                            }}
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {/* Top gold bar */}
                            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.6), transparent)" }} />

                            <div className="p-3 grid grid-cols-2 gap-1">
                              {serviceLinks.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                  <Link
                                    key={svc.href}
                                    href={svc.href}
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-sm group/item transition-all duration-200"
                                    style={{
                                      border: "1px solid transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = "rgba(196,30,58,0.08)";
                                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,30,58,0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = "transparent";
                                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                                    }}
                                  >
                                    <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.2)" }}>
                                      <Icon size={14} strokeWidth={1.6} style={{ color: "#c41e3a" }} />
                                    </div>
                                    <div>
                                      <p className="text-[0.8rem] font-medium text-white" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.label}</p>
                                      <p className="text-[0.68rem] text-gray-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.desc}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* View all services */}
                            <div className="px-4 pb-4 pt-1">
                              <Link
                                href="/services"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 text-[0.67rem] tracking-[0.18em] uppercase btn-luxury btn-crimson rounded-sm"
                              >
                                View All Services
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors duration-200 relative group ${
                        isActive(link.href) ? "text-[#d4a85c]" : "text-gray-400 hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {link.label}
                      <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#c41e3a] to-[#d4a85c] transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+15105068201"
                className="btn-luxury btn-crimson flex items-center gap-2.5 px-5 py-2.5 text-[0.68rem] tracking-[0.12em] rounded-sm"
              >
                <Phone size={13} strokeWidth={2.2} />
                <span>(510) 506-8201</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0" style={{ background: "rgba(3,3,4,0.97)", backdropFilter: "blur(16px)" }} />
            <motion.nav
              className="relative z-10 flex flex-col pt-24 pb-10 px-6 h-full overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full py-4 text-xl font-medium text-white border-b border-white/08"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif", borderBottomColor: "rgba(255,255,255,0.08)" }}
                      >
                        {link.label}
                        <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-2 space-y-1">
                              {serviceLinks.map((svc) => (
                                <Link
                                  key={svc.href}
                                  href={svc.href}
                                  className="flex items-center gap-3 py-2.5 text-gray-300 hover:text-[#d4a85c] transition-colors"
                                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c41e3a" }} />
                                  {svc.label}
                                </Link>
                              ))}
                              <Link href="/services" className="flex items-center gap-3 py-2.5 text-[#d4a85c] text-sm font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                                → View All Services
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-4 text-xl font-medium text-white hover:text-[#d4a85c] transition-colors border-b"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif", borderBottomColor: "rgba(255,255,255,0.08)" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                className="mt-8 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <a href="tel:+15105068201" className="btn-luxury btn-crimson flex items-center justify-center gap-2.5 w-full py-4 text-sm tracking-[0.12em] rounded-sm">
                  <Phone size={15} />
                  <span>(510) 506-8201</span>
                </a>
                <a
                  href="https://wa.me/15105068201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury btn-outline-gold flex items-center justify-center gap-2.5 w-full py-4 text-sm tracking-[0.12em] rounded-sm"
                >
                  WhatsApp Us
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
