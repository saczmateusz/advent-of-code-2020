const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

let data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .replace(/(\r\n|\n|\r)/gm, " ")
  .split("  ");

const fields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

let resultOne = 0;
let t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  let allFieldsFound = true;
  fields.forEach((field) => {
    if (!data[i].includes(`${field}:`)) {
      allFieldsFound = false;
    }
  });
  if (allFieldsFound) {
    resultOne++;
  }
}

let t1 = performance.now() - t0;
let resultTwo = 0;

const isHairColor = (color) => {
  if (color.length < 7 || color[0] !== "#") {
    return false;
  }
  for (let x = 1; x < 6; x++) {
    if ((x >= "0" && x <= "9") || (x >= "a" && x <= "f")) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

const isLineValid = (line) => {
  for (let i = 0; i < line.length; i++) {
    let lineField = line[i];
    let year;
    switch (lineField[0]) {
      case "ecl":
        const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        let validColor = eyeColors.findIndex((color) => color === lineField[1]);
        if (validColor === -1) {
          return false;
        }
        break;
      case "pid":
        if (lineField[1].length !== 9) {
          return false;
        }
        break;
      case "eyr":
        year = parseInt(lineField[1], 10);
        if (year < 2020 || year > 2030) {
          return false;
        }
        break;
      case "hcl":
        if (!isHairColor(lineField[1])) {
          return false;
        }
        break;
      case "byr":
        year = parseInt(lineField[1], 10);
        if (year < 1920 || year > 2002) {
          return false;
        }
        break;
      case "iyr":
        year = parseInt(lineField[1], 10);
        if (year < 2010 || year > 2020) {
          return false;
        }
        break;
      case "hgt":
        let height;
        if (lineField[1].includes("cm")) {
          height = lineField[1].slice(0, -2);
          height = parseInt(height, 10);
          if (height < 150 || height > 193) {
            return false;
          }
        } else if (lineField[1].includes("in")) {
          height = lineField[1].slice(0, -2);
          height = parseInt(height, 10);
          if (height < 59 || height > 76) {
            return false;
          }
        } else {
          return false;
        }
        break;
    }
  }
  return true;
};

t0 = performance.now();

for (let i = 0; i < data.length; i++) {
  let allFieldsFound = true;
  let line = data[i];
  fields.forEach((field) => {
    if (!line.includes(`${field}:`)) {
      allFieldsFound = false;
    }
  });
  if (allFieldsFound) {
    line = line.split(" ").map((field) => field.split(":"));
    if (isLineValid(line)) {
      resultTwo++;
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
