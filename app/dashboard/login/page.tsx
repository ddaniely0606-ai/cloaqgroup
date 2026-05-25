"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { initUsers, login, setSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initUsers();
    const session = localStorage.getItem("cloak_session");
    if (session) router.push("/dashboard");
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
      const { user } = result;
      if (user.mustReset || user.password === "0000") {
        setSession(user);
        router.push("/dashboard/reset-password");
      } else {
        setSession(user);
        router.push("/dashboard");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6" dir="rtl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(5,150,105,0.15)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,150,105,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Image src="/logo.jpg" alt="CLOAK" width={160} height={54} className="bg-white px-3 py-1.5 object-contain" />
        </div>

        <div className="border border-[rgba(5,150,105,0.2)] bg-[rgba(13,13,24,0.9)] backdrop-blur-xl p-10">
          <div className="mb-8">
            <p className="text-[#34d399] text-xs tracking-[0.3em] uppercase mb-2">CREW ACCESS</p>
            <h1 className="text-white text-3xl font-black">כניסה לצוות</h1>
            <p className="text-[#8a8a9a] text-sm mt-2">ממשק הניהול הפנימי של CLOAK</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[#8a8a9a] text-xs tracking-[0.2em] uppercase mb-2">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@cloaq.io"
                required
                className="w-full bg-transparent border border-[rgba(5,150,105,0.2)] px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-[#059669] placeholder:text-[#8a8a9a]"
                style={{ direction: "ltr" }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px #050508, 0 0 0 5px rgba(5,150,105,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="block text-[#8a8a9a] text-xs tracking-[0.2em] uppercase mb-2">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent border border-[rgba(5,150,105,0.2)] px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-[#059669] placeholder:text-[#8a8a9a]"
                style={{ direction: "ltr" }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px #050508, 0 0 0 5px rgba(5,150,105,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#059669] text-white font-bold py-3.5 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#15803d] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "מתחבר..." : "כניסה →"}
            </button>
          </form>
        </div>

        <div className="mt-8 border border-[rgba(5,150,105,0.1)] bg-[rgba(5,150,105,0.03)] p-4">
          <p className="text-[#8a8a9a] text-xs text-center mb-3 tracking-wider uppercase">חשבונות הצוות</p>
          <div className="flex flex-col gap-1.5 text-[0.7rem]" style={{ direction: "ltr" }}>
            {[
              { name: "Daniel", email: "daniel@cloaq.io" },
              { name: "Shahar", email: "shahar@cloaq.io" },
              { name: "Staff", email: "staff@cloaq.io" },
            ].map((u) => (
              <div key={u.email} className="flex justify-between text-[#8a8a9a]">
                <span className="text-white font-mono">{u.email}</span>
                <span>default: 0000</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#8a8a9a] text-xs mt-6 tracking-widest uppercase">
          CLOAK · DOMINATE YOUR MARKET
        </p>
      </div>
    </div>
  );
}
