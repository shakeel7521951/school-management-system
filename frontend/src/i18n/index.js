import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations statically
import home_en from "./en/Home.json";
import home_ar from "./ar/Home.json";
import contact_en from "./en/Contact.json";
import contact_ar from "./ar/Contact.json";
import gallery_en from "./en/Gallery.json";
import gallery_ar from "./ar/Gallery.json";
import middleandhighunit_en from "./en/MiddleAndHighUnit.json";
import middleandhighunit_ar from "./ar/MiddleAndHighUnit.json";
import primaryunit_en from "./en/PrimaryUnit.json";
import primaryunit_ar from "./ar/PrimaryUnit.json";
import specializededucationalunit_en from "./en/SpecializedEducationalUnit.json";
import specializededucationalunit_ar from "./en/SpecializedEducationalUnit.json";
import speechandlanguagetherapy_en from "./en/SpeechAndLanguageTherapy.json";
import speechandlanguagetherapy_ar from "./en/SpeechAndLanguageTherapy.json";
import vocationalandphysicaldepartment_en from "./en/VocationalAndPhysicalDepartment.json";
import vocationalandphysicaldepartment_ar from "./ar/VocationalAndPhysicalDepartment.json";

import nursingdepartment_en from "./en/NursingDepartment.json";
import nursingdepartment_ar from "./en/NursingDepartment.json";

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
import login_en from "./en/Login.json"
import login_ar from "./ar/Login.json"
import signup_en from "./en/Signup.json"
import signup_ar from "./ar/Signup.json"

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
    gallery:gallery_en,
    middleandhighunit:middleandhighunit_en,
    primaryunit:primaryunit_en,
    specializededucationalunit:specializededucationalunit_en,
    speechandlanguagetherapy:speechandlanguagetherapy_en,
    vocationalandphysicaldepartment:vocationalandphysicaldepartment_en,
    nursingdepartment:nursingdepartment_en,
    aboutUs:aboutUs_en,
    directorManager:directorManager_en,
    actingDirector:actingDirector_en,
    faq:faq_en,
    team:team_en,
    login:login_en,
    signup:signup_en,
    team:team_en,
    adminSidebar:adminSidebar_en,
    adminNavbar:adminNavbar_en,
    analytics:analytics_en,
    adminStudentComplaints:adminStudentComplaints_en
  },
  ar: {
    home: home_ar,
    contact:contact_ar,
    gallery:gallery_ar,
    middleandhighunit:middleandhighunit_ar,
    primaryunit:primaryunit_ar,
    specializededucationalunit:specializededucationalunit_ar,
    speechandlanguagetherap:speechandlanguagetherapy_ar,
    vocationalandphysicaldepartment:vocationalandphysicaldepartment_ar,
    nursingdepartment:nursingdepartment_ar,
    aboutUs:aboutUs_ar,
    directorManager:directorManager_ar,
    actingDirector:actingDirector_ar,
    faq:faq_ar,
    team:team_ar,
    login:login_ar,
    signup:signup_ar,
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
