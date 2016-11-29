---
layout: post
title: "JavaScript vs ECMAScript"
tags: [JavaScript, ECMAScript, Software]
summary: JavaScript, ECMAScript, and the rise and fall of Netscape Navigator.
---
{% include JB/setup %}

Recently, I was wandering through some park in San Francisco with a friend and we started talking about work. Thom works at YouTube and has been dealing with [JavaScript](https://en.wikipedia.org/wiki/JavaScript) than he has in the past.

I have never sat down and actually tried to learn JavaScript, like I did with C++. So I made a passing comment that JavaScript has not changed in years. Thom immediately corrected me. ECMAScript is alive and well, with a community of people making real progress.

JavaScript is always on the [IEEE's top-ten list of most common programming languages](http://spectrum.ieee.org/computing/software/top-10-programming-languages/). But ECMAScript never is. JavaScript is usually called an object-oriented language, but it was designed to be a LISP, like Scheme, with the Java syntax. People who are serious about ECMAScript believe it is a beautiful, pristine temple. But cursing JavaScript is one of the oldest, and most popular, sports in Silicon Valley. The road that lead us here was twisted and strange; but it makes a good story.


### JavaScript vs ECMAScript: A History of the Browser Wars

Long ago, at the dawn of the first browser wars, there was Netscape Navigator.  In these early days a man arose, [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), who was tasked with including [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29) into Netscape Navigator 2.0.  But at the last moment his evil overlors, Netscape and Sun, conspired against him and he was forced to create a new language from scratch, that would have the functional features of a LISP, but with the syntax of Java. Why not stick wirh Scheme?  Why not use Python or Perl?  The logs of history do tell us.

In ten days, in May of 1995, Eich designed and built the first version his new language, integrated it with the doomed Netscape browser, and named it Mocha. It was a good name.  Eich was a conquering hero.  Eventually, Netscape changed the name to LiveScript, but it did not lessen Eich's success.

By September of 1995, the handsomest men in Netscape's marketing department decided to change the name of the new language to JavaScript. Which is a shit name. Long decades have passed, confusing beginners that first encounter the language. Did an evil wizard lay a curse of stupidity upon the marketing department?  Did they eat the mushrooms of poor judgement?  Or were they just evil trolls in disguise?  The logs of history do not tell us.

The dot com battles moved fast, and by 1996 Microsoft had cloned JavaScript for their browser, the dreaded Internet Explorer. And with their new juggernaut they defeated all the other browser kingdoms, effectively ending the browser wars; for a time. The last stable release of Netscape Navigator came out in 1998, and in the following decade Internet Explorer reigned supreme, with all but complete market control.  But Microsoft did not love JavaScript, and they let in languish.

In 1996, the JavaScript language was submitted to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) for standardization. Thus it came to pass that JavaScript was no longer a language on its own. By June of 1997, the first offically standardized version of the language was released as ECMAScript version 1. This was much like Eich's creation, but it existed as a pure temple, from of the [DOM API](https://en.wikipedia.org/wiki/Document_Object_Model).

In December of 1999, ECMAScript 3 was released onto the world. This is the version that Internet Explorer forced upon the world for an entire decade of their terrible reign. Oh, they took to calling it [JScript](https://en.wikipedia.org/wiki/JScript) and claimed it as their own, but no one was fooled. A decade was lost to the internet, as Microsoft dominated the market there was no room for change for JavaScript. The world languished under their thumb.

Then, when all hope was lost, ECMAScript 5 appeared. Along with headway made by the FireFox kingdom, the browser wars were restarted. Microsoft was forced to make changes, to update, their juggernaut browser had to bow to competition and support the new version of JavaScript. In 2015, ECMAScript 6 was bor. And in 2016, ECMAScript 7 was born.

The browser kingdoms are not quick to adopt the new ECMAScript versions.  But the browser wars have freed the world from tyranny.

### JavaScript vs ECMAScript: The Take-Away Message

There are seven basic facts you have to understand to disentangle JavaScript and ECMAScript.

1. JavaScript was originally its own language, created in only 10 days at Netscape in 1995.
2. JavaScript was quickly separated into two independent pieces: the core language and the web DOM API.
3. The standards organization ECMA International controls the core language, which is now called ECMAScript.
4. The [WHATWG](https://en.wikipedia.org/wiki/WHATWG) community controls the DOM API part of JavaScript.
5. From 1999 to 2009, JavaScript was a fairly static version of ECMAScript 3 and the DOM API.
6. The "JavaScript" supported by most browsers today is based on ECMAScript 5.
7. New versions of ECMAScript are released regularly, but the version that browsers support lags behind.

Is it happens, most browsers today have pretty good support for JavaScript based on ECMAScript 5, as seen in [this handy table](http://kangax.github.io/compat-table/es5/). But they still do not generally support ECMAScript 6, as seen in [this other handy table](http://kangax.github.io/compat-table/es6/).

JavaScript was only its own language for a very short time. Today it is just ECMAScript plus the WHATWG DOM API. What "JavaScript version 1.6" means can vary a lot from computer to computer. The ECMA International organization seeks to impose standardization and order upon the internet. Good luck with that.
