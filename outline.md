# Monadic composition

## Intro

Functional programming is a programming paradigm. Its basic concepts are "pure" functions and function composition. Pure means that function does not perform any side effects. Real life programming is all about state and side effects. So, how functional languages deal with this? There is a design pattern called MONAD that was exactly invented to help asyncronous operations and side effects.

More widely, monadic composition is a design pattern that allows to write programs in a more abstract way by taking away some boilerplate code that's needed by the program logic.
 
In this talk I will try to demonstrate what monadic composition is, and how it can help to better structure your code.

## Pure functions and function composition

For this demo we will build an "accounting application" that is constructed by composing "base functions" which perform some calculations.

Lets start with some pure functions:
 
```
const add5 = x => x + 5
const double = x => x * 2 
const deduct3 = x => x - 3
```
 
Now, we would like to construct our accounting application using function composition. We would like to define our app like this:
 
```
 const app = compose(add5, double) 
 app(2)
 // >>> (2 + 5) * 2 = 14
```
 
Lets define our compose function:
```
const compose = (f, g) => x => {
   return g(f(x))
}
```

This is a pure composition of two functions. 

Its worth mentioning that the way we defined our `app` is called "point-free" - the definition of `app` does not include any arguments ("point" means "argument").

## Function composition of many arguments

Lets generalize it a little bit so that we can construct our app with more than 2 functions:
```
const compose = fns => x => {
    return fns.reduce((acc, f) => {
        return f(acc)
    }, x)
}
```

Notice, we changed the signature of our `compose` function so that it accepts an array of functions. And our `app` can be define like this now (and it can use more than just two functions):

```
const app = compose([
    add5, 
    double,
    deduct3
]) 
app(2)
// >>> 11
```

An interesting thing with this composition is that we can compose whole apps together:

```
const app2 = compose([
    app,
    add5,
    deduct3
])
console.log(app2(5))
```

## Monadic composition

This is a pure composition. Now lets took at "monadic" composition. For this lets add an extra requirement to our application: 

> along with calculating a result our `compose` should "explain" how the result was calculated by providing a description. 

Essentially the description should be a log of what base functions have been called to get the final result.

For this lets update our base function to return a pair - a computed value and a description:

```
const add5 = x => [x + 5, '+ 5']
const double = x => [x * 2, '* 2'] 
const deduct3 = x => [x - 3, '- 3']
```

Now, that we changed the signatures of the base functions we need to update our `compose`:

```
const compose = fns => x => {
    return fns.reduce(([acc, desc], f) => {
        counst [acc2, desc2] = f(acc)
        return [acc2, desc + ' ' + desc2]
    }, [x, ''])
}
```

Notice that inside our `compose` we are performing some extra "gluing" of `desc` item of the results.

Now when we run our `app` we will get the following:
```
console.log(app(2))
// >>> [11, '+ 5 * 2 - 3']
```

## Monadic composition for async operations

For the next step lets introduce some asynchronous computation. For this in JavaScript we can use Promises:
```
const asyncOp = x => Promise.resolve(x + 100)

const resultPromise = asyncOp(5)
resultPromise.then(result => console.log(result))
// >>> 105
```

To be able to use this function for our app we need to update our `compose` helper like this:
```
const compose = fns => (x => {
  return fns.reduce((acc, fn) => {
    if (!(acc instanceof Promise)) {
      acc = Promise.resolve(acc)
    }
    return acc.then(acc => fn(acc))
  }, x)
})
```

And now we can mix regular and async functions in our app:
```
const app = compose([
    add5,
    double,
    asyncOp
])
```

And here is how we can run our app and log the result:
```
cosnt resultPromise = app(2)

resultPromise.then(result => console.log(result))
// >>> 114
```

The final step would be to combine in our compose both description and async abilities. But we will leave this exercise for a homework.


## Recap

In this talk we:
1. Looked at what a pure function is.
2. Implemented function composition that can help construct more complex applications out of base functions.
3. Learned what a monadic composition is, and how it can help to construct applications in a point-free style, hiding the gluing that's required by our program logic.