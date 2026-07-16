const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const game = require("../game");

assert.match(html, /data-hold-piece-board/, "missing hold preview canvas");
assert.match(html, /Hold/i, "missing hold label");
assert.ok(typeof game.getHoldPreviewPiece === "function", "missing hold preview helper");
assert.ok(typeof game.holdActivePiece === "function", "missing hold action helper");

const started = game.startGame(game.createGameState({ pieceQueue: ["I", "O", "T", "S"] }));
const heldOnce = game.holdActivePiece(started);

assert.strictEqual(heldOnce.holdPiece.type, "I");
assert.strictEqual(heldOnce.activePiece.type, "O");
assert.strictEqual(heldOnce.nextPiece.type, "T");
assert.strictEqual(heldOnce.canHold, false);

const heldTwice = game.holdActivePiece(heldOnce);
assert.strictEqual(heldTwice.activePiece.type, "O");
assert.strictEqual(heldTwice.holdPiece.type, "I");

const afterDrop = game.hardDrop(heldOnce);
assert.strictEqual(afterDrop.canHold, true);

const swapped = game.holdActivePiece(afterDrop);
assert.strictEqual(swapped.holdPiece.type, "T");
assert.strictEqual(swapped.activePiece.type, "I");

console.log("tetris hold test passed");
