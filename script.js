let seconds = 30;
const returnUrl = new URLSearchParams(window.location.search).get("return");

const countdown = setInterval(() => {
  document.getElementById("timer").textContent = seconds;
  if (seconds-- <= 0) {
    clearInterval(countdown);
    window.location.href = returnUrl || "https://thegame.com";
  }
}, 1000);

function skipWithKey() {
  const key = prompt("Enter your key:");
  if (key === "your-key") {
    localStorage.setItem("accessKey", key);
    window.location.href = returnUrl || "https://thegame.com";
  } else {
    alert("Invalid key.");
  }
}
