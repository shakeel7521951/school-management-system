import React from "react";
import HeroSection from "../components/about/HeroSection";
import Section from "../components/about/Section";
import InlineImage from "../components/about/InlineImage";
import VisionMission from "../components/about/VisionMission";
const  AboutUs=()=> {
 return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Content */}
      <section className="max-w-6xl mx-auto py-20 px-6 space-y-20">
        {/* Who We Are */}
        <Section title="Who We Are" direction="left">
          <p className="leading-relaxed text-lg text-gray-700">
            Al Tamkon Comprehensive School was established in 2008 to meet the
            growing community needs for comprehensive services for students with
            Multiple Intelligences and Talents, as it was licensed as the first
            specialized private school for students with Multiple Intelligences
            and Talents in Qatar, providing comprehensive therapeutic education
            and rehabilitation services for males and females of all educational
            levels.
          </p>
        </Section>

        {/* Image */}
        <InlineImage src="/images/hero-bg.jpeg" alt="Al Tamkon School" />

        {/* History */}
        <Section title="Our History" direction="right">
          <p className="leading-relaxed text-lg text-gray-700 mb-4">
            In 2014, Al-Tamkon Inclusive School witnessed a significant
            transformation as it relocated to its new building in the Ain Khaled
            area near Doha. This move was a strategic step aimed at accommodating
            a larger number of students and providing comprehensive educational
            and rehabilitation services that cater to the needs of the served
            communities.
          </p>
          <p className="leading-relaxed text-lg text-gray-700">
            By the end of the 2022/2023 academic year, the school had exceeded
            235 male and female students. In order to deliver the highest level
            of quality in educational and rehabilitation services, more than 135
            highly qualified and globally experienced staff were employed.
          </p>
        </Section>

        {/* Achievements */}
        <Section title="Achievements & Accreditation" direction="up">
          <p className="leading-relaxed text-lg mb-4 text-gray-700">
            The school distinguished itself by obtaining national school
            accreditation according to the Qatari curriculum from the Ministry of
            Education and Higher Education in May 2019. Furthermore, it received
            a license from the Ministry of Public Health in October of the same
            year, making it the first and only specialized private school in Qatar
            to hold both educational and healthcare accreditation simultaneously.
          </p>
          <p className="leading-relaxed text-lg text-gray-700">
            The school actively seeks international accreditation (CIS) as part
            of its ongoing efforts towards excellence. This pursuit reflects its
            commitment to continuous improvement and its desire to provide a
            world-class educational environment for its students.
          </p>
        </Section>

        {/* Campus */}
        <Section title="Our Campus" direction="left">
          <p className="leading-relaxed text-lg text-gray-700">
            Al-Tamken Inclusive School is located in the Ain Khaled area in the
            southern part of Doha, occupying a land area of approximately 15,000
            square meters. The campus includes three main buildings with
            classrooms, therapy rooms, enrichment spaces, a theater, library,
            cafeteria, and recreational areas. Specialized facilities include
            sensory integration, physical therapy, occupational therapy, speech
            and language therapy, and vocational rehabilitation units.
          </p>
        </Section>

        {/* Vision & Mission */}
        <VisionMission />

        {/* Individualized Care */}
        <Section title="Individualized Care" direction="up">
          <p className="leading-relaxed text-lg text-gray-700">
            Each student receives individualized educational plans based on
            assessments by a multidisciplinary team, including psychologists,
            therapists, special educators, and subject teachers. Services include
            adaptive behavior assessments, individualized therapies, and
            enrichment activities. A high staff-to-student ratio ensures
            personalized education and rehabilitation.
          </p>
        </Section>
      </section>
    </div>
  );
}


export default AboutUs