# Description
[http://www.codewars.com/kata/525e5a1cb735154b320002c8/train/javascript](http://www.codewars.com/kata/525e5a1cb735154b320002c8/train/javascript)

Triangular numbers are so called because of the equilateral triangular shape that they occupy when laid out as dots. i.e.

1st (1)   2nd (3)    3rd (6)
*          **        ***
           *         **
                     *
You need to return the nth triangular number. You should return 0 for out of range values:

  triangular(0)==0,
  triangular(2)==3,
  triangular(3)==6,
  triangular(-10)==0


# Test Cases
```
// You can test here

Test.assertEquals( triangular(2), 3 )
Test.assertEquals( triangular(4), 10 )
```

# Solution

```
function triangular( n ) {
  return (n > 0) ? ((n * n) + n) / 2 : 0;
}
```

