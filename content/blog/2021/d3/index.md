---
title: "Social activity visualization (summary)"
date: "2021-02-14"
tags: ["dataisbeautiful", "pet-project"]
---

<img src="home.png" class="img-fluid" />

What do software developers on their free time? Not sure about the others, but I love to code. There's not always a chance to practice some of the development aspects at work. Pet projects help me to get the skills that I can later use at work.

One such pet project was a social visualization web app that I initially wrote on Express.js + jQuery + d3.js and hosted on Heroku. About a year ago, I needed to grasp the concepts of Angular. We use it in our team, and I could perform any tasks, but I wanted to develop an Angular app from the ground to practice all its concepts even if we are not using some of them on our current project. At this time, I have decided to rewrite my good old pet project from jQuery to Angular.

The full implementation didn't take too much: a few evenings to rewrite the old stuff, and then I added some new ideas from time to time.

In short, the app now is a static website hosted on GitHub Pages with Express.js API running in a Google Cloud Function. I use Google Cloud Storage to cache JSON data for responses.

From its start, the app has served more than 5000 unique visitors. Recently, I had to require visitors to authenticate. Since then (two last months), about 300 users have logged in to the app. About two-thirds of them use it almost daily.

Static web hosting, cloud functions, and cloud storage allow me to run the app almost free. Usually, it's no more than two danish kroner per month (33 USD cents).

The app is almost self-sustainable and doesn't require my attention, but sometimes things may go wrong. For example, last week, all the user passwords on d3.ru were dropped, and the service account that my app used to send requests to d3.ru API was blocked.

Worth to mention, that the app doesn't keep any user passwords. The users enter their d3.ru logins and passwords on a statically hosted web page that sends this information to d3.ru API only. Then the page only keeps the session key in localStorage and never sends it anywhere except d3.ru API.

Anyway, the app no longer has any of my priorities, and I am considering either shut it down or let it run as soon as it can without my involvement. This post is to have a summary of what this app was doing. Let it be a reference in a case if the app will shut down.

My main goal was to visualize the social activities that help users understand when they spend too much time on the website. For example, here are all user's posts and comments by day and time:

<img src="activity.png" class="img-fluid" />

In the following chart, we use the same data to deduct when the user had slept. The gray lines represent the user's inactivity for more than 8 hours. The orange lines are when the user was inactive for less than 8 hours:

<img src="sleep.png" class="img-fluid" />

Now, let's look from another angle: the columns are the numbers of comments and posts per day. The red ones are weekends. The red curve represents a moving average of the daily number of posts and comments over the last 30 days:

<img src="daily-activity.png" class="img-fluid" />

The following chart is the user's karma, a global metric set over the whole d3.ru. Each d3.ru user can give another one -2, -1, +1 or +2 karma. You may see on the chart that despite the user's karma was generally growing over time, there were significant drops, which shows how easily one can lose karma when writes or does something against the majority:

<img src="karma.png" class="img-fluid" />

On the other hand, the cumulative rating for posts and comments for the same user doesn't show such drops, which shows, in this particular case, that the sets of karma and posts+comments voters do not fully intercept:

<img src="rating.png" class="img-fluid" />

Users with the highest rating in a community have the highest vote weight when they vote for posts and comments. This concept leads to some interesting effects when a post may have a positive rating (black line) despite there are more downvoters than upvoters (gray line):

<img src="post.png" class="img-fluid" />

Finally, the app collects historical data about the numbers of community subscribers. On the chart below, you may see how the number of subscribers has dropped after some drama inside the community and how much time it took to gain the same number of subscribers:

<img src="subscribers.png" class="img-fluid" />

So it goes.
