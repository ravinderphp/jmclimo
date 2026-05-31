import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "JMC Limo Admin",
  description: "Admin panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
