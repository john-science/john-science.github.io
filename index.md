---
layout: page
title: Antineutrino
tagline: A blog of minor obsessions
---
{% include JB/setup %}

Hello. I'm John and this is a blog of my minor obsessions.

## Posts

My posts are not opinions of rants. They are research and information. They will never be complete. They will never be in a final form.

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

<hr />

<div class="listing">
{% for post in site.posts %}
  {% if post.type == 'link' %}
    <div class="post other link">
      <a class="icon" href="{{ post.url }}" title="This is an external link.">★</a>
      <h2><a href="{{ post.link }}">{{ post.title }}</a></h2>
      <p>{{ post.content }}</p>
    </div>
  {% else %}
    <div class="post">
      <p class="date">{{ post.date | date: "%B %e, %Y" }}</p>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p class="post-summary">{{ post.summary }}</p>
    </div>
  {% endif %}
{% endfor %}
</div>
