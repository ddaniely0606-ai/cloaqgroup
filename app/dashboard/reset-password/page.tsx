"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSession, updatePassword, clearSession } from "@/lib/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/dashboard/login");
      return;
    }
    setUserName(session.name);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }
    if (newPassword === "0000") {
      setError("לא ניתן לשמור את הסיסמה הברירת מחדל.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const session = getSession();
      if (!session) { router.push("/dashboard/login"); return; }
      updatePassword(session.id, newPassword);
      router.push("/dashboard");
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
            <div className="inline-flex items-center gap-2 bg-[rgba(5,150,105,0.1)] border border-[rgba(5,150,105,0.3)] px-3 py-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span className="text-[#34d399] text-xs tracking-widest uppercase font-mono">FIRST LOGIN</span>
            </div>
            <h1 className="text-white text-2xl font-black">יצירת סיסמה חדשה</h1>
            {userName && (
              <p className="text-[#8a8a9a] text-sm mt-2">ברוך הבא, <span className="text-white font-semibold">{userName}</span>. צור סיסמה אישית להמשך.</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[#8a8a9a] text-xs tracking-[0.2em] uppercase mb-2">סיסמה חדשה</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="לפחות 6 תווים"
                required
                className="w-full bg-transparent border border-[rgba(5,150,105,0.2)] px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-[#059669] placeholder:text-[#8a8a9a]"
                style={{ direction: "ltr" }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px #050508, 0 0 0 5px rgba(5,150,105,0.4)"; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="block text-[#8a8a9a] text-xs tracking-[0.2em] uppercase mb-2">אימות סיסמה</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="חזור על הסיסמה"
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
              {loading ? "שומר..." : "שמור סיסמה →"}
            </button>

            <button
              type="button"
              onClick={() => { clearSession(); router.push("/dashboard/login"); }}
              className="text-[#8a8a9a] text-xs hover:text-white transition-colors text-center"
            >
              ← חזרה להתחברות
            </button>
          </form>
        </div>

        <p className="text-center text-[#8a8a9a] text-xs mt-6 tracking-widest uppercase">
          CLOAK · DOMINATE YOUR MARKET
        </p>
      </div>
    </div>
  );
}
