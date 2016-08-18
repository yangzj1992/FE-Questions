# Description
[https://www.codewars.com/kata/5418a1dd6d8216e18a0012b2/train/javascript](https://www.codewars.com/kata/5418a1dd6d8216e18a0012b2/train/javascript)

In this Kata, you will implement The [Luhn Algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm), which is used to help validate credit card numbers.

Given a positive integer of up to 16 digits, return `true` if it is a valid credit card number, and `false` if it is not.

Here is the algorithm:

If there are an even number of digits, double every other digit starting with the first, and if there are an odd number of digits, double every other digit starting with the second. Another way to think about it is, from the right to left, double every other digit starting with the second to last digit.
```
1714 => [1*, 7, 1*, 4] => [2, 7, 2, 4]

12345 => [1, 2*, 3, 4*, 5] => [1, 4, 3, 8, 5]

891 => [8, 9*, 1] => [8, 18, 1]
```
If a resulting doubled number is greater than 9, replace it with either the sum of it's own digits, or 9 subtracted from it.
```
 [8, 18*, 1] => [8, (1+8), 1] => [8, 9, 1]

 (or)

 [8, 18*, 1] => [8, (18-9), 1] => [8, 9, 1]
```
Sum all of the final digits
```
 [8, 9, 1] => 8+9+1 => 18
 ```
Finally, take that sum and divide it by 10. If the remainder equals zero, the original credit card number is valid.
```
 18 (modulus) 10 => 8.  

 8 does not equal 0, so 891 is not a valid credit card number.
```

# Test Cases
```
// TODO: Replace examples and use TDD development by writing your own tests

// These are some of the methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// You can also use Chai (http://chaijs.com/)
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();

describe("Solution", function(){
  it("should test for something", function(){
    Test.assertEquals("actual", "expected", "This is just an example of how you can write your own TDD tests");
  });
});
```

# Solution

```
function validate(n){
    var sum = 0;
    var i = 0;
    var x = 1;
    var nArray = n.toString().split("");
    if(nArray.length%2 === 0) {
        while(i<nArray.length) {
            nArray[i] = nArray[i]*2;
            if(nArray[i]>9) {
                nArray[i] = nArray[i]-9;
            }
            i = i+2;
        }
        for(j=0; j<nArray.length; j++){
            sum = sum + parseInt(nArray[j]);
        }
    }
    else {
        while(x<nArray.length) {
            nArray[x] = nArray[x]*2;
            if(nArray[x]>9) {
                nArray[x] = nArray[x]-9;
            }
            x = x+2;
        }
        for(j=0; j<nArray.length; j++){
            sum = sum + parseInt(nArray[j]);
        }
    }
    return sum%10 === 0;
}
```

```
function validate(n){
  var sum = 0;

  while (n > 0) {
    var a = n % 10;
    n = Math.floor(n / 10);
    
    var b = (n % 10) * 2;
    n = Math.floor(n / 10);
    
    if (b > 9) {
      b -= 9;
    }
    
    sum += a + b;
  }
  
  return sum % 10 == 0;
}
```






