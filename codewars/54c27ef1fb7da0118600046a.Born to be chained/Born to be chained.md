# Description
[https://www.codewars.com/kata/54c27ef1fb7da0118600046a/train/javascript](https://www.codewars.com/kata/54c27ef1fb7da0118600046a/train/javascript)

Function composition is a powerful technique. For example:

    function sum(x, y) {
      return x + y;
    }

    function double(x) {
      return sum(x, x);
    }

    function minus (x, y) {
      return x - y;
    }

    function addOne(x) {
      return sum(x, 1);
    }

    double(sum(2, 3)); // 10

But in complex expressions, composition may be difficult to understand. For example:

    double(double(addOne(sum(7, minus(sum(5, sum(4, 5)), 4))))); // 72

In this kata, we will implement a function that allows us to perform this by applying a fluid style:

    c.sum(4, 5).sum(5).minus(4).sum(7).addOne().double().double().execute(); // 72

Your job is implement the `chain` function:

    function chain(fns) {
    }

    var c = chain({sum: sum, minus: minus, double: double, addOne: addOne});

As you can see, this function receives the methods to be chained and returns an object that allows you to call the chained methods. The result is obtained by calling the `execute` method.

Chained functions receive an arbitrary number of arguments. The first function in the chain receives all its arguments. In the other functions, the first argument is the result of the previous function and then it only receives the remainder arguments (second, third, etc.). The tests always pass the appropriate arguments and you do not have to worry about checking this.

Note that the chain can be reused (the internal state is not stored):

    c.sum(3, 4).execute(); //7
    c.sum(1, 2).execute(); //3

Other examples:

    var c1 = c.sum(1, 2);
    c1.execute(); // == fns.sum(1, 2) == 3
    c1.double().execute(); // == fns.double(fns.sum(1, 2)) == 6
    c1.addOne().execute(); // == fns.addOne(fns.sum(1, 2)) == 4
    c1.execute(); // == fns.sum(1, 2) == 3

    var c2 = c1.sum(5);
    c2.addOne().execute(); // == fns.addOne(fns.sum(fns.sum(1, 2) 5)) == 9
    c2.sum(3).execute(); // == fns.sum(c1.sum(fns.sum(1, 2), 5), 3) == 11
    c2.execute(); // == fns.sum(fns.sum(1, 2), 5) == 8

    c1.execute(); // == fns.sum(1, 2) == 3

# Test Cases
```
Test.describe("Chain tests", function () {
  Test.it('Simple tests (one function)', function () {
    var c = chain({sum: sum, minus: minus, double: double, addOne: addOne});
    Test.assertEquals(c.sum(1, 5).execute(), 6, 'c.sum(1, 5)');
  });
  Test.it('Simple tests (two functions)', function () {
    var c = chain({sum: sum, minus: minus, double: double, addOne: addOne});
    Test.assertEquals(c.sum(1, 5).minus(7).execute(), -1, 'c.sum(1, 5).minus(7)');
  });
  Test.it('Simple tests (multiple functions)', function () {
    var c = chain({sum: sum, minus: minus, double: double, addOne: addOne});
    Test.assertEquals(c.sum(1, 5).minus(7).double().sum(8).addOne().addOne().execute(), 8, 'c.sum(1, 5).minus(7).double().sum(8).addOne().addOne()');
  });
  Test.it('Reuse tests', function () {
    var c = chain({sum: sum, minus: minus, double: double, addOne: addOne});
    var c1 = c.sum(4, 5);
    var c2 = c1.sum(5);
    Test.assertEquals(c2.execute(), 14, 'c1 = c.sum(4,5) c2 = c1.sum(5) c2.execute()');
    Test.assertEquals(c1.execute(), 9, 'c1 = c.sum(4,5) c2 = c1.sum(5) c1.execute()');
    Test.assertEquals(c2.addOne().execute(), 15, 'c1 = c.sum(4,5) c2 = c1.sum(5) c2.addOne().execute()');
    Test.assertEquals(c2.execute(), 14, 'c1 = c.sum(4,5) c2 = c1.sum(5) c2.execute()');
    Test.assertEquals(c1.execute(), 9, 'c1 = c.sum(4,5) c2 = c1.sum(5) c1.execute()');
  });
  Test.it('Complex objects chain', function () {
    function addOneArr(arr) {
      return arr.map(function(v) {return v + 1;});
    }
    var c = chain({addOneArr: addOneArr});
    Test.assertSimilar(c.addOneArr([1, 2, 3]).execute(), [2, 3, 4], 'c.addOneArr([1, 2, 3])');
    Test.assertSimilar(c.addOneArr([1, 2, 3]).addOneArr().execute(), [3, 4, 5], 'c.addOneArr([1, 2, 3]).addOneArr()');
  });
});
```

# Solution
``` js
function chain(fns) {
  function ChainWrapper(x) {
    this._ = x
  }
  
  Object.keys(fns).forEach(function(prop) {
    var fn = fns[prop]
    
    ChainWrapper.prototype[prop] = function() {
      var args = [].slice.call(arguments)
      if (this._ != null) args.unshift(this._)
      
      var x = fn.apply(null, args)
      return new ChainWrapper(x)
    }
  })
  
  ChainWrapper.prototype.execute = function() {
    return this._
  }
  
  return new ChainWrapper()
}
```
