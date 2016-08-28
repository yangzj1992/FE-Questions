# Description
[http://www.codewars.com/kata/53b406e67040e51e17000c0a/train/javascript](http://www.codewars.com/kata/53b406e67040e51e17000c0a/train/javascript)

Implement a [_Least Recently Used_](http://en.wikipedia.org/wiki/Cache_algorithms#Examples) (LRU) cache.  An LRU cache is a key-value store that contains a set `capacity` for the number of elements it holds, which is stored in a property.  The `size` should also be a property.  When trying to add a new key-value pair, if `cache.size == cache.capacity`, the _Least Recently Used_ key is removed.

_Hint_: You will will need to use the `Object.defineProperty` facility

* * *

Example Behavior:

```
var store = new LRUCache(3 // Size of the cache 
                        , {a: 1}); // Optional initial values for cache
store.size; // should be 1
store.capacity; // should be 3
store.a; // should be 1;
store.cache('b', 2)['b']; // should be 2
store.a = 5;
store.a; // should be 5
store.cache('c', 3).cache('d', 4).b; // should be undefined, since 'b' was removed because it was the least recently used
store.delete('d');
store.d ; // should be undefined, since 'd' was deleted
store.size ; // should be 2
store.cache('c', 4); 
store.c; // should be 4
store.capacity = 1; // should resize the store to have just one element
Object.keys(store); // should be ['c']
```
* * *

Full API Specification:

*   The user should be able to make a new cache object with `new LRUCache(n)`, where `n` is the cache's (initial) capacity

        *   The constructor should be able to take a javascript object as an optional second parameter, which will be copied and put into the cache

*   Items can be added to the cache using a method called `cache`

        *   `cache` takes two arguments, a key and a value

                *   The new key should be added as a property to the cache
        *   The new property **_should_** be `enumerable`
        *   It should be possible to reassign the new property
        *   Caching an already existing property should update its value

        *   The `cache` method should return the cache itself, so the method can be chained (ie, the [builder pattern](http://en.wikipedia.org/wiki/Builder_pattern))
    *   The cache method itself **_should not_** be `enumerable`, `writable`, nor `configurable`

*   Items can be deleted from the cache using a method called `delete`

        *   This method **_should not_** be `enumerable`, `writable`, nor `configurable`
    *   This method should have the same return values as the `delete` builtin

*   The number of elements stored in the cache should be accessible via the `size` property

        *   This property **_should not_** be `enumerable`, `writable` nor `configurable`

*   The capacity should be accessible by via the `capacity` property

        *   Making the capacity smaller should trigger the cache to delete the least recently used items until the size of the cache is smaller than or equal to the capacity
    *   This property **_should not_** be `enumerable`
    *   The `size` property should never acceed the `capacity` property of a cache

*   An item in the cache is _used_ every time its value is read or assigned, or it is cached using the `cache` method


# Test Cases
```
'use strict';

var store = new LRUCache(3, {a: 1});
Test.assertEquals(store.size, 1, 'store.size');
Test.assertEquals(store.capacity, 3, 'store.capacity');
Test.assertEquals(store.a, 1, 'store.a');
Test.assertEquals(store.cache('b', 2)['b'], 2, 'store.b');
store.a = 5;
Test.assertEquals(store.a, 5, 'store.a');
store.cache('c', 3).cache('d', 4);
Test.assertEquals(store.b, undefined, 'store.b');
Test.assertEquals(store.c, 3, 'store.c');
Test.assertEquals(store.d, 4, 'store.d');
Test.assertEquals(store.a, 5, 'store.a');
Test.assertEquals(store.size, 3, 'store.size');
Test.assertEquals(store.delete('d'), true, "store.delete('d')");
Test.assertEquals(store.d, undefined, 'store.d');
Test.assertEquals(store.delete('e'), true, "store.delete('e')");
Test.assertEquals(store.size, 2, 'store.size');
store.cache('c', 4);
Test.assertEquals(store.c, 4, 'store.c');
store.capacity = 1;
Test.assertEquals(Object.keys(store).length, 1, "Object.keys(store).length");
Test.assertEquals(Object.keys(store)[0], 'c', "Object.keys(store).length");

// Sad paths
Test.expectError(store.size = 5);
Test.expectError(store.delete = 7);
Test.assertEquals(delete store['delete'], false, "delete store['delete']");
Test.assertEquals(delete store['capacity'], false, "delete store['capacity']");
Test.assertEquals(delete store['size'], false, "delete store['size']");
Test.assertEquals(store.delete('delete'), false, "store.delete('delete')");
Test.assertEquals(store.delete('capacity'), false, "store.delete('capacity')");
Test.assertEquals(store.delete('size'), false, "store.delete('size')");
```

# Solution

```
function LRUCache(capacity, init) {
  var self = this, counter = 0, access = {}, values = {};
  
  function get(key) { return function() { access[key] = ++counter; return values[key]; } }
  function set(key) { return function(value) { access[key] = ++counter; values[key] = value; }}
  function remove(key) { delete values[key]; delete access[key]; return delete self[key]; }
  function findOldest() { return Object.keys(self).sort(function(a,b) { return access[a] > access[b]; })[0]; }
  function updateCapacity(c) { capacity = c; while (self.size > capacity) self.delete(findOldest()); }
  function cache(key, value) {
    if (self.size >= capacity) remove(findOldest());
    values[key] = value; access[key] = ++counter;
    Object.defineProperty(self, key, { enumerable : true, configurable: true, get : get(key), set : set(key) });
    return self;
  }
  
  Object.defineProperty(this, "size", { get : function() { return Object.keys(self).length; }});
  Object.defineProperty(this, "delete", { value : remove});
  Object.defineProperty(this, "capacity", { get : function() { return capacity; }, set : updateCapacity });
  Object.defineProperty(this, "cache", { value : cache });
  
  Object.keys(init||{}).forEach(function(k) { self.cache(k, init[k]); });
}
```

```
/**
 * LRU Cache
 *
 * http://www.codewars.com/kata/53b406e67040e51e17000c0a
 * 
 */
function LRUCache(capacity, init) {
  var data = init || {};
  var timestamps = {};
  var capacity = capacity;
  
  var getTimestamp = function() {
    var time = Date.now();
    
    while(time === Date.now());
    return Date.now();
  };
  
  var findLRU = function() {
    var keys = Object.keys(timestamps);
   
    return keys
      .reduce(function(acc, x) { 
        if (timestamps[x] < acc.time) { 
          return {key: x, time: timestamps[x]} ; 
        } else { return acc;} 
    }, {key: keys[0], time: timestamps[keys[0]] });
  };

  var cache = function(key, val) {
    if (!key) return data;
    if (key && val) {
      setCache(key, val); 
    }
    
    if (this.size > this.capacity) {
      var lruItem = findLRU();
      deleteCache(lruItem.key);
    }
        
    return this;
  }.bind(this);
  
  var setCache = function(key, value) {
    if (!this[key]) {
      Object.defineProperty(this, key, {
        get: function() { return data[key]; },
        set: function(value) { data[key] = value; timestamps[key] = getTimestamp(); },
        enumerable: true,
        configurable: true
      });
    }
    
    this[key] = value;
    
  }.bind(this);
  
  var deleteCache = function(key) {
      if (typeof this[key] === 'function' || key === 'capacity' || key === 'size') {
        return false;
      }
      
      if (typeof data[key] !== 'undefined' && data[key]) {
        delete data[key];
        delete this[key];
      }
      
      if (typeof timestamps[key] !== 'undefined') {
        delete timestamps[key];
      }
      
      return true;
  }.bind(this);
  
  Object.defineProperty(this, 'size', {
    get: function() {
      return Object.keys(data).length;
    }
  });
  
  Object.defineProperty(this, 'cache', { 
    value: cache,
    enumerable: false,
    writable: false,
    configurable: false
  });
  
  Object.defineProperty(this, 'delete', {
    value: function(key) { return deleteCache(key); },
    enumerable: false,
    writable: false,
    configurable: false
  });
  
  Object.defineProperty(this, 'capacity', {
    get: function() { return capacity; },
    set: function(value) {      
      for (var i = 0; i < (this.size - value); i++) {
        var lruItem = findLRU();
        deleteCache(lruItem.key);
      }  
    }
  });
  
  for (key in init) {
    setCache(key, init[key]);
  }  
}
```
