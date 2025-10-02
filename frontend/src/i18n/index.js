import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import home_en from "./en/Home.json";
import home_ar from "./ar/Home.json";
import contact_en from "./en/Contact.json";
import contact_ar from "./ar/Contact.json";
import aboutUs_en from "./en/AboutUs.json";
import aboutUs_ar from "./ar/AboutUs.json";
import directorManager_en from "./en/Directormanager.json";
import directorManager_ar from "./ar/Directormanager.json";
import actingDirector_en from "./en/Actingdirector.json";
import actingDirector_ar from "./ar/Actingdirector.json";
import faq_en from "./en/FAQs.json";
import faq_ar from "./ar/FAQs.json";
import team_en from "./en/Team.json";
import team_ar from "./ar/Team.json";
import teacherNavbar_en from "./en/TeacherNavbar.json";
import teacherNavbar_ar from "./ar/TeacherNavbar.json";
import teacherSidebar_en from "./en/TeacherSidebar.json";
import teacherSidebar_ar from "./ar/TeacherSidebar.json";
import responseForm_en from "./en/ResponseForm.json";
import responseForm_ar from "./ar/ResponseForm.json";
import registrationForm_en from "./en/RegistrationForm.json"
import registrationForm_ar from "./ar/RegistrationForm.json"


const resources = {
  en: {
    home: home_en,
    contact: contact_en,
    aboutUs: aboutUs_en,
    directorManager: directorManager_en,
    actingDirector: actingDirector_en,
    faq: faq_en,
    team: team_en,
    teacherNavbar: teacherNavbar_en,
    teacherSidebar: teacherSidebar_en,
    responseForm: responseForm_en,
    registrationForm: registrationForm_en
  },
  ar: {
    home: home_ar,
    contact: contact_ar,
    aboutUs: aboutUs_ar,
    directorManager: directorManager_ar,
    actingDirector: actingDirector_ar,
    faq: faq_ar,
    team: team_ar,
    teacherNavbar: teacherNavbar_ar,
    teacherSidebar: teacherSidebar_ar,
    responseForm: responseForm_ar,
    registrationForm: registrationForm_ar
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: [
      "home",
      "contact",
      "aboutUs",
      "directorManager",
      "actingDirector",
      "faq",
      "team",
      "teacherNavbar",
      "teacherSidebar",
      "responseForm",
      "registrationForm"

    ],
    defaultNS: "home",
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;