# Description
[http://www.codewars.com/kata/550554fd08b86f84fe000a58/train/javascript](http://www.codewars.com/kata/550554fd08b86f84fe000a58/train/javascript)

Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.

Example 1:
```
a1 = ["arp", "live", "strong"]

a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

returns ["arp", "live", "strong"]
```
Example 2:
```
a1 = ["tarp", "mice", "bull"]

a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

returns []
```
Notes:

Arrays are written in "general" notation. See "Your Test Cases" for examples in your language.

Beware: `r` must be without duplicates.


# Test Cases
```
a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

a1 = ["xyz", "live", "strong"]
Test.assertSimilar(inArray(a1, a2), ["live", "strong"])
a1 = ["live", "strong", "arp"]
Test.assertSimilar(inArray(a1, a2), ["arp", "live", "strong"])
a1 = ["tarp", "mice", "bull"]
Test.assertSimilar(inArray(a1, a2), [])

```
# Solution

```
function inArray(arr1, arr2) {
  return arr1.filter(function(needle) {
    return arr2.some(function(haystack) {
      return haystack.indexOf(needle) > -1;
    });
  }).sort();
}
```

```
function inArray(array1,array2){
  var r = [];
  array1.reduce(function(pre,cur){
    array2.reduce(function(pres,curs){
      if(curs.includes(cur)){
        if(r[r.length-1] != cur){
          r.push(cur);
        }
      }
    },'');
  },'');
  return r.sort();
}
```
