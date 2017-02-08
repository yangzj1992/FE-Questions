Q : 什么是浅复制和深复制？有什么区别？如何实现Object的深复制？其他框架的实现原理。

A : 

浅复制只复制一层对象的属性，而深复制则递归复制了所有层级。

下面是一个简单的浅复制实现：

``` js
var obj = { a:1, arr: [2,3] };
var shadowObj = shadowCopy(obj);

function shadowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
```

因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JavaScript 存储对象都是存地址的，所以浅复制会导致 obj.arr 和 shadowObj.arr 指向同一块内存地址。

导致的结果就是：

``` js
shadowObj.arr[1] = 5;
obj.arr[1]   // = 5
```

而深复制则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。这就不会存在上面 obj 和 shadowObj 的 arr 属性指向同一个对象的问题。

深拷贝需要考虑的因素非常多，比如：

- 传入的是普通的{}对象还是由构造函数生成的对象
- 如果由构造函数生成是否拷贝原型链上的属性
- 处理循环引用(包括自身引用)

jQuery.extend第一个参数可以是布尔值，用来设置是否深度拷贝的:

``` js
jQuery.extend(true, { a : { a : "a" } }, { a : { b : "b" } } );
jQuery.extend( { a : { a : "a" } }, { a : { b : "b" } } );
```

下面是jQuery.extend的源码,可以看看,不是很长,其实和jQuery.fn.extend是同一个方法:

``` js
jQuery.extend = jQuery.fn.extend = function() {
  var src, copyIsArray, copy, name, options, clone,
  target = arguments[0] || {},
  i = 1,
  length = arguments.length,
  deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
      } else if ( copy !== undefined ) {
        target[ name ] = copy;
      }
    }
  }
}

  // Return the modified object
  return target;
};
```

jQuery 无法正确深复制 JSON 对象以外的对象，而 [lodash](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js) 花了大量的代码来实现 ES6 引入的大量新的标准对象。


针对纯 JSON 数据对象的深复制，使用 JSON 全局对象 `JSON.parse(JSON.stringify(obj));`。它能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，即那些能够被 json 直接表示的数据结构。


另一种方法

``` js 
(function(){
  var toString = Object.prototype.toString,
      gObj = {},
      cloneHelper = function(cache,item){
        // helper for Utils.clone
        if ('object' == typeof item || Utils.isFunction(item)) {
          for (var i = cache.length - 2; i>=0; i -= 2) {
            if (cache[i] == item)
              return cache[i + 1]
          }
          cache.push(item, item = Utils.clone(item, cache))
        }
        return item 
      };
  window.Utils={
    isFunction:function(it){
      // 判断参数是否为Function
      // it 待判断的参数 (Object)
      // return Boolean
      return toString.call(it)=='[object Function]';
    },
    clone:function(obj,cache){
      // 克隆一个对象
      // obj 要克隆的目标对象(Object)
      // return Object
      cache || (cache = []);
      var clone,temp;
      if (!obj || (!Utils.isFunction(obj) && typeof obj != 'object')) return o;
      else if (obj.cloneNode) return o.cloneNode(true);// 克隆DOM节点，绑定事件的有问题，暂不处理
      else if (Utils.isFunction(obj)) clone = new Function('return ' + obj)(); // 克隆function eval在当前作用域，Funtion在全局
      else clone = (temp = obj.constructor, clone = new temp(obj.valueOf()), obj == clone) ? new temp() : clone; // 克隆其它对象，通过识别复制后的对象与原对象是否相同来决定传不传参数，像数组是不能传参数的
      cache.push(obj,clone);
      for (temp in obj) if (gObj.hasOwnProperty.call(obj,temp)) clone[temp] = cloneHelper(cache,obj[temp]);// 使用gObj.hasOwnProperty 防止对象obj重写了hasOwnProperty方法
        return clone
    }
  }
})();

var sourceObj={
  childObj:{
  }
};

sourceObj.childObj.child=sourceObj;

cloneObj=Utils.clone(sourceObj);

```
