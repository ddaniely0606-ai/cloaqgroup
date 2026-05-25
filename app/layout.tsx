import type { Metadata } from "next";
import { Syne, Heebo } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CloaqGroup | גורמים למותגים להיות בלתי ניתנים להתעלמות",
  description:
    "CloaqGroup — הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אסטרטגיה, פרסום, תוכן, SEO, וידאו ועוד.",
  keywords: ["סוכנות שיווק", "דיגיטל", "אסטרטגיית מותג", "CloaqGroup", "פרסום ממומן", "SEO"],
  openGraph: {
    title: "CloaqGroup | גורמים למותגים להיות בלתי ניתנים להתעלמות",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${syne.variable} ${heebo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
