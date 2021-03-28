---
layout: post
title: "Sitecore Workflow WSIWYG"
date: "2019-12-16"
tags: ["sitecore", "dataisbeautiful"]
---

A WYSIWYG editor for Sitecore Workflow was in my todo-list for a long time. But there are always more important things to do, so I decided to spend an hour to make a POC how it would look like.

The implementation does not require any backend coding: just an HTML file, a JavaScript file and a Sitecore item for an Editor.

First of all, let's put the HTML file under the website folder (in my case, it's under `Website/sitecore/client/Applications/Workflow`.
Next, add an Editor item in the Core database:

<img src="editor.png" class="img-fluid" />

Then, in the master database, go to Workflows standard values and add the Editor item that you just created to the Editors field:

<img src="editors.png" class="img-fluid" />

Now, a bit of JavaScript and here we go:

<img src="sample workflow.png" class="img-fluid" />

<img src="path analyzer maps.png" class="img-fluid" />

<img src="sample workflow.png" class="img-fluid" />

<img src="experience analytics segment.png" class="img-fluid" />

<img src="analytics workflow.png" class="img-fluid" />

<img src="analytics testing workflow.png" class="img-fluid" />
