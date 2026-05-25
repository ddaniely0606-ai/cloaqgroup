"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, Play, Pause, BarChart2, DollarSign, Eye, MousePointer } from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  client: string;
  objective: string;
  budget: string;
  spent: string;
  spentPct: number;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  roas: string;
  roasNum: number;
  status: "Active" | "Paused" | "Learning";
}

const campaigns: Campaign[] = [
  { id: 1, name: "Obsidian — Brand Awareness Q2", client: "Obsidian Spirits", objective: "Awareness", budget: "₪12,000", spent: "₪9,840", spentPct: 82, impressions: "1.2M", clicks: "28,400", ctr: "2.37%", cpc: "₪0.35", roas: "5.8x", roasNum: 5.8, status: "Active" },
  { id: 2, name: "Obsidian — Retargeting", client: "Obsidian Spirits", objective: "Conversions", budget: "₪8,000", spent: "₪6,200", spentPct: 77, impressions: "340K", clicks: "14,200", ctr: "4.18%", cpc: "₪0.44", roas: "7.2x", roasNum: 7.2, status: "Active" },
  { id: 3, name: "Apex — Lead Gen Realty", client: "Apex Realty", objective: "Lead Gen", budget: "₪15,000", spent: "₪13,400", spentPct: 89, impressions: "890K", clicks: "22,100", ctr: "2.48%", cpc: "₪0.61", roas: "4.1x", roasNum: 4.1, status: "Active" },
  { id: 4, name: "NovaTech — App Install", client: "NovaTech Labs", objective: "App Installs", budget: "₪10,000", spent: "₪7,800", spentPct: 78, impressions: "650K", clicks: "18,900", ctr: "2.91%", cpc: "₪0.41", roas: "6.2x", roasNum: 6.2, status: "Active" },
  { id: 5, name: "Meridian — Summer Sale", client: "Meridian Apparel", objective: "Sales", budget: "₪9,000", spent: "₪8,100", spentPct: 90, impressions: "780K", clicks: "21,000", ctr: "2.69%", cpc: "₪0.39", roas: "3.9x", roasNum: 3.9, status: "Learning" },
  { id: 6, name: "Solstice — Skincare Launch", client: "Solstice Beauty", objective: "Awareness", budget: "₪7,000", spent: "₪3,200", spentPct: 46, impressions: "420K", clicks: "9,800", ctr: "2.33%", cpc: "₪0.33", roas: "4.5x", roasNum: 4.5, status: "Paused" },
  { id: 7, name: "Ironclad — Membership Drive", client: "Ironclad Fitness", objective: "Conversions", budget: "₪6,000", spent: "₪5,400", spentPct: 90, impressions: "310K", clicks: "11,200", ctr: "3.61%", cpc: "₪0.48", roas: "5.1x", roasNum: 5.1, status: "Active" },
];

const statusStyle: Record<string, string> = {
  Active: "text-[#34d399] bg-[rgba(5,150,105,0.1)]",
  Paused: "text-[#8a8a9a] bg-[rgba(255,255,255,0.05)]",
  Learning: "text-blue-300 bg-blue-900/20",
};

const objectiveColor: Record<string, string> = {
  Awareness: "text-purple-300",
  Conversions: "text-[#34d399]",
  "Lead Gen": "text-yellow-300",
  Sales: "text-emerald-300",
  "App Installs": "text-blue-300",
};

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "insights">("campaigns");

  const totalSpend = campaigns.reduce((s, c) => s + parseInt(c.spent.replace(/[₪,]/g, "")), 0);
  const totalImpressions = "4.6M";
  const avgRoas = (campaigns.reduce((s, c) => s + c.roasNum, 0) / campaigns.length).toFixed(1);
  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">META ADS MANAGER</h1>
          <p className="text-[#8a8a9a] text-sm mt-1">{campaigns.length} campaigns · May 2026</p>
        </div>
        <div className="flex gap-2">
          {(["campaigns", "insights"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${activeTab === tab ? "bg-[rgba(5,150,105,0.15)] text-[#34d399] border-[rgba(5,150,105,0.3)]" : "text-[#8a8a9a] border-[rgba(5,150,105,0.1)] hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: activeCampaigns.toString(), icon: Play, color: "#34d399" },
          { label: "Total Spent (MTD)", value: `₪${totalSpend.toLocaleString()}`, icon: DollarSign, color: "#34d399" },
          { label: "Total Impressions", value: totalImpressions, icon: Eye, color: "#34d399" },
          { label: "Avg ROAS", value: `${avgRoas}x`, icon: TrendingUp, color: "#34d399" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)] p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon size={16} className="text-[#34d399]" />
              </div>
              <p className="text-white text-xl font-black">{k.value}</p>
              <p className="text-[#8a8a9a] text-[0.65rem] uppercase tracking-wider mt-1">{k.label}</p>
            </div>
          );
        })}
      </div>

      {activeTab === "campaigns" && (
        <div className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
          <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)] flex items-center gap-2">
            <BarChart2 size={14} className="text-[#34d399]" />
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">All Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(5,150,105,0.08)]">
                  {["Campaign", "Client", "Objective", "Budget", "Spent", "Impressions", "CTR", "CPC", "ROAS", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[#8a8a9a] text-[0.6rem] uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(5,150,105,0.05)]">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[rgba(5,150,105,0.025)] transition-colors group">
                    <td className="px-4 py-3.5">
                      <p className="text-white text-xs font-semibold max-w-[180px] truncate">{c.name}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#8a8a9a] text-xs whitespace-nowrap">{c.client}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium ${objectiveColor[c.objective] || "text-white"}`}>{c.objective}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[#8a8a9a] text-xs font-mono">{c.budget}</td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-white text-xs font-mono">{c.spent}</p>
                        <div className="mt-1 h-1 w-16 bg-[rgba(255,255,255,0.06)]">
                          <div className="h-full bg-[#059669]" style={{ width: `${c.spentPct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#8a8a9a] text-xs">{c.impressions}</td>
                    <td className="px-4 py-3.5 text-white text-xs font-mono">{c.ctr}</td>
                    <td className="px-4 py-3.5 text-[#8a8a9a] text-xs font-mono">{c.cpc}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-bold ${c.roasNum >= 5 ? "text-[#34d399]" : c.roasNum >= 4 ? "text-white" : "text-yellow-300"}`}>{c.roas}</span>
                        {c.roasNum >= 4.5 ? <TrendingUp size={10} className="text-[#34d399]" /> : <TrendingDown size={10} className="text-yellow-300" />}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[0.6rem] px-2 py-0.5 font-semibold ${statusStyle[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className={`opacity-0 group-hover:opacity-100 transition-all p-1 ${c.status === "Active" ? "text-yellow-300 hover:text-yellow-200" : "text-[#34d399] hover:text-green-300"}`}>
                        {c.status === "Active" ? <Pause size={12} /> : <Play size={12} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "insights" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top performers */}
          <div className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
            <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)]">
              <h2 className="text-white text-sm font-bold uppercase tracking-wider">Top Performers (ROAS)</h2>
            </div>
            <div className="divide-y divide-[rgba(5,150,105,0.06)]">
              {[...campaigns].sort((a, b) => b.roasNum - a.roasNum).slice(0, 5).map((c, i) => (
                <div key={c.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#8a8a9a] text-xs w-4">{i + 1}</span>
                    <div>
                      <p className="text-white text-xs font-semibold">{c.name}</p>
                      <p className="text-[#8a8a9a] text-[0.65rem] mt-0.5">{c.client}</p>
                    </div>
                  </div>
                  <span className="text-[#34d399] text-sm font-black">{c.roas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget utilization */}
          <div className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)]">
            <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)]">
              <h2 className="text-white text-sm font-bold uppercase tracking-wider">Budget Utilization</h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {campaigns.slice(0, 5).map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-xs truncate max-w-[180px]">{c.name}</span>
                    <span className="text-[#8a8a9a] text-xs">{c.spentPct}%</span>
                  </div>
                  <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${c.spentPct}%`,
                        background: c.spentPct > 85 ? "#34d399" : c.spentPct > 60 ? "#059669" : "rgba(5,150,105,0.5)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objective breakdown */}
          <div className="bg-[#0a0a12] border border-[rgba(5,150,105,0.15)] lg:col-span-2">
            <div className="px-6 py-4 border-b border-[rgba(5,150,105,0.1)]">
              <h2 className="text-white text-sm font-bold uppercase tracking-wider">Spend by Objective</h2>
            </div>
            <div className="p-6 flex flex-wrap gap-6">
              {Object.entries(
                campaigns.reduce((acc, c) => {
                  const spend = parseInt(c.spent.replace(/[₪,]/g, ""));
                  acc[c.objective] = (acc[c.objective] || 0) + spend;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([obj, spend]) => (
                <div key={obj} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#34d399]" />
                  <div>
                    <p className="text-white text-sm font-bold">₪{spend.toLocaleString()}</p>
                    <p className="text-[#8a8a9a] text-[0.65rem] uppercase tracking-wider">{obj}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
