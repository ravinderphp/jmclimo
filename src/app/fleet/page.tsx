import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Fleet from "@/components/Fleet";
import CTABanner from "@/components/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Fleet | JMC Limo — Premium Luxury Vehicles Los Angeles",
  description:
    "Executive sedans, luxury SUVs, stretch limousines, and mini coaches. Explore the JMC Limo fleet — immaculate, modern, and professionally appointed.",
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

export default function FleetPage() {
  const bgImage = getBannerImage();
  return (
    <>
      <Navbar />
      <PageHeader
        title="Premium Vehicle"
        titleAccent="Fleet"
        subtitle="Each vehicle in our fleet is meticulously maintained, professionally detailed, and appointed with premium amenities to ensure an extraordinary journey."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fleet" }]}
        bgImage={bgImage}
      />
      <Fleet />
      <CTABanner />
      <Footer />
    </>
  );
}
