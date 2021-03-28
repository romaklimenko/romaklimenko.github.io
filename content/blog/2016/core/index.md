---
title: "May the Core be with you"
date: "2016-02-20"
tags: ["pet-project", "sitecore"]
---

[![Build Status](https://travis-ci.org/romaklimenko/core.svg?branch=master)](https://travis-ci.org/romaklimenko/core)

<img src="https://raw.githubusercontent.com/romaklimenko/core/master/img/core.png" height="128" width="128" />

The [Core](https://github.com/romaklimenko/core) is a proof of concept of Sitecore cross platform desktop application. It runs on Mac, Windows and Linux:

<iframe src="https://player.vimeo.com/video/152064489" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<p><a href="https://vimeo.com/152064489">Core</a> from <a href="https://vimeo.com/romaklimenko">Roman Klimenko</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

Mac OS X:

<img src="screenshot-mac.png" class="img-fluid" />

Windows:

<img src="screenshot-win.png" class="img-fluid" />

## Under the hood

Here are main technologies on which Core is based on:

- [Electron](http://electron.atom.io/)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)

But I didn't intend to use as many buzzwords as possible. I take simplicity, ease of adding new features and supportability at the first place. This is why there is no TypeScript, JSX and Babel traspilers at the current stage of the project.

## Setting up Sitecore

Connection and configuration management are not implemented. It is expected that Sitecore instance is available at `http://sitecore.api/` and Sitecore Item Web API has setup like this:

In Sitecore.ItemWebApi.config, enable Sitecore Item Web API and allow anonymous access:

```xml
<site name="website">
  <patch:attribute name="itemwebapi.mode">StandardSecurity</patch:attribute>
  <patch:attribute name="itemwebapi.access">ReadOnly</patch:attribute>
  <patch:attribute name="itemwebapi.allowanonymousaccess">true</patch:attribute>
</site>
```

In Web.config, enable CORS:

```xml
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="*" />
      <add name="Access-Control-Allow-Headers" value="Content-Type" />
      <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
    </customHeaders>
  </httpProtocol>
```

## Build, test and run

There are only two global npm dependencies:

```shell
npm i -g gulp
npm i -g browserify
```

When you have gulp and browserify installed globally, install all the development dependencies:

```shell
npm i
```

Build:

```shell
node_modules/gulp/bin/gulp.js
```

or, if you have `gulp` installed globally:

```shell
gulp
```

Run tests:

```shell
npm test
```

Run application:

```shell
npm run
```
