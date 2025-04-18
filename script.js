let seconds = 30;
const returnUrl = new URLSearchParams(window.location.search).get("return");

const countdown = setInterval(() => {
  document.getElementById("timer").textContent = seconds;
  if (seconds-- <= 0) {
    clearInterval(countdown);
    window.location.href = returnUrl || "https://krunker.io";
  }
}, 1000);

async function skipWithKey() {
  const key = prompt("Enter your key:");
  if (!key) return;

  // 🔐 Replace this URL with your raw GitHub file or API later
  const res = await fetch("https://yourusername.github.io/your-repo-name/keys.json");
  const validKeys = await res.json();

  if (validKeys.includes(key)) {
    localStorage.setItem("accessKey", key);
    window.location.href = returnUrl || "https://thegame.com";
  } else {
    alert("Invalid key.");
  }
}
