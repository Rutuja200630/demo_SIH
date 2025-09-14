import { Link, NavLink } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";

export default function NavBar() {
  const { isDark, setIsDark } = useDarkMode();
  const { t, i18n } = useTranslation();

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "text-primary-foreground bg-primary/70" : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-background/60">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Orchid AI — Home">
          <img src="/icons/orchid.svg" alt="Orchid AI" className="h-8 w-8" />
          <span className="font-extrabold tracking-tight text-lg">Orchid AI — Smart Tourist Safety</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navItem}>{t("nav.home")}</NavLink>
          <NavLink to="/tourist/dashboard" className={navItem}>{t("nav.tourist")}</NavLink>
          <NavLink to="/police/dashboard" className={navItem}>{t("nav.police")}</NavLink>
          <NavLink to="/admin" className={navItem}>{t("nav.admin")}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle language"
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
            className="px-3 py-2 rounded-md bg-foreground/10 hover:bg-foreground/20 text-sm"
          >
            {i18n.language === "en" ? "EN" : "हिं"}
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-md bg-foreground/10 hover:bg-foreground/20"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/auth/login" className="ml-2 px-3 py-2 rounded-md bg-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,.6)]">
            {t("ctaLogin")}
          </Link>
        </div>
      </div>
    </header>
  );
}
