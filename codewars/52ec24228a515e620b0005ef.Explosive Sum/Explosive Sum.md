# Description
[https://www.codewars.com/kata/52ec24228a515e620b0005ef/solutions/javascript](https://www.codewars.com/kata/52ec24228a515e620b0005ef/solutions/javascript)

# How many ways can you make the sum of a number?

From wikipedia: [https://en.wikipedia.org/wiki/Partition_(number_theory)#](https://en.wikipedia.org/wiki/Partition_(number_theory)#)

> In number theory and combinatorics, a partition of a positive integer _n_, also called an _integer partition_, is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their summands are considered the same partition. If order matters, the sum becomes a composition. For example, 4 can be partitioned in five distinct ways:
> 
>     4
>     3 + 1
>     2 + 2
>     2 + 1 + 1
>     1 + 1 + 1 + 1

## Examples

### Trivial

    sum(-1) // 0
    sum(1) // 1

    explosiveSum (-1) -- 0
    explosiveSum  1   -- 1

    sum(-1) # 0
    sum(1) # 1

    sum(-1) # 0
    sum(1) # 1

### Basic

    sum(2) // 2  -> 1+1 , 2
    sum(3) // 3 -> 1+1+1, 1+2, 3
    sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
    sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

    sum(10) // 42

    explosiveSum 2   -- 2 -> 1+1 , 2
    explosiveSum 3   -- 3 -> 1+1+1, 1+2, 3
    explosiveSum 4   -- 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
    explosiveSum 5   -- 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3
    explosiveSum 10  -- 42

    sum(2) # 2  -> 1+1 , 2
    sum(3) # 3 -> 1+1+1, 1+2, 3
    sum(4) # 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
    sum(5) # 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

    sum(10) # 42

    sum(2) # 2  -> 1+1 , 2
    sum(3) # 3 -> 1+1+1, 1+2, 3
    sum(4) # 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
    sum(5) # 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

    sum(10) # 42

### Explosive

    sum(50) // 204226
    sum(80) // 15796476
    sum(100) // 190569292

    explosiveSum  50 --    204226
    explosiveSum  80 --  15796476
    explosiveSum 100 -- 190569292

    sum(50) # 204226
    sum(80) # 15796476
    sum(100) # 190569292

    sum(50) # 204226
    sum(80) # 15796476
    sum(100) # 190569292

See [here](http://www.numericana.com/data/partition.htm) for more examples.

# Test Cases
```
console.log('***** Very basic tests *****\n');
Test.assertSimilar(sum(-1), 0);
// Centuries of mathematics say sum(0) == 0, but whatever...
Test.assertSimilar(sum(1), 1);
Test.assertSimilar(sum(2), 2);
Test.assertSimilar(sum(3), 3);
console.log('_____ So far so good _____\n');
console.log('\n***** Funcionality tests *****\n');
Test.assertSimilar(sum(4), 5);
Test.assertSimilar(sum(5), 7);
Test.assertSimilar(sum(20), 627);
console.log('_____ You got it! _____\n');
console.log('\n***** Optimization tests *****\n');
Test.assertSimilar(sum(30), 5604);
Test.assertSimilar(sum(40), 37338);
Test.assertSimilar(sum(43), 63261);
Test.assertSimilar(sum(60), 966467);
console.log('_____ You are a master! _____\n');
console.log('\n***** Explosive zone tests *****\n');
Test.assertSimilar(sum(70), 4087968);
Test.assertSimilar(sum(90), 56634173);
Test.assertSimilar(sum(200), 3972999029388);
Test.assertSimilar(sum(275), 1520980492851175, 'You almost there');
console.log('_____ You have beaten me, share your solution! _____\n');
var random = Math.floor(Math.random()*100) + 100;
Test.assertSimilar(sum(random), (function (num, pre) {

  var cache = {};

  function s(n, pre) {
    var key = n + ',' + pre;
    if (cache[key]) return cache[key];
    var result = 1;
    for (var i = pre; i <= Math.floor(n/2); i += 1) result += s(n  - i, i);
    cache[key] = result;
    return result;
  }

  if (num < 1) return 0;
  return s(num, 1);
})(random), 'You are passed all the tests. Something weird is happening. You do not pass the final test random control.');

```
# Solution

```
var memo = [];

function sum(n, m = n) {
    if (n == 0) return 1;
    if (n < 0 || m == 0) return 0;
    if (memo[n] && memo[n][m]) return memo[n][m];
    let total = sum(n, m - 1) + sum(n - m, m);
    if (!memo[n]) {
        memo[n] = [];
    }
    memo[n][m] = total;
    return total;
}
```

```
function sum(num) {
  let cache = [];
  function split(num, add){
    if(num < 1 || add < 1) return 0;
    if(num == 1 || add == 1) return 1;
    if(num < add) {
      if(cache[num] == undefined){ cache[num] = [];}
      if(!cache[num][num]){
        cache[num][num] = split(num, num);
      }  
      return cache[num][num];
    }
    if(num == add){
      if(cache[num] == undefined){ cache[num] = [];}
      if(!cache[num][add - 1]){
        cache[num][add - 1] = split(num, add - 1)
      }
      return cache[num][add - 1] + 1;
    }
    if(num > add){
      if(cache[num] == undefined){ cache[num] = [];}
      if(!cache[num][add - 1]){
        cache[num][add - 1] = split(num, add - 1);
      }
      if(cache[num - add] == undefined){ cache[num - add] = [];}
      if(!cache[num - add][add]){
        cache[num - add][add] = split((num - add), add)
      }
      return cache[num][add - 1] + cache[num - add][add]
    } 
  }
  return split(num, num);
}
```