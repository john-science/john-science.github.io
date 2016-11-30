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

Long ago, at the dawn of the first browser war, there was Netscape Navigator 1.0. In those early days a man arose, [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), who was tasked with including [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29) into Netscape Navigator 2.0. But at the last moment his evil overlords, Netscape and Sun, conspired against him and he was forced to create a new language, that would have the functional features of a LISP, but with the syntax of Java. Why not stick with Scheme? Why not use Python or Perl? The logs of history do not say.

In ten days, in May of 1995, Eich designed and built the first version his new language, integrated it with the doomed Netscape browser, and named it Mocha. It was a good name. Eich had battled his overlords and stood a conquering hero. Eventually, Netscape changed the name to LiveScript, but it did not lessen Eich's victory. In late 1995, the handsomest men in Netscape's marketing department decided to change the name of the new language to JavaScript. It was a shit name. In the long decades since it has done nothing but confuse beginners. May that marketing team burn forever in the boiling river of blood and fire in the seventh circle of Hell.

The dot com battles moved fast, and by 1996 Microsoft had cloned JavaScript for their browser: the dreaded Internet Explorer. With that juggernaut they defeated all the other browsers, ending the first browser war. The last version of Netscape Navigator was released in 1998, and in the following decade Internet Explorer reigned supreme. But Microsoft did not love JavaScript, and though it made their browser famous, they ignored the language and let it stagnate..

In 1996, the JavaScript language was submitted to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) for standardization. Thus is came to pass that JavaScript was no longer an island to itself. By June of 1997, JavaScript had been split in half, and a new language emerged: ECMAScript. It was meant to be a pure, unsullied temple to Eich's battle-hardened fortress. ECMA would keep his language alive, but they would not be soiled by the [DOM API](https://en.wikipedia.org/wiki/Document_Object_Model).

In December of 1999, ECMAScript 3 was released. This was only the second update and was not meant to be final. But this was the version that Internet Explorer seized upon. And for the next decade they called it [JScript](https://en.wikipedia.org/wiki/JScript) and refused all claims that it could be improved. Thus came the dark decade of the internet, where Microsoft dominated and JavaScript was left frozen in time.

Then, when all hope was lost, ECMAScript 5 appeared. Along with forays made by FireFox, the second brower war ignited. Internet Explorer was forced to change; the juggernaut bowing to competition. Other browsers emerged. ECMAScript 6 was born in 2015 and ECMAScript 7 was born in 2016.

The second great browser war wages on. Long may it last.


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
