function handleCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case "marquee":
      startCommandMarquee();
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

// === NEW ===
function startCommandMarquee() {
  // Prevent duplicates
  if (document.getElementById("commandMarquee")) return;

  // Container
  const wrapper = document.createElement("div");
  wrapper.id = "commandMarquee";
  wrapper.className = "overlay";
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = "100%";
  wrapper.style.height = "40px";
  wrapper.style.background = "rgba(0,0,0,0.8)";
  wrapper.style.overflow = "hidden";
  wrapper.style.zIndex = "9999";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";

  const quoteBox = document.createElement("div");
  quoteBox.id = "commandQuoteBox";
  quoteBox.style.whiteSpace = "nowrap";
  quoteBox.style.color = "yellow";
  quoteBox.style.fontFamily = "monospace";
  quoteBox.style.fontSize = "18px";
  wrapper.appendChild(quoteBox);
  document.body.appendChild(wrapper);

  // Quotes array (copy/paste from your version)
  const quotes = [
    "slackrr now bg.uhm",
    "jouyuss now bg.uhm",
    "v1 release on sept 26th 2025",
    "POKEMON NOW WORKING!!!",
    "join the discord! https://discord.gg/vskTb44F5j",
    "Support Selenite and contributors on Sources/credits page or Github!",
    "one for all.",
    "all for one.",
    "24 songs, 76 projects.",
    "i make music too!",
    "smash karts is working fine idk what jayden is on about.",
    "cloak is gonna be fixed soon...",
    "genizy genius",
    "click the arrows to view more projects!",
    "page 2 is gonna be added on friday!",
    "no way its a week before release T-T",
    "im so cooked bro.",
    "page one is finished!",
    "ddlc soon??",
    "pokemon green version soon??",
    "login and sign up is NOT gonna happen any time soon ✌",
    "you think v1 gonna come out on time?",
    "should probably get more people to help me on the website..",
    "choppy orc da best music",
    "MUSIC NOW WORKING!!",
    "fixed music page :D",
    "math aint make no sense. oh wait nvm i think i get it.",
    "dont search blank you will find a mob of angry git octocats!"
  ];

  let baseSpeed = 120; // px per second
  let targetMultiplier = 1;
  let currentMultiplier = 1;
  let position;
  let lastTime = null;
  let paused = false;

  function setRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = randomQuote;
    position = wrapper.offsetWidth + 50;
    quoteBox.style.transform = `translateX(${position}px)`;
  }

  function animate(timestamp) {
    if (lastTime !== null) {
      const delta = (timestamp - lastTime) / 1000;

      const accel = 2;
      currentMultiplier += (targetMultiplier - currentMultiplier) * accel * delta;

      if (!paused) {
        position -= baseSpeed * currentMultiplier * delta;
        quoteBox.style.transform = `translateX(${position}px)`;
      }

      if (position + quoteBox.offsetWidth < 0) {
        setRandomQuote();
      }
    }
    lastTime = timestamp;
    requestAnimationFrame(animate);
  }

  // Hover and pause (global to wrapper)
  wrapper.addEventListener("mouseenter", () => { targetMultiplier = 0.8; });
  wrapper.addEventListener("mouseleave", () => { targetMultiplier = 1; });
  wrapper.addEventListener("mousedown", () => { paused = true; });
  window.addEventListener("mouseup", () => { paused = false; });

  // Init
  setRandomQuote();
  requestAnimationFrame(animate);
}
