const assert = require("assert");
const {
  createGameState,
  startGame,
  moveActivePiece,
  hardDrop,
} = require("../game");

const playing = startGame(createGameState({ pieceQueue: ["O", "I"] }));
assert.strictEqual(playing.status, "playing");
assert.ok(playing.activePiece);
assert.ok(playing.nextPiece);

playing.board[19] = ["X", "X", "X", null, null, "X", "X", "X", "X", "X"];

const shiftedLeft = moveActivePiece(playing, -1, 0);
assert.strictEqual(shiftedLeft.activePiece.x, playing.activePiece.x - 1);

const settled = hardDrop(playing);
assert.strictEqual(settled.linesCleared, 1);
assert.ok(settled.score >= 100);
assert.strictEqual(settled.highScore, settled.score);

console.log("tetris engine test passed");
