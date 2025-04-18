// DOM Elements
const englishWordEl = document.getElementById('englishWord');
const playBtn = document.getElementById('playBtn');
const autoPlayCheckbox = document.getElementById('autoPlay');
const koreanInput = document.getElementById('koreanInput');
const checkBtn = document.getElementById('checkBtn');
const feedbackEl = document.getElementById('feedback');
const categorySelect = document.getElementById('categorySelect');
const currentIndexEl = document.getElementById('currentIndex');
const totalWordsEl = document.getElementById('totalWords');

// App State
let currentCategory = 'food';
let currentWordIndex = 0;
let currentWords = [];

// Initialize
function init() {
    loadCategory();
    setupEventListeners();
}

function loadCategory() {
    currentCategory = categorySelect.value;
    currentWords = wordCategories[currentCategory];
    currentWordIndex = 0;
    
    totalWordsEl.textContent = currentWords.length;
    updateProgress();
    displayCurrentWord();
}

function setupEventListeners() {
    // Category change
    categorySelect.addEventListener('change', () => {
        loadCategory();
    });
    
    // Play audio
    playBtn.addEventListener('click', playCurrentAudio);
    
    // Check answer
    checkBtn.addEventListener('click', checkAnswer);
    koreanInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    
    // Auto-play handler
    autoPlayCheckbox.addEventListener('change', () => {
        if (autoPlayCheckbox.checked && currentWords.length > 0) {
            playCurrentAudio();
        }
    });
}

function displayCurrentWord() {
    if (currentWords.length === 0) {
        englishWordEl.textContent = 'No words in this category';
        return;
    }
    
    const currentWord = currentWords[currentWordIndex];
    englishWordEl.textContent = currentWord.english;
    koreanInput.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    
    if (autoPlayCheckbox.checked) {
        playCurrentAudio();
    }
    
    koreanInput.focus();
}

function playCurrentAudio() {
    if (currentWords.length === 0) return;
    
    const audio = new Audio(currentWords[currentWordIndex].audio);
    audio.play().catch(e => console.error('Audio error:', e));
}

function checkAnswer() {
    if (currentWords.length === 0) return;
    
    const userAnswer = koreanInput.value.trim();
    const correctAnswer = currentWords[currentWordIndex].korean;
    
    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = '✅ Correct!';
        feedbackEl.classList.add('correct');
        
        setTimeout(() => {
            nextWord();
        }, 1000);
    } else {
        feedbackEl.textContent = `❌ Incorrect. The answer was: ${correctAnswer}`;
        feedbackEl.classList.add('incorrect');
    }
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % currentWords.length;
    updateProgress();
    displayCurrentWord();
}

function updateProgress() {
    currentIndexEl.textContent = currentWordIndex + 1;
}

// Start the app
init();
