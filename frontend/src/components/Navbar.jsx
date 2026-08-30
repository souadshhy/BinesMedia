import { Link, NavLink } from "react-router-dom";
import binesLogo from "../assets/binesmedia_favicon_512.png";
import binesWord from "../assets/bines_media_navbar_logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { content, isLoading } = useSiteContent();

  if (isLoading) return null;

  const t = content[language].nav;

  const handleNavClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 10);
  };

  const navLinkClass = ({ isActive }) => {
    const baseClasses =
      "relative px-2 py-1 font-label-md font-semibold transition-colors duration-300";

    const underline =
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-center after:transition-transform after:duration-300";

    return isActive
      ? `${baseClasses} ${underline} text-primary dark:text-inverse-primary after:scale-x-100`
      : `${baseClasses} ${underline} text-secondary dark:text-secondary-fixed after:scale-x-0 hover:text-primary dark:hover:text-inverse-primary hover:after:scale-x-100 hover:bg-primary/5 dark:hover:bg-primary-fixed/10 rounded-t`;
  };

  return (
    <nav
      className="fixed w-full top-0 left-0 z-50 bg-surface/80 backdrop-blur-md dark:bg-inverse-surface/70 shadow-sm transition-transform duration-300"
      id="navbar"
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-3 group drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] drop-shadow-[0_0_24px_rgba(0,163,255,0.35)] transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={binesLogo}
            alt="Bines Media Icon"
            className="w-8 h-8 object-contain"
          />
          <img
            src={binesWord}
            alt="Bines Media"
            className="h-6 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-8 items-center text-body-md text-label-md">
          <NavLink to="/" end onClick={handleNavClick} className={navLinkClass}>
            {t.home}
          </NavLink>

          <NavLink
            to="/services"
            onClick={handleNavClick}
            className={navLinkClass}
          >
            {t.services}
          </NavLink>

          <NavLink
            to="/company"
            onClick={handleNavClick}
            className={navLinkClass}
          >
            {t.company}
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="hidden md:flex items-center justify-center bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md scale-95 active:scale-90 transition-transform hover:bg-surface-tint shadow-sm"
          >
            {t.contact}
          </Link>

          <div className="flex bg-[#0052b9]/10 dark:bg-white/10 p-1 rounded-full items-center backdrop-blur-sm border border-[#0052b9]/20 dark:border-white/10">
            <button
              onClick={language !== "tr" ? toggleLanguage : undefined}
              className={`px-3 py-1.5 rounded-full text-[12px] font-[700] tracking-wider transition-all duration-300 ${
                language === "tr"
                  ? "bg-[#0052b9] text-white shadow-md cursor-default"
                  : "text-[#546067] dark:text-[#bcc8d0] hover:text-[#0052b9] dark:hover:text-white cursor-pointer"
              }`}
            >
              TR
            </button>
            <button
              onClick={language !== "en" ? toggleLanguage : undefined}
              className={`px-3 py-1.5 rounded-full text-[12px] font-[700] tracking-wider transition-all duration-300 ${
                language === "en"
                  ? "bg-[#0052b9] text-white shadow-md cursor-default"
                  : "text-[#546067] dark:text-[#bcc8d0] hover:text-[#0052b9] dark:hover:text-white cursor-pointer"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary ml-2">
            <span className="material-symbols-outlined text-headline-md">
              menu
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
