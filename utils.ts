import { readFile } from "fs/promises";

async function readInput(path: string): Promise<string> {
  try {
    return await readFile(path, "utf-8");
  } catch (error) {
    console.error(error);
    return "";
  }
}

export { readInput };
