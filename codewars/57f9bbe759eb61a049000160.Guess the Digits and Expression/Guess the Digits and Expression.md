# Description
[https://www.codewars.com/kata/57f9bbe759eb61a049000160/train/javascript](https://www.codewars.com/kata/57f9bbe759eb61a049000160/train/javascript)

*   # Description:

    Give you a multiplication arithmetic expression:

                    ABC
                *   CBA
                -------
                = 39483

Each character represents a diffrent digit(1-9), and you need to find the arithmetic expression and return the result like this:

    "123 * 321 = 39483"

You can assume that the first line always contains all the digits that you need to guess. You can assume that all testcase always has one or more than one valid results. If more than one valid result exists, choose the one which has the smallest first number. In the example above, `"321 * 123 = 39483"` is also a valid result, but 321 > 123.

*   # Examples

    exp=
    `    ABC
    *   CBA
    -------
    = 39483`
    guessExpression(exp) === "123 * 321 = 39483"

    exp=
    `  AAA
    *   A
    ------
    = 444`
    guessExpression(exp) === "222 * 2 = 444"

    exp=
    `   AB
    * ABA
    ------
    = 1452`
    guessExpression(exp) === "12 * 121 = 1452"

    exp = 
    `        BCEAD
    *      AEDBCA
    --------------
    = 13300171373`
    guessExpression(exp) === "92413 * 143921 = 13300171373"


# Test Cases
```
function an(exp){
  var xx=exp.split("\n"),a=xx[0].trim(),b=xx[1].slice(1).trim(),c= +xx[3].slice(1).trim(),
      min=Math.pow(10,a.length-1),max=min*10,r
  for(var i=min;i<max;i++) if(c%i==0&&isValid1(i)) return r
  
  function isValid1(nn){
    var m=c/nn+"",n=nn+"",v={}
    if(m.length!=b.length||n.includes('0')) return false
    for(var i=0;i<a.length;v[a[i]]=n[i],i++) if(v[a[i]]) if(v[a[i]]!=n[i]) return false
    var chars=Object.keys(v).map(x=>v[x])
    if(chars.length!=new Set(chars).size) return false
    for(var i=0;i<b.length;i++) if(!v[b[i]]||v[b[i]]!=m[i]) return false
    r=`${n} * ${m} = ${c}`
    return true
  }
}
function rndc(){
  var allc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return allc[~~(allc.length*Math.random())]; 
}
function rndc1(){
  var allc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ !@#$%^&*_(),.?|{}[]-=+\\/"
  return allc[~~(allc.length*Math.random())]; 
}
function rndclo(){
  var allc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ !@#$%^&*_(),.?|{}[]-=+"
  return allc[~~(allc.length*Math.random())]; 
}
function rndcn(){
  var allc="1234567890"
  return allc[~~(allc.length*Math.random())]; 
}
function rndcl(){
  var allc="abcdefghijklmnopqrstuvwxyz"
  return allc[~~(allc.length*Math.random())]; 
}
function rndcno(){
  var allc="1234567890_ !@#$%^&*_(),.?|{}[]-=+"
  return allc[~~(allc.length*Math.random())]; 
}
function rndch(){
  var allc="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return allc[~~(allc.length*Math.random())]; 
}
function rnd9(){
  var allc="123456789";
  return allc[~~(allc.length*Math.random())]; 
}
function rnd10(){
  var allc="0123456789";
  return allc[~~(allc.length*Math.random())]; 
}
function rnds(n){
  var len= n||rand(3,7)
  for (var i=0,rs=[];i<len;i++) rs[i]=rndcl();
  return rs.join("");
}
function rndss(n){
  var len= n||rand(2,5)
  for (var i=0,rs=[];i<len;i++) rs[i]=rnds();
  return rndch()+rs.join(" ")
}
function rndsss(n){
  var len= n||rand(5,15)
  for (var i=0,rs=[];i<len;i++) rs[i]=rnds();
  return rndch()+rs.join(" ")
}
function rndname(){
  return rndch()+rnds()
}
function shuff(arr){
  for(var i=0;i<20;i++){
    var idx1=rand(0,arr.length-1),idx2=rand(0,arr.length-1)
    var t=arr[idx1]
    arr[idx1]=arr[idx2]
    arr[idx2]=t
  }
}
function rnds2(n){
  var len= n||~~(15*Math.random())+4;
  for (var i=0,rs=[];i<len;i++) rs[i]=rndcl();
  return rs.join("");
}
function rand(from,to){
  return Math.floor((to-from+1)*Math.random()+from)
}
function rndexp(){
  var ll=rand(0,1000)%8==0?rand(6,8):rand(1,5)
  var all="ABCDEFG".slice(0,ll).split(""),val={},dg=[1,2,3,4,5,6,7,8,9]
  //console.log("all=",all)
  shuff(all)
  for(var i=0;i<all.length;i++) {
    var idx=rand(0,dg.length-1)
    val[all[i]]=dg[idx]
    dg.splice(idx,1)
  }
  var a=all.join("")
  //console.log("all=",all)
  if(a.length==1&&rand(0,1000)%3==0) a=a.repeat(rand(1,5)) 
  else if(a.length==2&&rand(0,1000)%3==0) a=a.repeat(rand(1,2)) 
  var len=rand(1,7),b=""
  for(var i=0;i<len;i++) b+=a[rand(0,a.length-1)]
  //console.log("a=",a,"  b=",b)
  var c= (+a.replace(/./g,x=>val[x]))*(+b.replace(/./g,x=>val[x]))+""
  //console.log(a,b,a.replace(/./g,x=>val[x]),b.replace(/./g,x=>val[x]),c)
  var width=Math.max(a.length,b.length+2,c.length+2),pad=" ".repeat(width)
  return [(pad+a).slice(-width),"*"+(pad+b).slice(-(width-1)),"-".repeat(width+1),"="+(pad+c).slice(-(width-1))].join("\n")
}

describe("Basic Tests", function(){
  it("It should works for basic tests", function(){
var exp=
`    ABC
*   CBA
-------
= 39483`
Test.assertSimilar(guessExpression(exp),"123 * 321 = 39483")

exp=
`  AAA
*   A
------
= 444`
Test.assertSimilar(guessExpression(exp),"222 * 2 = 444")

exp=
`   AB
* ABA
------
= 1452`
Test.assertSimilar(guessExpression(exp),"12 * 121 = 1452")

exp = 
`        BCEAD
*      AEDBCA
--------------
= 13300171373`
Test.assertSimilar(guessExpression(exp),"92413 * 143921 = 13300171373")
  });  
});
describe("100 Random Tests", function(){
  it("It should works for random tests too", function(){
    for(var iii=0;iii<100;iii++){
      var lll=rndexp(),ans=an(lll)
      console.log("<font face='sans-serif' color='#00cc00'><b>Testing for:</b></font><font face='sans-serif' color='#cccc00'>"+
      "  exp = \n"+lll+"</font>","")
      var useran=guessExpression(lll)
      /*
      if(JSON.stringify(ans)!=JSON.stringify(useran)){
        console.log("<font face='sans-serif' color='#ffffff'><b>Correct answer is:</b><br></font><font face='sans-serif' color='#00dd00'>"+ans.map(x=>x.join("")).join("\n")+"</font>","") 
        console.log("<font face='sans-serif' color='#ffffff'><b>Your answer is:</b><br></font><font face='sans-serif' color='#ff0000'>"+useran.map(x=>x.join("")).join("\n")+"</font>","") 
        Test.assertSimilar(useran,ans)
      }
      else console.log("<font face='sans-serif' color='#ffffff'><b>Your answer is:</b><br></font><font face='sans-serif' color='#00dd00'>"+useran.map(x=>x.join("")).join("\n")+"</font>","") 
      */
      Test.assertSimilar(useran,ans)
    }
  });
});

describe("Happy Coding ^_^", function(){
  console.log("<font color='#00aa00' size=2><b>I'm waiting for your <font color='#dddd00'>feedback, rank and vote.<font color='#00aa00'>many thanks! ;-)</b></font>","")  
});
```

# Solution

```
const guessExpression = exp => {
  let [_, e1, e2, res] = exp.match(/([A-Z]+)[^A-Z]+([A-Z]+)[^A-Z\d]+(\d+)/), j, k;
  const sub = (e1, e2, n) => [...e2].map(l => `${n}`[e1.indexOf(l)]).join('');
  for (let min = 10**(e1.length-1), max = min*10, i=min; i<max; i++) {
    if (res % i == 0 && (k = sub(e1, e1, i), i == k) && (j = sub(e1, e2, i), res / j == i)) {
      return `${i} * ${j} = ${res}`;
    }
  }
  return 'No solution';
}
```

```
function cycle(obj, index, firstNum, secondNum, result){
  let f, s, reg, res;
  for (let i = 1; i < 10; i++) {
    if (firstNum.indexOf(i) != -1){
      continue;
    }
    reg = new RegExp(obj[index], 'g');
    f = firstNum.replace(reg, i);
    s = secondNum.replace(reg, i);
    if (obj.length - 1 == index){
      if (f * s == result){
        return [true, f + ' * ' + s + ' = ' + result];
      }
    } else {
      res = cycle(obj, index+1, f, s, result);
      if (res){
        if (res[0]){
          return res;
        }
      }
    }
  }
}

function guessExpression(exp){
  let firstNum = exp.match(/\s*(\w+)\n?/)[1], 
  secondNum = exp.match(/\*\s*(\w+)\n?/)[1],
  result = exp.match(/\=\s*(\w+)/)[1], 
  obj = new Set(firstNum.split(''));
  return cycle([...obj], 0, firstNum, secondNum, result)[1];
}
```

```
function guessExpression(exp){
  let arr = exp.split('\n');
  let multi = arr[0].trim();
  let multi2 = arr[1].split(' ')[arr[1].split(' ').length - 1].trim();
  let result = arr[3].split(' ')[1].trim();
  return factorization(result, multi, multi2)
}

function factorization(result, a1, a2){
  let arr = [];
  let alpha = [...new Set(a1.split(''))];
  let cache = {}
  let mid = Math.ceil(Math.sqrt(result));
  let final = [];
  for (let i = 1; i <= mid; i++) {
    if (result % i == 0) {
      let reverse;
      if(a1.length == (i + '').length && alpha.length == [...new Set((i + '').split(''))].length){
        alpha.forEach((item, index) => cache[item] = (i + '').split('')[index]);
      }else if(a1.length == (result / i + '').length && alpha.length == [...new Set((result / i + '').split(''))].length){
        alpha.forEach((item, index) => cache[item] = (result / i + '').split('')[index]);
        reverse = true;
      }else{
        continue;
      }
      let str = a2.split('');
      let value2 = str.reduce((pre, cur) => pre + cache[cur], '');
      if((result / i == value2 && !reverse) || (i == value2 && reverse)){
        let value1 = a1.split('').reduce((pre, cur) => pre + cache[cur], '');
        final.push([value1, value2]);
      }else{
        continue;
      }
    }
  }
  let min = final[0][0];
  let f_index = 0;
  final.reduce((pre, cur, index) => {if(cur[0] < min){f_index = index}})  
  return `${final[f_index][0]} * ${final[f_index][1]} = ${result}`;
}
```