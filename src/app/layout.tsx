import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";

export const metadata: Metadata = {
  title: {
    default: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    template: "%s | GO-AI",
  },
  description: "GO AI empowers businesses with cutting-edge AI solutions including computer vision, natural language processing, and real-time video analytics. Transform visual and language data into actionable intelligence.",
  keywords: [
    "AI solutions",
    "artificial intelligence",
    "computer vision",
    "machine learning",
    "video analytics",
    "OCR",
    "document processing",
    "robotic vision",
    "AI automation",
    "visual intelligence",
    "NLP",
    "natural language processing",
    "edge AI",
    "AI platform",
  ],
  authors: [{ name: "GO-AI" }],
  creator: "GO-AI",
  publisher: "GO-AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://go-ai.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "zh": "/",
      "zh-CN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GO-AI",
    title: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    description: "Transform your business with cutting-edge AI solutions. Computer vision, video analytics, OCR, and intelligent automation powered by advanced AI technology.",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "GO-AI - AI Visual Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    description: "Transform your business with cutting-edge AI solutions. Computer vision, video analytics, OCR, and intelligent automation.",
    images: ["/images/thumbnail.png"],
    creator: "@goai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/logo.png",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://go-ai.com";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GO-AI",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "description": "GO AI empowers businesses with cutting-edge AI solutions including computer vision, natural language processing, and real-time video analytics.",
    "sameAs": [
      // Add your social media URLs here
      // "https://www.linkedin.com/company/go-ai",
      // "https://twitter.com/goai",
      // "https://www.facebook.com/goai",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      // "email": "contact@go-ai.com",
      // "telephone": "+1-XXX-XXX-XXXX",
    },
    "address": {
      "@type": "PostalAddress",
      // "addressCountry": "US",
      // "addressLocality": "City",
      // "addressRegion": "State",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GO-AI",
    "url": siteUrl,
    "description": "AI Visual Intelligence & Advanced AI Solutions Platform",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

