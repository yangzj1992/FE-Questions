# Description
[https://www.codewars.com/kata/54d81488b981293527000c8f/train/javascript](https://www.codewars.com/kata/54d81488b981293527000c8f/train/javascript)

* * *

## Sum of Pairs

Given a list of integers and a single sum value, return the first two values (parse from the left please) in order of appearance that add up to form the sum.

    sum_pairs([11, 3, 7, 5],         10)
    #              ^--^      3 + 7 = 10
    == [3, 7]

    sum_pairs([4, 3, 2, 3, 4],         6)
    #          ^-----^         4 + 2 = 6, indices: 0, 2 *
    #             ^-----^      3 + 3 = 6, indices: 1, 3
    #                ^-----^   2 + 4 = 6, indices: 2, 4
    #  * entire pair is earlier, and therefore is the correct answer
    == [4, 2]

    sum_pairs([0, 0, -2, 3], 2)
    #  there are no pairs of values that can be added to produce 2.
    == None/nil/undefined (Based on the language)

    sum_pairs([10, 5, 2, 3, 7, 5],         10)
    #              ^-----------^   5 + 5 = 10, indices: 1, 5
    #                    ^--^      3 + 7 = 10, indices: 3, 4 *
    #  * entire pair is earlier, and therefore is the correct answer
    == [3, 7]

Negative numbers and duplicate numbers can and will appear.

**NOTE:** There will also be lists tested of lengths upwards of 10,000,000 elements. Be sure your code doesn't time out.

# Test Cases
```
l1= [1, 4, 8, 7, 3, 15];
l2= [1, -2, 3, 0, -6, 1];
l3= [20, -13, 40];
l4= [1, 2, 3, 4, 1, 0];
l5= [10, 5, 2, 3, 7, 5];
l6= [4, -2, 3, 3, 4];
l7= [0, 2, 0];
l8= [5, 9, 13, -3];
l9= Array(5000001).join(1).split('').map(function(x){return parseInt(x,10)});
l9[l9.length / 2-1] = 6;
l9[l9.length / 2] = 7;
l9[l9.length-2] = 8;
l9[l9.length-1] = -3;
l9[0] = 13;
l9[1] = 3;

Test.describe("Testing For Sum of Pairs", function(){
Test.expect(sum_pairs(l1, 8)+"" == [1, 7]+"", "Basic: %s should return [1, 7] for sum = 8" % l1);
Test.expect(sum_pairs(l2, -6)+"" == [0, -6]+"", "Negatives: %s should return [0, -6] for sum = -6" % l2);
Test.expect(sum_pairs(l3, -7) == undefined, "No Match: %s should return undefined for sum = -7" % l3);
Test.expect(sum_pairs(l4, 2)+"" == [1, 1]+"", "First Match From Left: %s should return [1, 1] for sum = 2 " % l4);
Test.expect(sum_pairs(l5, 10)+"" == [3, 7]+"", "First Match From Left REDUX!: %s should return [3, 7] for sum = 10 " % l5);
Test.expect(sum_pairs(l6, 8)+"" == [4, 4]+"", "Duplicates: %s should return [4, 4] for sum = 8" % l6);
Test.expect(sum_pairs(l7, 0)+"" == [0, 0]+"", "Zeroes: %s should return [0, 0] for sum = 0" % l7);
Test.expect(sum_pairs(l8, 10)+"" == [13, -3]+"", "Subtraction: %s should return [13, -3] for sum = 10" % l8);
});

Test.describe("Excruciatingly Long List Tests", function(){
Test.expect(sum_pairs(l9, 13)+"" == [6, 7]+"", "Five Million Numbers With Middle Pair: Should terminate with a valid pair output");
Test.expect(sum_pairs(l9, 5)+"" == [8, -3]+"", "Five Million Numbers With Pair At End: Should terminate with a valid pair output");
Test.expect(sum_pairs(l9, 16)+"" == [13, 3]+"", "Five Million Numbers With Pair At Start: Should terminate with a valid pair output");
Test.expect(sum_pairs(l9, 31) == undefined, "Five Million Numbers With No Match: Should return undefined in a decent time period");
});
```

# Solution

``` js
var sum_pairs=function(ints, s){
  const intsSet = new Set();
  for (let i = 0; i < ints.length; i++) {
    let currInt = ints[i];
    if (intsSet.has(s - currInt)) return [s - currInt, currInt];
    else intsSet.add(currInt);
  }
}
```

``` js
var sum_pairs=function(ints, s){
  var seen = {}
  for (var i = 0; i < ints.length; ++i) {
    if (seen[s - ints[i]]) return [s - ints[i], ints[i]];
    seen[ints[i]] = true
  }
}
```
