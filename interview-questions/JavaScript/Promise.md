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
  正常的 Promise 用法。

  执行顺序：
  doSomething
    doSomethingElse(undefined)
      finalHandler(resultofdoSomethingElse)
*/

doSomething().then(function(){
  doSomethingElse()
}).then(finalHandler)

/*
  因为没有 return，doSomethingElse 在 doSomething 执行完后异步执行的。

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
  doSomethingElse 作为 then 参数传入不会发生值穿透，并返回一个 promise ，所以会顺序执行。

  doSomething
    doSomethingElse(resultofdoSomething)
      finalHandler(resultofdoSomethingElse)
 */


```

demo 

``` js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('something')
    }, 1000)
  })
}

function doSomethingElse() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('somethingElse')
    }, 1500)
  })
}

console.time('case 1')
doSomething().then(() => {
  return doSomethingElse()
}).then(function finalHandler(res) {
  console.log(res) // somethingElse
  console.timeEnd('case 1') // case 1: 2505.606ms
})

console.time('case 2')
doSomething().then(function () {
  doSomethingElse()
}).then(function finalHandler(res) {
  console.log(res) // undefined 
  console.timeEnd('case 2')  // case 2: 1004.616ms
})


console.time('case 3')
doSomething().then(doSomethingElse())
  .then(function finalHandler(res) {
    console.log(res) // something
    console.timeEnd('case 3') // case 3: 1005.830ms
  })

console.time('case 4')
doSomething().then(doSomethingElse)
  .then(function finalHandler(res) {
    console.log(res) // somethingElse
    console.timeEnd('case 4') // case 4: 2507.112ms
  })
```

