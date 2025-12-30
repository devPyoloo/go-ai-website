import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";

export const metadata: Metadata = {
  title: "GO-AI",
  description: "GO-AI - Advanced AI Solutions",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

