"use client";
import { useState } from "react";
import { Send, Search, Phone, MessageCircle, Circle, CheckCheck, Check, Clock } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  company: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: "online" | "away" | "offline";
  phone: string;
}

interface Message {
  id: number;
  text: string;
  direction: "in" | "out";
  time: string;
  read: boolean;
}

const contacts: Contact[] = [
  { id: 1, name: "Rotem Cohen", company: "Obsidian Spirits", lastMsg: "מתי יוצא הדוח החודשי?", time: "10:24", unread: 2, status: "online", phone: "+972-52-111-2233" },
  { id: 2, name: "Avi Mizrahi", company: "Apex Realty", lastMsg: "הקמפיין נראה מעולה!", time: "09:41", unread: 0, status: "online", phone: "+972-54-222-3344" },
  { id: 3, name: "Noa Shapira", company: "NovaTech Labs", lastMsg: "צריך לדבר על תקציב Q3", time: "אתמול", unread: 1, status: "away", phone: "+972-50-333-4455" },
  { id: 4, name: "Gal Ben-David", company: "Meridian Apparel", lastMsg: "אשלח לך את הלוגו מחר", time: "אתמול", unread: 0, status: "offline", phone: "+972-53-444-5566" },
  { id: 5, name: "Maya Levy", company: "Solstice Beauty", lastMsg: "האם הקריאייטיב מוכן?", time: "15/05", unread: 0, status: "offline", phone: "+972-52-555-6677" },
  { id: 6, name: "Eyal Katz", company: "Ironclad Fitness", lastMsg: "שלחתי לך את הבריף", time: "12/05", unread: 0, status: "online", phone: "+972-54-666-7788" },
];

const threadMessages: Record<number, Message[]> = {
  1: [
    { id: 1, text: "שלום! הכל בסדר עם הקמפיינים?", direction: "in", time: "10:10", read: true },
    { id: 2, text: "כן, הכל רץ מצוין! ה-ROAS עלה ל-5.8x השבוע", direction: "out", time: "10:12", read: true },
    { id: 3, text: "מדהים! מתי יוצא הדוח החודשי?", direction: "in", time: "10:24", read: false },
    { id: 4, text: "מתי יוצא הדוח החודשי?", direction: "in", time: "10:24", read: false },
  ],
  2: [
    { id: 1, text: "ראיתי את הנתונים מהשבוע — מרשים מאוד", direction: "in", time: "09:35", read: true },
    { id: 2, text: "תודה! עבדנו קשה על הטרגוט", direction: "out", time: "09:38", read: true },
    { id: 3, text: "הקמפיין נראה מעולה!", direction: "in", time: "09:41", read: true },
  ],
  3: [
    { id: 1, text: "היי, יש לי שאלה לגבי תקציב Q3", direction: "in", time: "אתמול 14:20", read: true },
    { id: 2, text: "כמובן, מה השאלה?", direction: "out", time: "אתמול 15:10", read: true },
    { id: 3, text: "צריך לדבר על תקציב Q3", direction: "in", time: "אתמול 15:30", read: false },
  ],
};

const statusColor = { online: "#4ade80", away: "#fbbf24", offline: "#8a8a9a" };

export default function WhatsAppPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<number, Message[]>>(threadMessages);

  const selected = contacts.find((c) => c.id === selectedId)!;
  const thread = messages[selectedId] || [];
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
  );

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now(), text: input.trim(), direction: "out", time: "עכשיו", read: false };
    setMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), newMsg] }));
    setInput("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-white text-2xl font-black tracking-tight">WHATSAPP INBOX</h1>
        <p className="text-[#8a8a9a] text-sm mt-1">Client communications hub</p>
      </div>

      <div className="bg-[#0a0a12] border border-[rgba(22,163,74,0.15)] flex" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
        {/* Sidebar */}
        <div className="w-72 border-r border-[rgba(22,163,74,0.1)] flex flex-col shrink-0">
          <div className="p-3 border-b border-[rgba(22,163,74,0.08)]">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-[rgba(22,163,74,0.05)] border border-[rgba(22,163,74,0.12)] pl-8 pr-3 py-2 text-white text-xs outline-none placeholder:text-[#8a8a9a] focus:border-[rgba(22,163,74,0.3)] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[rgba(22,163,74,0.05)]">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-4 py-3.5 transition-colors flex items-start gap-3 ${selectedId === c.id ? "bg-[rgba(22,163,74,0.1)]" : "hover:bg-[rgba(22,163,74,0.04)]"}`}
              >
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 bg-[rgba(22,163,74,0.15)] border border-[rgba(22,163,74,0.2)] flex items-center justify-center">
                    <span className="text-[#4ade80] text-sm font-bold">{c.name[0]}</span>
                  </div>
                  <Circle
                    size={8}
                    className="absolute -bottom-0.5 -right-0.5 fill-current"
                    style={{ color: statusColor[c.status] }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-xs font-semibold truncate">{c.name}</p>
                    <span className="text-[#8a8a9a] text-[0.6rem] shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[#8a8a9a] text-[0.65rem] mt-0.5 truncate">{c.company}</p>
                  <p className="text-[#8a8a9a] text-[0.65rem] truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <div className="w-4 h-4 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white text-[0.5rem] font-bold">{c.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-[rgba(22,163,74,0.1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 bg-[rgba(22,163,74,0.15)] border border-[rgba(22,163,74,0.2)] flex items-center justify-center">
                  <span className="text-[#4ade80] text-sm font-bold">{selected.name[0]}</span>
                </div>
                <Circle size={8} className="absolute -bottom-0.5 -right-0.5 fill-current" style={{ color: statusColor[selected.status] }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{selected.name}</p>
                <p className="text-[#8a8a9a] text-[0.65rem]">{selected.company} · {selected.status}</p>
              </div>
            </div>
            <button className="text-[#8a8a9a] hover:text-[#4ade80] transition-colors">
              <Phone size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3" dir="rtl">
            {thread.map((msg) => (
              <div key={msg.id} className={`flex ${msg.direction === "out" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[70%] px-4 py-2.5 text-xs leading-relaxed ${
                    msg.direction === "out"
                      ? "bg-[#16a34a] text-white"
                      : "bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.12)] text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.direction === "out" ? "justify-start" : "justify-end"}`}>
                    <span className="text-[0.55rem] opacity-70">{msg.time}</span>
                    {msg.direction === "out" && (
                      msg.read
                        ? <CheckCheck size={10} className="opacity-70" />
                        : <Check size={10} className="opacity-70" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[rgba(22,163,74,0.1)] flex items-center gap-3" dir="rtl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
              placeholder="כתוב הודעה..."
              className="flex-1 bg-[rgba(22,163,74,0.05)] border border-[rgba(22,163,74,0.15)] px-4 py-2.5 text-white text-sm outline-none focus:border-[rgba(22,163,74,0.35)] transition-colors placeholder:text-[#8a8a9a]"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-10 h-10 bg-[#16a34a] flex items-center justify-center hover:bg-[#15803d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
