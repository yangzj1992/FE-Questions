# Description
[https://www.codewars.com/kata/57eae20f5500ad98e50002c5/train/javascript](https://www.codewars.com/kata/57eae20f5500ad98e50002c5/train/javascript)

Simple, remove the spaces from the string, then return the resultant string.

# Test Cases
```
Test.describe("Basic tests",_=>{
Test.assertEquals(noSpace('8 j 8   mBliB8g  imjB8B8  jl  B'), '8j8mBliB8gimjB8B8jlB');
Test.assertEquals(noSpace('8 8 Bi fk8h B 8 BB8B B B  B888 c hl8 BhB fd'), '88Bifk8hB8BB8BBBB888chl8BhBfd'); 
Test.assertEquals(noSpace('8aaaaa dddd r     '), '8aaaaaddddr'); 
Test.assertEquals(noSpace('jfBm  gk lf8hg  88lbe8 '), 'jfBmgklf8hg88lbe8'); 
Test.assertEquals(noSpace('8j aam'), '8jaam'); 
})

Test.describe("Random tests",_=>{
const randint=(a,b)=>~~(Math.random()*(b-a+1))+a;
function mynoSpace(x){return x.split(' ').join('')}
var names=["a","b","c","d","e","f","g","h","i","j","k","l","m","n", "o", "P", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", " ", " ", " ", " ", " "];

for (var i=0;i<100;i++){
  var x=[],len=randint(1,30);
  for (var k=0;k<len;k++) x.push(names[randint(0,names.length-1)]);
  x=x.join('');
  
  Test.it(`Testing for ${x}`,_=>{
  Test.assertEquals(noSpace(x),mynoSpace(x),"It should work for random inputs too");
  })
}
})
```

# Solution

``` js
function noSpace(x){
  return x.replace(/\s/g, '');
}
```

``` js
function noSpace(x){return x.split(' ').join('')}
```