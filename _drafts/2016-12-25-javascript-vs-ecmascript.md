---
layout: post
title: "JavaScript vs ECMAScript"
tags: [JavaScript, ECMAScript, Software]
summary: JavaScript, ECMAScript, and the Browser Wars
---
{% include JB/setup %}


JavaScript is always on the [IEEE's top-ten list of most common programming languages](http://spectrum.ieee.org/computing/software/top-10-programming-languages/). But ECMAScript never is. JavaScript is usually called an object-oriented language, but it was designed to be a LISP. People who are serious about ECMAScript believe it is a beautiful, pristine temple. But cursing JavaScript is one of the oldest, and most popular, sports in Silicon Valley.

There was a long and winding road that led us to this place; but it makes a good story.


### JavaScript vs ECMAScript: A History of the Browser Wars

Long ago, at the dawn of the first browser war, there was Netscape Navigator 1.0.  In these early days a man arose, [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), who was tasked with including [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29) into Netscape Navigator 2.0. But at the last moment his evil overlords, Netscape and Sun, conspired against him and he was forced to create a new language, that would have the functional features of a LISP, but with the syntax of Java. Why not stick with Scheme? Why not use Python or Perl? The logs of history do not say.

In ten days, in May of 1995, Eich designed and built the first version his new language, integrated it with the doomed Netscape browser, and named it Mocha. It was a good name. Eich was a conquering hero. Eventually, Netscape changed the name to LiveScript, but it did not lessen Eich's victory.

By September of 1995, the handsomest men in Netscape's marketing department decided to change the name of the new language to JavaScript. It was a shit name. Long decades have passed, and every beginner stumbles over the name. Did an evil wizard lay the curse of stupidity upon the marketing department? Did they eat the mushrooms of poor judgement? Or were they just evil trolls we always imagined them to be? The logs of history do not say.

The dot com battles moved fast, and by 1996 Microsoft had cloned JavaScript for their browser: the dreaded Internet Explorer. And with that juggernaut they defeated all the other browsers, ending the first browser war. The last stable release of Netscape Navigator was released in 1998, and in the following decade Internet Explorer reigned supreme. But Microsoft did not love JavaScript, they did not tend to its fire; they let it languish.

In 1996, the JavaScript language was submitted to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) for standardization. Thus is came to pass that JavaScript was no longer an island to itself. By June of 1997, JavaScript had been divided in twain, and a new language emerged in the world: ECMAScript. It was meant to be the pure, unsullied temple to Eich's battle-hardened fortress. ECMA would keep his language alive, but they would not be soiled by the [DOM API](https://en.wikipedia.org/wiki/Document_Object_Model).

In December of 1999, ECMAScript 3 was released. This was only the second update and was not meant to be final. But this was the version that Internet Explorer seized upon. And for the next decade they called it [JScript](https://en.wikipedia.org/wiki/JScript) and refused all claims that it could be improved. Thus came the dark decade of the internet, where Microsoft dominated the world market and JavaScript was left frozen in time.

Then, when all hope was lost, ECMAScript 5 appeared. Along with forays made by FireFox, the second brower war began. Internet Explorer was forced change; the juggernaut bowing to competition. Other browsers emerged. ECMAScript 6 was born in 2015 and ECMAScript 7 was born in 2016.

The second great browser war wages on. And long may it last.


### JavaScript vs ECMAScript: The Take-Away Message

There are seven basic facts you have to understand to disentangle JavaScript and ECMAScript.

1. JavaScript was originally its own language, created in only 10 days at Netscape in 1995.
2. JavaScript was quickly separated into two independent pieces: the core language and the web DOM API.
3. The standards organization ECMA International controls the core language, which is calls ECMAScript.
4. The [WHATWG](https://en.wikipedia.org/wiki/WHATWG) community controls the DOM API.
5. From 1999 to 2009, JavaScript was a fairly static version of ECMAScript 3 and a DOM API.
6. The "JavaScript" supported by most browsers today is based on ECMAScript 5.
7. New versions of ECMAScript are released regularly, but browser support lags behind.

As it happens, most browsers today have pretty good support for JavaScript based on ECMAScript 5, as seen in [this handy table](http://kangax.github.io/compat-table/es5/). But they still do not generally support ECMAScript 6, as seen in [this other handy table](http://kangax.github.io/compat-table/es6/).

JavaScript was only its own language for a very short time. Today it is a combination of ECMAScript plus the WHATWG DOM API. What "JavaScript version 1.6" means can vary a lot from computer to computer. But the ECMA International organization seeks to impose standards and order upon the internet. Good luck with that.
