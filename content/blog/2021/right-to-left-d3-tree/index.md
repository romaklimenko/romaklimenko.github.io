---
title: "Render a right-to-left tree with D3.js"
date: "2021-04-30"
tags: ["how-to", "d3js", "dataisbeautiful"]
---

<img src="left-to-rigth-tree.png" style="max-height: 450px;" class="img-fluid" />

Recently I needed to render a right-to-left D3.js tree to visualize the mapping of multiple entities into one (as opposed to branching of one entity into many).
The right way to do it is to tweak the [`d3.linkHorizontal()`](https://github.com/d3/d3-shape#linkHorizontal) so instead of:

```javascript
const link = d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x);
```
it could be like:
```javascript
const link = d3.linkHorizontal()
    .x(d => width - d.y)
    .y(d => d.x);
```
But that's not all that you have to do. The Internet is full of unanswered StackOverflow questions and [obsolete examples](https://bl.ocks.org/mbostock/3184089). My approach is probably not the best one, but it works for me: I let D3.js to render a normal left-to-right tree, then flip it horizontally via `transform`, flip all the texts back with another `transform`, and finally invert the text anchors, so the labels are where they have to be:

```javascript
  svg.attr("transform", "scale(-1, 1)");
  svg
    .selectAll("text")
    .attr("transform", "scale(-1, 1)")
    .attr("text-anchor", (d) => (d.depth === 0 ? "start" : "end"))
    .attr("x", function (d) {
      return d3.select(this).attr("text-anchor") === "start" ? 6 : -6;
    });
```

Here is the result:

<img src="right-to-left-tree.png" style="max-height: 450px;" class="img-fluid" />

https://observablehq.com/@romaklimenko/right-to-left-tidy-tree