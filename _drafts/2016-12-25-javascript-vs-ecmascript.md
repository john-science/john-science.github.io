---
layout: post
title: "JavaScript vs ECMAScript"
tags: [JavaScript, ECMAScript, Software]
summary: JavaScript, ECMAScript, and the rise and fall of Netscape Navigator.
---
{% include JB/setup %}

Recently, I was wondering through a park in San Francisco with a friend who works at YouTube.  I made an old joke:
    
> I've never learned JavaScript, but I've written a lot of it.

I see this a lot. Someone has to write a bit of front-end [JavaScript](https://en.wikipedia.org/wiki/JavaScript) for a website, so they throw it together and move on with their life. They never actually sit down to learn the language; like they might for C++.  Of course, Thom works at YouTube and is serious about his work. So he made an honest study of the language.
    
As we continued walking through the park, I further showed my ignorance saying that JavaScript was a static language that had not changed or grown in years. Thom immediatley corrected, saying that ECMAScript came back to life in 2009.
    
Okay, okay. Thom. I get it. I will go back to the drawing board: learn JavaScript for real, and figure out what is going on with the whole ECMAScript thing.
    
The first part was actually pretty easy.  To my surprise, JavaScript is an enjoyable (albeit highly flawed) language to learn. And it is one of the smaller languages out there, which speeds up the process considerably. I chose the only good book available: [JavaScript: The Good Parts](http://a.co/goIDRYe) is a small, high-level guide to a small, high-level language. Mind you, I was just learning the one language, not everything about web development (see [JavaScript Fatigue](https://medium.com/javascript-scene/why-im-thankful-for-js-fatigue-i-know-you-re-sick-of-those-words-but-this-is-different)).

The second part, figuring out what JavaScript actually *is* turned out to be less straight forward. People tend to give you history lessons, and forget major details, and worst of all they disagree heavily on the answer.  Which is strange, considering JavaScript is always on the [IEEE's top-ten list of most common programming languages](http://spectrum.ieee.org/computing/software/top-10-programming-languages/). Part of the story I already knew, and probably so do you. But I found a lot of misinformation online, so here we go.

### JavaScript vs ECMAScript: A History of the Browser Wars

In the long lost days of yore, at the dawn of the first browser wars, there was Netscape Navigator.  And in these early days a man arose, [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), who was tasked with including [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29) into Netscape Navigator 2.0.  But at the last moment his evil overlors, Netscape and Sun, conspired against him and he was forced to create a new language from scratch, that would have the functional features of a LISP, but with the syntax of Java. Why not stick wirh Scheme? Why not use Python or Perl? We will never know.

In ten days in May, 1995, Eich designed and built the first version his new language, integrated it with the doomed Netscape browser, and named it Mocha. It was a good name. And Eich was a conquering hero. Eventually, Netscape changed his name to LiveScript, but it did not lessen Eich's success.

By September of 1995, the handsomest men in Netscape's marketing department decided to change the name of the new language to JavaScript. Which is a shit name, that has been confusing everyone that first encounters the language for decades. Long may those marketing trolls burn in hell.

The dot com battles moved fast, and by 1996 Microsoft had cloned JavaScript for their browser, the dreaded Internet Explorer. And with their new juggernaut they defeated everyone around them, effectively ending the browser wars for more than a decade. The last stable release of Netscape Navigator came out in 1998, and in the following decade Internet Explorer reigned supreme, with all but complete market control. But Microsoft did not love JavaScript, nor did they hire Eich as their champion.

In 1996, the JavaScript language was submitted to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) for standardization. Thus it came to pass that JavaScript was no longer its own language. By June of 1997, the first offically standardized version of the language was released as ECMAScript version 1. This was much like Eich's creation, but as a pure language, without the [DOM API](https://en.wikipedia.org/wiki/Document_Object_Model).

In December of 1999, ECMAScript 3 was released onto the world. And that is what Internet Explorer used. From time to time they called it JScript, but it was no different. For a decade Microsoft dominated the market and suppressed all change; to JavaScript and much else. The world languished under their thumb.

That is what Internet Explorer was based on, though the occassionally called it [JScript](https://en.wikipedia.org/wiki/JScript), it was no different. And for a decade Microsoft dominated the market, and supressed all changes to JavaScript and much else. The world languished under their thumb.

Then, when all hope was lost, ECMAScript 5 appeared to the world. Along with headway made FireFox, the browser wars started back up again. Microsoft was forced to make changes, to start implementing improvements to JavaScript and their browser. In 2015, ECMAScript 6 was released. And in 2016, ECMAScript 7 was born onto the world.

The wheel turns. ECMAScript moves on a fast pace, though the version of JavaScript browsers support changes much more slowly.

### JavaScript vs ECMAScript: The Take-Away Message

In the end, there seem to be seven basic facts you have to understand to disentangle JavaScript and ECMAScript.

1. JavaScript was originally its own language, created immensely fast at Netscape in 1995.
2. JavaScript was quickly separated into independent components: the base language and the web DOM API.
3. The standards organization ECMA International controls the core language, which is now called ECMAScript.
4. The [WHATWG](https://en.wikipedia.org/wiki/WHATWG) community now controls the DOM API part of JavaScript.
5. From 1999 to 2009, JavaScript was a fairly static version of ECMAScript 3 and the DOM API.
6. The "JavaScript" supported by most browsers today is based on ECMAScript 5.
7. New versions of ECMAScript are released regularly, but the version that browsers support lags behind.

Is it happens, most browsers today have pretty good support for JavaScript based on ECMAScript 5, as seen in [this handy table](http://kangax.github.io/compat-table/es5/). But they still do not generally support ECMAScript 6, as seen in [this other handy table](http://kangax.github.io/compat-table/es6/).

JavaScript was only its own language for a very short time. Today it is just ECMAScript plus the WHATWG DOM API. But there is no hard version on JavaScript, because there is no one in charge of it. The only version you can find is in the underlying ECMAScript language. The ECMA International organization seeks to impose standardization and order upon the internet. Good luck with that.
