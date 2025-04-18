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

function skipWithKey() {
  const key = prompt("Enter your key:");
  if (!key) return;

  const validKeys = window.validKeys || [];

  console.log("🔑 Entered key:", key);
  console.log("✅ Available keys:", validKeys);

  if (validKeys.includes(key)) {
    localStorage.setItem("accessKey", key);
    console.log("✅ Key valid, redirecting...");
    window.location.href = returnUrl;
  } else {
    alert("❌ Could not verify key. Try again later.");
    console.log("❌ Invalid key");
  }
}

window.addEventListener("load", () => {
  const waitForKeys = setInterval(() => {
    if (Array.isArray(window.validKeys)) {
      clearInterval(waitForKeys);
      console.log("✅ Keys loaded:", window.validKeys);

      const savedKey = localStorage.getItem("accessKey");
      console.log("🔒 Saved key:", savedKey);

      if (savedKey && window.validKeys.includes(savedKey)) {
        console.log("✅ Saved key is valid, redirecting...");
        window.location.href = returnUrl;
      } else {
        console.log("⏳ No valid key, starting timer...");
        updateTimer(30);
      }
    } else {
      console.log("⌛ Waiting for keys...");
    }
  }, 100);
});
