# Description
[http://www.codewars.com/kata/53c29a6abb5187180d000b65/train/javascript](http://www.codewars.com/kata/53c29a6abb5187180d000b65/train/javascript)

This is the first part of three ([part2](http://www.codewars.com/kata/es5-generators-ii), [part3](http://www.codewars.com/kata/es5-generators-iii)).

Generators and Iterators are new ES6 features that will allow things like this:
```
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}
```
Using them in this way, we can do amazing things:
```
let seq = fibonacci();
print(seq.next()); // 1
print(seq.next()); // 2
print(seq.next()); // 3
print(seq.next()); // 5
print(seq.next()); // 8
```
This is powerful, but until a few months later, ES6 will not be born.

The goal of this kata is to implement pseudo-generators with ES5.

The first thing to do is to implement the generator function:
```
function generator(sequencer) {
   ...
}
```
`generator(sequencer[, arg1, arg2, ...])` receives a sequencer function to generate the sequence and returns and object with a `next()` method. When the `next()` method is invoked, the next value is generated. The method could receive as well optional arguments to be passed to the sequencer function.

This is an example of a dummy sequencer:
```
function dummySeq() {
  return function() {
    return "dummy";
  };
}
```
To test `generator()`, you could use `dummySeq()` in this way:
```
var seq = generator(dummySeq);
seq.next(); // 'dummy'
seq.next(); // 'dummy'
seq.next(); // 'dummy'
....
```
When you're done, you should implement the following generators (I think the functions are self explanatory):
```
function factorialSeq() {...} // 1, 1, 2, 6, 24, ...
function fibonacciSeq() {...} // 1, 1, 2, 3, 5, 8, 13, ...
function rangeSeq(start, step) {...} // rangeSeq(1, 2)  -> 1, 3, 5, 7, ...
function primeSeq() {...} // 2, 3, 5, 7, 11, 13, ...
partialSumSeq(1, 3, 7, 2, 0) {...} // 1, 4, 11, 13, 13, end
```
You can use any of them in the same way:
```
var seq = generator(factorialSeq);
seq.next(); // !0 = 1
seq.next(); // !1 = 1
seq.next(); // !2 = 2
seq.next(); // !3 = 6
seq.next(); // !4 = 24
...
```
There are some sequences which are infinite and others are not. For example:

- primeSeq: Is infinite
- partialSumSeq: Is limited to the passed values.
When the sequence is done (in finite sequences), if you call `seq.next()` again, it should produce an error.

Good luck!

# Test Cases
```
Test.describe("ES5 Dummy generator", function() {
  Test.it("Test dummy generator", function() {
    var seq = generator(dummySeq);
    Test.assertEquals(seq.next(), 'dummy');
    Test.assertEquals(seq.next(), 'dummy');
    Test.assertEquals(seq.next(), 'dummy');
  });
});

Test.describe("ES5 Simple Generators", function() {
  
  Test.it("Test factorial generator", function() {
    var seq = generator(factorialSeq);
    Test.assertEquals(seq.next(), 1); // 0! = 1
    Test.assertEquals(seq.next(), 1); // 1! = 1
    Test.assertEquals(seq.next(), 2); // 2! = 2
    Test.assertEquals(seq.next(), 6); // 3! = 6
    Test.assertEquals(seq.next(), 24); // 4! = 6
  });
    
  Test.it("Test Fibonacci generator", function() {
    var seq = generator(fibonacciSeq);
    Test.assertEquals(seq.next(), 1); // fib(0) = 1
    Test.assertEquals(seq.next(), 1); // fib(1) = 1
    Test.assertEquals(seq.next(), 2); // fib(2) = 2
    Test.assertEquals(seq.next(), 3); // fib(3) = 3
    Test.assertEquals(seq.next(), 5); // fib(4) = 5
    Test.assertEquals(seq.next(), 8); // fib(5) = 8
    Test.assertEquals(seq.next(), 13); // fib(6) = 13
  });
  
  Test.it("Test Range generator", function() {
    var seq = generator(rangeSeq, 5, 3); // 5,8,11,14,17
    Test.assertEquals(seq.next(), 5);
    Test.assertEquals(seq.next(), 8);
    Test.assertEquals(seq.next(), 11);
    Test.assertEquals(seq.next(), 14);
  });
  
  Test.it("Test Prime Numbers generator", function() {
    var seq = generator(primeSeq);
    Test.assertEquals(seq.next(), 2);
    Test.assertEquals(seq.next(), 3);
    Test.assertEquals(seq.next(), 5);
    Test.assertEquals(seq.next(), 7);
    Test.assertEquals(seq.next(), 11);
    Test.assertEquals(seq.next(), 13);
    Test.assertEquals(seq.next(), 17);
    Test.assertEquals(seq.next(), 19);
  });
  
  Test.it("Test partial sum generator", function() {
    var seq = generator(partialSumSeq, -1, 4, 2, 5);
    Test.assertEquals(seq.next(), -1);
    Test.assertEquals(seq.next(), 3);
    Test.assertEquals(seq.next(), 5);
    Test.assertEquals(seq.next(), 10); //End of sequence
    Test.expectError('End of sequence error expected', seq.next);
  });
});
```

# Solution

```
function generator(sequencer) {
  return {next: sequencer.apply(null, [].slice.call(arguments, 1))};
}

function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq() {
  var pos = 0, count = 1;
  return function() {
    if(pos == 0) {pos++; return count;}
    return count *= pos++;
  }
}

function fibonacciSeq() {
  var last = 0, now = 1, next = 1;
  return function() {
    last = now;
    now = next;
    next = last + now;
    return last;
  }
}

function rangeSeq(start, step) {
  return function() {
    var tmp = start;
    start += step;
    return tmp;
  }
}

function primeSeq() {
  var count = 0;
  return function() {
    if(sieve[count] == null) generateNextPrime();
    return sieve[count++];
  }
}

function partialSumSeq() {
  var seq = [].slice.call(arguments), pos = 0, running = seq[pos];
  return function() {
    var tmp = running;
    if(isNaN(tmp)) throw Error('End of sequence error');
    running += seq[++pos];
    return tmp;
  }
}

//Uses an ever-expanding Sieve of Eratosthenes to test for primes
var sieve = [2,3,5,7,11];
function generateNextPrime() {
  var current = sieve[sieve.length - 1] + 2;
  while (true) {
    if (isPrimeFromSieve(current)) {
      sieve.push(current);
      break;
    }
    current += 2;
  }
}

function isPrimeFromSieve(num) {
  var max = Math.ceil(Math.sqrt(num));
  for (var i = 0; i < sieve.length; i++) {
    if (num % sieve[i] === 0) return false;
    else if (max < sieve[i]) return true;
  }
  return true;
}

```

```
function generator(sequencer) {
  var args = Array.prototype.slice.call(arguments, 1);
  return {
    next: sequencer.apply(this, args)
  };
}

function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq() {
  var total = 0;
  var num = 0;
  return function() {
    if (num === 0) {
      total = 1;
    } else {
      total *= num;
    }
    num++;
    return total;
  };
}

function fibonacciSeq() {
  var prev = 0;
  var current = 1;
  return function() {
    var oldCurrent = current;
    current = prev + current;
    prev = oldCurrent;
    return prev;
  };
}

function rangeSeq(start, step) {
  var current = start;
  return function() {
    var prev = current;
    current += step;
    return prev;
  };
}

function primeSeq() {
  var current = 1;
  return function() {
    current = getNextPrimeAfter(current);
    return current;
  };
}

function getNextPrimeAfter(num) {
  while (!isPrime(++num)) { void 0; }
  return num;
}

function isPrime(num) {
  for (var i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

var seq = generator(partialSumSeq, 1, 3, 7, 2, 0);

function partialSumSeq() {
  var sumSeq = Array.prototype.slice.call(arguments);
  var total = 0;
  var index = 0;

  return function(){
    if (sumSeq.length === index) throw 'End of sequence';
    return total += sumSeq[index++];
  };
}
```