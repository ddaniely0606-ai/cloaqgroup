"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initUsers, login, setSession } from "@/lib/auth";
import { Shield, Eye, EyeOff } from "lucide-react";

const STATS = [
  { value: "23", label: "לקוחות פעילים" },
  { value: "4.8x", label: "ממוצע ROAS" },
  { value: "₪284K", label: "הכנסה חודשית" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initUsers();
    if (localStorage.getItem("cloak_session")) router.push("/dashboard");
    setMounted(true);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const result = login(email, password);
      if ("error" in result) {
        setError(result.error);
        setLoading(false);
        return;
      }
      setSession(result.user);
      if (result.user.mustReset || result.user.password === "0000") {
        router.push("/dashboard/reset-password");
      } else {
        router.push("/dashboard");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#030306] flex overflow-hidden" dir="ltr">
      <style>{`
        @keyframes hoodFloat {
          0%,100%{ transform:translateY(0px) scale(1); }
          50%{ transform:translateY(-18px) scale(1.02); }
        }
        @keyframes hoodGlow {
          0%,100%{ opacity:0.55; }
          50%{ opacity:0.9; }
        }
        @keyframes scanMove {
          0%{ transform:translateY(0); }
          100%{ transform:translateY(60px); }
        }
        @keyframes fadeUp {
          from{ opacity:0; transform:translateY(24px); }
          to{ opacity:1; transform:translateY(0); }
        }
        @keyframes borderPulse {
          0%,100%{ opacity:0.3; }
          50%{ opacity:0.7; }
        }
      `}</style>

      {/* ── LEFT PANEL — The Hood ─────────────────────────── */}
      <div className="hidden lg:flex flex-col w-[58%] relative bg-[#030306] overflow-hidden">

        {/* Scanlines */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(39,174,96,0.025) 3px, rgba(39,174,96,0.025) 4px)",
          animation:"scanMove 2s linear infinite",
        }} />

        {/* Grid */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(39,174,96,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(39,174,96,0.05) 1px,transparent 1px)",
          backgroundSize:"70px 70px",
        }} />

        {/* Right border glow */}
        <div style={{
          position:"absolute", top:0, right:0, width:"1px", height:"100%", zIndex:5,
          background:"linear-gradient(to bottom,transparent,rgba(39,174,96,0.6) 30%,rgba(74,222,128,0.8) 50%,rgba(39,174,96,0.6) 70%,transparent)",
          animation:"borderPulse 3s ease-in-out infinite",
        }} />

        {/* Corner marks */}
        {[["top-6 left-6","border-t border-l"],["top-6 right-8","border-t border-r"],["bottom-6 left-6","border-b border-l"],["bottom-6 right-8","border-b border-r"]].map(([pos,border])=>(
          <div key={pos} className={`absolute ${pos} ${border} border-[rgba(39,174,96,0.4)] w-5 h-5 z-10`} />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-14 py-12">

          {/* Top label */}
          <div className="flex items-center gap-3" style={{ animation: mounted ? "fadeUp 0.6s ease forwards" : "none", opacity: 0 }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#27AE60]" style={{ boxShadow:"0 0 8px #27AE60" }} />
            <span className="text-[#27AE60] text-[0.6rem] tracking-[0.4em] uppercase font-mono">CLASSIFIED · CREW ONLY</span>
          </div>

          {/* Hood + glow — hero visual */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Glow orb */}
            <div style={{
              position:"absolute",
              width:460, height:460,
              borderRadius:"50%",
              background:"radial-gradient(ellipse at center, rgba(39,174,96,0.35) 0%, rgba(39,174,96,0.12) 40%, transparent 70%)",
              animation:"hoodGlow 3.5s ease-in-out infinite",
            }} />

            {/* Secondary outer ring */}
            <div style={{
              position:"absolute",
              width:580, height:580,
              borderRadius:"50%",
              background:"radial-gradient(ellipse at center, transparent 50%, rgba(39,174,96,0.06) 70%, transparent 80%)",
            }} />

            {/* The Hood */}
            <img
              src="/hood.svg"
              alt=""
              style={{
                width:340, height:400,
                objectFit:"contain",
                animation:"hoodFloat 4.5s ease-in-out infinite",
                filter:"drop-shadow(0 0 80px rgba(39,174,96,0.7)) drop-shadow(0 0 20px rgba(39,174,96,0.9))",
                position:"relative", zIndex:2,
              }}
            />

            {/* "ENTER THE CLOAK" overlay text */}
            <div style={{
              position:"absolute",
              bottom:-30, left:"50%",
              transform:"translateX(-50%)",
              textAlign:"center",
              zIndex:3,
            }}>
              <p className="text-[#27AE60] text-[0.6rem] tracking-[0.5em] uppercase font-mono" style={{ animation: mounted ? "fadeUp 0.8s 0.4s ease forwards" : "none", opacity:0 }}>
                THE SHADOW OPERATES
              </p>
            </div>
          </div>

          {/* Main copy */}
          <div style={{ animation: mounted ? "fadeUp 0.8s 0.2s ease forwards" : "none", opacity:0 }}>
            <h1 className="text-white font-black leading-none mb-3" style={{ fontSize:"clamp(2.8rem,5vw,4rem)", letterSpacing:"-0.02em" }}>
              הצללים<br />
              <span style={{ color:"#27AE60" }}>שולטים</span><br />
              בשוק.
            </h1>
            <p className="text-[#8a8a9a] text-sm leading-relaxed max-w-[340px]">
              בעוד המתחרים נאבקים על תשומת לב — CLOAK פועלת מהצל ומבטיחה שהמותג שלכם בלתי ניתן להתעלמות.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8 pt-6 border-t border-[rgba(39,174,96,0.12)]" style={{ animation: mounted ? "fadeUp 0.8s 0.3s ease forwards" : "none", opacity:0 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-white text-xl font-black" style={{ color:"#27AE60" }}>{s.value}</p>
                <p className="text-[#8a8a9a] text-[0.6rem] uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ───────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative bg-[#06060e]">

        {/* Subtle top glow */}
        <div style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:400, height:300,
          background:"radial-gradient(ellipse at top, rgba(39,174,96,0.1) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />

        <div className="w-full max-w-[380px]" style={{ animation: mounted ? "fadeUp 0.7s 0.1s ease forwards" : "none", opacity:0 }}>

          {/* Logo mark */}
          <div className="flex items-center gap-3 mb-10">
            <img src="/hood.svg" alt="CLOAK" width={36} height={42} style={{ filter:"drop-shadow(0 0 12px rgba(39,174,96,0.8))" }} />
            <div>
              <p className="text-white text-lg font-black tracking-[0.15em]">CLOAK</p>
              <p className="text-[#27AE60] text-[0.55rem] tracking-[0.35em] uppercase">CREW OS</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={12} className="text-[#27AE60]" />
              <span className="text-[#27AE60] text-[0.6rem] tracking-[0.3em] uppercase font-mono">AUTHORIZED ACCESS</span>
            </div>
            <h2 className="text-white text-2xl font-black" dir="rtl">כניסה לצוות</h2>
            <p className="text-[#8a8a9a] text-sm mt-1.5" dir="rtl">ממשק ניהול פנימי · CLOAK</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[#8a8a9a] text-[0.6rem] tracking-[0.25em] uppercase mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="your@mythos.agency"
                required
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(39,174,96,0.2)] px-4 py-3 text-white text-sm outline-none placeholder:text-[#4a4a5a] transition-all duration-200"
                onFocus={(e)=>{ e.currentTarget.style.borderColor="#27AE60"; e.currentTarget.style.boxShadow="0 0 0 3px #06060e,0 0 0 5px rgba(39,174,96,0.35)"; }}
                onBlur={(e)=>{ e.currentTarget.style.borderColor="rgba(39,174,96,0.2)"; e.currentTarget.style.boxShadow="none"; }}
              />
            </div>

            <div>
              <label className="block text-[#8a8a9a] text-[0.6rem] tracking-[0.25em] uppercase mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(39,174,96,0.2)] px-4 py-3 pr-11 text-white text-sm outline-none placeholder:text-[#4a4a5a] transition-all duration-200"
                  onFocus={(e)=>{ e.currentTarget.style.borderColor="#27AE60"; e.currentTarget.style.boxShadow="0 0 0 3px #06060e,0 0 0 5px rgba(39,174,96,0.35)"; }}
                  onBlur={(e)=>{ e.currentTarget.style.borderColor="rgba(39,174,96,0.2)"; e.currentTarget.style.boxShadow="none"; }}
                />
                <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a9a] hover:text-white transition-colors">
                  {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-400 text-xs bg-red-900/15 border border-red-800/30 px-3 py-2.5" dir="rtl">
                <span className="shrink-0 mt-0.5">⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
              style={{ background:"#27AE60" }}
              onMouseEnter={(e)=>{ if(!loading){ e.currentTarget.style.background="#1e8f4e"; e.currentTarget.style.boxShadow="0 0 30px rgba(39,174,96,0.5)"; e.currentTarget.style.transform="translateY(-1px)"; }}}
              onMouseLeave={(e)=>{ e.currentTarget.style.background="#27AE60"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  מתחבר...
                </span>
              ) : "ENTER THE CLOAK →"}
            </button>
          </form>

          <p className="text-[#8a8a9a] text-[0.6rem] text-center mt-8 tracking-[0.2em] uppercase">
            CLOAK · DOMINATE YOUR MARKET
          </p>
        </div>
      </div>
    </div>
  );
}
