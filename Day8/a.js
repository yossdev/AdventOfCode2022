const { readFileSync } = require("fs");

const contents = readFileSync("./Day8/input.txt", "utf-8");

const arrOfContents = contents.split(/\r?\n/);

// first and last grid or the first and last rows automatically out cause on the edge
// first and last element of every sub array or the column automatically out cause on the edge

/*
  A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
  Only consider trees in the same row or column; that is,
  only look up, down, left, or right from any given tree.
*/

function part1() {
  const grid = [...arrOfContents];

  const visibleInTheEdgeRows = grid.length * 2 - 4;
  const visibleInTheEdgeColumn = grid[0].length * 2;

  let visibleInTheInterior = 0;

  let i = 1;
  const innerColumnEnd = grid.length - 2;

  // iterate rows
  while (i <= innerColumnEnd) {
    const row = grid[i];
    const innerRowEnd = row.length - 1;
    const inner = row.slice(1, innerRowEnd).split("");

    // Look left, right, up, down
    inner.forEach((e, j) => {
      const treeHeight = Number(e);

      const highestLeftTree = Math.max(...row.slice(0, j + 1).split(""));
      if (treeHeight > highestLeftTree) {
        visibleInTheInterior++;
        return;
      }

      const highestRightTree = Math.max(...row.slice(j + 2).split(""));
      if (treeHeight > highestRightTree) {
        visibleInTheInterior++;
        return;
      }

      const upTree = [];
      for (let k = 0; k < grid.length; k++) {
        if (upTree.length === i) break;
        upTree.push(grid[k][j + 1]);
      }

      const highestUpTree = Math.max(...upTree);
      if (treeHeight > highestUpTree) {
        visibleInTheInterior++;
        return;
      }

      const downTree = [];
      for (let k = i + 1; k < grid.length; k++) {
        downTree.push(grid[k][j + 1]);
      }

      const highestDownTree = Math.max(...downTree);
      if (treeHeight > highestDownTree) {
        visibleInTheInterior++;
        return;
      }
    });

    i++;
  }

  const totalTreesVisible =
    visibleInTheEdgeRows + visibleInTheEdgeColumn + visibleInTheInterior;

  console.log(totalTreesVisible);
}

function part2() {
  const grid = [...arrOfContents];

  let scenicScore = 0;
  const scenicScoreList = [];

  let i = 1;
  const innerColumnEnd = grid.length - 2;

  // iterate rows
  while (i <= innerColumnEnd) {
    const row = grid[i];
    const innerRowEnd = row.length - 1;
    const inner = row.slice(1, innerRowEnd).split("");

    // Look left, right, up, down
    inner.forEach((e, j) => {
      const treeHeight = Number(e);

      const leftRightUpDownTrees = [];

      const leftTree = row.slice(0, j + 1).split("");
      leftRightUpDownTrees.push(leftTree.reverse());

      const rightTree = row.slice(j + 2).split("");
      leftRightUpDownTrees.push(rightTree);

      const upTree = [];
      for (let k = 0; k < grid.length; k++) {
        if (upTree.length === i) break;
        upTree.unshift(grid[k][j + 1]);
      }
      leftRightUpDownTrees.push(upTree);

      const downTree = [];
      for (let k = i + 1; k < grid.length; k++) {
        downTree.push(grid[k][j + 1]);
      }
      leftRightUpDownTrees.push(downTree);

      leftRightUpDownTrees.forEach((arr) => {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
          if (treeHeight <= Number(arr[i])) {
            count++;
            break;
          }
          count++;
        }

        scenicScoreList.push(count);
      });

      const scenic = scenicScoreList.reduce((v, curr) => v * curr);
      if (scenic > scenicScore) {
        scenicScore = scenic;
      }

      scenicScoreList.length = 0;
    });

    i++;
  }

  console.log(scenicScore);
}

part1();
part2();
