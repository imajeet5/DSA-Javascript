/**
 * Source: https://www.geeksforgeeks.org/friends-pairing-problem/
 * The main logic in the problem to figure our the recurrence relation.
 * for nth element either it can be single, in which case number of ways for are 1*fn(n-1)
 * otherwise it can make pair with any of the remaining elements (n-1) possible pairs, number of ways (n-1)*fn(n-2)
 */

let recursionSol = {
  countFriends(n) {
    if (n <= 2) {
      return n;
    }

    return this.countFriends(n - 1) + (n - 1) * this.countFriends(n - 2);
  },
};

let recursionWithMemo = {
  dp: Array(100),
  countFriends(n) {
    if (n <= 2) {
      return n;
    }
    if (this.dp[n]) {
      return this.dp[n];
    }

    this.dp[n] = this.countFriends(n - 1) + (n - 1) * this.countFriends(n - 2);
    return this.dp[n];
  },
};

let dpSol = {
  countFriends(n) {
    let dp = [n + 1];
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + (i - 1) * dp[i - 2];
    }

    return dp[n];
  },
};

/**
 * This above solution will not work for the large integer values, in that case we have to make use of big int
 * This solution is very important as it show how can we use Bigint to handle large integers in javascript
 */

let dpSolLargeValues = {
  countFriends(n) {
    //code here
    let dp = [0n];
    dp.push(1n);
    dp[2] = 2n;
    dp[3] = 4n;
    for (let i = 4; i <= n; i++) {
      dp[i] = dp[i - 1] + BigInt(i - 1) * dp[i - 2];
    }
    return Number(dp[n] % 1000000007n);
  },
};
