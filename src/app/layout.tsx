import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JMC Limo | Premium Black Car & Luxury Chauffeur Service | San Francisco Bay Area",
  description:
    "JMC Limo — San Francisco Bay Area premier luxury black car and chauffeur service. Airport transfers from SFO, OAK & SJC, corporate travel, wedding limousine, and VIP transportation. Available 24/7. Contact us for rates.",
  keywords:
    "luxury limo San Francisco Bay Area, black car service Bay Area, chauffeur service San Francisco, airport transfer SFO OAK SJC, corporate transportation Silicon Valley, wedding limousine Bay Area, VIP transportation San Francisco, executive car service Oakland San Jose, JMC Limo",
  authors: [{ name: "JMC Limo" }],
  creator: "JMC Limo",
  metadataBase: new URL("https://www.jmclimo.com"),
  openGraph: {
    title: "JMC Limo | Premium Black Car & Luxury Chauffeur Service",
    description:
      "San Francisco Bay Area premier luxury black car and chauffeur service. Airport transfers from SFO, OAK & SJC, corporate travel, weddings, and VIP events. Available 24/7.",
    type: "website",
    url: "https://www.jmclimo.com",
    siteName: "JMC Limo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JMC Limo | Premium Luxury Chauffeur Service",
    description:
      "Premier black car and chauffeur service in the San Francisco Bay Area. 24/7 availability. Contact us for rates and availability.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
