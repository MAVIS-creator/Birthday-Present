let gameStarted = false;
let poppedCount = 0;

document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  poppedCount = 0;
  document.getElementById("popped-count").textContent = "Popped: 0 / 10";

  const balloonArea = document.getElementById("balloon-area");
  balloonArea.innerHTML = "";

  // Create 10 balloons
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
    document.getElementById("popped-count").textContent = `Popped: ${poppedCount} / 10`;
    if (poppedCount >= 10) {
      celebrateAndReveal();
    }
  });

  area.appendChild(balloon);

  // Animate balloon upwards + wiggle
  let pos = -50;
  let horizontalShift = Math.random() > 0.5 ? 1 : -1;
  let speed = 4 + Math.random() * 3; // faster: 4-7px per frame

  const interval = setInterval(() => {
    if (!balloon.parentElement) {
      clearInterval(interval);
      return;
    }

    // Move up
    pos += speed;
    balloon.style.bottom = pos + "px";

    // Wiggle side-to-side
    let currentLeft = parseInt(balloon.style.left);
    balloon.style.left = currentLeft + horizontalShift + "px";

    // Bounce off sides
    if (currentLeft <= 0 || currentLeft >= area.offsetWidth - 40) {
      horizontalShift *= -1;
    }

    // Remove if off screen
    if (pos > area.offsetHeight + 50) {
      balloon.remove();
      clearInterval(interval);
    }
  }, 30); // faster refresh for smooth movement
}

function randomColor() {
  const colors = ["red", "blue", "green", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🎉 Celebration before reveal
function celebrateAndReveal() {
  // Confetti effect
  confettiBurst();

  // Show gift reveal after short delay
  setTimeout(() => {
    document.getElementById("gift-reveal").classList.remove("hidden");
  }, 1500);
}


