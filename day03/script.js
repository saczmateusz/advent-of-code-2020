const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => line.split(""));

const ylength = data.length;
const xlength = data[0].length;

const isTree = (xx, yy) => {
  return data[yy][xx % xlength] === "#";
};

const traverseMap = (stepX, stepY) => {
  let x = 0;
  let y = 0;
  let treeCounter = 0;

  do {
    if (isTree(x, y)) {
      treeCounter++;
    }

    x += stepX;
    y += stepY;
  } while (y < ylength);

  return treeCounter;
};

let t0 = performance.now();

const resultOne = traverseMap(3, 1);

let t1 = performance.now() - t0;
let resultTwo = resultOne;
t0 = performance.now();

const steps = [
  { x: 1, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];

steps.forEach((pair) => {
  resultTwo *= traverseMap(pair.x, pair.y);
});

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
