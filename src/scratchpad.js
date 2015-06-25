_.map = function(collection, iterator) {
        // map() is a useful primitive iteration function that works a lot
        // like each(), but in addition to running the operation on all
        // the members, it also maintains an array of results.

        var newArray = [];

        _.each(collection, function(x) {
            newArray.push(iterator(x));
        })
        return newArray;
    };

_.each = function(collection, iterator) {
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                iterator(collection[i], i, collection);
            };
        } else {
            for (var prop in collection) {
                iterator(collection[prop], prop, collection);
            }
        };
    };


 _.filter = function(collection, test) {
        var arr = []

        _.each(collection, function(val) {
            if (test(val)) {
                arr.push(val);
            }
        });

        return arr;
    };

        _.every = function(collection, iterator) {
        // TIP: Try re-using reduce() here.
        //iterator is a function
        return _.reduce(collection, function(val) {
            if (iterator(val)) {
                return true;
            }

            return false;
  
        }, false);
    };

        _.reduce = function(list, callback, sum) {

      
      if(arguments.length < 3) {
        sum = list.shift();
      } 
      _.each(list, function(val){
          sum = callback(sum, val);
        });
      
        
        return sum;

    };

    // End Part 1

    // Determine if the array or object contains a given value (using `===`).
    _.contains = function(collection, target) {
        // TIP: Many iteration problems can be most easily expressed in
        // terms of reduce(). Here's a freebie to demonstrate!
        return _.reduce(collection, function(wasFound, item) {
            if (wasFound) {
                return true;
            }
            return item === target;
        }, false);
    };



var word = ‘hello’;
console.log(word.split(‘’).reduce(function(obj, letter) {
obj[letter] ? obj[letter]++ : obj[letter] = 1;
return obj;
}, {}));