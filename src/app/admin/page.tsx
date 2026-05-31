"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(155deg, #030304 0%, #07070e 40%, #0d0d16 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(196,30,58,0.07) 0%, transparent 60%)" }} />

      <motion.div
        className="w-full max-w-[400px] relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="p-10 rounded-sm"
          style={{
            background: "linear-gradient(135deg, rgba(20,20,30,0.98), rgba(13,13,22,0.99))",
            border: "1px solid rgba(196,30,58,0.2)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
          }}
        >
          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,92,0.6), transparent)" }} />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="sm" />
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.25)" }}>
              <Lock size={22} style={{ color: "#c41e3a" }} />
            </div>
          </div>

          <h1 className="text-center text-xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Admin Panel
          </h1>
          <p className="text-center text-gray-500 text-[0.82rem] mb-8" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Enter your admin password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="luxury-input rounded-sm pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <motion.p
                className="text-[0.8rem] text-center"
                style={{ color: "#c41e3a", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-luxury btn-crimson w-full py-3.5 text-[0.72rem] tracking-[0.18em] rounded-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : "Access Admin Panel"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-[0.72rem] mt-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Default password: <span className="text-gray-500">jmclimo2024</span>
            <br />Change it in <code className="text-[#d4a85c]">.env.local → ADMIN_PASSWORD</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
