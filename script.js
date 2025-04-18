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
const canvas = document.getElementById('fallingStars');
const numStaticStars = 150;

// Set up static stars once
for (let i = 0; i < numStaticStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.opacity = Math.random() * 0.8 + 0.2;
  star.style.width = `${Math.random() * 2 + 1}px`;
  star.style.height = star.style.width;
  canvas.appendChild(star);
}

// Function to spawn a shooting star occasionally
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  shootingStar.style.left = `${Math.random() * window.innerWidth}px`;
  shootingStar.style.top = `${Math.random() * window.innerHeight * 0.5}px`;
  canvas.appendChild(shootingStar);

  // Remove after animation ends
  setTimeout(() => {
    canvas.removeChild(shootingStar);
  }, 2000);
}

// Randomly create shooting stars every 5–10 seconds
setInterval(() => {
  if (Math.random() < 0.3) { // ~30% chance every interval
    createShootingStar();
  }
}, 3000);
