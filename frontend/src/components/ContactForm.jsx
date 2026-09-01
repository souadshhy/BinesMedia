import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/ContentProvider";

const formatWhatsAppNumber = (url) => {
  if (!url) return "";
  const match = url.match(/\d+/);
  if (!match) return url;

  let num = match[0];

  if (num.startsWith("90") && num.length === 12) {
    num = num.substring(2);
  }

  if (num.length === 10) {
    return `+90 (${num.slice(0, 3)}) ${num.slice(3, 6)} ${num.slice(6, 8)} ${num.slice(8, 10)}`;
  }

  return "+" + match[0];
};

export default function ContactForm() {
  const { language } = useLanguage();
  const [status, setStatus] = useState("");
  const { content, isLoading } = useSiteContent();

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
  }, [language]);

  if (isLoading || !content) return <div className="min-h-screen bg-black" />;

  const t = content[language].contact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t.msgSending);

    // Extract form data directly from the event target
    const formData = new FormData(e.target);

    // Inject your Web3Forms access key directly into the payload
    formData.append("access_key", "12158830-1db7-4c9c-810b-30b8830c2bb9");

    try {
      // Send directly to Web3Forms API, bypassing your Node backend
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus(t.msgSuccess);
        e.target.reset();
      } else {
        setStatus(t.msgFail);
      }
    } catch (error) {
      setStatus(t.msgError);
    }
  };

  const isError = status === t.msgFail || status === t.msgError;

  return (
    <main className="flex-grow pt-20 bg-[#f7f9fb] font-sans">
      <section className="bg-[#191c1e] py-24 md:py-32 relative overflow-hidden border-b border-[#0052b9]/30 animate-fade-in-up">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0052b9_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0052b9]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-[24px] md:px-[64px] relative z-10 text-center animate-fade-in-up">
          <h1 className="text-[40px] md:text-[64px] font-[800] text-[#ffffff] leading-[1.1] uppercase tracking-tight mb-[24px]">
            {t.heroTitle1}{" "}
            <span className="text-[#afc6ff]">{t.heroTitle2}</span>
          </h1>
          <p className="text-[18px] text-[#e0e3e5] max-w-2xl mx-auto leading-[1.6]">
            {t.heroDesc}
          </p>
        </div>
      </section>

      <section className="py-[48px] px-[24px] md:px-[64px] max-w-[1440px] mx-auto -mt-16 md:-mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#ffffff] shadow-[0_30px_60px_-15px_rgba(25,28,30,0.1)] border border-[#e0e3e5] rounded-[24px] overflow-hidden animate-fade-in-up observer-target">
          <div className="lg:col-span-5 bg-[#f2f4f6] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden border-r border-[#e0e3e5]">
            <div className="absolute -bottom-24 -left-24 text-[200px] font-black text-[#e0e3e5] opacity-50 select-none z-0">
              C
            </div>

            <div className="relative z-10">
              <h3 className="text-[32px] text-[#191c1e] mb-10 uppercase font-[700] tracking-tight">
                {t.commandCenter}
              </h3>

              <div className="flex items-start gap-6 mb-8 group">
                <div className="w-12 h-12 bg-[#ffffff] flex items-center justify-center rounded-[16px] shadow-sm text-[#0052b9] group-hover:bg-[#0052b9] group-hover:text-[#ffffff] transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    location_on
                  </span>
                </div>
                <a
                  href={content.en.contact.mapLink}
                  className="block"
                  target="_blank"
                >
                  <p className="text-[16px] text-[#191c1e] font-[500] leading-relaxed hover:text-[#0052b9] transition-colors cursor-pointer">
                    {t.hqL1}
                    <br />
                    {t.hqL2}
                  </p>
                </a>
              </div>

              <div className="flex items-start gap-6 mb-8 group">
                <div className="w-12 h-12 bg-[#ffffff] flex items-center justify-center rounded-[16px] shadow-sm text-[#0052b9] group-hover:bg-[#25D366] group-hover:text-[#ffffff] transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    forum
                  </span>
                </div>
                <a
                  href={content.en.contact.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="text-[12px] font-[600] text-[#546067] uppercase tracking-widest mb-1">
                    {t.waTitle}
                  </p>
                  <p className="text-[16px] text-[#191c1e] font-[500] leading-relaxed hover:text-[#25D366] transition-colors cursor-pointer">
                    {formatWhatsAppNumber(content.en.contact.waLink)}
                  </p>
                </a>
              </div>

              <div className="flex items-start gap-6 mb-8 group">
                <div className="w-12 h-12 bg-[#ffffff] flex items-center justify-center rounded-[16px] shadow-sm text-[#0052b9] group-hover:bg-[#dd2a7b] group-hover:text-[#ffffff] transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    photo_camera
                  </span>
                </div>
                <a
                  href={content.en.contact.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="text-[12px] font-[600] text-[#546067] uppercase tracking-widest mb-1">
                    {t.igTitle}
                  </p>
                  <p className="text-[16px] text-[#191c1e] font-[500] leading-relaxed hover:text-[#dd2a7b] transition-colors cursor-pointer">
                    {t.igHandle}
                  </p>
                </a>
              </div>

              <div className="relative z-10 mt-4">
                <p className="text-[14px] text-[#546067] font-[500] uppercase tracking-[0.05em] border-l-2 border-[#0052b9] pl-4 leading-relaxed">
                  {t.infraText}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-10 md:p-16 bg-[#ffffff]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Web3Forms Honeypot for spam prevention */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className="block text-[12px] font-[600] uppercase tracking-widest text-[#546067] mb-3">
                    {t.formName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.formNamePl}
                    required
                    className="w-full bg-[#f7f9fb] border-b-2 border-[#e0e3e5] px-4 py-4 text-[16px] text-[#191c1e] focus:outline-none focus:border-[#0052b9] focus:bg-[#0052b9]/5 transition-all duration-300 rounded-t-lg"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[12px] font-[600] uppercase tracking-widest text-[#546067] mb-3">
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t.formEmailPl}
                    required
                    className="w-full bg-[#f7f9fb] border-b-2 border-[#e0e3e5] px-4 py-4 text-[16px] text-[#191c1e] focus:outline-none focus:border-[#0052b9] focus:bg-[#0052b9]/5 transition-all duration-300 rounded-t-lg"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-[12px] font-[600] uppercase tracking-widest text-[#546067] mb-3">
                  {t.formObj}
                </label>
                <textarea
                  name="message"
                  placeholder={t.formObjPl}
                  required
                  className="w-full bg-[#f7f9fb] border-b-2 border-[#e0e3e5] px-4 py-4 text-[16px] text-[#191c1e] focus:outline-none focus:border-[#0052b9] focus:bg-[#0052b9]/5 transition-all duration-300 h-48 resize-none rounded-t-lg"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                <button
                  type="submit"
                  className="text-[#191c1e] hover:text-[#0052b9] font-[600] text-[14px] uppercase tracking-[0.05em] transition-colors duration-300 flex items-center justify-center gap-2 group bg-transparent border-none p-0 w-full sm:w-auto"
                >
                  {t.btnSubmit}
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">
                    arrow_forward
                  </span>
                </button>

                {status && (
                  <div
                    className={`text-[12px] font-[600] tracking-widest uppercase flex items-center gap-2 ${
                      isError ? "text-[#ba1a1a]" : "text-[#007c7e]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isError ? "error" : "check_circle"}
                    </span>
                    {status}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
