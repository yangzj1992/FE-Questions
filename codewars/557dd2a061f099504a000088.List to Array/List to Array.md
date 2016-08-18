# Description
[https://www.codewars.com/kata/557dd2a061f099504a000088/train/javascript](https://www.codewars.com/kata/557dd2a061f099504a000088/train/javascript)

Lists are data structures composed of nested objects, each containing a single value and a reference to the next object.

Here's an example of a list in JavaScript:

`{value: 1, next: {value: 2, next: {value: 3, next: null}}}`
In Python, lists will be represented by a preloaded LinkedList class with the members value and next. Here's an example:

`LinkedList(1, LinkedList(2, LinkedList(3)))`
Write a function listToArray (or list_to_array in Python) that converts a list to an array, like this:

`[1, 2, 3]`
Assume all inputs are valid lists with at least one value. For the purpose of simplicity, all values will be either numbers, strings, or Booleans.

# Test Cases
```
var list1 = {value: 1, next: {value: 2, next: {value: 3, next: null}}};
var list2 = {value: "foo", next: {value: "bar", next: null}};

Test.assertSimilar(listToArray(list1), [1, 2, 3]);
Test.assertSimilar(listToArray(list2), ["foo", "bar"]);
```

# Solution
```
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.next)
    array.push(node.value);
  return array;
}
```
