import React, { useEffect } from "react";
import "./style.css";

const GoogleTranslate = () => {
  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleScript.async = true;
    document.body.appendChild(googleScript);

    // Function to filter languages + style the dropdown
    const filterLanguages = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        Array.from(select.options).forEach((option) => {
          if (
            !["ar", "en"].includes(option.value) && // keep English, French, Swahili
            option.value !== ""
          ) {
            option.remove();
          }
        });

        // 🎨 Style only (no logic change)
        select.style.backgroundColor = "#fff";
        select.style.border = "1px solid #d1d5db"; // gray-300
        select.style.borderRadius = "0.5rem"; // rounded-lg
        select.style.padding = "0.4rem 0.75rem";
        select.style.fontSize = "0.875rem"; // text-sm
        select.style.fontWeight = "500";
        select.style.color = "#374151"; // gray-700
        select.style.cursor = "pointer";
        select.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
        select.style.outline = "none";
      }
    };

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );

      const observer = new MutationObserver(filterLanguages);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    return () => {
      document.body.removeChild(googleScript);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="translate-wrapper inline-block">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
