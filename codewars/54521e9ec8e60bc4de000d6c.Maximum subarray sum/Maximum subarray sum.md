# Description
[https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/train/javascript](https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/train/javascript)

The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

    maxSequence [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    -- should be 6: [4, -1, 2, 1]

    maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    // should be 6: [4, -1, 2, 1]

    maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    # should be 6: [4, -1, 2, 1]

    (max-sequence [-2, 1, -3, 4, -1, 2, 1, -5, 4])
    ;; should be 6: [4, -1, 2, 1]

    Max.sequence(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4});
    // should be 6: {4, -1, 2, 1}

Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.


# Test Cases
```
describe( "maxSequence", function(){
  it("should work on an empty array",function(){
    Test.assertEquals(maxSequence([]), 0);
  });
  it("should work on the example",function(){
    Test.assertEquals(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  });
  it("should work on random arrays", function(){
    var solution = function(arr){
      var i, j, k = 0, r;
      for(i = 0; i < arr.length; ++i){    
        for(r = 0, j = i; j < arr.length; ++j){
          r += arr[j];
          k = k > r ? k : r;
        }
      }
      return k;
    }, randomArray = function(n){
      var res = [];
      while( n --> 0 ) res.push(Math.round(Math.random() * 100 - 50));
      return res;
    }, r, i;
    for(i = 0; i < 50; ++i){
      r = randomArray(Math.random() * 70);
      Test.assertEquals(maxSequence(r.concat([])), solution(r.concat([])));
    }
  });
});
```

# Solution

``` js
var maxSequence = function(arr){
  var min = 0, ans = 0, i, sum = 0;
  for (i = 0; i < arr.length; ++i) {
    sum += arr[i];
    min = Math.min(sum, min);
    ans = Math.max(ans, sum - min);
  }
  return ans;
}
```

``` js
var maxSequence = function(arr){
  if(arr.length == 0){return 0}
  let currentMax = 0, currentSum;
  for(let i = 0;i < arr.length;i++){
    if(arr[i] > currentMax){
      currentMax = arr[i]
    }
    for(let j = i + 1;j< arr.length;j++){
      if(j == i + 1){
        currentSum = arr[i]
      }
      currentSum += arr[j];
      if(currentSum > currentMax){
        currentMax = currentSum;
      }
    }
  }
  return currentMax;
}
```
