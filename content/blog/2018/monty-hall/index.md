---
title: "Monty Hall problem simply explained"
date: "2018-12-08"
tags: ["probability"]
---

Probably, you already heard about the [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem):

> Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?

The probability of winning the car after switching the choice is 2/3. This is counterintuitive for most people.

There are plenty of explanations on the Internet, but I find most of them overcomplicated. It's easy to find the right answer by writing down every step what happens in both scenarios:

The not-switching scenario is simple:

1. Select one of three doors.
2. Win with a probability of 1/3.

Now let's see the always-switch-the-choice scenario:

1. Select one of three doors.
2. Monty opens one of the doors with a goat.
3. Switch the choice to another door.
4. Win with the probability of 2/3.

In the last scenario, the first step is redundant because _we always open another door_. Let's reduce it:

1. Monty opens a door with a goat.
2. You open one of two remaining doors (therefore you together with Monthy just opened two of three doors).
3. Win with the probability of 2/3.

Indeed, in the second scenario, you cooperate with Monty: you and he together open two doors.
