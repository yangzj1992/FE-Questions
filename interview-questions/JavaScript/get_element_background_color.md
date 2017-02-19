Q : 用JS代码求出页面上一个元素的最终的background-color，不考虑IE浏览器，不考虑元素float情况。

获取最终应用在元素上的所有CSS属性对象的意思是，如果没有给元素设置任何样式，也会把浏览器默认的样式返回来。

A: 

1. ele.style

在学习DOM的时候就看到通过 `ele.style` 来获取元素样式值，但是有时候获取的并非是节点的样式值，而是空值。这是因为 `ele.style` 只能获取写在元素标签中的 style 属性里的样式值，无法获取到定义在 `<style></style>` 和通过 `<link href="css.css">` 加载进来的样式属性

例子：

``` js
  var test = document.getElementById("test");
  test.style.backgroundColor;
```

2. getComputedStyle()

`getComputedStyle` 是一个可以获取当前元素所有最终使用的 CSS 属性值。

语法如下：

``` js
window.getComputedStyle("元素", "伪类");
```

这个方法接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如 `:before`） 。如果不需要伪元素信息，第二个参数可以是 null。也可以通过 `document.defaultView.getComputedStyle("元素", "伪类");`来使用

例子：

``` js
  var test = document.getElementById("test"),
  demo = window.getComputedStyle(test, null); 

  demo..backgroundColor  
```

注意：Firefox和Safari会将颜色转换成rgb格式，如果test节点上没有任何样式，通过style.length来查看浏览器默认样式的个数。IE6-8 不支持该方法，需要使用下面的方法

3. ele.currentStyle

`currentStyle` 是 IE 浏览器自己的一个属性，其语法与 `ele.style` 类似，差别在于 `element.currentStyle` 返回的是元素当前应用的最终 CSS 属性值（包括外链 CSS 文件，页面中嵌入的 <style> 属性等）。

语法：

``` js
var style = dom.currentStyle;
```

例子：

``` js
  var test = document.getElementById("test"),
  demo = test.currentStyle; 
  demo.color; 
```

注意：对于综合属性 border 等，ie 返回 undefined，其他浏览器有的返回值，有的不返回，但是 borderLeftWidth 这样的属性是返回值的

4. getPropertyValue()

`getPropertyValue` 获取 CSS 样式的直接属性名称

语法如下：

``` js
window.getComputedStyle(element, null).getPropertyValue(属性)
```
    
例子：

``` js
var test = document.getElementById('test');
window.getComputedStyle(test, null).getPropertyValue('background-color');
```


注意：属性名不支持驼峰格式，IE6-8不支持该方法，需要使用下面的方法

5. getAttribute

getAttribute与getPropertyValue类似，有一点的差异是属性名驼峰格式

例子：

``` js
var test = document.getElementById('test');
window.getComputedStyle(test, null).getAttribute("backgroundColor");
```

注意：该方法只支持IE6-8


小结：

jQuery的CSS()方法，其底层运作就应用了getComputedStyle以及getPropertyValue方法，当我们使用原生的js开发时就可以通过以上方法获取元素的值。

下面是一个兼容ie,firefox,chrome等浏览器的获取元素样式的方法，可以应用到项目中

``` js
function getStyle(ele) {
    var style = null;
    
    if(window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    }else{
        style = ele.currentStyle;
    }
    
    return style;
}
```