/**
 * Source: https://www.geeksforgeeks.org/binomial-coefficient-dp-9/
 * A binomial coefficient gives number of ways, disregarding the order, that k objects can be chosen from among n objects.
 */

// this is based on the relation C(n, r) = C(n-1, k-1) + C(n-1, k);

let dp;
let recursiveSol = {
  fn(n, k) {
    // edge case, as k cannot be greater than n
    if (k > n) {
      return 0;
    }

    // base case
    if (k === 0 || k === n - 1) {
      return 1;
    }

    return this.fn(n - 1, k - 1) + this.fn(n - 1, k);
  },
};

let recursiveMemo = {
  fn(n, k) {
    if (k > n) {
      return 0;
    }

    // base case
    if (k === 0 || k === n) {
      return 1;
    }

    if (dp[n][k]) return dp[n][k];

    dp[n][k] = this.fn(n - 1, k - 1) + this.fn(n - 1, k);
    return dp[n][k];
  },
  compute(n, k) {
    dp = Array.from(Array(n + 1), () => Array(k + 1));
    return this.fn(n, k);
  },
};

let dpSol = {
  fn(n, k) {
    dp = Array.from(Array(n + 1), () => Array(k + 1));
    // we will start filling all the entries from 0C0, 1C0, 1C1, 2C0, 2C1, 2C2
    for (let i = 0; i <= n; i++) {
      // here we will take min of i or k, we can take upto i also but we don;t need un-necessary results
      for (let j = 0; j <= Math.min(i, k); j++) {
        if (j === 0 || j === i) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        }
      }
    }

    return dp[n][k];
  },
};

// we can further space optimize the dp solution by taking a 1d array, instead of a 2d array.
// As the relation that we are using is C(n, r) = C(n-1, k-1) + C(n-1, k);   n-1 corresponds to the previous array
// so we will store the current result in the array and then use it again as previous result to calculate the current result
let dpSolOptimized = {
  fn(n, k) {
    // we will take dp array of size k
    // Suppose we want to find 5C3
    // 1C0 , 1C1
    // 2C0, 2C1, 2C2
    // 3C0, 3C1, 3C2, 3C3,
    //...
    dp = Array(k + 1);
    // initialize every element of the dp array as 0
    dp.fill(0);
    dp[0] = 1; // as for every element 0 binomial is 1
    // now start iterating over
    for (let i = 1; i <= n; i++) {
      // we will start filling the array from the back
      for (let j = Math.min(i, k); j > 0; j--) {
        // new update value of the current element
        dp[j] = dp[j - 1] + dp[j];
      }
    }
    return dp[k];
  },
};
