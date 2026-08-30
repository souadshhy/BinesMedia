import { useState, useEffect } from "react";
import { useSiteContent } from "../context/ContentProvider";

const schema = {
  nav: {
    "Navigation Links": [
      { key: "home", label: "Home Link", type: "text" },
      { key: "services", label: "Services Link", type: "text" },
      { key: "company", label: "Company Link", type: "text" },
      { key: "contact", label: "Contact Us Link", type: "text" },
    ],
  },
  home: {
    "Hero Section": [
      { key: "heroTitle1", label: "Title Part 1", type: "text" },
      { key: "heroTitle2", label: "Title Part 2", type: "text" },
      { key: "heroDesc", label: "Description", type: "textarea" },
      { key: "heroImg", label: "Hero Background Image", type: "image" },
      { key: "btnStart", label: "Primary Button", type: "text" },
      { key: "btnExplore", label: "Secondary Button", type: "text" },
    ],
    "Infrastructure Header": [
      { key: "infraTitle1", label: "Title Part 1", type: "text" },
      { key: "infraTitle2", label: "Title Part 2", type: "text" },
      { key: "infraDesc", label: "Description", type: "textarea" },
    ],
    "Infrastructure Features List": [
      {
        key: "features",
        label: "Features",
        type: "array",
        itemSchema: {
          num: "text",
          title: "text",
          desc: "textarea",
          img: "image",
        },
      },
    ],
    "Performance Guarantee Header": [
      { key: "guarantee", label: "Section Tag", type: "text" },
      { key: "attention1", label: "Highlight 1", type: "text" },
      { key: "attention2", label: "Highlight 2", type: "text" },
      { key: "hqLocation", label: "Map Tag", type: "text" },
    ],
    "Guarantees List": [
      {
        key: "guarantees",
        label: "Guarantees",
        type: "array",
        itemSchema: { title: "text", desc: "textarea" },
      },
    ],
    "Call to Action": [
      { key: "ctaTitle", label: "Title", type: "text" },
      { key: "ctaDesc", label: "Description", type: "textarea" },
    ],
  },
  services: {
    "Hero Section": [
      { key: "heroTitle1", label: "Title Part 1", type: "text" },
      { key: "heroTitle2", label: "Title Part 2", type: "text" },
      { key: "heroDesc", label: "Description", type: "textarea" },
    ],
    "Service Offerings": [
      {
        key: "caps",
        label: "Capabilities",
        type: "array",
        itemSchema: { title: "text", desc: "textarea", img: "image" },
      },
    ],
    "Call to Action": [
      { key: "ctaTitle", label: "Title", type: "text" },
      { key: "ctaDesc", label: "Description", type: "textarea" },
      { key: "btnContact", label: "Button Text", type: "text" },
    ],
  },
  company: {
    "Hero Section": [
      { key: "heroTitle", label: "Title", type: "text" },
      { key: "heroDesc", label: "Description", type: "textarea" },
      { key: "heroImg", label: "Hero Background Image", type: "image" },
    ],
    "Key Installations": [
      { key: "keyInstTitle", label: "Section Title", type: "text" },
    ],
    "Projects List": [
      {
        key: "projects",
        label: "Projects",
        type: "array",
        itemSchema: { title: "text", desc: "textarea", img: "image" },
      },
    ],
    "Technology Banner": [
      { key: "bannerTitle", label: "Banner Title", type: "text" },
      { key: "bannerDesc", label: "Banner Description", type: "textarea" },
      { key: "bannerImg", label: "Banner Image", type: "image" },
    ],
  },
  contact: {
    "Hero Section": [
      { key: "heroTitle1", label: "Title Part 1", type: "text" },
      { key: "heroTitle2", label: "Title Part 2", type: "text" },
      { key: "heroDesc", label: "Description", type: "textarea" },
    ],
    "Contact Information": [
      { key: "commandCenter", label: "Section Title", type: "text" },
      { key: "hqTitle", label: "Location Label", type: "text" },
      { key: "hqL1", label: "Address Line 1", type: "text" },
      { key: "hqL2", label: "Address Line 2", type: "text" },
      { key: "mapLink", label: "Google Maps Redirect Link", type: "universal" },
      {
        key: "mapEmbedUrl",
        label: "Google Maps Iframe URL",
        type: "universal",
      },
      { key: "waTitle", label: "WhatsApp Label", type: "text" },
      {
        key: "waLink",
        label: "WhatsApp Link (e.g. https://wa.me/...)",
        type: "universal",
      },
      { key: "igTitle", label: "Instagram Label", type: "text" },
      { key: "igHandle", label: "Instagram Handle", type: "text" },
      { key: "igLink", label: "Instagram URL", type: "universal" },
      { key: "infraText", label: "Footer Description", type: "textarea" },

      // ✅ ADDED COPYRIGHT TEXT TO SCHEMA
      { key: "copyrightText", label: "Copyright Text", type: "text" },
    ],
    "Form Details": [
      { key: "formName", label: "Name Label", type: "text" },
      { key: "formNamePl", label: "Name Placeholder", type: "text" },
      { key: "formEmail", label: "Email Label", type: "text" },
      { key: "formEmailPl", label: "Email Placeholder", type: "text" },
      { key: "formObj", label: "Message Label", type: "text" },
      { key: "formObjPl", label: "Message Placeholder", type: "textarea" },
      { key: "btnSubmit", label: "Submit Button", type: "text" },
    ],
    "System Messages": [
      { key: "msgSending", label: "Sending Message", type: "text" },
      { key: "msgSuccess", label: "Success Message", type: "textarea" },
      { key: "msgFail", label: "Failure Message", type: "textarea" },
      { key: "msgError", label: "Error Message", type: "textarea" },
    ],
  },
};

const adminUI = {
  en: {
    title: "Content Editor",
    desc: "Manage live website sections, translations, and media.",
    save: "Save to Database",
    saving: "Saving...",
    sections: "Website Pages",
    editing: "Editing:",
    loginTitle: "Admin Portal",
    loginDesc:
      "Enter your security key to access the content management system.",
    authBtn: "Authenticate",
    authErr: "Incorrect password. Access denied.",
    langEN: "English Content",
    langTR: "Turkish Content",
    mediaLabel: "Section Image",
    changeImg: "Change Image",
    uploading: "Uploading...",
    pwdPlaceholder: "Password",
    addItem: "Add New Item",
    confirmDelete: "Are you sure you want to permanently delete this item?",
  },
  tr: {
    title: "İçerik Yöneticisi",
    desc: "Canlı web sitesi bölümlerini, çevirileri ve medyayı yönetin.",
    save: "Veritabanına Kaydet",
    saving: "Kaydediliyor...",
    sections: "Web Sayfaları",
    editing: "Düzenlenen:",
    loginTitle: "Yönetici Portalı",
    loginDesc:
      "İçerik yönetim sistemine erişmek için güvenlik anahtarınızı girin.",
    authBtn: "Giriş Yap",
    authErr: "Hatalı şifre. Erişim reddedildi.",
    langEN: "İngilizce İçerik",
    langTR: "Türkçe İçerik",
    mediaLabel: "Bölüm Görseli",
    changeImg: "Görseli Değiştir",
    uploading: "Yükleniyor...",
    pwdPlaceholder: "Şifre",
    addItem: "Yeni Öğe Ekle",
    confirmDelete: "Bu öğeyi kalıcı olarak silmek istediğinize emin misiniz?",
  },
};

export default function AdminCMS() {
  const [adminLang, setAdminLang] = useState("en");
  const ui = adminUI[adminLang];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const { content: dbContent, setContent: setGlobalContent } = useSiteContent();

  const [content, setContent] = useState(dbContent);
  const [activeSection, setActiveSection] = useState("home");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (dbContent && !isDirty) {
      setContent(dbContent);
    }
  }, [dbContent, isDirty]);

  const sections = [
    {
      id: "nav",
      icon: "menu",
      label: adminLang === "en" ? "Navigation Bar" : "Navigasyon",
    },
    {
      id: "home",
      icon: "view_carousel",
      label: adminLang === "en" ? "Home Page" : "Ana Sayfa",
    },
    {
      id: "services",
      icon: "handyman",
      label: adminLang === "en" ? "Services Page" : "Hizmetler Sayfası",
    },
    {
      id: "company",
      icon: "corporate_fare",
      label: adminLang === "en" ? "Company Page" : "Şirket Sayfası",
    },
    {
      id: "contact",
      icon: "call",
      label: adminLang === "en" ? "Contact Page" : "İletişim Sayfası",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasswordInput("");
    }
  };

  const handleTextChange = (lang, section, key, value) => {
    setIsDirty(true);
    setContent((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [key]: value,
        },
      },
    }));
  };

  const handleUniversalTextChange = (section, key, value) => {
    setIsDirty(true);
    setContent((prev) => ({
      ...prev,
      en: { ...prev.en, [section]: { ...prev.en[section], [key]: value } },
      tr: { ...prev.tr, [section]: { ...prev.tr[section], [key]: value } },
    }));
  };

  const handleArrayTextChange = (
    lang,
    section,
    arrayKey,
    index,
    field,
    value,
  ) => {
    setIsDirty(true);
    setContent((prev) => {
      const newArray = [...prev[lang][section][arrayKey]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          [section]: {
            ...prev[lang][section],
            [arrayKey]: newArray,
          },
        },
      };
    });
  };

  const handleArrayAdd = (section, arrayKey, itemSchema) => {
    setIsDirty(true);
    const newItemEn = { isHidden: false };
    const newItemTr = { isHidden: false };

    Object.keys(itemSchema).forEach((key) => {
      if (itemSchema[key] === "text") {
        newItemEn[key] = `New ${key}`;
        newItemTr[key] = `Yeni ${key}`;
      } else if (itemSchema[key] === "textarea") {
        newItemEn[key] = "Placeholder text...";
        newItemTr[key] = "Yer tutucu metin...";
      } else {
        newItemEn[key] = "";
        newItemTr[key] = "";
      }
    });

    setContent((prev) => ({
      ...prev,
      en: {
        ...prev.en,
        [section]: {
          ...prev.en[section],
          [arrayKey]: [...prev.en[section][arrayKey], newItemEn],
        },
      },
      tr: {
        ...prev.tr,
        [section]: {
          ...prev.tr[section],
          [arrayKey]: [...prev.tr[section][arrayKey], newItemTr],
        },
      },
    }));
  };

  const handleArrayDelete = (section, arrayKey, index) => {
    const currentArray = content.en[section][arrayKey];
    const isVisible = !currentArray[index].isHidden;
    const visibleCount = currentArray.filter((item) => !item.isHidden).length;

    if (currentArray.length <= 1 || (isVisible && visibleCount <= 1)) {
      alert(
        adminLang === "en"
          ? "At least 1 item must remain visible in this section."
          : "Bu bölümde en az 1 görünür öğe kalmalıdır.",
      );
      return;
    }

    if (!window.confirm(ui.confirmDelete)) return;
    setIsDirty(true);

    setContent((prev) => {
      const newEn = [...prev.en[section][arrayKey]];
      const newTr = [...prev.tr[section][arrayKey]];
      newEn.splice(index, 1);
      newTr.splice(index, 1);
      return {
        ...prev,
        en: {
          ...prev.en,
          [section]: { ...prev.en[section], [arrayKey]: newEn },
        },
        tr: {
          ...prev.tr,
          [section]: { ...prev.tr[section], [arrayKey]: newTr },
        },
      };
    });
  };

  const handleArrayToggleHide = (section, arrayKey, index) => {
    const currentArray = content.en[section][arrayKey];
    const isCurrentlyHidden = currentArray[index].isHidden;
    const visibleCount = currentArray.filter((item) => !item.isHidden).length;

    if (!isCurrentlyHidden && visibleCount <= 1) {
      alert(
        adminLang === "en"
          ? "At least 1 item must remain visible in this section."
          : "Bu bölümde en az 1 görünür öğe kalmalıdır.",
      );
      return;
    }

    setIsDirty(true);
    setContent((prev) => {
      const newEn = [...prev.en[section][arrayKey]];
      const newTr = [...prev.tr[section][arrayKey]];
      const currentState = newEn[index].isHidden;
      newEn[index] = { ...newEn[index], isHidden: !currentState };
      newTr[index] = { ...newTr[index], isHidden: !currentState };
      return {
        ...prev,
        en: {
          ...prev.en,
          [section]: { ...prev.en[section], [arrayKey]: newEn },
        },
        tr: {
          ...prev.tr,
          [section]: { ...prev.tr[section], [arrayKey]: newTr },
        },
      };
    });
  };

  const handleImageUpload = async (
    e,
    section,
    key,
    index = null,
    arrayKey = null,
  ) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(key + (index !== null ? index : ""));

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const newImageUrl = data.secure_url;
      setIsDirty(true);

      if (index !== null && arrayKey) {
        handleArrayTextChange("en", section, arrayKey, index, key, newImageUrl);
        handleArrayTextChange("tr", section, arrayKey, index, key, newImageUrl);
      } else {
        handleTextChange("en", section, key, newImageUrl);
        handleTextChange("tr", section, key, newImageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      setGlobalContent(result.data);
      setIsDirty(false);

      alert(
        adminLang === "en"
          ? "Content permanently saved to database!"
          : "İçerik veritabanına başarıyla kaydedildi!",
      );
    } catch (error) {
      console.error("Error saving to database:", error);
      alert(
        adminLang === "en"
          ? "Failed to save to database."
          : "Veritabanına kaydedilemedi.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const renderUniversalInput = (field, val, section) => (
    <div
      key={field.key}
      className="grid grid-cols-1 gap-6 border-b border-[#c2c6d7]/30 pb-6 mb-6"
    >
      <div>
        <h4 className="font-[700] text-[#0052b9] text-[16px] mb-2 flex items-center gap-2">
          {field.label}
          <span className="text-[10px] font-bold bg-[#e6e8ea] text-[#424754] px-2 py-1 rounded uppercase tracking-wider">
            Shared URL
          </span>
        </h4>
        <input
          className="w-full bg-[#f7f9fb] border border-[#c2c6d7] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0052b9]"
          type="text"
          value={val || ""}
          onChange={(e) =>
            handleUniversalTextChange(section, field.key, e.target.value)
          }
        />
      </div>
    </div>
  );

  const renderImageUploader = (
    key,
    url,
    section,
    index = null,
    arrayKey = null,
  ) => {
    const isUploading = uploadingImage === key + (index !== null ? index : "");
    return (
      <div key={key + index} className="mb-6 col-span-1 md:col-span-2">
        <label className="block text-[14px] font-[700] text-[#0052b9] mb-3">
          {ui.mediaLabel} ({key})
        </label>
        <div className="relative rounded-lg overflow-hidden border border-[#c2c6d7] group w-full md:w-1/2 shadow-sm bg-black/5 min-h-[192px] flex items-center justify-center">
          {url ? (
            <img
              className="w-full h-48 object-cover"
              src={url}
              alt="Media Preview"
            />
          ) : (
            <span className="text-[#a0a5b1] font-[600] text-[14px]">
              No Image Found
            </span>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer bg-[#ffffff] text-[#191c1e] px-4 py-2 rounded-lg text-[14px] font-[600] flex items-center gap-2 hover:bg-[#e6e8ea]">
              {isUploading ? (
                ui.uploading
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    upload
                  </span>{" "}
                  {ui.changeImg}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e, section, key, index, arrayKey)
                    }
                  />
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderInputPair = (field, valEn, valTr, section) => (
    <div
      key={field.key}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#c2c6d7]/30 pb-6 mb-6"
    >
      <div className="col-span-1 md:col-span-2">
        <h4 className="font-[700] text-[#0052b9] text-[16px]">{field.label}</h4>
      </div>
      <div>
        <label className="block text-[12px] font-[600] text-[#424754] mb-2">
          {ui.langEN}
        </label>
        {field.type === "textarea" ? (
          <textarea
            className="w-full bg-[#f7f9fb] border border-[#c2c6d7] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0052b9]"
            rows="3"
            value={valEn || ""}
            onChange={(e) =>
              handleTextChange("en", section, field.key, e.target.value)
            }
          />
        ) : (
          <input
            className="w-full bg-[#f7f9fb] border border-[#c2c6d7] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0052b9]"
            type="text"
            value={valEn || ""}
            onChange={(e) =>
              handleTextChange("en", section, field.key, e.target.value)
            }
          />
        )}
      </div>
      <div>
        <label className="block text-[12px] font-[600] text-[#424754] mb-2">
          {ui.langTR}
        </label>
        {field.type === "textarea" ? (
          <textarea
            className="w-full bg-[#f7f9fb] border border-[#c2c6d7] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0052b9]"
            rows="3"
            value={valTr || ""}
            onChange={(e) =>
              handleTextChange("tr", section, field.key, e.target.value)
            }
          />
        ) : (
          <input
            className="w-full bg-[#f7f9fb] border border-[#c2c6d7] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0052b9]"
            type="text"
            value={valTr || ""}
            onChange={(e) =>
              handleTextChange("tr", section, field.key, e.target.value)
            }
          />
        )}
      </div>
    </div>
  );

  const renderEditorFields = () => {
    if (!content) return <p>Loading content...</p>;

    const pageSchema = schema[activeSection];
    const enSectionData = content.en[activeSection];
    const trSectionData = content.tr[activeSection];

    return Object.keys(pageSchema).map((groupName) => (
      <div
        key={groupName}
        className="bg-[#ffffff] p-6 md:p-8 rounded-xl border border-[#c2c6d7]/50 shadow-sm mb-8"
      >
        <h3 className="text-[20px] font-[800] text-[#191c1e] mb-6 border-b border-[#c2c6d7]/50 pb-4">
          {groupName}
        </h3>

        {pageSchema[groupName].map((field) => {
          const valEn = enSectionData[field.key];
          const valTr = trSectionData[field.key];

          if (field.type === "array") {
            return (
              <div key={field.key} className="space-y-6">
                {valEn &&
                  valEn.map((item, idx) => {
                    const isUndeletable =
                      activeSection === "home" &&
                      field.key === "features" &&
                      idx < 2;

                    return (
                      <div
                        key={idx}
                        className={`bg-[#f7f9fb] p-6 rounded-lg border border-[#c2c6d7]/40 relative transition-all ${
                          item.isHidden ? "opacity-60 grayscale" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center mb-6 border-b border-[#c2c6d7]/30 pb-4">
                          <h4 className="text-[18px] font-[800] text-[#191c1e]">
                            Item {idx + 1}{" "}
                            {item.isHidden && (
                              <span className="text-[#ba1a1a] text-[14px] ml-2">
                                (Hidden)
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                handleArrayToggleHide(
                                  activeSection,
                                  field.key,
                                  idx,
                                )
                              }
                              className="text-[#424754] hover:text-[#0052b9] transition-colors"
                              title="Toggle Visibility"
                            >
                              <span className="material-symbols-outlined">
                                {item.isHidden
                                  ? "visibility_off"
                                  : "visibility"}
                              </span>
                            </button>

                            {!isUndeletable && (
                              <button
                                onClick={() =>
                                  handleArrayDelete(
                                    activeSection,
                                    field.key,
                                    idx,
                                  )
                                }
                                className="text-[#424754] hover:text-[#ba1a1a] transition-colors"
                                title="Delete Item"
                              >
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.keys(field.itemSchema).map((schemaKey) => {
                            const type = field.itemSchema[schemaKey];

                            if (
                              activeSection === "home" &&
                              field.key === "features" &&
                              schemaKey === "img" &&
                              idx >= 2
                            ) {
                              return null;
                            }

                            if (type === "image") {
                              return renderImageUploader(
                                schemaKey,
                                item[schemaKey],
                                activeSection,
                                idx,
                                field.key,
                              );
                            }

                            const isTextarea = type === "textarea";
                            return (
                              <div
                                key={schemaKey}
                                className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                              >
                                <div>
                                  <label className="block text-[12px] font-[600] text-[#424754] mb-1">
                                    {ui.langEN} ({schemaKey})
                                  </label>
                                  {isTextarea ? (
                                    <textarea
                                      className="w-full bg-[#ffffff] border border-[#c2c6d7] rounded-md px-3 py-2 text-[14px]"
                                      rows="2"
                                      value={item[schemaKey] || ""}
                                      onChange={(e) =>
                                        handleArrayTextChange(
                                          "en",
                                          activeSection,
                                          field.key,
                                          idx,
                                          schemaKey,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  ) : (
                                    <input
                                      className="w-full bg-[#ffffff] border border-[#c2c6d7] rounded-md px-3 py-2 text-[14px]"
                                      type="text"
                                      value={item[schemaKey] || ""}
                                      onChange={(e) =>
                                        handleArrayTextChange(
                                          "en",
                                          activeSection,
                                          field.key,
                                          idx,
                                          schemaKey,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                <div>
                                  <label className="block text-[12px] font-[600] text-[#424754] mb-1">
                                    {ui.langTR} ({schemaKey})
                                  </label>
                                  {isTextarea ? (
                                    <textarea
                                      className="w-full bg-[#ffffff] border border-[#c2c6d7] rounded-md px-3 py-2 text-[14px]"
                                      rows="2"
                                      value={
                                        trSectionData[field.key][idx][
                                          schemaKey
                                        ] || ""
                                      }
                                      onChange={(e) =>
                                        handleArrayTextChange(
                                          "tr",
                                          activeSection,
                                          field.key,
                                          idx,
                                          schemaKey,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  ) : (
                                    <input
                                      className="w-full bg-[#ffffff] border border-[#c2c6d7] rounded-md px-3 py-2 text-[14px]"
                                      type="text"
                                      value={
                                        trSectionData[field.key][idx][
                                          schemaKey
                                        ] || ""
                                      }
                                      onChange={(e) =>
                                        handleArrayTextChange(
                                          "tr",
                                          activeSection,
                                          field.key,
                                          idx,
                                          schemaKey,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                <button
                  onClick={() =>
                    handleArrayAdd(activeSection, field.key, field.itemSchema)
                  }
                  className="w-full mt-4 py-3 border-2 border-dashed border-[#c2c6d7] text-[#0052b9] font-[600] rounded-lg hover:bg-[#0052b9]/5 hover:border-[#0052b9] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">add_circle</span>{" "}
                  {ui.addItem}
                </button>
              </div>
            );
          }

          if (field.type === "image")
            return renderImageUploader(field.key, valEn, activeSection);
          if (field.type === "universal")
            return renderUniversalInput(field, valEn, activeSection);
          return renderInputPair(field, valEn, valTr, activeSection);
        })}
      </div>
    ));
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#191c1e] flex flex-col items-center justify-center p-6 font-sans">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0052b9_1px,transparent_1px)] [background-size:40px_40px] z-0 pointer-events-none"></div>
        <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 p-10 rounded-[24px] shadow-2xl max-w-md w-full relative z-10 text-center">
          <div className="absolute top-4 right-4 flex bg-[#ffffff]/10 rounded-full">
            <button
              onClick={() => setAdminLang("tr")}
              className={`px-3 py-1 rounded-full text-[12px] font-bold ${adminLang === "tr" ? "bg-[#0052b9] text-white" : "text-white/60 hover:text-white"}`}
            >
              TR
            </button>
            <button
              onClick={() => setAdminLang("en")}
              className={`px-3 py-1 rounded-full text-[12px] font-bold ${adminLang === "en" ? "bg-[#0052b9] text-white" : "text-white/60 hover:text-white"}`}
            >
              EN
            </button>
          </div>
          <div className="w-16 h-16 bg-[#0052b9]/20 flex items-center justify-center rounded-full mx-auto mb-6 text-[#afc6ff] mt-4">
            <span className="material-symbols-outlined text-[32px]">
              admin_panel_settings
            </span>
          </div>
          <h1 className="text-[32px] font-[800] text-white tracking-tight mb-2">
            {ui.loginTitle}
          </h1>
          <p className="text-[14px] text-[#bcc8d0] mb-8">{ui.loginDesc}</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder={ui.pwdPlaceholder}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full bg-[#f7f9fb] border-2 rounded-lg px-4 py-4 text-[16px] text-[#191c1e] focus:outline-none focus:bg-white transition-all duration-300 ${authError ? "border-[#ba1a1a] focus:border-[#ba1a1a]" : "border-transparent focus:border-[#0052b9]"}`}
              />
              {authError && (
                <p className="text-[#ba1a1a] text-[12px] font-[600] mt-2 text-left flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    error
                  </span>
                  {ui.authErr}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0052b9] text-[#ffffff] px-6 py-4 rounded-lg text-[14px] font-[700] uppercase tracking-widest hover:bg-[#0669e8] transition-colors shadow-lg mt-2"
            >
              {ui.authBtn}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f9fb] font-sans antialiased flex h-screen overflow-hidden">
      <div className="flex-1 h-screen overflow-y-auto p-6 md:p-10 w-full relative">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 max-w-[1440px] mx-auto w-full gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-[800] text-[#191c1e] tracking-tight">
                {ui.title}
              </h1>
              {isDirty && (
                <span className="bg-[#ba1a1a]/10 text-[#ba1a1a] text-[12px] px-2 py-1 rounded font-[700] uppercase">
                  Unsaved Changes
                </span>
              )}
            </div>
            <p className="text-[14px] text-[#424754] mt-1">{ui.desc}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-[#ffffff] border border-[#c2c6d7] rounded-full p-1 shadow-sm">
              <button
                onClick={() => setAdminLang("tr")}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${adminLang === "tr" ? "bg-[#0052b9] text-white" : "text-[#424754] hover:text-[#0052b9]"}`}
              >
                TR
              </button>
              <button
                onClick={() => setAdminLang("en")}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${adminLang === "en" ? "bg-[#0052b9] text-white" : "text-[#424754] hover:text-[#0052b9]"}`}
              >
                EN
              </button>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className={`text-[#ffffff] px-6 py-3 rounded-lg text-[14px] font-[600] transition-colors shadow-sm flex items-center gap-2 ${!isDirty ? "bg-[#c2c6d7] cursor-not-allowed" : "bg-[#0052b9] hover:bg-[#0669e8]"}`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSaving ? "sync" : "save"}
              </span>
              {isSaving ? ui.saving : ui.save}
            </button>
          </div>
        </header>

        {/* MAIN LAYOUT GRID */}
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-12 gap-8 pb-12">
          {/* LEFT SIDEBAR */}
          <div className="col-span-12 lg:col-span-3 bg-[#ffffff] rounded-xl shadow-[0_10px_30px_rgba(45,49,51,0.05)] border border-[#c2c6d7]/30 flex flex-col h-[calc(100vh-200px)]">
            <div className="p-6 border-b border-[#c2c6d7]/30">
              <h2 className="text-[20px] font-[700] text-[#191c1e]">
                {ui.sections}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer ${activeSection === section.id ? "bg-[#0052b9]/10 border-l-4 border-[#0052b9] text-[#0052b9]" : "hover:bg-[#f2f4f6] text-[#424754]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">
                          {section.icon}
                        </span>
                        <span className="text-[14px] font-[600]">
                          {section.label}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#c2c6d7]">
                        chevron_right
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MAIN EDITOR CONTENT */}
          <div className="col-span-12 lg:col-span-9 bg-[#f7f9fb] flex flex-col h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[24px] font-[800] text-[#191c1e] uppercase tracking-wider">
                {ui.editing}{" "}
                {sections.find((s) => s.id === activeSection).label}
              </h3>
            </div>
            {renderEditorFields()}
          </div>
        </div>
      </div>
    </main>
  );
}
