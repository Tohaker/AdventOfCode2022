export const sumCalories = (rations: number[]) =>
  rations.reduce((acc, n) => acc + n, 0);
