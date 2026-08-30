import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import binesLogo from "../assets/binesmedia_favicon_512.png";
import binesWord from "../assets/bines_media_navbar_logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { content, isLoading } = useSiteContent();

  // ✅ ADDED: State to control the mobile sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) return null;

  const t = content[language].nav;

  const handleNavClick = () => {
    // ✅ ADDED: Close the mobile menu when a link is clicked
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 10);
  };

  const navLinkClass = ({ isActive }) => {
    const baseClasses =
      "relative px-2 py-1 font-label-md font-semibold transition-colors duration-300 w-fit";

    const underline =
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0052b9] after:origin-center after:transition-transform after:duration-300";

    return isActive
      ? `${baseClasses} ${underline} text-[#0052b9] after:scale-x-100`
      : `${baseClasses} ${underline} text-[#546067] after:scale-x-0 hover:text-[#0052b9] hover:after:scale-x-100 hover:bg-[#0052b9]/5 rounded-t`;
  };

  return (
    <>
      <nav
        className="fixed w-full top-0 left-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-md shadow-sm transition-transform duration-300"
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

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center text-body-md text-label-md">
            <NavLink
              to="/"
              end
              onClick={handleNavClick}
              className={navLinkClass}
            >
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
            {/* Desktop Contact Button */}
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="hidden md:flex items-center justify-center bg-[#0052b9] text-white px-6 py-2 rounded-lg font-label-md text-label-md scale-95 active:scale-90 transition-transform hover:bg-[#0052b9]/90 shadow-sm"
            >
              {t.contact}
            </Link>

            {/* Language Toggle (Stays visible on mobile header) */}
            <div className="flex bg-[#0052b9]/10 p-1 rounded-full items-center backdrop-blur-sm border border-[#0052b9]/20">
              <button
                onClick={language !== "tr" ? toggleLanguage : undefined}
                className={`px-3 py-1.5 rounded-full text-[12px] font-[700] tracking-wider transition-all duration-300 ${
                  language === "tr"
                    ? "bg-[#0052b9] text-white shadow-md cursor-default"
                    : "text-[#546067] hover:text-[#0052b9] cursor-pointer"
                }`}
              >
                TR
              </button>
              <button
                onClick={language !== "en" ? toggleLanguage : undefined}
                className={`px-3 py-1.5 rounded-full text-[12px] font-[700] tracking-wider transition-all duration-300 ${
                  language === "en"
                    ? "bg-[#0052b9] text-white shadow-md cursor-default"
                    : "text-[#546067] hover:text-[#0052b9] cursor-pointer"
                }`}
              >
                EN
              </button>
            </div>

            {/* ✅ ADDED: Mobile Menu Open Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#0052b9] ml-2 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-headline-md">
                menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ ADDED: Mobile Sidebar Overlay (Dark background) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)} // Clicking outside closes it
      ></div>

      {/* ✅ ADDED: Mobile Right Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#FAF9F6] shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header & Close Button */}
        <div className="flex justify-end p-6 border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#546067] hover:text-[#0052b9] transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-headline-md">
              close
            </span>
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex flex-col gap-6 p-8 overflow-y-auto">
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

          {/* Sidebar Contact Button */}
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="mt-6 flex items-center justify-center bg-[#0052b9] text-white px-6 py-3 rounded-lg font-label-md text-label-md active:scale-95 transition-transform hover:bg-[#0052b9]/90 shadow-md"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </>
  );
}
