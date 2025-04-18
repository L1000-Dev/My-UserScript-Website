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
});

const stars = [];
const shootingStars = [];

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 4 + 2,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function spawnShootingStar() {
  const startX = Math.random() * canvas.width * 0.5;
  shootingStars.push({
    x: startX,
    y: 0,
    length: Math.random() * 80 + 50,
    speedX: Math.random() * 12 + 8,
    speedY: Math.random() * 6 + 4,
    life: 0,
    maxLife: 60 // frames
  });

  // schedule next shooting star
  setTimeout(spawnShootingStar, Math.random() * 7000 + 3000);
}

// kick off the first shooting star
spawnShootingStar();

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Regular stars
  for (let star of stars) {
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y + star.length);
    gradient.addColorStop(0, `rgba(255,255,255,${star.opacity})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = gradient;
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y + star.length);
    ctx.lineWidth = 1;
    ctx.stroke();

    star.x -= star.speed;
    star.y += star.speed;

    if (star.y > canvas.height || star.x < 0) {
      star.x = Math.random() * canvas.width + canvas.width;
      star.y = Math.random() * -canvas.height;
    }
  }

  // Shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    ctx.beginPath();
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y + s.length);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = grad;
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.lineWidth = 2;
    ctx.stroke();

    s.x += s.speedX;
    s.y += s.speedY;
    s.life++;

    if (s.life > s.maxLife) {
      shootingStars.splice(i, 1); // remove star
    }
  }

  requestAnimationFrame(drawStars);
}

drawStars();
