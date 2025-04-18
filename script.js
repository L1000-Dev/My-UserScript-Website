const returnUrl = "https://krunker.io";

function updateTimer(seconds) {
  const timerDisplay = document.getElementById("timer");
  const interval = setInterval(() => {
    seconds--;
    timerDisplay.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = returnUrl;
    }
  }, 1000);
}

function skipWithKey() {
  const key = prompt("Enter your key:");
  if (!key) return;

  const validKeys = window.validKeys || [];
  if (validKeys.includes(key)) {
    localStorage.setItem("accessKey", key);
    window.location.href = returnUrl;
  } else {
    alert("❌ Could not verify key. Try again later.");
  }
}

window.onload = () => {
  const savedKey = localStorage.getItem("accessKey");
  if (savedKey && window.validKeys && window.validKeys.includes(savedKey)) {
    window.location.href = returnUrl;
  } else {
    updateTimer(30);
  }
};
