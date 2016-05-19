---
layout: post
tagline: "Supporting tagline"
tags : [intro, beginner, jekyll, tutorial]
---
{% include JB/setup %}

This is an example of a draft.

Drafts are posts without a date. They're posts you're still working on and don't want to publish yet. To get up and running with drafts, create a `_drafts` folder and create your first draft:

    _drafts/a-draft-post.md

To preview your site with drafts, simply run `jekyll serve` or `jekyll build` with the `--drafts` switch. Each will be assigned the value modification time of the draft file for its date, and thus you will see currently edited drafts as the latest posts.

Original doc is [here](http://jekyllrb.com/docs/drafts/).
