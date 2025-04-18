// --- REDIRECT TIMER LOGIC ---
const returnUrl = new URLSearchParams(window.location.search).get("return") || "https://krunker.io";
let seconds = 60;
const timerDisplay = document.getElementById("timer");

timerDisplay.textContent = seconds;

const interval = setInterval(() => {
  seconds--;
  if (seconds <= 0) {
    clearInterval(interval);
    window.location.href = returnUrl;
  } else {
    timerDisplay.textContent = seconds;
  }
}, 1000);

// --- FALLING STARS ANIMATION ---
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("fallingStars");
  console.log("Stars script loaded");

  // Create static stars
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    container.appendChild(star);
  }

  // Spawn a rare shooting star
  setInterval(() => {
    if (Math.random() < 0.2) { // 20% chance every 2s
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      shootingStar.style.top = `${Math.random() * window.innerHeight * 0.3}px`;
      shootingStar.style.left = `${Math.random() * window.innerWidth}px`;
      container.appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, 2000);
    }
  }, 2000);
});
