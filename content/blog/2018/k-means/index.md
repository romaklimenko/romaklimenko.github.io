---
title: "Dominant colors with k-means clustering"
date: "2018-05-25"
tags: ["k-means", "clustering", "dataisbeautiful"]
---

Here is a quick and dirty implementation of the [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) used to find a palette of dominant colours for an image.

The code is hosted on the [Observable](https://beta.observablehq.com/d/78d894babaef4084) notebook.

## Let’s take a picture

For example, let’s take this nice colourful photo taken by [Jacek Dylag](https://unsplash.com/@dylu) on [Unsplash](https://unsplash.com/):

<img src="image.jpeg" class="img-fluid" />

To save the performance (remember, we run this code in the browser), let’s take a sample of 1000 random pixels of the image:

<img src="sample.png" class="img-fluid" />

It’s nearly impossible to guess the original image from these dots, but because they are randomly taken, we can use them as a sample data.

The photo’s size is 600\*399, which gives us 239400 pixels. Each pixel has 3 dimensions: red, green and blue ([RGB](https://en.wikipedia.org/wiki/RGB_color_model)) and can be represented as a vector:

```
pixel = [R,G,B]
```

Let’s visualise the sample dots by drawing 2D projections of the 3D RGB color space:

<img src="rgb.png" class="img-fluid" />

## K is for cluster

> k-means clustering is a method of vector quantisation, originally from signal processing, that is popular for cluster analysis in data mining. k-means clustering aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean, serving as a prototype of the cluster. [Wikipedia](https://en.wikipedia.org/wiki/K-means_clustering)

The classical k-means algorithm consists of the following steps:

1. Take random k points (called centroids) from a space formed by our data points (i.e. vectors).
2. Assign every data point to the closest centroid. Each centroid with assigned data point we call a cluster.
3. For each cluster, find a new centroid by calculating a center between all the data points in the cluster.
4. Repeat steps 2. and 3. while the coordinates of centroids change.

Simple as a pie, isn’t it? Well, yes, but there are some nuances.

## Performance

Say, `k` is a number of clusters (as well as centroids) and `n` is a number of data points, `d` is a number of dimensions (vector length) and `i` is a number of iterations (how many times 2. and 3. have to run). Roughly speaking, the complexity of this will be:

```
O(k * n * d * i)
```

This can be pretty slow, and here are some simple ways to speed it up:

1. Find the final centroids on the sample data and then run the last iteration on the full set. Usually, this significantly reduces the number of iterations on the full set.
2. Set the top limit for the iterations number, so the method will not freeze forever.
3. Set the minimal distance when centroids are considered to be the same. On my code, this saved 3–5 iterations when the distance is less than one but still slightly greater than zero.
4. If you use Euclidean distance, don’t calculate the root, the squared distance is ok.

## Distance and scale

1. Squared [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) is the simplest one, however, it may not be good to calculate the [color difference](https://en.wikipedia.org/wiki/Color_difference).
2. RGB color space is very simple, but again, if you really need to calculate the color difference precisely, use Lab and CIEDE2000.

## The optimal number of k

To find an optimal `k`, I find the average variance for each cluster on the sample data. Simply put, a cluster’s variance is an average distance between its centroid and each point of the cluster. Therefore, the average variance of for a given `k` is the average variance of all its clusters. If we draw a chart where the variance is on the y-axis and `k` is the x-axis, we will see that the variance drops down, but at some point, the slope is decreasing significantly and after this value of k we can observe even some increasing of the variance:

<img src="variance.png" class="img-fluid" />

Now put this all together:

1. Take a sample data set.
2. Find centroids for different k on the sample data set.
3. Find from which k the variance slows down its decrease.
4. Run the k-means clustering with given initial centroids on the full data set.

Voilà:

<img src="rgb2.png" class="img-fluid" />

The big circles represent centroids. The bigger a circle, the more data points are assigned to this centroid.

And the posterised image:

<img src="result.png" class="img-fluid" />
