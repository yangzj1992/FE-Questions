# Description
[http://www.codewars.com/kata/561e9c843a2ef5a40c0000a4/train/javascript](http://www.codewars.com/kata/561e9c843a2ef5a40c0000a4/train/javascript)

The prime numbers are not regularly spaced. For example from `2` to `3` the gap is `1`. From `3` to `5` the gap is `2`. From `7` to `11` it is `4`. Between 2 and 50 we have the following pairs of 2-gaps primes: `3-5, 5-7, 11-13, 17-19, 29-31, 41-43`

A prime gap of length n is a run of n-1 consecutive composite numbers between two **successive** primes (see: [http://mathworld.wolfram.com/PrimeGaps.html](http://mathworld.wolfram.com/PrimeGaps.html)).

We will write a function gap with parameters:

`g` (integer>= 2) which indicates the gap we are looking for

`m` (integer> 2) which gives the start of the search (m inclusive)

`n` (integer>= m) which gives the end of the search (n inclusive)

In the example above `gap(2, 3, 50)` will return `[3, 5] or (3, 5) or {3, 5}` which is the first pair between 3 and 50 with a 2-gap.

So this function should return the **first** pair of two prime numbers spaced with a gap of `g` between the limits `m`, `n` if these numbers exist otherwise `nil or null or None or Nothing` (depending on the language). In C++ return in such a case `{0, 0}`.

# Examples:

`gap(2, 5, 7) --> [5, 7] or (5, 7) or {5, 7}`

`gap(2, 5, 5) --> nil or in C++ {0, 0}`

`gap(4, 130, 200) --> [163, 167] or (163, 167) or {163, 167}`

([193, 197] is also such a 4-gap primes between 130 and 200 but it's not the first pair)

`gap(6,100,110) --> nil or {0, 0}` : between 100 and 110 we have `101, 103, 107, 109` but `101-107`is not a 6-gap because there is `103`in between and `103-109`is not a 6-gap because there is `107`in between.

# Ref

[https://en.wikipedia.org/wiki/Prime_gap](https://en.wikipedia.org/wiki/Prime_gap)

# Test Cases
```
Test.describe("Gap",function() {
Test.it("Basic tests",function() {    
    Test.assertSimilar(gap(2,100,110), [101, 103]);
    Test.assertSimilar(gap(4,100,110), [103, 107]);
    Test.assertSimilar(gap(6,100,110), null);
    Test.assertSimilar(gap(8,300,400), [359, 367]);
    Test.assertSimilar(gap(10,300,400), [337, 347]);

    Test.assertSimilar(gap(4,30000,100000), [30109, 30113]);
    Test.assertSimilar(gap(6,30000,100000), [30091, 30097]);
    Test.assertSimilar(gap(8,30000,100000), [30161, 30169]);
    Test.assertSimilar(gap(11,30000,100000), null);
    Test.assertSimilar(gap(2,10000000,11000000), [10000139, 10000141]);
})})

Test.describe("Random tests",function() {

    function randint(a, b) { 
        return Math.floor(Math.random() * (b - a + 1) + a); 
    }
    
    //................
    function primeSol(n) {
        if (n === 2) {
            return true;
        } else if ((n < 2) || (n % 2 === 0)) {
            return false;
        } else {
            for (var i = 3; i <= Math.sqrt(n); i += 2) {
                if (n % i === 0)
                    return false;
            }
            return true;
        }
    }    

    function gapSol(g, m, n) {
        var res = [];
        var i = m;
        while (i < n + 1) {
            if (primeSol(i)) {
                res.push(i);
                break;
            }
            i++;
        }
        while (true) {
            var j = i + 1;
            while (j < n + 1) {
                if (primeSol(j)) {
                    if (j - i === g) {
                        res.push(j);
                        return res;
                    } else {
                        res[0] = j;
                        i = j;
                    }
                }
                j++;
            }
            return null;
        }
    }
    //................

    for (var i = 0; i < 100; i++) {
        var n = randint(1000, 1000000);
        Test.it("Testing Gap: ", function() {
            Test.assertSimilar(gap(2, n, n + 100000), gapSol(2, n, n + 100000));
            Test.assertSimilar(gap(4, n, n + 100000), gapSol(4, n, n + 100000));
            Test.assertSimilar(gap(6, n, n + 100000), gapSol(6, n, n + 100000));
            Test.assertSimilar(gap(8, n, n + 100000), gapSol(8, n, n + 100000));
            var k = randint(0, 2) 
            if (k % 2 === 0) 
                Test.assertSimilar(gap(2, n + 1000, n + 10000), gapSol(2, n + 1000, n + 10000)); 
            else
                Test.assertSimilar(gap(4, n + 1000, n + 10000), gapSol(4, n + 1000, n + 10000));
        }
    )}
})
```

# Solution

```
function gap(g, m, n) {
    var lastPrime = 0;
    var isPrime = function(x) { 
      for (var i=2; i*i<=x; i++) { if (x % i == 0) return false; } return true;
    }
    
    for(var i = m; i <= n; i++)
        if(isPrime(i)) {
            if(i - lastPrime == g) return [lastPrime, i];
            else lastPrime = i;
        }
      
    return null;
}
```

```
function gap(g, m, n) {
  for(let i = m; i<= n;i++){
    if(isPrime(i) && isPrime(i + g)){
      let arr = Array(g - 1).fill().map((item, index) => i + index + 1)
      if(arr.filter((item) => isPrime(item)).length > 0){
        continue;
      }else{
        return [i, i+g];
      }
    }
  }
  return null;
}

function isPrime(num){
  let mid = Math.ceil(Math.sqrt(num));
  for(let i = 2; i <= mid; i++){
    if(num % i == 0){
      return false;
    }
  }
  return true;
}
```