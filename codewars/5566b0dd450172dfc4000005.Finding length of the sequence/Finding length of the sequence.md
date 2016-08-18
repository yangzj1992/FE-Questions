# Description
[https://www.codewars.com/kata/5566b0dd450172dfc4000005](https://www.codewars.com/kata/5566b0dd450172dfc4000005)

As a part of this Kata, you need to find the length of the sequence in an array, between the first and the second occurance of a specified number.

For example, for a given array arr

`[0, -3, 7, 4, 0, 3, 7, 9]`
Finding length between two 7s like

`lengthOfSequence([0, -3, 7, 4, 0, 3, 7, 9], 7)`
would return 5.

For sake of simplicity, there will only be numbers (positive or negative) in the supplied array.

If there are less or more than two occurances of the number to searched for, return 0.

# Test Cases
```
Test.assertEquals(lengthOfSequence([1, 1], 1), 2, 'Returns two when there are only two elements in the array');
Test.assertEquals(lengthOfSequence([1, 2, 3, 1], 1), 4, 'Returns four for an array of length four and the number to be searched at the boundaries');
Test.assertEquals(lengthOfSequence([-7, 5, 0, 2, 9, 5], 5), 5, 'Returns five');
Test.assertEquals(lengthOfSequence([-7, 6, 2, -7, 4], -7), 4, 'Returns four');
```
# Solution
```
var lengthOfSequence = function (arr, n) {
 return arr.count(n) == 2 ? arr.lastIndexOf(n) - arr.indexOf(n) + 1 : 0;
};
Array.prototype.count = function(n){
  return this.filter(function(v){ return v == n }).length;
}
```
