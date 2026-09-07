import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Services() {
  const { language } = useLanguage();
  const { content, isLoading } = useSiteContent();
  const t = content[language].services;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCaps = t.caps?.filter((cap) => !cap.isHidden) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoading || !content) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px -10%",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      document.querySelectorAll(".observer-target").forEach((element) => {
        observer.observe(element);
      });
      document
        .querySelectorAll(".animate-fade-in-up:not(.observer-target)")
        .forEach((el) => el.classList.add("is-visible"));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content, isLoading, language]);

  useEffect(() => {
    if (currentSlide >= visibleCaps.length) {
      setCurrentSlide(0);
    }
  }, [visibleCaps.length, currentSlide]);

  useEffect(() => {
    if (isPaused || visibleCaps.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === visibleCaps.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, visibleCaps.length]);

  const nextSlide = () => {
    if (visibleCaps.length <= 1) return;
    setCurrentSlide((prev) => (prev === visibleCaps.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (visibleCaps.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? visibleCaps.length - 1 : prev - 1));
  };

  const handleScrollTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-[#191c1e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0052b9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-20">
      <section className="relative py-32 md:py-48 overflow-hidden border-b border-primary/30 z-0 animate-fade-in-up bg-black">
        {/* Background Image & Shadow Overlay */}
        {t.heroImg && (
          <div className="absolute inset-0 z-0">
            <img
              src={t.heroImg}
              alt="Services Hero Background"
              className="w-full h-full object-cover opacity-70"
            />
            {/* Heavy gradient shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
          </div>
        )}

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0052b9_1px,transparent_1px)] [background-size:40px_40px] z-0 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center animate-fade-in-up">
          <h1 className="font-display-lg-mobile md:text-display-lg font-black text-white leading-tight uppercase tracking-tighter drop-shadow-lg">
            {t.heroTitle1}{" "}
            <span className="text-primary-fixed-dim drop-shadow-md">
              {t.heroTitle2}
            </span>
          </h1>
          <p className="font-body-lg text-gray-300 max-w-2xl mx-auto mt-6 drop-shadow-md">
            {t.heroDesc}
          </p>
        </div>
      </section>

      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10 animate-fade-in-up observer-target">
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-surface-container group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleCaps.length > 0 ? (
            <>
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {visibleCaps.map((cap, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/2 h-64 md:h-[500px] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-[center_40%] w-full h-full transition-transform duration-1000 scale-105 group-hover:scale-100 bg-surface-variant"
                        style={
                          cap.img
                            ? { backgroundImage: `url('${cap.img}')` }
                            : {}
                        }
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-on-secondary-fixed/80 to-transparent md:hidden"></div>
                    </div>

                    <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-surface relative z-10 border-l border-outline-variant/20">
                      <h3 className="font-headline-lg text-on-surface mb-6 leading-tight font-bold tracking-tight">
                        {cap.title}
                      </h3>
                      <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                        {cap.desc}
                      </p>

                      {cap.bullets && cap.bullets.length > 0 && (
                        <ul className="space-y-4 mb-8">
                          {cap.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start">
                              <span className="material-symbols-outlined text-primary mr-3 fill-icon">
                                check_circle
                              </span>
                              <span className="font-body-md text-on-surface-variant font-semibold">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {visibleCaps.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 hover:bg-primary hover:text-white"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 hover:bg-primary hover:text-white"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                    {visibleCaps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full h-3 ${
                          currentSlide === idx
                            ? "w-10 bg-primary"
                            : "w-3 bg-white/60 hover:bg-white"
                        }`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-on-surface-variant">
              No services found.
            </div>
          )}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24 z-0 animate-fade-in-up observer-target">
        <div className="bg-surface-container rounded-sm p-8 md:p-20 text-center border-y-4 border-primary relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0052b9_2px,transparent_2px)] [background-size:30px_30px] z-0 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6 font-black uppercase tracking-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-12 text-xl">
              {t.ctaDesc}
            </p>

            <div className="flex justify-center">
              <Link
                to="/contact"
                onClick={handleScrollTop}
                className="text-on-surface hover:text-primary px-4 py-2 font-label-md text-label-md transition-colors duration-300 flex items-center justify-center gap-2 group hover-underline-animation"
              >
                {t.btnContact}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
