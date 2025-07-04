const languageSelect = document.getElementById("languageSelect");

function applyLanguage(lang) {
  fetch(`i18n/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    });
  localStorage.setItem("lang", lang);
}

if (languageSelect) {
  const savedLang = localStorage.getItem("lang") || "en";
  languageSelect.value = savedLang;
  applyLanguage(savedLang);
  languageSelect.addEventListener("change", e => {
    applyLanguage(e.target.value);
  });
} else {
  const lang = localStorage.getItem("lang") || "en";
  applyLanguage(lang);
}
