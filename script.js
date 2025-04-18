document.addEventListener("DOMContentLoaded", () => {
  const returnUrl = new URLSearchParams(window.location.search).get("return") || "https://krunker.io";

  // If accessKey is already set, redirect immediately
  if (localStorage.getItem("accessKey")) {
    window.location.href = returnUrl;
    return;
  }

  const timerDisplay = document.getElementById("timer");
  let seconds = 30;
  timerDisplay.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(interval);
      localStorage.setItem("accessKey", "true");
      window.location.href = returnUrl;
    } else {
      timerDisplay.textContent = seconds;
    }
  }, 1000);
});
