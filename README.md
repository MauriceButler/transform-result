# transform-result

Run an arbitrary transform over a functions result if there is no error

``` javascript
var transform = require(transform-result);

getData(transform(
    function(result, callback){
        callback(null, result.id)
    },
    callback
));

// callback gets result.id
```