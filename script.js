const board = document.getElementById('board');
let currentPlayer = 'X';
let cells = [];

// Initialize the board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push('');
    }
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] === '') {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
        } else if (checkDraw()) {
            alert('Draw!');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for a win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

// Check for a draw
function checkDraw() {
    return cells.every(cell => cell !== '');
}

// Reset the board
function resetBoard() {
    board.innerHTML = '';
    cells = [];
    currentPlayer = 'X';
    initializeBoard();
}

// Initialize the board on page load
initializeBoard();
