import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import home_en from "./en/Home.json";
import home_ar from "./ar/Home.json";

const resources = {
  en: {
    home: home_en,
    dashboard: dashboard_en,
  },
  ar: {
    home: home_ar,
    dashboard: dashboard_ar,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: ["home"],
    defaultNS: "home",
  });

export default i18n;
