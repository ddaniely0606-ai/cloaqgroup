"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, TrendingUp, MessageCircle, LogOut, Menu } from "lucide-react";
import { getSession, clearSession, type CloakSession } from "@/lib/auth";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Meta Ads", href: "/dashboard/ads", icon: TrendingUp },
  { label: "WhatsApp", href: "/dashboard/whatsapp", icon: MessageCircle },
];

const AUTH_FREE = ["/dashboard/login", "/dashboard/reset-password"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<CloakSession | null>(null);

  useEffect(() => {
    if (AUTH_FREE.includes(pathname)) { setReady(true); return; }
    const s = getSession();
    if (!s) {
      router.push("/dashboard/login");
      return;
    }
    setSession(s);
    setReady(true);
  }, [router, pathname]);

  if (!ready) return null;
  if (AUTH_FREE.includes(pathname)) return <>{children}</>;

  const logout = () => {
    clearSession();
    router.push("/dashboard/login");
  };

  return (
    <div className="min-h-screen bg-[#050508] flex" dir="ltr">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-[#0a0a12] border-r border-[rgba(5,150,105,0.15)] flex flex-col z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-[rgba(5,150,105,0.1)]">
          <Image src="/logo.jpg" alt="CLOAK" width={120} height={40} className="bg-white px-2 py-1 object-contain" />
          <p className="text-[#34d399] text-[0.6rem] tracking-[0.3em] uppercase mt-3">CREW DASHBOARD</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[rgba(5,150,105,0.15)] text-[#34d399] border border-[rgba(5,150,105,0.3)]"
                    : "text-[#8a8a9a] hover:text-white hover:bg-[rgba(5,150,105,0.06)]"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {session && (
          <div className="px-4 pb-2 mx-4 bg-[rgba(5,150,105,0.06)] border border-[rgba(5,150,105,0.1)] py-3 mb-2">
            <p className="text-white text-xs font-semibold">{session.name}</p>
            <p className="text-[#8a8a9a] text-[0.65rem] mt-0.5">{session.email}</p>
          </div>
        )}

        <div className="p-4 border-t border-[rgba(5,150,105,0.1)]">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm text-[#8a8a9a] hover:text-red-400 transition-colors duration-200"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-[#050508]/90 backdrop-blur border-b border-[rgba(5,150,105,0.1)] px-6 py-4 flex items-center justify-between">
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_6px_#4ade80]" />
            <span className="text-[#34d399] text-xs tracking-widest uppercase font-mono">LIVE</span>
          </div>
          <p className="text-[#8a8a9a] text-xs hidden md:block">
            {new Date().toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
