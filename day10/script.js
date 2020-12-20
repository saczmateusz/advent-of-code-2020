const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

let data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => parseInt(line, 10))
  .sort((x, y) => (x > y ? 1 : x < y ? -1 : 0));

const countJoltDifference = () => {
  let diffByOne = 0;
  let diffByThree = 1;
  if (data[0] === 1) {
    diffByOne++;
  } else if (data[0] === 3) {
    diffByThree++;
  }
  for (let i = 1; i < data.length; i++) {
    if (data[i] - data[i - 1] === 1) {
      diffByOne++;
    } else if (data[i] - data[i - 1] === 3) {
      diffByThree++;
    }
  }
  return { diffByOne, diffByThree };
};

let t0 = performance.now();

const result = countJoltDifference();
const resultOne = result.diffByOne * result.diffByThree;

let t1 = performance.now() - t0;
t0 = performance.now();

data.unshift(0);
data.push(data[data.length - 1] + 3);
let sums = [1, 1, 1];
let sum = 0;

for (let i = data.length - 4; i >= 0; i--) {
  sum = sums[0];
  if (data[i + 2] - data[i] < 4) {
    sum += sums[1];
  }
  if (data[i + 3] - data[i] < 4) {
    sum += sums[2];
  }

  sums[2] = sums[1];
  sums[1] = sums[0];
  sums[0] = sum;
}

const resultTwo = sum;

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
