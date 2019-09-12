const add5 = x => [x + 5, '+ 5']
const double = x => [x * 2, '* 2']
const deduct3 = x => [x - 3, '- 3']

const compose = fns => x => {
  return fns.reduce(([x, desc], fn) => {
    const [x2, desc2] = fn(x)
    return [x2, desc + ' ' + desc2]
  }, [x, ''])
}

const app = compose([
  add5,
  deduct3,
  double,
])

function run(x) {
  const [y, desc] = app(x)
  console.log(x + desc + ' = ' + y)
}
run(10)
// >>> 10 + 5 - 3 * 2 = 24
