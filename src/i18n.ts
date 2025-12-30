import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zh from "./locales/zh.json";

if (typeof window !== "undefined") {
  i18n
    .use(LanguageDetector) // Detect user's language
    .use(initReactI18next) // Bind i18n to React
    .init({
      resources: {
        en: { translation: en },
        zh: { translation: zh },
      },
      fallbackLng: "en", // Default language
      interpolation: { escapeValue: false }, // React handles escaping
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
} else {
  // Server-side initialization (minimal)
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    lng: "en",
  });
}

export default i18n;
