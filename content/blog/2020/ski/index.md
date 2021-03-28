---
title: "SKI boolean logic"
date: "2020-04-01"
tags: ["combinators", "logic"]
---

<img src="ski.png" class="img-fluid" />

Combinators are not an easy concept to grok. As a programmer, I find it helpful to write some code that proves the concept I want to understand. Learning by doing it is!

In this post, I implement the three basic [combinators](https://en.wikipedia.org/wiki/Combinatory_logic) of the [SKI combinator calculus](https://en.wikipedia.org/wiki/SKI_combinator_calculus). Then, I add boolean logic operators and test [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws).

I don't pretend to be an expert. Consider this post just as notes that I wrote to grab the concept. Hopefully, these notes will help those who try to do the same thing.

#### Combinator Birds

In his famous book ["To Mock a Mockingbird and Other Logic Puzzles: Including an Amazing Adventure in Combinatory Logic"](https://en.wikipedia.org/wiki/To_Mock_a_Mockingbird), Raymond Smullyan uses birds as a metaphor of combinators:

> A certain enchanted forest is inhabited by talking birds.
> Given any birds A and B, if you call out the name of B to A,
> then A will respond by calling out the name of some bird to you;
> this bird we designate by AB.
> Thus AB is the bird named by A upon hearing the name of B.
> Instead of constantly using the cumbersome phrase
> "A's response to hearing the name of B," we shall more simply say:
> "A's response to B." Thus AB is A's response to B.
> In general, A's response to B is not necessarily
> the same as B's response to A-in symbols,
> AB is not necessarily the same bird as BA.
> Also, given three birds A, B, and C, the bird A(BC)
> is not necessarily the same as the bird (AB)C.
> The bird A(BC) is A's response to the bird BC,
> whereas the bird (AB)C is the response
> of the bird AB to the bird C.
> The use of parentheses is thus necessary to avoid ambiguity;
> if I just wrote ABC, you could not possibly know
> whether I meant the bird A(BC) or the bird (AB)C.

Going chapter-by-chapter through the book is out of the scope of this article,
but hopefully, I will partially do that in the next posts.

Anyway, some birds take birds in and return birds out - what a beautiful analogy to functions!
The combinators are functions, and we give them bird names.

Now, meet probably the simplest combinator ever:

#### Idiot <small>λa.a</small>

Someone call it _Identity_ bird. Despite its simplicity, you can see later that they can be useful. Here is how we define an Idiot in TypeScript:

```typescript
export type Idiot = <T>(a: T) => T
export const I: Idiot = a => a
```

What it does is it takes a thing and returns the same thing without changing is:

```typescript
describe('Idiot', () => {
  const x = 'whatever';

  test('Ix = x', () => {
    expect(I(x)).toBe(x);
  });
);
```

#### Kestrel <small>λab.a</small>

_Kestrel_ is also known as _constant_ or _TRUE_. It merely takes a value and then returns that value whatever you give it after:

```typescript
export type Kestrel = <T0, T1>(a: T0) => (b: T1) => T0
export const K: Kestrel = a => b => a

describe("Kestrel", () => {
  test("Kxy = x", () => {
    const x = "x"
    const y = "y"

    const actual = K(x)(y)

    expect(actual).toBe(x)
  })
})
```

#### Starling <small>λabc.ac(bc)</small>

The _Starling_ (or a _substitution_ operator) is more complicated:
"It takes three arguments and then returns the first argument applied to the third, which is then applied to the result of the second argument applied to the third":

```typescript
export type Starling = <TC>(
  a: (c: TC) => any
) => (b: (c: TC) => any) => (c: TC) => any

export const S: Starling = a => b => c => a(c)(b(c))

describe("Starling", () => {
  test("Sxyz = xz(yz)", () => {
    const x = _ => I
    const y = a => a() * 2
    const z = () => 3

    const xz = x(z)
    const yz = y(z)

    const actual = S(x)(y)(z)

    expect(actual).toBe(xz(yz))
    expect(actual).toBe(6)
  })
})
```

#### Ix = SSKKx = SK(KK)x = x

We can build any combinator (including I) just with K and S:

```typescript
describe("Idiot", () => {
  test("Ix = SSKKx = x", () => {
    expect(S(S)(K)(K)(x)).toBe(I(x))
  })

  test("Ix = SK(KK)x = x", () => {
    const sk = S(K)
    const kk = K(K)
    expect(sk(kk)(x)).toBe(I(x))
  })
})
```

#### TRUE = K

Say, we have an ordered pair of two values: true and false. As Kerstel always returns the first value, we can call it TRUE:

```typescript
export const TRUE = K

const t = () => true
const f = () => false

describe("TRUE = K", () => {
  test("Ktf = (TRUE)tf = t", () => {
    const actual = TRUE(t)(f)()
    expect(actual).toBe(K(t)(f)())
    expect(actual).toBe(true)
  })
})
```

#### FALSE = SK = KI

In the same manner, we can build a combinator that will always return FALSE:

```typescript
export const FALSE = S(K)

describe("FALSE = SK", () => {
  test("SKxy = y", () => {
    expect(FALSE(t)(f)()).toBe(false)
  })

  test("KItf = (FALSE)tf = f", () => {
    const actual = K(I)(t)(f)()
    expect(actual).toBe(FALSE(t)(f)())
    expect(actual).toBe(false)
  })
})
```

Notice, how in the second test, we use KI instead of SK.
Indeed, I is not necessary but can be used as syntactic sugar.

#### NOT = (SK)(K)

Now things are getting complicated. We can't trust our intuition and write tests.
Here is NOT:

```typescript
export const NOT = b => b(S(K))(K)

describe("NOT = (SK)(K)", () => {
  test("NOT = (SK)(K)", () => {
    const sk = S(K)
    expect(TRUE(sk(K))(t)(f)()).toBe(false)
    expect(TRUE(sk(K))(f)(t)()).toBe(true)
  })

  test("NOT(TRUE) = FALSE", () => {
    expect(NOT(TRUE)(t)(f)()).toBe(false)
    expect(NOT(TRUE)(f)(t)()).toBe(true)
  })

  test("NOT(FALSE) = TRUE", () => {
    expect(NOT(FALSE)(t)(f)()).toBe(true)
    expect(NOT(FALSE)(f)(t)()).toBe(false)
  })

  test("TRUE(FALSE)(TRUE) = FALSE", () => {
    expect(TRUE(FALSE)(TRUE)(t)(f)()).toBe(false)
  })

  test("FALSE(FALSE)(TRUE) = TRUE", () => {
    expect(FALSE(FALSE)(TRUE)(t)(f)()).toBe(true)
  })
})
```

The definition of NOT is not precisely the same, as in Wikipedia.
Please check out the [answer](https://stackoverflow.com/a/60948367/643180) to my question on Stackoverflow to see why.

#### OR = TRUE

```typescript
export const OR = TRUE

describe("OR = T = K", () => {
  test("(T)OR(T) = T(T)(T) = T", () => {
    expect(TRUE(OR)(TRUE)(t)(f)()).toBe(true)
  })

  test("(T)OR(F) = T(T)(F) = T", () => {
    expect(TRUE(OR)(FALSE)(t)(f)()).toBe(true)
  })

  test("(F)OR(T) = F(T)(T) = T", () => {
    expect(FALSE(OR)(TRUE)(t)(f)()).toBe(true)
  })

  test("(F)OR(F) = F(T)(F) = F", () => {
    expect(FALSE(OR)(FALSE)(t)(f)()).toBe(false)
  })
})
```

#### AND = FALSE

```typescript
export const AND = FALSE

describe("AND = F = SK", () => {
  test("(T)(T)AND = T(T)(F) = T", () => {
    expect(TRUE(TRUE)(AND)(t)(f)()).toBe(true)
  })
  test("(T)(F)AND = T(F)(F) = F", () => {
    expect(TRUE(FALSE)(AND)(t)(f)()).toBe(false)
  })
  test("(F)(T)AND = F(T)(F) = F", () => {
    expect(FALSE(TRUE)(AND)(t)(f)()).toBe(false)
  })
  test("(F)(F)AND = F(F)(F) = F", () => {
    expect(FALSE(FALSE)(AND)(t)(f)()).toBe(false)
  })
})
```

#### De Morgan's laws

Now, when we have a boolean logic system, let's check [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws):

```typescript
describe("De Morgan's Laws", () => {
  const or = (a, b) => a(OR)(b)
  const and = (a, b) => a(b)(AND)
  const not = a => NOT(a)

  test("¬(a ∨ b) ⇔ (¬a) ∧ (¬b)", () => {
    expect(!(true || true)).toBe(false)
    expect(!true && !true).toBe(false)
    expect(not(or(TRUE, TRUE))(t)(f)()).toBe(false)
    expect(and(not(TRUE), not(TRUE))(t)(f)()).toBe(false)

    expect(!(true || false)).toBe(false)
    expect(!true && !false).toBe(false)
    expect(not(or(TRUE, FALSE))(t)(f)()).toBe(false)
    expect(and(not(TRUE), not(FALSE))(t)(f)()).toBe(false)

    expect(!(false || false)).toBe(true)
    expect(!false && !false).toBe(true)
    expect(not(or(FALSE, FALSE))(t)(f)()).toBe(true)
    expect(and(not(FALSE), not(FALSE))(t)(f)()).toBe(true)

    expect(!(false || true)).toBe(false)
    expect(!false && !true).toBe(false)
    expect(not(or(FALSE, TRUE))(t)(f)()).toBe(false)
    expect(and(not(FALSE), not(TRUE))(t)(f)()).toBe(false)
  })

  test("¬(a ∧ b) ⇔ (¬a) ∨ (¬b)", () => {
    expect(!(true && true)).toBe(false)
    expect(!true || !true).toBe(false)
    expect(not(and(TRUE, TRUE))(t)(f)()).toBe(false)
    expect(or(not(TRUE), not(TRUE))(t)(f)()).toBe(false)

    expect(!(true && false)).toBe(true)
    expect(!true || !false).toBe(true)
    expect(not(and(TRUE, FALSE))(t)(f)()).toBe(true)
    expect(or(not(TRUE), not(FALSE))(t)(f)()).toBe(true)

    expect(!(false && false)).toBe(true)
    expect(!false || !false).toBe(true)
    expect(not(and(FALSE, FALSE))(t)(f)()).toBe(true)
    expect(or(not(FALSE), not(FALSE))(t)(f)()).toBe(true)

    expect(!(false && false)).toBe(true)
    expect(!false || !false).toBe(true)
    expect(not(and(FALSE, FALSE))(t)(f)()).toBe(true)
    expect(or(not(FALSE), not(FALSE))(t)(f)()).toBe(true)

    expect(!(false && true)).toBe(true)
    expect(!false || !true).toBe(true)
    expect(not(and(FALSE, TRUE))(t)(f)()).toBe(true)
    expect(or(not(FALSE), not(TRUE))(t)(f)()).toBe(true)
  })
})
```

The repo is [here](https://github.com/romaklimenko/mockingbird).

<br>
