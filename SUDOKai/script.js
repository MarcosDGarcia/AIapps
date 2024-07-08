let selectedNumber = null;
let timerInterval;
let difficulty = 'novato';
let progressiveDifficultyLevels = ['novato', 'facil', 'moderado', 'dificil', 'experto'];
let progressiveLevelIndex = 0;
let failCount = 0;

function showDifficultyScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('difficulty-screen').style.display = 'block';
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById('difficulty-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    setupBoard();
}

function setupBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => selectCell(cell));
        board.appendChild(cell);
    }
    applyInitialNumbers();
}

function applyInitialNumbers() {
    const board = document.getElementById('sudoku-board').children;
    const initialNumbers = getInitialNumbers(difficulty);
    for (let i = 0; i < board.length; i++) {
        if (initialNumbers[i] !== 0) {
            board[i].textContent = initialNumbers[i];
            board[i].classList.add('grayed');
        }
    }
}

function getInitialNumbers(difficulty) {
    // Esta función devuelve una matriz que representa los números iniciales del tablero
    // basados en la dificultad seleccionada.
    // Implementación simulada para demostración.
    switch (difficulty) {
        case 'novato':
            return [0, 0, 0, 2, 0, 0, 0, 0, 5,
                    1, 9, 0, 0, 4, 0, 0, 8, 0,
                    0, 0, 0, 7, 0, 0, 9, 0, 0,
                    4, 0, 0, 0, 0, 6, 0, 0, 0,
                    0, 0, 0, 5, 0, 0, 3, 0, 7,
                    8, 0, 0, 0, 0, 0, 0, 2, 0,
                    0, 0, 0, 0, 6, 0, 0, 0, 0,
                    3, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 5, 0, 0, 1, 0, 7, 0, 9];
        case 'facil':
            // Definir números para dificultad fácil
            break;
        case 'moderado':
            // Definir números para dificultad moderada
            break;
        case 'dificil':
            // Definir números para dificultad difícil
            break;
        case 'experto':
            // Definir números para dificultad experto
            break;
        case 'progresivo':
            // Implementar lógica progresiva aquí
            break;
        default:
            return [];
    }
}

function selectCell(cell) {
    const board = document.getElementById('sudoku-board').children;
    for (let i = 0; i < board.length; i++) {
        board[i].classList.remove('selected');
    }
    cell.classList.add('selected');
}

function selectNumber(number) {
    selectedNumber = number;
}

function startTimer() {
    let timeLeft = 300;
    document.getElementById('start-button').style.display = 'none';
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showPopup('Tiempo agotado', false);
        }
    }, 1000);
    populateBoard();
}

function populateBoard() {
    const board = document.getElementById('sudoku-board').children;
    const initialNumbers = getInitialNumbers(difficulty);
    for (let i = 0; i < board.length; i++) {
        if (initialNumbers[i] !== 0) {
            board[i].textContent = initialNumbers[i];
            board[i].classList.add('grayed');
        } else {
            board[i].textContent = '';
            board[i].classList.remove('grayed');
        }
    }
}

function checkSolution() {
    // Lógica para verificar la solución del Sudoku
}

function showPopup(message, isSuccess) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'block';
    if (isSuccess) {
        document.getElementById('next-button').style.display = 'block';
        failCount = 0;
    } else {
        document.getElementById('retry-button').style.display = 'block';
        failCount++;
    }
}

function nextLevel() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    if (difficulty === 'progresivo') {
        if (progressiveLevelIndex < progressiveDifficultyLevels.length - 1) {
            progressiveLevelIndex++;
            difficulty = progressiveDifficultyLevels[progressiveLevelIndex];
        }
    }
    setupBoard();
    document.getElementById('timer').textContent = '05:00';
    document.getElementById('start-button').style.display = 'block';
}

function retryLevel() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('retry-button').style.display = 'none';
    if (difficulty === 'progresivo' && failCount >= 2) {
        if (progressiveLevelIndex > 0) {
            progressiveLevelIndex--;
            difficulty = progressiveDifficultyLevels[progressiveLevelIndex];
        }
        failCount = 0;
    }
    setupBoard();
    document.getElementById('timer').textContent = '05:00';
    document.getElementById('start-button').style.display = 'block';
}

function exitGame() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    clearInterval(timerInterval);
}