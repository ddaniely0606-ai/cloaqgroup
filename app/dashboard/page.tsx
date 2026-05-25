"use client";
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity, BarChart2 } from "lucide-react";

const kpis = [
  { label: "Monthly Revenue", value: "₪284,500", change: "+18%", up: true, icon: DollarSign },
  { label: "Active Clients", value: "23", change: "+3", up: true, icon: Users },
  { label: "Avg. ROAS", value: "4.8x", change: "+0.6", up: true, icon: TrendingUp },
  { label: "Active Campaigns", value: "41", change: "-2", up: false, icon: Target },
];

const recentActivity = [
  { client: "Obsidian Spirits", action: "New campaign launched", time: "2h ago", status: "active" },
  { client: "NovaTech Labs", action: "ROAS increased to 6.2x", time: "5h ago", status: "growth" },
  { client: "Apex Realty", action: "Monthly report sent", time: "1d ago", status: "info" },
  { client: "Meridian Apparel", action: "Budget increase approved", time: "1d ago", status: "active" },
  { client: "Solstice Beauty", action: "Creative review needed", time: "2d ago", status: "warning" },
];

const topClients = [
  { name: "Obsidian Spirits", spend: "₪42,000", roas: "5.8x", status: "Active" },
  { name: "Apex Realty", spend: "₪38,500", roas: "4.1x", status: "Active" },
  { name: "NovaTech Labs", spend: "₪31,200", roas: "6.2x", status: "Active" },
  { name: "Meridian Apparel", spend: "₪27,800", roas: "3.9x", status: "Active" },
  { name: "Solstice Beauty", spend: "₪22,000", roas: "4.5x", status: "Review" },
];

const revenueMonths = [
  { month: "נוב", value: 198000 },
  { month: "דצמ", value: 224000 },
  { month: "ינו", value: 211000 },
  { month: "פבר", value: 238000 },
  { month: "מרצ", value: 251000 },
  { month: "אפר", value: 269000 },
  { month: "מאי", value: 284500 },
];

const maxRevenue = Math.max(...revenueMonths.map((m) => m.value));

function RevenueChart() {
  return (
    <div className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
      <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 size={14} className="text-[#34d399]" />
          <h2 className="text-white text-sm font-bold uppercase tracking-wider">Revenue Trend</h2>
        </div>
        <span className="text-[#34d399] text-xs font-semibold">+43.4% YTD</span>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-end gap-3 h-32">
          {revenueMonths.map((m, i) => {
            const height = Math.round((m.value / maxRevenue) * 100);
            const isLatest = i === revenueMonths.length - 1;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative group" style={{ height: "96px", display: "flex", alignItems: "flex-end" }}>
                  <div
                    className="w-full transition-all duration-300"
                    style={{
                      height: `${height}%`,
                      background: isLatest
                        ? "linear-gradient(to top, #059669, #34d399)"
                        : "rgba(5,150,105,0.25)",
                      borderTop: isLatest ? "1px solid #34d399" : "1px solid rgba(5,150,105,0.4)",
                    }}
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[0.6rem] text-[#34d399] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₪{(m.value / 1000).toFixed(0)}K
                  </div>
                </div>
                <span className="text-[#8a8a9a] text-[0.65rem]">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const statusColor: Record<string, string> = {
  active: "text-[#34d399] bg-[rgba(5,150,105,0.1)]",
  growth: "text-emerald-300 bg-emerald-900/20",
  info: "text-blue-300 bg-blue-900/20",
  warning: "text-yellow-300 bg-yellow-900/20",
};

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-black tracking-tight">DOMINATE YOUR MARKET</h1>
        <p className="text-[#8a8a9a] text-sm mt-1">Real-time performance overview — CLOAK crew only</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)] p-6 hover:border-[rgba(5,150,105,0.35)] transition-colors duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 border border-[rgba(5,150,105,0.2)] flex items-center justify-center">
                  <Icon size={18} className="text-[#34d399]" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? "text-[#34d399]" : "text-red-400"}`}>
                  {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-white text-2xl font-black mb-1">{kpi.value}</p>
              <p className="text-[#8a8a9a] text-xs uppercase tracking-wider">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <RevenueChart />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top Clients */}
        <div className="lg:col-span-3 bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
          <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)] flex items-center justify-between">
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">Top Clients</h2>
            <a href="/dashboard/clients" className="text-[#34d399] text-xs hover:text-white transition-colors">View all →</a>
          </div>
          <div className="divide-y divide-[rgba(5,150,105,0.08)]">
            {topClients.map((c) => (
              <div key={c.name} className="px-6 py-4 flex items-center justify-between hover:bg-[rgba(5,150,105,0.03)] transition-colors">
                <div>
                  <p className="text-white text-sm font-semibold">{c.name}</p>
                  <p className="text-[#8a8a9a] text-xs mt-0.5">Monthly spend: {c.spend}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#34d399] text-sm font-bold">{c.roas}</p>
                  <span className={`text-[0.65rem] px-2 py-0.5 font-medium ${c.status === "Active" ? "text-[#34d399] bg-[rgba(5,150,105,0.1)]" : "text-yellow-300 bg-yellow-900/20"}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
          <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)] flex items-center gap-2">
            <Activity size={14} className="text-[#34d399]" />
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">Activity</h2>
          </div>
          <div className="divide-y divide-[rgba(5,150,105,0.08)]">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <div className={`mt-1 text-[0.6rem] px-1.5 py-0.5 font-bold uppercase shrink-0 ${statusColor[a.status]}`}>
                    {a.status}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{a.client}</p>
                    <p className="text-[#8a8a9a] text-xs mt-0.5">{a.action}</p>
                    <p className="text-[#8a8a9a] text-[0.65rem] mt-1">{a.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
