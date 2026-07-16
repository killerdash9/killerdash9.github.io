const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

for (const id of ["home", "about", "contact", "projects", "experience", "research", "games"]) {
  assert.match(html, new RegExp(`id="${id}"`), `missing section id: ${id}`);
}

for (const label of ["Home", "About", "Contact", "Projects", "Experience", "Research", "Games"]) {
  assert.match(html, new RegExp(`>${label}<`), `missing nav label: ${label}`);
}

for (const control of ["Start game", "Pause", "Restart", "High score"]) {
  assert.match(html, new RegExp(control, "i"), `missing game control text: ${control}`);
}

assert.doesNotMatch(html, /Clean XP/i);

console.log("site shell test passed");
