import { readInput } from "../utils.ts";

const PATH_TO_DAY_SIX_TEST_INPUT = "./DaySix/DaySix.input.test.txt";
const PATH_TO_DAY_SIX_INPUT = "./DaySix/DaySix.input.txt";

const RESULT_DAY_SIX_PART_ONE_TEST = 41;
const RESULT_DAY_SIX_PART_TWO_TEST = 0;

const GUARD_POSIBLE_CHARS = {
  "^": "UP",
  v: "DOWN",
  ">": "RIGHT",
  "<": "LEFT",
} as const;

type GuardPosibleChars = keyof typeof GUARD_POSIBLE_CHARS;

type GuardPosibleDirections =
  (typeof GUARD_POSIBLE_CHARS)[keyof typeof GUARD_POSIBLE_CHARS];

const OBSTACLE_CHAR = "#";

function turnRight(currentGuard: GuardPosibleChars): GuardPosibleChars {
  switch (currentGuard) {
    case "^":
      return ">";
    case ">":
      return "v";
    case "v":
      return "<";
    case "<":
      return "^";
  }
}

function moveGuard({
  startPoint,
  startingDirection,
  matrix,
  currentGuard,
  visited,
}: {
  startPoint: [number, number];
  startingDirection: GuardPosibleDirections;
  currentGuard: GuardPosibleChars;
  matrix: string[][];
  visited: boolean[][];
}): number {
  let [x, y] = startPoint;
  let currentDirection = startingDirection;

  let moveCounter = 0;

  let beforeX = x;
  let beforeY = y;

  // While the guard doesn't reach the end of the maze
  while (matrix[x] !== undefined && matrix[x][y] !== undefined) {
    const currentChar = matrix[x][y];

    // If the guard faces an obstacle
    if (currentChar === OBSTACLE_CHAR) {
      // Turn right 90 degrees
      currentGuard = turnRight(currentGuard);
      currentDirection = GUARD_POSIBLE_CHARS[currentGuard];
      x = beforeX;
      y = beforeY;
      console.log("Turn right", currentGuard, currentDirection);
    } else if (!visited[x][y]) {
      visited[x][y] = true;
      moveCounter++;
    }

    beforeX = x;
    beforeY = y;

    // Move the guard in the current direction
    switch (currentDirection) {
      case "UP":
        x--;
        break;
      case "DOWN":
        x++;
        break;
      case "RIGHT":
        y++;
        break;
      case "LEFT":
        y--;
        break;
    }
  }

  // console.log(visited.map((row) => row.map((cell) => (cell ? "X" : "."))));

  console.log("Guard reached the end of the maze");

  return moveCounter;
}

async function daySixPartOne(path: string): Promise<number> {
  const data = await readInput(path);

  // We need to count all possible paths from the start to the end until the guard can leave the maze taking into account two possible scenarios:
  // - The guard can only move in the direction of the arrow
  // - If it faces an obstacle, it can only turn right 90 degrees and continue moving in the direction of the arrow
  const matrix = data.split("\n").map((row) => row.split(""));

  // Matrix to check already visited cells
  const visited: boolean[][] = matrix.map((row) => row.map(() => false));

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const char = matrix[row][col];

      if (char === OBSTACLE_CHAR) {
        continue;
      }

      if (char in GUARD_POSIBLE_CHARS) {
        const direction = GUARD_POSIBLE_CHARS[char as GuardPosibleChars];
        return moveGuard({
          startPoint: [row, col],
          startingDirection: direction,
          currentGuard: char as GuardPosibleChars,
          matrix,
          visited,
        });
      }
    }
  }

  return -1;
}

async function daySixPartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  let result = 0;

  return result;
}

export {
  PATH_TO_DAY_SIX_INPUT,
  PATH_TO_DAY_SIX_TEST_INPUT,
  RESULT_DAY_SIX_PART_ONE_TEST,
  RESULT_DAY_SIX_PART_TWO_TEST,
  daySixPartOne,
  daySixPartTwo,
};
