Q: 设计一个交通灯demo 

``` html
<ul id="trafic" class="wait">
  <li><span></span></li>
  <li><span></span></li>
  <li><span></span></li>
</ul>
```

``` css
#traffic, #traffic > li{
  list-style: none;
  display: block;
}

#traffic span{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gray;
  margin: 5px;
}

#traffic.wait li:nth-child(1) span{
  background-color: red;
}

#traffic.alarm li:nth-child(2) span{
  background-color:yellow;
}

#traffic.pass li:nth-child(3) span{
  background-color:green;
}
```

A :

``` js
// easy v1:

const traffic = document.getElementById('traffic');

(function switcher(){
  traffic.className = 'wait';
  
  setTimeout(function(){
    traffic.className = 'pass';
    setTimeout(function(){
      traffic.className = 'alarm';
      setTimeout(switcher, 10000)
    }, 4000);
  }, 4000);
})();
```

``` js
// v2:

const traffic = document.getElementById('traffic');
const options = [{time: 4000, status: 'wait'}, {time: 4000, status: 'pass'}, {time: 1000, status: 'alarm'}];
function switcher(traffic, options, Index){
  let currentIndex = Index || 0;
  let timer = setTimeout(function(){
    currentIndex++;
    currentIndex = currentIndex % 3;
    let status = options[currentIndex].status;
    traffic.className = status;
    switcher(traffic, options, currentIndex);
  }, options[currentIndex].time);
}

switcher(traffic, options)
```

``` js
// v3
const traffic = document.getElementById('traffic');

function wait(time){
  return new Promise(resolve => setTimeout(resolve, time))
}

function setClass(status){
  traffic.className = status;
}

function switcher(){
  Promise.resolve()
    .then(setClass.bind(null, 'wait'))
    .then(wait.bind(null, 4000))
    .then(setClass.bind(null, 'pass'))
    .then(wait.bind(null, 4000))
    .then(setClass.bind(null, 'alarm'))
    .then(wait.bind(null, 1000))
    .then(switcher)
}

switcher();
```
