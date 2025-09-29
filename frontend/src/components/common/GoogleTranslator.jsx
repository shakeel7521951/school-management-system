import React, { useEffect } from "react";
import "./style.css";

const GoogleTranslate = () => {
  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleScript.async = true;
    document.body.appendChild(googleScript);

    // Function to filter languages
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
      }
    };

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );

      // Watch for changes in the dropdown
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
    <div className="translate-wrapper">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
