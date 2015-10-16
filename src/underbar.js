(function () {
  'use strict';

  window._ = {};


  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * in implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    //if the index argument is greater than the lenght of the array, the Math.max clause keeps it from slicing a negative value. 
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }

    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var passed = [];
    _.each(collection, function (val) {
      if (test(val)) {
        passed.push(val);
      }
    });
    return passed;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function (val) {
      return !test(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    // var uniques = [];
    // _.each(array, function(val) {
    //     if (_.indexOf(uniques, val) === -1) {
    //         uniques.push(val);
    //     };
    // })
    // return uniques;

    var unique = {},
      results = [];

    for (var i = 0; i < array.length; i++) {
      unique[array[i]] = array[i];
    }

    for (var key in unique) {
      results.push(unique[key]);
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];

    _.each(collection, function (val) {
      mapped.push(iterator(val));
    });

    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, total) {
    if (total === undefined) {
      total = collection.shift();
    }


    _.each(collection, function (val) {
      total = iterator(total, val);
    });
    return total;
  };


  // _.reduce = function(collection, iterator, accumulator){
  //     var initializing = arguments.length === 2;

  //      _.each(collection, function(val) {
  //         if (initializing) {
  //             accumulator = val;
  //         }
  //         else{
  //             accumulator = iterator(accumulator, val)
  //         }

  //     })
  //      return accumulator;
  // };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // _.every = function(collection, iterator) {
  //     // TIP: Try re-using reduce() here.
  //     return _.reduce(collection, function(allPassed, val) {
  //         return iterator === undefined ? Boolean(val) : Boolean(iterator(val)) && allPassed;
  //     }, true)
  // };



  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;

    return !!_.reduce(collection, function (allPassed, val) {
      return iterator(val) && allPassed;
    }, true);
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //why is the parameter to the anon func below just val? is it because in the every implementation you are returning
    //the vals truthiness? or does it have to do with the fact that every refers to reduce, which refers to each?
    return !_.every(collection, function (val) {
      return iterator === undefined ? !Boolean(val) : !Boolean(iterator(val));
    });
  };

 

  // iterator = iterator || _.identity;

  //     return !!_.reduce(collection, function(allPassed, val) {
  //         return iterator(val) || allPassed;
  //     }, false)


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };
  
  // _.each(arguments, function(source){
  //     _.each(source, function(value, key){
  //         obj[key] = value;
  //     })
  // })
  // return obj;

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }

      }
    }
    return obj;

   
    // _.each(arguments, function(source){
    //     _.each(source, function(value, key){
    //         obj[key] === undefined && obj[key] = value;
    //     })
    // })
    // return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var computedValues = {};

    return function (key) {
      if (!computedValues.hasOwnProperty(key)) {
        computedValues[key] = func.apply(this, arguments);
      }
      return computedValues[key];
    };

   
    // return function(key){
    //     if(!computedValues[key]){
    //        computedValues[key] =  func.call(this, key)
    //     }
    // }
    // return computedValues[key];
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {

    var args = Array.prototype.slice.call(arguments);
    var args = args.slice(2);

    return setTimeout(function () {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice


  _.shuffle = function (array) {
    var newArr = array.slice(0),
      m = newArr.length,
      i, temp;
    while (m) {
      i = Math.floor(Math.random() * m);
      m--;
      //swap:
      temp = newArr[m];
      newArr[m] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  };

  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  //  describe('invoke, when provided a function reference', function() {
  //   it('runs the input function on each item in the array, and returns a list of results', function() {
  //     var reverse = function(){
  //       return this.split('').reverse().join('');
  //     };

  //     var reversedStrings = _.invoke(['dog', 'cat'], reverse);

  //     expect(reversedStrings).to.eql(['god', 'tac']);
  //   });
  // });

  // describe('invoke, when provided a method name', function() {
  //   it('runs the specified method on each item in the array, and returns a list of results', function() {
  //     var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

  //     expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
  //   });
  // });

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
    return _.map(collection, function (item) {
      var iterator;
      if (typeof (functionOrKey) === 'string') {
        iterator = item[functionOrKey];
      } else {
        iterator = functionOrKey;
      }
      return iterator.apply(item, args);
    });

 

    // return  _.map(collection, function(item){
    //      var method = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;
    //      return method.apply(item, args)
    //  })
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  _.sortBy = function (collection, iterator) {
    if (typeof (iterator) === 'string') {
      return collection.sort(function (a, b) {
        return a[iterator] - b[iterator];

      });
    } else {
      return collection.sort(function (a, b) {
        return iterator(a) - iterator(b);
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
    var argumentsArray = Array.prototype.slice.call(arguments);
    var longestArray = argumentsArray.sort(function (a, b) {
      return b.length - a.length;
    })[0];

    //create and return an array that is as long as the longestArray:

    var zipped = Array(longestArray.length);
    // you want to push each element from each array onto an array with the length of the longestArray.

    for (var i = 0; i < longestArray.length; i++) {
      //_.pluck is returning items in the argumentsArray by index, i
      zipped[i] = _.pluck(argumentsArray, i);
    }
    return zipped;

  };

  //alternate, with reduce for max length and an outer for loop for readability.

  //     function zip() {
  //   //turn args into an array
  //   var argumentsArray = Array.prototype.slice.call(arguments);
  //   var returnArr = [];

  //   //get length of longest array
  //   var length = argumentsArray.reduce(function (prev, curr) {
  //     //starter val is 0, if curr array is longer replace with its length
  //     return (prev >= curr.length) ? prev : curr.length;
  //   }, 0);

  //   //push an array of the ith element of each of the argument arrays
  //   //into the return array
  //   for (var i = 0; i < length; i++) {
  //     returnArr.push(argumentsArray.map(function (val) {
  //       return val[i];
  //     }));
  //   }

  //   return returnArr;
  // }
  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
    return _.reduce(nestedArray, function (prev, curr) {
      return prev.concat(Array.isArray(curr) ? _.flatten(curr) : curr);
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {

    var argumentsArray = Array.prototype.slice.call(arguments);

    // return _.filter(argumentsArray[0], function(val) {
    //     return _.indexOf(argumentsArray[1], val) != -1
    // });

    // with reduce:

    return _.reduce(argumentsArray, function (intersectedArray, currentArray) {
      return _.filter(intersectedArray, function (val) {
        return _.indexOf(currentArray, val) !== -1;
      });
    });

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {

    var argumentsArray = Array.prototype.slice.call(arguments);

    return _.reduce(argumentsArray, function (intersectedArray, currentArray) {
      return _.filter(intersectedArray, function (val) {
        return _.indexOf(currentArray, val) === -1;
      });
    });
  };


}());
