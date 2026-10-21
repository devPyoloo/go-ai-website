import type { Metadata } from "next";
import StorePage from "../../components/StorePage";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "GO AI Store",
  description:
    "GO AI Store is coming soon. Explore and purchase GO AI products and solutions.",
  path: "/store/",
  robots: { index: true, follow: true },
});

export default function StoreRoute() {
  return <StorePage />;
}
