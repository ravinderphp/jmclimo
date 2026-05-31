"use client";
import { useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  height?: number;
}

export default function ImageUpload({ value, onChange, label, hint = "JPEG, PNG, WebP — max 8MB", height = 160 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      setError("File too large. Maximum 8MB.");
      return;
    }
    setUploading(true);
    setError("");
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);
    try {
      setProgress(40);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      setProgress(80);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setProgress(100);
      onChange(data.url);
      setTimeout(() => setProgress(0), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) upload(file);
  };

  return (
    <div>
      {label && (
        <label
          className="block text-[0.63rem] tracking-[0.18em] uppercase text-gray-500 mb-1.5"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {label}
        </label>
      )}

      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: "rgba(7,7,14,0.85)",
          border: `1px solid ${value ? "rgba(212,168,92,0.35)" : "rgba(196,30,58,0.22)"}`,
          minHeight: `${height}px`,
          transition: "border-color 0.2s",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Progress bar */}
        {uploading && progress > 0 && (
          <div className="absolute top-0 left-0 right-0 h-[2px] z-20">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #c41e3a, #d4a85c)" }}
            />
          </div>
        )}

        {value ? (
          /* ── Image preview ── */
          <div className="relative group" style={{ minHeight: `${height}px` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full object-cover"
              style={{ height: `${height}px` }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(3,3,4,0.72)" }}
            >
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="btn-luxury btn-crimson flex items-center gap-1.5 px-4 py-2 text-[0.65rem] tracking-[0.12em] rounded-sm"
              >
                {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                Change
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="btn-luxury btn-outline-gold flex items-center gap-1.5 px-4 py-2 text-[0.65rem] tracking-[0.12em] rounded-sm"
              >
                <X size={12} /> Remove
              </button>
            </div>
            {/* URL chip bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 px-3 py-1.5 truncate text-[0.62rem] text-gray-500"
              style={{ background: "rgba(3,3,4,0.75)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {value}
            </div>
          </div>
        ) : (
          /* ── Upload area ── */
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-gray-300 transition-colors"
            style={{ minHeight: `${height}px`, cursor: uploading ? "wait" : "pointer" }}
          >
            {uploading ? (
              <>
                <Loader2 size={26} className="animate-spin" style={{ color: "#c41e3a" }} />
                <span className="text-[0.78rem]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.22)" }}
                >
                  <ImageIcon size={20} style={{ color: "#c41e3a" }} />
                </div>
                <div className="text-center">
                  <p className="text-[0.8rem] mb-0.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    <span style={{ color: "#d4a85c" }}>Click to upload</span> or drag & drop
                  </p>
                  {hint && (
                    <p className="text-[0.68rem] text-gray-600" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      {hint}
                    </p>
                  )}
                </div>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p
          className="text-[0.72rem] mt-1.5"
          style={{ color: "#c41e3a", fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
