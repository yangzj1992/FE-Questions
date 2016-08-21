# Description
[https://www.codewars.com/kata/523a86aa4230ebb5420001e1/train/javascript](https://www.codewars.com/kata/523a86aa4230ebb5420001e1/train/javascript)

What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:
```
'abba' & 'baab' == true

'abba' & 'bbaa' == true

'abba' & 'abbba' == false
```
Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:
```
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
```


# Test Cases
```
Array.prototype.compare = function (array) {
  if (!array) return false;
  if (this.length != array.length) return false;

  for (var i = 0; i < this.length; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].compare(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}

function testAnagrams(word, result, wrong) {
  var results = anagrams(word, result.concat(wrong).sort());
  return results.sort().compare(result.sort());
}

var word0, result0, wrong0;
word0 = 'a';
result0 = ['a'];
wrong0 = ['b', 'c', 'd'];
Test.expect(testAnagrams(word0, result0, wrong0));

var word1, result1, wrong1;
word1 = 'ab'
result1 = ['ab', 'ba'];
wrong1 = ['aa', 'bb', 'cc', 'ac', 'bc', 'cd'];
Test.expect(testAnagrams(word1, result1, wrong1));

var word2, result2, wrong2;
word2 = 'abba';
result2 = ['aabb', 'bbaa', 'abab', 'baba', 'baab'];
wrong2 = ['abcd', 'abbba', 'baaab', 'abbab', 'abbaa', 'babaa'];
Test.expect(testAnagrams(word2, result2, wrong2));

var word3, result3, wrong3;
word3 = 'racer'
result3 = ['carer', 'arcre', 'carre']
wrong3 = ['racers', 'arceer', 'raccer', 'carrer', 'cerarr']
Test.expect(testAnagrams(word2, result2, wrong2));

var word4, result4, wrong4;
word4 = 'big'
result4 = [];
wrong4 = ['gig', 'dib', 'bid', 'biig'];
Test.expect(testAnagrams(word4, result4, wrong4));

```

# Solution

```
function anagrams(word, words) {
  return words.filter(function(item){
    return item.split('').sort().join('') === word.split('').sort().join('');
  });
}
```
