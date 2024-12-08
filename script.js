const puzzleGrid = document.getElementById('puzzle-grid');
const shuffleButton = document.getElementById('shuffle-button');
const statusText = document.getElementById('status');

// 正确的步骤和问题
const correctSteps = [
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

let currentSteps = [...correctSteps];
let askedQuestions = new Set(); // 记录已经提问的块

const questions = [
  "What is the purpose of analyzing transactions in the accounting cycle？",
  "When journalizing, what is the proper format for recording a transaction?",
  "What is the primary purpose of posting transactions to the ledger?",
  "What are the key components of a worksheet?",
  "Name the three main financial statements prepared during this step。",
  "Why are adjusting entries necessary?",
  "What is the significance of posting adjusting and closing entries to the ledger? ",
  "What is the primary purpose of the post-closing trial balance?"
];

// 创建并随机打乱方块
function createTiles() {
  puzzleGrid.innerHTML = '';
  currentSteps.forEach((step, index) => {
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
  currentSteps.sort(() => Math.random() - 0.5);
  createTiles();
  askedQuestions.clear(); // 重置提问记录
  statusText.textContent = '';
}

// 检查是否获胜
function checkWin() {
  if (JSON.stringify(currentSteps) === JSON.stringify(correctSteps)) {
    statusText.textContent = "Congratulations! You completed the puzzle!";
  }
}

// 提问机制（有答案输入）
function askQuestion(index) {
  if (!askedQuestions.has(index) && index < questions.length) {
    askedQuestions.add(index); // 标记此块已经提问过
    const userAnswer = prompt(`Question: ${questions[index]}\n\nYour Answer:`);

    // 记录答案或简单反馈
    if (userAnswer !== null) {
      alert(`You answered: "${userAnswer}".`);
    } else {
      alert("No answer provided.");
    }
  }
}

// 交换方块并处理逻辑
function swapTiles(index1, index2) {
  [currentSteps[index1], currentSteps[index2]] = [currentSteps[index2], currentSteps[index1]];
  createTiles();

  // 检查移动后的正确位置
  if (currentSteps[index1] === correctSteps[index1]) {
    askQuestion(index1);
  }
  if (currentSteps[index2] === correctSteps[index2]) {
    askQuestion(index2);
  }

  checkWin();
}

// 处理方块点击事件
puzzleGrid.addEventListener('click', (e) => {
  const clickedTile = e.target;
  if (!clickedTile.classList.contains('tile')) return;

  const blankIndex = currentSteps.indexOf("");
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

// 添加事件监听器
shuffleButton.addEventListener('click', shuffleTiles);

// 初始化游戏
createTiles();
