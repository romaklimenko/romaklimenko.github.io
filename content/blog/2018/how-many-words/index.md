---
title: "How many words I learned in a year"
date: "2018-09-09"
tags: ["danish", "spaced-repetition", "pet-project", "dataisbeautiful"]
---

> Many Danish adults have a vocabulary about 50.000–70.000 Danish words.
> A first-grader child knows about 5.000–10.000 Danish words.
>
> – [sproget.dk](https://sproget.dk/temaer/ord-og-bogstaver/antallet-af-ord-i-dansk)

A year ago, September 9th, 2017, I have started a daily activity, which I did every single day since that date. Every day, without any holidays or pauses, I learned new Danish words.

To do so, I wrote a single app that randomly shows me a Danish word, I need to call to memory what does the word mean:

<img src="derudenfor.png" class="img-fluid" />

And then I open a description and check if I correctly remember the meaning of the word:

<img src="derudenfor-2.png" class="img-fluid" />

If I was right, the word is postponed to be repeated in several days. The more times I guess the meaning, the longer interval to the next repetition. I use the [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) to figure out the next date.

If I forgot the meaning, I reset the number of successful repetitions and the word shall be repeated later today.

This technique is called [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition). The most popular algorithm in this area is [SM2](https://www.supermemo.com/english/ol/sm2.htm) from early [SuperMemo](https://en.wikipedia.org/wiki/SuperMemo). The SM2 implementation looks very similar to the Fibonacci numbers, so for my purposes, I just held to the latest option.

I also limited the number of the repetitions to 10, so the word after 10th successful repetition is considered as learned and never appears again. With Fibonacci numbers, a word gets its 10th repetition on the 143rd day after the first one:

<img src="excel.png" class="img-fluid" />

And so here I am:

A dictionary that I use contains 94.137 Danish words.

In a year, I have seen 3.881 words and learned 2.556 of them.

Here is how my learning went. The top edge of the red area is seen words and the bottom edge is the learned ones:

<img src="progress.png" class="img-fluid" />

Here is how the amount of the “working set” (seen — learned) has changed over time:

<img src="working-set.png" class="img-fluid" />

This is how the numbers of repetitions are distributed over all the words in my database:

<img src="repetitions.png" class="img-fluid" />

And here is how many words are scheduled for each day now. The greener, the lesser is the average number of successful repetitions on each word on that day:

<img src="forecast.png" class="img-fluid" />

On the next step, I plan to take words popularity into account, so the popular words would appear with higher probability.
