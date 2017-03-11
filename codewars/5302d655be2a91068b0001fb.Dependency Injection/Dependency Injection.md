# Description
[http://www.codewars.com/kata/5302d655be2a91068b0001fb/train/javascript](http://www.codewars.com/kata/5302d655be2a91068b0001fb/train/javascript)

Did you hear about Dependency Injection pattern? The main idea of this pattern is that you may have ability to pass dependencies into your function in any order and they will be resolved automatically. Take a look at this:

    var myDependentFunc = inject(function (secondDepency, firstDependency) {
      firstDependency();
      secondDepency();
    });

    myDependentFunc();

As you can see we just put some variables into the function's signature and work with them as usualy. But we know nothing about where these variables are located! Let's assume that all dependencies are stored in the single hash object (for instanse 'deps') and the injector function will be sought among 'deps' properties:

    var deps = {
      'firstDependency': function () {return 'this is firstDependency';},
      'secondDepency': function () {return 'this is secondDepency';},
    };

Ok, I hope this is clear. Also, in order to setup DependencyInjector (DI) we need to specify dependency object:

    var DI = function (dependency) {
      this.dependency = dependency;
    };

Your task is create DI.prototype.inject method that will return a new function with resolved dependencies. And don't forget about nested functions. You shouldn't handle them.


# Test Cases

```
describe('Inject dependencies', function() {
  var modules = {
    'app': function(){return 'module app';},
    'login': function(){return 'module login';},
    'i18n': function(){return 'module i18n';}
  };
  
  var di = new DI(modules);

  it('should resolve all dependencies', function () {
    var myFunc = di.inject(function (i18n, login, app) {
      return [i18n(), login(), app()].join(', ');
    });
    Test.assertEquals(myFunc(), 'module i18n, module login, module app');
  });
  
  it('shouldn\'t resolve undefined dependencies', function () {
    var myFuncWithUndefined = di.inject(function (nonExistingVar) {
      return nonExistingVar;
    });
    Test.assertEquals(myFuncWithUndefined(), void(0));
  });
  
  it('shouldn\'t pass any dependencies into the function if such dependencies aren\'t specified', function () {
    var myFuncWithoutDependencies = di.inject(function () {
      return arguments.length;
    });
    Test.assertEquals(myFuncWithoutDependencies(), 0);
  });
  
  it('shouldn\'t handle any nested functions', function () {
    var myFuncWithNested = di.inject(function (app, login, i18n) {
      function nested(d, e, f){};
      var args = Array.prototype.slice.call(arguments, 0);
      return args.length;
    });
    Test.assertEquals(myFuncWithNested(), 3);
  });
});

```

# Solution

```
/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
  this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {

  var deps = /^[^(]+\(([^)]+)/.exec(func.toString());
  
  deps = deps ? deps[1]
    .split(/\s?,\s?/)
    .map(function (dep) {
      return this.dependency[dep];
    }.bind(this)) : [];
  
  return function () {
    return func.apply(this, deps);
  };

}
```

```
/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
  this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
  var params = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',').filter(n => n.length > 0);
  var dependency = this.dependency;
  return function() {
    return func.apply(this, params.map(function(name) {
      return dependency[name];
    }));
  };
}
```