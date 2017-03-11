Q: 判断是否为数组

A: `Object.prototype.toString.call(obj)  == [Object Array]`

附 ： instanceof 的局限性 ，将构造函数的prototype指向Array的prototype

function t(){};
t.prototype  = Array.prototype
var x = new t();
alert(x instanceof Array);//弹出true

Q: 判断 isNumber

``` js
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

Q : 

以下代码输出什么?为什么?

``` js
function swap(x, y){
  var temp = x;
  x = y;
  y = temp;  
}

var a = 1
var b = 2
swap(a, b)
console.log(a) //输出什么
console.log(b) //输出什么

var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)
console.log(obj1)  //输出什么
console.log(obj2)  //输出什么
```

A : 

输出结果依次是： `1 2 {name: 'jirengu'} {age: 2}`

答案在红宝书的第 66 页：
ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。

``` js 
//函数的参数x, y是定义好的，此时函数的局部变量var x=undefined，var y=undefined，传参obj1,obj2后，就是x=obj1,y=obj2引用赋值
function swap(x, y){
  var temp = x;//temp引用赋值，引用指向obj1的值
  x = y; //x引用改为y的引用
  y = temp;  //y的引用改为temp的引用。
//所以：
//这里内部变量x和变量y只是互换了引用，和函数外部变量obj1与obj2没有关系。
//如果这里输出console.log(x,y)，结果是x = {age: 2}， y = {name: 'jirengu'} 

}
var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)//外部输出 {name: 'jirengu'} {age: 2}
```

对于基本数据类型（Number，Bool，String，null，undefined，Symbol || Object）直接复制参数的值。函数内部对参数的修改都不会影响到实参的值。
例如：

``` js
function test(a,b){
  a = 1;
  b = 2;
}
var a = 111;
var b = 222;
test(a,b);
console.log(a,b);  // 111  222

var s1 = Symbol('111');
var s2 = Symbol('222');
test(s1, s2);
console.log(s1, s2);  // Symbol(111)  Symbol(222)
```

当参数是非基本数据类型：对象。此时，传递的是实参的地址。
在test()里，x，y完成了地址的交换，此时x = {age: 2}， y = {name: 'jirengu'} （x指向的是{age：2}的内存地址），obj1，obj2指向的还是原先的内存地址，所以结果没变。

``` js
function swap(x, y){
  var temp = x;
  x = y;
  y = temp;  
  console.log(x,y); // {age: 2}  {name: 'jirengu'}
}

var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)  
```

此时，如果在swap内部改变xy的值，将会直接改变obj1，obj2的值。这是因为obj1和x指向{name：'jirengu'}的内存地址，x或obj1任意一个改变，都会导致指向的内存地址的内容发生变化。
例如：

``` js
function swap(x, y){
  x.name = '111';
  y.age = 3;
}


var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)
console.log(obj1)  //  {name: '111'}
console.log(obj2)  // {age: 3}
```

引申，如果加上return 呢： 

``` js
function swap(x, y){
var temp = x;
x = y;
y = temp;
return {x,y}
}
var a = 1
var b = 2
a=swap(a, b).x;
b=swap(a, b).y
console.log(a) // 2
console.log(b) // 2
```

Q : 一个淘宝页面，你如何取得这个页面用到哪几种标签？

A :

document.all (或document.getElementsByTagName('*') )能取得当前页面所有的element，判断nodeType===1就是element了，取nodeName就是标签名称，遍历做个类别统计就可以
听说还有其他方式，我首先想到的是这个方式而已。

`Array.from(new Set(Array.from(document.querySelectorAll('*')).map(({tagName})=> tagName.toLowerCase())))`
