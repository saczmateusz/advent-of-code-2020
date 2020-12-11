const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => parseInt(line, 10));

const preambeCheck = (pos, num) => {
  for (let i = pos - 25; i < pos; i++) {
    for (let j = i + 1; j < pos; j++) {
      if (data[i] + data[j] === num) {
        return true;
      }
    }
  }
  return false;
};

const findError = () => {
  let i = 25;
  let res = 0;
  for (i; i < data.length; i++) {
    res = preambeCheck(i, data[i]);
    if (!res) {
      return data[i];
    }
  }
};

let t0 = performance.now();

const resultOne = findError();

let t1 = performance.now() - t0;

const checkSet = (iterator) => {
  let start = iterator;
  let min = data[iterator];
  let max = 0;
  let sum = 0;
  for (let i = iterator; i < data.length; i++) {
    sum += data[i];

    if (sum > resultOne) {
      return { result: false };
    }

    min = min > data[i] ? data[i] : min;
    max = max < data[i] ? data[i] : max;

    if (sum === resultOne && start !== i) {
      return { result: true, min, max };
    }
  }
  return { result: false };
};

const findContiguosSetResult = () => {
  let iterator = 400;
  let subresult = {};
  while (iterator <= data.length) {
    subresult = checkSet(iterator);
    if (subresult.result) {
      return subresult;
    }
    iterator++;
  }
};

t0 = performance.now();

const res = findContiguosSetResult();
const resultTwo = res.min + res.max;

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
