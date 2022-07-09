function fn1(coins, amount, n) {
  if (amount == 0) return 0;

  if (n < 0 || amount < 0) return Infinity;

  let pick = 1 + helper(coins, amount - coins[n], n);
  let notpick = helper(coins, amount, n - 1);

  return Math.min(pick, notpick);
}

function fn2(coins, amount) {
  if (amount == 0) return 0;
  if (amount < 0) return -1;
  let cc = -1;
  for (let i = 0; i < coins.length; i++) {
    let coin = fn2(coins, amount);
    if (coin >= 0) {
      if (cc < 0) {
        cc = coin;
      } else {
        cc = Math.min(cc, coin);
      }
    }
  }
  // +1 as we have to include this level of coins as well

  return cc < 0 ? -1 : cc + 1;
}

function coinChange(coins, amount) {
  let ans = method1(coins, amount, coins.length - 1);
  return ans != Infinity ? ans : -1;
}

/* 

function fn(n,amount) {
   if (amount == 0) return 0;

  if (n < 0 || amount < 0) return Infinity;

  let pick = 1 + fn (n, amount - coins[n]);
  let notpick = fn(n-1, amount);

  return Math.min(pick, notpick);
}
*/
