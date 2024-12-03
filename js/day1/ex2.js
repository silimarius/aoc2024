import { readFile } from "node:fs/promises";

const rows = await readFile("./input.txt", "utf-8");

const [listA, listB] = rows.split("\n").reduce(
  ([accA, accB], row) => {
    const [left, right] = row.toString().split("   ");

    const leftInt = parseInt(left);
    const rightInt = parseInt(right);

    if (isNaN(leftInt) || isNaN(rightInt)) return [accA, accB];

    return [
      [...accA, leftInt],
      [...accB, rightInt],
    ];
  },
  [[], []]
);

const leftCount = new Map();
const rightCount = new Map();

listA.forEach((valA, i) => {
  const valB = listB[i];
  const countA = leftCount.get(valA) ?? 0;
  const countB = rightCount.get(valB) ?? 0;

  leftCount.set(valA, countA + 1);
  rightCount.set(valB, countB + 1);
});

let similarityScore = 0;

leftCount.forEach((cl, k) => {
  const cr = rightCount.get(k) ?? 0;
  const score = k * cr * cl;
  similarityScore += score;
});

console.log(similarityScore);
