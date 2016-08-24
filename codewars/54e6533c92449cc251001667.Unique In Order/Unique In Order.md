# Description
[https://www.codewars.com/kata/unique-in-order/train/javascript](https://www.codewars.com/kata/unique-in-order/train/javascript)

Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

For example:
```
uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]
```
# Test Cases
```
Test.describe("lets test it", function(){
  Test.it("should work with empty array", function(){
    Test.assertSimilar(uniqueInOrder(''),[]);
  });
  Test.it("should work with one element", function(){
    Test.assertSimilar(uniqueInOrder('A'),['A']);
  });
  Test.it("should reduce duplicates", function(){
    Test.assertSimilar(uniqueInOrder('AA'),['A']);
    Test.assertSimilar(uniqueInOrder('AAAABBBCCDAABBB'),['A', 'B', 'C', 'D', 'A', 'B']);
    Test.assertSimilar(uniqueInOrder('AADD'),['A','D']);
    Test.assertSimilar(uniqueInOrder('AAD'),['A','D']);
    Test.assertSimilar(uniqueInOrder('ADD'),['A','D']);
  });
  Test.it("and treat lowercase as different from uppercase", function(){
    Test.assertSimilar(uniqueInOrder('ABBCcAD'),['A', 'B', 'C', 'c', 'A', 'D']);
  });
  Test.it("and work with int arrays", function(){
    Test.assertSimilar(uniqueInOrder([1,2,3,3]),[1,2,3]);
  });
  Test.it("and work with char arrays", function(){
    Test.assertSimilar(uniqueInOrder(['a','b','b']),['a','b']);
  });
});
```

# Solution

```
var uniqueInOrder=function(iterable){
  if(iterable.length == 0) return [];
  var stage= [iterable[0]];
  if(typeof iterable === 'string'){
    iterable = iterable.split('');
  }  
  iterable.reduce(function(pre,cur){
    if(pre != cur){
      stage.push(cur)
    }
    return cur;
  });
  return stage
}
```

```
function uniqueInOrder(it) {
  var result = []
  var last
  
  for (var i = 0; i < it.length; i++) {
    if (it[i] !== last) {
      result.push(last = it[i])
    }
  }
  
  return result
}

```
