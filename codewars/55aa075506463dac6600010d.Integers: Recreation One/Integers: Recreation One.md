# Description
[http://www.codewars.com/kata/55aa075506463dac6600010d/train/javascript](http://www.codewars.com/kata/55aa075506463dac6600010d/train/javascript)

Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!

Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.

The result will be an array of arrays(in C an array of Pair), each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.

# Examples:

    list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
    list_squared(42, 250) --> [[42, 2500], [246, 84100]]

The form of the examples may change according to the language, see `Example Tests:` for more details.

# Test Cases
```
Test.describe("Basic tests",function() {
Test.assertSimilar(listSquared(1, 250), [[1, 1], [42, 2500], [246, 84100]])
Test.assertSimilar(listSquared(42, 250), [[42, 2500], [246, 84100]])
Test.assertSimilar(listSquared(250, 500), [[287, 84100]])
Test.assertSimilar(listSquared(300, 600), [])
Test.assertSimilar(listSquared(600, 1500), [[728, 722500], [1434, 2856100]])
Test.assertSimilar(listSquared(1500, 1800), [[1673, 2856100]])
Test.assertSimilar(listSquared(1800, 2000), [[1880, 4884100]])
Test.assertSimilar(listSquared(2000, 2200), [])
Test.assertSimilar(listSquared(2200, 5000), [[4264, 24304900]])
Test.assertSimilar(listSquared(5000, 10000), [[6237, 45024100], [9799, 96079204], [9855, 113635600]])
})

Test.describe("Random tests",function(){
    function randint(a,b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    
    function solAux130412(n) {
        var s = 0;
        var nf = 0;
        var res = [];
        for (var i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
            if (n % i === 0) {
                s += i * i;
                nf = n / i;
                if (nf !== i)
                    s += nf * nf;
        }
        if (Math.pow(~~Math.sqrt(s), 2) === s) {
            res.push(n);
            res.push(s);
            return res;
        } else return null;
    }

    function solution130412(m, n) {
        var res = [];
        for (var i = m; i <= n; i++) {
            var r = solAux130412(i);
            if (r !== null) {
                res.push(r);
            }
        }
        return res;
    }

    for (var i = 0; i < 50; i++){
        var m = randint(200, 1000);
        var n = randint(1100, 8000);
        Test.it("Testing for : " + m + ", " + n,
            function(){
                Test.assertSimilar(listSquared(m, n),solution130412(m, n), "It should work with random inputs")
            }
        )
    }
})
```

# Solution

```
function listSquared (m, n) {
  var matches = [];

  for (var i = m; i <= n; ++i) {
    var sum = getDivisors(i).reduce((sum, n) => sum + n * n, 0);
    var ok = Number.isInteger(Math.sqrt(sum));

    if (ok) {
      matches.push([i, sum]);
    }
  }

  return matches;
}

function getDivisors (n) {
  var divisors = [];

  for (var i = 1; i <= n / 2; ++i) {
    if (n % i) {
      continue;
    }

    divisors.push(i);
  }

  return divisors.concat([n]);
}
```

```
function listSquared(m, n) {
  let arr = [];
  for(let i = m; i<=n;i++){
    let arr_i = devisor(i);
    let sum_i = arr_i.reduce((pre,cur) => pre + cur * cur,0);
    if(Number.isInteger(Math.sqrt(sum_i))){
      arr.push([i, sum_i]);
    }
  }
  return arr;
}

function devisor(n){
  let arr = [];
  for(let i = 1;i <= n;i++){
    let last = n / i;
    if(last < i){break;}
    if(Number.isInteger(last)){
      if(last != i){
        arr.push(i, last);
      }else{
        arr.push(i);
      } 
    }
  };
  return arr;
}
```