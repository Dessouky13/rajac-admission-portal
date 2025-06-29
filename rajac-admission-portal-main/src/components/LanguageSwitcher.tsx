
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    // Handle RTL automatically via body dir
    document.documentElement.dir = i18n.language === "en" ? "rtl" : "ltr";
  };

  React.useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Button
      variant="secondary"
      className="rounded-full px-3 font-bold"
      onClick={toggleLanguage}
      aria-label="Switch language"
    >
      {i18n.language === "ar" ? "🇬🇧 English" : "🇸🇦 العربية"}
    </Button>
  );
};

export default LanguageSwitcher;
