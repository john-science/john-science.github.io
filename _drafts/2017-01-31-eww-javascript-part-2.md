---
layout: post
title: "EWW JavaScript - Part 2"
tags: [JavaScript, Software]
summary: Everything Wrong With JavaScript - Part 2 - Structural Problems
---
{% include JB/setup %}

In part 1 of this series, we covered the minor annoyances of JavaScript. The little flaws in the language that needle people and bother them, but are not serious problems. In this section we will cover the major problems in the JavaScript language, of which there are many.

Again, I want to make it clear that I like the language. It has a friendly, homemade LISP feel, and I appreciate it for its minimalist structure. Most major languages bloat up hugely as they age, but JavaScript has not.

### Structural Problems

For the fastudious, this series is going to address ECMAScript 3. This is the heart of the JavaScript language, and I do not believe ECMAScript 5 has added any real problems to the language.

#### Global Variables

Global variables are evil. But it seems as if JavaScript is designed such that everyone's code should be centered around global variables. This leads to ugly, hard to debug, buggy code. And I feel like anyone who had written enough code to design a language would know that. Ah well, you can't fight history.

Luckily, JavaScript closures offer a way for us to variables that would otherwise be global.

    TODO: example code

#### Inner Function Namespaces

If you have a function inside another function, you would expect the inner function to have access to the private variables in the outer function. And they do. However, sadly, the inner function does not have access to outer function namespace (`this`).  This seems clearly a mistake on the part of the language design. But it has been around so long no, the ECMAScript team just can not remove it.

    TODO: example code

#### etc

TODO

#### etc

TODO


### To Be Continued?

Have I missed something? What is it about JavaScript that drives you insane? Tell us in the comments below.
