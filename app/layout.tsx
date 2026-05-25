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
  title: "CloaqGroup | סוכנות שיווק שמשלטת בשוק",
  description:
    "CloaqGroup — הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אסטרטגיית מותג, פרסום ממומן, SEO, יצירת תוכן ווידאו. 200+ מותגים. תוצאות מוכחות.",
  keywords: [
    "סוכנות שיווק דיגיטלי",
    "סוכנות פרסום ישראל",
    "אסטרטגיית מותג",
    "CloaqGroup",
    "פרסום ממומן",
    "SEO ישראל",
    "שיווק ברשתות חברתיות",
    "שיווק וידאו",
    "marketing agency israel",
    "digital marketing",
  ],
  authors: [{ name: "CloaqGroup" }],
  creator: "CloaqGroup",
  openGraph: {
    title: "CloaqGroup | סוכנות שיווק שמשלטת בשוק",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. 200+ מותגים. תוצאות מוכחות.",
    type: "website",
    locale: "he_IL",
    siteName: "CloaqGroup",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloaqGroup | סוכנות שיווק שמשלטת בשוק",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${syne.variable} ${heebo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
