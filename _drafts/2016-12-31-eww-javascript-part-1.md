---
layout: post
title: "EWW JavaScript - Part 1"
tags: [JavaScript, Software]
summary: Everything Wrong With JavaScript - Part 1 - Major Problems
---
{% include JB/setup %}

Recently, I was wandering through some park in San Francisco with a friend who works at YouTube. As he started talking about his work, I joked:
    
> I've never learned JavaScript, but I've written a lot of it.

Like a lot of people, particularly back-end people, I had nothing but disdain for JavaScript. So I never sat down and learned the language like I did C++. I just hacked together enough JavaScript to get the rare page working and moved on with my life.

As we walked on, I found out that JavaScript was no longer a static language. There was a decade of inactivity while Internet Explorer dominated the browser world, sure. But new versions of ECMAScript have been coming out since 2009. 
    
> Okay, okay. Thom. I get it. I will go back and learn JavaScript for real. Finally.

This is not the point where I go on an angry triade against JavaScript.  To my surprise, it was an enjoyable (albeit highly flawed) language to learn.  I started by picking up the only good book available: [JavaScript: The Good Parts](http://a.co/goIDRYe) which is a small, high-level guide to a small, high-level language.

### Major Problems

For the fastudious, this series is going to address ECMAScript 3. This is the heart of the JavaScript language, and I do not believe ECMAScript 5 has added any real problems to the language.

#### Global Variables

Global variables are evil. But it seems as if JavaScript is designed such that everyone's code should be centered around global variables. This leads to ugly, hard to debug, buggy code. And I feel like anyone who had written enough code to design a language would know that. Ah well, you can't fight history.

Luckily, JavaScript closures offer a way for us to variables that would otherwise be global.

    TODO: example code

#### Inner Function Namespaces

If you have a function inside another function, you would expect the inner function to have access to the private variables in the outer function. And they do. However, sadly, the inner function does not have access to outer function namespace (`this`).  This seems clearly a mistake on the part of the language design. But it has been around so long no, the ECMAScript team just can not remove it.

    TODO: example code

#### Arrays

TODO

#### include

TODO

#### Weak Typing / Lack of Static Typing

I won't spend too much time on this. Vanilla JavaScript is designed around a very weak typing system, with a complete lack of static typing as an option. Myself, I prefer static typing, and this is a pretty common complaint about JavaScript. But, in the end, it was a purposeful design choice for the language. I just can't muster any nerd rage about this one.

TODO

#### etc

TODO

#### etc

TODO

#### etc

TODO


### To Be Continued

Have I missed something? What is it about JavaScript that drives you insane? Tell us in the comments below.
