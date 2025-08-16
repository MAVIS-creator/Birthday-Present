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

  // Spawn balloons on interval
  balloonInterval = setInterval(() => {
    if (poppedCount < balloonsToPop) {
      createBalloon(balloonArea);
    }
  }, 700);

  // Countdown timer
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

  const balloonArea = document.getElementById("balloon-area");
  balloonArea.innerHTML = "";

  if (poppedCount >= balloonsToPop) {
    document.getElementById("popped-count").textContent += " - Success!";
    // 🎉 Trigger celebration + gift reveal
    celebrateAndReveal();
  } else {
    document.getElementById("popped-count").textContent += " - Try Again!";
    trial++;
    if (trial <= maxTrials) {
      // Retry automatically after short delay
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
  const colors = ["#ff4d6d", "#fda085", "#f6d365", "#6a11cb", "#2575fc"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🎉 Celebration before reveal
function celebrateAndReveal() {
  confettiBurst?.(); // safe call if you defined confettiBurst()

  setTimeout(() => {
    const sections = Array.from(document.querySelectorAll('.section'));
    sections.forEach(sec => {
      sec.style.display = (sec.id === 'gift-reveal') ? '' : 'none';
    });
    document.getElementById("gift-reveal").classList.remove("hidden");
  }, 1200);
}
document.addEventListener('DOMContentLoaded', () => {
  // ===== Page sections nav (one per page) =====
  const sections = Array.from(document.querySelectorAll('.section'));
  let current = 0;

  function showSection(idx) {
    sections.forEach((sec, i) => {
      sec.style.display = (i === idx) ? 'block' : 'none';
    });
    current = idx;
  }

  // Initial: show the first section only
  showSection(0);

  // Next buttons navigate relative to the section they are in
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.section');
      const idx = sections.indexOf(parent);
      if (idx > -1 && idx + 1 < sections.length) showSection(idx + 1);
    });
  });

  // ===== Envelope behavior =====
  const envelope = document.getElementById('envelope');
  const letterNext = document.getElementById('letter-next');
  const indicator = document.querySelector('#letter .indicator');

  // Click to open
  envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
      envelope.classList.add('open');
      if (indicator) indicator.style.display = 'none';
      // Show Next after paper finishes sliding
      setTimeout(() => { letterNext.style.display = 'inline-block'; }, 1000);
    }
  });

  // ===== Game gate (unchanged, but safer) =====
  // If you gate the "game" section, keep this pattern:
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.section');
      if (parent && parent.id === 'game') {
        if (window.poppedCount < 10) {
          alert('Pop at least 10 balloons to continue!');
        }
      }
    });
  });
});

