import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
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
import publicrelations_en from "./en/PublicRelations.json";
import publicrelations_ar from "./ar/PublicRelations.json";
import financialandadministrativeaffairs_en from "./en/FinancialAndAdministrativeAffairs.json";
import financialandadministrativeaffairs_ar from "./ar/FinancialAndAdministrativeAffairs.json";
import parentComplaintForm_en from "./en/ParentComplaintForm.json"
import parentComplaintForm_ar from "./ar/ParentComplaintForm.json"



import directorManager_en from "./en/Directormanager.json";
import directorManager_ar from "./ar/Directormanager.json";
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
import teacherComplaints_ar from "./ar/TeacherComplaints/TeacherComplaints.json"
import studentComplaints_en from "./en/studentDashboard/StudentComplaints.json"
import studentComplaints_ar from "./ar/studentDashboard/StudentComplaints.json"
import studentComplaintModal_en from "./en/studentDashboard/StudentComplaintModal.json"
import studentComplaintModal_ar from "./ar/studentDashboard/StudentComplaintModal.json"
import departComplaintModal_ar from "./ar/DepartmentStudentComplaint/DepartComplaintModal.json"
import departComplaintModal_en from "./en/DepartmentStudentComplaint/DepartComplaintModal.json"


import aboutUs_en from "./en/AboutUs.json";
import aboutUs_ar from "./ar/AboutUs.json";
import actingDirector_en from "./en/Actingdirector.json";
import actingDirector_ar from "./ar/Actingdirector.json";
import teacherNavbar_en from "./en/TeacherNavbar.json";
import teacherNavbar_ar from "./ar/TeacherNavbar.json";
import teacherSidebar_en from "./en/TeacherSidebar.json";
import teacherSidebar_ar from "./ar/TeacherSidebar.json";
import responseForm_en from "./en/ResponseForm.json";
import responseForm_ar from "./ar/ResponseForm.json";
import teacherComplaints_en from "./en/TeacherComplaints/TeacherComplaints.json"
import registrationForm_en from "./en/RegistrationForm.json"
import registrationForm_ar from "./ar/RegistrationForm.json"
import securityNavbar_en from "./en/SecurityDashboard/SecurityNavbar.json"
import securityNavbar_ar from "./ar/SecurityDashboard/SecurityNavbar.json"
import securitySidebar_en from "./en/SecurityDashboard/SecuritySidebar.json"
import securitySidebar_ar from "./ar/SecurityDashboard/SecuritySidebar.json"
import securityVisitorForm_en from "./en/SecurityDashboard/SecurityVisitor.json"
import securityVisitorForm_ar from "./ar/SecurityDashboard/SecurityVisitor.json"
import visitorViewModal_en from "./en/SecurityDashboard/VisitorViewModal.json"
import visitorViewModal_ar from "./ar/SecurityDashboard/VisitorViewModal.json"
import visitorManagement_en from "./en/SecurityDashboard/VisitorManagement.json"
import visitorManagement_ar from "./ar/SecurityDashboard/VisitorManagement.json"
import studentNavbar_en from "./en/studentDashboard/StudentNavbar.json"
import studentNavbar_ar from "./ar/studentDashboard/StudentNavbar.json"
import studentSidebar_en from "./en/studentDashboard/StudentSidebar.json"
import studentSidebar_ar from "./ar/studentDashboard/StudentSidebar.json"
import adminParentComplaints_en from "./en/AdminParentComplaints/AdminParentComplaints.json"
import adminParentComplaints_ar from "./ar/AdminParentComplaints/AdminParentComplaints.json"
import parentComplaintsModals_en from "./en/AdminParentComplaints/ParentComplaintsModals.json"
import parentComplaintsModals_ar from "./ar/AdminParentComplaints/ParentComplaintsModals.json"
import parentComplaintsTable_en from "./en/AdminParentComplaints/ParentComplaintsTable.json"
import parentComplaintsTable_ar from "./ar/AdminParentComplaints/ParentComplaintsTable.json"
import adminDepartmentPage_en from "./en/AdminDepartmentPage/AdminDepartmentPage.json"
import adminDepartmentPage_ar from "./ar/AdminDepartmentPage/AdminDepartmentPage.json"
import departmentTable_en from "./en/AdminDepartmentPage/DepartmentTable.json"
import departmentTable_ar from "./ar/AdminDepartmentPage/DepartmentTable.json"
import departmentModals_en from "./en/AdminDepartmentPage/DepartmentModals.json"
import departmentModals_ar from "./ar/AdminDepartmentPage/DepartmentModals.json"
import departmentNavbar_en from './en/DepartmentDashboard/DepartmentNavbar.json'
import departmentNavbar_ar from "./ar/DepartmentDashboard/DepartmentNavbar.json"
import departmentSidebar_en from "./en/DepartmentDashboard/DepartmentSidebar.json"
import departmentSidebar_ar from "./ar/DepartmentDashboard/DepartmentSidebar.json"
import departComplaintStats_ar from "./ar/DepartmentStudentComplaint/DepartComplaintStats.json"
import departComplaintStats_en from "./en/DepartmentStudentComplaint/DepartComplaintStats.json"
import departComplaintTable_en from "./en/DepartmentStudentComplaint/DepartComplaintTable.json"
import departComplaintTable_ar from "./ar/DepartmentStudentComplaint/DepartComplaintTable.json"
import departStudentComplaintFilters_en from "./en/DepartmentStudentComplaint/DepartStudentComplaintFilters.json"
import departStudentComplaintFilters_ar from "./ar/DepartmentStudentComplaint/DepartStudentComplaintFilters.json"
import departStudentComplaints_en from "./en/DepartmentStudentComplaint/DepartStudentComplaints.json"
import departStudentComplaints_ar from "./ar/DepartmentStudentComplaint/DepartStudentComplaints.json"
import departViewModal_en from "./en/DepartmentStudentComplaint/DepartViewModal.json"
import departViewModal_ar from "./ar/DepartmentStudentComplaint/DepartViewModal.json"





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
    publicrelations: publicrelations_en,
    financialandadministrativeaffairs: financialandadministrativeaffairs_en,
    actingDirector: actingDirector_en,
    faq: faq_en,
    login: login_en,
    signup: signup_en,
    adminSidebar: adminSidebar_en,
    adminNavbar: adminNavbar_en,
    analytics: analytics_en,
    adminStudentComplaints: adminStudentComplaints_en,
    users: users_en,
    adminRegistrationData: adminRegistrationData_en,
    adminVisitorData: adminVisitorData_en,
    teacherComplain: teacherComplain_en,
    teacherComplaintFilters: teacherComplaintFilters_en,
    teacherComplaintModal: teacherComplaintModal_en,
    teacherComplaintStats: teacherComplaintStats_en,
    teacherComplaintTable: teacherComplaintTable_en,
    teacherComplaintViewModal: teacherComplaintViewModal_en,
    teacherDeleteModal: teacherDeleteModal_en,
    uploadedDocuments: uploadedDocuments_en,
    adminDocumentsTable: adminDocumentsTable_en,
    viewDocumentModal: viewDocumentModal_en,
    rejectDocumentModal: rejectDocumentModal_en,
    adminRequestedDocuments: adminRequestedDocuments_en,
    adminRequestedDocuments: adminRequestedDocuments_en,
    teacherComplaints: teacherComplaints_en,
    securityNavbar: securityNavbar_en,
    securitySidebar: securitySidebar_en,
    securityVisitorForm: securityVisitorForm_en,
    visitorViewModal: visitorViewModal_en,
    visitorManagement: visitorManagement_en,
    parentComplaintForm: parentComplaintForm_en,
    studentComplaints: studentComplaints_en,
    studentComplaintModal: studentComplaintModal_en,
    navbar: navbar_en,
    footerbrand: footerbrand_en,
    footermenu: footermenu_en,
    footercontact: footercontact_en,
    footersearch: footersearch_en,
    footerbottom: footerbottom_en,
    aboutUs: aboutUs_en,
    directorManager: directorManager_en,
    team: team_en,
    teacherNavbar: teacherNavbar_en,
    teacherSidebar: teacherSidebar_en,
    responseForm: responseForm_en,
    registrationForm: registrationForm_en,
    studentNavbar: studentNavbar_en,
    studentSidebar: studentSidebar_en,
    adminParentComplaints: adminParentComplaints_en,
    parentComplaintsModals: parentComplaintsModals_en,
    parentComplaintsTable: parentComplaintsTable_en,
    adminDepartmentPage: adminDepartmentPage_en,
    departmentTable: departmentTable_en,
    departmentModals: departmentModals_en,
    departmentNavbar: departmentNavbar_en,
    departmentSidebar: departmentSidebar_en,
    departComplaintModal: departComplaintModal_en,
    departComplaintStats: departComplaintStats_en,
    departComplaintTable: departComplaintTable_en,
    departStudentComplaintFilters: departStudentComplaintFilters_en,
    departStudentComplaints:departStudentComplaints_en,
    departViewModal:departViewModal_en

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
    publicrelations: publicrelations_ar,
    financialandadministrativeaffairs: financialandadministrativeaffairs_ar,
    aboutUs: aboutUs_ar,
    directorManager: directorManager_ar,
    actingDirector: actingDirector_ar,
    team: team_ar,
    login: login_ar,
    signup: signup_ar,
    adminSidebar: adminSidebar_ar,
    adminNavbar: adminNavbar_ar,
    analytics: analytics_ar,
    adminStudentComplaints: adminStudentComplaints_ar,
    users: users_ar,
    adminRegistrationData: adminRegistrationData_ar,
    adminVisitorData: adminVisitorData_ar,
    teacherComplain: teacherComplain_ar,
    teacherComplaintFilters: teacherComplaintFilters_ar,
    teacherComplaintModal: teacherComplaintModal_ar,
    teacherComplaintStats: teacherComplaintStats_ar,
    teacherComplaintTable: teacherComplaintTable_ar,
    teacherComplaintViewModal: teacherComplaintViewModal_ar,
    teacherDeleteModal: teacherDeleteModal_ar,
    uploadedDocuments: uploadedDocuments_ar,
    adminDocumentsTable: adminDocumentsTable_ar,
    viewDocumentModal: viewDocumentModal_ar,
    rejectDocumentModal: rejectDocumentModal_ar,
    adminRequestedDocuments: adminRequestedDocuments_ar,
    teacherComplaints: teacherComplaints_ar,
    securityNavbar: securityNavbar_ar,
    securitySidebar: securitySidebar_ar,
    securityVisitorForm: securityVisitorForm_ar,
    visitorViewModal: visitorViewModal_ar,
    visitorManagement: visitorManagement_ar,
    parentComplaintForm: parentComplaintForm_ar,
    studentComplaints: studentComplaints_ar,
    studentComplaintModal: studentComplaintModal_ar,
    navbar: navbar_ar,
    footerbrand: footerbrand_ar,
    footermenu: footermenu_ar,
    footercontact: footercontact_ar,
    footersearch: footersearch_ar,
    footerbottom: footerbottom_ar,
    aboutUs: aboutUs_ar,
    faq: faq_ar,
    teacherNavbar: teacherNavbar_ar,
    teacherSidebar: teacherSidebar_ar,
    responseForm: responseForm_ar,
    registrationForm: registrationForm_ar,
    studentNavbar: studentNavbar_ar,
    studentSidebar: studentSidebar_ar,
    adminParentComplaints: adminParentComplaints_ar,
    parentComplaintsModals: parentComplaintsModals_ar,
    parentComplaintsTable: parentComplaintsTable_ar,
    adminDepartmentPage: adminDepartmentPage_ar,
    departmentTable: departmentTable_ar,
    departmentModals: departmentModals_ar,
    departmentNavbar: departmentNavbar_ar,
    departmentSidebar: departmentSidebar_ar,
    departComplaintModal: departComplaintModal_ar,
    departComplaintStats: departComplaintStats_ar,
    departComplaintTable: departComplaintTable_ar,
    departStudentComplaintFilters: departStudentComplaintFilters_ar,
    departStudentComplaints:departStudentComplaints_ar,
    departViewModal:departViewModal_ar

  },
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
      "registrationForm",
      "studentNavbar",
      "studentSidebar",
      "departComplaintModal",
      "departComplaintStats",
      "departComplaintTable",
      "departStudentComplaintFilters",
      "departStudentComplaints",
      "departViewModal"

    ],
    defaultNS: "home",
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;