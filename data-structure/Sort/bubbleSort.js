"use strict";
const bubbleSort = (arr) => {
  console.time('冒泡排序耗时');
  let len = arr.length;
  for(let i = 0;i < len;i++){
    for(let j = 0;j < len - 1 - i;j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j+1];
        arr[j+1] = arr[j]
        arr[j] = temp;
      }
    }
  }
  console.timeEnd('冒泡排序耗时');
  return arr;
}

const bubbleSort2 = (arr) => {
  console.time('改进后冒泡排序耗时');
  let i = arr.length - 1;
  while(i > 0){
    let pos = 0;
    for(let j = 0; j < i; j++){
      if (arr[j] > arr[j+1]){
        pos = j; //记录交换的位置
        let tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
    i = pos; //为下一趟排序作准备
  }
  console.timeEnd('改进后冒泡排序耗时');
  return arr;
}

const cooktailSort = (arr) => {
  console.time('鸡尾酒排序耗时');
  let min = 0;
  let max = arr.length - 1;
  while(min < max){
    for(let j = min;j < max;j++){
      if(arr[j] > arr[j+1]){
        let tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
    -- max;
    for(let j = max;j > min;j--){
      if(arr[j] < arr[j-1]){
        let tmp = arr[j]
        arr[j] = arr[j-1];
        arr[j-1] = tmp;
      }
    }
    ++ min;
  }
  console.timeEnd('鸡尾酒排序耗时');
  return arr;
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始数据: [' + arr + ']'); 
console.log(bubbleSort(arr));
console.log(bubbleSort2(arr));
console.log(cooktailSort(arr));


