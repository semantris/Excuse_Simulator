// ==========================================
// Excuse Simulator - script.js
// ==========================================

let selectedSituation = "college";
let currentExcuse = "";
let dramatized = false;
let luckScore = 0;

const excuses = {
  college: [
    "A goat blocked the hallway and demanded my snacks first.",
    "My textbook got into an argument with me and won.",
    "I was abducted by extremely polite aliens for exactly 45 minutes.",
    "My shadow refused to follow me today, so I had to wait for it.",
    "I lost a staring contest with a pigeon and forgot what time was.",
    "My backpack achieved sentience overnight and ran off without me."
  ],
  friends: [
    "I was busy teaching a squirrel how to high-five.",
    "My reflection didn't show up, so I couldn't finish getting ready.",
    "I accidentally joined a flash mob and physically could not leave.",
    "A traveling wizard cursed my calendar out of spite.",
    "I was recalculating the meaning of life and lost track of minutes.",
    "My cat held me hostage for a second breakfast."
  ],
  assignment: [
    "My printer developed emotions overnight and refused to cooperate.",
    "A raccoon broke in, logged into my laptop, and reorganized my files.",
    "My essay got sucked into a small, localized parallel dimension.",
    "I was legally obligated to nap by an ancient family tradition.",
    "My keyboard went on strike demanding better working conditions.",
    "The Wi-Fi router challenged me to a duel and I had to accept."
  ],
  phone: [
    "My phone fell into a bowl of soup and is now seasoned.",
    "A ghost kept swiping my notifications away before I saw them.",
    "My phone joined a support group for overworked electronics.",
    "I lost a thumb war and had to forfeit all phone privileges.",
    "My phone is currently meditating and cannot be disturbed.",
    "A very persuasive pigeon convinced me to leave my phone at home."
  ],
  family: [
    "I was busy training my houseplant to do a trick.",
    "A time-traveling ancestor showed up needing life advice.",
    "My socks started an argument and I had to mediate.",
    "I got distracted watching paint dry — it was riveting, honestly.",
    "The dog challenged me to a philosophical debate about snacks.",
    "My furniture rearranged itself overnight and I got lost in my own house."
  ],
  work: [
    "My chair filed a formal complaint against me with HR.",
    "I got recruited into an impromptu interpretive dance number.",
    "My coffee mug achieved consciousness and demanded workplace rights.",
    "A rogue Roomba took my report hostage and wouldn't negotiate.",
    "I was busy brokering peace between two feuding houseplants.",
    "My desk lamp went on a spiritual journey and took my motivation with it."
  ]
};

const excusesOfTheDay = [
  "I wasn't late. Time was unusually early today.",
  "A raccoon borrowed my brain and hasn't returned it yet.",
  "I had a very important meeting with my pillow.",
  "My motivation left to go find itself and never came back.",
  "I opened my eyes and immediately needed more time to exist.",
  "My schedule and reality had a disagreement, and reality won.",
  "I was ready, but the universe filed for an extension.",
  "Everything was under control until a squirrel got involved.",
  "I temporarily forgot how clocks work, on principle.",
  "My plans experienced unexpected turbulence over open water."
];

// ------------------------------------------
// Situation selection
// ------------------------------------------

function selectSituation(situation, event) {
  selectedSituation = situation;
  dramatized = false;

  document.querySelectorAll(".situations button").forEach(button => {
    button.classList.remove("selected");
  });

  if (event && event.target) {
    event.target.classList.add("selected");
  }
}

// ------------------------------------------
// Excuse generation
// ------------------------------------------

function getRandomExcuse() {
  const list = excuses[selectedSituation];
  return list[Math.floor(Math.random() * list.length)];
}

function getBelievabilityMessage(score) {
  if (score <= 20) return "🤡 Nobody is buying this.";
  if (score <= 40) return "😂 That's definitely suspicious.";
  if (score <= 60) return "😐 Maybe you'll survive.";
  if (score <= 80) return "👀 Suspiciously believable.";
  return "😎 You might actually get away with this.";
}

function renderResult(title, excuseText, score, footer) {
  const result = document.getElementById("result");
  if (!result) return;

  result.innerHTML = `
    <h3>${title}</h3>
    <p class="excuse-text">"${excuseText}"</p>
    <p><strong>Believability:</strong> ${score}%</p>
    <p>${footer}</p>
  `;
}

function generateExcuse() {
  currentExcuse = getRandomExcuse();
  dramatized = false;

  const slider = document.getElementById("believability");
  const score = slider ? parseInt(slider.value, 10) : 50;

  luckScore += Math.floor(Math.random() * 10) + 1;
  updateLuckScore();
  saveLuckScore();

  renderResult("YOUR EXCUSE 🤡", currentExcuse, score, getBelievabilityMessage(score));
}

function makeDramatic() {
  if (!currentExcuse) {
    alert("Generate an excuse first! 🤡");
    return;
  }
  if (dramatized) return; // don't stack the dramatic wrapper on repeat clicks

  currentExcuse =
    "At the exact moment everything mattered, " +
    currentExcuse +
    " I tried everything I could, but somehow destiny had other plans.";
  dramatized = true;

  const slider = document.getElementById("believability");
  const score = slider ? slider.value : 50;

  renderResult("🔥 THE DRAMATIC VERSION", currentExcuse, score, "🎭 Drama level: EXTREME");
}

function copyExcuse() {
  if (!currentExcuse) {
    alert("Generate an excuse first! 🤡");
    return;
  }

  navigator.clipboard.writeText(currentExcuse)
    .then(() => alert("Excuse copied! 📋"))
    .catch(() => alert("Couldn't copy the excuse."));
}

// ------------------------------------------
// Luck score
// ------------------------------------------

function updateLuckScore() {
  const luckElement = document.getElementById("luckScore");
  if (luckElement) luckElement.innerText = luckScore;
}

function saveLuckScore() {
  localStorage.setItem("excuseLuckScore", luckScore);
}

function loadLuckScore() {
  const savedScore = parseInt(localStorage.getItem("excuseLuckScore"), 10);
  luckScore = Number.isNaN(savedScore) ? 0 : savedScore;
  updateLuckScore();
}

// ------------------------------------------
// Excuse of the day
// ------------------------------------------

function showExcuseOfTheDay() {
  const today = new Date();
  const index = (today.getDate() + today.getMonth()) % excusesOfTheDay.length;

  const dailyElement = document.getElementById("dailyExcuse");
  if (dailyElement) dailyElement.innerText = `"${excusesOfTheDay[index]}"`;
}

// ------------------------------------------
// Init
// ------------------------------------------

function initializeApp() {
  loadLuckScore();
  showExcuseOfTheDay();

  const slider = document.getElementById("believability");
  const percentage = document.getElementById("percentage");

  if (slider && percentage) {
    percentage.innerText = `${slider.value}%`;
    slider.addEventListener("input", function () {
      percentage.innerText = `${this.value}%`;
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
window.addEventListener("beforeunload", saveLuckScore);

