let gameStarted = false;
let poppedCount = 0;

document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  poppedCount = 0;
  document.getElementById("popped-count").textContent = "Popped: 0 / 5";

  const balloonArea = document.getElementById("balloon-area");
  balloonArea.innerHTML = "";

  // Create balloons
  for (let i = 0; i < 10; i++) {
    createBalloon(balloonArea);
  }
}

function createBalloon(area) {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * (area.offsetWidth - 40) + "px";
  balloon.style.background = randomColor();

  balloon.addEventListener("click", () => {
    balloon.remove();
    poppedCount++;
    document.getElementById("popped-count").textContent = `Popped: ${poppedCount} / 5`;
    if (poppedCount >= 5) {
      document.getElementById("gift-reveal").classList.remove("hidden");
    }
  });

  area.appendChild(balloon);

  // Animate balloon upwards
  let pos = -50;
  const interval = setInterval(() => {
    if (!balloon.parentElement) {
      clearInterval(interval);
      return;
    }
    pos += 2;
    balloon.style.bottom = pos + "px";
    if (pos > area.offsetHeight + 50) {
      balloon.remove();
      clearInterval(interval);
    }
  }, 50);
}

function randomColor() {
  const colors = ["red", "blue", "green", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}
