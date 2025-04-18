const returnUrl = "https://krunker.io";

function updateTimer(seconds) {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(interval);
      console.log("✅ Timer finished, redirecting...");
      window.location.href = returnUrl;
    } else {
      timerDisplay.textContent = seconds;
      console.log(`⏳ ${seconds}s remaining`);
    }
  }, 1000);
}
