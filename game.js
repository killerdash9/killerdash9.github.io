const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const PIECE_TYPES = ["I", "J", "L", "O", "S", "T", "Z"];

const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
}

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

function clonePiece(piece) {
  if (!piece) {
    return null;
  }

  return {
    type: piece.type,
    x: piece.x,
    y: piece.y,
    matrix: piece.matrix.map((row) => row.slice()),
  };
}

function createPiece(type, x = 3, y = 0) {
  return {
    type,
    x,
    y,
    matrix: SHAPES[type].map((row) => row.slice()),
  };
}

function rotateMatrixClockwise(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  const rotated = Array.from({ length: width }, () => Array(height).fill(0));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      rotated[x][height - 1 - y] = matrix[y][x];
    }
  }

  return rotated;
}

function takeNextType(queue) {
  if (queue.length > 0) {
    return queue.shift();
  }

  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
}

function cloneGameState(state) {
  return {
    ...state,
    board: cloneBoard(state.board),
    activePiece: clonePiece(state.activePiece),
    nextPiece: clonePiece(state.nextPiece),
    pieceQueue: Array.isArray(state.pieceQueue) ? state.pieceQueue.slice() : [],
  };
}

function createGameState(options = {}) {
  const pieceQueue = Array.isArray(options.pieceQueue) ? options.pieceQueue.slice() : [];
  const nextPiece = createPiece(takeNextType(pieceQueue));

  return {
    status: "idle",
    score: 0,
    highScore: 0,
    isPaused: false,
    isGameOver: false,
    linesCleared: 0,
    board: createEmptyBoard(),
    activePiece: null,
    holdPiece: null,
    canHold: true,
    nextPiece,
    pieceQueue,
  };
}

function canPlace(board, piece, matrix = piece.matrix, x = piece.x, y = piece.y) {
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      if (!matrix[row][col]) {
        continue;
      }

      const boardX = x + col;
      const boardY = y + row;

      if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
        return false;
      }

      if (boardY >= 0 && board[boardY][boardX]) {
        return false;
      }
    }
  }

  return true;
}

function mergePiece(board, piece) {
  const nextBoard = cloneBoard(board);

  for (let row = 0; row < piece.matrix.length; row += 1) {
    for (let col = 0; col < piece.matrix[row].length; col += 1) {
      if (!piece.matrix[row][col]) {
        continue;
      }

      const boardX = piece.x + col;
      const boardY = piece.y + row;

      if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
        nextBoard[boardY][boardX] = piece.type;
      }
    }
  }

  return nextBoard;
}

function clearFullLines(board) {
  const remainingRows = board.filter((row) => row.some((cell) => cell === null));
  const cleared = BOARD_HEIGHT - remainingRows.length;

  while (remainingRows.length < BOARD_HEIGHT) {
    remainingRows.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return {
    board: remainingRows,
    cleared,
  };
}

function scoreForLines(cleared) {
  const values = [0, 100, 300, 500, 800];
  return values[cleared] ?? cleared * 200;
}

function spawnNextPiece(state) {
  const nextState = cloneGameState(state);
  const activePiece = clonePiece(nextState.nextPiece) || createPiece(takeNextType(nextState.pieceQueue));
  const nextType = takeNextType(nextState.pieceQueue);

  nextState.activePiece = activePiece;
  nextState.nextPiece = createPiece(nextType);
  nextState.status = "playing";
  nextState.isPaused = false;
  nextState.isGameOver = false;
  nextState.canHold = true;

  if (!canPlace(nextState.board, activePiece)) {
    nextState.status = "game-over";
    nextState.isGameOver = true;
    return nextState;
  }

  return nextState;
}

function startGame(state) {
  if (state.status === "paused") {
    const resumed = cloneGameState(state);
    resumed.status = "playing";
    resumed.isPaused = false;
    return resumed;
  }

  const fresh = cloneGameState(state);
  fresh.board = createEmptyBoard();
  fresh.score = 0;
  fresh.linesCleared = 0;
  fresh.isPaused = false;
  fresh.isGameOver = false;
  fresh.canHold = true;
  fresh.status = "playing";
  return spawnNextPiece(fresh);
}

function pauseGame(state) {
  const next = cloneGameState(state);
  next.status = "paused";
  next.isPaused = true;
  return next;
}

function restartGame(state) {
  const restarted = createGameState({
    pieceQueue: Array.isArray(state.pieceQueue) ? state.pieceQueue.slice() : [],
  });
  restarted.highScore = state.highScore;
  return startGame(restarted);
}

function addScore(state, amount) {
  const next = cloneGameState(state);
  next.score = state.score + amount;
  next.highScore = Math.max(state.highScore, next.score);
  return next;
}

function recordGameOver(state) {
  const next = cloneGameState(state);
  next.status = "game-over";
  next.isGameOver = true;
  next.isPaused = false;
  next.highScore = Math.max(state.highScore, state.score);
  return next;
}

function moveActivePiece(state, dx, dy) {
  if (!state.activePiece || state.status !== "playing") {
    return state;
  }

  const candidate = {
    ...state.activePiece,
    x: state.activePiece.x + dx,
    y: state.activePiece.y + dy,
  };

  if (canPlace(state.board, candidate)) {
    const next = cloneGameState(state);
    next.activePiece = candidate;
    return next;
  }

  if (dy > 0) {
    return lockActivePiece(state);
  }

  return state;
}

function rotateActivePiece(state) {
  if (!state.activePiece || state.status !== "playing") {
    return state;
  }

  const rotatedMatrix = rotateMatrixClockwise(state.activePiece.matrix);
  const kicks = [0, -1, 1, -2, 2];

  for (const kick of kicks) {
    const candidate = {
      ...state.activePiece,
      x: state.activePiece.x + kick,
      matrix: rotatedMatrix,
    };

    if (canPlace(state.board, candidate, rotatedMatrix, candidate.x, candidate.y)) {
      const next = cloneGameState(state);
      next.activePiece = candidate;
      return next;
    }
  }

  return state;
}

function lockActivePiece(state) {
  if (!state.activePiece) {
    return state;
  }

  const mergedBoard = mergePiece(state.board, state.activePiece);
  const clearedState = clearFullLines(mergedBoard);
  const gained = scoreForLines(clearedState.cleared);
  const scored = cloneGameState(state);

  scored.board = clearedState.board;
  scored.score = state.score + gained;
  scored.highScore = Math.max(state.highScore, scored.score);
  scored.linesCleared = state.linesCleared + clearedState.cleared;

  return spawnNextPiece(scored);
}

function tickGame(state) {
  return moveActivePiece(state, 0, 1);
}

function hardDrop(state) {
  if (!state.activePiece || state.status !== "playing") {
    return state;
  }

  const next = cloneGameState(state);

  while (canPlace(next.board, {
    ...next.activePiece,
    y: next.activePiece.y + 1,
  })) {
    next.activePiece.y += 1;
  }

  return lockActivePiece(next);
}

function getGhostPiece(state) {
  if (!state.activePiece) {
    return null;
  }

  const ghost = clonePiece(state.activePiece);

  while (canPlace(state.board, {
    ...ghost,
    y: ghost.y + 1,
  })) {
    ghost.y += 1;
  }

  ghost.transparent = true;
  return ghost;
}

function getNextPreviewPiece(state) {
  return clonePiece(state.nextPiece);
}

function getHoldPreviewPiece(state) {
  return clonePiece(state.holdPiece);
}

function holdActivePiece(state) {
  if (!state.activePiece || state.status !== "playing" || !state.canHold) {
    return state;
  }

  const nextState = cloneGameState(state);
  const currentHoldType = nextState.holdPiece ? nextState.holdPiece.type : null;
  nextState.holdPiece = createPiece(state.activePiece.type);
  nextState.canHold = false;

  if (!currentHoldType) {
    nextState.activePiece = clonePiece(nextState.nextPiece) || createPiece(takeNextType(nextState.pieceQueue));
    const nextType = takeNextType(nextState.pieceQueue);
    nextState.nextPiece = createPiece(nextType);
  } else {
    nextState.activePiece = createPiece(currentHoldType);
  }

  if (!canPlace(nextState.board, nextState.activePiece)) {
    nextState.status = "game-over";
    nextState.isGameOver = true;
    nextState.isPaused = false;
    return nextState;
  }

  return nextState;
}

const api = {
  createGameState,
  startGame,
  pauseGame,
  restartGame,
  addScore,
  recordGameOver,
  moveActivePiece,
  rotateActivePiece,
  tickGame,
  hardDrop,
  getGhostPiece,
  getNextPreviewPiece,
  getHoldPreviewPiece,
  holdActivePiece,
  BOARD_WIDTH,
  BOARD_HEIGHT,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}

if (typeof window !== "undefined") {
  window.TetrisGame = api;
}
