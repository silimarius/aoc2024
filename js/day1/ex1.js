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

listA.sort((a, b) => a - b);
listB.sort((a, b) => a - b);

const distances = listA.map((valA, i) => {
  const valB = listB[i];

  return Math.abs(valA - valB);
});

const totalDistance = distances.reduce((tot, dist) => tot + dist, 0);

console.log(totalDistance);
