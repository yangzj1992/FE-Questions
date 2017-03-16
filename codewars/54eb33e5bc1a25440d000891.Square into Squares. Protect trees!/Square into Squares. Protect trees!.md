# Description
[https://www.codewars.com/kata/54eb33e5bc1a25440d000891/train/javascript](https://www.codewars.com/kata/54eb33e5bc1a25440d000891/train/javascript)

My little sister came back home from school with the following task: given a squared sheet of paper she has to cut it in pieces which, when assembled, give squares the sides of which form an increasing sequence of numbers. At the beginning it was lot of fun but little by little we were tired of seeing the pile of torn paper. So we decided to write a program that could help us and protects trees.

## Task

Given a positive integral number n, return a **strictly increasing** sequence (list/array/string depending on the language) of numbers, so that the sum of the squares is equal to n².

If there are multiple solutions (and there will be), return the result with the largest possible values:

## Examples

`decompose(11)` must return `[1,2,4,10]`. Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² but don't return `[2,6,9]`, since 9 is smaller than 10.

For `decompose(50)` don't return `[1, 1, 4, 9, 49]` but `[1, 3, 5, 8, 49]` since `[1, 1, 4, 9, 49]` doesn't form a strictly increasing sequence.

## Note

Neither `[n]` nor `[1,1,1,…,1]` are valid solutions. If no valid solution exists, return `nil`, `null`, `Nothing`, `None` (depending on the language) or `""` (Java, C#) or `{}` (C++).

The function "decompose" will take a positive integer n and return the decomposition of N = n² as:

    [x1 ... xk]

    [x1 ... xk]

    [x1 ... xk]

    "x1 ... xk"

    "x1 ... xk"

    [x1 ... xk]

    Just [x1 ... xk]

    Haskell
    decompose 50 `shouldBe` Just [1,3,5,8,49]
    decompose 4  `shouldBe` Nothing

    Some [x1 ... xk]

    decompose 50 `shouldBe` Some [1,3,5,8,49]
    decompose 4  `shouldBe` None

    {x1 ... xk}

    [x1 ... xk]

    "[x1,x2, ... ,xk]"

## Hint

Very often `xk` will be `n-1`.


# Test Cases

```
Test.assertSimilar(decompose(50), [1,3,5,8,49])
Test.assertSimilar(decompose(44), [2,3,5,7,43])
Test.assertSimilar(decompose(625), [2,5,8,34,624])
Test.assertSimilar(decompose(5), [3,4])
Test.assertSimilar(decompose(7100), [2,3,5,119,7099])
Test.assertSimilar(decompose(123456), [1,2,7,29,496,123455])
Test.assertSimilar(decompose(1234567), [2,8,32,1571,1234566])
Test.assertSimilar(decompose(7654321), [6, 10, 69, 3912, 7654320])
Test.assertSimilar(decompose(7654322), [1, 4, 11, 69, 3912, 7654321])
Test.assertSimilar(decompose(76), [1, 2, 5, 11, 75])
Test.assertSimilar(decompose(2), null)
Test.assertSimilar(decompose(7), [2, 3, 6])
```

# Solution

```
function decompose(n) {
  return loop(n - 1, n * n, []);
  function loop(k, rest, path) {
    return (rest === 0) ? path :
           (rest < 0 || k === 0) ? null :
              loop(k - 1, rest - k * k, [k].concat(path)) ||
              loop(k - 1, rest, path);
  }
}
```

```
function decompose(n) {
    let result = decomposer(n, n * n);
    return result == null ? null : result.slice(0, result.length - 1);
}

function decomposer(n, remain){
  if(remain == 0) {  
    return [n]; 
  }
  for(let i = n - 1; i > 0; i--){
    if((remain - i * i) >= 0){
      let r = decomposer(i, (remain - i * i));
      if(r != null){
        r.push(n);
        return r;
      }
    }
  }
  return null;
}
```