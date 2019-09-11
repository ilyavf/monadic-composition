const add5 = x => x + 5
const double = x => x * 2
const deduct3 = x => x - 3

// const compose = (f, g) => (x => g(f(x)))

const compose = fns => (x => {
  return fns.reduce((acc, fn) => {
    return fn(acc)
  }, x)
})

const app = compose([
  add5,
  double,
  deduct3
])

const app2 = compose([
  app,
  double
])

console.log(app(5))
// >>> 17

console.log(app2(5))
// >>> 34
