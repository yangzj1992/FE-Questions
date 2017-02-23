# Description
[https://www.codewars.com/kata/5508249a98b3234f420000fb/train/javascript](https://www.codewars.com/kata/5508249a98b3234f420000fb/train/javascript)

The action of a Caesar cipher is to replace each plaintext letter with a different one a fixed number of places up or down the alphabet.

This program performs a variation of the Caesar shift. The shift increases by 1 for each character (on each iteration).

If the shift is initially 1, the first character of the message to be encoded will be shifted by 1, the second character will be shifted by 2, etc...

### Coding: Parameters and return of function "movingShift"

param s: a string to be coded

param shift: an integer giving the initial shift

The function "movingShift" first codes the entire string and then returns an array of strings containing the coded string in 5 parts (five parts because, to avoid more risks, the coded message will be given to five runners, one piece for each runner).

If possible the message will be evenly split between the five runners; if not possible, parts 1, 2, 3, 4 will be longer and part 5 shorter. The fifth part can have length equal to the other ones or shorter. If there are many options of how to split, choose the option where the fifth part has the longest length, provided that the previous conditions are fulfilled. If the last part is the empty string this empty string must be shown in the resulting array.

For example, if the coded message has a length of 17 the five parts will have lengths of 4, 4, 4, 4, 1. The parts 1, 2, 3, 4 are evenly split and the last part of length 1 is shorter. If the length is 16 the parts will be of lengths 4, 4, 4, 4, 0. Parts 1, 2, 3, 4 are evenly split and the fifth runner will stay at home since his part is the empty string.

You will also implement a "demovingShift" function with two parameters

### Decoding: parameters and return of function "demovingShift"

1) an array of strings: s (possibly resulting from "movingShift", with 5 strings)

2) an int shift

"demovingShift" returns a string.

### Example:

u = "I should have known that you would have a perfect answer for me!!!"

`movingShift(u, 1)` returns :

v = ["J vltasl rlhr ", "zdfog odxr ypw", " atasl rlhr p ", "gwkzzyq zntyhv", " lvz wp!!!"]

(quotes added in order to see the strings and the spaces, your program won't write these quotes, see Example Test Cases)

and `demovingShift(v, 1)` returns u.

Ref:

Caesar Cipher : [http://en.wikipedia.org/wiki/Caesar_cipher](http://en.wikipedia.org/wiki/Caesar_cipher)

# Test Cases
```
var u = "I should have known that you would have a perfect answer for me!!!"
var v = ["J vltasl rlhr ", "zdfog odxr ypw", " atasl rlhr p ", "gwkzzyq zntyhv", " lvz wp!!!"]
Test.assertSimilar(movingShift(u, 1), v)
Test.assertSimilar(demovingShift(v, 1), u)
var u = "O CAPTAIN! my Captain! our fearful trip is done;"
Test.assertSimilar(demovingShift(movingShift(u, 1), 1), u)
var u = "For you bouquets and ribbon'd wreaths--for you the shores a-crowding;"
Test.assertSimilar(demovingShift(movingShift(u, 1), 1), u)
var u = "Exult, O shores, and ring, O bells! But I, with mournful tread, Walk the deck my Captain lies, Fallen cold and dead. "
Test.assertSimilar(demovingShift(movingShift(u, 1), 1), u)
var u = "As human beings, when we encounter a challenge, we have freedom to choose how to react."
Test.assertSimilar(demovingShift(movingShift(u, 1), 1), u)
var u = "Every decision that we make leads us down a different road."
var v = ["Fxhvd kmlsdu", "bb jysm ra k", "zkf oifjz dc", " pbkc r wcab", "bpdnu usfj."]
Test.assertSimilar(movingShift(u, 1), v)
Test.assertSimilar(demovingShift(v, 1), u)
var u = "How can we become the kind of people that face our fear and do it anyway?"
var v = ["Iqz hgu fo nrqd", "cv mbz hgmd qi ", "ukvxuo fuoi wsv", "y krp ffcu ftk ", "my ug pdpots?"]
Test.assertSimilar(movingShift(u, 1), v)
Test.assertSimilar(demovingShift(v, 1), u)

//-----------------------

Test.assertSimilar(
    movingShift(" uoxIirmoveNreefckgieaoiEcooqo", 2), 
    [' xscOp', 'zvygqA', 'ftuwud', 'adaxmh', 'Edqrut'])
Test.assertSimilar(
    movingShift("uaoQop jx eh osr okaKv vzagzwpxagokBKriipmc U", 2), 
    ['wdsVuw sh', ' qu dii h', 'evGs uzbi', 'caudhoxuM', 'Wewxfdu O'])
Test.assertSimilar(
    movingShift("kgpiqislyhvmffdzlyehjiIteAaaotcoapk bbMgaHlda", 2), 
    ['mjtnwpaui', 'shztutqdr', 'ycffGseBc', 'dsyiviyu ', 'noAvqYdwu'])
Test.assertSimilar(
    movingShift("abcdefghjuty", 1), ["bdf", "hjl", "nps", "eek", ""])
Test.assertSimilar(
    movingShift("abcdefghjuty1234", 1), ["bdfh", "jlnp", "seek", "1234", ""])

//-----------------------

//-----------------------

Test.assertSimilar(
    demovingShift([' xscOp', 'zvygqA', 'ftuwud', 'adaxmh', 'Edqrut'], 2), " uoxIirmoveNreefckgieaoiEcooqo")
Test.assertSimilar(
    demovingShift(['wdsVuw sh', ' qu dii h', 'evGs uzbi', 'caudhoxuM', 'Wewxfdu O'], 2), "uaoQop jx eh osr okaKv vzagzwpxagokBKriipmc U")
Test.assertSimilar(
    demovingShift(['mjtnwpaui', 'shztutqdr', 'ycffGseBc', 'dsyiviyu ', 'noAvqYdwu'], 2), "kgpiqislyhvmffdzlyehjiIteAaaotcoapk bbMgaHlda")

//-----------------------
```

# Solution

```
var upAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', downAlpha = 'abcdefghijklmnopqrstuvwxyz';
function movingShift(s, dist) {return split(shift(s, dist, 1));}
function demovingShift(arr, dist) {return shift(arr.join(''), -dist, -1);}

function shift(s, dist, step) {
  return s.split('').map(function(v, i) {
    var upI = upAlpha.indexOf(v), downI = downAlpha.indexOf(v);
    if(upI == -1 && downI == -1) return v;
    if(upI > -1) var lib = upAlpha, libI = upI;
    else var lib = downAlpha, libI = downI;
    var loc = (i * step + libI + dist) % 26;
    loc = loc >= 0 ? loc : 26 + loc;
    return lib[loc];
  }).join('');
}

function split(s) {
  var sz = Math.ceil(s.length / 5);
  return [s.slice(0, sz), s.slice(sz, sz * 2), s.slice(sz * 2, sz * 3), s.slice(sz * 3, sz * 4), s.slice(sz * 4)];
}

```

```
function movingShift(s, shift) {
    let length = s.length;
    let fLength, sLength
    for(var i = Math.floor(length / 4); i > 0; i--){
      fLength = length - 4 * i;
      if(fLength > i){
        break;
      }
    }
    sLength = i + 1;
    fLength = length - 4 * sLength;
    let str = '',result = [];
    for(let j = 0;j < s.length;j++){
      if((s[j].charCodeAt() >= 65 && s[j].charCodeAt() <= 90) || (s[j].charCodeAt() >= 97 && s[j].charCodeAt() <= 122)){
        let value = s[j].charCodeAt() + shift + j;
        if((s[j].charCodeAt() >= 65 && s[j].charCodeAt() <= 90) && value > 90){
          let rest = Math.floor((value - 65) / 26);
          str += String.fromCharCode(value - rest * 26);
        }else if((s[j].charCodeAt() >= 97 && s[j].charCodeAt() <= 122) && value > 122){
          let rest = Math.floor((value - 97) / 26);
          str += String.fromCharCode(value - rest * 26);
        }else{
          str += String.fromCharCode(value);
        }
      }else{
        str += s[j];
      }
    }
    for(let k = 0;k < 4;k++){
      result.push(str.slice(sLength * k, sLength * (k + 1)));
    }
    result.push(str.slice(sLength * 4));
    return result;
}

function demovingShift(arr, shift) {
    let str = '';
    let step = 0;
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        if((arr[i][j].charCodeAt() >= 65 && arr[i][j].charCodeAt() <= 90) || (arr[i][j].charCodeAt() >= 97 && arr[i][j].charCodeAt() <= 122)){
          let value = arr[i][j].charCodeAt() - shift - step;
          if((arr[i][j].charCodeAt() >= 65 && arr[i][j].charCodeAt() <= 90) && value < 65){
            let rest = Math.ceil((65 - value) / 26);
            str += String.fromCharCode(value + rest * 26);
          }else if((arr[i][j].charCodeAt() >= 97 && arr[i][j].charCodeAt() <= 122) && value < 97){
            let rest = Math.ceil((97 - value) / 26);
            str += String.fromCharCode(value + rest * 26);
          }else{
            str += String.fromCharCode(value);
          }
          step++;
        }else{
          str += arr[i][j];
          step++;
        }
      }
    }
    return str;
}
```
