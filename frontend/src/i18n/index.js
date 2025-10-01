import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations statically
import home_en from "./en/Home.json";
import home_ar from "./ar/Home.json";
import contact_en from "./en/Contact.json";
import contact_ar from "./ar/Contact.json";

import aboutUs_en from "./en/AboutUs.json"
import aboutUs_ar from "./ar/AboutUs.json"
import directorManager_en from "./en/Directormanager.json"
import directorManager_ar from "./ar/Directormanager.json"
import actingDirector_en from "./en/Actingdirector.json"
import actingDirector_ar from "./ar/Actingdirector.json"
import faq_en from "./en/FAQs.json"
import faq_ar from "./ar/FAQs.json"
import team_en from "./en/Team.json"
import team_ar from "./ar/Team.json"
import adminSidebar_ar from "./ar/AdminSidebar.json"
import adminSidebar_en from "./en/AdminSidebar.json"
import adminNavbar_en from "./en/AdminNavbar.json"
import adminNavbar_ar from "./ar/AdminNavbar.json"
import analytics_en from "./en/Analytics.json"
import analytics_ar from "./ar/Analytics.json"
import adminStudentComplaints_en from "./en/AdminStudentComplaints.json"
import adminStudentComplaints_ar from "./ar/AdminStudentComplaints.json"

 
const resources = {
  en: {
    home: home_en,
    contact:contact_en,
    aboutUs:aboutUs_en,
    directorManager:directorManager_en,
    actingDirector:actingDirector_en,
    faq:faq_en,
    team:team_en,
    adminSidebar:adminSidebar_en,
    adminNavbar:adminNavbar_en,
    analytics:analytics_en,
    adminStudentComplaints:adminStudentComplaints_en
  },
  ar: {
    home: home_ar,
    contact:contact_ar,
    aboutUs:aboutUs_ar,
    directorManager:directorManager_ar,
    actingDirector:actingDirector_ar,
    faq:faq_ar,
    team:team_ar,
    adminSidebar:adminSidebar_ar,
    adminNavbar:adminNavbar_ar,
    analytics:analytics_ar,
    adminStudentComplaints:adminStudentComplaints_ar


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
