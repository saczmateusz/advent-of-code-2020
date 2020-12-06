const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

let data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => line.replace(/[FL]/g, "0").replace(/[BR]/g, "1"));

let seatIdList = [];
let t0 = performance.now();

data.forEach((seat) => seatIdList.push(parseInt(seat, 2)));

seatIdList.sort((x, y) => x - y);
const resultOne = seatIdList[seatIdList.length - 1];

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

for (let x = 1; x < seatIdList.length; x++) {
  const seatA = seatIdList[x];
  const seatB = seatIdList[x - 1];
  if (seatA - seatB > 1) {
    resultTwo = seatA - 1;
    break;
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
