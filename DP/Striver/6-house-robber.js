/**
 * The difference between this and the previous question is that, in this array is circular
 * So the last and first house are adjacent to each other.
 * Source: https://leetcode.com/problems/house-robber-ii/
 * Source: https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6/
 *
 */

let dp = [];
function maxAdjSum(arr) {
    let n = arr.length;
    let dp = Array(n);
    dp[0] = arr[0];
    dp[1] = Math.max(arr[1], arr[0]);
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(arr[i] + dp[i - 2], dp[i - 1]);
    }
    return dp[n - 1];
}

// In this problem there are two cases
//1. Either we take the first element,then we cannot take the last element
//2. We don't take the first element, in that case we can take the last element
// Ex: [1,2,3,1] there will be two arrays [1,2,3] and [2,3,1] . Picking the first element and not picking the first element
function solve(nums) {
    let arr1 = [],
        arr2 = [];
    for (let i = 0; i < nums.length; i++) {
        if (i !== 0) arr1.push(nums[i]);
        if (i !== nums.length - 1) arr2.push(nums2[2]);
    }

    let result1 = maxAdjSum(arr1);
    let result2 = maxAdjSum(arr2);

    return Math.max(result1, result2);

}
