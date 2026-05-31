import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { notFound } from "next/navigation";
import { Plane, Briefcase, Heart, Sparkles, Map, Clock, CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

function getBannerImage(): string {
  try {
    const data = JSON.parse(
      readFileSync(path.join(process.cwd(), "data", "banners.json"), "utf-8")
    );
    return data.slides?.find((s: { image: string }) => s.image)?.image || "";
  } catch {
    return "";
  }
}

const serviceData: Record<string, {
  title: string; accent: string; subtitle: string;
  description: string; longDesc: string;
  features: string[]; icon: React.ElementType; accentColor: string;
  relatedServices: string[];
}> = {
  "airport-transfers": {
    title: "Airport Transfers",
    accent: "SFO, OAK & SJC Airports",
    subtitle: "Seamless door-to-door airport service with real-time flight tracking and professional meet & greet.",
    description: "Arrive or depart in complete comfort and style. Our airport transfer service covers all major San Francisco Bay Area airports — SFO, OAK, and SJC — with professional meet & greet, real-time flight monitoring, and complimentary wait time.",
    longDesc: "Whether you are catching an early morning flight or arriving late at night, JMC Limo ensures a seamless, stress-free experience. Your chauffeur will monitor your flight in real time, adjust for delays, and be waiting for you at baggage claim — immaculately dressed, vehicle spotless and ready. Serving all Bay Area airports including San Francisco International (SFO), Oakland International (OAK), and San Jose Mineta International (SJC).",
    features: ["Real-Time Flight Tracking", "Meet & Greet at Baggage Claim", "Complimentary 60-Min Wait (Intl)", "SFO, OAK & SJC Covered", "Flight Delay Monitoring", "Luggage Assistance", "Child Seats Available", "24/7 Availability"],
    icon: Plane, accentColor: "#c41e3a",
    relatedServices: ["corporate-travel", "hourly-charter", "city-tours"],
  },
  "corporate-travel": {
    title: "Corporate Travel",
    accent: "Executive & Business Class",
    subtitle: "First-class chauffeur service for executives, client meetings, roadshows, and corporate events.",
    description: "Time is your most valuable asset. JMC Limo's corporate travel service is built for executives and business professionals who demand punctuality, discretion, and first-class presentation — every single time.",
    longDesc: "From morning airport runs to multi-stop executive roadshows, our professional chauffeurs handle every detail so you can focus on business. Our vehicles are equipped with WiFi, USB charging, and privacy partitions. Many of the Bay Area's top executives and Silicon Valley's Fortune 500 companies trust JMC Limo as their exclusive ground transportation provider.",
    features: ["Executive Sedan & SUV Fleet", "WiFi & USB Charging", "Privacy Partition Available", "Corporate Account Rates", "Roadshow & Multi-Stop Service", "Discreet Professional Chauffeurs", "Same-Day Scheduling", "24/7 Availability"],
    icon: Briefcase, accentColor: "#4a70c0",
    relatedServices: ["airport-transfers", "hourly-charter", "city-tours"],
  },
  "wedding-limo": {
    title: "Wedding Limo",
    accent: "Your Perfect Day",
    subtitle: "Elegant luxury transportation for your wedding day — every detail perfected for your most memorable moment.",
    description: "Your wedding day deserves perfection in every detail, including your transportation. JMC Limo provides elegant, flawlessly presented luxury vehicles for brides, grooms, bridal parties, and wedding guests.",
    longDesc: "From the moment your bridal party steps into our vehicles to the final farewell at the reception, our wedding specialists ensure every aspect of your transportation is seamless, luxurious, and unforgettable. We coordinate directly with your wedding planner and venue to ensure perfect timing throughout your day.",
    features: ["Bridal Party Transportation", "Ceremony & Reception Service", "Complimentary Champagne", "Red Carpet & White Gloves Available", "Coordination with Wedding Planner", "Decorations Available", "Multiple Vehicle Options", "Day-of Coordination"],
    icon: Heart, accentColor: "#d4a85c",
    relatedServices: ["special-events", "hourly-charter", "city-tours"],
  },
  "special-events": {
    title: "Special Events",
    accent: "Galas · Proms · Concerts",
    subtitle: "Arrive in style at any occasion — concerts, galas, proms, sporting events, and exclusive Bay Area events.",
    description: "Every special occasion deserves a grand arrival. Whether it is a premiere, a gala, a prom night, or a private concert — JMC Limo ensures you arrive looking your best and feeling exceptional.",
    longDesc: "The San Francisco Bay Area is a world-class destination for events. From exclusive private galas in San Francisco to prom nights across the Bay, from Oracle Park to the Chase Center — JMC Limo provides the perfect vehicle for every occasion. Our fleet includes stretch limousines and SUVs perfect for groups celebrating special milestones.",
    features: ["Stretch Limo & SUV Options", "Group Rates Available", "Red Carpet Arrivals", "Concert & Venue Drop-off", "Prom & Graduation Packages", "Birthday Party Packages", "Sporting Event Transportation", "Round-Trip Service"],
    icon: Sparkles, accentColor: "#c41e3a",
    relatedServices: ["wedding-limo", "hourly-charter", "airport-transfers"],
  },
  "city-tours": {
    title: "City Tours",
    accent: "VIP San Francisco Bay Area Experiences",
    subtitle: "Discover the San Francisco Bay Area in ultimate luxury — Golden Gate, Napa Valley, Silicon Valley, and beyond.",
    description: "Experience the San Francisco Bay Area like never before with a private, customized luxury tour. Our knowledgeable chauffeurs serve as your personal guide through the Bay Area's most iconic destinations in absolute comfort and style.",
    longDesc: "From the iconic Golden Gate Bridge to the rolling vineyards of Napa Valley, from the tech campuses of Silicon Valley to the vibrant streets of San Francisco — our VIP Bay Area tours are completely customizable to your interests and schedule. Whether you are a first-time visitor or a long-time Bay Area resident looking to experience the region in style, JMC Limo creates unforgettable journeys.",
    features: ["Fully Customizable Itineraries", "San Francisco City Tours", "Napa Valley Wine Country", "Silicon Valley Tech Campus Tours", "Muir Woods & Marin Headlands", "Shopping & Restaurant Stops", "Photography Stops", "Half-Day & Full-Day Options"],
    icon: Map, accentColor: "#9966cc",
    relatedServices: ["hourly-charter", "airport-transfers", "corporate-travel"],
  },
  "hourly-charter": {
    title: "Hourly Charter",
    accent: "Flexible As-Directed Service",
    subtitle: "Your vehicle and chauffeur, at your complete disposal — as long as you need, wherever you go.",
    description: "Maximum flexibility for complex schedules. Retain your JMC Limo chauffeur and vehicle for any duration — perfect for multi-stop itineraries, long business days, or any time you need a dedicated luxury vehicle standing by.",
    longDesc: "As-directed charter service puts you in complete control. Your chauffeur waits while you attend meetings, handles personal errands, or explores the city. With no limitations on stops or destinations, hourly charter is ideal for executives with demanding schedules, out-of-town visitors, or anyone who values total flexibility without compromising luxury.",
    features: ["No Stop Limitations", "Chauffeur On-Call Throughout", "Flexible Duration (Minimum 2 Hrs)", "Multi-Stop Itineraries", "Business Meeting Wait Time", "Shopping & Errand Assistance", "All Vehicle Classes Available", "Competitive Hourly Rates"],
    icon: Clock, accentColor: "#c48c38",
    relatedServices: ["corporate-travel", "airport-transfers", "city-tours"],
  },
};

const slugToTitle: Record<string, string> = {
  "airport-transfers": "Airport Transfers",
  "corporate-travel": "Corporate Travel",
  "wedding-limo": "Wedding Limo",
  "special-events": "Special Events",
  "city-tours": "City Tours",
  "hourly-charter": "Hourly Charter",
};

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = serviceData[slug];
  if (!svc) return {};
  return {
    title: `${svc.title} | JMC Limo San Francisco Bay Area`,
    description: svc.subtitle,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = serviceData[slug];
  if (!svc) notFound();
  const Icon = svc.icon;
  const bgImage = getBannerImage();

  return (
    <>
      <Navbar />
      <PageHeader
        title={svc.title}
        titleAccent={svc.accent}
        subtitle={svc.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: svc.title },
        ]}
        accentColor={svc.accentColor}
        bgImage={bgImage}
      />

      {/* Service detail */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #0d0d16 0%, #07070e 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="p-8 rounded-sm relative"
                style={{
                  background: "linear-gradient(135deg, rgba(20,20,30,0.97), rgba(13,13,22,0.99))",
                  border: "1px solid rgba(196,30,58,0.18)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)" }} />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-sm flex items-center justify-center" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.25)" }}>
                    <Icon size={24} strokeWidth={1.5} style={{ color: "#c41e3a" }} />
                  </div>
                  <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {svc.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-[0.95rem] leading-relaxed mb-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.description}</p>
                <p className="text-gray-400 text-[0.9rem] leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.longDesc}</p>
              </div>

              {/* Features */}
              <div
                className="p-8 rounded-sm"
                style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.97), rgba(13,13,22,0.99))", border: "1px solid rgba(212,168,92,0.12)" }}
              >
                <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>What&apos;s Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {svc.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle size={14} style={{ color: "#c41e3a", flexShrink: 0 }} />
                      <span className="text-gray-300 text-[0.88rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact CTA */}
              <div
                className="p-7 rounded-sm"
                style={{ background: "linear-gradient(135deg, rgba(196,30,58,0.12), rgba(124,0,34,0.08))", border: "1px solid rgba(196,30,58,0.25)" }}
              >
                <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Contact for Rates
                </h3>
                <p className="text-gray-400 text-[0.83rem] mb-5 leading-relaxed" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  We do not display prices online. Contact us directly for a personalized quote tailored to your needs.
                </p>
                <a href="tel:+15105068201" className="btn-luxury btn-crimson flex items-center justify-center gap-2 w-full py-3.5 text-[0.68rem] tracking-[0.14em] rounded-sm mb-3">
                  <Phone size={13} /> Call (510) 506-8201
                </a>
                <Link href="/contact" className="btn-luxury btn-outline-gold flex items-center justify-center w-full py-3.5 text-[0.68rem] tracking-[0.14em] rounded-sm">
                  Send a Message
                </Link>
              </div>

              {/* Related services */}
              <div
                className="p-6 rounded-sm"
                style={{ background: "rgba(13,13,22,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d4a85c] mb-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  Related Services
                </h4>
                <div className="space-y-2">
                  {svc.relatedServices.map((rs) => (
                    <Link
                      key={rs}
                      href={`/services/${rs}`}
                      className="flex items-center gap-2 py-2 text-gray-400 hover:text-white transition-colors text-[0.85rem]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c41e3a] flex-shrink-0" />
                      {slugToTitle[rs]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </>
  );
}
