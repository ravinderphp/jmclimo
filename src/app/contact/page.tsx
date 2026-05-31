import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact JMC Limo | Request Rates & Availability",
  description:
    "Contact JMC Limo for rates, availability, and reservations. Call (510) 506-8201, WhatsApp us, or use our contact form. Available 24/7 in the San Francisco Bay Area.",
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

export default function ContactPage() {
  const bgImage = getBannerImage();
  return (
    <>
      <Navbar />
      <PageHeader
        title="Contact"
        titleAccent="JMC Limo"
        subtitle="Reach us directly for personalized rates, availability, and to reserve your luxury chauffeur experience. We respond promptly — 24 hours a day, 7 days a week."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        bgImage={bgImage}
      />
      <Contact />
      <Footer />
    </>
  );
}
