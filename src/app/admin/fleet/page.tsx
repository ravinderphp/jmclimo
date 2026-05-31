"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from "lucide-react";

interface Vehicle {
  id: string; name: string; model: string; category: string;
  capacity: string; features: string[]; image: string;
  active: boolean; featured: boolean; order: number;
}

const EMPTY: Omit<Vehicle, "id" | "order"> = {
  name: "", model: "", category: "Sedan", capacity: "1–3 Passengers",
  features: [], image: "", active: true, featured: false,
};

const CATEGORIES = ["Sedan", "SUV", "Van", "Stretch", "Stretch SUV", "Coach"];

export default function AdminFleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modal, setModal] = useState<{
    open: boolean; mode: "add" | "edit";
    data: Partial<Vehicle> & { featuresText?: string };
  }>({ open: false, mode: "add", data: { ...EMPTY, featuresText: "" } });
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/fleet").then(r => r.json()).then(d => setVehicles(d.vehicles || []));
  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...EMPTY, featuresText: "" } });
  const openEdit = (v: Vehicle) => setModal({ open: true, mode: "edit", data: { ...v, featuresText: v.features.join(", ") } });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const save = async () => {
    setSaving(true);
    const features = (modal.data.featuresText || "").split(",").map((f: string) => f.trim()).filter(Boolean);
    const payload = { ...modal.data, features };
    delete (payload as Record<string, unknown>).featuresText;
    try {
      if (modal.mode === "add") {
        await fetch("/api/fleet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await fetch(`/api/fleet/${modal.data.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      await load(); closeModal();
    } finally { setSaving(false); }
  };

  const toggleActive = async (v: Vehicle) => {
    await fetch(`/api/fleet/${v.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !v.active }) });
    await load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    await fetch(`/api/fleet/${id}`, { method: "DELETE" }); await load();
  };

  const update = (key: string, value: string | boolean) =>
    setModal(m => ({ ...m, data: { ...m.data, [key]: value } }));

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Fleet</h1>
            <p className="text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Manage vehicles — upload photos to display on the website</p>
          </div>
          <button onClick={openAdd} className="btn-luxury btn-crimson flex items-center gap-2 px-5 py-2.5 text-[0.72rem] tracking-[0.12em] rounded-sm">
            <Plus size={15} /> Add Vehicle
          </button>
        </div>

        {/* Grid view showing images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <div key={v.id} className="rounded-sm overflow-hidden group" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Image area */}
              <div className="relative h-40 overflow-hidden" style={{ background: "rgba(7,7,14,0.8)" }}>
                {v.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600 text-[0.75rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>No image</p>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(v)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(3,3,4,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Pencil size={12} style={{ color: "white" }} />
                  </button>
                  <button onClick={() => del(v.id)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(3,3,4,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Trash2 size={12} style={{ color: "#ef4444" }} />
                  </button>
                </div>
                {!v.active && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-sm" style={{ background: "rgba(100,100,100,0.8)", color: "#9ca3af", fontFamily: "var(--font-inter), Inter, sans-serif" }}>Hidden</span>
                  </div>
                )}
              </div>
              {/* Card info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white text-[0.9rem] font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{v.name}</p>
                  <span className="text-[0.62rem] px-2 py-0.5 rounded-sm flex-shrink-0" style={{ background: "rgba(212,168,92,0.1)", border: "1px solid rgba(212,168,92,0.18)", color: "#d4a85c", fontFamily: "var(--font-inter), Inter, sans-serif" }}>{v.category}</span>
                </div>
                <p className="text-gray-500 text-[0.78rem] mb-3" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{v.model} · {v.capacity}</p>
                <div className="flex items-center justify-between">
                  <button onClick={() => toggleActive(v)} className="flex items-center gap-1.5 text-[0.72rem] transition-colors" style={{ color: v.active ? "#22c55e" : "#6b7280", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {v.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    {v.active ? "Active" : "Hidden"}
                  </button>
                  <button onClick={() => openEdit(v)} className="text-[0.72rem] text-[#d4a85c] hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    Edit →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>No vehicles found.</div>
        )}
      </main>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-2xl rounded-sm relative my-auto" style={{ background: "rgba(14,14,22,0.99)", border: "1px solid rgba(196,30,58,0.25)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.5), transparent)" }} />
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {modal.mode === "add" ? "Add Vehicle" : "Edit Vehicle"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left — image */}
                <ImageUpload
                  label="Vehicle Photo"
                  hint="Recommended: 800×533px — car exterior or interior"
                  value={modal.data.image || ""}
                  height={180}
                  onChange={(url) => update("image", url)}
                />

                {/* Right — fields */}
                <div className="space-y-4">
                  {[
                    { label: "Vehicle Name *", key: "name", placeholder: "e.g. Executive Sedan" },
                    { label: "Model / Make", key: "model", placeholder: "e.g. Cadillac Escalade" },
                    { label: "Passenger Capacity", key: "capacity", placeholder: "e.g. 1–6 Passengers" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{f.label}</label>
                      <input type="text" value={(modal.data as Record<string, string | boolean>)[f.key] as string || ""} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} className="luxury-input rounded-sm" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Category</label>
                    <select value={modal.data.category || "Sedan"} onChange={e => update("category", e.target.value)} className="luxury-input rounded-sm" style={{ cursor: "pointer" }}>
                      {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#0d0d16" }}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-5">
                <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Features (comma-separated)</label>
                <input type="text" value={modal.data.featuresText || ""} onChange={e => update("featuresText", e.target.value)} placeholder="WiFi, Climate Control, USB Charging, Privacy Partition" className="luxury-input rounded-sm" />
              </div>

              <div className="flex items-center gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!modal.data.active} onChange={e => update("active", e.target.checked)} className="w-4 h-4 accent-[#c41e3a]" />
                  <span className="text-[0.82rem] text-gray-300" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Active (visible on website)</span>
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
                <Save size={13} /> {saving ? "Saving..." : "Save Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
