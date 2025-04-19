const vocabulary = [
  { english: "Not inferior to", korean: "못지않다" },
  { english: "To attend", korean: "참석하다" },
  { english: "To be late", korean: "지각하다" },
  { english: "To graduate", korean: "졸업하다" },
];

let currentIndex = 0;

const englishWord = document.querySelector(".english-word");
const playBtn = document.getElementById("playAudio");
const submitBtn = document.getElementById("submitAnswer");
const input = document.getElementById("koreanInput");
const feedback = document.getElementById("feedback");

// Load the current flashcard
function loadFlashcard() {
  const current = vocabulary[currentIndex];
  englishWord.textContent = current.english;
  input.value = "";
  feedback.textContent = "";
}

// Play TTS
playBtn.addEventListener("click", () => {
  const current = vocabulary[currentIndex];
  const audio = new Audio(
    `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q=${encodeURIComponent(current.korean)}&tl=ko`
  );
  audio.play();
});

// Check answer
submitBtn.addEventListener("click", () => {
  const current = vocabulary[currentIndex];
  const userAnswer = input.value.trim();
  if (userAnswer === current.korean) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % vocabulary.length;
      loadFlashcard();
    }, 1000);
  } else {
    feedback.textContent = `Incorrect. The correct answer is "${current.korean}".`;
    feedback.style.color = "red";
  }
});

// Initialize first card
loadFlashcard();
