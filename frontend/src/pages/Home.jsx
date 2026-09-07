import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Home() {
  const location = useLocation();
  const { language } = useLanguage();
  const { content, isLoading } = useSiteContent();

  // State to track our scroll progress (0 to 1) for the hero section
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll listener for the door effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled relative to one screen height
      let progress = scrollY / windowHeight;

      // Clamp the value between 0 and 1
      if (progress > 1) progress = 1;
      if (progress < 0) progress = 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Standard observer for the rest of the page animations
  useEffect(() => {
    if (location.hash === "#map") {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        setTimeout(() => {
          mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

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

  const handleScrollTop = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-[#191c1e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0052b9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const t = content[language].home;
  const allFeatures = t.features || [];
  const imgFeatures = allFeatures.slice(0, 2).filter((f) => !f.isHidden);
  const cardFeatures = allFeatures.slice(2).filter((f) => !f.isHidden);
  const visibleGuarantees = t.guarantees?.filter((g) => !g.isHidden) || [];

  // Doors finish opening slightly earlier in the scroll (at 70% of the first window height)
  const doorProgress = Math.min(scrollProgress / 0.7, 1);

  // Monitor starts appearing a bit later and finishes exactly when the scroll hits 100% of the first screen
  const monitorProgress = Math.max(
    0,
    Math.min((scrollProgress - 0.2) / 0.8, 1),
  );

  return (
    <main>
      <style>
        {`
          /* INDUSTRIAL METAL TEXTURE - LEFT DOOR */
          .bg-metal-left {
            background-color: #12141a;
            background-image: 
              linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(15,22,35,0.7) 40%, rgba(60,95,145,0.4) 85%, rgba(180,210,255,0.2) 96%, rgba(0,0,0,0.95) 100%),
              repeating-linear-gradient(to right, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px, transparent 5px, transparent 13px);
          }

          /* INDUSTRIAL METAL TEXTURE - RIGHT DOOR */
          .bg-metal-right {
            background-color: #12141a;
            background-image: 
              linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(180,210,255,0.2) 4%, rgba(60,95,145,0.4) 15%, rgba(15,22,35,0.7) 60%, rgba(0,0,0,0.85) 100%),
              repeating-linear-gradient(to right, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px, transparent 5px, transparent 13px);
          }

          /* Smoky Gray Glow Engraving */
          .text-neon {
            color: #0d1522; /* Lightened the dark blue fill slightly so it reads better */
            text-shadow: 
              0 0 3px rgba(255, 255, 255, 0.5), /* Sharp, thin white rim */
              0 0 10px rgba(200, 200, 200, 0.5), /* Bright grayish inner glow */
              0 0 25px rgba(150, 160, 170, 0.4), /* Smoky gray ambient backlight */
              -5px -5px 15px rgba(0, 0, 0, 0.8); /* Retained depth shadow so it still looks embedded in the metal */
          }
        `}
      </style>

      {/* HERO SECTION SCROLL WRAPPER */}
      <section className="relative h-[350vh] w-full bg-black">
        {/* STICKY CONTAINER */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden [perspective:1000px]">
          {/* ELEVATOR DOORS OVERLAY */}
          <div className="absolute inset-0 z-50 flex pointer-events-none overflow-hidden">
            {/* Left Door */}
            <div
              className="w-1/2 h-full bg-metal-left border-r-[2px] border-[#0a0f16] shadow-[inset_-40px_0_80px_rgba(0,0,0,0.7),_inset_0_0_20px_rgba(0,0,0,0.8)] flex justify-end items-center relative"
              style={{
                transform: `translateX(-${doorProgress * 100}%)`,
                willChange: "transform",
              }}
            >
              <h2 className="text-[11vw] sm:text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter text-neon pr-2 sm:pr-4 md:pr-8 select-none z-10">
                Bines
              </h2>
              {/* Inner gap shadow */}
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black/80 to-transparent z-20"></div>
            </div>

            {/* Right Door */}
            <div
              className="w-1/2 h-full bg-metal-right border-l-[2px] border-[#0a0f16] shadow-[inset_40px_0_80px_rgba(0,0,0,0.7),_inset_0_0_20px_rgba(0,0,0,0.8)] flex justify-start items-center relative"
              style={{
                transform: `translateX(${doorProgress * 100}%)`,
                willChange: "transform",
              }}
            >
              <h2 className="text-[11vw] sm:text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter text-neon pl-2 sm:pl-4 md:pl-8 select-none z-10">
                Media
              </h2>
              {/* Inner gap shadow */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black/80 to-transparent z-20"></div>
            </div>
          </div>

          {/* BACKGROUND IMAGE - Zooms slightly as you scroll */}
          <div
            className="absolute inset-0 z-0"
            style={{
              transform: `scale(${1 + scrollProgress * 0.1})`,
              willChange: "transform",
            }}
          >
            <img
              src={t.heroImg}
              alt="Elevator interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* 3D MONITOR CARD - Revealed entirely by scroll progress */}
          <div
            className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center mt-24 [transform-style:preserve-3d]"
            style={{
              opacity: monitorProgress,
              transform: `scale(${0.85 + monitorProgress * 0.15}) translateZ(${-150 + monitorProgress * 150}px)`,
              filter: `blur(${10 - monitorProgress * 10}px)`,
              willChange: "transform, opacity, filter",
            }}
          >
            <div className="w-full rounded-xl border border-white/20 bg-black/40 backdrop-blur-xl p-8 md:p-12 text-center shadow-[0_0_60px_rgba(6,105,232,0.25)] transition-transform duration-700 ease-out hover:scale-[1.02] [transform-style:preserve-3d]">
              <div className="flex flex-col gap-6 items-center [transform:translateZ(60px)]">
                <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-headline-xl text-white leading-tight font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {t.heroTitle1}
                  <br />
                  <span className="text-primary-fixed-dim drop-shadow-[0_0_15px_rgba(6,105,232,0.6)]">
                    {t.heroTitle2}
                  </span>
                </h1>
                <p className="text-body-md text-gray-200 max-w-xl mx-auto drop-shadow-md">
                  {t.heroDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-8 mt-6 justify-center w-full">
                  <Link
                    to="/contact"
                    onClick={handleScrollTop}
                    className="text-white/70 hover:text-white px-4 py-2 font-label-md text-label-md transition-colors duration-300 flex items-center justify-center gap-2 group hover-underline-animation"
                  >
                    {t.btnStart}
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    to="/services"
                    onClick={handleScrollTop}
                    className="text-white/70 hover:text-white px-4 py-2 font-label-md text-label-md transition-colors duration-300 flex items-center justify-center hover-underline-animation"
                  >
                    {t.btnExplore}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The rest of the sections remain completely unchanged below */}
      <section className="relative w-full overflow-hidden py-24 md:py-32 z-0">
        <div className="absolute top-10 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute top-[40%] -right-20 w-[500px] h-[500px] bg-tertiary-container/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-primary-fixed-dim/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute top-[15%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent -rotate-2 pointer-events-none z-0"></div>
        <div className="absolute top-[65%] -left-[10%] w-[120%] h-[3px] bg-gradient-to-r from-transparent via-primary-fixed-dim/50 to-transparent rotate-3 pointer-events-none z-0"></div>
        <div className="absolute top-[85%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent -rotate-1 pointer-events-none z-0"></div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="mb-24 max-w-4xl border-l-4 border-primary pl-8 relative z-10">
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg font-extrabold text-on-surface mb-6 tracking-tight uppercase animate-fade-in-up observer-target">
              {t.infraTitle1} <br />
              <span className="text-primary">{t.infraTitle2}</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant text-xl leading-relaxed animate-fade-in-up observer-target delay-150">
              {t.infraDesc}
            </p>
          </div>

          <div className="flex flex-col gap-32 relative z-10">
            {imgFeatures.map((feature, idx) => {
              const originalIndex = allFeatures.indexOf(feature);
              const isEven = originalIndex % 2 === 0;

              return (
                <div
                  key={`img-feature-${idx}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10"
                >
                  <div
                    className={`md:col-span-5 flex flex-col gap-6 relative z-10 ${isEven ? "order-2 md:order-1" : "order-2 md:order-2"}`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl z-0 pointer-events-none ${isEven ? "bg-primary/10" : "bg-tertiary-container/10"}`}
                    ></div>
                    <div className="absolute -top-16 -left-8 text-[120px] font-black text-outline-variant opacity-60 select-none z-0 animate-fade-in-up observer-target delay-75">
                      {feature.num}
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mb-4 uppercase tracking-wide animate-fade-in-up observer-target delay-150">
                        {feature.title}
                      </h3>
                      <p className="text-body-lg text-on-surface-variant animate-fade-in-up observer-target delay-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`md:col-span-7 h-[400px] md:h-[600px] rounded-sm overflow-hidden shadow-2xl relative group z-10 animate-fade-in-up observer-target ${isEven ? "order-1 md:order-2 border-b-4 border-primary" : "order-1 md:order-1 border-t-4 border-primary"}`}
                  >
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none"></div>
                    <div
                      className="w-auto h-full bg-cover bg-[center_30%] transition-transform duration-700 group-hover:scale-105 bg-surface-container"
                      style={
                        feature.img
                          ? { backgroundImage: `url('${feature.img}')` }
                          : {}
                      }
                    ></div>
                  </div>
                </div>
              );
            })}

            {cardFeatures.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 relative z-10">
                {cardFeatures.map((feature, idx) => {
                  const originalIndex = allFeatures.indexOf(feature);
                  return (
                    <div
                      key={`card-feature-${idx}`}
                      className={`bg-surface/80 backdrop-blur-md p-12 border-l-4 border-primary hover:bg-white transition-all duration-500 relative overflow-hidden group shadow-lg z-10 animate-fade-in-up observer-target ${
                        originalIndex % 2 !== 0
                          ? "md:translate-y-24 delay-200"
                          : ""
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary/20 to-transparent transform rotate-45 translate-x-1/2 -translate-y-1/2 z-0"></div>
                      <div className="absolute top-4 right-8 text-[80px] font-black text-outline-variant opacity-40 select-none group-hover:scale-110 transition-transform duration-500 z-0">
                        {feature.num}
                      </div>
                      <h3 className="font-headline-md text-headline-lg font-bold text-on-surface mb-6 uppercase tracking-wider relative z-10">
                        {feature.title}
                      </h3>
                      <p className="text-body-lg text-on-surface-variant relative z-10">
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-inverse-surface py-24 md:py-32 relative overflow-hidden border-t border-primary/30 z-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0052b9_1px,transparent_1px)] [background-size:40px_40px] z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-3 text-primary-fixed-dim font-label-md uppercase tracking-[0.3em] mb-8 animate-fade-in-up observer-target">
                <span className="w-12 h-[1px] bg-primary-fixed-dim"></span>
                {t.guarantee}
              </div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-[80px] font-black text-white mb-8 leading-[0.9] uppercase tracking-tighter animate-fade-in-up observer-target delay-100">
                {t.attention1}
                <br />
                <span className="text-primary-fixed-dim">{t.attention2}</span>
              </h2>

              <div className="space-y-12 mt-8">
                {visibleGuarantees.map((guarantee, idx) => {
                  const delayClasses = ["delay-200", "delay-300", "delay-500"];
                  const delay = delayClasses[idx % delayClasses.length];

                  return (
                    <div
                      key={`guarantee-${idx}`}
                      className={`group animate-fade-in-up observer-target ${delay}`}
                    >
                      <div className="flex items-center gap-6 mb-4">
                        <div className="w-1 h-8 bg-primary"></div>
                        <span className="text-body-md text-white uppercase tracking-widest font-bold">
                          {guarantee.title}
                        </span>
                      </div>
                      <p className="text-surface-dim/70 pl-7 border-l border-white/10">
                        {guarantee.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              id="map"
              className="lg:col-span-7 relative animate-fade-in-up observer-target delay-300 z-10"
            >
              <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[0_0_40px_rgba(6,105,232,0.3)] group">
                <iframe
                  src={content.en.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                ></iframe>

                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full pointer-events-none z-20 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0 hidden md:flex">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    location_on
                  </span>
                  <span className="font-label-sm text-white uppercase tracking-widest">
                    {t.hqLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 my-16 z-0">
        <div className="bg-surface-container rounded-sm p-8 md:p-20 text-center border-y-4 border-primary relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0052b9_2px,transparent_2px)] [background-size:30px_30px] z-0 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8 font-black uppercase tracking-tight animate-fade-in-up observer-target">
              {t.ctaTitle}
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-12 text-xl animate-fade-in-up observer-target delay-150">
              {t.ctaDesc}
            </p>
            <div className="flex justify-center animate-fade-in-up observer-target delay-300">
              <Link
                to="/contact"
                onClick={handleScrollTop}
                className="text-on-surface hover:text-primary px-4 py-2 font-label-md text-label-md transition-colors duration-300 flex items-center justify-center gap-2 group hover-underline-animation"
              >
                {t.btnStart}
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
