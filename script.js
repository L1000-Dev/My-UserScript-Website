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

function waitForKeysAndStart() {
  const maxWaitTime = 5000; // max 5 seconds
  const startTime = Date.now();

  const check = () => {
    if (Array.isArray(window.validKeys)) {
      const savedKey = localStorage.getItem("accessKey");

      if (savedKey && window.validKeys.includes(savedKey)) {
        window.location.href = returnUrl;
      } else {
        updateTimer(30);
      }
    } else {
      if (Date.now() - startTime < maxWaitTime) {
        setTimeout(check, 100);
      } else {
        // Fallback: start timer anyway
        updateTimer(30);
      }
    }
  };

  check();
}

window.addEventListener("load", waitForKeysAndStart);
