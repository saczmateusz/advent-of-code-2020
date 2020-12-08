const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => {
    line = line.split(" ");
    const instruction = {
      name: line[0],
      value: parseInt(line[1], 10),
      count: 0,
    };
    return instruction;
  });

const evaluateInstructions = (set) => {
  let accumulator = 0;
  let iterator = 0;
  while (iterator < set.length) {
    let instruction = set[iterator];
    instruction.count++;
    set[iterator] = instruction;
    if (instruction.count > 1) {
      return { accumulator, iterator };
    }
    switch (instruction.name) {
      case "nop":
        iterator++;
        break;
      case "acc":
        accumulator += instruction.value;
        iterator++;
        break;
      case "jmp":
        iterator += instruction.value;
        break;
    }
    if (iterator >= set.length) {
      return { accumulator, iterator };
    }
  }
  return null;
};

let t0 = performance.now();

let instructionSet = [];
data.forEach((item) => {
  instructionSet.push({
    name: item.name,
    value: item.value,
    count: item.count,
  });
});
let result = evaluateInstructions(instructionSet);
const resultOne = result.accumulator;

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  instructionSet = [];
  data.forEach((item) => {
    instructionSet.push({
      name: item.name,
      value: item.value,
      count: item.count,
    });
  });
  if (instructionSet[i].name === "jmp") {
    instructionSet[i].name = "nop";
    result = evaluateInstructions(instructionSet);
    if (result.iterator >= data.length) {
      resultTwo = result.accumulator;
      break;
    }
  } else if (instructionSet[i].name === "nop") {
    instructionSet[i].name = "jmp";
    result = evaluateInstructions(instructionSet);
    if (result.iterator >= data.length) {
      resultTwo = result.accumulator;
      break;
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
