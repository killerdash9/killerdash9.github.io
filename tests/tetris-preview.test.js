const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const game = require("../game");

assert.match(html, /data-next-piece-board/, "missing next-piece preview canvas");
assert.match(html, /Next/i, "missing next-piece label");
assert.ok(typeof game.getGhostPiece === "function", "existing ghost helper should still exist");
assert.ok(typeof game.getNextPreviewPiece === "function", "missing next preview helper");

const seeded = game.startGame(game.createGameState({ pieceQueue: ["I", "O", "T"] }));
const nextPreview = game.getNextPreviewPiece(seeded);
assert.strictEqual(nextPreview.type, seeded.nextPiece.type);

console.log("tetris preview test passed");
