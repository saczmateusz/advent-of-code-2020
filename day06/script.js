const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .replace(/(\r\n|\n|\r)/gm, " ")
  .split("  ");

let resultOne = 0;
let t0 = performance.now();

const dataOne = data.map((line) => line.split(" ").join("").split(""));

dataOne.forEach((line) => {
  const unique = new Set(line);
  resultOne += unique.size;
});

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

const dataTwo = data.map((line) => line.split(" "));

dataTwo.forEach((group) => {
  const firstLine = group[0];
  const reg = new RegExp(`([${firstLine}])`, "g");
  let questionsCount = firstLine.length;
  for (let i = 1; i < group.length; i++) {
    const line = group[i];
    const matchedCharacters = line.match(reg);
    const countMatched = matchedCharacters ? matchedCharacters.length : 0;
    if (countMatched < questionsCount) {
      questionsCount = countMatched;
    }
  }
  resultTwo += questionsCount;
});
let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
