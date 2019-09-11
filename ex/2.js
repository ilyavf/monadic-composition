const add5 = x => ['+ 5', x + 5]
const double = x => ['* 2', x * 2]
const deduct3 = x => ['- 3', x - 3]

const compose = fns => x => {
  return fns.reduce(([desc, x], fn) => {
    const [desc2, x2] = fn(x)
    return [desc + ' ' + desc2, x2]
  }, ['', x])
}

const app = compose([
  add5,
  deduct3,
  double,
])

function run(x) {
  const res = app(x)
  console.log(`(${x})${res.join(' = ')}`)
}
run(10)
// >>> (10) + 5 - 3 * 2 = 24