import { Link } from "react-router-dom";
import binesLogo from "../assets/binesmedia_favicon_512.png";
import binesWord from "../assets/bines_media_navbar_logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Footer() {
  const { language } = useLanguage();
  const { content, isLoading } = useSiteContent();

  if (isLoading || !content) return null;

  const tNav = content[language].nav;
  const tContact = content[language].contact;

  const handleScrollTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  return (
    <footer className="bg-[#FAF9F6] text-[#546067] border-t border-[#0052b9]/20 relative z-10 font-sans">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#0052b9]/10">
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link
              to="/"
              onClick={handleScrollTop}
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
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
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold text-lg text-[#0052b9] uppercase tracking-wider mb-2">
              {language === "tr" ? "Hızlı Bağlantılar" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={handleScrollTop}
                  className="text-[#546067] hover:text-[#0052b9] transition-colors text-body-md"
                >
                  {tNav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={handleScrollTop}
                  className="text-[#546067] hover:text-[#0052b9] transition-colors text-body-md"
                >
                  {tNav.services}
                </Link>
              </li>
              <li>
                <Link
                  to="/company"
                  onClick={handleScrollTop}
                  className="text-[#546067] hover:text-[#0052b9] transition-colors text-body-md"
                >
                  {tNav.company}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleScrollTop}
                  className="text-[#546067] hover:text-[#0052b9] transition-colors text-body-md"
                >
                  {tNav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-bold text-lg text-[#0052b9] uppercase tracking-wider mb-2">
              {tContact.hqTitle || "Headquarters"}
            </h4>
            <p className="text-[#546067] text-body-md leading-relaxed">
              {tContact.hqL1}
              <br />
              {tContact.hqL2}
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[#546067] text-sm">
          <p>
            {tContact.copyrightText ||
              `© ${new Date().getFullYear()} Bines Media. All rights reserved.`}
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            {tContact.igLink && (
              <a
                href={tContact.igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0052b9] transition-colors font-medium"
              >
                Instagram
              </a>
            )}
            <Link
              to="/contact"
              onClick={handleScrollTop}
              className="hover:text-[#0052b9] transition-colors font-medium"
            >
              {tNav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
