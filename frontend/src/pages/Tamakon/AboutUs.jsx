import React from "react";
import Section from "../../components/Tamakon/about/Section";
import InlineImage from "../../components/Tamakon/about/InlineImage";
import VisionMission from "../../components/Tamakon/about/VisionMission";
import HeroSection from "../../components/Tamakon/about/HeroSection";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Content */}
      <section className="max-w-6xl mx-auto py-20 px-6 space-y-20">
        {/* Who We Are */}
        <Section title={t("sections.whoWeAre.title")} direction="left">
          <p className="leading-relaxed text-lg text-gray-700">
            {t("sections.whoWeAre.content")}
          </p>
        </Section>

        {/* Image */}
        <InlineImage src="/images/hero-bg.jpeg" alt="Al Tamkon School" />

        {/* History */}
        <Section title={t("sections.ourHistory.title")} direction="right">
          <p className="leading-relaxed text-lg text-gray-700 mb-4">
            {t("sections.ourHistory.content1")}
          </p>
          <p className="leading-relaxed text-lg text-gray-700">
            {t("sections.ourHistory.content2")}
          </p>
        </Section>

        {/* Achievements */}
        <Section title={t("sections.achievements.title")} direction="up">
          <p className="leading-relaxed text-lg mb-4 text-gray-700">
            {t("sections.achievements.content1")}
          </p>
          <p className="leading-relaxed text-lg text-gray-700">
            {t("sections.achievements.content2")}
          </p>
        </Section>

        {/* Campus */}
        <Section title={t("sections.campus.title")} direction="left">
          <p className="leading-relaxed text-lg text-gray-700">
            {t("sections.campus.content")}
          </p>
        </Section>

        {/* Vision & Mission */}
        <VisionMission />

        {/* Individualized Care */}
        <Section title={t("sections.individualizedCare.title")} direction="up">
          <p className="leading-relaxed text-lg text-gray-700">
            {t("sections.individualizedCare.content")}
          </p>
        </Section>
      </section>
    </div>
  );
};

export default AboutUs;
