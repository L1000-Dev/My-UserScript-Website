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
  const starContainer = document.getElementById("fallingStars");

  function createStar(shooting = false) {
    const star = document.createElement("div");
    star.classList.add(shooting ? "shooting-star" : "star");

    const size = shooting ? 2 : Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const x = Math.random() * window.innerWidth;
    const y = shooting ? -20 : Math.random() * window.innerHeight;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    if (shooting) {
      star.style.animation = `shoot ${Math.random() * 1.5 + 1.5}s linear forwards`;
      setTimeout(() => {
        star.remove();
      }, 3000);
    }

    starContainer.appendChild(star);
  }

  // Create 100 static stars
  for (let i = 0; i < 100; i++) {
    createStar(false);
  }

  // Occasionally spawn a shooting star
  setInterval(() => {
    if (Math.random() < 0.2) { // 20% chance every 2 seconds
      createStar(true);
    }
  }, 2000);
});
