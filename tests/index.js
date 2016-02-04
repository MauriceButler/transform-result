var test = require('tape'),
    transformResult = require('../'),
    expectedResult = {foo: 'bar'},
    testError = 'BANG!!!';

test('transformResult Exists', function (t) {
    t.plan(1);
    t.equal(typeof transformResult, 'function',  'transformResult is a function');
});

test('transformResult returns a function', function (t) {
    t.plan(1);
    t.equal(typeof transformResult(), 'function',  'transformResult returns a function');
});

test('transformResult handles error', function (t) {
    t.plan(2);

    var target = transformResult(
            function(){
                t.fail('should not be called');
            },
            function(error, result){
                t.equal(error, testError, 'correct error');
                t.notOk(result, 'no result');
            }
        );

    target(testError);
});

test('transformResult runs transform and calls back', function (t) {
    t.plan(3);

    var testData = {
            things: 'stuff'
        },
        target = transformResult(
            function(data, callback){
                t.equal(data, testData, 'correct data');
                callback(null, expectedResult);
            },
            function(error, result){
                t.notOk(error, 'no error');
                t.equal(result, expectedResult, 'correct result');
            }
        );

    target(null, testData);
});

test('transformResult handles more than 1 parameter', function (t) {
    t.plan(3);

    var target = transformResult(
            function(one, two, three, callback){
                t.equal(one, 1, 'correct one');
                t.equal(two, 2, 'correct two');
                t.equal(three, 3, 'correct three');

                callback();
            },
            function(){}
        );

    target(null, 1, 2, 3);
});
