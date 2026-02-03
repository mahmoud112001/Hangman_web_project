//! GAME DATA (WORDS)
var gameData = {
  programming: ["algorithm", "typescript", "framework", "recursion"],
  movies: ["interstellar", "inception", "gladiator", "parasite"],
  animals: ["chameleon", "platypus", "kangaroo", "elephant"],
  sports: ["basketball", "football", "olympics", "badminton"],
};

var secretWord = "";
var score = 600;
var errorCount = 0;
var hints = 2;
var timer;

var hangmanParts = [
  "base",
  "stand",
  "top",
  "rope",
  "head",
  "body",
  "hands",
  "legs",
];

//!CREATE CATEGORY BUTTONS

var catBox = document.getElementById("categoryList");

for (var key in gameData) {
  var btn = document.createElement("button");
  btn.innerHTML = key.toUpperCase();

  btn.onclick = (function (k) {
    return function () {
      startGame(k);
    };
  })(key);

  catBox.appendChild(btn);
}

/*
 * NAME VALIDATION
 * - not empty
 * - not spaces
 * - at least 2 letters
 * - letters only*/

function isValidName(name) {
  name = name.trim();

  if (name.length < 2) return false;

  for (var i = 0; i < name.length; i++) {
    var code = name.charCodeAt(i);

    var isUpper = code >= 65 && code <= 90;
    var isLower = code >= 97 && code <= 122;

    if (!isUpper && !isLower) return false;
  }

  return true;
}

//! START GAME

function startGame(category) {
  var nameInput = document.getElementById("playerName");
  var errorBox = document.getElementById("nameError");
  var playerName = nameInput.value;

  //! Validation
  if (!isValidName(playerName)) {
    errorBox.innerHTML =
      "Name must be at least 2 letters and contain letters only";
    return;
  }

  errorBox.innerHTML = "";

  secretWord =
    gameData[category][Math.floor(Math.random() * gameData[category].length)];

  document.getElementById("playerDisplay").innerHTML = playerName.trim();
  document.getElementById("categoryDisplay").innerHTML = category.toUpperCase();

  document.getElementById("categoryScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  createKeyboard();
  createWordSlots();
  startScoring();
}

//! CREATE KEYBOARD

function createKeyboard() {
  var keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (letter) {
    var key = document.createElement("div");
    key.className = "letter";
    key.innerHTML = letter;

    key.onclick = function () {
      checkLetter(this);
    };

    keyboard.appendChild(key);
  });
}

//! CREATE EMPTY WORD SLOTS

function createWordSlots() {
  var area = document.getElementById("guessSlots");
  area.innerHTML = "";

  for (var i = 0; i < secretWord.length; i++) {
    area.appendChild(document.createElement("span"));
  }
}

//! CHECK CLICKED LETTER

function checkLetter(el) {
  if (el.classList.contains("clicked")) return;

  var letter = el.innerHTML;
  var found = false;
  var slots = document.getElementById("guessSlots").children;
  for (var i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      slots[i].innerHTML = letter;
      found = true;
    }
  }

  el.classList.add("clicked");

  if (found) {
    el.classList.add("correct");
    verifyVictory();
  } else {
    el.classList.add("wrong");
    showNextPart();
    score -= 25;
    document.getElementById("scoreDisplay").innerHTML = score;
  }
}

//! SHOW NEXT HANGMAN PART

function showNextPart() {
  if (errorCount < hangmanParts.length) {
    document.getElementById(hangmanParts[errorCount]).style.display = "block";
    errorCount++;
  }

  if (errorCount === hangmanParts.length) {
    gameOver(false);
  }
}

//! CHECK IF PLAYER WON

function verifyVictory() {
  var slots = document.getElementById("guessSlots").children;

  for (var i = 0; i < slots.length; i++) {
    if (slots[i].innerHTML === "") return;
  }

  gameOver(true);
}

//! SCORE TIMER

function startScoring() {
  timer = setInterval(function () {
    if (score > 0) {
      score--;
      document.getElementById("scoreDisplay").innerHTML = score;
    }
  }, 1000);
}

//!GAME OVER SCREEN

function gameOver(won) {
  clearInterval(timer);

  var popup = document.getElementById("resultScreen");
  popup.classList.remove("hidden");

  var title = document.getElementById("resultTitle");
  title.innerHTML = won ? "WINNER!" : "GAME OVER";
  title.style.color = won ? "#00b894" : "#d63031";

  document.getElementById("finalPlayerName").innerHTML = document
    .getElementById("playerName")
    .value.trim();
  document.getElementById("finalWord").innerHTML = secretWord.toUpperCase();
  document.getElementById("finalScore").innerHTML = score;
  document.getElementById("finalMistakes").innerHTML = errorCount;
}

//!HINT BUTTON

document.getElementById("hintBtn").onclick = function () {
  if (hints <= 0 || score < 50) return;

  var slots = document.getElementById("guessSlots").children;

  for (var i = 0; i < secretWord.length; i++) {
    if (slots[i].innerHTML === "") {
      var letter = secretWord[i];
      var keys = document.getElementsByClassName("letter");

      for (var j = 0; j < keys.length; j++) {
        if (keys[j].innerHTML === letter) {
          checkLetter(keys[j]);
          hints--;
          score -= 50;
          this.innerHTML = "💡 Hint (" + hints + " left)";
          return;
        }
      }
    }
  }
};
