---
layout: page
title: Minor Obsessions
tagline: A blog of minor obsessions
---
{% include JB/setup %}

Life is filled with things that I find totally engrossing for a short time. If one of these things fits in a blog post, I'll share it.

<hr />

<div class="listing">
{% for post in site.posts %}
  {% if post.type == 'link' %}
    <div class="post other link">
      <a class="icon" href="{{ post.url }}" title="This is an external link.">★</a>
      <h4><a href="{{ post.link }}">{{ post.title }}</a></h4>
      <p>{{ post.content }}</p>
    </div>
  {% else %}
    <div class="post">
      <h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
      <p class="post-summary">{{ post.summary }}</p>
    </div>
  {% endif %}
{% endfor %}
</div>
