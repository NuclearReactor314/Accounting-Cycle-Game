const puzzleGrid = document.getElementById('puzzle-grid');
const shuffleButton = document.getElementById('shuffle-button');
const statusText = document.getElementById('status');

// Steps of the Accounting Cycle
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

function swapTiles(index1, index2) {
  [steps[index1], steps[index2]] = [steps[index2], steps[index1]];
  createTiles();
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
