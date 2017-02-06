Q: js 二分查找

``` js
function bsearch(v, data, pre){
   pre = pre || 0;
   var l = data.length,
       half = Math.floor(l/2),
       c = v - data[half];
   if (c > 0)
       return bsearch(v, data.slice(half + 1), pre + half + 1);
   else if (c < 0)
       return bsearch(v, data.slice(0, half), pre);
   else if (c == 0)
       return pre + half;
   return -1;
}

bsearch(5, [1,2,3,4,5,6,7,8]);
```