document.addEventListener("DOMContentLoaded", () => {
  const returnUrl = new URLSearchParams(window.location.search).get("return") || "https://krunker.io";

  const timerDisplay = document.getElementById("timer");
  let seconds = 30;
  timerDisplay.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    timerDisplay.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = returnUrl;
    }
  }, 1000);
});
