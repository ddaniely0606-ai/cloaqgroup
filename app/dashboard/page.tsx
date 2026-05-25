"use client";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity, Zap } from "lucide-react";

const kpis = [
  { label:"Monthly Revenue",  raw:284500, prefix:"₪", suffix:"",  change:"+18%", up:true,  icon:DollarSign, spark:[60,72,65,80,75,92,100] },
  { label:"Active Clients",   raw:23,     prefix:"",  suffix:"",  change:"+3",   up:true,  icon:Users,      spark:[55,58,60,63,68,72,100] },
  { label:"Avg. ROAS",        raw:4.8,    prefix:"",  suffix:"x", change:"+0.6", up:true,  icon:TrendingUp, spark:[50,62,58,70,75,84,100] },
  { label:"Active Campaigns", raw:41,     prefix:"",  suffix:"",  change:"-2",   up:false, icon:Target,     spark:[100,95,90,88,85,82,80]  },
];

const activity = [
  { client:"Obsidian Spirits", action:"קמפיין חדש הושק",      time:"2h ago", status:"active"  },
  { client:"NovaTech Labs",    action:"ROAS עלה ל-6.2x",      time:"5h ago", status:"growth"  },
  { client:"Apex Realty",      action:"דוח חודשי נשלח",       time:"1d ago", status:"info"    },
  { client:"Meridian Apparel", action:"תקציב הוגדל",          time:"1d ago", status:"active"  },
  { client:"Solstice Beauty",  action:"Creative review נדרש", time:"2d ago", status:"warning" },
];

const topClients = [
  { name:"Obsidian Spirits", spend:"₪42,000", roas:"5.8x", roasN:5.8, status:"Active", pct:100 },
  { name:"Apex Realty",      spend:"₪38,500", roas:"4.1x", roasN:4.1, status:"Active", pct:92  },
  { name:"NovaTech Labs",    spend:"₪31,200", roas:"6.2x", roasN:6.2, status:"Active", pct:74  },
  { name:"Meridian Apparel", spend:"₪27,800", roas:"3.9x", roasN:3.9, status:"Active", pct:66  },
  { name:"Solstice Beauty",  spend:"₪22,000", roas:"4.5x", roasN:4.5, status:"Review", pct:52  },
];

const statusDot: Record<string,string> = {
  active:"bg-[#27AE60]", growth:"bg-emerald-400", info:"bg-blue-400", warning:"bg-yellow-400",
};

function Sparkline({ data }: { data:number[] }) {
  const h=28,w=80, max=Math.max(...data);
  const pts = data.map((v,i)=>`${(i/(data.length-1))*w},${h-(v/max)*h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27AE60" />
          <stop offset="100%" stopColor="#27AE60" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" opacity={0.25} />
      <polyline points={pts} stroke="#27AE60" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function CountUp({ target, prefix="", suffix="" }: { target:number; prefix?:string; suffix?:string }) {
  const [val,setVal] = useState(0);
  const rafRef = useRef<number|null>(null);
  useEffect(()=>{
    const dur=1400, t0=performance.now();
    const step=(now:number)=>{
      const p=Math.min((now-t0)/dur,1);
      const e=1-Math.pow(1-p,3);
      setVal(target<10 ? parseFloat((e*target).toFixed(1)) : Math.round(e*target));
      if(p<1) rafRef.current=requestAnimationFrame(step);
    };
    const id=setTimeout(()=>{rafRef.current=requestAnimationFrame(step);},300);
    return ()=>{ clearTimeout(id); if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  },[target]);
  const display = target>=1000 ? val.toLocaleString() : val;
  return <>{prefix}{display}{suffix}</>;
}

export default function DashboardOverview() {
  return (
    <div className="space-y-7">
      <style>{`
        @keyframes fadeSlide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .card-in{animation:fadeSlide 0.5s ease forwards;opacity:0}
      `}</style>

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6rem] tracking-[0.4em] uppercase font-mono mb-1" style={{color:"#27AE60"}}>CLOAK CREW OS</p>
          <h1 className="text-white text-2xl font-black tracking-tight">DOMINATE YOUR MARKET</h1>
          <p className="text-[#8a8a9a] text-sm mt-1">Real-time performance — Crew only</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[rgba(39,174,96,0.2)] bg-[rgba(39,174,96,0.04)]">
          <Zap size={11} style={{color:"#27AE60"}} />
          <span className="text-[0.6rem] tracking-widest uppercase" style={{color:"#27AE60"}}>Bot Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi,idx)=>{
          const Icon=kpi.icon;
          return (
            <div
              key={kpi.label}
              className="card-in bg-[#08080f] border border-[rgba(39,174,96,0.12)] p-5 hover:border-[rgba(39,174,96,0.3)] transition-colors duration-300 group"
              style={{animationDelay:`${idx*80}ms`}}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 flex items-center justify-center border border-[rgba(39,174,96,0.15)] group-hover:border-[rgba(39,174,96,0.35)] transition-colors" style={{background:"rgba(39,174,96,0.06)"}}>
                  <Icon size={16} style={{color:"#27AE60"}} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.up?"text-[#27AE60]":"text-red-400"}`}>
                  {kpi.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                  {kpi.change}
                </div>
              </div>
              <p className="text-white text-2xl font-black mb-1">
                <CountUp target={kpi.raw} prefix={kpi.prefix} suffix={kpi.suffix} />
              </p>
              <p className="text-[#8a8a9a] text-[0.6rem] uppercase tracking-wider mb-3">{kpi.label}</p>
              <Sparkline data={kpi.spark} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Top Clients */}
        <div className="lg:col-span-3 bg-[#08080f] border border-[rgba(39,174,96,0.12)]" style={{animation:"fadeSlide 0.6s 0.2s ease forwards",opacity:0}}>
          <div className="px-5 py-4 border-b border-[rgba(39,174,96,0.08)] flex items-center justify-between">
            <h2 className="text-white text-xs font-bold uppercase tracking-wider">Top Clients</h2>
            <a href="/dashboard/clients" className="text-[0.65rem] tracking-wider uppercase transition-colors" style={{color:"#27AE60"}}
              onMouseEnter={(e)=>{e.currentTarget.style.color="#fff"}}
              onMouseLeave={(e)=>{e.currentTarget.style.color="#27AE60"}}
            >View all →</a>
          </div>
          <div className="divide-y divide-[rgba(39,174,96,0.06)]">
            {topClients.map((c,i)=>(
              <div key={c.name} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[rgba(39,174,96,0.03)] transition-colors">
                <span className="text-[#8a8a9a] text-xs w-4 shrink-0">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 h-0.5 bg-[rgba(255,255,255,0.06)] rounded-full max-w-[90px]">
                      <div className="h-full rounded-full transition-all" style={{width:`${c.pct}%`,background:"#27AE60"}} />
                    </div>
                    <span className="text-[#8a8a9a] text-[0.6rem]">{c.spend}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold" style={{color:c.roasN>=5?"#27AE60":c.roasN>=4?"#fff":"#fbbf24"}}>{c.roas}</p>
                  <span className={`text-[0.55rem] px-1.5 py-0.5 font-medium ${c.status==="Active"?"text-[#27AE60] bg-[rgba(39,174,96,0.1)]":"text-yellow-300 bg-yellow-900/20"}`}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-[#08080f] border border-[rgba(39,174,96,0.12)]" style={{animation:"fadeSlide 0.6s 0.3s ease forwards",opacity:0}}>
          <div className="px-5 py-4 border-b border-[rgba(39,174,96,0.08)] flex items-center gap-2">
            <Activity size={13} style={{color:"#27AE60"}} />
            <h2 className="text-white text-xs font-bold uppercase tracking-wider">Live Activity</h2>
          </div>
          <div className="divide-y divide-[rgba(39,174,96,0.06)]">
            {activity.map((a,i)=>(
              <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${statusDot[a.status]}`} style={a.status==="active"?{boxShadow:"0 0 6px #27AE60"}:{}} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold" dir="rtl">{a.client}</p>
                  <p className="text-[#8a8a9a] text-xs mt-0.5 truncate" dir="rtl">{a.action}</p>
                </div>
                <span className="text-[#8a8a9a] text-[0.6rem] shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue bar chart */}
      <div className="bg-[#08080f] border border-[rgba(39,174,96,0.12)] p-5" style={{animation:"fadeSlide 0.6s 0.4s ease forwards",opacity:0}}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white text-xs font-bold uppercase tracking-wider">Revenue Trend — 2026</h2>
          <span className="text-xs font-bold" style={{color:"#27AE60"}}>+18% MoM</span>
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {[["Jan",64],["Feb",70],["Mar",76],["Apr",79],["May",85],["Jun",91],["Jul",94],["Aug",96],["Sep",97],["Oct",99],["Nov",100],["Dec",100]].map(([m,pct])=>(
            <div key={m as string} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-sm" style={{height:`${(pct as number)*0.7}px`,background:m==="Dec"?"#27AE60":"rgba(39,174,96,0.3)",minHeight:3}} />
              <span className="text-[#8a8a9a] text-[0.5rem] uppercase">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
