type Tree = Record<string, any>;

enum Command {
  CD = "cd",
  UP = "..",
  LS = "ls",
}

enum FileType {
  DIR = "dir",
}

export const parseFileTree = (terminal: string[], tree: Tree = {}) => {
  for (let i = 0; i < terminal.length; i++) {
    const line = terminal[i];

    if (line.startsWith("$")) {
      // Terminal command
      const [_, command, dir] = line.split(" ");

      if (command === Command.CD) {
        if (dir === Command.UP) {
          return tree;
        }

        tree[dir] = parseFileTree(terminal.slice(i + 1));

        return tree;
      }
    } else {
      // Terminal output
      const [type, name] = line.split(" ");

      if (type === FileType.DIR) {
        tree[name] = {};
      } else {
        tree[name] = parseInt(type);
      }
    }
  }

  return tree;
};
