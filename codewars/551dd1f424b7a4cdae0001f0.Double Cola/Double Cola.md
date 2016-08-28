# Description
[http://www.codewars.com/kata/551dd1f424b7a4cdae0001f0/train/javascript](http://www.codewars.com/kata/551dd1f424b7a4cdae0001f0/train/javascript)

Sheldon, Leonard, Penny, Rajesh and Howard are in the queue for a "Double Cola" drink vending machine; there are no other people in the queue. The first one in the queue (Sheldon) buys a can, drinks it and doubles! The resulting two Sheldons go to the end of the queue. Then the next in the queue (Leonard) buys a can, drinks it and gets to the end of the queue as two Leonards, and so on.

For example, Penny drinks the third can of cola and the queue will look like this:
```
Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
```
Write a program that will return the name of a man who will drink the n-th cola.

Note that in the very beginning the queue looks like that:
```
Sheldon, Leonard, Penny, Rajesh, Howard
```

## Input

The input data consist of an array which contains five names, and single integer n.
```
(1 ≤ n ≤ 1000000000).
```
Output / Examples

Return the single line — the name of the person who drinks the n-th can of cola. The cans are numbered starting from 1. Please note that you should spell the names like this: "Sheldon", "Leonard", "Penny", "Rajesh", "Howard" (without the quotes). In that order precisely the friends are in the queue initially.

```
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 1)=="Sheldon"
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52)=="Penny"
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 7230702951)=="Leonard"
```

# Test Cases
```
var names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"]
Test.describe("Example from description", function(){
r = 1
res = "Sheldon"
Test.assertEquals(whoIsNext(names, r), res)
r = 6
res = "Sheldon"
Test.assertEquals(whoIsNext(names, r), res)
r = 1802
res = "Penny"
Test.assertEquals(whoIsNext(names, r), res)
r = 2
res = "Leonard"
Test.assertEquals(whoIsNext(names, r), res)
r = 3
res = "Penny"
Test.assertEquals(whoIsNext(names, r), res)
r = 10
res = "Penny"
Test.assertEquals(whoIsNext(names, r), res)
r = 534
res = "Rajesh"
Test.assertEquals(whoIsNext(names, r), res)
r = 5033
res = "Howard"
Test.assertEquals(whoIsNext(names, r), res)
r = 10010
res = "Howard"
Test.assertEquals(whoIsNext(names, r), res)
r = 63
res = "Rajesh"
Test.assertEquals(whoIsNext(names, r), res)
r = 841
res = "Leonard"
Test.assertEquals(whoIsNext(names, r), res)
r = 3667
res = "Penny"
Test.assertEquals(whoIsNext(names, r), res)
r = 38614
res = "Howard"
Test.assertEquals(whoIsNext(names, r), res)
r = 1745
res = "Leonard"
Test.assertEquals(whoIsNext(names, r), res)
r = 1000000000
res = "Penny"
Test.assertEquals(whoIsNext(names, r), res)
r = 28643950
res = "Leonard"
Test.assertEquals(whoIsNext(names, r), res)
})

Test.describe("Random tests",function(){
var names=["Daisuke Aramaki","Motoko Kusanagi","Batou","Togusa","Ishikawa","Saito","Pazu","Borma","Azuma","Yano","Proto"]
function solution(names, r){
  x=Math.floor((r-1)/names.length+1).toString(2).length-1;
  return names[Math.floor((r-1-(Math.pow(2,x)-1)*names.length)/Math.pow(2,x))];
}
for (var _=0;_<40;_++){
  randexp=Math.ceil(Math.random()*9);
  pos=Math.ceil(Math.random()*Math.pow(10,randexp));
  Test.it("Testing for position number "+pos.toString(),function(){
  Test.assertEquals(whoIsNext(names,pos),solution(names,pos),"It should work for random inputs too");
  })
}
})

```

# Analyze 

rely on the law of 5,10,20,40 to circular permutation

index: 0 1 2 3 4 | 0 0 1 1 2 2 3 3 4 4 | 0 0 0 0 1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4

# Solution

```
function whoIsNext(names, r){
  if(r == 1){
    return "Sheldon"
  }
  var base = names.length;
  
  function getIndex(n, i) {
    i = i || base;
    if (n < i) {
        return Math.floor(n * base / i);
    }
    return getIndex(n - i, 2 * i);
  }
  
  return names[getIndex(r-1)];
  
}```

```
function whoIsNext(names, r) {
  var l = names.length;
  while (r >= l) { r -= l; l *= 2; }
  return names[Math.ceil(names.length * r / l)-1];
}
```
