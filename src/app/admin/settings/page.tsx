"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Save, CheckCircle } from "lucide-react";

interface Settings {
  phone: string; email: string; whatsapp: string;
  whatsappMessage: string; businessHours: string;
  serviceArea: string; address: string;
  socialLinks: { instagram: string; facebook: string; twitter: string };
  seo: { siteName: string; tagline: string };
}

const DEFAULT: Settings = {
  phone: "", email: "", whatsapp: "", whatsappMessage: "",
  businessHours: "", serviceArea: "", address: "",
  socialLinks: { instagram: "", facebook: "", twitter: "" },
  seo: { siteName: "JMC Limo", tagline: "" },
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setSettings);
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  };

  const field = (label: string, value: string, onChange: (v: string) => void, type = "text", placeholder = "") => (
    <div key={label}>
      <label className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="luxury-input rounded-sm" />
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Settings</h1>
            <p className="text-gray-500 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Manage site-wide contact information and settings</p>
          </div>
          <button onClick={save} disabled={saving} className="btn-luxury btn-crimson flex items-center gap-2 px-5 py-2.5 text-[0.72rem] tracking-[0.12em] rounded-sm">
            {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> {saving ? "Saving..." : "Save Changes"}</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="p-7 rounded-sm" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-sm" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.4), transparent)" }} />
            <h2 className="font-semibold text-white mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Contact Information</h2>
            <div className="space-y-4">
              {field("Phone Number", settings.phone, v => setSettings(s => ({ ...s, phone: v })), "tel", "(310) 555-0199")}
              {field("Email Address", settings.email, v => setSettings(s => ({ ...s, email: v })), "email", "info@jmclimo.com")}
              {field("WhatsApp Number (with +1)", settings.whatsapp, v => setSettings(s => ({ ...s, whatsapp: v })), "text", "+13105550199")}
              {field("Business Hours", settings.businessHours, v => setSettings(s => ({ ...s, businessHours: v })), "text", "24/7, 365 Days")}
              {field("Service Area", settings.serviceArea, v => setSettings(s => ({ ...s, serviceArea: v })), "text", "Los Angeles & Southern California")}
            </div>
          </div>

          {/* Social + SEO */}
          <div className="space-y-5">
            <div className="p-7 rounded-sm" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-semibold text-white mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Social Media</h2>
              <div className="space-y-4">
                {field("Instagram URL", settings.socialLinks.instagram, v => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, instagram: v } })), "url", "https://instagram.com/jmclimo")}
                {field("Facebook URL", settings.socialLinks.facebook, v => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, facebook: v } })), "url", "https://facebook.com/jmclimo")}
                {field("Twitter / X URL", settings.socialLinks.twitter, v => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, twitter: v } })), "url", "https://twitter.com/jmclimo")}
              </div>
            </div>
            <div className="p-7 rounded-sm" style={{ background: "rgba(14,14,22,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-semibold text-white mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>SEO & Branding</h2>
              <div className="space-y-4">
                {field("Site Name", settings.seo?.siteName || "", v => setSettings(s => ({ ...s, seo: { ...s.seo, siteName: v } })), "text", "JMC Limo")}
                {field("Tagline", settings.seo?.tagline || "", v => setSettings(s => ({ ...s, seo: { ...s.seo, tagline: v } })), "text", "Los Angeles Premier Luxury Chauffeur Service")}
              </div>
            </div>
          </div>
        </div>

        {/* Change Password info */}
        <div className="mt-6 p-6 rounded-sm" style={{ background: "rgba(196,30,58,0.06)", border: "1px solid rgba(196,30,58,0.18)" }}>
          <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Admin Password</h3>
          <p className="text-gray-400 text-[0.85rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            To change the admin password, update the <code className="text-[#d4a85c] bg-[rgba(212,168,92,0.1)] px-1.5 py-0.5 rounded text-[0.8rem]">ADMIN_PASSWORD</code> variable in your{" "}
            <code className="text-[#d4a85c] bg-[rgba(212,168,92,0.1)] px-1.5 py-0.5 rounded text-[0.8rem]">.env.local</code> file and restart the server.
          </p>
        </div>
      </main>
    </div>
  );
}
