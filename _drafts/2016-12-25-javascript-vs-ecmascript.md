---
layout: post
title: "JavaScript vs ECMAScript"
tags: [JavaScript, ECMAScript, Software]
summary: JavaScript, ECMAScript, and the rise and fall of Netscape Navigator.
---
{% include JB/setup %}

    Recently, I was wondering through some park in San Francisco with a friend who works at YouTube.  I made an old joke:
    
> I've never learned JavaScript, but I sure have written a lot of it.

    I mean, this is just what I see. Most people who end up writting a little JavaScript for a website have never actually sit down and try to learn the language. They just throw together enough code until it works and then move on with their life. Of course, Thom works for one of the biggest websites in the world and is very serious about his work. So he has sat down and made a serious study of the language.
    
    As we continued walking through the park, I further showed my ignorance saying that JavaScript was a static language that had not changed or grown in years. Thom immediatley corrected me that my information was like 7 years old, and ECMAScript has been having a revival since 2009.
    
    Okay, okay. Thom, I get it. I should go back to the drawing board, learn JavaScript for real finally, and figure out what is going on with the whole ECMAScript thing.
    
    The first part was actually pretty easy.  To my surprise, JavaScript is an enjoyable (albeit highly flawed) language to learn. And it is one of the smaller languages out there, which speeds up the process considerably. I chose the only good book available: [JavaScript: The Good Parts](http://a.co/goIDRYe) is a small, high-level guide to a small, high-level language.
    
    The second part, understanding what JavaScript actuall *is* turns out to be a hilarious mess.

    ECMAScript is a living language, currently on version ES6.  BUT most browsers don't support ES6 very well, as seen in this [handy table](http://kangax.github.io/compat-table/es6/).

    BUT, ES5 has good cross-browser support for (for everything except Strict mode), as seen this [this other handy table](http://kangax.github.io/compat-table/es5/).

    I originally thought that browsers only supported ES3: the stable release version from 1999.  And, I think, that was true until ES5 was release in 2009.

   So, my take-away messages from this:

1) JavaScript is ECMAScript, plus the WHATWG DOM API.
2) For a solid decade JavaScript was based on ES3, but now ES5 is standard.
3) ES will continue to develop as a language, but browser support will lag behind.
4) If I want to write pure, frameworkless, client-side JavaScript, I can write in ES3 or ES5.

   The rabbit hole of history... begins with Netscape Navigator and ends with some tiny group of software engineers working to "standardize the internet".  Good luck with that.
