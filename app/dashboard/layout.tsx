"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, TrendingUp, MessageCircle, LogOut, Menu, X } from "lucide-react";
import { getSession, clearSession, type CloakSession } from "@/lib/auth";

const nav = [
  { label: "Overview",  href: "/dashboard",           icon: LayoutDashboard },
  { label: "Clients",   href: "/dashboard/clients",   icon: Users },
  { label: "Meta Ads",  href: "/dashboard/ads",       icon: TrendingUp },
  { label: "WhatsApp",  href: "/dashboard/whatsapp",  icon: MessageCircle },
];

const AUTH_FREE = ["/dashboard/login", "/dashboard/reset-password"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ready, setReady]           = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSessionState]  = useState<CloakSession | null>(null);

  useEffect(() => {
    if (AUTH_FREE.includes(pathname)) { setReady(true); return; }
    const s = getSession();
    if (!s) { router.push("/dashboard/login"); return; }
    setSessionState(s);
    setReady(true);
  }, [router, pathname]);

  if (!ready) return null;
  if (AUTH_FREE.includes(pathname)) return <>{children}</>;

  const logout = () => { clearSession(); router.push("/dashboard/login"); };

  const initials = session?.name?.slice(0,2).toUpperCase() ?? "CL";

  return (
    <div className="min-h-screen bg-[#050508] flex" dir="ltr">
      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .sidebar-link-active { background:linear-gradient(90deg,rgba(39,174,96,0.18),rgba(39,174,96,0.06)); }
        .sidebar-link-active::before { content:""; position:absolute; left:0; top:0; bottom:0; width:2px; background:#27AE60; box-shadow:0 0 8px #27AE60; }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-20 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── SIDEBAR ─────────────────────────────────────── */}
      <aside className={`fixed md:sticky top-0 h-screen w-60 bg-[#06060e] border-r border-[rgba(39,174,96,0.1)] flex flex-col z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-[rgba(39,174,96,0.08)]">
          <div className="flex items-center gap-3">
            <img
              src="/hood.svg"
              alt="CLOAK"
              width={30}
              height={36}
              style={{ filter:"drop-shadow(0 0 10px rgba(39,174,96,0.7))" }}
            />
            <div>
              <p className="text-white text-base font-black tracking-[0.18em]">CLOAK</p>
              <p className="text-[0.5rem] tracking-[0.35em] uppercase" style={{ color:"#27AE60" }}>CREW OS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5 mt-2">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "sidebar-link-active text-white"
                    : "text-[#8a8a9a] hover:text-white hover:bg-[rgba(39,174,96,0.05)]"
                }`}
              >
                <Icon size={15} style={active ? { color:"#27AE60" } : {}} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 h-px bg-[rgba(39,174,96,0.08)]" />

        {/* User card */}
        {session && (
          <div className="p-4">
            <div className="flex items-center gap-3 px-3 py-3 bg-[rgba(39,174,96,0.05)] border border-[rgba(39,174,96,0.1)]">
              <div
                className="w-8 h-8 flex items-center justify-center text-xs font-black text-white shrink-0"
                style={{ background:"#27AE60", boxShadow:"0 0 12px rgba(39,174,96,0.4)" }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">{session.name}</p>
                <p className="text-[#8a8a9a] text-[0.6rem] truncate">{session.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-[#8a8a9a] hover:text-red-400 hover:bg-[rgba(239,68,68,0.06)] transition-all duration-200"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── MAIN ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#050508]/95 backdrop-blur-md border-b border-[rgba(39,174,96,0.08)] px-6 py-3.5 flex items-center justify-between">
          <button className="md:hidden text-[#8a8a9a] hover:text-white transition-colors" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background:"#27AE60", boxShadow:"0 0 6px #27AE60", animation:"livePulse 2s ease-in-out infinite" }}
            />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase font-mono" style={{ color:"#27AE60" }}>LIVE</span>
          </div>

          {/* Date */}
          <p className="text-[#8a8a9a] text-xs hidden md:block">
            {new Date().toLocaleDateString("he-IL", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
          </p>

          {/* Mobile close */}
          {sidebarOpen && (
            <button className="md:hidden text-[#8a8a9a]" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          )}
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
