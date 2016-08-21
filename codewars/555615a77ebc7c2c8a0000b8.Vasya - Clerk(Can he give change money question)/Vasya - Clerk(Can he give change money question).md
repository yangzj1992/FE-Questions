# Description
[http://www.codewars.com/kata/555615a77ebc7c2c8a0000b8/train/javascript](http://www.codewars.com/kata/555615a77ebc7c2c8a0000b8/train/javascript)
The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollars bill. A "Avengers" ticket costs 25 dollars.

Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.

Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the tickets strictly in the order people follow in the line?

Return YES, if Vasya can sell a ticket to each person and give the change. Otherwise return NO.

Examples:
```
// === JavaScript ==

tickets([25, 25, 50]) // => YES 
tickets([25, 100])    
        // => NO. Vasya will not have enough money to give change to 100 dollars
```

# Test Cases
```
Test.assertEquals(tickets([25, 25, 50, 50]), "YES");
Test.assertEquals(tickets([25, 100]), "NO");
Line = 25,25,25,100,25,25,25,100,25,50,25,100 - Expected: YES
Line = 25,25,50,100,25,25,50,100,25,25,25,100 - Expected: YES
Line = 25,50,25,100,25,25,50,100,25,50,25,100,25,50,25,100,25,25,25,100 - Expected: YES
Line = 25,25,50,100,25,25,50,100,25,25,25,100,25,25,50,100,25,25,25,100,25,50,50,25 - Expected: NO
Line = 25,25,50,100,25,50,25,100,25,25,50,100,25,50,50,25 - Expected: NO
Line = 25,50,25,100,25,50,25,100,25,25,25,100,25,25,50,100,25,25,25,100 - Expected: YES
Line = 25,25,50,100,25,50,25,100,25,25,50,100 - Expected: YES
Line = 25,25,25,100,25,50,25,100,25,25,25,100,25,25,25,100 - Expected: YES
Line = 25,25,50,100,25,25,50,100,25,50,25,100,25,50,25,100,100,25 - Expected: NO
Line = 25,25,25,100,25,25,25,100,25,25,50,100,50,100 - Expected: NO
Line = 25,50,25,100,25,50,25,100,25,50,25,100,25,50,25,100,25,25,25,100 - Expected: YES
Line = 25,50,25,100,25,25,25,100,25,25,50,100,25,25,50,100,25,25,25,100 - Expected: YES

```

# Solution

```
function tickets(peopleInLine){
  var a25 = 0,a50 = 0;
  for(var i = 0;i<peopleInLine.length;i++){
    if(peopleInLine[i] == 25){
      a25 += 1;
    }
    if(peopleInLine[i] == 50){
      a25 -= 1; a50 += 1;
    }
    if(peopleInLine[i] == 100){
      if(a50 == 0 && a25 >= 3){
        a25 -= 3;
      }else{
        a25 -= 1; a50 -= 1;
      }
    }
    if(a25 < 0 || a50 < 0){
       return 'NO';
    }
  }
  return 'YES';
}
```