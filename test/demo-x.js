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
        equal(typeof DemoX.docify, "function", "DemoX.docify");
        equal(typeof DemoX.describe, "function", "DemoX.describe");
        equal(typeof DemoX.highlight, "function", "DemoX.highlight");
        equal(typeof DemoX.unhighlight, "function", "DemoX.unhighlight");
        equal(typeof DemoX.flash, "function", "DemoX.flash");
    });

    module("user API");

    test("DemoX presence", function() {
        equal(typeof DemoX, "function", "constructor");
    });

    test("DemoX tag", function() {
        var tag = D.query('demo-x');
        ok(tag, 'have tag in fixture');
        if (D.registerElement) {
          ok(tag instanceof DemoX, "is a DemoX instance");
        }
        Object.getOwnPropertyNames(DemoX.prototype)
        .forEach(function(prop) {
          equal(typeof DemoX.prototype[prop], typeof tag[prop], 'should have same "'+prop+'" as DemoX.prototype');
        });
    });

}(document));

