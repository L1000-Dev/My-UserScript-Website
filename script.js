const returnUrl = "https://krunker.io"; // or any site you want to redirect to
const defaultReturn = "https://krunker.io"; // fallback

function updateTimer(seconds) {
  const timerDisplay = document.getElementById("timer");
  const interval = setInterval(() => {
    seconds--;
    timerDisplay.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = returnUrl || defaultReturn;
    }
  }, 1000);
}

function skipWithKey() {
  const key = prompt("Enter your key:");
  if (!key) return;

  // 🧠 Check against window.validKeys from keys.js
  const validKeys = window.validKeys || [];

  if (validKeys.includes(key)) {
    localStorage.setItem("accessKey", key);
    window.location.href = returnUrl || defaultReturn;
  } else {
    alert("❌ Could not verify key. Try again later.");
  }
}

window.onload = () => {
  const savedKey = localStorage.getItem("accessKey");
  if (savedKey && window.validKeys && window.validKeys.includes(savedKey)) {
    window.location.href = returnUrl || defaultReturn;
  } else {
    updateTimer(30);
  }
};
