``` js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three

// 上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log(’one‘)立即执行.
```

Q : 下面四种 promises 的区别【假定 doSomething() 和 doSomethingElse() 均返回 promises】：

``` js
doSomething().then(function(){
  return doSomethingElse();
}).then(finalHandler)

doSomething().then(function(){
  doSomethingElse()
}).then(finalHandler)

doSomething().then(doSomethingElse())
  .then(finalHandler)

doSomething().then(doSomethingElse)
  .then(finalHandler)
```

A : 

``` js
doSomething().then(function(){
  return doSomethingElse();
}).then(finalHandler)

/*
  doSomething
    doSomethingElse(undefined)
      finalHandler(resultofdoSomethingElse)
*/

doSomething().then(function(){
  doSomethingElse()
}).then(finalHandler)

/*
  doSomething
    doSomethingElse(undefined)
    finalHandler(undefined)
*/

doSomething().then(doSomethingElse())
  .then(finalHandler)

/*
  doSomething
  doSomethingElse(undefined)
    finalHandler(resultofdoSomething)

  类似于 

  Promise.resolve('foo').then(Promise.resolve('bar')).then(function(result){
    console.log(result)
  })

  如果你向 then() 传递的并非是一个函数（比如 promise），它实际上会将其解释为 then(null)，这就会导致前一个 promise 的结果会穿透下面。

  修改如下：
  Promise.resolve('foo').then(function(){
    return Promise.resolve('bar')
  }).then(function(result){
    console.log(result)
  })
 */

doSomething().then(doSomethingElse)
  .then(finalHandler)

/*
  doSomething
    doSomethingElse(resultofdoSomething)
      finalHandler(resultofdoSomethingElse)
 */


```
