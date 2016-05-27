---
layout: page
title: Minor Obsessions
tagline: A blog of minor obsessions
---
{% include JB/setup %}

Hello. I'm John and this is a blog of my minor obsessions. These posts should not opinions or rants. They should be research and information. Or maybe small projecs. As such, each post will be under continuous revision. I see no reason there should ever be a final version.

<hr />

<div class="listing">
{% for post in site.posts %}
  {% if post.type == 'link' %}
    <div class="post other link">
      <a class="icon" href="{{ post.url }}" title="This is an external link.">★</a>
      <h3><a href="{{ post.link }}">{{ post.title }}</a></h3>
      <p>{{ post.content }}</p>
    </div>
  {% else %}
    <div class="post">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-summary">{{ post.summary }}</p>
    </div>
  {% endif %}
{% endfor %}
</div>
