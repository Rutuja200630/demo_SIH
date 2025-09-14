import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appName: "YatraRakshak",
      tagline: "Real-time monitoring & instant response",
      ctaGetId: "Get Digital ID",
      ctaLogin: "Police/Admin Login",
      heroSubtitle: "Futuristic safety with live maps, AI insights and rapid alerts.",
      nav: {
        home: "Home",
        tourist: "Tourist",
        police: "Police",
        admin: "Admin",
        privacy: "Privacy",
        terms: "Terms"
      },
      dashboard: {
        panic: "Panic",
        safetyScore: "Safety Score",
        alerts: "Alerts",
        itinerary: "Itinerary",
        contacts: "Emergency contacts"
      }
    }
  },
  hi: {
    translation: {
      appName: "यात्रा रक्षक (YatraRakshak)",
      tagline: "रियल-टाइम निगरानी और त्वरित प्रतिक्रिया",
      ctaGetId: "डिजिटल आईडी प्राप्त करें",
      ctaLogin: "पुलिस/एडमिन लॉगिन",
      heroSubtitle: "लाइव मैप, एआई इनसाइट्स और तेज़ अलर्ट के साथ सुरक्षित यात्रा।",
      nav: {
        home: "होम",
        tourist: "पर्यटक",
        police: "पुलिस",
        admin: "एडमिन",
        privacy: "गोपनीयता",
        terms: "नियम"
      },
      dashboard: {
        panic: "पैनिक",
        safetyScore: "सेफ़्टी स्कोर",
        alerts: "अलर्ट",
        itinerary: "यात्रा योजना",
        contacts: "आपातकालीन संपर्क"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
