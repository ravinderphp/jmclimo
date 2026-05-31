"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ImageUpload from "@/components/admin/ImageUpload";
import { ChevronDown, Save, CheckCircle, Info } from "lucide-react";

interface Slide {
  id: number;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  image: string;
  accentColor: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  carType: string;
}

const SLIDE_LABELS = ["Airport Transfers", "Corporate Travel", "Wedding / Events", "VIP / Celebrity"];
const ACCENT_OPTIONS = [
  { label: "Crimson Red", value: "#c41e3a" },
  { label: "Steel Blue", value: "#4a70c0" },
  { label: "Gold", value: "#d4a85c" },
  { label: "Purple", value: "#9966cc" },
  { label: "Emerald", value: "#059669" },
];

export default function AdminBanners() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [openSlide, setOpenSlide] = useState<number | null>(1);
  const [saving, setSaving] = useState<number | null>(null);
  const [savedSlide, setSavedSlide] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((d) => {
        setSlides(d.slides || []);
        setLoading(false);
      });
  }, []);

  const updateSlide = (id: number, key: string, value: string) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  const saveSlide = async (slide: Slide) => {
    setSaving(slide.id);
    try {
      await fetch(`/api/banners/${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      setSavedSlide(slide.id);
      setTimeout(() => setSavedSlide(null), 2500);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
        <AdminSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#c41e3a] border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#030304", color: "#f0f0f8" }}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold text-white mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Hero Banners
          </h1>
          <p
            className="text-gray-500 text-[0.85rem]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Upload real car images and edit text for each homepage slider slide.
          </p>
        </div>

        {/* Info tip */}
        <div
          className="flex items-start gap-3 p-4 rounded-sm mb-7"
          style={{
            background: "rgba(212,168,92,0.06)",
            border: "1px solid rgba(212,168,92,0.18)",
          }}
        >
          <Info size={15} style={{ color: "#d4a85c", flexShrink: 0, marginTop: "1px" }} />
          <p
            className="text-[0.82rem] text-gray-400 leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Upload high-quality car photos (1920×1080px recommended). A dark overlay is automatically applied for text readability.
            If no image is uploaded, a premium cinematic gradient is used instead.
          </p>
        </div>

        {/* Slide cards */}
        <div className="space-y-4">
          {slides.map((slide, i) => {
            const isOpen = openSlide === slide.id;
            const isSaving = saving === slide.id;
            const isSaved = savedSlide === slide.id;

            return (
              <div
                key={slide.id}
                className="rounded-sm overflow-hidden"
                style={{
                  background: "rgba(14,14,22,0.96)",
                  border: `1px solid ${isOpen ? "rgba(196,30,58,0.3)" : "rgba(255,255,255,0.07)"}`,
                  transition: "border-color 0.2s",
                }}
              >
                {/* Accordion header */}
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenSlide(isOpen ? null : slide.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Slide number */}
                    <span
                      className="w-8 h-8 rounded-sm flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0"
                      style={{
                        background: "rgba(196,30,58,0.12)",
                        border: "1px solid rgba(196,30,58,0.25)",
                        color: "#c41e3a",
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p
                        className="text-white text-[0.9rem] font-medium"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        Slide {i + 1} — {SLIDE_LABELS[i]}
                      </p>
                      <p
                        className="text-gray-500 text-[0.75rem]"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {slide.heading} {slide.headingAccent}
                        {slide.image ? (
                          <span className="ml-2 text-[#22c55e]">● Image uploaded</span>
                        ) : (
                          <span className="ml-2 text-gray-600">○ Using gradient</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                {/* Accordion body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-6 pt-2"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left — image */}
                          <div>
                            <ImageUpload
                              label="Slide Background Image"
                              hint="Recommended: 1920×1080px JPEG — max 8MB"
                              value={slide.image}
                              height={200}
                              onChange={(url) => updateSlide(slide.id, "image", url)}
                            />
                            {/* Accent color */}
                            <div className="mt-4">
                              <label
                                className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-2"
                                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                              >
                                Accent Color
                              </label>
                              <div className="flex items-center gap-2 flex-wrap">
                                {ACCENT_OPTIONS.map((opt) => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => updateSlide(slide.id, "accentColor", opt.value)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.68rem] transition-all duration-200"
                                    style={{
                                      fontFamily: "var(--font-inter), Inter, sans-serif",
                                      background:
                                        slide.accentColor === opt.value
                                          ? `${opt.value}22`
                                          : "rgba(255,255,255,0.04)",
                                      border: `1px solid ${
                                        slide.accentColor === opt.value
                                          ? opt.value
                                          : "rgba(255,255,255,0.08)"
                                      }`,
                                      color:
                                        slide.accentColor === opt.value ? opt.value : "#6b7280",
                                    }}
                                  >
                                    <span
                                      className="w-3 h-3 rounded-full"
                                      style={{ background: opt.value }}
                                    />
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right — text fields */}
                          <div className="space-y-4">
                            {[
                              { label: "Eyebrow Text", key: "eyebrow", placeholder: "e.g. Los Angeles Premier Chauffeur Service" },
                              { label: "Heading (Line 1)", key: "heading", placeholder: "e.g. The Art of" },
                              { label: "Heading Accent (italic gold line)", key: "headingAccent", placeholder: "e.g. Arrival." },
                              { label: "CTA Secondary Label", key: "ctaSecondaryLabel", placeholder: "e.g. Airport Transfers" },
                              { label: "CTA Secondary Link", key: "ctaSecondaryHref", placeholder: "e.g. /services/airport-transfers" },
                            ].map((f) => (
                              <div key={f.key}>
                                <label
                                  className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5"
                                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                                >
                                  {f.label}
                                </label>
                                <input
                                  type="text"
                                  value={(slide as unknown as Record<string, string>)[f.key] || ""}
                                  onChange={(e) => updateSlide(slide.id, f.key, e.target.value)}
                                  placeholder={f.placeholder}
                                  className="luxury-input rounded-sm"
                                />
                              </div>
                            ))}
                            <div>
                              <label
                                className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5"
                                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                              >
                                Body Text
                              </label>
                              <textarea
                                value={slide.body}
                                onChange={(e) => updateSlide(slide.id, "body", e.target.value)}
                                rows={3}
                                className="luxury-input rounded-sm resize-none"
                                placeholder="Describe this service in 1–2 sentences..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Save button */}
                        <div className="flex justify-end mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <button
                            onClick={() => saveSlide(slide)}
                            disabled={isSaving}
                            className="btn-luxury flex items-center gap-2 px-6 py-2.5 text-[0.7rem] tracking-[0.14em] rounded-sm"
                            style={
                              isSaved
                                ? {
                                    background: "rgba(34,197,94,0.12)",
                                    border: "1px solid rgba(34,197,94,0.3)",
                                    color: "#22c55e",
                                  }
                                : undefined
                            }
                          >
                            {isSaving ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                              </>
                            ) : isSaved ? (
                              <>
                                <CheckCircle size={14} />
                                Saved!
                              </>
                            ) : (
                              <>
                                <Save size={14} />
                                Save Slide {i + 1}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
