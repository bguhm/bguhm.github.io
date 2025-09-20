let typedBuffer = "";
const secretWord = "admin";

// Listen for typing
document.addEventListener("keydown", (e) => {
  // Only capture letters/numbers/spaces
  if (e.key.length === 1) {
    typedBuffer += e.key.toLowerCase();
    
    // Keep buffer short
    if (typedBuffer.length > secretWord.length) {
      typedBuffer = typedBuffer.slice(-secretWord.length);
    }

    // Check if buffer matches
    if (typedBuffer === secretWord) {
      openCommandMode();
      typedBuffer = ""; // reset after trigger
    }
  }
});

function openCommandMode() {
  // Prevent multiple consoles
  if (document.getElementById("devConsole")) return;

  let consoleEl = document.createElement("div");
  consoleEl.id = "devConsole";
  consoleEl.style.position = "fixed";
  consoleEl.style.bottom = "20px";
  consoleEl.style.left = "50%";
  consoleEl.style.transform = "translateX(-50%)";
  consoleEl.style.background = "#111";
  consoleEl.style.color = "#0f0";
  consoleEl.style.padding = "10px";
  consoleEl.style.border = "1px solid #0f0";
  consoleEl.style.borderRadius = "5px";
  consoleEl.style.zIndex = "9999";

  consoleEl.innerHTML = `
    <input id="commandInput" placeholder="Enter command..." 
      style="background:#000; color:#0f0; border:none; outline:none; width:250px;" />
  `;
  document.body.appendChild(consoleEl);

  let inputEl = document.getElementById("commandInput");
  inputEl.focus();

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(e.target.value.trim());
      e.target.value = "";
    }
  });
}

function handleCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case "marquee":
      showMarquee("🚨 Site Update: New game added!");
      break;
    case "gif":
      showGif("https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif");
      break;
    case "clear":
      document.querySelectorAll(".overlay").forEach(el => el.remove());
      break;
    default:
      console.log("Unknown command:", cmd);
  }
}

function showMarquee(text) {
  let el = document.createElement("div");
  el.className = "overlay marquee";
  el.textContent = text;

  // Quick style
  el.style.position = "fixed";
  el.style.top = "10px";
  el.style.left = "100%";
  el.style.whiteSpace = "nowrap";
  el.style.fontSize = "20px";
  el.style.color = "yellow";
  el.style.animation = "marquee 10s linear infinite";

  document.body.appendChild(el);

  // Keyframes (insert once)
  if (!document.getElementById("marqueeStyles")) {
    let style = document.createElement("style");
    style.id = "marqueeStyles";
    style.textContent = `
      @keyframes marquee {
        from { left: 100%; }
        to { left: -100%; }
      }
    `;
    document.head.appendChild(style);
  }
}

function showGif(url) {
  let el = document.createElement("img");
  el.className = "overlay gif";
  el.src = url;
  el.style.position = "fixed";
  el.style.bottom = "50px";
  el.style.right = "50px";
  el.style.width = "150px";
  el.style.zIndex = "9998";
  document.body.appendChild(el);
}
