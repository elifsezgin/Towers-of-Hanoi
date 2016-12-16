const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  constructor() {
    this.stacks = [[1,2,3], [], []];
  }

  promptMove (callback) {
    reader.question('Your move:', res => {
      const from = parseInt(res[0]);
      const to = parseInt(res[2]);
      callback.call(this, from, to);

    });
  }

  isValidMove (startTowerIdx, endTowerIdx) {
    if (this.stacks[startTowerIdx].length === 0) {
      return false;
    } else if (this.stacks[startTowerIdx].slice(-1)[0] > this.stacks[endTowerIdx].slice(-1)[0]) {
      return false;
    } else {
      return true;
    }
  }

  move (startTowerIdx, endTowerIdx) {
    // console.log(startTowerIdx);
    // console.log(endTowerIdx);
    // console.log(this);
    // console.log(this.isValidMove(startTowerIdx, endTowerIdx));
    if (this.isValidMove(startTowerIdx, endTowerIdx) === true) {
      let change = this.stacks[startTowerIdx].shift();
      this.stacks[endTowerIdx].push(change);
      return true;
    } else {
      return false;
    }
  }

  print () {
    console.log(JSON.stringify(this.stacks));
  }

  isWon () {
    if (this.stacks[0] !== []) {
      return false;
    } else if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }

  run (completionCallback) {
    this.print();
    this.promptMove((from, to) => {
      this.move(from, to);
      if (this.isWon() === false) {
        this.run(completionCallback);
      } else {
        console.log('you win!');
        reader.close();
        completionCallback();
      }
    });

  }

}


const a = new Game();

a.run(function(){
  console.log('You won!');
});
