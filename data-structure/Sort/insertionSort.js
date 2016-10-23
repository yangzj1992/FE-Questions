"use strict";
const insertionSort = (arr) => {
  let len = arr.length;
  console.time('插入排序耗时');
  for (let i = 1;i < len; i++){
    let key = arr[i];
    let j = i - 1;
    while(j >= 0 && arr[j] > key){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
  console.timeEnd('插入排序耗时');
  return arr;
}

const insertionSort2 = (arr) => {
  
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始数据: [' + arr + ']'); 
console.log(insertionSort(arr));