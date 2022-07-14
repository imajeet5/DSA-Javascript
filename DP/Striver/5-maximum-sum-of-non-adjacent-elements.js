/**
 * Source: https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/
 * https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/
 *
 */

tests = [[5, 5, 10, 100, 10, 5]];

let dp = [];

let recursiveSol = {
  fn(arr, n) {
    if (n < 0) {
      return 0;
    }

    let pick = arr[n] + this.fn(arr, n - 2);
    let notpick = 0 + this.fn(arr, n - 1);
    return Math.max(pick, notpick);
  },

  solve(arr) {
    let n = arr.length - 1;
    return this.fn(arr, n);
  },
};

let recursiveMemo = {
  fn(arr, n) {
    if (n < 0) {
      return 0;
    }
    if (dp[n]) return dp[n];

    let pick = arr[n] + this.fn(arr, n - 2);
    let notpick = 0 + this.fn(arr, n - 1);
    return (dp[n] = Math.max(pick, notpick));
  },

  solve(arr) {
    let n = arr.length - 1;
    dp = Array(n + 1);
    return this.fn(arr, n);
  },
};

let dpSol = {
  solve(arr) {
    let n = arr.length;
    let dp = Array(n);
    dp[0] = arr[0];
    dp[1] = Math.max(arr[1], arr[0]);
    for (let i = 2; i < n; i++) {
      dp[i] = Math.max(arr[i] + dp[i - 2], dp[i - 1]);
    }
    return dp[n - 1];
  },
};
