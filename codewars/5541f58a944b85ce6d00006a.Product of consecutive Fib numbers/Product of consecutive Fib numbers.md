# Description
[https://www.codewars.com/kata/5541f58a944b85ce6d00006a/train/javascript](https://www.codewars.com/kata/5541f58a944b85ce6d00006a/train/javascript)

The Fibonacci numbers are the numbers in the following integer sequence (Fn):

> `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...`
such as

> `F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.`
Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

> `F(n) * F(n+1) = prod.`
Your function productFib takes an integer (prod) and returns an array:

`[F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)`

depending on the language if F(n) * F(n+1) = prod.

If you don't find two consecutive F(m) verifying `F(m) * F(m+1) = prod` you will return

`[F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)`

F(m) being the smallest one such as F(m) * F(m+1) > prod.

### Examples

```
productFib(714) # should return [21, 34, true], 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

productFib(800) # should return [34, 55, false], 
                # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
```

Notes: Not useful here but we can tell how to choose the number n up to which to go: we can use the "golden ratio" phi which is `(1 + sqrt(5))/2` knowing that F(n) is asymptotic to: `phi^n / sqrt(5)`. That gives a possible upper bound to n.

You can see examples in "Example test".

### References

[http://en.wikipedia.org/wiki/Fibonacci_number](http://en.wikipedia.org/wiki/Fibonacci_number)

[http://oeis.org/A000045](http://oeis.org/A000045)



# Test Cases
```
Test.describe("Basic tests (user examples)", function(){
  Test.assertSimilar(productFib(4895), [55, 89, true])
  Test.assertSimilar(productFib(5895), [89, 144, false])
  Test.assertSimilar(productFib(74049690), [6765, 10946, true])
  Test.assertSimilar(productFib(84049690), [10946, 17711, false])
  Test.assertSimilar(productFib(193864606), [10946, 17711, true])
  Test.assertSimilar(productFib(447577), [610, 987, false])
  Test.assertSimilar(productFib(602070), [610, 987, true])
});

Test.describe("Some random tests",function(){
 
 var someFibs = [55,89,144,233,377,610,987,1597,2584,4181,6765,
     10946,17711,28657,46368,75025,121393,196418,317811,514229,
     832040,1346269,2178309,3524578,5702887,9227465,14930352,
     24157817,39088169,63245986];
     
  Test.randomize([1,2,3,4,5,6,7,8,9,10]).forEach(function(r){
    var ok=!!(r%2), i = ~~(Math.random()*(someFibs.length-1)), 
        f0=someFibs[i], f1=someFibs[i+1],
        prod=f0*f1 - (!ok ? f1 : 0);
    console.log("search for "+prod)        
    Test.assertSimilar(productFib(prod), [f0,f1,ok])
  })

});
```

# Solution

```
function productFib(prod){
  var n = 0;
  var nPlus = 1;  
  while(n*nPlus < prod) {
    nPlus = n + nPlus;
    n = nPlus - n;
  }
  return [n, nPlus, n*nPlus===prod];
}

```

```
function productFib(prod){
  var cache = {
    0: 0,
    1: 1
  }
  
  function fib(s){
    if(s == 0 || s == 1){return s;}
    if(s > 1){
      if(cache[s]){
        return cache[s];
      }else{
        cache[s] = fib(s - 1) + fib(s - 2)
        return fib(s - 1) + fib(s - 2);
      }
    }
  }
  
  let n = 0;
  while(fib(n) * fib(n + 1) < prod){
    n++;
  }
  if(fib(n) * fib(n + 1) == prod){
    return [fib(n), fib(n + 1), true]
  }else{
    return [fib(n), fib(n + 1), false]
  }
}
```
