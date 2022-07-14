/**
 * This problem is similar to unbounded knapsack or coin change
 * Source: https://www.geeksforgeeks.org/cutting-a-rod-dp-13/
 *
 */

let tests = [
  //   0 1 2 3 4  5   6  7
  [1, 5, 8, 9, 10, 17, 17, 20],
];

let dp;

let recursionSol = {
  fn(i, target, arr) {
    // base case
    if (i === 0) {
      // when we will reach the index 0, so whatever the target left we have number of rods equal to target
      return target * arr[0];
    }

    let currRodLength = i + 1;
    if (currRodLength <= target) {
      // we have two choice, either pick ro not pick
      // notice here as repeatation is allowed are not not moving from the current index
      let picked = arr[i] + this.fn(i, target - currRodLength, arr);
      // in the case we will skip the current element, then target will remain the same
      let notpicked = this.fn(i - 1, target, arr);
      // result will be max of the two
      return Math.max(picked, notpicked);
    } else {
      // we have to ignore the current element as it cannot be picked being greater than target
      return this.fn(i - 1, target, arr);
    }
  },

  compute(arr) {
    let target = arr.length;
    // target, that we want to make
    let i = target - 1; // this is the index from which we want to start
    return this.fn(i, target, arr);
  },
};

let recursionMemo = {
  fn(i, target, arr) {
    // base case
    if (i === 0) {
      // when we will reach the index 0, so whatever the target left we have number of rods equal to target
      return target * arr[0];
    }

    if (dp[i][target]) return dp[i][target];

    let currRodLength = i + 1;
    if (currRodLength <= target) {
      // we have two choice, either pick ro not pick
      // notice here as repeatation is allowed are not not moving from the current index
      let picked = arr[i] + this.fn(i, target - currRodLength, arr);
      // in the case we will skip the current element, then target will remain the same
      let notpicked = this.fn(i - 1, target, arr);
      // result will be max of the two
      dp[i][targe] = Math.max(picked, notpicked);
      return dp[i][target];
    } else {
      // we have to ignore the current element as it cannot be picked being greater than target
      dp[i][target] = this.fn(i - 1, target, arr);
      return dp[i][target];
    }
  },

  compute(arr) {
    let target = arr.length;
    // target, that we want to make
    let i = target - 1; // this is the index from which we want to start
    dp = Array.from(Array(i), () => Array(target + 1));
    return this.fn(i, target, arr);
  },
};

let dpSol = {
  fn(arr) {
    let n = arr.length;
    // say array length is 8; target = 8;
    // index are from 0 to 7
    // rod length target are from 0 to 8
    // dp[i][j]; i => index and j => represents the target rod length
    dp = Array.from(Array(n), () => Array(n + 1).fill(0));
    // now when i = 0; i.e rod of length i we will store the values
    for (let rodLen = 0; rodLen < n; rodLen++) {
      dp[0][rodLen] = rodLen * arr[0];
    }

    // this loop  will run for index 1 to 7
    // we will start from 1 as we have already coved the case with index on 0
    for (let i = 1; i < n; i++) {
      for (let j = 0; j <= n; j++) {
        let rodLength = i + 1;
        if (rodLength <= j) {
          let pick = arr[i] + dp[i][j - rodLength];
          let notpick = dp[i - 1][j];
          dp[i][j] = Math.max(pick, notpick);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  },
};


/** 
 * in the array dp represent the current row in which we are doing the operations except for the case before rodLen <= j
 */

let dpSolOptimized = {
  // instead of taking a 2d array, we can use 1d array as well.
  // We will modify the 1d array on the go. As we need the prev value for not pick case
  fn(arr) {
    let n = arr.length;
    // if array length = 8; Then this array will go from 0 to 8
    dp = Array(n + 1).fill(0);
    // filling the first row for i =0;
    for (let i = 0; i <= n; i++) {
      dp[i] = i * arr[0];
    }

    // now we will start filling from second row onwards
    for (let i = 1; i < n; i++) {
      for (let j = 0; j <= n; j++) {
        // as we are storing the prv value in dp[j]
        let notpicked = 0 + dp[j];
        let picked = Number.MIN_SAFE_INTEGER;
        let rodLen = i + 1;
        if (rodLen <= j) {
          picked = arr[i] + dp[j - rodLen];
        }

        dp[j] = Math.max(picked, notpicked);
      }
    }

    return dp[n];
  },
};
