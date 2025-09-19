// --- Helper: set favicon ---
function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}

// --- Apply cloak mode globally ---
(function applyCloak() {
  const cloakState = localStorage.getItem("cloakToggle");
  if (cloakState === "on") {
    document.title = "Google Docs";
    setFavicon("icons/docs.png");
  } else {
    document.title = "Bguhm.GuiHub.io";
    setFavicon("icons/default.png");
  }
})();

// --- Apply theme globally ---
(function applyTheme() {
  const themeState = localStorage.getItem("themeToggle");
  if (themeState === "off") {
    document.body.style.background = "#f4f4f4";
    document.body.style.color = "#111";
  } else {
    document.body.style.background = "#1e1e1e";
    document.body.style.color = "#f4f4f4";
  }
})();

// --- Apply background globally ---
(function applyBackground() {
  const bgState = localStorage.getItem("bgToggle");
  const customBg = localStorage.getItem("bgUrl");

  if (bgState === "on" && customBg) {
    document.body.style.backgroundImage = `url('${customBg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  } else if (bgState === "on") {
    document.body.style.backgroundImage = "url('images/bg1.jpg')";
  } else {
    document.body.style.backgroundImage = "none";
  }
})();
