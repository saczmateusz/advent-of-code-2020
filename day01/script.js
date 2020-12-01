const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\n")
  .map((x) => parseInt(x, 10));

let resultOne = 0;
let t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i];
    const b = data[j];
    if (a + b == 2020) {
      resultOne = a * b;
    }
  }
}

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    for (let k = j + 1; k < data.length; k++) {
      const a = data[i];
      const b = data[j];
      const c = data[k];
      if (a + b + c == 2020) {
        resultTwo = a * b * c;
      }
    }
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
