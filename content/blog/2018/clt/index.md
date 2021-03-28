---
title: "Central limit theorem"
date: "2018-06-14"
tags: ["statistics", "probability", "normal-distribution", "dataisbeautiful"]
---

> In probability theory, the central limit theorem (CLT) establishes that, in some situations, when independent random variables are added, their properly normalized sum tends toward a normal distribution (informally a “bell curve”) even if the original variables themselves are not normally distributed. The theorem is a key concept in probability theory because it implies that probabilistic and statistical methods that work for normal distributions can be applicable to many problems involving other types of distributions.
>
> – [Wikipedia](https://en.wikipedia.org/wiki/Central_limit_theorem)

To grokk this, let’s generate a sample of 1.000.000 random numbers from 0 to 100 and draw a chart where the x-axis represents a random number and the y-axis — the number of times the number occurs in our sample:

<img src="clt-0.png" class="img-fluid" />

Looks like more or less equally distributed.

Now let’s generate another sample by using the same `random()` function, but to generate each number, we will add one random result to another: `random() + random()`:

<img src="clt-1.png" class="img-fluid" />

This seems like an angle, let’s add more random numbers together: `random() + random() + random()`:

<img src="clt-2.png" class="img-fluid" />

Let’s sum up five random numbers together:

<img src="clt-3.png" class="img-fluid" />
