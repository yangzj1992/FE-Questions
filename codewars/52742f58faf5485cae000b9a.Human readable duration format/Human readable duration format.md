# Description
[https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec/train/javascript](https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec/train/javascript)

Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns `"now"`. Otherwise, the duration is expressed as a combination of `years`, `days`, `hours`, `minutes` and `seconds`.

It is much easier to understand with an example:
```
  formatDuration(62)    // returns "1 minute and 2 seconds"
  formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"
```
Note that spaces are important.

Detailed rules

The resulting expression is made of components like `4 seconds`, `1 year`, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

The components are separated by a comma and a space `(", ")`. Except the last component, which is separated by `" and "`, just like it would be written in English.

A more significant units of time will occur before than a least significant one. Therefore, `1 second and 1 year` is not correct, but `1 year and 1 second` is.

Different components have different unit of times. So there is not repeated units like in `5 seconds and 1 second`.

A component will not appear at all if its value happens to be zero. Hence, `1 minute and 0 seconds` is not valid, but it should be just `1 minute`.

A unit of time must be used "as much as possible". It means that the function should not return `61 seconds`, but `1 minute and 1 second` instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

For the purpose of this Kata, a year is 365 days and a day is 24 hours.

# Test Cases
```
Test.assertEquals(formatDuration(0), "now");

Test.assertEquals(formatDuration(1), "1 second");
Test.assertEquals(formatDuration(62), "1 minute and 2 seconds");
Test.assertEquals(formatDuration(120), "2 minutes");
Test.assertEquals(formatDuration(3600), "1 hour");
Test.assertEquals(formatDuration(3662), "1 hour, 1 minute and 2 seconds");

Test.assertEquals(formatDuration(15731080), "182 days, 1 hour, 44 minutes and 40 seconds");
Test.assertEquals(formatDuration(132030240), "4 years, 68 days, 3 hours and 4 minutes");
Test.assertEquals(formatDuration(205851834), "6 years, 192 days, 13 hours, 3 minutes and 54 seconds");
Test.assertEquals(formatDuration(253374061), "8 years, 12 days, 13 hours, 41 minutes and 1 second");
Test.assertEquals(formatDuration(242062374), "7 years, 246 days, 15 hours, 32 minutes and 54 seconds");
Test.assertEquals(formatDuration(101956166), "3 years, 85 days, 1 hour, 9 minutes and 26 seconds");
Test.assertEquals(formatDuration(33243586), "1 year, 19 days, 18 hours, 19 minutes and 46 seconds");

```
# Solution

```
function formatDuration (seconds) {
    if (seconds === 0) return 'now';
    var years   = units(seconds, 31536000, "year"),
        days    = units(years.remainder, 86400, "day"),
        hours   = units(days.remainder, 3600, "hour"),
        minutes = units(hours.remainder, 60, "minute"),
        secs    = units(minutes.remainder, 1, "second");
    var arr = [years, days, hours, minutes, secs];
    arr = arr.filter(function(item){
      return !!item.value;
    });

    var result = arr[0].str;
    if ( arr.length === 1){return result;}

    for ( var i = 1; i < arr.length - 1; i++ ){
      result = result + ", " + arr[i].str;
    }
    result = result + " and " + arr[arr.length-1].str;
    return result;
  }  

  var units = function(numerator, divisor, unit){
    var result = {};
    result.value = Math.floor(numerator / divisor);
    result.remainder = numerator - result.value * divisor;
    if (result.value === 0){return result;}

    result.str  = ""+result.value+" "+unit;
    if (result.value > 1) result.str = result.str + "s";
    return result;
}

```