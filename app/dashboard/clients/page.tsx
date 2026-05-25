"use client";
import { useState } from "react";
import { Search, Plus, TrendingUp, TrendingDown, ExternalLink, Filter } from "lucide-react";

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
}

const clients: Client[] = [
  { id: 1, name: "Obsidian Spirits", industry: "Beverages", spend: "₪42,000", roas: "5.8x", roasNum: 5.8, status: "Active", campaigns: 4, since: "Jan 2024", manager: "Daniel" },
  { id: 2, name: "Apex Realty", industry: "Real Estate", spend: "₪38,500", roas: "4.1x", roasNum: 4.1, status: "Active", campaigns: 6, since: "Mar 2024", manager: "Shahar" },
  { id: 3, name: "NovaTech Labs", industry: "Tech", spend: "₪31,200", roas: "6.2x", roasNum: 6.2, status: "Active", campaigns: 3, since: "Nov 2023", manager: "Daniel" },
  { id: 4, name: "Meridian Apparel", industry: "Fashion", spend: "₪27,800", roas: "3.9x", roasNum: 3.9, status: "Active", campaigns: 5, since: "Feb 2024", manager: "Shahar" },
  { id: 5, name: "Solstice Beauty", industry: "Beauty", spend: "₪22,000", roas: "4.5x", roasNum: 4.5, status: "Review", campaigns: 2, since: "Apr 2024", manager: "Daniel" },
  { id: 6, name: "Crestview Finance", industry: "Finance", spend: "₪19,500", roas: "3.2x", roasNum: 3.2, status: "Active", campaigns: 3, since: "Jun 2024", manager: "Staff" },
  { id: 7, name: "Ironclad Fitness", industry: "Health", spend: "₪17,200", roas: "5.1x", roasNum: 5.1, status: "Active", campaigns: 4, since: "May 2024", manager: "Daniel" },
  { id: 8, name: "Luminary Events", industry: "Events", spend: "₪14,800", roas: "2.8x", roasNum: 2.8, status: "Paused", campaigns: 1, since: "Jan 2024", manager: "Shahar" },
];

const statusStyle: Record<string, string> = {
  Active: "text-[#4ade80] bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.2)]",
  Review: "text-yellow-300 bg-yellow-900/20 border-yellow-800/30",
  Paused: "text-[#8a8a9a] bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)]",
};

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filtered = clients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalSpend = clients.reduce((sum, c) => sum + parseInt(c.spend.replace(/[₪,]/g, "")), 0);
  const avgRoas = (clients.reduce((sum, c) => sum + c.roasNum, 0) / clients.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">CLIENT ROSTER</h1>
          <p className="text-[#8a8a9a] text-sm mt-1">{clients.length} active accounts · ₪{totalSpend.toLocaleString()} total monthly spend</p>
        </div>
        <button className="flex items-center gap-2 bg-[#16a34a] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#15803d] transition-colors">
          <Plus size={14} />
          Add Client
        </button>
      </div>

      {/* Summary bar */}
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
            placeholder="Search clients..."
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

      {/* Table */}
      <div className="bg-[#0a0a12] border border-[rgba(22,163,74,0.15)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(22,163,74,0.1)]">
                {["Client", "Industry", "Monthly Spend", "ROAS", "Campaigns", "Manager", "Since", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[#8a8a9a] text-[0.65rem] uppercase tracking-wider font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(22,163,74,0.06)]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[rgba(22,163,74,0.03)] transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-white text-sm font-semibold">{c.name}</p>
                  </td>
                  <td className="px-5 py-4 text-[#8a8a9a] text-xs">{c.industry}</td>
                  <td className="px-5 py-4 text-white text-sm font-mono">{c.spend}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${c.roasNum >= 4.5 ? "text-[#4ade80]" : c.roasNum >= 3.5 ? "text-white" : "text-yellow-300"}`}>{c.roas}</span>
                      {c.roasNum >= 4.5 ? <TrendingUp size={12} className="text-[#4ade80]" /> : <TrendingDown size={12} className="text-yellow-300" />}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#8a8a9a] text-sm">{c.campaigns}</td>
                  <td className="px-5 py-4 text-[#8a8a9a] text-xs">{c.manager}</td>
                  <td className="px-5 py-4 text-[#8a8a9a] text-xs">{c.since}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[0.65rem] px-2 py-1 font-semibold border ${statusStyle[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-[#8a8a9a] hover:text-[#4ade80] transition-colors opacity-0 group-hover:opacity-100">
                      <ExternalLink size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-[#8a8a9a] text-sm">No clients match your search.</div>
        )}
      </div>
    </div>
  );
}
