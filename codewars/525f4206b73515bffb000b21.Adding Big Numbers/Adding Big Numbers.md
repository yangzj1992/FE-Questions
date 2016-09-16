# Description
[http://www.codewars.com/kata/525f4206b73515bffb000b21/train/javascript](http://www.codewars.com/kata/525f4206b73515bffb000b21/train/javascript)

Description:

We need to sum big numbers and we require your help.

Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

Example
```
add("123", "321"); -> "444"
add("11", "99"); -> "110"
```
Notes

- The input numbers are big.
- The input is a string of only digits
- The numbers are positives



# Test Cases
```
Test.expect(add('91', '19') === '110');
Test.expect(add('123456789', '987654322') === '1111111111');
Test.expect(add('999999999', '1') === '1000000000');

sum = add('823094582094385190384102934810293481029348123094818923749817',
          '234758927345982475298347523984572983472398457293847594193837');
Test.expect(sum === '1057853509440367665682450458794866464501746580388666517943654');
    
sum = add('234859234758913759182357398457398474598237459823745928347538',
          '987429134712934876249385134781395873198472398562384958739845');
Test.expect(sum === '1222288369471848635431742533238794347796709858386130887087383');
  
sum = add('854694587458967459867923420398420394845873945734985374844444',
          '333333333333439439483948394839834938493843948394839432322229');
Test.expect(sum === '1188027920792406899351871815238255333339717894129824807166673');
  
sum = add('666666665656566666666565656666666656565666666665656566666666',
          '464646464646464644646464646464646464646464646463463463463466');
Test.expect(sum === '1131313130303031311313030303131313121212131313129120030130132');
    
sum = add('987429134712934876249385134781395873198472398562384958739845234859234758913759182357398457398474598237459823745928347538',
          '835743829547328954732895474893754893753281957319857432958432548937859483265893274891378593187431583942678439217431924789');
Test.expect(sum === '1823172964260263830982280609675150766951754355882242391698277783797094242179652457248777050585906182180138262963360272327');
```

# Solution

```
function add(a, b) {
  a = a.split("").reverse().join("");
  b = b.split("").reverse().join("");
  la = a.length;
  lb = b.length;
  var temp = [];
  var bit = 0;
  for(var i = 0; i < Math.max(la,lb); i++){
    if(i>=la){
      var cur = Number(b[i]);
    }else if(i>=lb){
      var cur =Number(a[i]);
    }else{
      var cur = Number(a[i]) + Number(b[i]);
    }     
    temp.push((cur+bit)%10);
    bit = Math.floor((cur+bit)/10);
  }
  if(bit==1){
    temp.push(1);
  }  
  var ans = "";
  for(var i=temp.length-1; i>=0; i--)
    ans+=temp[i];
  return ans;
}
```

```
function add (a, b) {
  var res = '', c = 0
  a = a.split('')
  b = b.split('')
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop()
    res = c % 10 + res
    c = c > 9
  }
  return res
}
```

