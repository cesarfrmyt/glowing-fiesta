// ===== Loader =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.style.display = "none", 2500);
});

// ===== Particles =====
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 3 }
  }
});

// ===== Dock panel switching =====
const dockItems = document.querySelectorAll('.dock-item');
const panels = document.querySelectorAll('.panel-content');
const particles = document.getElementById("particles-js");
const laptop = document.getElementById("floatingLaptop");
const glassPanel = document.querySelector(".glass-panel");

dockItems.forEach(item => {
  item.addEventListener('click', () => {
    const panelId = item.dataset.panel;
    dockItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    const newPanel = document.getElementById(panelId);
    newPanel.classList.add('active');
    particles.style.display = (panelId === "homePanel") ? "block" : "none";
    if (panelId === "aboutPanel") {
      laptop.classList.add("fullscreen-background");
      glassPanel.classList.add("no-bg");
      typeLaptopCode();
    } else {
      laptop.classList.remove("fullscreen-background");
      glassPanel.classList.remove("no-bg");
    }
  });
});

// ===== Cursor =====
const cursorWrapper = document.querySelector('.target-cursor-wrapper');
document.addEventListener('mousemove', (e) => {
  cursorWrapper.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ===== Focus frame animation =====
const focusWords = document.querySelectorAll(".focus-word");
const focusFrame = document.querySelector(".focus-frame");
let autoIndex = 0;
let autoSwitch;
function moveFocusFrame(element) {
  const containerRect = document.querySelector(".focus-container").getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  focusFrame.style.width = `${rect.width}px`;
  focusFrame.style.height = `${rect.height}px`;
  focusFrame.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
  focusWords.forEach(word => word.classList.remove("active"));
  element.classList.add("active");
}
function startAutoSwitch() {
  autoSwitch = setInterval(() => {
    autoIndex = (autoIndex + 1) % focusWords.length;
    moveFocusFrame(focusWords[autoIndex]);
  }, 2000);
}
focusWords.forEach((word) => {
  word.addEventListener("mouseenter", () => {
    clearInterval(autoSwitch);
    moveFocusFrame(word);
  });
  word.addEventListener("mouseleave", () => startAutoSwitch());
});
moveFocusFrame(focusWords[0]);
startAutoSwitch();

// ===== Typing Effect for Laptop Screen =====
const codeLines = [
  "function greet() {",
  "  console.log('Hello, World!');",
  "}",
  "greet();",
  "// Portfolio Loading..."
];
function typeLaptopCode() {
  const screen = document.querySelector(".laptop .screen");
  screen.innerHTML = "";
  codeLines.forEach((line, index) => {
    const lineElem = document.createElement("div");
    lineElem.classList.add("typing-line");
    screen.appendChild(lineElem);
    setTimeout(() => typeLine(lineElem, line), index * 800);
  });
}
function typeLine(elem, text) {
  let i = 0;
  const interval = setInterval(() => {
    elem.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(interval);
  }, 50);
}
typeLaptopCode();

// ===== Typing effect for subtitles =====
function typeText(element, text, speed = 80) {
  let i = 0;
  element.textContent = "";
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(interval);
  }, speed);
}
focusWords.forEach((word) => {
  const text = word.dataset.text || word.textContent;
  typeText(word, text);
});
const aboutPara = document.querySelector("#aboutPanel p");
if (aboutPara) typeText(aboutPara, aboutPara.textContent);

// ===== About Toggle Extra Info =====
const aboutToggle = document.getElementById("aboutToggle");
const extraInfo = document.getElementById("extraInfo");
aboutToggle.addEventListener("click", () => {
  extraInfo.classList.toggle("show");
  aboutToggle.classList.toggle("active");
});
