---
title: "My tweets"
date: "2015-04-17"
tags: ["pet-project", "dataisbeautiful", "r"]
---

It is my first app in R. Just a visualization of my tweets over time:

<img src="tweets2560x1600.png" class="img-fluid" />

The language itself seems powerful. I wish I could have more real-life tasks to practice with R.

```r
tweets <- read.csv(file="tweets.csv",
                   head=TRUE,
                   sep=",",
                   colClasses=c("NULL","NULL","NULL",NA,"NULL","NULL","NULL"))

tweets$date <- as.Date(substr(tweets$timestamp, 0, 10))

tweets$hours <- as.integer(substr(tweets$timestamp, 12, 13))
tweets$minutes <- as.integer(substr(tweets$timestamp, 15, 16))
tweets$seconds <- as.integer(substr(tweets$timestamp, 18, 19))

tweets$numeric_time <- tweets$hours * 3600 + tweets$minutes * 60 + tweets$seconds

plot(tweets$date,
     tweets$numeric_time,
     xlab = "",
     ylab = "time of the day",
     yaxt="n")
```
