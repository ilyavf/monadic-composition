const add5 = x => x + 5
const double = x => x * 2
const deduct3 = x => x - 3

const asyncOp = x => Promise.resolve(x + 100)


const compose = fns => (x => {
  return fns.reduce((acc, fn) => {
    if (!(acc instanceof Promise)) {
      acc = Promise.resolve(acc)
    }
    return acc.then(acc => fn(acc))
  }, x)
})

const app = compose([
  add5,
  double,
  deduct3,
  asyncOp
])

function run(x) {
  const resultPromise = app(x)
  resultPromise.then(result => console.log(result))
}
run(5)
// >>> 117
