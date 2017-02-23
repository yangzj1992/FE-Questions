# Description
[https://www.codewars.com/kata/53dab6cece5f44b8ee00035d/train/javascript](https://www.codewars.com/kata/53dab6cece5f44b8ee00035d/train/javascript)

In some programming languages, `strings` internally are implemented like an `array of chars`

This allows things like this:

    function isVowel(char) {
      return char.match(/^[aeiouAEIOU]$/) != null;
    }

    "abcefghijk".map(function(char) {
      if (isVowel(char)) {
        return char.toUpperCase();
      } else {
        return char;
      }
    }); //AbcEfghIjk

I mean, we can apply the array methods to strings.

Sadly, in JavaScript, there is no a `Char` type, and strings do not have most of the methods of arrays.

The objective of this kata is to add to the `String.prototype` the next `Array.prototype` methods:

*   [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
*   [Array.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
*   [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
*   [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
*   [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
*   [Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
*   [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
*   [Array.prototype.reduceRight()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)
*   [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
*   [Array.prototype.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

You probably will miss some methods. The reason is that I have only included methods that satisfy these two conditions:

*   There is no already a method for `String class` with that name. For example `indexOf()` exists in `Array.prototype` and in `String.prototype`.
*   Since strings are immutable in JavaScript, the method must not modify the array. For example `splice()` mutates the array.

Surprisingly `sort()` and `reverse()` really mutate the array, but fortunately also return the mutated array, so there is no biggest problem at implementing them.

We could still do something with the mutable methods in `Array.prototype`. Although as we have said, in JavaScript arrays are mutable but strings are not, we can do that mutable methods return the resulting string instead the value that actually are returning the equivalent methods in the array.

For example:

    var arr = [1, 2];
    arr.push(4); // returns 3 <- array size
    //arr -> [1,2,4]; // mutated

    "Hello".push(" Peter"); // "Hello Peter" <- new string instead string size (11)

    arr.pop(); //4 <- Last element
    //arr -> [1,2] <- mutated

    "Hello".pop(); // "Hell" <- new string without the last element

You have to implement these mutable methods too:

*   [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
*   [Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
*   [Array.prototype.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
*   [Array.prototype.unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
*   [Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

# Test Cases
```
Test.describe("Test stringSuperPower", function() {
    
    function isVowel(char) {
      return char.match(/^[aeiouAEIOU]$/) != null;
    }
    
    Test.it("Test immutable array methods", function() {
      
      Test.assertEquals("abcefghijk".map(v => v), "abcefghijk");
      
      Test.assertEquals("abcefghijk".map(function(char) {
        if (isVowel(char)) {
          return char.toUpperCase();
        } else {
          return char;
        }
      }), "AbcEfghIjk", "Test map function");
       
      Test.assertEquals("Hello".join(""), "Hello",  "Test join function using empty seperator");
      
      Test.assertEquals("Hello".join(","), "H,e,l,l,o",  "Test join function");
      
      Test.assertEquals("Hello".concat(""), "Hello",  "Test concat function using empty string");
      
      Test.assertEquals("Hello".concat(" Peter"), "Hello Peter",  "Test concat function");
      
      Test.assertEquals("".reverse(), "",  "Test reverse function using empty string");
      
      Test.assertEquals("Hello".reverse(), "olleH",  "Test reverse function");
      
      Test.assertEquals("".sort(), "",  "Test sort function using empty string");
      
      Test.assertEquals("qwerty".sort(), "eqrtwy",  "Test sort function");
      
      Test.assertEquals("abcefghijki".filter(_ => true), "abcefghijki",  "Test filter function using always true filter");
      
      Test.assertEquals("abcefghijki".filter(_ => false), "",  "Test filter function using always false filter");
      
      Test.assertEquals("abcefghijki".filter(isVowel), "aeii",  "Test filter function");
      
      "abcefghijk".forEach(function(char, index) {
        Test.assertEquals(char, "abcefghijk"[index], "Test forEach function");
      });
      
      Test.assertEquals("abcefghijki".some(_ => true), true, "Test some function using true function");
      Test.assertEquals("abcefghijki".some(_ => false), false, "Test some function using false function");
      
      Test.assertEquals("abcefghijki".some(isVowel), true, "Test some function");
      
      Test.assertEquals("abcefghijki".every(_ => true), true, "Test every function using true function");
      Test.assertEquals("abcefghijki".every(_ => false), false, "Test every function using false function");
      
      
      Test.assertEquals("abcefghijki".every(isVowel), false, "Test every function");
      
      Test.assertEquals("abcefghijk".reduce(function(ac, char) {
        if (isVowel(char)) {
          return ac + 1;
        } else {
          return ac;
        }
      }, 0), 3, "Test reduce function");
      
      Test.assertEquals("abcefghijk".reduceRight(function(ac, char) {
        if (isVowel(char)) {
          return ac + char;
        } else {
          return ac;
        }
      }, ''), "iea", "Test reduceRight function");
      
    });
    
    Test.it("Test mutable array methods", function() {
    
      Test.assertEquals("".push("Hello"), "Hello",  "Test push function");
      Test.assertEquals("Hello".push(" Peter"), "Hello Peter",  "Test push function");
      Test.assertEquals("Hello".pop(), "Hell",  "Test pop function");
      Test.assertEquals("Hello".shift(), "ello",  "Test shift function");
      Test.assertEquals("ello".unshift('H'), "Hello",  "Test unshift function");
      Test.assertEquals("Hello Peter".splice(6, 5, 'John'), "Hello John",  "Test splice function");
    });
    
});
```

# Solution
```
String.prototype.toArray = function() {
  return this.split("");
};
String.prototype.map = function(callback) {
  return this.toArray().map(callback).join("");
};
String.prototype.join = function(callback) {
  return this.toArray().join(callback);
};
String.prototype.filter = function(callback) {
  return this.toArray().filter(callback).join("");
};
String.prototype.forEach = function(callback) {
  return this.toArray().forEach(callback);
};
String.prototype.some = function(callback) {
  return this.toArray().some(callback);
};
String.prototype.every = function(callback) {
  return this.toArray().every(callback);
};
String.prototype.reduce = function() {
  return this.toArray().reduce.apply(this, arguments);
};
String.prototype.reduceRight = function() {
  return this.toArray().reduceRight.apply(this, arguments);
};
String.prototype.sort = function(callback) {
  return this.toArray().sort(callback).join("");
};
String.prototype.reverse = function() {
  return this.toArray().reverse().join("");
};
String.prototype.push = function(str) {
  return this + str;
};
String.prototype.pop = function(str) {
  return this.substring(0, this.length - 1);
};
String.prototype.shift = function() {
  return this.substring(1);
};
String.prototype.unshift = function(str) {
  return str + this;
};
String.prototype.splice = function() {
  var arr = this.toArray();
  arr.splice.apply(arr, arguments);
  return arr.join("");
};
```

```
String.prototype.map = function(f) {
  return this.split("").map(f).join("");
};

String.prototype.join = function(sep) {
  return this.split("").join(sep);
};

String.prototype.filter = function(f) {
  return this.split("").filter(f).join("");
};

String.prototype.forEach = function(f) {
  this.split("").forEach(f);
};

String.prototype.some = function(f) {
  return this.split("").some(f);
};

String.prototype.every = function(f) {
  return this.split("").every(f);
};

String.prototype.reduce = function(f, v) {
  return this.split("").reduce(f, v);
};

String.prototype.reduceRight = function(f, v) {
  return this.split("").reduceRight(f, v);
};

String.prototype.sort = function(f) {
  return this.split("").sort(f).join("");
};

String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

String.prototype.push = function(v) {
  var x = this.split("");
  x.push(v);
  return x.join("");
};

String.prototype.pop = function() {
  var x = this.split("");
  x.pop();
  return x.join("");
};

String.prototype.shift = function() {
  var x = this.split("");
  x.shift();
  return x.join("");
};

String.prototype.unshift = function(v) {
  var x = this.split("");
  x.unshift(v);
  return x.join("");
};

String.prototype.splice = function(...args) {
  var x = this.split("");
  x.splice(...args);
  return x.join("");
};
```
