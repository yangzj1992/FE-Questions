# Description
[https://www.codewars.com/kata/54f2f335cb9d99e8530008d7](https://www.codewars.com/kata/54f2f335cb9d99e8530008d7)

The span function is a good one to know. It accepts an array and a predicate function and returns two arrays. The first array contains all the elements of the argument array up to the item that caused the first failure of the predicate. The second returned array contains the rest of the original array. The original array is not modified.

For example,
```
function isEven (x) {
  return Math.abs(x) % 2 === 0;
}

var arr = [2,4,6,1,8,10];

// This is true
span(arr, isEven) === [[2,4,6],[1,8,10]]
```
Your task is to...wait for it... write your own span function!!!

Hint/Challenge: If you have completed the takeWhile function and the dropWhile function, then you can solve this problem in one line!

# Test Cases
```
describe("The Span Function", function () {
  
  // Functions for use in tests
  function isEven(x) {
    return Math.abs(x) % 2 === 0;
  }
  
  function isOdd(x) {
    return Math.abs(x) % 2 !== 0;
  }
  
  // Arrays for use in tests
  var arr1 = [2,4,6,1,4,8];
  var arr2 = [1,4,5,7,6];
  var arr3 = [13,17,19,11,21];
  
  it("should be defined", function () {
    function tr() { return true; }
    
    Test.assertSimilar(span([], tr), [[], []]);
  });
  
  it("should work when testing for even numbers", function () {
    Test.assertSimilar(span(arr1, isEven), [[2,4,6],[1,4,8]]);
  });
  
  it("should work when the first element results in false", function () {
    Test.assertSimilar(span(arr2, isEven), [[], arr2]);
  });
  
  it("should work when no element results in false", function () {
    Test.assertSimilar(span(arr3, isOdd), [arr3,[]]);
  });

});
```
# Solution
```
function span(arr, predicate) {
  for(var i = 0; i<arr.length;i++){
    if(!predicate(arr[i]))break;
  }
  return [arr.slice(0, i),arr.slice(i)]
}
```
