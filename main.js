/* =========================
   ELEMENTS
========================= */
const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const text = document.getElementById("text");
const img = document.getElementById("img");

const giftBtn = document.getElementById("gift");
const shareBtn = document.getElementById("share");
const cover = document.getElementById("cover");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const saveShot = document.getElementById("saveShot");

const card = document.getElementById("card");

const music = document.getElementById("bgMusic");
const awwSound = document.getElementById("awwSound");
const musicBtn = document.getElementById("music");
const themeBtn = document.getElementById("theme");

/* =========================
   STATE
========================= */
// Default preference: true if not set previously
const savedPref = localStorage.getItem("musicOn");
let musicOn = savedPref === null ? true : JSON.parse(savedPref);
let step = 0;
let heartsStarted = false;
let firstClickDone = false;

/* =========================
   UPDATE MUSIC BUTTON ICON
========================= */
function updateMusicIcon() {
  musicBtn.innerText = music.paused ? "🔊" : "🔈";
}

/* =========================
   PLAY MUSIC WITH ERROR HANDLING
========================= */
function playMusic() {
  music.play().then(() => {
    musicOn = true;
    localStorage.setItem("musicOn", "true");
    updateMusicIcon();
  }).catch(err => {
    console.log("Music blocked:", err);
    musicOn = false;
    updateMusicIcon();
  });
}

/* =========================
   PAUSE MUSIC
========================= */
function pauseMusic() {
  music.pause();
  musicOn = false;
  localStorage.setItem("musicOn", "false");
  updateMusicIcon();
}

/* =========================
   INITIAL MUSIC ON LOAD
========================= */
window.addEventListener("load", () => {
  if (musicOn) {
    playMusic();
  } else {
    pauseMusic();
  }
});

/* =========================
   MUSIC TOGGLE
========================= */
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

/* =========================
   NO BUTTON STEPS
========================= */
const stepsData = [
  { text: "Soch lein 🤔", image: "assets/think.gif" },
  { text: "Ek baar aur soch lein 😢", image: "assets/sadface.gif" },
  { text: "Please maan jao 🥺", image: "assets/plz.gif" },
  { text: "Array itni zidd 😠", image: "assets/attitude.gif" },
  { text: "Sach me nahi? 😭", image: "assets/cry.gif" },
  { text: "Booht cute hain aap too 😍", image: "assets/cute.gif" },
  { text: "Last chance ❤️", image: "assets/loveme.gif" }
];

noBtn.addEventListener("click", () => {
  if (step < stepsData.length) {
    text.innerText = stepsData[step].text;
    img.style.backgroundImage = `url(${stepsData[step].image})`;
    step++;
  } else {
    acceptLove();
  }
});

/* 😈 No button runs away */
function moveNoButton() {
  const x = Math.random() * 140 - 70;
  const y = Math.random() * 100 - 50;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

/* =========================
   YES BUTTON
========================= */
yesBtn.addEventListener("click", acceptLove);

function acceptLove() {
  text.innerText = "Mujhe pata tha aap maan jayen gi ❤️";
  img.style.backgroundImage = "url(assets/thanks.gif)";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  giftBtn.style.display = "block";
  shareBtn.style.display = "block";

  confettiBurst();

  if (music.paused) {
    playMusic();
  }

  if (!heartsStarted) {
    startHearts();
    heartsStarted = true;
  }
}

/* =========================
   GIFT & POPUP
========================= */
giftBtn.addEventListener("click", () => {
  cover.style.display = "flex";
});

cover.addEventListener("click", () => {
  cover.style.display = "none";
  popup.style.display = "flex";
  confettiBurst();
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  awwSound.currentTime = 0;
  awwSound.play().catch(err => console.log("aww sound error:", err));
});

/* =========================
   FLOATING HEARTS
========================= */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 16 + "px";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }, 280);
}

/* =========================
   CONFETTI
========================= */
function confettiBurst() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1500);
  }
}

/* =========================
   WHATSAPP SHARE
========================= */
shareBtn.addEventListener("click", () => {
  const msg = encodeURIComponent(
    "Someone just said YES to love ❤️😍\nTry this cute page 👉 "
  );
  const url = encodeURIComponent(window.location.href);
  window.open(`https://wa.me/?text=${msg}${url}`, "_blank");
});

/* =========================
   THEME GLOW
========================= */
const themes = ["#ff4ecd", "#00eaff", "#7CFF00", "#FFD700"];
let themeIndex = 0;

themeBtn.addEventListener("click", () => {
  card.style.boxShadow = `0 0 70px ${themes[themeIndex]}`;
  themeIndex = (themeIndex + 1) % themes.length;
});

/* =========================
   SCREENSHOT
========================= */
saveShot.addEventListener("click", () => {
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "love-memory.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
