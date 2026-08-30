import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

export default function Company() {
  const { language } = useLanguage();
  const { content, isLoading } = useSiteContent();
  if (isLoading) return <div className="min-h-screen bg-black" />;
  const t = content[language].company;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px -10%",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".observer-target").forEach((element) => {
      observer.observe(element);
    });

    setTimeout(() => {
      document
        .querySelectorAll(".animate-fade-in-up")
        .forEach((el) => el.classList.add("is-visible"));
    }, 100);

    return () => observer.disconnect();
  }, [t]); 

  const visibleProjects = t.projects?.filter((p) => !p.isHidden) || [];

  return (
    <main className="bg-[#191c1e] text-[#ffffff] min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-44 animate-fade-in-up">
        <div className="absolute inset-0 z-0">
          <img
            alt="Bines Media Headquarters Exterior at Night"
            className="w-full h-full object-cover object-[center_10%] opacity-60"
            src={t.heroImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-[24px] md:px-[64px] max-w-[1440px] mx-auto flex flex-col items-center animate-fade-in-up">
          <h1 className="text-[40px] md:text-[64px] font-[800] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] text-[#ffffff] mb-[24px]">
            {t.heroTitle}
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#e0e3e5] max-w-2xl mx-auto bg-white/5 backdrop-blur-[12px] border border-white/10 p-[24px] rounded-xl shadow-lg">
            {t.heroDesc}
          </p>
        </div>
      </section>

     
      <section className="py-[32px] px-[24px] md:px-[64px] max-w-[1440px] mx-auto">
        <div className="mb-[32px] animate-fade-in-up observer-target">
          <h2 className="text-[32px] md:text-[40px] font-[700] tracking-[-0.01em] text-[#ffffff] flex items-center gap-3">
            <span
              className="material-symbols-outlined text-[#0669e8] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              corporate_fare
            </span>
            {t.keyInstTitle}
          </h2>
          <div className="w-16 h-1 bg-[#0669e8] mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {visibleProjects.map((project, idx) => (
            <div
              key={idx}
              className={`group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-[12px] border border-white/10 shadow-lg transition-transform duration-500 hover:-translate-y-1 animate-fade-in-up observer-target ${
                idx % 2 !== 0 ? "delay-150" : "" 
              }`}
            >
              <div className="h-[380px] w-full relative overflow-hidden">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105 opacity-80"
                  src={project.img}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/20 to-transparent"></div>
              </div>
              <div className="p-[20px] relative z-10 -mt-16">
                <h3 className="text-[24px] font-[700] leading-[1.3] text-[#ffffff] mb-2 drop-shadow-md">
                  {project.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#e0e3e5]">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Banner */}
      <section className="py-[48px] px-[24px] md:px-[64px] max-w-[1440px] mx-auto mb-[48px]">
        <div className="rounded-2xl bg-[#0669e8] p-[48px] flex flex-col md:flex-row items-center justify-evenly gap-[32px] relative overflow-hidden animate-fade-in-up observer-target">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]"></div>

          <div className="relative z-10 max-w-xl">
            <h3 className="text-[32px] font-[700] text-[#f2f3ff] mb-[12px]">
              {t.bannerTitle}
            </h3>
            <p className="text-[16px] leading-[1.6] text-[#f2f3ff]/80">
              {t.bannerDesc}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <img
              alt="Screen Interface Showing Ad"
              className="w-56 h-auto rounded-lg shadow-2xl border-4 border-[#f7f9fb]/10 rotate-2 transform object-cover object-top"
              src={t.bannerImg}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
