import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterBottom from "../components/common/Footer/FooterBottom";
import FooterBrand from "../components/common/Footer/FooterBrand";
import FooterContact from "../components/common/Footer/FooterContact";
import FooterMenu from "../components/common/Footer/FooterMenu";
import FooterSearch from "../components/common/Footer/FooterSearch";
import OrbEffect from "../components/common/Footer/OrbEffect";
export default function Footer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const menuLinks = [
    { name: "News", path: "/news" },
    { name: "Team", path: "/team" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = menuLinks.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    if (filtered.length === 1) navigate(filtered[0].path);
  };

  // shared animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('./images/footer-cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-[#0c427c]/90">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
            <FooterBrand sectionVariants={sectionVariants} />
            <FooterMenu sectionVariants={sectionVariants} />
            <FooterContact sectionVariants={sectionVariants} />
            <FooterSearch
              sectionVariants={sectionVariants}
              handleSearch={handleSearch}
              query={query}
              setQuery={setQuery}
            />
          </div>

          <FooterBottom sectionVariants={sectionVariants} />
        </div>
      </div>

      <OrbEffect />
    </footer>
  );
}
