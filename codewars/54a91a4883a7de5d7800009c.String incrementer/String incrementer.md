# Description
[https://www.codewars.com/kata/56a4872cbb65f3a610000026/train/javascript](https://www.codewars.com/kata/56a4872cbb65f3a610000026/train/javascript)

Your job is to write a function which increments a string, to create a new string. If the string already ends with a number, the number should be incremented by 1. If the string does not end with a number the number 1 should be appended to the new string.

Examples:

`foo -> foo1`

`foobar23 -> foobar24`

`foo0042 -> foo0043`

`foo9 -> foo10`

`foo099 -> foo100`

Attention: If the number has leading zeros the amount of digits should be considered.

# Test Cases

```
Test.assertEquals(incrementString("foobar000"), "foobar001");
Test.assertEquals(incrementString("foobar999"), "foobar1000");
Test.assertEquals(incrementString("foobar00999"), "foobar01000");
Test.assertEquals(incrementString("foo"), "foo1");
Test.assertEquals(incrementString("foobar001"), "foobar002");
Test.assertEquals(incrementString("foobar1"), "foobar2");
Test.assertEquals(incrementString("1"), "2");
Test.assertEquals(incrementString("009"), "010");
```

# Solution

``` js
function incrementString(input) {
  if(isNaN(parseInt(input[input.length - 1]))) return input + '1';
  return input.replace(/(0*)([0-9]+$)/, function(match, p1, p2) {
    var up = parseInt(p2) + 1;
    return up.toString().length > p2.length ? p1.slice(0, -1) + up : p1 + up;
  });
}
```

``` js
function incrementString (string) {
  const strNum = string.match(/\d+$/);
  const zeroPad = (n) => {
    const oldNumLength = String(strNum).length;
    const newNumLength = String(n).length;

    if( oldNumLength > newNumLength ){
      return '0'.repeat(oldNumLength - newNumLength) + n;
    }else{
      return n;
    }
  }

  return strNum ? string.replace(strNum, zeroPad(+strNum + 1)) : string + 1;
}
```
