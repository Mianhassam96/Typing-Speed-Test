let currentText = "";
let timeLeft = 60;
let timer;
let typedText = '';
let correctChars = 0;
let totalChars = 0;

// Array of random text snippets
const textSnippets = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests help improve your typing efficiency and accuracy.",
  "JavaScript is a versatile programming language used for web development.",
  "Practice makes perfect when it comes to enhancing your typing skills.",
  "OpenAI develops advanced AI models for various applications.",
  "Consistency and dedication are key to mastering any new skill.",
  "A well-designed user interface enhances the overall user experience.",
  "Learning to code can open up numerous career opportunities.",
  "Effective communication is essential in both personal and professional settings.",
  "Continuous learning ensures you stay updated with the latest technologies."
];

// Function to start the typing test
function startTest() {
  currentText = getRandomText(); // Get a new random text
  document.getElementById("display-text").innerText = currentText;

  const inputBox = document.getElementById("input-box");
  inputBox.disabled = false;
  inputBox.value = '';
  inputBox.focus();
  
  document.getElementById("start-btn").disabled = true;
  document.getElementById("pause-btn").disabled = false;

  // Reset result section
  correctChars = 0;
  totalChars = 0;
  timeLeft = 60;
  document.getElementById("time-left").innerText = timeLeft;
  document.getElementById("result").classList.remove("hidden");

  startTimer();
}

// Function to get a random text snippet
function getRandomText() {
  return textSnippets[Math.floor(Math.random() * textSnippets.length)];
}

// Function to check input
function checkInput() {
  const inputBox = document.getElementById("input-box");
  typedText = inputBox.value;

  if (typedText === currentText) {
    correctChars = currentText.length; // Count all characters as correct
    totalChars += currentText.length; // Update total characters
    updateResults();

    // Display next sentence
    currentText = getRandomText();
    document.getElementById("display-text").innerText = currentText;
    inputBox.value = ''; // Clear the input box
  }
}

// Function to update results
function updateResults() {
  document.getElementById("wpm").innerText = calculateWPM();
  document.getElementById("accuracy").innerText = calculateAccuracy();
}

// Calculate WPM (Words Per Minute)
function calculateWPM() {
  return Math.round((correctChars / 5) / ((60 - timeLeft) / 60));
}

// Calculate accuracy
function calculateAccuracy() {
  return totalChars ? Math.round((correctChars / totalChars) * 100) : 0;
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("time-left").innerText = timeLeft;
    } else {
      clearInterval(timer);
      alert(`Test complete! Your WPM: ${calculateWPM()}, Accuracy: ${calculateAccuracy()}%`);
      document.getElementById("input-box").disabled = true;
      document.getElementById("start-btn").disabled = false;
      document.getElementById("pause-btn").disabled = true;
    }
  }, 1000);
}

// Pause function
function pauseTest() {
  clearInterval(timer);
  document.getElementById("start-btn").disabled = false;
  document.getElementById("pause-btn").disabled = true;
}

// Call startTest to initialize (optional)
