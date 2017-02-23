# Description
[https://www.codewars.com/kata/554f76dca89983cc400000bb/train/javascript](https://www.codewars.com/kata/554f76dca89983cc400000bb/train/javascript)

In mathematics, a Diophantine equation is a polynomial equation, usually in two or more unknowns, such that only the integer solutions are sought or studied.

In this kata we want to find all integers x, y (x >= 0, y >= 0) solutions of a diophantine equation of the form

 `x ^ 2 - 4 * y ^ 2 = n`

where the unknowns are x and y and n is a given positive number. Solutions x, y will be given as an array of arrays (Ruby, Python, Clojure, JS, CS, TS)

 `[[x1, y1], [x2, y2] ....]`

as an array of tuples (Haskell, C++, Elixir)

 `[(x1, y1), (x2, y2) ....] or { {x1, y1}, {x2, y2} ....} or [{x1, y1}, {x2, y2} ....]`

as an array of pairs (C, see example tests)

`{{x1, y1}{x2, y2} ....}`

and as a string (Java, C#)

 `"[[x1, y1], [x2, y2] ....]"`

in decreasing order of the positive xi. If there is no solution returns `[]` or `"[]"`.

Examples:

```
sol_equa(90005) -->  [[45003, 22501], [9003, 4499], [981, 467], [309, 37]]

sol_equa(90002) --> []

(Java, C#)

solEquaStr(90005) --> "[[45003, 22501], [9003, 4499], [981, 467], [309, 37]]"

solEquaStr(90002) --> "[]"
```

Hint: x ^ 2 - 4 y ^ 2 = (x - 2y) (x + 2y).

# Test Cases
```
Test.assertSimilar(solequa(5), [[3, 1]])
Test.assertSimilar(solequa(12), [[4, 1]])
Test.assertSimilar(solequa(13), [[7, 3]]) 
Test.assertSimilar(solequa(16), [[4, 0]])
Test.assertSimilar(solequa(17), [[9, 4]])
Test.assertSimilar(solequa(20), [[6, 2]]) 
Test.assertSimilar(solequa(9001), [[4501, 2250]])
Test.assertSimilar(solequa(9004), [[2252, 1125]])
Test.assertSimilar(solequa(9005), [[4503, 2251], [903, 449]]) 
Test.assertSimilar(solequa(9008), [[1128, 562]])

a = [[4505, 2252], [1503, 750], [647, 320], [505, 248], [415, 202], [353, 170], [225, 102],
     [153, 60], [135, 48], [103, 20], [97, 10], [95, 2]] 
Test.assertSimilar(solequa(9009), a)
Test.assertSimilar(solequa(90001), [[45001, 22500]] )
Test.assertSimilar(solequa(90002), [])
Test.assertSimilar(solequa(90004), [[22502, 11250]])
Test.assertSimilar(solequa(90005), [[45003, 22501], [9003, 4499], [981, 467], [309, 37]])
Test.assertSimilar(solequa(90009), [[45005, 22502], [15003, 7500], [5005, 2498], [653, 290], [397, 130], [315, 48]])

a = [[112502, 56249], [56254, 28123], [37506, 18747], [22510, 11245], [18762, 9369], 
     [12518, 6241], [11270, 5615], [7530, 3735], [6286, 3107], [4550, 2225], [3810, 1845], 
     [2590, 1205], [2350, 1075], [1650, 675], [1430, 535], [1150, 325], [1050, 225], [950, 25]]
Test.assertSimilar(solequa(900000), a) 
Test.assertSimilar(solequa(900001), [[450001, 225000]]) 
Test.assertSimilar(solequa(900004), [[225002, 112500], [32150, 16068]])
Test.assertSimilar(solequa(900005), [[450003, 225001], [90003, 44999]])
Test.assertSimilar(solequa(9000001), [[4500001, 2250000], [73801, 36870]])
Test.assertSimilar(solequa(9000004), [[2250002, 1125000], [173090, 86532], [132370, 66168], [10402, 4980]])
a = [[4500003, 2250001], [900003, 449999], [642861, 321427], [155187, 77579], 
     [128589, 64277], [31107, 15481], [22269, 11033], [4941, 1963]]
Test.assertSimilar(solequa(9000005), a)
Test.assertSimilar(solequa(90000001), [[45000001, 22500000], [6428575, 3214284], [3461545, 1730766], [494551, 247230]])
Test.assertSimilar(solequa(90000004), [[22500002, 11250000], [252898, 126360], [93602, 46560], [22498, 10200]])
a = [[450000005, 225000002], [150000003, 75000000], [50000005, 24999998], 
     [26470597, 13235290], [8823555, 4411752], [2941253, 1470550]]
Test.assertSimilar(solequa(900000009), a)
Test.assertSimilar(solequa(900000012), [[225000004, 112500001], [75000004, 37499999], [3358276, 1679071], [1119604, 559601]])
Test.assertSimilar(solequa(9000000041), [[4500000021, 2250000010], [155172429, 77586200]])

```

# Solution

``` js
// x = (a + b)/ 2  
// y = (b - a)/ 4
// x^2 - 4y^2 = n => ab = n

function solequa(n) {
  let result = [], a, b;
  for(let a = 1;a <= Math.sqrt(n); a++) {
    if(Number.isInteger(b = n/a)){
      if(Number.isInteger(x = (b+a)/2)){
        if(Number.isInteger(y = (b-a)/4)){
          result.push([x, y]);
        }
      }
    }
  }
  return result;
}
```
