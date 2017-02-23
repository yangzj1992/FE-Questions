# Description
[https://www.codewars.com/kata/5656b6906de340bd1b0000ac/solutions/javascript](https://www.codewars.com/kata/5656b6906de340bd1b0000ac/solutions/javascript)

Take 2 strings `s1` and `s2` including only letters from `a`to `z`. Return a new **sorted** string, the longest possible, containing distinct letters, - each taken only once - coming from s1 or s2.

# Examples:

    a = "xyaabbbccccdefww"
    b = "xxxxyyyyabklmopq"
    longest(a, b) -> "abcdefklmopqwxy"

    a = "abcdefghijklmnopqrstuvwxyz"
    longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"

# Test Cases
```
Test.describe("longest",function() {
Test.it("Basic tests",function() {
    Test.assertEquals(longest("aretheyhere", "yestheyarehere"), "aehrsty")
    Test.assertEquals(longest("loopingisfunbutdangerous", "lessdangerousthancoding"), "abcdefghilnoprstu")
    Test.assertEquals(longest("inmanylanguages", "theresapairoffunctions"), "acefghilmnoprstuy")
    Test.assertEquals(longest("lordsofthefallen", "gamekult"), "adefghklmnorstu")
    Test.assertEquals(longest("codewars", "codewars"), "acdeorsw")
    Test.assertEquals(longest("agenerationmustconfrontthelooming", "codewarrs"), "acdefghilmnorstuw")
})})

Test.describe("Random tests",function() {

    function randint(a, b) { 
        return Math.floor(Math.random() * (b - a + 1) + a); 
    }
    function longestSol(s1, s2) {
      var alpha_s1 = Array(27).join(1).split('').map(function(){return 0;});
      var alpha_s2 = Array(27).join(1).split('').map(function(){return 0;});
      var l1 = s1.length; var l2 = s2.length; var res = ""; 
      var i = 0; var c = 0;
      for(i = 0; i < l1; i++) {
        c = s1.charCodeAt(i);
        if (c >= 97 && c <= 122)
          alpha_s1[c - 97]++;
      }
      for(i = 0; i < l2; i++) {
        c = s2.charCodeAt(i);
        if (c >= 97 && c <= 122)
          alpha_s2[c - 97]++;
      }
      for(i = 0; i < 26; i++) {
        if (alpha_s1[i] !== 0) {
          res += String.fromCharCode(i + 97);
          alpha_s2[i] = 0;
        }
      }
      for(i = 0; i < 26; i++) {
        if (alpha_s2[i] !== 0)
          res += String.fromCharCode(i + 97);
      }
      return res.split("").sort().join("");
    }
    //................
    function doEx(k) {
      var i = 0, res = "";
      while (i < 15) {
        var sm = String.fromCharCode(randint(97+k, 122));
        for (var j = 0; j < randint(1, 5); j++)
            res += sm;
        i++;
      }
      return res;
    }    
    //................
    for (var i = 0; i < 200; i++) {
        var s1 = doEx(randint(0, 10));
        var s2 = doEx(randint(0, 8))
        Test.it("Testing longest: ", function() {
            Test.assertEquals(longest(s1, s2), longestSol(s1, s2),"It should work for random tests too")
        }
    )}
})
```
# Solution
```
const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('')
```
