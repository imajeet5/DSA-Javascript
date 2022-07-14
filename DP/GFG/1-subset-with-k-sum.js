/**
 * Problem 1
 * Source: https://www.geeksforgeeks.org/subset-sum-problem-dp-25/
 * In this problem we have to give if  there any subset exist whose sum is equal to k.
 *
 */

let arr = [];
let t = 0;
let n = 0;
let dp = [];

// test case 1
// arr = [1,2,3,4];
// t = 6;

// test case 2
// arr = [3, 34, 4, 12, 5, 2];
// t = 9;

//test case 3
// arr = [3,34,4,12,5,2];
// t = 30;

// test case 4
arr = [3, 4, 5, 2];
t = 6;

n = arr.length;

let recursionSol = {
  fn(n, target) {
    if (target == 0) {
      // then we have found our subset
      return 1;
    }
    // if all the elements are exhausted
    if (n == 0) {
      return 0;
    }
    // there will not be a case where target will be less then 0 as we are
    // moving forward with the recursion only when the current element is less then target

    // if the current element is less then the target, then we have two choices
    // either pick or not pick
    if (arr[n - 1] <= target) {
      // either pick the element or not pick the element
      return this.fn(n - 1, target - arr[n - 1]) || this.fn(n - 1, target);
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
      return dp[n-1][target];
    }
    if (arr[n - 1] <= target) {
      // either pick the element or not pick the element

      dp[n - 1][target] =
        this.fn(n - 1, target - arr[n - 1]) || this.fn(n - 1, target);
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
      dp[i][0] = true;
    }
    // other case will be of no elemets in the subset
    for (let j = 1; j <= target; j++) {
      dp[0][j] = false;
    }
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= target; j++) {
        // j is the new target, arr[i] wants to join
        if (arr[i - 1] <= j) {
          dp[i][j] = dp[i - 1][j - arr[i - 1]] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }

    return dp[n][target];
  },
};

// recursionSol.fn(n, t);
// recursionWithMemo.fn(n, t);
dpSol.fn(n, t);
