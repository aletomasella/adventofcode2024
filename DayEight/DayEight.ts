import { readInput } from "../utils.ts";

const PATH_TO_DAY_EIGHT_TEST_INPUT = "./DayEight/DayEight.input.test.txt";
const PATH_TO_DAY_EIGHT_INPUT = "./DayEight/DayEight.input.txt";

const RESULT_DAY_EIGHT_PART_ONE_TEST = 14;
const RESULT_DAY_EIGHT_PART_TWO_TEST = 34;

const EMPTY = ".";

async function dayEightPartOne(path: string): Promise<number> {
  const data = await readInput(path);

  const matrix = data.split("\n").map((row) => row.split(""));

  const antenasMapper = new Map<string, [number, number][]>();

  const antinodes = new Map<string, [number, number][]>();

  // Mapping antenas
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      if (cell == EMPTY) continue;

      const antenas = antenasMapper.get(cell) || [];

      antenas.push([i, j]);

      antenasMapper.set(cell, antenas);
    }
  }

  // Generating antinodes
  for (const [key, value] of antenasMapper) {
    for (let i = 0; i < value.length; i++) {
      const [x, y] = value[i];

      for (let j = 0; j < value.length; j++) {
        if (i == j) continue;

        const [x2, y2] = value[j];

        // Antinode One (x*2 - x1, y*2 - y1)
        const antinode = antinodes.get(key) || [];
        antinode.push([x * 2 - x2, y * 2 - y2]);

        // Antinode Two (x2*2 - x2, y2*2 - y2)
        antinode.push([x2 * 2 - x, y2 * 2 - y]);

        antinodes.set(key, antinode);
      }
    }
  }

  // Cleaning out of bounds antinodes and duplicates
  const antinodesSet = new Set<string>();
  for (const [key, value] of antinodes) {
    // Cleaning out of bounds
    const cleaned = value.filter(([x, y]) => {
      return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
    });

    // Cleaning duplicates
    cleaned.forEach(([x, y]) => {
      antinodesSet.add(`${x},${y}`);
    });
  }

  let result = antinodesSet.size;

  return result;
}

async function dayEightPartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  const matrix = data.split("\n").map((row) => row.split(""));

  const antenasMapper = new Map<string, [number, number][]>();

  const antinodes = new Map<string, [number, number][]>();

  // Mapping antenas
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      if (cell == EMPTY) continue;

      const antenas = antenasMapper.get(cell) || [];

      antenas.push([i, j]);

      antenasMapper.set(cell, antenas);
    }
  }

  // Generating antinodes
  for (const [key, value] of antenasMapper) {
    for (let i = 0; i < value.length; i++) {
      const [x, y] = value[i];

      for (let j = 0; j < value.length; j++) {
        if (i == j) continue;

        const [x2, y2] = value[j];

        const offSetX = x - x2;
        const offSetY = y - y2;

        let calculatedX = x;
        let calculatedY = y;

        const antinode = antinodes.get(key) || [];

        // We now add all the antinodes in the direction of the offset until we reach the bounds of the matrix
        while (
          calculatedX >= 0 &&
          calculatedX < matrix.length &&
          calculatedY >= 0 &&
          calculatedY < matrix[0].length
        ) {
          antinode.push([calculatedX, calculatedY]);
          antinodes.set(key, antinode);

          calculatedX += offSetX;
          calculatedY += offSetY;
        }

        antinodes.set(key, antinode);
      }
    }
  }

  // Cleaning out of bounds antinodes and duplicates
  const antinodesSet = new Set<string>();
  for (const [key, value] of antinodes) {
    // Cleaning out of bounds
    const cleaned = value.filter(([x, y]) => {
      return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
    });

    // Cleaning duplicates
    cleaned.forEach(([x, y]) => {
      antinodesSet.add(`${x},${y}`);
    });
  }

  let result = antinodesSet.size;

  return result;
}

export {
  PATH_TO_DAY_EIGHT_INPUT,
  PATH_TO_DAY_EIGHT_TEST_INPUT,
  RESULT_DAY_EIGHT_PART_ONE_TEST,
  RESULT_DAY_EIGHT_PART_TWO_TEST,
  dayEightPartOne,
  dayEightPartTwo,
};
