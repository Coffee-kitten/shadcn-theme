import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  "en-US": {
    translation: (window as any)["en-US"],
  },
  "zh-CN": {
    translation: (window as any)["zh-CN"],
  },
};

export default i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.localStorage.getItem("i18n") || "en-US",
    fallbackLng: "en-US",

    interpolation: {
      escapeValue: false,
    },
  });
