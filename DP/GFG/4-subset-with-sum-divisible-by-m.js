/**
 * In this problem, we have to determine if there exist a subset whose sum is divisible by 6
 * Source: https://www.geeksforgeeks.org/subset-sum-divisible-m/
 *
 */

//first a program to print the sum of all the subsets

let arr = [];
let dp = [];
let m;

// test case 1
// arr = [1, 2, 3];

// test case 2
// arr = [3, 1, 7, 5];
// m = 6;
//test case 3
arr = [11, 13, 12, 8, 13];
m - 14;

let n = arr.length;

let printSubsetsSum = {
  fn(n, sum = 0) {
    if (n === 0) {
      console.log(sum);
      return;
    }
    // picking the element
    this.fn(n - 1, sum + arr[n - 1]);
    // not picking the element
    this.fn(n - 1, sum);
  },
};

let recursiveSol = {
  fn(n, m, sum = 0) {
    if (n === 0)
      if (sum && sum % m === 0) return true;
      else return false;

    return this.fn(n - 1, m, sum + arr[n - 1]) || this.fn(n - 1, m, sum);
  },
};

// we can optimize this using tabulation and storing the result
// for a particular pair of sum and n, will will have same result.
// in fact it represent

let recursiveMemo = {
  dp: [],
  fn(n, m, sum = 0) {
    if (n === 0)
      if (sum && sum % m === 0) return true;
      else return false;
    if (this.dp[n][sum]) return this.dp[n][sum];

    return (dp[n][sum] =
      this.fn(n - 1, m, sum + arr[n - 1]) || this.fn(n - 1, m, sum));
  },
  compute(n, m) {
    // we will create a 2d dp with rows as n and cols as max sum of dp
    // sum and n combine represent a sub problem
    let maxSum = arr.reduce((acc, curr) => acc + curr, 0);
    this.dp = Array.from(Array(n), () => Array(maxSum + 1));
  },
};
