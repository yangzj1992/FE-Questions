# Description
[https://www.codewars.com/kata/56a4872cbb65f3a610000026/train/javascript](https://www.codewars.com/kata/56a4872cbb65f3a610000026/train/javascript)

Take a number: `56789`. Rotate left, you get `67895`.

Keep the first digit in place and rotate left the other digits: `68957`.

Keep the first two digits in place and rotate the other ones: `68579`.

Keep the first three digits and rotate left the rest: `68597`. Now it is over since keeping the first four it remains only one digit which rotated is itself.

You have the following sequence of numbers:

`56789 -> 67895 -> 68957 -> 68579 -> 68597`

and you must return the greatest: `68957`.

Calling this function `max_rot` (or `maxRot` or ... depending on the language)

`max_rot(56789) should return 68957`


# Test Cases
```
function testing(actual, expected) {
    Test.assertEquals(actual, expected)
}

Test.describe("maxRot",function() {
Test.it("Basic tests",function() { 
    testing(maxRot(38458215), 85821534);
    testing(maxRot(195881031), 988103115);
    testing(maxRot(896219342), 962193428);
    testing(maxRot(69418307), 94183076);
    testing(maxRot(257117280), 571172802);
    testing(maxRot(240522578), 452782025);
    testing(maxRot(561656824), 666824515);
    testing(maxRot(672963486), 796348662);
    testing(maxRot(48192242), 89242412);
    testing(maxRot(25053359), 55392035);
    testing(maxRot(785727925), 877925752);
    testing(maxRot(275076894), 750768942);
    testing(maxRot(507992495), 507992495);
    testing(maxRot(461358517), 638517415);
    testing(maxRot(563692037), 669203753);
    testing(maxRot(159043701), 590437011);
    testing(maxRot(896304934), 963049348);
    testing(maxRot(273293210), 732932102);
    testing(maxRot(451496516), 549651641);
    testing(maxRot(1), 1);
})})

Test.describe("Random tests",function() {

    function randint(a, b) { 
        return Math.floor(Math.random() * (b - a + 1) + a); 
    }

    function maxRotSOLab(n) {
      var s = n.toString(), res = "", mx = +n;
      if (s.length === 1) return n;
      while (true) {
        for (var i = 0; i< s.length; ++i){ var r = s.substring(1) + s.charAt(0); };
        s = r;
        res += s[0];
        s = s.substring(1);
        var nb = parseInt(res + s);
        if (nb > mx) mx = nb;
        if (s.length === 1) break;
      }
      return mx;
    }    

    for (var i = 0; i < 200; i++) {
        var rnd = randint(100000,1000000000);
        var r = maxRotSOLab(rnd);
        testing(maxRot(rnd), r);
    }
    
})
```

# Solution

``` js
function maxRot(n) {
    var str = n.toString();
    var arr = [str];
    for (var i=0;i<=str.length-1 ;i++){
        str = str.slice(0,i)+str.slice(i+1)+str[i];
        arr.push(str.split().join());
    }
    return Math.max.apply(null, arr);
}
```

``` js
function maxRot(n) {
  let arr = [n];
  let len = (n + '').length;
  function cycle(item, time){
    let str = (item + '').split('');
    let tArr = str.slice(0, time - 1).concat(str.slice(time));
    tArr.push(str[time - 1]);
    let num = Number(tArr.join(''));
    arr.push(num)
    time++;
    if(time <= len -1){
      cycle(num, time);
    }
  }
  cycle(n, 1);
  return Math.max.apply(0, arr);
}
```
