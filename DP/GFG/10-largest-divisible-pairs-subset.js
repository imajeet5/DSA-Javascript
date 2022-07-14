/**
 * In this problem we want to know the length of the longest subset in which each pair the smallest element divides the largest element
 * Source: https://www.geeksforgeeks.org/largest-divisible-pairs-subset/
 */

let tests = {
  arr1: [10, 5, 3, 15, 20],
  arr2: [18, 1, 3, 6, 13, 17],
};

let dp = [];

function dpSol(arr) {
  // first we will sort the array
  arr = [...arr].sort((a, b) => a - b);
  // 1,3,6,13,17,18
  // we will create a dp array of size of the array, each element in the dp array corresponds to the largest length of the subset upto that index. As we are starting from the end, for each new element that is added to the array, we will compare will every other element and check if it is dividing any of the exising element, if it is then we take the valued at that and add to our result
  let n = arr.length;
  dp = new Array(n);
  // with only one element present in the subset the length of the subset is 1
  dp[n - 1] = 1;
  let result = 0;

  for (let i = n - 2; i >= 0; i--) {
    let maxlen = 0;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] % arr[i] === 0 || arr[i] % arr[j] === 0) {
        maxlen = Math.max(maxlen, dp[j]);
      }
      dp[i] = 1 + maxlen;
      result = Math.max(result, dp[i]);
    }
  }

  return result;
}
