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
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStaticStars(); // re-draw static stars on resize
});

const staticStars = [];
const shootingStars = [];

// Create static background stars
function drawStaticStars() {
  staticStars.length = 0;
  for (let i = 0; i < 200; i++) {
    staticStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}
drawStaticStars();

// Spawn shooting stars every few seconds
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width * 0.8,
    y: Math.random() * canvas.height * 0.3,
    length: Math.random() * 100 + 50,
    speedX: Math.random() * 15 + 10,
    speedY: Math.random() * 5 + 3,
    life: 0,
    maxLife: 60
  });

  setTimeout(spawnShootingStar, Math.random() * 5000 + 5000); // 5–10 sec
}
spawnShootingStar();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static stars
  for (let star of staticStars) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];

    ctx.beginPath();
    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y + s.length);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();

    s.x += s.speedX;
    s.y += s.speedY;
    s.life++;

    if (s.life > s.maxLife) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(draw);
}

draw();
