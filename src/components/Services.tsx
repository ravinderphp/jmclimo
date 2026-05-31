"use client";
import { motion } from "framer-motion";
import { Plane, Briefcase, Heart, Sparkles, Map, Clock, type LucideIcon } from "lucide-react";
import Link from "next/link";

export interface ServiceData {
  id: string; title: string; subtitle: string; description: string;
  icon?: string; image?: string; slug?: string;
  active?: boolean; featured?: boolean; order?: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Plane, Briefcase, Heart, Sparkles, Map, Clock,
};

const DEFAULT_SERVICES: ServiceData[] = [
  { id: "airport-transfers", slug: "airport-transfers", title: "Airport Transfers", subtitle: "LAX · BUR · LGB · SNA · ONT", description: "Seamless door-to-door airport service with real-time flight tracking, meet & greet, and complimentary wait time. Never miss a flight again.", icon: "Plane" },
  { id: "corporate-travel", slug: "corporate-travel", title: "Corporate Travel", subtitle: "Executive & Business Class", description: "First-class transportation for executives, client meetings, roadshows, and corporate events. Discreet, punctual, and professionally presented.", icon: "Briefcase" },
  { id: "wedding-limo", slug: "wedding-limo", title: "Wedding Limo", subtitle: "Your Perfect Day Deserves Perfection", description: "Make your most important day unforgettable. Elegant luxury vehicles for the bridal party, ceremony, and reception — tailored to your vision.", icon: "Heart" },
  { id: "special-events", slug: "special-events", title: "Special Events", subtitle: "Galas · Proms · Concerts · Sporting", description: "Arrive in style at any occasion. Red-carpet worthy transportation for galas, premieres, proms, concerts, and exclusive events across LA.", icon: "Sparkles" },
  { id: "city-tours", slug: "city-tours", title: "City & Leisure Tours", subtitle: "VIP Los Angeles Experiences", description: "Discover Los Angeles like never before — Beverly Hills, Hollywood, Malibu, Santa Monica, and beyond. Private guided tours in pure luxury.", icon: "Map" },
  { id: "hourly-charter", slug: "hourly-charter", title: "Hourly Charter", subtitle: "As-Directed Flexible Service", description: "Maximum flexibility for your schedule. Retain your chauffeur for multiple stops, long days, or whenever you need a dedicated luxury vehicle.", icon: "Clock" },
];

interface Props { services?: ServiceData[]; }

export default function Services({ services: servicesProp }: Props) {
  const services = (servicesProp || DEFAULT_SERVICES).filter(s => s.active !== false);

  return (
    <section id="services" className="relative py-24 lg:py-36" style={{ background: "linear-gradient(180deg, #07070e 0%, #0d0d16 50%, #07070e 100%)" }}>
      <div className="gold-line mb-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p className="text-[0.62rem] font-medium tracking-[0.3em] uppercase text-[#d4a85c] mb-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            What We Offer
          </motion.p>
          <motion.h2 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-tight mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="text-white">Tailored Luxury</span>
            <br />
            <span className="italic font-light" style={{ background: "linear-gradient(135deg, #c48c38, #d4a85c, #f0d8a8, #d4a85c, #c48c38)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Transportation
            </span>
          </motion.h2>
          <motion.span className="gold-separator" initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} />
          <motion.p className="text-gray-400 text-[0.95rem] max-w-xl mx-auto mt-5 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            Every journey with JMC Limo is crafted for distinction. From airport arrivals to intimate celebrations, we deliver an unparalleled experience.
          </motion.p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = (svc.icon && ICON_MAP[svc.icon]) || Plane;
            const href = svc.slug ? `/services/${svc.slug}` : "/services";

            return (
              <motion.div key={svc.id} className="luxury-card rounded-sm group overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.09 }}>
                {/* Service image (if uploaded) */}
                {svc.image && (
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(13,13,22,0.95) 100%)" }} />
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, rgba(196,30,58,0.15), rgba(196,30,58,0.05))", border: "1px solid rgba(196,30,58,0.25)" }}>
                    <Icon size={20} strokeWidth={1.5} style={{ color: "#c41e3a" }} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{svc.title}</h3>
                  <p className="text-[0.65rem] tracking-[0.18em] uppercase text-[#d4a85c] mb-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.subtitle}</p>
                  <p className="text-[0.88rem] text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.description}</p>

                  <Link href={href} className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-[#d4a85c] hover:text-white transition-colors group/link">
                    <span>Learn More</span>
                    <span className="w-0 h-px group-hover/link:w-8 transition-all duration-300" style={{ background: "#d4a85c" }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="gold-line mt-24" />
    </section>
  );
}
