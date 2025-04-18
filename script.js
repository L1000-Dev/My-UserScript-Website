let seconds = 30;
const returnUrl = new URLSearchParams(window.location.search).get("return");

// Default fallback if no return URL is provided
const defaultReturn = "https://krunker.io";

const countdown = setInterval(() => {
  document.getElementById("timer").textContent = seconds;
  if (seconds-- <= 0) {
    clearInterval(countdown);
    window.location.href = returnUrl || defaultReturn;
  }
}, 1000);

async function skipWithKey() {
  const key = prompt("Enter your key:");
  if (!key) return;

  try {
    const res = await fetch("https://L-1000.github.io/your-repo-name/keys.json");
    const validKeys = await res.json();

    if (validKeys.includes(key)) {
      localStorage.setItem("accessKey", key);
      window.location.href = returnUrl || defaultReturn;
    } else {
      alert("Invalid key.");
    }
  } catch (e) {
    alert("Could not verify key. Please try again later.");
  }
}
