import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import CTABanner from "@/components/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services | JMC Limo — Luxury Chauffeur Services San Francisco Bay Area",
  description:
    "Airport transfers from SFO, OAK & SJC, corporate travel, wedding limo, special events, city tours, and hourly charter. Contact JMC Limo for rates and availability.",
};

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

export default function ServicesPage() {
  const bgImage = getBannerImage();
  return (
    <>
      <Navbar />
      <PageHeader
        title="Luxury Chauffeur"
        titleAccent="Services"
        subtitle="From seamless airport transfers to unforgettable wedding transportation — every JMC Limo service is designed around your comfort, style, and schedule."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        bgImage={bgImage}
      />
      <Services />
      <CTABanner />
      <Footer />
    </>
  );
}
