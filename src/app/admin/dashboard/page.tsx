"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Wrench, Car, Inbox, CheckCircle, Clock, Phone } from "lucide-react";
import Link from "next/link";

interface Stats { services: number; fleet: number; inquiries: number; newInquiries: number; }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, fleet: 0, inquiries: 0, newInquiries: 0 });
  const [inquiries, setInquiries] = useState<Array<{
    id: string; name: string; phone: string; service?: string;
    status: string; createdAt: string;
  }>>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then(r => r.json()),
      fetch("/api/fleet").then(r => r.json()),
      fetch("/api/inquiries").then(r => r.json()),
    ]).then(([svc, fleet, inq]) => {
      const inqList = inq.inquiries || [];
      setStats({
        services: (svc.services || []).length,
        fleet: (fleet.vehicles || []).length,
        inquiries: inqList.length,
        newInquiries: inqList.filter((i: { status: string }) => i.status === "new").length,
      });
      setInquiries(inqList.slice(0, 5));
    });
  }, []);

  const statCards = [
    { label: "Services", value: stats.services, icon: Wrench, href: "/admin/services", color: "#c41e3a" },
    { label: "Fleet Vehicles", value: stats.fleet, icon: Car, href: "/admin/fleet", color: "#d4a85c" },
    { label: "Total Inquiries", value: stats.inquiries, icon: Inbox, href: "/admin/inquiries", color: "#4a70c0" },
    { label: "New Inquiries", value: stats.newInquiries, icon: Phone, href: "/admin/inquiries", color: "#22c55e" },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Dashboard</h1>
          <p className="text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Welcome back to JMC Limo admin panel.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map(({ label, value, icon: Icon, href, color }) => (
            <Link key={label} href={href}
              className="p-6 rounded-sm relative overflow-hidden group transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-gray-500 mb-2" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{label}</p>
                  <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", color }}>{value}</p>
                </div>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent inquiries */}
        <div className="rounded-sm overflow-hidden" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <h2 className="font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-[0.72rem] text-[#d4a85c] hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              View All →
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              No inquiries yet. Contact form submissions will appear here.
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {inquiries.map((inq) => (
                <div key={inq.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.2)" }}>
                      <span className="text-[0.8rem] text-[#d4a85c]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                        {inq.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-[0.88rem] font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{inq.name}</p>
                      <p className="text-gray-500 text-[0.75rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{inq.phone} {inq.service ? `· ${inq.service}` : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {inq.status === "new" ? (
                      <span className="flex items-center gap-1 text-[0.65rem] px-2 py-0.5 rounded-sm" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.3)", color: "#c41e3a" }}>
                        <Clock size={10} /> New
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[0.65rem] px-2 py-0.5 rounded-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" }}>
                        <CheckCircle size={10} /> Read
                      </span>
                    )}
                    <span className="text-gray-600 text-[0.72rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
