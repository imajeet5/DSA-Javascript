/**
 * This is a recursion and memoization problem
 * Source: https://www.geeksforgeeks.org/game-theory-choice-area/
 */

let dp;

class Area {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

let Sol = {
  memo: new Map(),
  fn(A, B, X, Y, Z, last) {
    if (A <= 0 || B <= 0) {
      return 0;
    }

    let maxTime = 0;
    // now based on the last position he was on we have three choices
    // if he was on the tile X
    if (last === 'X') {
      // then we can move to Y and Z, adding +1 for the current tile
      maxTime =
        1 +
        Math.max(
          this.fn(A + Y.a, B + Y.b, X, Y, Z, 'Y'),
          this.fn(A + Z.a, B + Z.b, X, Y, Z, 'Z')
        );
    } else if (last === 'Y') {
      // then we can move to X and Z
      maxTime =
        1 +
        Math.max(
          this.fn(A + X.a, B + X.b, X, Y, Z, 'X'),
          this.fn(A + Z.a, B + Z.b, X, Y, Z, 'Z')
        );
    } else if (last === 'Z') {
      // then we can move to X and Y
      maxTime =
        1 +
        Math.max(
          this.fn(A + X.a, B + X.b, X, Y, Z, 'X'),
          this.fn(A + Y.a, B + Y.b, X, Y, Z, 'Y')
        );
    }

    return maxTime;
  },

  fnMemo(A, B, X, Y, Z, last) {
    if (A <= 0 || B <= 0) {
      return 0;
    }

    let maxTime = 0;
    // now based on the last position he was on we have three choices
    // if he was on the tile X
    if (this.memo.get(A + '-' + B)) {
      return this.memo.get(A + '-' + B);
    }

    if (last === 'X') {
      // then we can move to Y and Z, adding +1 for the current tile
      maxTime =
        1 +
        Math.max(
          this.fnMemo(A + Y.a, B + Y.b, X, Y, Z, 'Y'),
          this.fnMemo(A + Z.a, B + Z.b, X, Y, Z, 'Z')
        );
    } else if (last === 'Y') {
      // then we can move to X and Z
      maxTime =
        1 +
        Math.max(
          this.fnMemo(A + X.a, B + X.b, X, Y, Z, 'X'),
          this.fnMemo(A + Z.a, B + Z.b, X, Y, Z, 'Z')
        );
    } else if (last === 'Z') {
      // then we can move to X and Y
      maxTime =
        1 +
        Math.max(
          this.fnMemo(A + X.a, B + X.b, X, Y, Z, 'X'),
          this.fnMemo(A + Y.a, B + Y.b, X, Y, Z, 'Y')
        );
    }

    // for particular values of A and B result will be same
    this.memo.set(A + '-' + B, maxTime);

    return maxTime;
  },

  getMaxSurvivalTime(A, B, X, Y, Z) {
    if (A <= 0 || B <= 0) {
      return 0;
    }

    // we can start from any of the three tiles
    return Math.max(
      this.fn(A + X.a, B + X.b, X, Y, Z, 'X'),
      this.fn(A + Y.a, B + Y.b, X, Y, Z, 'Y'),
      this.fn(A + Z.a, B + Z.b, X, Y, Z, 'Z')
    );
  },

  getMaxSurvivalTimeMemo(A, B, X, Y, Z) {
    if (A <= 0 || B <= 0) {
      return 0;
    }
    this.memo = new Map();

    // we can start from any of the three tiles
    return Math.max(
      this.fnMemo(A + X.a, B + X.b, X, Y, Z, 'X'),
      this.fnMemo(A + Y.a, B + Y.b, X, Y, Z, 'Y'),
      this.fnMemo(A + Z.a, B + Z.b, X, Y, Z, 'Z')
    );
  },
};

let A = 20;
let B = 8;
let X = new Area(3, 2);
let Y = new Area(-5, -10);
let Z = new Area(-20, 5);

// let result = Sol.getMaxSurvivalTime(A, B, X, Y, Z);
// console.log(result)
