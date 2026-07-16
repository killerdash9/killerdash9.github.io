const startButton = document.querySelector("[data-start-button]");
const mainNav = document.querySelector("#main-nav");

if (startButton && mainNav) {
  startButton.addEventListener("click", () => {
    const open = mainNav.getAttribute("data-open") === "true";
    mainNav.setAttribute("data-open", String(!open));
    startButton.setAttribute("aria-expanded", String(!open));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 800px)").matches) {
      mainNav.setAttribute("data-open", "false");
      startButton.setAttribute("aria-expanded", "false");
    }
  });
}

const gameApi = window.TetrisGame;
const gameCanvas = document.querySelector("[data-game-board]");
const gameStatus = document.querySelector("[data-game-status]");
const gameScore = document.querySelector("[data-game-score]");
const gameHighScore = document.querySelector("[data-game-high-score]");
const gameStartButton = document.querySelector("[data-game-start]");
const gamePauseButton = document.querySelector("[data-game-pause]");
const gameRestartButton = document.querySelector("[data-game-restart]");
const touchButtons = document.querySelectorAll("[data-action]");

if (gameApi && gameCanvas && gameStatus && gameScore && gameHighScore && gameStartButton && gamePauseButton && gameRestartButton) {
  const ctx = gameCanvas.getContext("2d");
  const storageKey = "jeong-yeon-noh-tetris-high-score";
  const cellSize = gameCanvas.width / gameApi.BOARD_WIDTH;
  const colors = {
    I: "#5de1ff",
    J: "#507bff",
    L: "#ffb24a",
    O: "#ffd84d",
    S: "#7ee07f",
    T: "#c57bff",
    Z: "#ff6a6a",
  };

  let dropTimer = null;
  let gameState = gameApi.createGameState();

  try {
    const savedHighScore = Number(window.localStorage.getItem(storageKey));
    if (!Number.isNaN(savedHighScore) && savedHighScore > 0) {
      gameState.highScore = savedHighScore;
    }
  } catch {
    // Ignore storage failures in private or disabled browsing contexts.
  }

  function saveHighScore(score) {
    try {
      window.localStorage.setItem(storageKey, String(score));
    } catch {
      // Ignore storage failures in private or disabled browsing contexts.
    }
  }

  function stopTimer() {
    if (dropTimer !== null) {
      window.clearInterval(dropTimer);
      dropTimer = null;
    }
  }

  function startTimer() {
    if (dropTimer !== null) {
      return;
    }

    dropTimer = window.setInterval(() => {
      if (gameState.status === "playing") {
        applyState(gameApi.tickGame(gameState));
      }
    }, 650);
  }

  function drawCell(x, y, color) {
    const px = x * cellSize;
    const py = y * cellSize;

    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
  }

  function drawPiece(piece, opacity = 1) {
    if (!piece) {
      return;
    }

    ctx.save();
    ctx.globalAlpha = opacity;

    for (let row = 0; row < piece.matrix.length; row += 1) {
      for (let col = 0; col < piece.matrix[row].length; col += 1) {
        if (!piece.matrix[row][col]) {
          continue;
        }

        const x = piece.x + col;
        const y = piece.y + row;
        if (y >= 0) {
          drawCell(x, y, colors[piece.type] || "#d9d9d9");
        }
      }
    }

    ctx.restore();
  }

  function drawBoardBackground() {
    ctx.fillStyle = "#10203d";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    for (let x = 0; x <= gameApi.BOARD_WIDTH; x += 1) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize + 0.5, 0);
      ctx.lineTo(x * cellSize + 0.5, gameCanvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= gameApi.BOARD_HEIGHT; y += 1) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize + 0.5);
      ctx.lineTo(gameCanvas.width, y * cellSize + 0.5);
      ctx.stroke();
    }
  }

  function drawOverlay(message) {
    ctx.fillStyle = "rgba(7, 17, 34, 0.72)";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 20px Tahoma, Verdana, sans-serif";
    ctx.fillText(message, gameCanvas.width / 2, gameCanvas.height / 2 - 8);
    ctx.font = "400 12px Tahoma, Verdana, sans-serif";
    ctx.fillText("Arrow keys, WASD, Space, or touch buttons", gameCanvas.width / 2, gameCanvas.height / 2 + 18);
  }

  function render() {
    if (!ctx) {
      return;
    }

    drawBoardBackground();

    for (let y = 0; y < gameState.board.length; y += 1) {
      for (let x = 0; x < gameState.board[y].length; x += 1) {
        const pieceType = gameState.board[y][x];
        if (pieceType) {
          drawCell(x, y, colors[pieceType] || "#d9d9d9");
        }
      }
    }

    drawPiece(gameApi.getGhostPiece(gameState), 0.28);

    if (gameState.activePiece) {
      drawPiece(gameState.activePiece, 1);
    }

    if (gameState.status !== "playing") {
      const label =
        gameState.status === "paused"
          ? "Paused"
          : gameState.status === "game-over"
            ? "Game over"
            : "Press Start game";
      drawOverlay(label);
    }

    gameStatus.textContent =
      gameState.status === "game-over" ? "Game over" : gameState.status.charAt(0).toUpperCase() + gameState.status.slice(1);
    gameScore.textContent = String(gameState.score);
    gameHighScore.textContent = String(gameState.highScore);
    gameStartButton.textContent =
      gameState.status === "paused" ? "Resume" : gameState.status === "playing" ? "Running" : "Start game";
    gamePauseButton.textContent = gameState.status === "paused" ? "Resume" : "Pause";

    if (gameState.highScore > 0) {
      saveHighScore(gameState.highScore);
    }
  }

  function applyState(nextState) {
    gameState = nextState;
    render();

    if (gameState.status === "playing") {
      startTimer();
    } else {
      stopTimer();
    }
  }

  function startOrResume() {
    applyState(gameApi.startGame(gameState));
  }

  function pauseOrResume() {
    if (gameState.status === "playing") {
      applyState(gameApi.pauseGame(gameState));
      return;
    }

    if (gameState.status === "paused") {
      applyState(gameApi.startGame(gameState));
    }
  }

  function restart() {
    applyState(gameApi.restartGame(gameState));
  }

  function stepDown() {
    if (gameState.status === "playing") {
      applyState(gameApi.tickGame(gameState));
    }
  }

  function move(dx, dy) {
    if (gameState.status === "playing") {
      applyState(gameApi.moveActivePiece(gameState, dx, dy));
    }
  }

  function rotate() {
    if (gameState.status === "playing") {
      applyState(gameApi.rotateActivePiece(gameState));
    }
  }

  function drop() {
    if (gameState.status === "playing") {
      applyState(gameApi.hardDrop(gameState));
    }
  }

  function handleControl(action) {
    switch (action) {
      case "left":
        move(-1, 0);
        break;
      case "right":
        move(1, 0);
        break;
      case "down":
        stepDown();
        break;
      case "rotate":
        rotate();
        break;
      case "drop":
        drop();
        break;
      case "pause":
        pauseOrResume();
        break;
      default:
        break;
    }
  }

  gameStartButton.addEventListener("click", startOrResume);
  gamePauseButton.addEventListener("click", pauseOrResume);
  gameRestartButton.addEventListener("click", restart);

  touchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleControl(button.dataset.action);
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const handled =
      key === "arrowleft" ||
      key === "a" ||
      key === "arrowright" ||
      key === "d" ||
      key === "arrowdown" ||
      key === "s" ||
      key === "arrowup" ||
      key === "w" ||
      key === " " ||
      key === "spacebar" ||
      key === "p";

    if (!handled) {
      return;
    }

    event.preventDefault();

    if (key === "arrowleft" || key === "a") {
      move(-1, 0);
    } else if (key === "arrowright" || key === "d") {
      move(1, 0);
    } else if (key === "arrowdown" || key === "s") {
      stepDown();
    } else if (key === "arrowup" || key === "w") {
      rotate();
    } else if (key === " " || key === "spacebar") {
      drop();
    } else if (key === "p") {
      pauseOrResume();
    }
  });

  render();
}
