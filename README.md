# ❤️ LoveMe Web App

A cute **interactive web page** that asks "Do you love me?" and responds with **animated GIFs, floating hearts, confetti, and background music**.
Built with **HTML, CSS, and JavaScript**, featuring **voice-free interactions**, **theme toggle**, and **screenshot sharing**.

> 🎀 This project is meant for fun and demonstration purposes.
<img width="1286" height="610" alt="image" src="https://github.com/user-attachments/assets/18ec2f9d-1373-44bb-b16e-7a2179157932" />

---

## ✨ Features

* 💖 Yes/No buttons with playful responses
* 🎵 Background music (toggleable)
* 💌 Gift pop-up animation
* 💝 Floating hearts and confetti effects
* 🎨 Theme glow toggle
* 📸 Save memory via screenshot (html2canvas)
* 📱 Mobile-first responsive design
* 🔗 Share on WhatsApp button

---

## 🚀 How It Works

1. Page asks **“Do you love me?”**
2. User can click:

   * **Yes** → Shows a thank-you GIF, starts hearts, music plays, gift & share buttons appear
   * **No** → Button moves randomly, shows playful GIFs and messages
3. Clicking **Gift** reveals pop-up with a message and confetti
4. Music can be toggled with **🔊 / 🔈** button
5. Screenshot of card can be downloaded via **Save Memory**

---

## 🧠 Tech Stack

* **HTML5** – Page structure
* **CSS3** – Animations, themes, responsive design
* **JavaScript (Vanilla)** – Interactivity, confetti, music, hearts
* **html2canvas** – Screenshot functionality

---

## 📁 Project Structure

```
love-me-app/
│── index.html
│── style.css
│── main.js
│── assets/
│   ├── bg-love-music.mp3
│   ├── aww.mp3
│   ├── think.gif
│   ├── sadface.gif
│   ├── plz.gif
│   ├── attitude.gif
│   ├── cry.gif
│   ├── cute.gif
│   └── loveme.gif
└── README.md
```

---

## 🔧 Configuration

### Change Background Music

In `index.html`:

```html
<audio id="bgMusic" loop>
  <source src="assets/bg-love-music.mp3" type="audio/mpeg" />
</audio>
```

### Change Messages or GIFs

In `main.js`:

```js
const stepsData = [
  { text: "Soch lo 🤔", image: "assets/think.gif" },
  { text: "Ek baar aur soch lo 😢", image: "assets/sadface.gif" },
  // ...
];
```

### Theme Colors

Modify in `main.js`:

```js
const themes = ["#ff4ecd", "#00eaff", "#7CFF00", "#FFD700"];
```

---

## 📌 Browser Support

✅ Chrome (Desktop & Android)
✅ Edge
⚠️ Firefox (may have limited autoplay support)
⚠️ Safari (autoplay restrictions may apply)

> Best experience on **Chrome** or modern Chromium browsers

---

## 🌱 Future Improvements

* 🔊 Autoplay fallback for mobile browsers
* 🌓 Dark/light mode toggle
* 💾 Remember music and theme preference in `localStorage`
* 🧠 Voice-enabled interactions
* ⚛️ React / Next.js version for better state management

---

## 📜 License

MIT License  
Feel free to use, modify, and learn from this project.

---

## 🌐 Follow & Subscribe

| Platform  | Link |
|---------|------|
| Twitter  | https://twitter.com/einzigartigetec/ |
| Facebook | https://www.facebook.com/einzigartige/ |
| LinkedIn | https://www.linkedin.com/company/einzigartige/ |
| YouTube  | https://www.youtube.com/@einzigartige_/ |
| Website  | http://einzigartige.in/ |

---

## 📊 Live YouTube Statistics

![YouTube Subscribers](https://img.shields.io/youtube/channel/subscribers/UCjm1vLu6YLoLeXpt8aT6BWg?style=social)
![YouTube Views](https://img.shields.io/youtube/channel/views/UCjm1vLu6YLoLeXpt8aT6BWg?style=social)

👉 **Subscribe here:** https://www.youtube.com/@einzigartige_/

---

## 👤 Author

**Einzigartige - Web & App Development Company**  
Website: http://einzigartige.in/

---

⭐ If you like this project, consider giving it a star!
