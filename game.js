const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  constructor() {
    this.stacks = [[1,2,3], [], []];
  }

}

Game.prototype.promptMove = function () {
  console.log(this.stacks);

  reader.question('Your move:', res => {
    const from = parseInt(res[0]);
    const to = parseInt(res[2]);
    return [from, to]

    reader.close();
  });
};

Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  if (this.stacks[startTowerIdx].length === 0) {
    return false;
  } else if (this.stacks[startTowerIdx][this.stacks.length - 1] > this.stacks[endTowerIdx][this.stacks.length - 1]) {
    return false;
  } else {
    return true;
  }
};

Game.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    let change = this.stacks[startTowerIdx].shift();
    this.stacks[endTowerIdx].push(change);
    console.log(this.stacks);
    return true;
  } else {
    return false;
  }
};
const a = new Game();
a.move(0,1);
