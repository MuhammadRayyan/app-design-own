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

// 💣 Self destruct text
const selfDestruct = document.getElementById("selfDestruct");

// 🏃‍♂️ Panic popup elements
const panicPopup = document.getElementById("panicPopup");
const closePanic = document.getElementById("closePanic");

let selfDestructTimer = null;
let boomTimeout = null;

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
  { text: "Please maan jayeen 🥺", image: "assets/plz.gif" },
  { text: "Array itni zidd 😠", image: "assets/attitude.gif" },
  { text: "Sach me nahi? 😭", image: "assets/cry.gif" },
  { text: "Itni Cutee haan aap 🥰", image: "assets/cute.gif" },
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
  text.innerText = "Mujhe pata tha maan jayen gii 🤭❤️";
   
  img.style.backgroundImage = "url(assets/thanks.gif)";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  giftBtn.style.display = "block";

  // ✅ only show share if it exists in HTML
  if (shareBtn) shareBtn.style.display = "block";

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

  startSelfDestructCountdown(); // ✅ start the funny timer
});


closePopup.addEventListener("click", () => {
  // ✅ DO NOT close the popup
  // popup.style.display = "none";  // <-- remove / keep commented

  // ✅ just play the sound
  awwSound.currentTime = 0;
  awwSound.play().catch(err => console.log("aww sound error:", err));

  // ✅ do NOT clear the countdown timers
  // (so self-destruct continues and will still trigger Bhaagoo)
});



/* =========================
   BOMB
========================= */
function triggerBoomSequence() {
  // Add shake to the card
  card.classList.add("shake");

  // Create an explosion overlay inside popup
  const boom = document.createElement("div");
  boom.className = "boom";
  boom.textContent = "💥";
  const popupBox = popup.querySelector(".popup-box");
  if (popupBox) popupBox.appendChild(boom);

  // Confetti for extra drama
  confettiBurst();

  // After a moment, hide first popup and show Bhaagoo popup
  boomTimeout = setTimeout(() => {
    // cleanup shake + boom
    card.classList.remove("shake");
    boom.remove();

    popup.style.display = "none";
    if (panicPopup) panicPopup.style.display = "flex";
  }, 1200);
}

function startSelfDestructCountdown() {
  if (!selfDestruct) return;

  // Clear previous timer/timeouts if popup opened again
  if (selfDestructTimer) clearInterval(selfDestructTimer);
  if (boomTimeout) clearTimeout(boomTimeout);

  let t = 10;
  selfDestruct.textContent = `💣 Self destruct in ${t}…`;

  selfDestructTimer = setInterval(() => {
    t -= 1;

    if (t > 0) {
      selfDestruct.textContent = `💣 Self destruct in ${t}…`;
    } else {
      clearInterval(selfDestructTimer);
      selfDestructTimer = null;

      selfDestruct.textContent = "💥 BOOM — heheheeheheheheh 😜❤️";
      triggerBoomSequence();
    }
  }, 1000);
}


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
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const msg = encodeURIComponent(
      "Someone just said YES to love ❤️😍\nTry this cute page 👉 "
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${msg}${url}`, "_blank");
  });
}


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
if (saveShot) {
  saveShot.addEventListener("click", () => {
    html2canvas(card).then(canvas => {
      const link = document.createElement("a");
      link.download = "love-memory.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });
}


if (closePanic && panicPopup) {
  closePanic.addEventListener("click", () => {
    panicPopup.style.display = "none";
  });
}
