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

const binaryInsertionSort = (arr) => {
  console.time('二分插入排序耗时：');
  for (let i = 1; i < arr.length; i++){
    let key = arr[i], left = 0, right = i - 1;
    while (left <= right){
      let middle = parseInt((left + right) / 2);
      if (key < arr[middle]){
        right = middle - 1;
      }else{
        left = middle + 1;
      }
    }
    for (let j = i - 1; j >= left; j--){
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
  }
  console.timeEnd('二分插入排序耗时：');
  return arr;
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始数据: [' + arr + ']'); 
console.log(insertionSort(arr));
console.log(binaryInsertionSort(arr));
