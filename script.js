document.getElementById("start-game").addEventListener("click", startGame);


let gameStarted = false;
let poppedCount = 0;
let timer = 20;
let trial = 1;
let timerInterval = null;
let balloonInterval = null;
let maxTrials = 3;
let balloonsToPop = 10;

document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  poppedCount = 0;
  timer = 20;
  document.getElementById("popped-count").textContent = "Popped: 0";
  document.getElementById("timer").textContent = timer;
  document.getElementById("trial").textContent = trial;

  const balloonArea = document.getElementById("balloon-area");
  balloonArea.innerHTML = "";

  let balloonsCreated = 0;
  balloonInterval = setInterval(() => {
    if (balloonsCreated < balloonsToPop) {
      createBalloon(balloonArea);
      balloonsCreated++;
    }
  }, 700);

  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(balloonInterval);
  gameStarted = false;
  // Remove all balloons
  const balloonArea = document.getElementById("balloon-area");
  balloonArea.innerHTML = "";
  if (poppedCount >= balloonsToPop) {
    document.getElementById("popped-count").textContent += " - Success!";
    // Automatically go to gift reveal section
    setTimeout(() => {
      // Find the gift reveal section and show it
      const sections = Array.from(document.querySelectorAll('.section'));
      sections.forEach((sec, i) => {
        sec.style.display = (sec.id === 'gift-reveal') ? '' : 'none';
      });
      document.getElementById('gift-reveal').classList.remove('hidden');
    }, 1200);
  } else {
    document.getElementById("popped-count").textContent += " - Try Again!";
    trial++;
    if (trial <= maxTrials) {
      setTimeout(() => {
        document.getElementById("trial").textContent = trial;
        document.getElementById("timer").textContent = 20;
        poppedCount = 0;
        document.getElementById("popped-count").textContent = "Popped: 0";
        startGame();
      }, 1500);
    } else {
      document.getElementById("popped-count").textContent += " No more trials.";
    }
  }
}

function createBalloon(area) {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * (area.offsetWidth - 50) + "px";
  balloon.style.background = randomColor();

  balloon.addEventListener("click", () => {
    balloon.remove();
    poppedCount++;
    document.getElementById("popped-count").textContent = `Popped: ${poppedCount}`;
    if (poppedCount === balloonsToPop) {
      endGame();
    }
  });

  area.appendChild(balloon);

  // Animate balloon upwards + wiggle
  let pos = -50;
  let horizontalShift = Math.random() > 0.5 ? 1 : -1;
  let speed = 4 + Math.random() * 3;

  const interval = setInterval(() => {
    if (!balloon.parentElement) {
      clearInterval(interval);
      return;
    }
    pos += speed;
    balloon.style.bottom = pos + "px";
    let currentLeft = parseInt(balloon.style.left);
    balloon.style.left = currentLeft + horizontalShift + "px";
    if (currentLeft <= 0 || currentLeft >= area.offsetWidth - 50) {
      horizontalShift *= -1;
    }
    if (pos > area.offsetHeight + 50) {
      balloon.remove();
      clearInterval(interval);
    }
  }, 30);
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


