import { walkSync } from "https://deno.land/std/fs/mod.ts";
import { Day } from "../day.ts";

enum Command {
  CD = "cd",
  UP = "..",
  LS = "ls",
}

enum FileType {
  DIR = "dir",
}

const BASE_DIR = "./src/day07/output";
const MAX_SPACE = 70000000;
const DESIRED_FREE_SPACE = 30000000;

let startingDir = "";

export const createDirectoryStructure = (terminal: string[]) => {
  startingDir = Deno.cwd();

  try {
    Deno.removeSync(BASE_DIR, { recursive: true });
  } catch (error) {
    console.warn(error);
  }

  terminal.forEach((line) => {
    if (line.startsWith("$")) {
      // Terminal command
      const [_, command, dir] = line.split(" ");

      if (command === Command.CD) {
        if (dir === "/") {
          Deno.mkdirSync(BASE_DIR);
          Deno.chdir(BASE_DIR);
        } else if (dir === Command.UP) {
          Deno.chdir("../");
        } else {
          try {
            Deno.mkdirSync(dir);
          } catch (_err) {
            // Nop
          }

          Deno.chdir(dir);
        }
      }
    } else {
      // Terminal output
      const [type, name] = line.split(" ");

      if (type === FileType.DIR) {
        Deno.mkdirSync(name);
      } else {
        Deno.writeTextFileSync(name, type);
      }
    }
  });
};

const getDirectorySizes = () => {
  Deno.chdir(startingDir);

  const directorySizes: number[] = [];

  for (const e of walkSync(BASE_DIR)) {
    if (e.isDirectory) {
      let currentDirTotal = 0;

      for (const f of walkSync(e.path)) {
        if (f.isFile) {
          currentDirTotal += parseInt(Deno.readTextFileSync(f.path).toString());
        }
      }

      directorySizes.push(currentDirTotal);
    }
  }

  Deno.chdir(startingDir);

  return directorySizes;
};

export class Day7 extends Day {
  constructor(_input?: string) {
    super();

    const input = Deno.readTextFileSync("./src/day07/input.txt");
    createDirectoryStructure(
      (_input ?? input).split("\n").map((l) => l.trim()),
    );

    Deno.chdir(startingDir);
  }

  part1(): string | number | Promise<number> {
    const directorySizes = getDirectorySizes().sort((a, b) => a - b);

    let total = 0;

    for (let i = 0; i < directorySizes.length; i++) {
      if (directorySizes[i] <= 100000) {
        total += directorySizes[i];
      } else {
        break;
      }
    }

    return total;
  }

  part2(): string | number | Promise<number> {
    const directorySizes = getDirectorySizes().sort((a, b) => b - a);

    const toBeDeleted = DESIRED_FREE_SPACE - (MAX_SPACE - directorySizes[0]);

    const filtered = directorySizes.filter((d) => d >= toBeDeleted);

    return filtered[filtered.length - 1];
  }
}
