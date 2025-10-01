import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations statically
import home_en from "./en/Home.json";
import home_ar from "./ar/Home.json";
import contact_en from "./en/Contact.json";
import contact_ar from "./ar/Contact.json";
import news_en from "./en/News.json";
import news_ar from "./ar/News.json";

const resources = {
  en: {
    home: home_en,
    contact:contact_en,
    news:news_en,
  },
  ar: {
    home: home_ar,
    contact:contact_ar,
    news:news_ar
  },
  
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: ["home"],
    defaultNS: "home",
  });

export default i18n;
