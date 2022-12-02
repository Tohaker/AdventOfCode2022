enum Opponent {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C",
}

enum Player {
  ROCK = "X",
  PAPER = "Y",
  SCISSORS = "Z",
}

enum PlayerScore {
  ROCK = 1,
  PAPER,
  SCISSORS,
}

enum Outcome {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

enum Expectation {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}

export const calculateScore = (game: string) => {
  const opp = game.trim().charAt(0);
  const pla = game.trim().charAt(2);

  if (opp === Opponent.ROCK) {
    if (pla === Player.ROCK) {
      return PlayerScore.ROCK + Outcome.DRAW;
    } else if (pla === Player.PAPER) {
      return PlayerScore.PAPER + Outcome.WIN;
    } else {
      return PlayerScore.SCISSORS + Outcome.LOSE;
    }
  } else if (opp === Opponent.PAPER) {
    if (pla === Player.ROCK) {
      return PlayerScore.ROCK + Outcome.LOSE;
    } else if (pla === Player.PAPER) {
      return PlayerScore.PAPER + Outcome.DRAW;
    } else {
      return PlayerScore.SCISSORS + Outcome.WIN;
    }
  } else {
    if (pla === Player.ROCK) {
      return PlayerScore.ROCK + Outcome.WIN;
    } else if (pla === Player.PAPER) {
      return PlayerScore.PAPER + Outcome.LOSE;
    } else {
      return PlayerScore.SCISSORS + Outcome.DRAW;
    }
  }
};

export const calculateStrategy = (game: string) => {
  const opp = game.trim().charAt(0);
  const pla = game.trim().charAt(2);

  if (opp === Opponent.ROCK) {
    if (pla === Expectation.WIN) {
      return PlayerScore.PAPER + Outcome.WIN;
    } else if (pla === Expectation.DRAW) {
      return PlayerScore.ROCK + Outcome.DRAW;
    } else {
      return PlayerScore.SCISSORS + Outcome.LOSE;
    }
  } else if (opp === Opponent.PAPER) {
    if (pla === Expectation.WIN) {
      return PlayerScore.SCISSORS + Outcome.WIN;
    } else if (pla === Expectation.DRAW) {
      return PlayerScore.PAPER + Outcome.DRAW;
    } else {
      return PlayerScore.ROCK + Outcome.LOSE;
    }
  } else {
    if (pla === Expectation.WIN) {
      return PlayerScore.ROCK + Outcome.WIN;
    } else if (pla === Expectation.DRAW) {
      return PlayerScore.SCISSORS + Outcome.DRAW;
    } else {
      return PlayerScore.PAPER + Outcome.LOSE;
    }
  }
};

export const runPart1 = (input: string) =>
  input.split("\n").reduce((acc, l) => acc + calculateScore(l), 0);

export const runPart2 = (input: string) =>
  input.split("\n").reduce((acc, l) => acc + calculateStrategy(l), 0);
