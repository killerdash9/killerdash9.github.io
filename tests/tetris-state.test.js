const assert = require("assert");
const {
  createGameState,
  startGame,
  pauseGame,
  restartGame,
  addScore,
  recordGameOver,
} = require("../game");

const initial = createGameState();

assert.strictEqual(initial.status, "idle");
assert.strictEqual(initial.score, 0);
assert.strictEqual(initial.highScore, 0);
assert.strictEqual(initial.isPaused, false);
assert.strictEqual(initial.isGameOver, false);

const started = startGame(initial);
assert.strictEqual(started.status, "playing");
assert.strictEqual(started.isPaused, false);
assert.strictEqual(started.isGameOver, false);

const scored = addScore(started, 120);
assert.strictEqual(scored.score, 120);
assert.strictEqual(scored.highScore, 120);

const paused = pauseGame(scored);
assert.strictEqual(paused.status, "paused");
assert.strictEqual(paused.isPaused, true);

const ended = recordGameOver(paused);
assert.strictEqual(ended.status, "game-over");
assert.strictEqual(ended.isGameOver, true);
assert.strictEqual(ended.isPaused, false);

const restarted = restartGame(ended);
assert.strictEqual(restarted.status, "playing");
assert.strictEqual(restarted.score, 0);
assert.strictEqual(restarted.highScore, 120);
assert.strictEqual(restarted.isPaused, false);
assert.strictEqual(restarted.isGameOver, false);

console.log("tetris state test passed");
