import type { Metadata } from "next";
import { Syne, Heebo, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "@id": "https://mythos-agency.vercel.app",
  "name": "Mythos Agency",
  "alternateName": ["Mythos", "Mythos Marketing"],
  "description": "סוכנות שיווק דיגיטלי פרימיום לשוק הישראלי. אנחנו הופכים מותגים לבלתי ניתנים להתעלמות עם אסטרטגיית מותג, פרסום ממומן, SEO, תוכן ווידאו, וניהול מדיה חברתית.",
  "url": "https://mythos-agency.vercel.app",
  "image": {
    "@type": "ImageObject",
    "url": "https://mythos-agency.vercel.app/og-image.png",
    "width": 1200,
    "height": 630
  },
  "areaServed": {
    "@type": "Country",
    "name": "IL"
  },
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "Hebrew",
      "alternateName": "he"
    },
    {
      "@type": "Language",
      "name": "English",
      "alternateName": "en"
    }
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 4
  },
  "slogan": "אנחנו הופכים מותגים למיתוסים",
  "tagline": "Brands Become Myths",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "contactOption": ["TollFree", "Email"],
    "availableLanguage": ["Hebrew", "English"],
    "areaServed": "IL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.linkedin.com/company/mythos-agency",
    "https://www.instagram.com/mythos.agency"
  ],
  "founder": {
    "@type": "Person",
    "name": "Mythos Agency Team"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IL",
    "addressRegion": "IL"
  },
  "priceRange": "₪₪₪",
  "foundingDate": "2024"
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
  metadataBase: new URL("https://mythos-agency.vercel.app"),
  title: "Mythos Agency | סוכנות שיווק דיגיטלי לשוק הישראלי",
  description:
    "Mythos Agency — הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אנחנו הופכים מותגים לבלתי ניתנים להתעלמות עם אסטרטגיית מותג, פרסום ממומן, SEO, וווידאו. 200+ מותגים מדווחים עם תוצאות מוכחות.",
  keywords: [
    "סוכנות שיווק דיגיטלי ישראל",
    "סוכנות פרסום ישראל",
    "אסטרטגיית מותג",
    "Mythos Agency",
    "סוכנות שיווק פרימיום",
    "פרסום ממומן Google",
    "פרסום ממומן Facebook",
    "SEO ישראל",
    "שיווק ברשתות חברתיות",
    "יצירת תוכן וידאו",
    "ניהול מדיה חברתית",
    "digital marketing agency",
    "digital marketing israel",
    "brand strategy",
    "content marketing",
    "video marketing",
    "social media marketing"
  ],
  authors: [{ name: "Mythos Agency", url: "https://mythos-agency.vercel.app" }],
  creator: "Mythos Agency",
  applicationName: "Mythos Agency",
  category: "Marketing Agency",
  classification: "Marketing & Advertising",
  openGraph: {
    title: "Mythos Agency | סוכנות שיווק שמשלטת בשוק",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אנחנו הופכים מותגים לבלתי ניתנים להתעלמות. 200+ מותגים. תוצאות מוכחות.",
    type: "website",
    locale: "he_IL",
    alternateLocale: ["en_US"],
    siteName: "Mythos Agency",
    url: "https://mythos-agency.vercel.app",
    images: [
      {
        url: "https://mythos-agency.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mythos Agency - סוכנות שיווק דיגיטלי",
        type: "image/png"
      },
      {
        url: "https://mythos-agency.vercel.app/og-image-square.png",
        width: 800,
        height: 800,
        alt: "Mythos Agency Logo",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mythos Agency | סוכנות שיווק שמשלטת בשוק",
    description: "הכוח השיווקי שמאחורי מותגים שמשלטים בשוק שלהם. אנחנו הופכים מותגים לבלתי ניתנים להתעלמות.",
    images: ["https://mythos-agency.vercel.app/og-image.png"],
    creator: "@mythos_agency"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },
    bingbot: {
      index: true,
      follow: true
    }
  },
  verification: {
    google: "",
    other: {
      "msvalidate.01": "",
      "yandex-verification": ""
    }
  },
  alternates: {
    canonical: "https://mythos-agency.vercel.app",
    languages: {
      "he-IL": "https://mythos-agency.vercel.app",
      "en": "https://mythos-agency.vercel.app/en"
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mythos Agency"
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={cn(syne.variable, heebo.variable, "font-sans", geist.variable)} style={{ colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#050508" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="description" content="סוכנות שיווק דיגיטלי פרימיום לשוק הישראלי. אנחנו הופכים מותגים לבלתי ניתנים להתעלמות." />
        <meta name="language" content="Hebrew" />
        <meta name="audience" content="business,marketing" />
        <meta name="target_audience" content="Israeli companies, startups, e-commerce, SaaS" />
        <link rel="alternate" hrefLang="he-IL" href="https://mythos-agency.vercel.app" />
        <link rel="alternate" hrefLang="en" href="https://mythos-agency.vercel.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://mythos-agency.vercel.app" />
        <meta name="revisit-after" content="7 days" />
        <meta name="og:image:alt" content="Mythos Agency - סוכנות שיווק דיגיטלי" />
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
