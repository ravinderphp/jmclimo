import { readFileSync } from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import HeroBanner, { type SlideData } from "@/components/HeroBanner";
import Services, { type ServiceData } from "@/components/Services";
import Fleet, { type VehicleData } from "@/components/Fleet";
import CTABanner from "@/components/CTABanner";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Always render fresh from JSON files — reflects admin changes immediately
export const dynamic = "force-dynamic";

function readJSON<T>(filename: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), "data", filename), "utf-8"));
  } catch {
    return fallback;
  }
}

export default function Home() {
  const { slides } = readJSON<{ slides: SlideData[] }>("banners.json", { slides: [] });
  const { services } = readJSON<{ services: ServiceData[] }>("services.json", { services: [] });
  const { vehicles } = readJSON<{ vehicles: VehicleData[] }>("fleet.json", { vehicles: [] });

  return (
    <>
      <Navbar />
      <HeroBanner slides={slides} />
      <Services services={services} />
      <Fleet vehicles={vehicles} />
      <CTABanner />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
