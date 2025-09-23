// src/components/Tamakon/team/teamData.js
export const TeamMembers = [
  {
    id: 1,
    nameEn: "Mona Abdullah Al-Mulla",
    titleEn: "General Director",
    department: "Leadership",
    category: "executive",
    bio: "Leading the strategic direction and overall management of Al Tamakon Comprehensive School with over 15 years of experience in special education leadership.",
    photo: "/images/avatar-1.jpg"
  },
  {
    id: 2,
    nameEn: "Hind Al-Rabah",
    titleEn: "Acting Director General",
    department: "Leadership",
    category: "executive",
    bio: "Overseeing daily operations and academic excellence initiatives with expertise in educational administration and student development programs.",
    photo: "/images/Al-Rabah.jpg"
  },
  {
    id: 3,
    nameEn: "Eman Al-Saqour",
    titleEn: "Deputy Director for Academic Affairs",
    department: "Academic Affairs",
    category: "academic",
    bio: "Managing academic programs and curriculum development across all educational levels, ensuring quality education for students with special needs.",
    photo: "/images/avatar-1.jpg"
  },
  {
    id: 4,
    nameEn: "Mohammed Mustafa",
    titleEn: "Deputy Director for Financial, Administrative and Student Affairs",
    department: "Administration",
    category: "administrative",
    bio: "Overseeing financial management, administrative operations, and student services with a focus on efficient resource allocation.",
    photo: "/images/Mustafa.jpg"
  },
  {
    id: 5,
    nameEn: "Muhammad Ramez",
    titleEn: "Director of the Technical Office",
    department: "Technology",
    category: "technical",
    bio: "Leading technology integration and digital transformation initiatives to enhance educational delivery and administrative efficiency.",
    photo: "/images/Ramez.jpeg"
  },
  {
    id: 6,
    nameEn: "Firas Al-Omari",
    titleEn: "Coordinator of Learning Difficulties Track - Preparatory and Secondary School for Boys",
    department: "Special Education",
    category: "academic",
    bio: "Specializing in learning difficulties programs for middle and high school boys, developing individualized education plans.",
    photo: "/images/Firas.jpg"
  },
  {
    id: 7,
    nameEn: "Rawaan Mamdouh",
    titleEn: "Coordinator of Learning Difficulties Track - Elementary School & Special Education Track Coordinator",
    department: "Special Education",
    category: "academic",
    bio: "Coordinating special education programs for elementary students and overall special education track management.",
    photo: "/images/avatar-1.jpg"
  },
  {
    id: 8,
    nameEn: "Dr. Amira Al-Tahawi",
    titleEn: "Head of Speech and Language Therapy Department",
    department: "Therapy",
    category: "therapeutic",
    bio: "Leading speech and language therapy services for students with special needs, implementing evidence-based therapeutic approaches.",
    photo: "/images/Amira.jpg"
  },
  {
    id: 9,
    nameEn: "Maram Tahat",
    titleEn: "Head of Vocational and Physical Rehabilitation Department",
    department: "Rehabilitation",
    category: "therapeutic",
    bio: "Managing vocational training and physical rehabilitation programs to enhance students' functional abilities and independence.",
    photo: "/images/avatar-1.jpg"
  },
  {
    id: 10,
    nameEn: "Sakina Sousan",
    titleEn: "Head of Public Relations Department",
    department: "Public Relations",
    category: "administrative",
    bio: "Managing school communications, community relations, and public outreach initiatives to strengthen community partnerships.",
    photo: "/images/Sakina.jpg"
  },
  {
    id: 11,
    nameEn: "Mariam Al-Fadhli",
    titleEn: "Human Resources Management",
    department: "Human Resources",
    category: "administrative",
    bio: "Overseeing human resources, staff development, and organizational culture to support a positive work environment.",
    photo: "/images/avatar-1.jpg"
  },
  {
    id: 12,
    nameEn: "Hind Sabry Rashed",
    nameAr: "أ. هدي صبري راشد",
    titleEn: "Administrative Coordinator",
    titleAr: "منسق اداري",
    department: "Administration",
    category: "administrative",
    bio: "Coordinating administrative operations and supporting school management with efficient organizational skills.",
    photo: "/images/Sabry.jpg"
  }
];

// Department colors mapping
export const departmentColors = {
  "Leadership": "from-[#204181] to-[#3471b3]",
  "Academic Affairs": "from-[#204181] to-[#3471b3]",
  "Administration": "from-[#204181] to-[#3471b3]",
  "Technology": "from-[#204181] to-[#3471b3]",
  "Special Education": "from-[#204181] to-[#3471b3]",
  "Therapy": "from-[#204181] to-[#3471b3]",
  "Rehabilitation": "from-[#204181] to-[#3471b3]",
  "Public Relations": "from-[#204181] to-[#3471b3]",  
  "Human Resources": "from-[#204181] to-[#3471b3]"
};

// Team categories
export const teamCategories = [
  { id: "all", name: "All Team Members", count: TeamMembers.length },
  { id: "executive", name: "Executive Leadership", count: TeamMembers.filter(m => m.category === "executive").length },
  { id: "academic", name: "Academic Team", count: TeamMembers.filter(m => m.category === "academic").length },
  { id: "administrative", name: "Administrative Staff", count: TeamMembers.filter(m => m.category === "administrative").length },
  { id: "therapeutic", name: "Therapeutic Services", count: TeamMembers.filter(m => m.category === "therapeutic").length },
  { id: "technical", name: "Technical Team", count: TeamMembers.filter(m => m.category === "technical").length }
];

export default TeamMembers;