/**
 * Problem 3
 * This problem is similar to problem 2, with one change, that we repetition is allowed.
 * Source: https://www.geeksforgeeks.org/coin-change-dp-7/
 *
 */

let arr = [];
let t = 0;
let n = 0;
let dp = [];

// test case 1
// arr = [1,2,3];
// t = 4;

// test case 2
arr = [2, 5, 3, 6];
t = 10;

//test case 3
// arr = [1,2,3,4,5,6,7,8];
// t = 8;

// test case 4
// arr = [2, 3, 5, 6, 8, 10];
// t = 10

n = arr.length;

let recursionSol = {
  fn(n, target) {
    if (target === 0) {
      // then we have found our subset
      return 1;
    }
    // if all the elements are exhausted
    if (n === 0) {
      return 0;
    }
    // there will not be a case where target will be less then 0 as we are
    // moving forward with the recursion only when the current element is less then target

    // if the current element is less then the target, then we have two choices
    // either pick or not pick
    if (arr[n - 1] <= target) {
      // either pick the element or not pick the element
      // here at the time of picking the element we are not going back one index
      return this.fn(n, target - arr[n - 1]) + this.fn(n - 1, target);
    } else {
      // we have only one choice to not pick the element
      return this.fn(n - 1, target);
    }
  },
};

dp = Array.from(Array(n), () => Array(t + 1));

let recursionWithMemo = {
  fn(n, target) {
    if (target == 0) {
      return 1;
    }
    if (n == 0) {
      return 0;
    }
    // every element of the dp store the solution to the sub problem
    if (dp[n - 1][target]) {
      return dp[n - 1][target];
    }
    if (arr[n - 1] <= target) {
      // either pick the element or not pick the element

      dp[n - 1][target] =
        this.fn(n, target - arr[n - 1]) + this.fn(n - 1, target);
      return dp[n - 1][target];
    } else {
      // we have only one choice to not pick the element
      dp[n - 1][target] = this.fn(n - 1, target);
      return dp[n - 1][target];
    }
  },
};

let dpSol = {
  fn(n, target) {
    dp = Array.from(Array(n + 1), () => Array(target + 1));
    // we have defined a 2d dp array, in this dp array each cell will represent solution to
    // a sub problem, which corresponds to a pair of index n and target.

    // we will start with target as 0, so an empty is only need
    for (let i = 0; i <= n; i++) {
      // first element for every row is true
      dp[i][0] = 1;
    }
    // other case will be of no elemets in the subset
    for (let j = 1; j <= target; j++) {
      dp[0][j] = 0;
    }
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= target; j++) {
        // j is the new target, arr[i] wants to join
        // in this we will stay in the same row, for the current
        // element with less target sum, what is the answer
        if (arr[i - 1] <= j) {
          // see the different over here we are not doing dp[i-1] in include
          dp[i][j] = dp[i][j - arr[i - 1]] + dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }

    return dp[n][target];
  },

  // we can further optimized this problem, instead of 2d array we can use 1d array
  // as we are referring to the same row in the case of picking and not picking values is already present
  fnOptimized(n, target) {
    // we have taken +1 as we want will take 0 as well
    // every element represents the ways in which we can make that target sum
    // in this we will modify the same array for each element, so in the end
    // we will have result of number of ways we can make target from 0-t with n elements
    dp = new Array(target + 1).fill(0);
    // for the target 0
    dp[0] = 1;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= target; j++) {
        if (arr[i] <= j) {
          // picking: dp[j-arr[i]] ways after picking the element
          // not picking: dp[j] if we don't pick the element
          dp[j] = dp[j] + dp[j - arr[i]];
        }
      }
    }

    return dp[target];
  },
};

// recursionSol.fn(n, t);
// recursionWithMemo.fn(n, t);
dpSol.fn(n, t);
