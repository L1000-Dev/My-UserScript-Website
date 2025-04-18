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
const canvas = document.getElementById("fallingStars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      d: Math.random() * 1 + 0.5,
      opacity: Math.random(),
    });
  }
}
createStars(150);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 8;

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  updateStars();
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();
