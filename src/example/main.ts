export const calculateFinalFloor = (input: string) => {
  let floor = 0;
  let enteredBasement = 0;

  for (let i = 0; i < input.length; i++) {
    const c = input.charAt(i);

    if (c === "(") floor++;
    else if (c === ")") floor--;

    if (enteredBasement === 0 && floor === -1) {
      enteredBasement = i + 1;
    }
  }

  return { floor, enteredBasement };
};

const input = Deno.readTextFileSync("./src/example/input.txt");

export const runPart1 = () => {
  return calculateFinalFloor(input).floor;
};

export const runPart2 = () => {
  return calculateFinalFloor(input).enteredBasement;
};
