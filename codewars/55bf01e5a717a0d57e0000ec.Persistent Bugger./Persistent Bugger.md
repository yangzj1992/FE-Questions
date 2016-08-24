# Description
[https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec/train/javascript](https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec/train/javascript)

Write a function, `persistence`, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in `num` until you reach a single digit.

For example:
```
 persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2

 persistence(4) === 0 // because 4 is already a one-digit number
```

# Test Cases
```
describe('Initial Tests', function () {
  Test.assertEquals(persistence(39),3);
  Test.assertEquals(persistence(4),0);
  Test.assertEquals(persistence(25),2);
  Test.assertEquals(persistence(999),4);
});

```
# Solution

```
function persistence(num) {
   var times = 0;
   
   num = num.toString();
   
   while (num.length > 1) {
     times++;
     num = num.split('').map(Number).reduce((a, b) => a * b).toString();
   }
   
   return times;
}
```

```
function persistence(num) {
   var time = 0;
   function multi_recur(int){
     var str = int + '';
     var arr = str.split('');
     res = arr.reduce(function(pre,cur){
       return pre * cur
     });
     time += 1;
     if(String(res).length != 1){
       multi_recur(res);
     }
   }
   if(String(num).length != 1){
     multi_recur(num);
   }else{
     return 0;
   }
   return time;
}
```