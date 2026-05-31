"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Settings, Car, Inbox, Wrench, LogOut, ExternalLink, Image } from "lucide-react";
import Logo from "@/components/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Fleet", href: "/admin/fleet", icon: Car },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <aside
      className="w-64 min-h-screen flex flex-col border-r flex-shrink-0"
      style={{
        background: "linear-gradient(180deg, #07070e 0%, #0d0d16 100%)",
        borderColor: "rgba(196,30,58,0.15)",
      }}
    >
      {/* Logo area */}
      <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Logo size="sm" />
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-600 mt-2"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-sm text-[0.83rem] font-medium transition-all duration-200"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                background: active ? "rgba(196,30,58,0.12)" : "transparent",
                color: active ? "#ffffff" : "rgba(156,163,175,1)",
                border: active ? "1px solid rgba(196,30,58,0.25)" : "1px solid transparent",
              }}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2 : 1.6}
                style={{ color: active ? "#c41e3a" : "currentColor" }}
              />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#c41e3a" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 space-y-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-[0.8rem] text-gray-500 hover:text-gray-300 transition-colors"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <ExternalLink size={14} />
          View Website
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[0.8rem] text-gray-500 hover:text-red-400 transition-colors"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
