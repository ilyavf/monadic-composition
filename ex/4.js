const add5 = x => [x + 5, '+ 5']
const double = x => [x * 2, '* 2']
const deduct3 = x => Promise.resolve([x - 3, '- 3'])

const compose = fns => x => {
  return fns.reduce((acc, fn) => {
    return acc.then(([x, desc]) => {
      let res = fn(x)
      if (!(res instanceof Promise)) {
        res = Promise.resolve(res)
      }
      return res.then(([x2, desc2]) => {
        return [x2, desc + ' ' + desc2]
      })
    })
  }, Promise.resolve([x, '']))
}

const app = compose([
  add5,
  double,
  deduct3
])

const app2 = compose([
  app,
  double
])

function run(x) {
  app2(x).then(([y, desc]) => {
    console.log(x + desc + ' = ' + y)
  })
}

run(5)
// >>> 5  + 5 * 2 - 3 * 2 = 34
