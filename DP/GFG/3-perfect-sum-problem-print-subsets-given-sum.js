/**
 * In this problem we need to print all the subsets with a given target sum
 *
 */

let tests = [
  {
    arr: [2, 3, 5, 6, 8, 10],
    sum: 10,
  },
];

let recursiveSol = {
  result: [],
  fn(arr, n, sum = 0, curr = []) {
    // base case
    if (sum === 0) {
      this.result.push([...curr]);
      return;
    }
    if (n === 0) {
      return;
    }

    // if the current element is less then the sum, there we have two options
    if (arr[n - 1] <= sum) {
      // picking the current element
      curr.push(arr[n - 1]);
      this.fn(arr, n - 1, sum - arr[n - 1], curr);
      // not pick the current element
      curr.pop();
      this.fn(arr, n - 1, sum, curr);
    } else {
      // we have no choice but to skip the current element
      this.fn(arr, n - 1, sum, curr);
    }
  },

  compute(arr, sum) {
    this.result = [];
    this.fn(arr, arr.length, sum, []);
    console.log(this.result);
  },
};
