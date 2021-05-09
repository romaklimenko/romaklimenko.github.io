---
title: "PRAW, The Python Reddit API Wrapper"
date: "2021-05-02"
tags: ["how-to", "reddit", "python"]
---

While [Reddit REST API](https://www.reddit.com/dev/api/) is pretty straightforward, PRAW ([The Python Reddit API Wrapper](https://praw.readthedocs.io/en/latest/index.html)) makes the tasks of retrieving Reddit data even more effortless.

Recently I had to go through my subreddits and download all the posted images.
That took less than an hour to read the docs and make what I want.

The first step is to create a developer application here: https://www.reddit.com/prefs/apps:
<img src="create.png" class="img-fluid" style="box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4);" />
The redirect URL can be any public URL, but this field can't be empty, so I just typed the Reddit website there.

When you have created the application, it will look like this one:
<img src="app.png" class="img-fluid" style="box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4);" />

You would need a `client_id` and `client_secret`. The first one appears right under the words "personal use script" on the screenshot. The `client_secret` is, obviously, the "secret."

When the preparations are done, and PRAW is installed (`pip3 install praw`), the rest is up to what you want. For example, to initialize a PRAW client:

```python
import praw

reddit = praw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    username=USERNAME,
    password=PASSWORD,
    user_agent="reddit-feed",
)
```

Well, it will not work if you have enabled two-factor authentication for your account. There is [the right way](https://praw.readthedocs.io/en/latest/getting_started/authentication.html#oauth) to handle it, but in my case, I just use my backup account.

Then to get a [subreddit](https://praw.readthedocs.io/en/latest/code_overview/models/subreddit.html):

```python
subreddit = reddit.subreddit("pics")
```

And all [submissions](https://praw.readthedocs.io/en/latest/code_overview/models/submission.html):

```
for submission in subreddit.top(time_filter='week'):
	pass # TODO: your code goes here
```

To save an image, you have to use the `submission.url`. And when you construct the path to save the file, you can save it with the `requests` module (`pip3 install requests`) like this:

```python
response = requests.get(submission.url)
with open(file_path, 'wb') as file:
    file.write(response.content)
```

