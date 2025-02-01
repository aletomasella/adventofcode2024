import { readInput } from "../utils.ts";

const PATH_TO_DAY_SIX_TEST_INPUT = "./DaySix/DaySix.input.test.txt";
const PATH_TO_DAY_SIX_INPUT = "./DaySix/DaySix.input.txt";

const RESULT_DAY_SIX_PART_ONE_TEST = 41;
const RESULT_DAY_SIX_PART_TWO_TEST = 6;

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

  console.log("Guard reached the end of the maze");

  return moveCounter;
}

function moveGuardTwo({
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
  visited: number[][];
}): boolean {
  let [x, y] = startPoint;
  let currentDirection = startingDirection;

  let moveCounter = 0;

  // This is kind of a hacky way to prevent infinite loops
  // It got me the correct anwer but the best way should be to check if the guard is trapped in a loop
  // You can check if the guard is trapped in a loop by checking if the guard is visiting the same cell multiple times
  // For that u can to store the path the guard is taking and check if the guard is visiting the same cell multiple times
  const MAX_NUMBERS_OF_MOVES = 1_000_000;

  const MAX_NUMBER_OF_VISITS = 2;

  let moves = 0;

  let beforeX = x;
  let beforeY = y;

  // While the guard doesn't reach the end of the maze
  while (
    matrix[x] !== undefined &&
    matrix[x][y] !== undefined &&
    moves < MAX_NUMBERS_OF_MOVES
  ) {
    const currentChar = matrix[x][y];

    moves++;

    // If the guard faces an obstacle
    if (currentChar === OBSTACLE_CHAR) {
      // Turn right 90 degrees
      currentGuard = turnRight(currentGuard);
      currentDirection = GUARD_POSIBLE_CHARS[currentGuard];
      x = beforeX;
      y = beforeY;
    } else if (!visited[x][y]) {
      visited[x][y] = visited[x][y] + 1;
      if (visited[x][y] > MAX_NUMBER_OF_VISITS) {
        return false;
      }
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

  return moves < MAX_NUMBERS_OF_MOVES;
}

function addObstacles(
  matrix: string[][],
  obstaclePosition: [number, number]
): string[][] {
  const newMatrix = matrix.map((row) => row.map((cell) => cell));
  const [x, y] = obstaclePosition;
  newMatrix[x][y] = OBSTACLE_CHAR;
  return newMatrix;
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

  // We need to count all possible paths from the start to the end until the guard can leave the maze taking into account two possible scenarios:
  // - The guard can only move in the direction of the arrow
  // - If it faces an obstacle, it can only turn right 90 degrees and continue moving in the direction of the arrow
  const matrix = data.split("\n").map((row) => row.split(""));

  // Matrix to check already visited cells
  const visited: number[][] = matrix.map((row) => row.map(() => 0));

  let guardStartingPoint: [number, number] | null = null;

  let result = 0;

  // We first need to find the starting point of the guard
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const char = matrix[row][col];

      if (char === OBSTACLE_CHAR) {
        continue;
      }

      if (char in GUARD_POSIBLE_CHARS) {
        guardStartingPoint = [row, col];
        break;
      }
    }
  }

  // We don't have a guard in the maze
  if (guardStartingPoint === null) return -1;

  const guardChar = matrix[guardStartingPoint[0]][guardStartingPoint[1]];

  // We loop again to add obstacles to the matrix preventing the guard from leaving the maze
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const char = matrix[row][col];

      // If the cell is an obstacle or the guard, we skip it
      if (char === OBSTACLE_CHAR || char in GUARD_POSIBLE_CHARS) {
        continue;
      }

      // We add the obstacle to the matrix
      const newMatrix = addObstacles(matrix, [row, col]);

      // Now we need to check if the guard can leave the maze or is trapped
      const direction = GUARD_POSIBLE_CHARS[guardChar as GuardPosibleChars];
      const couldEscape = moveGuardTwo({
        startPoint: guardStartingPoint,
        startingDirection: direction,
        currentGuard: guardChar as GuardPosibleChars,
        matrix: newMatrix,
        visited,
      });

      if (!couldEscape) result++;
    }
  }

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
