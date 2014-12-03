(function(D) {
/*
======== A Handy Little QUnit Reference ========
http://api.qunitjs.com/

Test methods:
  module(name, {[setup][ ,teardown]})
  test(name, callback)
  expect(numberOfAssertions)
  stop(increment)
  start(decrement)
Test assertions:
  ok(value, [message])
  equal(actual, expected, [message])
  notEqual(actual, expected, [message])
  deepEqual(actual, expected, [message])
  notDeepEqual(actual, expected, [message])
  strictEqual(actual, expected, [message])
  notStrictEqual(actual, expected, [message])
  throws(block, [expected], [message])
*/

    module("dev API");

    test("DemoX.*", function() {
        equal(typeof DemoX.onload, "function", "DemoX.onload");
    });

    module("user API");

    test("DemoX presence", function() {
        equal(typeof DemoX, "function", "constructor");
    });

    test("DemoX tag", function() {
        var tag = D.query('#qunit-fixture demo-x');
        ok(tag, 'have tag in fixture');
    });

}(document));

