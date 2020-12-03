const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => {
    const regex = /([- :])+/;
    let elements = line.split(regex);
    elements[0] = parseInt(elements[0], 10);
    elements[2] = parseInt(elements[2], 10);
    return elements;
  });

let resultOne = 0;
let t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  const start = data[i][0];
  const end = data[i][2];
  const character = data[i][4];
  const password = data[i][6].split("");
  const charactersCount = password.filter((digit) => digit === character)
    .length;
  if (charactersCount >= start && charactersCount <= end) {
    resultOne++;
  }
}

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  const start = data[i][0] - 1;
  const end = data[i][2] - 1;
  const character = data[i][4];
  const password = data[i][6].split("");
  if (
    (password[start] === character && password[end] !== character) ||
    (password[start] !== character && password[end] === character)
  ) {
    resultTwo++;
  }
}

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
