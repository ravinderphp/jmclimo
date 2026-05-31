"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from "lucide-react";

interface Service {
  id: string; title: string; subtitle: string; description: string;
  icon: string; image: string; active: boolean; featured: boolean; order: number;
}

const EMPTY: Omit<Service, "id" | "order"> = {
  title: "", subtitle: "", description: "", icon: "Star", image: "", active: true, featured: false,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: Partial<Service> }>({
    open: false, mode: "add", data: { ...EMPTY },
  });
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/services").then(r => r.json()).then(d => setServices(d.services || []));
  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...EMPTY } });
  const openEdit = (svc: Service) => setModal({ open: true, mode: "edit", data: { ...svc } });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const save = async () => {
    setSaving(true);
    try {
      if (modal.mode === "add") {
        await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(modal.data) });
      } else {
        await fetch(`/api/services/${modal.data.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(modal.data) });
      }
      await load(); closeModal();
    } finally { setSaving(false); }
  };

  const toggleActive = async (svc: Service) => {
    await fetch(`/api/services/${svc.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !svc.active }) });
    await load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" }); await load();
  };

  const update = (key: string, value: string | boolean) =>
    setModal(m => ({ ...m, data: { ...m.data, [key]: value } }));

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Services</h1>
            <p className="text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Manage your service offerings — upload photos for each service page</p>
          </div>
          <button onClick={openAdd} className="btn-luxury btn-crimson flex items-center gap-2 px-5 py-2.5 text-[0.72rem] tracking-[0.12em] rounded-sm">
            <Plus size={15} /> Add Service
          </button>
        </div>

        {/* Grid with image previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <div key={svc.id} className="rounded-sm overflow-hidden group" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Image area */}
              <div className="relative h-36 overflow-hidden" style={{ background: "rgba(7,7,14,0.8)" }}>
                {svc.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600 text-[0.75rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>No image</p>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(svc)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(3,3,4,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Pencil size={12} style={{ color: "white" }} />
                  </button>
                  <button onClick={() => del(svc.id)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(3,3,4,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Trash2 size={12} style={{ color: "#ef4444" }} />
                  </button>
                </div>
              </div>
              {/* Card info */}
              <div className="p-4">
                <p className="text-white text-[0.9rem] font-medium mb-0.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.title}</p>
                <p className="text-gray-500 text-[0.75rem] mb-3" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{svc.subtitle}</p>
                <div className="flex items-center justify-between">
                  <button onClick={() => toggleActive(svc)} className="flex items-center gap-1.5 text-[0.72rem] transition-colors" style={{ color: svc.active ? "#22c55e" : "#6b7280", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {svc.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    {svc.active ? "Active" : "Hidden"}
                  </button>
                  <button onClick={() => openEdit(svc)} className="text-[0.72rem] text-[#d4a85c] hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    Edit →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>No services found.</div>
        )}
      </main>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-2xl rounded-sm relative my-auto" style={{ background: "rgba(14,14,22,0.99)", border: "1px solid rgba(196,30,58,0.25)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)" }} />
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {modal.mode === "add" ? "Add Service" : "Edit Service"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left — image */}
                <ImageUpload
                  label="Service Image"
                  hint="Used on service cards and individual page — 800×500px recommended"
                  value={modal.data.image || ""}
                  height={170}
                  onChange={(url) => update("image", url)}
                />

                {/* Right — fields */}
                <div className="space-y-4">
                  {[
                    { label: "Title *", key: "title", placeholder: "e.g. Airport Transfers" },
                    { label: "Subtitle", key: "subtitle", placeholder: "e.g. LAX · BUR · LGB" },
                    { label: "Icon Name", key: "icon", placeholder: "Plane, Car, Heart, Clock..." },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{f.label}</label>
                      <input type="text" value={(modal.data as Record<string, string | boolean>)[f.key] as string || ""} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} className="luxury-input rounded-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Description</label>
                <textarea value={modal.data.description || ""} onChange={e => update("description", e.target.value)} rows={3} className="luxury-input rounded-sm resize-none" placeholder="Brief description shown on service cards and pages..." />
              </div>

              <div className="flex items-center gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!modal.data.active} onChange={e => update("active", e.target.checked)} className="w-4 h-4 accent-[#c41e3a]" />
                  <span className="text-[0.82rem] text-gray-300" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!modal.data.featured} onChange={e => update("featured", e.target.checked)} className="w-4 h-4 accent-[#d4a85c]" />
                  <span className="text-[0.82rem] text-gray-300" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Featured on Homepage</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <button onClick={closeModal} className="btn-luxury btn-outline-gold px-5 py-2.5 text-[0.7rem] tracking-[0.12em] rounded-sm">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-luxury btn-crimson flex items-center gap-2 px-5 py-2.5 text-[0.7rem] tracking-[0.12em] rounded-sm">
                <Save size={13} /> {saving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
