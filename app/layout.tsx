import type { Metadata } from "next";
import { Syne, Heebo, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Mythos Agency",
  "description": "סוכנות שיווק דיגיטלי פרימיום לשוק הישראלי. אסטרטגיית מותג, פרסום ממומן, SEO, תוכן ווידאו.",
  "url": "https://cloaqgroup-q4dt0c8no-ddaniely0606-ais-projects.vercel.app",
  "areaServed": "IL",
  "knowsLanguage": ["he", "en"],
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 4 },
  "slogan": "אנחנו הופכים מותגים לבלתי ניתנים להתעלמות",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": ["Hebrew", "English"],
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
  },
};

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
  title: "Mythos Agency | סוכנות שיווק שמשלטת בשוק",
  description:
    "Mythos Agency — הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אסטרטגיית מותג, פרסום ממומן, SEO, יצירת תוכן ווידאו. 200+ מותגים. תוצאות מוכחות.",
  keywords: [
    "סוכנות שיווק דיגיטלי",
    "סוכנות פרסום ישראל",
    "אסטרטגיית מותג",
    "Mythos Agency",
    "פרסום ממומן",
    "SEO ישראל",
    "שיווק ברשתות חברתיות",
    "שיווק וידאו",
    "marketing agency israel",
    "digital marketing",
  ],
  authors: [{ name: "Mythos Agency" }],
  creator: "Mythos Agency",
  openGraph: {
    title: "Mythos Agency | סוכנות שיווק שמשלטת בשוק",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. 200+ מותגים. תוצאות מוכחות.",
    type: "website",
    locale: "he_IL",
    siteName: "Mythos Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mythos Agency | סוכנות שיווק שמשלטת בשוק",
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
    <html lang="he" dir="rtl" className={cn(syne.variable, heebo.variable, "font-sans", geist.variable)} style={{ colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#050508" />
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
