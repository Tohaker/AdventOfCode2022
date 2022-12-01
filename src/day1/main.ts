export const sumCalories = (rations: number[]) =>
  rations.reduce((acc, n) => acc + n, 0);

export const runPart1 = (input: string) => {
  const lines = input.split("\n");

  const backpacks: number[][] = [];
  let currentBackpack: number[] = [];

  lines.forEach((v) => {
    if (v === "") {
      backpacks.push(currentBackpack);
      currentBackpack = [];
    } else {
      currentBackpack.push(parseInt(v));
    }
  });

  return backpacks.map(sumCalories).sort((a, b) => b - a)[0];
};

export const runPart2 = (input: string) => {
  const lines = input.split("\n");

  const backpacks: number[][] = [];
  let currentBackpack: number[] = [];

  lines.forEach((v, i) => {
    if (v === "") {
      backpacks.push(currentBackpack);
      currentBackpack = [];
    } else {
      currentBackpack.push(parseInt(v));
    }

    if (i === lines.length - 1) {
      backpacks.push(currentBackpack);
    }
  });

  return sumCalories(
    backpacks
      .map(sumCalories)
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
};

export const part1 = () => {
  const input = Deno.readTextFileSync("./src/day1/input.txt");

  return runPart1(input);
};

export const part2 = () => {
  const input = Deno.readTextFileSync("./src/day1/input.txt");

  return runPart2(input);
};
