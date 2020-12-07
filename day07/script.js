const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((line) => line.split(" "));

const graph = [];
data.forEach((line) => {
  const node = { name: line[0] + " " + line[1], children: [] };
  let i = 4;
  while (i < line.length - 1) {
    if (line[i] !== "no") {
      node.children.push({
        name: line[i + 1] + " " + line[i + 2],
        count: line[i],
      });
    }
    i += 4;
  }
  graph.push(node);
});

let resultOne = 0;
let uniqueBagList = [];

function findAllAncestors(bagName) {
  graph.forEach((node) => {
    const children = node.children;
    children.forEach((child) => {
      if (child.name == bagName) {
        const index = uniqueBagList.findIndex((item) => item.match(node.name));
        if (index === -1) {
          resultOne++;
          uniqueBagList.push(node.name);
          findAllAncestors(node.name);
        }
      }
    });
  });
}

function findChildrenCount(bagName) {
  let count = 0;
  graph.forEach((node) => {
    if (node.name === bagName) {
      const children = node.children;
      children.forEach((child) => {
        const value = parseInt(child.count, 10);
        count += value + value * findChildrenCount(child.name);
      });
    }
  });

  return count;
}

let t0 = performance.now();

findAllAncestors("shiny gold");

let t1 = performance.now() - t0;
let resultTwo = 0;
t0 = performance.now();

resultTwo = findChildrenCount("shiny gold");

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
