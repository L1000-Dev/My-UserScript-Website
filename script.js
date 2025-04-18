const returnUrl = "https://krunker.io";

function updateTimer(seconds) {
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

window.addEventListener("load", () => {
  // Wait until window.validKeys is available
  const waitForKeys = setInterval(() => {
    if (Array.isArray(window.validKeys)) {
      clearInterval(waitForKeys);

      const savedKey = localStorage.getItem("accessKey");

      if (window.validKeys.includes(savedKey)) {
        window.location.href = returnUrl;
      } else {
        updateTimer(30); // Start timer here
      }
    }
  }, 100);
});
