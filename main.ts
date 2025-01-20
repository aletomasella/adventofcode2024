import {
  dayOnePartOne,
  PATH_TO_DAY_ONE_INPUT,
  dayOnePartTwo,
} from "./DayOne/DayOne.ts";

function printResult(day: number, part: number, result: string) {
  console.log(`Day ${day} - Part ${part}: ${result}`);
}

async function main() {
  printResult(1, 1, (await dayOnePartOne(PATH_TO_DAY_ONE_INPUT)).toString());
  printResult(1, 2, (await dayOnePartTwo(PATH_TO_DAY_ONE_INPUT)).toString());
}

await main();
