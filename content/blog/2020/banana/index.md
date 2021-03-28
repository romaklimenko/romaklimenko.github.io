---
title: "A spherical gorilla in a vacuum"
date: "2020-03-11"
tags: ["oop"]
---

If you are a software developer, you most probably know Joe's Armstrong quote about object-oriented programming:

> "The problem with object-oriented languages is they've got all this implicit environment that they carry around with them. You wanted a banana but what you got were a gorilla holding the banana and the entire jungle."

Four years ago, I came across, yet another article where the author used this quote as one of the arguments against OOP. "[Goodbye, Object-Oriented Programming](https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53)" - was the title of the article.

I answered this with a [comment](https://medium.com/@romaklimenko/this-is-definitely-a-phrase-of-the-year-71d24b1383ee):

<img src="medium.png" class="img-fluid" />

Despite obvious grammar mistakes, the comment got more than a thousand claps so far.

It doesn't seem like the author got my point, and since I also can't entirely agree with the author's judgment about OOP, I'd like to explain my opinion about this.

As a software developer, I often feel the pain of solving the banana-with-gorilla-with-jungle problem. That's true.
At the same time, _this is our job to implement simple interfaces on top of complicated things_. _We deal with the complexity to produce simplicity, and this is not a simple task_.

Object-oriented programming gives us great tools: encapsulation, inheritance, and polymorphism. But we have many other useful tools, and we decide which tool to use and when.

In an example, even in an "object-oriented" language, we can care about side-effects and implement pure functions where there is no need for a state. The decision about what to use is our responsibility, and this decision has to be a conscious choice, not just "I was told there would be benefits." Either we choose OOP, FP, or whatever.

Regarding the gorilla holding a banana in the entire jungle, I am not sure about the banana, but gorillas are complex creatures, and if you really want a gorilla, not an oversimplified gorilla in a vacuum, you may need to put it into the jungle with the air, water, trees, and bananas.

May [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) be with you!
