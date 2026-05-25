"use client";
import { useState, useEffect } from "react";
import { Search, Plus, TrendingUp, TrendingDown, ChevronDown, ChevronRight, Bot, Zap, Check } from "lucide-react";

interface Client {
  id: number;
  name: string;
  industry: string;
  spend: string;
  roas: string;
  roasNum: number;
  status: "Active" | "Review" | "Paused";
  campaigns: number;
  since: string;
  manager: string;
  palette: string[];
}

interface Service {
  id: string;
  nameHe: string;
  nameEn: string;
  category: "automation" | "ads" | "design" | "strategy";
  auto: boolean;
}

const SERVICES: Service[] = [
  { id: "manychat",    nameHe: "ManyChat אוטומציה",        nameEn: "ManyChat Auto-Response",    category: "automation", auto: true },
  { id: "meta",        nameHe: "פרסומות Meta",              nameEn: "Meta Ads Campaigns",         category: "ads",        auto: true },
  { id: "google",      nameHe: "פרסומות Google",            nameEn: "Google Ads Campaigns",       category: "ads",        auto: true },
  { id: "tiktok",      nameHe: "פרסומות TikTok",           nameEn: "TikTok Ads",                 category: "ads",        auto: true },
  { id: "instagram",   nameHe: "תוכן Instagram",            nameEn: "Instagram Content",          category: "ads",        auto: true },
  { id: "leads",       nameHe: "ניהול לידים",               nameEn: "Lead Management",            category: "automation", auto: true },
  { id: "creative",    nameHe: "קריאייטיב & קופי",         nameEn: "Creative & Copywriting",     category: "design",     auto: false },
  { id: "brand",       nameHe: "פיתוח עיצובי",             nameEn: "Brand Design Dev",           category: "design",     auto: false },
  { id: "palette",     nameHe: "פלטת צבעים & Brand ID",   nameEn: "Color Palette & Brand ID",   category: "design",     auto: false },
  { id: "competitor",  nameHe: "ניתוח מתחרים",             nameEn: "Competitor Analysis",        category: "strategy",   auto: false },
  { id: "report",      nameHe: "דוחות חודשיים",            nameEn: "Monthly Reporting",          category: "strategy",   auto: true },
];

const CAT_COLOR: Record<string, string> = {
  automation: "text-[#4ade80] border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.06)]",
  ads:        "text-blue-300  border-[rgba(147,197,253,0.2)]  bg-[rgba(147,197,253,0.06)]",
  design:     "text-purple-300 border-[rgba(192,132,252,0.2)] bg-[rgba(192,132,252,0.06)]",
  strategy:   "text-yellow-300 border-[rgba(253,224,71,0.2)]  bg-[rgba(253,224,71,0.06)]",
};

const clients: Client[] = [
  { id: 1, name: "Obsidian Spirits",  industry: "Beverages",   spend: "₪42,000", roas: "5.8x", roasNum: 5.8, status: "Active", campaigns: 4, since: "Jan 2024", manager: "Daniel", palette: ["#1a1a2e","#16213e","#0f3460","#e94560"] },
  { id: 2, name: "Apex Realty",       industry: "Real Estate", spend: "₪38,500", roas: "4.1x", roasNum: 4.1, status: "Active", campaigns: 6, since: "Mar 2024", manager: "Shahar", palette: ["#2c3e50","#e8b86d","#f0f0f0","#c0392b"] },
  { id: 3, name: "NovaTech Labs",     industry: "Tech",        spend: "₪31,200", roas: "6.2x", roasNum: 6.2, status: "Active", campaigns: 3, since: "Nov 2023", manager: "Daniel", palette: ["#0d0d0d","#00d4ff","#7b2fff","#ffffff"] },
  { id: 4, name: "Meridian Apparel",  industry: "Fashion",     spend: "₪27,800", roas: "3.9x", roasNum: 3.9, status: "Active", campaigns: 5, since: "Feb 2024", manager: "Shahar", palette: ["#f5f0eb","#c8a882","#8b6f47","#2d2d2d"] },
  { id: 5, name: "Solstice Beauty",   industry: "Beauty",      spend: "₪22,000", roas: "4.5x", roasNum: 4.5, status: "Review", campaigns: 2, since: "Apr 2024", manager: "Daniel", palette: ["#fce4ec","#f48fb1","#ad1457","#880e4f"] },
  { id: 6, name: "Crestview Finance", industry: "Finance",     spend: "₪19,500", roas: "3.2x", roasNum: 3.2, status: "Active", campaigns: 3, since: "Jun 2024", manager: "Staff",  palette: ["#0a2342","#1565c0","#42a5f5","#ffffff"] },
  { id: 7, name: "Ironclad Fitness",  industry: "Health",      spend: "₪17,200", roas: "5.1x", roasNum: 5.1, status: "Active", campaigns: 4, since: "May 2024", manager: "Daniel", palette: ["#0d0d0d","#ff4500","#ff8c00","#f5f5f5"] },
  { id: 8, name: "Luminary Events",   industry: "Events",      spend: "₪14,800", roas: "2.8x", roasNum: 2.8, status: "Paused", campaigns: 1, since: "Jan 2024", manager: "Shahar", palette: ["#1a0533","#9c27b0","#e040fb","#ffffff"] },
];

const statusStyle: Record<string, string> = {
  Active: "text-[#4ade80] bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.2)]",
  Review: "text-yellow-300 bg-yellow-900/20 border-yellow-800/30",
  Paused: "text-[#8a8a9a] bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)]",
};

const STORAGE_KEY = "cloak_client_services";

function loadChecks(): Record<number, Record<string, boolean>> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveChecks(data: Record<number, Record<string, boolean>>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [checks, setChecks] = useState<Record<number, Record<string, boolean>>>({});

  useEffect(() => {
    const saved = loadChecks();
    // Pre-fill auto services as checked for active clients
    const init: Record<number, Record<string, boolean>> = { ...saved };
    clients.forEach((c) => {
      if (!init[c.id]) {
        init[c.id] = {};
        SERVICES.forEach((s) => {
          if (s.auto && c.status === "Active") init[c.id][s.id] = true;
        });
      }
    });
    setChecks(init);
    saveChecks(init);
  }, []);

  const toggle = (clientId: number, serviceId: string) => {
    setChecks((prev) => {
      const updated = {
        ...prev,
        [clientId]: { ...prev[clientId], [serviceId]: !prev[clientId]?.[serviceId] },
      };
      saveChecks(updated);
      return updated;
    });
  };

  const filtered = clients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalSpend = clients.reduce((sum, c) => sum + parseInt(c.spend.replace(/[₪,]/g, "")), 0);
  const avgRoas = (clients.reduce((sum, c) => sum + c.roasNum, 0) / clients.length).toFixed(1);

  const serviceCount = (clientId: number) => {
    const c = checks[clientId] || {};
    return Object.values(c).filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">CLIENT ROSTER</h1>
          <p className="text-[#8a8a9a] text-sm mt-1">{clients.length} accounts · ₪{totalSpend.toLocaleString()} monthly spend</p>
        </div>
        <button className="flex items-center gap-2 bg-[#16a34a] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#15803d] transition-colors">
          <Plus size={14} />
          Add Client
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Clients", value: clients.length.toString() },
          { label: "Total Monthly Spend", value: `₪${totalSpend.toLocaleString()}` },
          { label: "Average ROAS", value: `${avgRoas}x` },
        ].map((s) => (
          <div key={s.label} className="bg-[#0a0a12] border border-[rgba(22,163,74,0.15)] px-5 py-4">
            <p className="text-[#4ade80] text-xl font-black">{s.value}</p>
            <p className="text-[#8a8a9a] text-xs uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש לקוחות..."
            className="w-full bg-[#0a0a12] border border-[rgba(22,163,74,0.15)] pl-9 pr-4 py-2.5 text-white text-sm outline-none focus:border-[rgba(22,163,74,0.4)] transition-colors placeholder:text-[#8a8a9a]"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Review", "Paused"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${filter === s ? "bg-[rgba(22,163,74,0.15)] text-[#4ade80] border-[rgba(22,163,74,0.3)]" : "text-[#8a8a9a] border-[rgba(22,163,74,0.1)] hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Client list */}
      <div className="bg-[#0a0a12] border border-[rgba(22,163,74,0.15)] divide-y divide-[rgba(22,163,74,0.07)]">

        {/* Table header */}
        <div className="grid grid-cols-[1fr_120px_100px_80px_100px_80px_80px_40px] px-5 py-3 text-[#8a8a9a] text-[0.6rem] uppercase tracking-wider font-semibold">
          <span>לקוח</span>
          <span>תקציב חודשי</span>
          <span>ROAS</span>
          <span>קמפיינים</span>
          <span>מנהל</span>
          <span>שירותים</span>
          <span>סטטוס</span>
          <span></span>
        </div>

        {filtered.map((c) => {
          const isOpen = expanded === c.id;
          const done = serviceCount(c.id);
          const total = SERVICES.length;
          const pct = Math.round((done / total) * 100);

          return (
            <div key={c.id}>
              {/* Row */}
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full grid grid-cols-[1fr_120px_100px_80px_100px_80px_80px_40px] px-5 py-4 items-center hover:bg-[rgba(22,163,74,0.04)] transition-colors text-left group"
              >
                {/* Client name + palette */}
                <div className="flex items-center gap-3">
                  {isOpen
                    ? <ChevronDown size={14} className="text-[#4ade80] shrink-0" />
                    : <ChevronRight size={14} className="text-[#8a8a9a] group-hover:text-white shrink-0 transition-colors" />
                  }
                  <div>
                    <p className="text-white text-sm font-semibold">{c.name}</p>
                    <p className="text-[#8a8a9a] text-[0.65rem] mt-0.5">{c.industry}</p>
                  </div>
                  {/* Color palette dots */}
                  <div className="flex gap-1 mr-2">
                    {c.palette.map((color, i) => (
                      <div key={i} className="w-3 h-3 rounded-full border border-[rgba(255,255,255,0.1)]" style={{ background: color }} title={color} />
                    ))}
                  </div>
                </div>

                <span className="text-white text-sm font-mono">{c.spend}</span>

                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-bold ${c.roasNum >= 4.5 ? "text-[#4ade80]" : c.roasNum >= 3.5 ? "text-white" : "text-yellow-300"}`}>{c.roas}</span>
                  {c.roasNum >= 4.5 ? <TrendingUp size={12} className="text-[#4ade80]" /> : <TrendingDown size={12} className="text-yellow-300" />}
                </div>

                <span className="text-[#8a8a9a] text-sm">{c.campaigns}</span>
                <span className="text-[#8a8a9a] text-xs">{c.manager}</span>

                {/* Services progress */}
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-[rgba(255,255,255,0.08)] rounded-full">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: pct === 100 ? "#4ade80" : pct > 60 ? "#16a34a" : "rgba(22,163,74,0.5)" }}
                    />
                  </div>
                  <span className="text-[#8a8a9a] text-[0.6rem]">{done}/{total}</span>
                </div>

                <span className={`text-[0.65rem] px-2 py-1 font-semibold border ${statusStyle[c.status]}`}>{c.status}</span>
                <span />
              </button>

              {/* Expanded services panel */}
              {isOpen && (
                <div className="px-6 pb-6 bg-[rgba(10,10,18,0.8)] border-t border-[rgba(22,163,74,0.08)]">
                  {/* Section header */}
                  <div className="flex items-center justify-between pt-5 pb-4">
                    <div className="flex items-center gap-2">
                      <Bot size={14} className="text-[#4ade80]" />
                      <h3 className="text-white text-xs font-bold uppercase tracking-wider">שירותים פעילים — {c.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Color palette display */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#8a8a9a] text-[0.6rem] uppercase tracking-wider">Brand Colors</span>
                        {c.palette.map((color, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 border border-[rgba(255,255,255,0.08)]"
                            style={{ background: color + "22" }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                            <span className="text-[0.55rem] text-[#8a8a9a] font-mono">{color}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[#4ade80] text-xs font-bold">{done}/{total} Active</span>
                    </div>
                  </div>

                  {/* Services grid by category */}
                  {(["automation", "ads", "design", "strategy"] as const).map((cat) => {
                    const catServices = SERVICES.filter((s) => s.category === cat);
                    const catLabels: Record<string, string> = {
                      automation: "⚡ אוטומציה",
                      ads: "📣 פרסומות",
                      design: "🎨 עיצוב & ברנד",
                      strategy: "📊 אסטרטגיה",
                    };
                    return (
                      <div key={cat} className="mb-4">
                        <p className="text-[#8a8a9a] text-[0.6rem] uppercase tracking-[0.2em] mb-2 font-semibold">{catLabels[cat]}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {catServices.map((svc) => {
                            const checked = checks[c.id]?.[svc.id] ?? false;
                            return (
                              <button
                                key={svc.id}
                                onClick={() => toggle(c.id, svc.id)}
                                className={`flex items-start gap-2.5 p-3 border text-left transition-all duration-200 ${
                                  checked
                                    ? "bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.3)]"
                                    : "bg-transparent border-[rgba(255,255,255,0.06)] hover:border-[rgba(22,163,74,0.2)]"
                                }`}
                              >
                                {/* Checkbox */}
                                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  checked ? "bg-[#16a34a] border-[#16a34a]" : "border-[rgba(255,255,255,0.2)]"
                                }`}>
                                  {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <p className={`text-xs font-semibold leading-tight ${checked ? "text-white" : "text-[#8a8a9a]"}`}>{svc.nameHe}</p>
                                    {svc.auto && (
                                      <span className="flex items-center gap-0.5 text-[0.5rem] text-[#4ade80] bg-[rgba(22,163,74,0.12)] px-1 py-0.5 font-bold uppercase">
                                        <Zap size={7} />BOT
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[#8a8a9a] text-[0.6rem] mt-0.5">{svc.nameEn}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Footer note */}
                  <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[rgba(22,163,74,0.08)]">
                    <Zap size={10} className="text-[#4ade80]" />
                    <p className="text-[#8a8a9a] text-[0.6rem]">שירותים עם תג BOT מטופלים אוטומטית. שינויים נשמרים מידית.</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-[#8a8a9a] text-sm">לא נמצאו לקוחות.</div>
        )}
      </div>
    </div>
  );
}
