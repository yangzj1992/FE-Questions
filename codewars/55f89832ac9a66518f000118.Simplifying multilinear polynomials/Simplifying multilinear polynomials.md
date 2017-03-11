# Description
[http://www.codewars.com/kata/55f89832ac9a66518f000118/train/javascript](http://www.codewars.com/kata/55f89832ac9a66518f000118/train/javascript)

When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x" (or usually bigger), and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see!  

Write a function:

    simplify(poly)

    simplify(poly)

    simplify(poly)

    simplify(poly)

    simplify :: String -> String

that takes a string in input, representing a _multilinear non-constant polynomial in integers coefficients_ (like `"3x-zx+2xy-x"`), and returns another string as output where the same expression has been simplified in the following way ( `->` means application of `simplify`):

*   All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:  

    `"cb+cba" -> "bc+abc"`, `"2xy-yx" -> "xy"`, `"-a+5ab+3a-c-2a" -> "-c+5ab"`  

*   All monomials appears in order of increasing number of variables, e.g.:  

    `"-abc+3a+2ac" -> "3a+2ac-abc"`, `"xyz-xz" -> "-xz+xyz"`  

*   If two monomials have the same number of variables, they appears in [lexicographic order](https://en.wikipedia.org/wiki/Lexicographical_order), e.g.:  

    `"a+ca-ab" -> "a-ab+ac"`, `"xzy+zby" ->"byz+xyz"`  

*   There is no leading `+` sign if the first coefficient is positive, e.g.:  

    `"-y+x" -> "x-y"`, but no restrictions for `-`: `"y-x" ->"-x+y"`  

**N.B.** to keep it simplest, the string in input is restricted to represent only _multilinear non-constant polynomials_, so you won't find something like `-3+yx^2'. **Multilinear** means in this context: **of degree 1 on each variable**.

**Warning**: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.

**Good Work :)**

# Test Cases

```
Test.describe("Simple Tests",_=>{
Test.it("Test reduction by equivalence",_=>{
Test.assertEquals(simplify("dc+dcba"), "cd+abcd")
Test.assertEquals(simplify("2xy-yx"),"xy")
Test.assertEquals(simplify("-a+5ab+3a-c-2a"),"-c+5ab")
})
Test.it("Test monomial length ordering",_=>{
Test.assertEquals(simplify("-abc+3a+2ac"),"3a+2ac-abc")
Test.assertEquals(simplify("xyz-xz"),"-xz+xyz")
})
Test.it("Test lexicographic ordering",_=>{
Test.assertEquals(simplify("a+ca-ab"),"a-ab+ac")
Test.assertEquals(simplify("xzy+zby"),"byz+xyz")
})
Test.it("Test no leading +",_=>{
Test.assertEquals(simplify("-y+x"),"x-y")
Test.assertEquals(simplify("y-x"),"-x+y")
})
})
Test.describe("More complicated tests",_=>{
Test.assertEquals(simplify("3a+b+4ac+bc-ab+3a-cb-a-a"),"4a+b-ab+4ac")
Test.assertEquals(simplify("+n-5hn+7tjhn-4nh-3n-6hnjt+2jhn+9hn"),"-2n+2hjn+hjnt")
Test.assertEquals(simplify("-8fk+5kv-4yk+7kf-qk+yqv-3vqy+4ky+4kf+yvqkf"),"3fk-kq+5kv-2qvy+fkqvy")
Test.assertEquals(simplify("-15cb-12cb-0c+7cb"),"-20bc")
Test.assertEquals(simplify("-12dy+9yzd-9dyz-13y+8y-10yzd-11yd+15yd+9y"),"4y-8dy-10dyz")
Test.assertEquals(simplify("+11x+11x+0xd-12x+5adx+4xd"),"10x+4dx+5adx")
Test.assertEquals(simplify("-0axz-0xz+0axz+0x+4xaz+14x+14zax"),"14x+18axz")
})

Test.describe("Random tests",_=>{
function randint(a,b){return Math.floor(Math.random()*(b-a+1)+a);}
function solvify(poly){
  var base=poly.match(/[-+]?\d*[a-z]+/g),res={};
  for (var h=0;h<base.length;h++){
    var item=base[h];
    item=item.match(/[-+]?\d*/g).slice(0,1).concat(item.match(/[a-z]+/g));
    item[1]=item[1].split("").sort().join("");
    item[0]=(item[0].length>0 &&  "0123456789".indexOf(item[0][item[0].length-1])!=-1) ? item[0] : item[0]+"1";
    res[item[1]]=(res[item[1]] || 0)+ +item[0];
  }
  res=Object.keys(res).sort().sort((a,b)=>a.length>b.length).map(a=>res[a]+a).join("");
  res=res.replace(/(^|[a-z-])(0[a-z]+)/g,"$1") //removing elements with 0 value
  res=res.replace(/([^0-9^+-])(\d+[a-z]+)/g,'$1+$2').replace(/([^0-9^+-])(\d+[a-z]+)/g,'$1+$2') //adding "+" where needed
  res=res.replace(/^1([a-z])/,"$1").replace(/(-|\+)1([a-z])/,"$1$2").replace(/(-|\+)1([a-z])/,"$1$2") //removing "1" where needed
  return res;
}
var vars=["a","b","c","d","x","y","z"];
Array.prototype.shuffle=function(){
  var i=this.length,j,k;
  for (;i;){
    j=Math.floor(Math.random()*this.length);
    k=this[--i];this[i]=this[j];this[j]=k;
  }
  return this;
}

for (var j=0;j<40;j++){
  var poly=[], len=randint(2,9);
  vars=vars.shuffle();
  for (var k=0;k<len;k++){
    var va=vars.slice(0,randint(1,Math.min(vars.length,3))).shuffle().join("");
    poly.push(["+-"[randint(0,1)],randint(1,15),va].join(""));
  }
  poly=poly.join("");
  Test.it(`Testing for ${poly}`,_=>{
  Test.assertEquals(simplify(poly),solvify(poly),"It should work for random inputs too")
  })
}
})

```

# Solution

```
function simplify(poly){
  var h = {};
  poly.match(/[+-]?[^+-]+/g).forEach(x => {
    var m = x.match(/[a-z]+/)[0],
        k = x.replace(m, '');
    m = m.split('').sort().join('');
    k = Number(/\d/.test(k) ? k : k+'1');
    h[m] = (h[m]||0) + k;
  });
  return Object.keys(h)
    .filter(m => h[m])
    .sort((x, y) => x.length - y.length || (x < y ? -1 : 1))
    .map((m, i) => ({
      sign : h[m] < 0 ? '-' : i > 0 ? '+' : '',
      k : Math.abs(h[m]),
      m : m
    }))
    .map(o => o.sign + (o.k == 1 ? '' : o.k) + o.m).join('');
}
```

```
function simplify(poly){
  const terms = poly.match(/[-]?\d*[a-z]+/g).map(createTerm);
  const termMap = {};
  terms.forEach(t => termMap[t.vars] = (termMap[t.vars]||0) + t.count);
  const reducedTerms = Object.keys(termMap).
              map(k => ({count: termMap[k], vars: k})).
              filter(term => term.count !== 0);

  return reducedTerms.sort(compareTerms).map(termToString).join('');
}

function createTerm(s) {
  const sign = s[0] === '-' ? -1 : 1;
  const parsedCount = parseInt(s, 10);
  const count = isNaN(parsedCount) ? sign : parsedCount;
  const vars = s.match(/[a-z]/g).sort().join('');
  return { count: count, vars: vars };
}

function compareTerms(t1, t2) {
  const v1 = t1.vars, v2 = t2.vars;
  return v1.length !== v2.length ? v1.length - v2.length :
         v1 < v2 ? -1 :
         v1 > v2 ? 1 : 0;
}

function termToString(term, pos) {
  var n = term.count;
  var ns = n === -1 ? '-' :
           n === 1 && pos === 0 ? '' :
           n === 1 ? '+' :
           n > 0 && pos === 0 ? String(n) :
           n < 0 ? String(n) :
           `+${n}`;
  return ns + term.vars;
}
```

``` 
function simplify(poly){
  let re = /([\+\-\*\/])*([^\+\-\*\/])+/g;
  let re2 = /[\+\-\*\/]/;
  let re3 = /([\+\-\*\/]*\d*)*([a-z]+)$/
  let arr = poly.match(re);
  let cache = {}
  // get coefficient
  arr.reduce((pre, cur) => {
    let t_arr = cur.match(re3);
    let t_num = t_arr[1] ? t_arr[1] : '';
    let alpha = t_arr[2];
    let num;
    if(re2.test(t_num)){
      num = t_num.substr(1);
    }else{
      num = t_num;
    }
    if(isNumber(num)){
      if(cache[alpha]){
        cache[alpha].push(t_num);
      }else{
        cache[alpha] = [];
        cache[alpha].push(t_num);
      }
    }else{
      if(cache[alpha]){
        cache[alpha].push(t_num + 1);
      }else{
        cache[alpha] = [];
        cache[alpha].push(t_num + 1);
      }
    }
  }, 0);

  // classified
  for(let i in cache){
    let prop = i.split('').sort().join('');
    if(prop != i){
      if(cache[prop]){
        cache[prop] = cache[prop].concat(cache[i]);
      }else{
        cache[prop] = cache[i];
      }
      delete cache[i];
    }
  }

  // merge value & order param
  let order = [];
  for(let j in cache){
    let value = cache[j].reduce((pre,cur) => parseInt(pre) + parseInt(cur),0);
    if(value){
      cache[j] = value;
      order.push(j);
    }
  }

  // sort
  order.sort((a, b) => {
    if(a.length < b.length){
      return -1;
    }else if(a.length > b.length){
      return 1;
    }else{
      if(a < b){
        return -1;
      }else{
        return 1;
      }
    }
  });

  // assemble result
  let result = '';
  order.reduce((pre, cur, index) => {
    if(cache[cur] > 0){
      if(index > 0){
        if(cache[cur] == 1){
          result += ('+' + cur);
        }else{
          result += ('+' + cache[cur] + cur);
        }
      }else{
        if(cache[cur] == 1){
          result += (cur);
        }else{
          result += (cache[cur] + cur);
        }
      }
    }else{
      if(index > 0){
        if(cache[cur] == -1){
          result += ('-' + (cur));
        }else{
          result += (cache[cur] + cur);
        }
      }else{
        if(cache[cur] == -1){
          result += ('-' + (cur));
        }else{
          result += (cache[cur] + cur);
        }
      }
    }
  }, 0)
  return result;
}

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```
