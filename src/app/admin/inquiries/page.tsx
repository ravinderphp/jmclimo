"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Trash2, CheckCircle, Clock, Eye, X } from "lucide-react";

interface Inquiry {
  id: string; name: string; email?: string; phone: string;
  service?: string; date?: string; message?: string;
  status: "new" | "read"; createdAt: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const load = () => fetch("/api/inquiries").then(r => r.json()).then(d => setInquiries(d.inquiries || []));
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "read" }) });
    await load();
    setSelected(s => s && s.id === id ? { ...s, status: "read" } : s);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    await load();
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Inquiries</h1>
          <p className="text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Contact form submissions — {inquiries.filter(i => i.status === "new").length} new
          </p>
        </div>

        <div className="rounded-sm overflow-hidden" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {inquiries.length === 0 ? (
            <div className="py-16 text-center text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              No inquiries yet. Contact form submissions will appear here.
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {inquiries.map((inq) => (
                <div key={inq.id} className={`px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${inq.status === "new" ? "border-l-2" : ""}`} style={{ borderLeftColor: inq.status === "new" ? "#c41e3a" : "transparent" }}>
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.22)" }}>
                      <span className="text-[0.88rem] text-[#d4a85c]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                        {inq.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-[0.88rem] font-medium truncate" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{inq.name}</p>
                        {inq.status === "new" && (
                          <span className="text-[0.6rem] px-1.5 py-0.5 rounded-sm flex-shrink-0" style={{ background: "rgba(196,30,58,0.15)", color: "#c41e3a", border: "1px solid rgba(196,30,58,0.25)" }}>NEW</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-[0.75rem] truncate" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                        {inq.phone}{inq.service ? ` · ${inq.service}` : ""}{inq.message ? ` · "${inq.message.substring(0, 50)}..."` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className="text-gray-600 text-[0.72rem] mr-2 hidden sm:block" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                    <button onClick={() => { setSelected(inq); if (inq.status === "new") markRead(inq.id); }} className="w-8 h-8 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <Eye size={13} />
                    </button>
                    {inq.status === "new" && (
                      <button onClick={() => markRead(inq.id)} className="w-8 h-8 rounded-sm flex items-center justify-center text-gray-400 hover:text-green-400 transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <CheckCircle size={13} />
                      </button>
                    )}
                    <button onClick={() => del(inq.id)} className="w-8 h-8 rounded-sm flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-md rounded-sm relative" style={{ background: "rgba(14,14,22,0.99)", border: "1px solid rgba(196,30,58,0.22)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)" }} />
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Inquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Name", value: selected.name },
                { label: "Phone", value: selected.phone },
                { label: "Email", value: selected.email || "—" },
                { label: "Service", value: selected.service || "—" },
                { label: "Date Needed", value: selected.date || "—" },
                { label: "Received", value: new Date(selected.createdAt).toLocaleString() },
              ].map(f => (
                <div key={f.label} className="flex items-start gap-4">
                  <span className="text-[0.65rem] tracking-[0.16em] uppercase text-gray-500 w-28 flex-shrink-0 pt-0.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{f.label}</span>
                  <span className="text-white text-[0.88rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{f.value}</span>
                </div>
              ))}
              {selected.message && (
                <div>
                  <span className="block text-[0.65rem] tracking-[0.16em] uppercase text-gray-500 mb-2" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Message</span>
                  <p className="text-gray-300 text-[0.88rem] leading-relaxed p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {selected.message}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between p-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <a href={`tel:${selected.phone}`} className="btn-luxury btn-crimson flex items-center gap-2 px-5 py-2.5 text-[0.7rem] tracking-[0.12em] rounded-sm">
                Call Client
              </a>
              <button onClick={() => { del(selected.id); setSelected(null); }} className="btn-luxury btn-outline-gold px-5 py-2.5 text-[0.7rem] tracking-[0.12em] rounded-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
