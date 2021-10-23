function foo1() {
  return 1;
}
function foo2() {
  return 2;
}
function foo3() {
  return 3;
}

const var1 = 'hello';

module.exports = {
  foo1,
  foo2,
  foo3,
  var1,
}

// import
// const someModule = require('./exports1');
// someModule.foo1(someModule.var1);

// import2
// const { someModule, var1} = require('./exports1');
// foo1(someModule.var1);