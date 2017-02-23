# Description
[https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript](https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript)

### Count the number of Duplicates

Write a function that will return the count of _distinct_ case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphanumeric characters, including digits, uppercase and lowercase alphabets.

### Example

"abcde" -> 0 `# no characters repeats more than once`  
"aabbcde" -> 2 `# 'a' and 'b'`  
"aabbcdeB" -> 2 `# 'a' and 'b'`  
"indivisibility" -> 1 `# 'i'`  
"Indivisibilities" -> 2 `# 'i' and 's'`  
"aa11" -> 2 # 'a' and '1'

# Test Cases
```
Test.describe("Example tests", function(){
  Test.assertEquals(duplicateCount(""), 0);
  Test.assertEquals(duplicateCount("abcde"), 0);
  Test.assertEquals(duplicateCount("aabbcde"), 2);
  Test.assertEquals(duplicateCount("aabBcde"), 2, "should ignore case");
  Test.assertEquals(duplicateCount("Indivisibility"), 1)
  Test.assertEquals(duplicateCount("Indivisibilities"), 2, "characters may not be adjacent")
})


Test.describe("More tests", function(){
  var lowers = "abcdefghijklmnopqrstuvwxyz", uppers = lowers.toUpperCase();
  Test.assertEquals(duplicateCount(lowers), 0)
  Test.assertEquals(duplicateCount(lowers + "baaAAB"), 2, "characters may not be adjacent")

  Test.assertEquals(duplicateCount(lowers+lowers), 26)
  Test.assertEquals(duplicateCount(lowers+uppers), 26, "should ignore case")
  
  var rnd = function(x){ return ~~(Math.random()*x) };
  
  console.log("Random tests");
  for( var t=0, times=5+rnd(4); t<times; t++ ){
    var len = 3+rnd(5), i=len+1, str = lowers.slice(0,len*2);
    if( rnd(100)<70 ){
      while( i-- ) str += ([lowers,uppers][rnd(2)]).slice(0,i);
    }else{
      str += lowers.slice(-len);
      len = 0;
    }
    console.log("> "+str+" ?")
    Test.assertEquals(duplicateCount(str),len)
  }
})
```

# Solution
```
function duplicateCount(text){
  return (text.toLowerCase().split('').sort().join('').match(/([^])\1+/g) || []).length;
}
```

```
function duplicateCount(text){
  return text.toLowerCase().split('').filter(function(val, i, arr){
    return arr.indexOf(val) !== i && arr.lastIndexOf(val) === i;
  }).length;
}
```
