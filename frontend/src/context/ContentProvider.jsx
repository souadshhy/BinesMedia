import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import exterior1 from "../assets/exterior_1.jpg";
import resExample1 from "../assets/ozelExample1.jpg";
import resExample1png from "../assets/resExample1.png";
import resExample3 from "../assets/screen1.png";
import companyAndName from "../assets/compay&name.jpg";
import bannerImg from "../assets/ozelExample2.jpg";
import screen2 from "../assets/screen2.png";
import screen3 from "../assets/screen3.png";

const ContentContext = createContext();

// Helper function to deeply merge DB data over local fallback data
const mergeDeep = (target, source) => {
  // Check if item is a pure object (and NOT an array, because we want DB arrays to fully overwrite local arrays)
  const isObject = (obj) =>
    obj && typeof obj === "object" && !Array.isArray(obj);

  if (!isObject(target) || !isObject(source)) return source;

  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = mergeDeep(target[key], source[key]);
      }
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });
  return output;
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(siteContent);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap the fetch in useCallback so we can trigger it on window focus
  const fetchDbContent = useCallback(() => {
    // Add cache: 'no-store' to force the browser to get fresh data
    fetch("/api/content", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("No DB content");
        return res.json();
      })
      .then((data) => {
        if (data && data.en && data.tr) {
          // MERGE DB data over the local siteContent fallback
          // This ensures new keys in code (like emailAddress) exist even if the DB is older
          const mergedContent = mergeDeep(siteContent, data);
          setContent(mergedContent);
        }
      })
      .catch((err) => console.log("Using local content. DB fetch failed:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchDbContent(); // Fetch on initial load

    // Auto-refresh the live site the moment you click back to its tab
    window.addEventListener("focus", fetchDbContent);
    return () => window.removeEventListener("focus", fetchDbContent);
  }, [fetchDbContent]);

  return (
    <ContentContext.Provider value={{ content, setContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useSiteContent = () => useContext(ContentContext);

export const siteContent = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      company: "Company",
      contact: "Contact Us",
    },
    home: {
      heroImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCblxN3joQNu8lYXBXDljDPoB_fU2VnYlj_P5a2SKsDGXRpnjc-cl4YXF6hrS8a_QUUVdEASIJYUg7ObEt18ycy_gMtjaTknJ4ge5NmcvJR1lXjeIMeG79UgBL6IxDF7HRbCfv_xrGh7ZSIMXV6mYoLNbZKr12AIu2ZHlOaOjRgTq8_Sci2zTUdmeZwoUC5sARSlR3vE1Q9KrX65VPD0WAVDV59vbLlgMJguW0RKPDKgoea1osbviIC",
      heroTitle1: "Beyond",
      heroTitle2: "Smart Buildings.",
      heroDesc:
        "Pioneering the next generation of communication infrastructure and digital advertising networks in Gaziantep. We transform vertical transit into high-impact, 100% captive media experiences.",
      btnStart: "Start Campaign",
      btnExplore: "Our Services",
      infraTitle1: "Precision",
      infraTitle2: "Infrastructure",
      infraDesc:
        "Comprehensive OOH digital solutions engineered for maximum impact and measurable results in high-dwell-time environments.",

      features: [
        {
          num: "01",
          title: "In-Elevator Network",
          desc: "A network of premium digital screens installed inside residential complexes and commercial buildings across Gaziantep. Targeting a captive audience to guarantee maximum visibility and frequent visual impressions.",
          img: screen2,
          isHidden: false,
        },
        {
          num: "02",
          title: "Hyper-Local Targeting",
          desc: "Location-based target filtering. Choose specific high-income neighborhoods, luxury residential estates, or dense commercial hubs like İbrahimli to ensure your campaigns reach the exact demographics you need, eliminating wasted ad spend.",
          img: screen3,
          isHidden: false,
        },
        {
          num: "03",
          title: "Campaign Analytics",
          desc: "Unlike static frame advertisements, we provide digital, measurable ad solutions. Track how often your loops run, manage deployment timing, and dynamically alter your media based on ongoing marketing data.",
          img: "",
          isHidden: false,
        },
        {
          num: "04",
          title: "Content Strategy",
          desc: "Collaborate with our experts to develop eye-catching, short-form visual content. We format animations, video clips, and high-impact digital posters tailored specifically for brief elevator rides.",
          img: "",
          isHidden: false,
        },
      ],

      guarantee: "Performance Guarantee",
      attention1: "100%",
      attention2: "Attention.",
      hqLocation: "Building Location", // Changed from HQ Location

      guarantees: [
        {
          title: "Zero ad-skipping",
          desc: "A physically constrained elevator environment ensures your message is the primary focus with few distractions.",
          isHidden: false,
        },
        {
          title: "High-frequency",
          desc: "Multiple daily encounters build deep brand familiarity and recall among residents and professionals.",
          isHidden: false,
        },
        {
          title: "Contextual safety",
          desc: "Premium residential and commercial environments that align seamlessly with high-end brand positioning.",
          isHidden: false,
        },
      ],

      ctaTitle: "Ready to elevate your message?",
      ctaDesc:
        "Join top-tier brands leveraging Bines Media infrastructure to reach audiences when they are most attentive.",
    },
    services: {
      heroTitle1: "Infrastructure &",
      heroTitle2: "Services.",
      heroDesc:
        "Engineered for maximum impact in captive environments. Explore the core pillars powering our premium vertical transit network.",
      ctaTitle: "Secure Your Network Placement",
      ctaDesc:
        "Connect with our strategy team to discuss inventory availability, hyper-local targeting, and custom campaign deployments across our premium screens.",
      btnContact: "Contact Us Now",
      caps: [
        {
          title: "In-Elevator Digital Screens",
          desc: "High-definition displays engineered for captive audience engagement. Our screens integrate seamlessly into premium architectural environments, delivering crisp, dynamic content to individuals standing in an enclosed space with few distractions.",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTCSMm9DyUxtpB9yKAIfop0a3bYM6KPuchDFQYRuTDE3vEmTZZAY8CSEFdTpq0wKC1KFGRwzaaaEX9rso-icjw7Ga-kRSk0yQ3kxiIdywIz6enQ-F24pOhNcppVVVjOZOavTydSshrsGMUfvgcP-vGBNStI0SSxwl62iqJFwilKqHBzjJKnoGZLSapFd1JYAZVdyiqKrbgqvI85H6hs4-JxSRbMzX1Jc44BIrtfbrkKJMZ1Z2xWmJ",
          bullets: ["Maximum Visibility", "High Ad Retention"],
          isHidden: false,
        },
        {
          title: "Hyper-Local Targeting",
          desc: "Eliminate wasted ad spend by displaying your campaigns only where they matter. We provide location-based filtering allowing you to select specific high-income neighborhoods, luxury estates, or dense commercial hubs in Gaziantep.",
          img: resExample3,
          isHidden: false,
        },
        {
          title: "Analytics & Content Strategy",
          desc: "Move beyond static billboards. Track exact loop frequencies and timing. Partner with our team to format animations and high-impact digital posters tailored precisely for the brief duration of an elevator ride.",
          img: companyAndName,
          isHidden: false,
        },
      ],
    },
    company: {
      heroImg: exterior1,
      bannerImg: bannerImg,
      heroTitle: "Our Presence",
      heroDesc:
        "Engineering precision digital infrastructure for the modern urban landscape. We deploy high-impact OOH networks where captive audiences reside.",
      keyInstTitle: "Key Installations",

      projects: [
        {
          title: "Bines Media Complex",
          desc: "Strategic deployment of premium digital displays within our flagship corporate hub, showcasing high-impact media capabilities in a professional environment.",
          img: resExample1,
          isHidden: false,
        },
        {
          title: "Class A Residential",
          desc: "Integrated smart-screen technology within luxury residential elevators, providing high-dwell-time engagement in premium environments.",
          img: resExample1png,
          isHidden: false,
        },
      ],

      bannerTitle: "Precision Targeting Technology",
      bannerDesc:
        "Our proprietary infrastructure utilizes edge-computing analytics to deliver hyper-relevant content to hyper-local audiences.",
    },
    contact: {
      heroTitle1: "Initiate",
      heroTitle2: "Contact.",
      heroDesc:
        "Ready to deploy high-impact digital campaigns? Connect with our infrastructure team to secure premium media inventory across the network.",
      commandCenter: "Command Center",
      hqTitle: "Bines Media Building",
      hqL1: "Pancarlı, İbrahimli Yolu Cd.",
      hqL2: "Şehitkamil/Gaziantep",

      mapLink: "https://maps.app.goo.gl/VognFTg4qe6DTk7d7",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.368362386634!2d37.34275437531601!3d37.072532652301774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84b1ad2342c27a1d%3A0xb6256b1b73f02c6d!2sBines%20Media!5e0!3m2!1sen!2str!4v1788018878350!5m2!1sen!2str",

      emailTitle: "Email",
      emailAddress: "InfoBinesMedia.net@gmail.com",

      igTitle: "Instagram",
      igHandle: "See us up close",
      igLink: "https://instagram.com/binesmediaa",

      infraText:
        "Infrastructure deployments scaling across premium vertical transit environments.",
      formName: "Full Name",
      formNamePl: "e.g. Ahmet Yılmaz",
      formEmail: "Corporate Email",
      formEmailPl: "e.g. ahmet@sirket.com",
      formObj: "Campaign Objectives",
      formObjPl:
        "Outline your target demographics, preferred environments, and operational goals...",
      btnSubmit: "Make Request",
      msgSending: "Sending transmission...",
      msgSuccess:
        "Message successfully received. Our strategy team will contact you shortly.",
      msgFail: "Failed to send transmission. Please try again.",
      msgError: "An error occurred connecting to the network.",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      company: "Şirket",
      contact: "Bize Ulaşın",
    },
    home: {
      heroImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCblxN3joQNu8lYXBXDljDPoB_fU2VnYlj_P5a2SKsDGXRpnjc-cl4YXF6hrS8a_QUUVdEASIJYUg7ObEt18ycy_gMtjaTknJ4ge5NmcvJR1lXjeIMeG79UgBL6IxDF7HRbCfv_xrGh7ZSIMXV6mYoLNbZKr12AIu2ZHlOaOjRgTq8_Sci2zTUdmeZwoUC5sARSlR3vE1Q9KrX65VPD0WAVDV59vbLlgMJguW0RKPDKgoea1osbviIC",
      heroTitle1: "Akıllı Binaların",
      heroTitle2: "Ötesinde.",
      heroDesc:
        "Gaziantep'te iletişim altyapısının ve dijital reklam ağının yeni nesline öncülük ediyoruz. Dikey ulaşımı yüksek etkili, %100 esir kitle medya deneyimlerine dönüştürüyoruz.",
      btnStart: "Kampanya Başlat",
      btnExplore: "Hizmetlerimiz",
      infraTitle1: "Hassas",
      infraTitle2: "Altyapı",
      infraDesc:
        "Yüksek kalış süresine sahip ortamlarda maksimum etki ve ölçülebilir sonuçlar için tasarlanmış kapsamlı dijital Açıkhava (OOH) çözümleri.",

      features: [
        {
          num: "01",
          title: "Asansör İçi Ağ",
          desc: "Gaziantep genelinde konut ve ticari binalara kurulan premium dijital ekran ağı. Maksimum görünürlük ve sık görsel gösterim sağlamak için esir bir kitleyi hedefler.",
          img: screen2,
          isHidden: false,
        },
        {
          num: "02",
          title: "Hiper-Yerel Hedefleme",
          desc: "Konum tabanlı hedef filtreleme. Kampanyalarınızın tam olarak ihtiyacınız olan demografiye ulaşmasını sağlamak ve boşa harcanan reklam bütçesini ortadan kaldırmak için İbrahimli gibi yüksek gelirli mahalleleri veya yoğun ticari merkezleri seçin.",
          img: screen3,
          isHidden: false,
        },
        {
          num: "03",
          title: "Kampanya Analitiği",
          desc: "Statik reklam panolarının aksine, dijital ve ölçülebilir çözümler sunuyoruz. Döngülerinizin ne sıklıkla çalıştığını izleyin, zamanlamasını yönetin ve verilerine göre medyanızı dinamik olarak değiştirin.",
          img: "",
          isHidden: false,
        },
        {
          num: "04",
          title: "İçerik Stratejisi",
          desc: "Dikkat çekici, kısa formlu görsel içerikler geliştirmek için uzmanlarımızla çalışın. Kısa asansör yolculukları için özel olarak tasarlanmış yüksek etkili animasyon ve dijital posterleri formatlıyoruz.",
          img: "",
          isHidden: false,
        },
      ],

      guarantee: "Performans Garantisi",
      attention1: "%100",
      attention2: "Dikkat.",
      hqLocation: "Bina Konumu", // Changed from Merkez Konumu

      guarantees: [
        {
          title: "Sıfır reklam atlama",
          desc: "Fiziksel olarak kısıtlı bir asansör ortamı, mesajınızın dikkati dağılmadan ana odak noktası olmasını sağlar.",
          isHidden: false,
        },
        {
          title: "Yüksek frekans",
          desc: "Günlük çoklu karşılaşmalar, bölge sakinleri ve profesyoneller arasında derin marka aşinalığı yaratır.",
          isHidden: false,
        },
        {
          title: "Bağlamsal güvenlik",
          desc: "Üst düzey marka konumlandırmasıyla kusursuz bir şekilde uyum sağlayan premium konut ve ticari ortamlar.",
          isHidden: false,
        },
      ],

      ctaTitle: "Mesajınızı yükseltmeye hazır mısınız?",
      ctaDesc:
        "Bines Media altyapısını kullanarak kitlelere en dikkatli oldukları anda ulaşan üst düzey markalara katılın.",
    },
    services: {
      heroTitle1: "Altyapı &",
      heroTitle2: "Hizmetler.",
      heroDesc:
        "Esir kitle ortamlarında maksimum etki için tasarlandı. Premium dikey ulaşım ağımızı güçlendiren temel özellikleri keşfedin.",
      ctaTitle: "Ağdaki Yerinizi Ayırtın",
      ctaDesc:
        "Envanter durumu, hiper-yerel hedefleme ve premium ekranlarımızdaki özel kampanya dağıtımlarını görüşmek için strateji ekibimizle iletişime geçin.",
      btnContact: "Hemen İletişime Geçin",
      caps: [
        {
          title: "Dijital Asansör Ekranları",
          desc: "Esir kitle etkileşimi için tasarlanmış yüksek çözünürlüklü ekranlar. Ekranlarımız birinci sınıf mimari ortamlara sorunsuz bir şekilde entegre olarak, dikkati dağıtacak hiçbir unsurun bulunmadığı kapalı bir alanda bulunan kişilere net ve dinamik içerik sunar.",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTCSMm9DyUxtpB9yKAIfop0a3bYM6KPuchDFQYRuTDE3vEmTZZAY8CSEFdTpq0wKC1KFGRwzaaaEX9rso-icjw7Ga-kRSk0yQ3kxiIdywIz6enQ-F24pOhNcppVVVjOZOavTydSshrsGMUfvgcP-vGBNStI0SSxwl62iqJFwilKqHBzjJKnoGZLSapFd1JYAZVdyiqKrbgqvI85H6hs4-JxSRbMzX1Jc44BIrtfbrkKJMZ1Z2xWmJ",
          bullets: ["Maksimum Görünürlük", "Yüksek Reklam Akılda Kalıcılığı"],
          isHidden: false,
        },
        {
          title: "Hiper-Yerel Hedefleme",
          desc: "Kampanyalarınızı yalnızca önemli oldukları yerlerde göstererek boşa harcanan reklam bütçesini ortadan kaldırın. Gaziantep'teki yüksek gelirli mahalleleri, lüks siteleri veya yoğun ticari merkezleri seçmenize olanak tanıyan konum tabanlı filtreleme sağlıyoruz.",
          img: resExample3,
          isHidden: false,
        },
        {
          title: "Analitik ve İçerik Stratejisi",
          desc: "Statik reklam panolarının ötesine geçin. Döngü frekanslarını ve zamanlamayı tam olarak izleyin. Asansör yolculuğunun kısa süresi için özel olarak tasarlanmış animasyonları ve dijital posterleri formatlamak için ekibimizle işbirliği yapın.",
          img: companyAndName,
          isHidden: false,
        },
      ],
    },
    company: {
      heroImg: exterior1,
      bannerImg: bannerImg,
      heroTitle: "Varlığımız",
      heroDesc:
        "Modern kentsel peyzaj için hassas dijital altyapı tasarlıyoruz. Esir kitlelerin bulunduğu yerlerde yüksek etkili Açıkhava (OOH) ağları kuruyoruz.",
      keyInstTitle: "Ana Kurulumlar",
      projects: [
        {
          title: "Bines Media Kompleksi",
          desc: "Profesyonel bir ortamda yüksek etkili medya yeteneklerini sergileyen, amiral gemisi kurumsal merkezimizde premium dijital ekranların stratejik kurulumu.",
          img: resExample1,
          isHidden: false,
        },
        {
          title: "A Sınıfı Konutlar",
          desc: "Lüks konut asansörlerine entegre akıllı ekran teknolojisi, özel ortamlarda yüksek kalış süresiyle etkileşim sağlar.",
          img: resExample1png,
          isHidden: false,
        },
      ],
      bannerTitle: "Hassas Hedefleme Teknolojisi",
      bannerDesc:
        "Özel altyapımız, hiper-yerel kitlelere en alakalı içeriği sunmak için uç bilişim analitiğini kullanır.",
    },
    contact: {
      heroTitle1: "İletişime",
      heroTitle2: "Geçin.",
      heroDesc:
        "Yüksek etkili dijital kampanyalar başlatmaya hazır mısınız? Ağımızdaki premium medya envanterini güvence altına almak için altyapı ekibimizle bağlantı kurun.",
      commandCenter: "Komuta Merkezi",
      hqTitle: "Bines Media Binası",
      hqL1: "Pancarlı, İbrahimli Yolu Cd.",
      hqL2: "Şehitkamil/Gaziantep",

      mapLink: "https://maps.app.goo.gl/your-location-link",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.368362386634!2d37.34275437531601!3d37.072532652301774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84b1ad2342c27a1d%3A0xb6256b1b73f02c6d!2sBines%20Media!5e0!3m2!1sen!2str!4v1788018878350!5m2!1sen!2str",

      emailTitle: "E-posta",
      emailAddress: "InfoBinesMedia.net@gmail.com",

      igTitle: "Instagram",
      igHandle: "Bizi yakından görün",
      igLink: "https://instagram.com/binesmediaa",

      infraText:
        "Premium dikey ulaşım ortamlarında ölçeklenen altyapı kurulumları.",
      formName: "Ad Soyad",
      formNamePl: "Örn. Ahmet Yılmaz",
      formEmail: "Kurumsal E-posta",
      formEmailPl: "Örn. ahmet@sirket.com",
      formObj: "Kampanya Hedefleri",
      formObjPl:
        "Hedef kitlenizi, tercih ettiğiniz ortamları ve operasyonel hedeflerinizi özetleyin...",
      btnSubmit: "Talep Gönder",
      msgSending: "İletiliyor...",
      msgSuccess:
        "Mesaj başarıyla alındı. Strateji ekibimiz kısa süre içinde sizinle iletişime geçecektir.",
      msgFail: "İletim gönderilemedi. Lütfen tekrar deneyin.",
      msgError: "Ağa bağlanırken bir hata oluştu.",
    },
  },
};
