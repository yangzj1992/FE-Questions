# Description
[http://www.codewars.com/kata/554b4ac871d6813a03000035/train/javascript](http://www.codewars.com/kata/554b4ac871d6813a03000035/train/javascript)
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

Example:
```
highAndLow("1 2 3 4 5"); // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"
```
Notes:

- All numbers are valid Int32, no need to validate them.
- There will always be at least one number in the input string.
- Output string must be two numbers separated by a single space, and highest number is first.

# Test Cases
```
Test.assertEquals(highAndLow("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"), "542 -214");
Test.assertEquals(highAndLow("1 -1"), "1 -1");
Test.assertEquals(highAndLow("1 1"), "1 1");

```
# Solution
```
function highAndLow(numbers){
  var arr =numbers.split(' ');
  var max = arr[0],min =arr[0];
  for(var i = 0;i<arr.length;i++){
    if(parseInt(arr[i]) > max){
      max = arr[i];
    }
    if(parseInt(arr[i]) < min){
      min = arr[i]
    }
  }
  var result = max + ' ' + min;
  return result;
}
```

```
function highAndLow(numbers){
  numbers = numbers.split(' ').map(Number);
  return Math.max.apply(0, numbers) + ' ' + Math.min.apply(0, numbers);
}

```