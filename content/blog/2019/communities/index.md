---
layout: post
title: "Communities and subscribers"
date: "2019-10-02"
tags: ["dataisbeautiful"]
---

These visualizations are based on data from [d3.ru](https://d3.ru), an [online platform](https://en.wikipedia.org/wiki/D3.ru) based on a rating system that allows users to appraise other individual users as well as content entries and comments posted by them.

There are about 6225 communities on d3.ru. Let's sort them by the number of subscribers and visualize:
<img src="1570035900-62c2b95fa27a6d4f9d4080be3a8ca077.png" class="img-fluid" />
<small>x - community's index, y - number of the community's subscribers</small>

The average number of subscribers is 629. Let's show which communities have more or fewer subscribers than the average:
<img src="1570036168-9518cef0db7eae929b7bdab20986939b.png" class="img-fluid" />

<small>Most of the communities are below the average number of subscribers.</small>

A median number of subscribers is 17:
<img src="1570036315-5a4d8f93e54bde58644ee1e78e805dcd.png" class="img-fluid" />

Mode is 1:
<img src="1570036686-98b3c8571d2726b7f31e980d91df3f68.png" class="img-fluid" />

Let's take a closer look at the top 200 (by the number of subscribers) of the communities:
<img src="1570037102-f1d758647dc58fd7c746949dbc0d3551.png" class="img-fluid" />

And colorize the clusters:
<img src="1570037248-b2816ef485f41acadcebdb65d6ef2cb9.png" class="img-fluid" />

The number of the top 80 domains was artificially increased. Let's decrease the red ones by 28000 and the orange ones by 2000:
<img src="1570037724-977f4a487b3774d5fb84b4580c194dea.png" class="img-fluid" />
