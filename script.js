const wordEl = document.getElementById("word");
const wronglettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");
const score = document.getElementById('score');

let words = [
  "bitcoindiscussion",
  "legal",
  "press",
  "meetups",
  "importantannouncements",
  "developmentandtechnicaldiscussion",
  "walletsoftware",
  "mining",
  "miningsupport",
  "pools",
  "miningsoftware",
  "hardware",
  "miningspeculation",
  "bitcointechnicalsupport",
  "projectdevelopment",
  "economics",
  "speculation",
  "marketplace",
  "goods",
  "services",
  "currencyexchange",
  "gambling",
  "lending",
  "securities",
  "auctions",
  "serviceannouncements",
  "servicediscussion",
  "tradingdiscussion",
  "scamaccusations",
  "reputation",
  "meta",
  "newforumsoftware",
  "bitcoinwiki",
  "politicsandsociety",
  "beginnersandhelp",
  "offtopic",
  "seriousdiscussion",
  "ivorytower",
  "archival",
  "cpugpubitcoinmininghardware",
  "chinesestudents",
  "obsoletebuying",
  "obsoleteselling",
  "multibit",
  "altcoindiscussion",
  "announcements",
  "tokens",
  "pools",
  "bounties"
];

let deletedWords = [];


let winStreak = true;
let scores = 0;
let allowedToType = true;
let deletedIndex;

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
// console.log(words.length);


const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
    if (words.length == 0)
  {
        finalMessage.innerText = `Congratulations! \nYou got a perfect score! \nWhy did you memorize \nall the boards?\n\nTotal Score: ${scores} 😃`;
        popup.style.display = "flex";
        words = words.concat(deletedWords);
        deletedWords = [];
        scores = 0;
        allowedToType = false;
        checkWinStreak();
  }

        wordEl.innerHTML = `
        ${selectedWord
      .split("")
      .map(
        (letter) => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
      )
      .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! Good sell! 😃";
    popup.style.display = "flex";
    winStreak = true;
    scores++;
    checkWinStreak();
    // console.log(words.length);

    deletedIndex = words.indexOf(selectedWord);
    words.splice(deletedIndex, 1);
    deletedWords.push(selectedWord);
    // console.log(deletedWords.length);
  }
   

}

function checkWinStreak(){
    if(winStreak == true){
        score.innerText = `Your Score: ${scores}`;
        // console.log(scores);
        winStreak = false;
    }
    else {
        score.innerText = `Your Score: ${scores}`;
    }
}

// Update the wrong letters
function updateWrongLetterEl() {
  // Display wrong letters

  wronglettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Bitcoin became $0. You lost😕\nCorrect Answer: ${selectedWord}\n\nFinal Score: ${scores}`;
    popup.style.display = "flex";
    scores = 0;
    allowedToType = false;
    checkWinStreak();
    words = words.concat(deletedWords);
    deletedWords = [];
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);

  if (e.keyCode >= 65 && e.keyCode <= 90 && allowedToType == true) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetterEl();
  popup.style.display = "none";
  console.log(selectedWord);
  allowedToType = true;

});

displayWord();

