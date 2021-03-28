---
title: "Communities and ratings"
date: "2019-12-21"
tags: ["dataisbeautiful"]
---

These visualizations are based on data from [d3.ru](https://d3.ru), an [online platform](https://en.wikipedia.org/wiki/D3.ru) based on a rating system that allows users to appraise other individual users as well as content entries and comments posted by them.

Let's take all posts and comments at d3.ru. For the last 18 years, that is 982.111 posts and 16.166.101 comments. The site has started as a common feed of posts, but from 2012, communities were introduced. Let's see how the total rating of posts and comments is distributed between the communities. The first half of the video is fairly boring, but the second shows how the top-10 communities attracted almost the same amount of rating, as the rest six thousand domains:

<p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/hHWI8Wr2h6w?start=131" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

Another way to look at the same data is a stack plot. The <span style="background-color:#2678B2;color:white;padding:0 3px 0 3px;font-weight:bold;">blue</span> is the 'other communities', and the <span style="background-color:#BCBC35;color:white;padding:0 3px 0 3px;font-weight:bold;">old gold</span> is the rating of the common feed that does not belong to any community. The rest are top communities. We can see how the communities were monopolized around the seven top communities that attract about half of the overall d3.rating:

<img src="ratings.png" class="img-fluid" />

November 2012 - communities were introduced.

March 17, 2015 - vote weight was introduced - before that date, all users had vote weight equal to one. After that date – the weight of the user's vote varies between the communities and depends on the rating of their posts and comments.

In November 2019, only 7 out of 6317 communities attract 48% of all the rating:

1. politota - 14%
2. leprosorium - 11%
3. gif - 9%
4. shapito - 6%
5. polka - 3%
6. ukraine - 3%
7. politics - 1%

5 of these 7 communities are political and are divided into two opposite camps: "politics" (1%) is kinda opposite to other leaders (26%). And this is only between the leaders. There are also political communities that attract less rating and communities, that are described as non-political, but in fact, are engaged in propaganda.

In such a situation, propaganda metastases spread to other communities and users feel that if they want to have good karma, vote weights and support from the majority, they have to support (or at least or at least not contradict the majority).

The minority is downvoted and attacked by the trolls, which creates an illusion that the majority is right.
