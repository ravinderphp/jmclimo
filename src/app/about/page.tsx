import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABanner from "@/components/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About JMC Limo | San Francisco Bay Area Premier Luxury Chauffeur",
  description:
    "15+ years serving the San Francisco Bay Area with premium black car and chauffeur services. Learn about JMC Limo's commitment to excellence, discretion, and luxury transportation.",
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

export default function AboutPage() {
  const bgImage = getBannerImage();
  return (
    <>
      <Navbar />
      <PageHeader
        title="About"
        titleAccent="JMC Limo"
        subtitle="Founded in the San Francisco Bay Area with a singular vision: to redefine luxury ground transportation with uncompromising service, elegance, and professionalism."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        bgImage={bgImage}
      />
      <About />
      <WhyChooseUs />
      <CTABanner />
      <Footer />
    </>
  );
}
