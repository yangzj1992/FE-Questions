# Description
[http://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/javascript](http://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/javascript)

In this kata you have to create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

Examples:
```
permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
```

# Test Cases
```
describe('permutations', function() {
  it('unique letters', function() {
    Test.assertSimilar(permutations('a'), ['a']);
    Test.assertSimilar(permutations('ab').sort(), ['ab', 'ba'].sort());
    Test.assertSimilar(permutations('abc').sort(), ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'].sort());
    
    var abcd = [
      'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'bacd', 'badc', 'bcad', 'bcda', 'bdac', 'bdca',
      'cabd', 'cadb', 'cbad', 'cbda', 'cdab', 'cdba', 'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba'
    ];
    Test.assertSimilar(permutations('abcd').sort(), abcd.sort());
    Test.assertSimilar(permutations('bcad').sort(), abcd.sort());
    Test.assertSimilar(permutations('dcba').sort(), abcd.sort());
  });
  
  it('duplicate letters', function() {
    Test.assertSimilar(permutations('aa').sort(), ['aa'].sort());
    Test.assertSimilar(permutations('aabb').sort(), ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa'].sort());
    Test.assertSimilar(permutations('aaaab').sort(), ['aaaab', 'aaaba', 'aabaa', 'abaaa', 'baaaa'].sort());
  });
});

```

# Solution

```
function permutations(string){
  var hash = {};
  var resArr = [];
  var subroutine = function(testStr, newString){
    newString = newString || '';
    if(newString.length === string.length){
      hash[newString] = true;
      return;
    }
    for(var i = 0; i < testStr.length; i++){
      var cur = testStr[i];
      var str = newString + cur;
      var excision = testStr.substring(0, i) + testStr.substring(i+1);
      subroutine(excision, str);
    }
  }; 
  subroutine(string);
  for(var key in hash){
    resArr.push(key);
  }
  return resArr;
}
```

```
function permutations(string) {
  var arr = string.split(''), tmp = arr.slice(), heads = [], out = [];
  if(string.length == 1) return [string];
  arr.forEach(function(v, i, arr) {
    if(heads.indexOf(v) == -1) {
      heads.push(v);
      tmp.splice(tmp.indexOf(v), 1);
      permutations(tmp.join('')).forEach(function(w) {out.push(v + w);});
      tmp.push(v);
    }
  });
  return out;
}
```
