# Description
[https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript](https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript)

Snail Sort

Given an `n x n` array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.
```
array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
```
For better understanding, please follow the numbers of the next array consecutively:
```
array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
```
This image will illustrate things more clearly:

![](http://www.haan.lu/files/2513/8347/2456/snail.png)

NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as `[[]]`


# Test Cases
```
test([[]], []);

test([[1]], [1]);

test([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 3, 6, 9, 8, 7, 4, 5]);

test([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]], [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);

test([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
```
# Solution

```
snail = function(array) {
  var result;
  while (array.length) {
    // Steal the first row.
    result = (result ? result.concat(array.shift()) : array.shift());
    // Steal the right items.
    for (var i = 0; i < array.length; i++)
      result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--)
      result.push(array[i].shift());
  }
  return result;
}
```

```
snail = function(array) {
  var line = array.length;
  var row = line;
  var result = [];
  if(line == 1){
   return array[0]
  }else{
    circle(array);
  }
  return result;
  
  function circle(array){
    if(row > 1){
       for(var i = 0;i < row;i++){
         result.push(array[0][i]);
       }
       for(var j = 1;j < line;j++){
         result.push(array[j][line-1]);
         array[j].splice(line-1,1);
       }
       row --;line --;
       array.splice(0,1);
    }else{
       result.push(array[0]);    
    }
    if(row > 1){
       for(var k = row;k > 0;k--){
         result.push(array[row-1][k-1]);
       }
       for(var l = line - 1;l > 0;l--){
         result.push(array[l-1][0]);
         array[l-1].splice(0,1);
       }
       row--;line--;
       array.splice(row,1);
    }else{
       result.push(array[0]);
    }
    if(row > 1){
      circle(array);
    }
  }
}
```