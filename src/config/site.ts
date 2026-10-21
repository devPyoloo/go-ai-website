/** Product store — defaults to on-site coming soon until NEXT_PUBLIC_STORE_URL is set */
export const GO_AI_STORE_URL =
  process.env.NEXT_PUBLIC_STORE_URL ?? "/store";

export function isExternalStoreLink(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
