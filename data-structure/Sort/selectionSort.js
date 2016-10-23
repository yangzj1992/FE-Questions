"use strict";
const selectionSort = (arr) => {
  let len = arr.length;
  let minIndex, tmp;
  console.time('选择排序耗时');
  for (let i = 0;i < len - 1;i++){
    minIndex = i;
    for(let j = i + 1;j < len;j++){
      if(arr[minIndex] > arr[j]){
        minIndex = j;
      }
    }
    tmp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tmp;
  }
  console.timeEnd('选择排序耗时');
  return arr;
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始数据: [' + arr + ']'); 
console.log(selectionSort(arr));