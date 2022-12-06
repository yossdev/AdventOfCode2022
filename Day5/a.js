const { readFileSync } = require("fs");

const contents = readFileSync("./Day5/input.txt", "utf-8");

const arrOfContents = contents.split(/\r?\n/);

const drawing = arrOfContents
  .slice(0, arrOfContents.indexOf("") - 1)
  .map((x) => {
    const str = x.replace(/\s/g, "-");

    const splitStr = [];

    let i = 0;
    while (i <= str.length) {
      splitStr.push(str.slice(i, 3 + i));
      i += 4;
    }

    return splitStr;
  });

const instructions = arrOfContents
  .slice(arrOfContents.indexOf("") + 1)
  .map((x) => x.split(" "));

// LIFO
const originalStacks = drawing.at(-1).map(() => []);

drawing.reverse().forEach((x) => {
  x.forEach((y, i) => {
    if (y !== "---") {
      originalStacks[i].unshift(y);
    }
  });
});

function part1(args) {
  // deep copy
  const stacks = JSON.parse(JSON.stringify(args));
  let res = "";

  instructions.forEach((v) => {
    const count = Number(v[1]);
    const origin = Number(v[3]);
    const destination = Number(v[5]);

    const onCrane = stacks[origin - 1].splice(0, count);
    onCrane.forEach((v) => stacks[destination - 1].unshift(v));
  });

  stacks.forEach((v) => (res += v[0].replace(/[[\]]/g, "")));

  return res;
}

function part2(args) {
  // deep copy
  const stacks = JSON.parse(JSON.stringify(args));
  let res = "";

  instructions.forEach((v) => {
    const count = Number(v[1]);
    const origin = Number(v[3]);
    const destination = Number(v[5]);

    const onCrane = stacks[origin - 1].splice(0, count);
    // same order
    stacks[destination - 1].unshift(...onCrane);
  });

  stacks.forEach((v) => (res += v[0].replace(/[[\]]/g, "")));

  return res;
}

console.log(part1(originalStacks));
console.log(part2(originalStacks));
