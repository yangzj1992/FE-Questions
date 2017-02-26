# Description
[https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/javascript](https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/javascript)

This time we want to write calculations using functions and get the results. Let's have a look at some examples:

    seven(times(five())); // must return 35
    four(plus(nine())); // must return 13
    eight(minus(three())); // must return 5
    six(dividedBy(two())); // must return 3

    seven(times(five)) # must return 35
    four(plus(nine)) # must return 13
    eight(minus(three)) # must return 5
    six(divided_by(two)) # must return 3

Requirements:

*   There must be a function for each number from 0 ("zero") to 9 ("nine")
*   There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (`divided_by` in Ruby)
*   Each calculation consist of exactly one operation and two numbers
*   The most outer function represents the left operand, the most inner function represents the right operand


# Test Cases
```
describe('static example calculations', function() {
  Test.assertEquals(seven(times(five())), 35);
  Test.assertEquals(four(plus(nine())), 13);
  Test.assertEquals(eight(minus(three())), 5);
  Test.assertEquals(six(dividedBy(two())), 3);
});

describe('random calculations', function() {
  var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  it('add', function() {
    for (var i=0; i<5; i++) {
      var num1 = Test.sample(numbers);
      var num2 = Test.sample(numbers);
      Test.assertEquals(eval(num1 + '(plus(' + num2 + '()))'), numbers.indexOf(num1) + numbers.indexOf(num2), 'Wrong result for ' + num1 + ' + ' + num2);
    }
  });
  
  it('subtract', function() {
    for (var i=0; i<5; i++) {
      var num1 = Test.sample(numbers);
      var num2 = Test.sample(numbers);
      Test.assertEquals(eval(num1 + '(minus(' + num2 + '()))'), numbers.indexOf(num1) - numbers.indexOf(num2), 'Wrong result for ' + num1 + ' - ' + num2);
    }
  });
  
  it('multiply', function() {
    for (var i=0; i<5; i++) {
      var num1 = Test.sample(numbers);
      var num2 = Test.sample(numbers);
      Test.assertEquals(eval(num1 + '(times(' + num2 + '()))'), numbers.indexOf(num1) * numbers.indexOf(num2), 'Wrong result for ' + num1 + ' * ' + num2);
    }
  });
  
  it('divide', function() {
    for (var i=0; i<5; i++) {
      var num1 = Test.sample(numbers);
      var num2 = Test.sample(numbers);
      Test.assertSimilar(eval(num1 + '(dividedBy(' + num2 + '()))'), numbers.indexOf(num1) / numbers.indexOf(num2), 'Wrong result for ' + num1 + ' / ' + num2);
    }
  });
});
```

# Solution

``` js
const zero = c => c ? c(0) : 0;
const one = c => c ? c(1) : 1;
const two = c => c ? c(2) : 2;
const three = c => c ? c(3) : 3;
const four = c => c ? c(4) : 4;
const five = c => c ? c(5) : 5;
const six = c => c ? c(6) : 6;
const seven = c => c ? c(7) : 7;
const eight = c => c ? c(8) : 8;
const nine = c => c ? c(9) : 9;

const plus = n => p => p + n;
const minus = n => p => p - n;
const times = n => p => p * n;
const dividedBy = n => p => p / n;
```
