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
import login_en from "./en/Login.json";
import login_ar from "./ar/Login.json";
import signup_en from "./en/Signup.json";
import signup_ar from "./ar/Signup.json";

import adminSidebar_ar from "./ar/AdminSidebar.json";
import adminSidebar_en from "./en/AdminSidebar.json";
import adminNavbar_en from "./en/AdminNavbar.json";
import adminNavbar_ar from "./ar/AdminNavbar.json";
import analytics_en from "./en/Analytics.json";
import analytics_ar from "./ar/Analytics.json";
import adminStudentComplaints_en from "./en/AdminStudentComplaints.json";
import adminStudentComplaints_ar from "./ar/AdminStudentComplaints.json";
import users_en from "./en/Users.json";
import users_ar from "./ar/Users.json";
import adminRegistrationData_en from "./en/AdminRegistrationData.json";
import adminRegistrationData_ar from "./ar/AdminRegistrationData.json";
import adminVisitorData_en from "./en/AdminVisitorData.json";
import adminVisitorData_ar from "./ar/AdminVisitorData.json";
import navbar_en from "./en/Navbar.json";
import navbar_ar from "./ar/Navbar.json";
import footerbrand_en from "./en/Footer/FooterBrand.json";
import footerbrand_ar from "./ar/Footer/FooterBrand.json";
import footermenu_en from "./en/Footer/FooterMenu.json";
import footermenu_ar from "./ar/Footer/FooterMenu.json";
import footercontact_en from "./en/Footer/FooterContact.json";
import footercontact_ar from "./ar/Footer/FooterContact.json";
import footersearch_en from "./en/Footer/FooterSearch.json";
import footerbottom_en from "./en/Footer/FooterBottom.json";
import footerbottom_ar from "./ar/Footer/FooterBottom.json";
import footersearch_ar from "./ar/Footer/FooterSearch.json";
import teacherComplain_en from "./en/AdminTeacherComplaints/TeacherComplain.json"
import teacherComplaintFilters_en from "./en/AdminTeacherComplaints/TeacherComplaintFilters.json"
import teacherComplaintModal_en from "./en/AdminTeacherComplaints/TeacherComplaintModal.json"
import teacherComplaintStats_en from "./en/AdminTeacherComplaints/TeacherComplaintStats.json"
import teacherComplaintTable_en from "./en/AdminTeacherComplaints/TeacherComplaintTable.json"
import teacherComplaintViewModal_en from "./en/AdminTeacherComplaints/TeacherComplaintViewModal.json"
import teacherDeleteModal_en from "./en/AdminTeacherComplaints/TeacherDeleteModal.json"
import teacherComplain_ar from "./ar/AdminTeacherComplaints/TeacherComplain.json"
import teacherComplaintFilters_ar from "./ar/AdminTeacherComplaints/TeacherComplaintFilters.json"
import teacherComplaintModal_ar from "./ar/AdminTeacherComplaints/TeacherComplaintModal.json"
import teacherComplaintStats_ar from "./ar/AdminTeacherComplaints/TeacherComplaintStats.json"
import teacherComplaintTable_ar from "./ar/AdminTeacherComplaints/TeacherComplaintTable.json"
import teacherComplaintViewModal_ar from "./ar/AdminTeacherComplaints/TeacherComplaintViewModal.json"
import teacherDeleteModal_ar from "./ar/AdminTeacherComplaints/TeacherDeleteModal.json"
import uploadedDocuments_en from "./en/AdminUploadedDocumentsData/UploadedDocuments.json"
import adminDocumentsTable_en from "./en/AdminUploadedDocumentsData/AdminDocumentsTable.json"
import viewDocumentModal_en from "./en/AdminUploadedDocumentsData/ViewDocumentModal.json"
import rejectDocumentModal_en from "./en/AdminUploadedDocumentsData/RejectDocumentModal.json"
import uploadedDocuments_ar from "./ar/AdminUploadedDocumentsData/UploadedDocuments.json"
import adminDocumentsTable_ar from "./ar/AdminUploadedDocumentsData/AdminDocumentsTable.json"
import viewDocumentModal_ar from "./ar/AdminUploadedDocumentsData/ViewDocumentModal.json"
import rejectDocumentModal_ar from "./ar/AdminUploadedDocumentsData/RejectDocumentModal.json"
import adminRequestedDocuments_en from "./en/AdminRequestedDocuments.json"
import adminRequestedDocuments_ar from "./ar/AdminRequestedDocuments.json"

const resources = {
  en: {
    home: home_en,
    contact: contact_en,
    gallery: gallery_en,
    middleandhighunit: middleandhighunit_en,
    primaryunit: primaryunit_en,
    specializededucationalunit: specializededucationalunit_en,
    speechandlanguagetherapy: speechandlanguagetherapy_en,
    vocationalandphysicaldepartment: vocationalandphysicaldepartment_en,
    nursingdepartment: nursingdepartment_en,
    aboutUs: aboutUs_en,
    directorManager: directorManager_en,
    actingDirector: actingDirector_en,
    faq: faq_en,
    team: team_en,
    login: login_en,
    signup: signup_en,
    team: team_en,
    adminSidebar: adminSidebar_en,
    adminNavbar: adminNavbar_en,
    analytics: analytics_en,
    adminStudentComplaints: adminStudentComplaints_en,
    users: users_en,
    adminRegistrationData: adminRegistrationData_en,
    adminVisitorData: adminVisitorData_en,
    teacherComplain:teacherComplain_en,
    teacherComplaintFilters:teacherComplaintFilters_en,
    teacherComplaintModal:teacherComplaintModal_en,
    teacherComplaintStats:teacherComplaintStats_en,
    teacherComplaintTable:teacherComplaintTable_en,
    teacherComplaintViewModal:teacherComplaintViewModal_en,
    teacherDeleteModal:teacherDeleteModal_en,
    uploadedDocuments:uploadedDocuments_en,
    adminDocumentsTable:adminDocumentsTable_en,
    viewDocumentModal:viewDocumentModal_en,
    rejectDocumentModal:rejectDocumentModal_en,
    adminRequestedDocuments:adminRequestedDocuments_en,
    adminRequestedDocuments:adminRequestedDocuments_en,
    


    navbar: navbar_en,
    footerbrand: footerbrand_en,
    footermenu: footermenu_en,
    footercontact: footercontact_en,
    footersearch: footersearch_en,
    footerbottom: footerbottom_en,
  },
  ar: {
    home: home_ar,
    contact: contact_ar,
    gallery: gallery_ar,
    middleandhighunit: middleandhighunit_ar,
    primaryunit: primaryunit_ar,
    specializededucationalunit: specializededucationalunit_ar,
    speechandlanguagetherap: speechandlanguagetherapy_ar,
    vocationalandphysicaldepartment: vocationalandphysicaldepartment_ar,
    nursingdepartment: nursingdepartment_ar,
    aboutUs: aboutUs_ar,
    directorManager: directorManager_ar,
    actingDirector: actingDirector_ar,
    faq: faq_ar,
    team: team_ar,
    login: login_ar,
    signup: signup_ar,
    team: team_ar,
    adminSidebar: adminSidebar_ar,
    adminNavbar: adminNavbar_ar,
    analytics: analytics_ar,
    adminStudentComplaints: adminStudentComplaints_ar,
    users: users_ar,
    adminRegistrationData: adminRegistrationData_ar,
    adminVisitorData: adminVisitorData_ar,
      teacherComplain:teacherComplain_ar,
    teacherComplaintFilters:teacherComplaintFilters_ar,
    teacherComplaintModal:teacherComplaintModal_ar,
    teacherComplaintStats:teacherComplaintStats_ar,
    teacherComplaintTable:teacherComplaintTable_ar,
    teacherComplaintViewModal:teacherComplaintViewModal_ar,
    teacherDeleteModal:teacherDeleteModal_ar,
     uploadedDocuments:uploadedDocuments_ar,
    adminDocumentsTable:adminDocumentsTable_ar,
    viewDocumentModal:viewDocumentModal_ar,
    rejectDocumentModal:rejectDocumentModal_ar,
    adminRequestedDocuments:adminRequestedDocuments_ar,


    navbar: navbar_ar,
    footerbrand: footerbrand_ar,
    footermenu: footermenu_ar,
    footercontact: footercontact_ar,
    footersearch: footersearch_ar,
    footerbottom: footerbottom_ar,
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
