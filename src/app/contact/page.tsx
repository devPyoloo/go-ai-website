import type { Metadata } from "next";
import ContactPage from "../../components/ContactPage";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact GO-AI to discuss AI solutions for inspection, safety, and intelligent operational workflows.",
  path: "/contact/",
  robots: { index: true, follow: true },
});

export default function ContactRoute() {
  return <ContactPage />;
}
