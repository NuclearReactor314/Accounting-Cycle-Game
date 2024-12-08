const puzzleGrid = document.getElementById('puzzle-grid');
const shuffleButton = document.getElementById('shuffle-button');
const statusText = document.getElementById('status');

// Steps and questions of the Accounting Cycle
const steps = [
  "Analyze Transactions",
  "Journalize",
  "Post",
  "Prepare Worksheet",
  "Prepare Financial Statements",
  "Journalize Adjusting & Closing Entries",
  "Post Adjusting & Closing Entries",
  "Prepare Post-Closing Trial Balance",
  ""
];

const questions = [
  "What is the purpose of analyzing transactions in the accounting cycle, and what two documents are commonly reviewed during this step?",
  "When journalizing, what is the proper format for recording a transaction?",
  "What is the primary purpose of posting transactions to the ledger, and how does it differ from journalizing?",
  "What are the key components of a worksheet, and why is it important during the accounting cycle?",
  "Name the three main financial statements prepared during this step, and explain the purpose of each.",
  "Why are adjusting entries necessary, and how do they differ from closing entries?",
  "What is the significance of posting adjusting and closing entries to the ledger? How does it affect the trial balance?",
  "What is the primary purpose of the post-closing trial balance, and which accounts should be included in it?"
];

// Create and shuffle tiles
function createTiles() {
  puzzleGrid.innerHTML = '';
  steps.forEach((step, index) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    if (step === "") {
      tile.classList.add('blank');
    }
    tile.textContent = step;
    tile.dataset.index = index;
    puzzleGrid.appendChild(tile);
  });
}

function shuffleTiles() {
  steps.sort(() => Math.random() - 0.5);
  createTiles();
  statusText.textContent = '';
}

function checkWin() {
  const currentOrder = Array.from(document.querySelectorAll('.tile'))
    .map(tile => tile.textContent);
  if (JSON.stringify(currentOrder) === JSON.stringify(steps)) {
    statusText.textContent = "Congratulations! You completed the puzzle!";
  }
}

function askQuestion(index) {
  const question = questions[index];
  if (question) {
    setTimeout(() => {
      alert(`Question: ${question}`);
    }, 200);
  }
}

function swapTiles(index1, index2) {
  [steps[index1], steps[index2]] = [steps[index2], steps[index1]];
  createTiles();
  const blankIndex = steps.indexOf("");
  const correctIndex = blankIndex; // The blank space moves, revealing the correct tile
  if (steps[correctIndex] && steps[correctIndex] === steps[correctIndex]) {
    askQuestion(correctIndex);
  }
  checkWin();
}

// Handle tile clicks
puzzleGrid.addEventListener('click', (e) => {
  const clickedTile = e.target;
  if (!clickedTile.classList.contains('tile')) return;

  const blankIndex = steps.indexOf("");
  const clickedIndex = parseInt(clickedTile.dataset.index);

  const validMoves = [
    blankIndex - 1,
    blankIndex + 1,
    blankIndex - 3,
    blankIndex + 3,
  ];

  if (validMoves.includes(clickedIndex)) {
    swapTiles(blankIndex, clickedIndex);
  }
});

// Event Listeners
shuffleButton.addEventListener('click', shuffleTiles);

// Initialize Game
createTiles();
