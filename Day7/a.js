// find each dir total size
// dir total size = sum(every files it contains) directly or indirectly
// (Directories themselves do not count as having any intrinsic size.)

/* TODO Part 1
find all of the directories with a total size of at most 100000
then calculate the sum of their total sizes.
*/

/* TODO Part 2
Find the smallest directory that, if deleted,
would free up enough space on the filesystem to run the update.
What is the total size of that directory?
*/

const { readFileSync } = require("fs");

const contents = readFileSync("./Day7/input.txt", "utf-8");

const arrOfContents = contents.split(/\r?\n/);

function calcEachDirSize(obj) {
  const newObj = { ...obj };
  const newObjKeys = Object.keys(newObj).reverse();

  const eachDirSize = {};
  const indirectDir = {};

  // sum each dir size
  newObjKeys.forEach((key) => {
    const element = newObj[key];

    if (element.some((e) => e.includes("dir"))) {
      const dirList = element.map((v) =>
        v.includes("dir") ? key + "," + v.split(" ").at(-1) : v
      );

      indirectDir[key] = dirList;

      eachDirSize[key] = undefined;
      return;
    }

    const sum = element.reduce((a, b) => {
      return a + Number(b.split(" ")[0]);
    }, 0);

    eachDirSize[key] = sum;
  });

  while (
    Object.keys(eachDirSize).filter((v) => eachDirSize[v] === undefined)
      .length > 0
  ) {
    for (const key in indirectDir) {
      const el = indirectDir[key].sort();

      let sum = 0;

      for (const v of el) {
        if (v.includes("/")) {
          const size = eachDirSize[v];

          if (!size) {
            break;
          }

          sum += size;
        } else {
          sum += Number(v.split(" ")[0]);
        }
      }

      if (sum > 0) {
        eachDirSize[key] = sum;
      }
    }
  }

  return eachDirSize;
}

// build model
function part1() {
  const limitSize = 100000;
  const path = [];
  const list = [];

  const dirContent = {};

  let i = 0;

  while (i < arrOfContents.length) {
    const cmd = arrOfContents[i].includes("$")
      ? arrOfContents[i].split(" ")[1]
      : undefined;

    if (cmd === "cd") {
      if (arrOfContents[i].includes("..")) {
        path.pop();
      } else {
        path.push(arrOfContents[i].split(" ").at(-1));
      }
    }

    if (cmd === "ls") {
      list.length = 0;

      const key = path.reduce((v, c) => v + "," + c, "");

      for (let j = i + 1; j < arrOfContents.length; j++) {
        if (arrOfContents[j].includes("$")) {
          i = j - 1;
          break;
        }

        list.push(arrOfContents[j]);
      }

      if (!dirContent.hasOwnProperty(key)) {
        dirContent[key.toString()] = [...list];
      }
    }

    i++;
  }

  const eachDirSizeObj = calcEachDirSize(dirContent);

  const res = Object.keys(eachDirSizeObj)
    .filter((v) => eachDirSizeObj[v] <= limitSize)
    .reduce((a, b) => a + eachDirSizeObj[b], 0);

  return { eachDirSizeObj, res };
}

function part2(eachDirSizeObj) {
  const totalSpace = 70000000;
  const usedSpace = eachDirSizeObj[",/"];
  const unusedSpace = totalSpace - usedSpace;

  const requiredSpaceToUpdate = 30000000;

  const spaceNeedToRunUpdate = requiredSpaceToUpdate - unusedSpace;

  const keys = Object.keys(eachDirSizeObj);

  const res = keys
    .map((key) => eachDirSizeObj[key])
    .sort((a, b) => a - b)
    .find((v) => v >= spaceNeedToRunUpdate);

  return res;
}

const res1 = part1();
const res2 = part2(res1.eachDirSizeObj);

console.log("part1", res1.res);
console.log("part2", res2);
