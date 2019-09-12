-----

# Monadic Composition

-----

1. Pure functions
2. Function composition
3. Monadic composition
4. Coding exercise...

-----

## Pure functions
```
const f = x -> x + 5 
const f = x -> sqrt(x) 
~ const f = x -> (Date.now() - x) ~
```

-----

## Function composition

```
c = f * g
c (x) = g(f(x))
```

-----

## Monadic composition

### Goal:
Monad - design pattern to deal with side effects keeping your functions pure.

### General:
Design pattern that allows to write programs in a more abstract way by taking away 
some boilerplate code that's needed by the program logic

The idea is that gluing (side effects, io) is made outside of the main functions 
(which can stay pure), but inside the compose helper.

-----

## Coding
...

-----

## Recap:

In this talk we:
1. Looked at what a pure function is.
2. Implemented function composition that can help construct more complex applications out of base functions.
3. Learned what a monadic composition is, and how it can help to construct applications in a point-free style, hiding the gluing that's required by our program logic.

-----