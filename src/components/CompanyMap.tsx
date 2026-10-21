import { MapPin, Navigation } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { RevealItem, RevealStagger } from "./RevealStagger";
import { OfficeVectorMap } from "./OfficeVectorMap";

const MAP_LINK =
  "https://maps.google.com/?q=Room+923,+9/F,+Liven+House,+61-63+King+Yip+Street,+Kwun+Tong,+Kowloon,+HK";

const CompanyMap = ({ t }: Pick<FooterProps, "t">) => {
  return (
    <section
      id="location"
      aria-label="Office location map"
      className="section-shell relative overflow-hidden bg-background px-4"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-sky-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealStagger className="mb-12 lg:mb-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealItem className="lg:col-span-8">
              <div className="flex gap-5 md:gap-6">
                <div
                  className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[8rem]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <span className="section-eyebrow mb-0">{t("contact.mapEyebrow")}</span>
                  <h2 className="section-title mt-3 max-w-2xl">{t("contact.mapTitle")}</h2>
                </div>
              </div>
            </RevealItem>

            <RevealItem className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md md:p-6">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {t("contact.mapOfficeLabel")}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("contact.address")}
                </p>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-chip mt-4"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  {t("contact.mapOpen")}
                </a>
              </div>
            </RevealItem>
          </div>
        </RevealStagger>

        <RevealItem>
          <div className="relative overflow-hidden rounded-[24px] border border-border bg-card/30 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm md:p-3">
            <div
              className="pointer-events-none absolute inset-x-10 top-0 h-20 bg-gradient-to-b from-white/[0.05] to-transparent"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[18px] border border-border bg-card">
              <OfficeVectorMap
                mapLink={MAP_LINK}
                mapOpenLabel={String(t("contact.mapOpen"))}
                officeLabel={String(t("contact.mapOfficeLabel"))}
                livePinLabel={String(t("contact.mapLivePin"))}
                addressLabel={String(t("contact.address"))}
              />
              <div
                className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/[0.08]"
                aria-hidden
              />
            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  );
};

export default CompanyMap;