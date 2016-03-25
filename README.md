[![npm version](https://badge.fury.io/js/micromongo.svg)](http://badge.fury.io/js/micromongo)
[![Build Status](https://travis-ci.org/alykoshin/micromongo.svg)](https://travis-ci.org/alykoshin/micromongo)
[![Coverage Status](https://coveralls.io/repos/alykoshin/micromongo/badge.svg?branch=master&service=github)](https://coveralls.io/github/alykoshin/micromongo?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/micromongo/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/micromongo)
[![Inch CI](https://inch-ci.org/github/alykoshin/micromongo.svg?branch=master)](https://inch-ci.org/github/alykoshin/micromongo)

[![Dependency Status](https://david-dm.org/alykoshin/micromongo/status.svg)](https://david-dm.org/alykoshin/micromongo#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/micromongo/dev-status.svg)](https://david-dm.org/alykoshin/micromongo#info=devDependencies)


# micromongo

Mongodb-like queries over standard arrays of objects.

Array of objects (documents in Mongodb's terminology) is a very common data structure in programming. 
If your application widely using this type of data, if you are looking for something relatively lightweight 
and you are familiar with Mongodb syntax, you may consider this package to handle the arrays of objects.  

Please, be aware that this module is working on unsorted arrays and does not uses indexes, so it is not intended to be used with relatively big arrays (thousands of elements) and not purposed for that tasks (see [performance](#performance) section).
If you have big sets of data, I'd recommend to consider `minimongo`'s `Collection` or Mongodb itself.


Currently only `count()`, `find()` and `findOne()` methods are supported.

Not supported querying array elements, geolocation, bitwise operators etc; also not supported query options like  
For more info see [compatibility matrix](#compatibility-matrix) below.

Tests contains over 90 different test cases based on module's logic and examples from Mongodb docs.


## Installation

```sh
npm install --save micromongo
```


# Usage

## `count()`

Method `count()` return number of documents matching query.

Syntax:
```
res = mm.count(collection, query);
```

`collection` - array of objects

`query` - query object

Following example returns number of elements with a>=2 (i.e. 2):

```
var mm = require('micromongo');
res = mm.count([ { a: 1 }, { a: 2 }, { a: 3 }, ], { a: { $gte: 2 } });
```

If `query` is `undefined` or empty object (`{}`), method returns total count of elements in array:

```
var mm = require('micromongo');
res = mm.count([ { a: 1 }, { a: 2 }, { a: 3 }, ], {});
```


## `find()`

Methods `find()` returns deep copy (with some type limitations) of array's documents matching query.

```
var mm = require('micromongo');
res = mm.find(collection, query, projection);
```


## `findOne()`

Methods `findOne()` returns deep copy (with some type limitations) of first array's documents matching query.

```
doc = mm.findOne(collection, query, projection);
```


# Examples 

## count()

```
var mm = require('../');
//var mm = require('micromongo');

var collection, query, res;

collection = [
  { a: 1 },
  { a: 2 },
  { a: 3 },
];

query = { a: { $gte: 2 } };

res = mm.count(collection, query);
console.log(res);

// 2

query = {};

res = mm.count(collection, query);
console.log(res);

// 3
```


# Example find()

```
var mm = require('../');
//var mm = require('micromongo');

var collection, query, projection, res;

collection = [
  { qty: 10, price: 10 },
  { qty: 10, price:  0 },
  { qty: 20, price: 10 },
  { qty: 20, price:  0 },
  { qty: 30, price: 10 },
  { qty: 30, price:  0 },
];

query = { $or: [ { quantity: { $eq: 20 } }, { price: { $lt: 10 } } ] };

projection = { qty: 1 };

res = mm.find(collection, query, projection);
console.log(res);

// [ { qty: 10 }, { qty: 20 }, { qty: 30 } ]
```

You can find examples in `examples/` subdirectory.
To run all the examples at once you may start `node examples\index.js`.

For more examples please also have a look on tests in `tests/` subdirectory. 


If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/micromongo/issues).



## Testing

For unit tests run:

```
npm run _test
```


## Performance

As it was mentioned, `micromongo` runs on unsorted unindexed data, so it can't show good performance on big arrays.

Test system: 
- Intel® Core™ i7-3520M (2.90 GHz, 4MB L3, 1600MHz FSB)
- 16GB 1600 MHz DDR3

Tests showed following results for `1000` and `10000` elements:

```
  #performance
count 1000 elements - Elapsed: 19 ms
    ✓ #count 1000 elements
count 10000 elements - Elapsed: 191 ms
    ✓ #count 10000 elements (192ms)
find 1000 elements - Elapsed: 35 ms
    ✓ #find 1000 elements
find 10000 elements - Elapsed: 296 ms
    ✓ #find 10000 elements (297ms)
```

You may have a look on the data used for the tests in `tests/performance.js`, and running tests by yourself by `npm run _test` and checking the console log for `performance` output.



## Compatibility matrix

At the moment supports only `find()` and `findOne()` operations.

`_id` in projection are ignored
 ! need to decide which behavior is better


Matrix below is based on Mongodb 3.2 documentation.

## Collection Methods

Method                  | Status 
------------------------|--------
aggregate()             | ?
bulkWrite()             | ?
**count()**             | +
copyTo()                | ?
createIndex()           | NA
dataSize()              | NA
deleteOne()             | .
deleteMany()            | .
distinct()              | ?
drop()                  | NA
dropIndex()             | NA
dropIndexes()           | NA
ensureIndex()           | NA
explain()               | NA
**find()**              | **+**
findAndModify()         | ?
**findOne()**           | **+**
findOneAndDelete()      | ?
findOneAndReplace()     | ?
findOneAndUpdate()      | ?
getIndexes()            | NA
getShardDistribution()  | NA
getShardVersion()       | NA
group()                 | ?
insert()                | .
insertOne()             | .
insertMany()            | .
isCapped()              | NA
mapReduce()             | ?
reIndex()               | NA
replaceOne()            | ?
remove()                | ?
renameCollection()      | NA
save()                  | NA
stats()                 | NA
storageSize()           | NA
totalSize()             | NA
totalIndexSize()        | NA
update()                | .
updateOne()             | .
updateMany()            | .
validate()              | NA

NA - Not Applicable

?  - Not planned

.  - Not implemented


## Query and Projection Operators

### Comparison Operators

Operator       | Status 
---------------|--------
**$eq**        | **+**
**$ne**        | **+**
**$gt**        | **+**
**$gte**       | **+**
**$lt**        | **+**
**$lte**       | **+**
**$in**        | **+**
**$nin**       | **+**
  
### Logical Operators
               
Operator       | Status 
---------------|--------
**$and**       | **+**    
**$or**        | **+**    
**$not**       | **+**    
**$nor**       | **+**    

### Element Query Operators

Operator       | Status    
---------------|--------   
**$exists**    | **+**
**$type**      | **+**
 
### Evaluation query operators

Operator       | Status    
---------------|--------   
$mod           | .
$regex         | .
$text          | ?
$where         | .

### Geospatial Query Operators

Operator       | Status  
---------------|-------- 
$geoWithin     | ?
$geoIntersects | ?
$near          | ?
$nearSphere    | ?
$geometry      | ?
$minDistance   | ?
$maxDistance   | ?
$center        | ?
$centerSphere: | ?
$box           | ?
$polygon       | ?
$uniqueDocs    | ?
 
### Query Operator Array 

Operator       | Status     
---------------|--------    
$all           | .
$elemMatch     | .
$size          | .
 
### Bitwise Query Operators

Operator       | Status 
---------------|--------
$bitsAllSet    | ?
$bitsAnySet    | ?
$bitsAllClear  | ?
$bitsAnyClear  | ?
 
### $comment
                         
Operator       | Status  
---------------|-------- 
$comment       | .

### Projection operators

Operator       | Status 
---------------|--------
$              | .
$all           | .
$elemMatch     | .
$size          | .


## Update Operators

### Field Update Operators
$inc 
$mul 
$rename 
$setOnInsert
$set
$unset 
$min 
$max 
$currentDate

## Update Operators
$ 
$addToSet 
$pop
$pullAll 
$pull
$pushAll 
$push 

## Update Operator Modifiers
$each 
$slice
$sort 
$position 


## Bitwise Update Operator¶
$bit 

## Isolation Update Operator¶
$isolated 

## Aggregation Pipeline Operators
### Pipeline Aggregation Stages
### Boolean Aggregation Operators
### Set Operators (Aggregation)
### Comparison Aggregation Operators
### Arithmetic Aggregation Operators
### String Aggregation Operators
### Text Search Aggregation Operators
### Array Aggregation Operators
### Aggregation Variable Operators
### Aggregation Literal Operators
### Date Aggregation Operators
### Conditional Aggregation Operators
### Group Accumulator Operators


## Credits
[Alexander](https://github.com/alykoshin/)


# Links to package pages:

[github.com](https://github.com/alykoshin/micromongo) &nbsp; [npmjs.com](https://www.npmjs.com/package/micromongo) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/micromongo) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/micromongo) &nbsp; [inch-ci.org](https://inch-ci.org/github/alykoshin/micromongo)


## License

MIT
