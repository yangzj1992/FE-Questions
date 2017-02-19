Q : 

``` js
function Foo() {
  getName = function () { 
    console.log('1');
  };
  return this;
}
Foo.getName = function () {
  console.log('2');
};
Foo.prototype.getName = function () { 
  console.log('3');
};
var getName = function () { 
  console.log('4');
};
function getName() { 
  console.log(5);
}

Foo.getName();  
getName();  
Foo().getName(); 
getName();  
new Foo.getName(); 
new Foo().getName();   
new new Foo().getName();  
```

A: 
`2 4 1 1 2 3 3`

首先必须注意一个问题

``` js
function Foo() {
    getName = function () { 
      console.log('1');
    };
    return this;
}
```

在函数内部声明的 getName 变量，前面不带 var、let,const，声明的 getName 是在全局范围内。

其次

``` js
var getName = function () { 
  console.log('4');
};
function getName() { 
  console.log(5);
}
getName();
```

上述代码的执行结果是 4。因为函数声明式的提升比函数表达式要高。函数表达式覆盖了声明式。

另外两个即为：

``` js
//为函数添加属性getName,其类型是Function，所以这里也可以看出来，Function也是一种Object
Foo.getName = function () {
  console.log('2');
};
//为Foo的原型添加方法getName
Foo.prototype.getName = function () { 
  console.log('3');
};
```



所以最后依次如下执行：

``` js
Foo.getName();  //执行的是函数的属性getName，当然输出的是：2.
getName();  // 4
Foo().getName();   //  执行了 Foo 下的 getName 函数 1，覆盖全局 getName
getName();   //  1
new Foo.getName();   // 执行顺序为 new (Foo.getName)()  输出 2
new Foo().getName();   // (new Foo()).getName();  (new Foo())返回了新生成的对象，该对象没有getName()方法，所以在prototype中找到了getName()方法。所以输出的是3。  优先级： new(带参数列表) = . [] > new(无参数列表) = 函数调用  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
new new Foo().getName();  // new ((new Foo()).getName)();  即 new (Foo.prototype.getName)()
```

----

```  js
var foo = 1;
function bar() {
    foo = 10;
    return;
    function foo() {}
}
bar(); 
alert(foo);  // 1 ， foo() 前置，foo 被定义为局部变量
```


————————

Q : 思考以下代码：

``` js
(function() {
   var a = b = 5;
})();

console.log(b); 
```

A: 

上述代码会打印出5。

这个问题的陷阱就是，在立即执行函数表达式（IIFE）中，有两个命名，但是其中变量是通过关键词var来声明的。这就意味着a是这个函数的本地变量。与此相反，b是属于这个函数的全局变量的。
这个问题另一个陷阱就是，在函数中他没有使用“严格模式” ('use strict';)。如果 严格模式开启，那么代码就会报出未捕获引用错误（Uncaught ReferenceError）：b没有定义。记住严格模式要求，如果这个是预期的行为，你需要明确地引用全局变量，。因此，你需要像下面这么写：

``` js
(function() {
   'use strict';
   var a = window.b = 5;
})();

console.log(b);  
```