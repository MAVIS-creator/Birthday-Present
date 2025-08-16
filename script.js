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
// Typing effect for the letter
const letterText = ` Dear Akintunde Olumide Opeyemi,
                <br><br>
                My heart is bursting with joy and thankfulness as I sit down to write this today because it's a
                celebration
                of all the things that make you so unique in my life, not just your birthday.
                Birthdays are typically celebrated with cake, candles, and presents, but for me, it's also about saying
                "thank you" words I don't say enough but that mean a lot: "thank you for being my brother, my friend, my
                constant companion, and my safe haven."
                <br><br>
                The fact that you are actually my brother is one of life's greatest blessings. You have been more than
                just
                family; you have been my best friend, a competitive gamer, and someone who always manages to make me
                laugh,
                even on the most trying days. I frequently reflect on all of our common experiences, and I come to the
                realisation

                that what I value most are the small things the jokes, the never-ending arguments, the sporadic
                late-night
                conversations, and the way we encourage one another to improve. These times are what give our
                relationship
                its special and unbreakable quality.
                <br><br>
                You've always had a unique knack of simultaneously displaying kindness and strength. With your
                perseverance,
                your patience, and the fact that you never give up no matter what obstacles you face, you inspire me. To
                be
                honest, you have taught me more life lessons than I could ever learn from books or classes. Loyalty, the
                value of supporting family, and the fact that love is more than just uttering the right words it's about
                consistently showing up are all lessons you've given me.
                <br><br>
                I want you to know how much you are loved on this birthday, not only by me but by everyone in your
                immediate
                vicinity. People sense the light you carry with you wherever you go. One of the rarest gifts in the
                world is
                the ability you possess to make people feel seen, loved, and respected. It is for this reason that I
                respect
                you not only as a brother but also as a person who genuinely influences the lives of others.
                <br><br>
                I wish you luck in achieving all of your goals in this new phase of your life. I hope that the spark
                that
                makes you unique never goes out. And I offer up prayers for prosperity, happiness, and good health as
                well
                as countless reasons to be happy not just today, but every day after that. Because you have shown so
                much
                love and care without ever expecting much in return, you deserve nothing less than the finest.
                <br><br>
                I appreciate you being the person I can rely on no matter what. I'm grateful for the memories, the
                laughing,
                the disagreements, the support, and the joy. I am grateful that you are not just my brother but also my
                lifelong buddy. I would choose you again and over again without hesitation if I had to pick one person
                to
                support me through all of life's ups and downs.
                <br><br>
                Let's honour you today for your life, your path, and the many wonderful years that lie ahead. I hope
                that
                this birthday is filled with happiness, surprises, and everything that brings you delight. Greetings on
                your
                birthday, Akintunde Olumide Opeyemi. I love you more than words can ever adequately convey, and I'm
                honoured
                to call you my brother.
                <br><br>
                With love,
                Always. ❤️`;

let i = 0;
const speed = 35; // typing speed in ms
const typedLetter = document.getElementById("typed-letter");

function typeWriter() {
  if (i < letterText.length) {
    typedLetter.innerHTML = letterText.substring(0, i + 1) + '<span class="typing-cursor"></span>';
    i++;
    setTimeout(typeWriter, speed);
  } else {
    typedLetter.innerHTML = letterText; // remove cursor at end
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeWriter();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(document.getElementById("letter"));
});
