# Description
[https://www.codewars.com/kata/52d3b68215be7c2d5300022f/train/javascript](https://www.codewars.com/kata/52d3b68215be7c2d5300022f/train/javascript)

Your goal is to write an Event constructor function, which can be used to make event objects.

An event object should work like this:

- it has a .subscribe() method, which takes a function and stores it as its handler
- it has an .unsubscribe() method, which takes a function and removes it from its handlers
- it has an .emit() method, which takes an arbitrary number of arguments and calls all the stored functions with these arguments

As this is an elementary example of events, there are some simplifications:

- all functions are called with correct arguments (e.g. only functions will be passed to unsubscribe)
- you should not worry about the order of handlers' execution
- the handlers will not attempt to modify an event object (e.g. add or remove handlers)
- the context of handlers' execution is not important
- each handler will be subscribed at most once at any given moment of time. It can still be unsubscribed and then subscribed again

Also see an example test fixture for suggested usage

# Test Cases

```
function Stub() {
  return function _stub() {
    _stub.args = Array.prototype.slice.call(arguments);
    _stub.calls = (_stub.calls || 0) + 1;
  }
}
describe('Simple Event test cases', function() {
  it ('an Event constructor function should be defined', function () {
    Test.expect(typeof Event === 'function');
  });
  
  var e = new Event(),
    f1 = new Stub(),
    f2 = new Stub(),
    f3 = new Stub();

  it('an event object object should have .subscribe, .unsubscribe and .emit methods', function () {
    Test.expect(typeof e.subscribe === 'function');
    Test.expect(typeof e.unsubscribe === 'function');
    Test.expect(typeof e.emit === 'function');
  });
  
  it('an event object should emit values to subscribed handlers', function () {
    e.subscribe(f1);
    e.subscribe(f2);
    
    e.emit(1, 2, 3, 'first', undefined, false);
    
    Test.assertEquals(f1.calls,  1, 'first handler calls');
    Test.assertEquals(f2.calls,  1, 'second handler calls');
    Test.assertSimilar(f1.args, [1, 2, 3, 'first', undefined, false],
    'first handler arguments');
    Test.assertSimilar(f2.args, [1, 2, 3, 'first', undefined, false],
    'second handler arguments');  
  });
  
  it('an event object should not emit values to unsubscribed handlers', function () {
    e.subscribe(f3);
    e.unsubscribe(f2);
    
    e.emit(2, 'second', true);
    Test.assertEquals(f1.calls, 2, 'previously subscribed handler calls');
    Test.assertEquals(f2.calls, 1, 'unsubscribed handler calls');
    Test.assertEquals(f3.calls, 1, 'newly subscribed handler calls');
    
    e.subscribe(f2);
    e.emit(3, 'third');
    
    Test.assertEquals(f2.calls, 2, 'unsubscribed handler calls after re-subscription and emit');
  });
  
});
```

# Solution

```
function Event() {
  this.handlers = [];
}

Event.prototype.subscribe = function(handler) {
  this.handlers.push(handler);
};

Event.prototype.unsubscribe = function(handler) {
  var index = this.handlers.indexOf(handler);
  
  if (-1 !== handler) {
    this.handlers.splice(index, 1);
  }
};

Event.prototype.emit = function () {
  var args = arguments;
  this.handlers.forEach(function(handler) {
    handler.apply(null, args);
  });
};
```


```
class Event {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(func) {
    this.subscribers.add(func);
  }
  
  unsubscribe(func) {
    this.subscribers.delete(func);
  }
  
  emit(...args) {
    this.subscribers.forEach(s => s(...args));
  }
}
```