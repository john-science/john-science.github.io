---
layout: post
title: "Everything Wrong with JavaScript: vol 2"
tags: [JavaScript, Software]
summary: Minor Atrocities in JavaScript
---

{% include JB/setup %}

[Part 1](/2017/01/09/eww-javascript-part-1) of this series covered the major design problems with JavaScript. But some of the worst problems in life are small things that prick us, day in and day out. JavaScript has these in spades.

Again, I want to make it clear that I like the language. It has a friendly, homemade LISP feel, and I appreciate it for its minimalist size. Most major languages bloat up hugely as they age, but JavaScript has not.


### Minor Atrocities

JavaScript does not come with extensive standard libraries the way that some modern languages do (e.g. Python). So you would expect the standard libraries that do come with JavaScript to be well-designed and dependable. You would be totally wrong, of course. JavaScript was infamously designed and built in only a couple weeks and the standard library is filled with oddities.


#### The Name

JavaScript is a terrible name. Basically everyone who encounters the language the first time is forced to ask the question:

> Hey, wait, is JavaScript related to Java?

The answer, of course, is no. But why create the confusion in the first place? It turns out this was a ploy made by the handsomest guys in the Netscape marketing department in 1995. The moral here is: never let marketing make any important decisions.


#### new

JavaScript is not your typical object oriented language, where there is a hard-line difference between classes and the objects that are instances of those classes. JavaScript provided a much more expressive inheritance system, which is a glorious idea. In particular, JavaScript provides a protypal inheritance, where objects inherit the properties of other objects. Arguments about performance not withstanding, this is expressive and powerful.

Then some clever bloke decided to add the `new` keyword to the language. The `new` keyword uses the `prototype` object on a given function and constructs a new object from it. And, of course, it allows for some extra logic at instantiation so that an object can be configured. This is an interesting and useful idea.

However, every function has a `prototype` object. And there is no way to tell at run time which functions are constructors. This ambiguity can lead to bugs. Many people have designed ways around this problem ("The first letter of a constructor label is capital!"), it seems safer to just not use `new`.


#### Array.length

You would be forgiven if you thought that the `.length` method on an array would return the number of elements in the array. And, indeed, it can sometimes look like that:

    >> a = [1, 2, 3];
    >> a.length;
    3

Because, remember, arrays are just objects with some syntactic sugar to make it look like they have sequential indicies. So the `.length` method actually just returns the largest index plus one:

    >> b = [];
    >> b[0] = 1;
    >> b.length;
    1
    >> b[10000] = 2;
    >> b.length;
    10001

There may have been a use-case for this `.length` method that made it a beautiful idea. But that use-case is not immediately obvious on inspection.


#### Array vs Object

Most everything in JavaScript is an object, including functions and Arrays. But for some reason when you try to find the type of an Array, JavaScript returns "object". This is inconvenient, to be sure, but also quite unexpected. After all, Arrays are a fundamental building block in JavaScript; it is a strange omission.

    >> a = [1,2,3];
    >> typeof(a)
       "object"

To be sure, people have come up with all kinds of tricks to get around this. Casting the object to JSON and looking for square brackets usually works. But what if the Array was created in a different window? The only test I have found that works cross-browser and cross-window is pretty inefficient:

    var isArray = function(value) {
      return Object.prototype.toString.apply(value) === '[object Array]';
    }


#### Array Initialization

The object we call an Array in JavaScript is extremely general, able to act like a Queue or Stack extremely easily. But because it is meant to be so general it doesn't have a basic array initializer, which is pretty annoying. You either have to write your own initializer, or design your code to not try and access an element of the array that hasn't been filled yet.

I prefer to know the exact state of the objects I am workign with ahead of time. Which we can do by creating our own array initializer:

    Array.init = function(length, value) {
      var a = [];
      var i;
      for (i=0; i < length; i += 1) {
        a[i] = value;
      }
      return a;
    }

    // initialize an array of 1000 zeros
    var arr = Array.init(1000, 0);


#### Array.sort

The default sorting method on Arrays does not sort numbers correctly:

    >> a = [2, 7, 18, 5, 9];
    >> a.sort();
    [18, 2, 7, 9];

Seriously, it would have take like an hour to do a type check on the default `sort` method and use slightly different logic. But, no, the default method converts everything to Strings before sorting them. And here we are. Luckily, we can pass our own sorting function to this method, to fix a mistake that should have been fixed 20-some years ago:

    >> a.sort(function(a, b) {
         return a - b;
       });


#### String.substring

The `.substring()` method does the exact same as the `.slice()` method, expect that it does not accept negative values.

It was redundant and useless 20 years ago, and still is.


#### Auto-Magic Semicolons

Another feature that undoubtedly came from a desire to help beginners is the automatic inject of semicolons. This has caused me problems in the past, but has never saved me any. Particularly because of outlying cases that different browsers try and treat differently. The classic bad example is this code:

    return
    {
      important: code
    };

Since JavaScript is meant to be whitespace independent, if you wrote something like the above you would naively expect it to be read as:

    return {
      important: code
    };

However, what JavaScript actually reads is:

    return;
    {
      important: code
    };

Notice that this version, with the automatically inserted semicolon, has unreachable code after the return statement.

The real problem here is that this leaves ambiguity in the language: JavaScript is only "mostly" whitespace independent.


#### Reserved Words

For reasons lost to time (or I'm too lazy to look up) JavaScript has a ton of reserved words that are not actually used in the language. Which is the kind of thing tends to make one simultaneously angry and tired. The reserved words which make sense are:

    arguments await* break case catch class* const continue debugger default delete do else enum* eval export* extends* false finally for function if implements import* in instanceof interface let* new null package private protected public return static super* switch this throw true try typeof var void while with yield

Keywords marked with `*` were useless, but are now used in ECMAScript 5/6.

And here is the offending list of keywords that have never been used in the language:

    abstract boolean byte char double final float goto int long native short synchronized throws transient volatile

I should mention here that ECMAScript 5 and 6 actually removes all of the above unused reserved words. Sadly, a lot of people still use Internet Explorer, so we are not in an ECMAScript 5 world yet.


#### typeof

The `typeof` operator is supposed to return a string that describes the type of an object.

    >> typeof 3.14
    "number"
    >> typeof 'hi'
    "String"
    >> typeof {whatever: "stuff"}
    "object"

But there are many examples of completely counter-intuitive behaivor:

    >> typeof null
    "object"
    >> typeof [1, 2, 3]
    "object"
    >> typeof NaN
    "number"

Unlike in most languages, I tend not to trust or use the `typeof` keyword in JavaScript.


#### parseInt

The `parseInt` function is supposed to take in a string, and if possible, convert it to an integer:

    >> parseInt("3")
    3
    >> parseInt("3.14")
    3
    >> parseInt("whoops")
    NaN

The problem is that if you pass it a string that starts with some numbers, it will parse the leading characters and drop the rest; silently. We need some way to be notified when this edge case occurs.

    >> parseInt("1600 Pennsylvania Avenue")
    1600


#### NaN

The `NaN` keyword is literally an abbreviation for "Not a Number". And in JavaScript the type of `NaN` is... `"number"`:

    >> typeof NaN
    "number"

And it doesn't stop there. The way JavaScript evaluates `NaN` in predicate statements is mind-boggling:

    >> NaN === NaN
    false
    >> NaN !== NaN
    true


#### ==

The usual boolean operators (`==` and `!=`) do not act like you would expect in JavaScript. The first thing they do is convert the terms on either side of the operator to the same type, and *then* they compare them. This is obviously radically slower than the typical boolean operators in, like, every other programming language.

These operators area also a hot mess in a lot of other ways:

    >> '' == '0'
    false
    >> '0' == ''
    true

    >> false == 'false'
    false
    >> false == '0'
    true

The list goes on and on. 

The only solution is to use `===` and `!==`, which are the usual boolean operators from other languages. They do not do any type conversion. Two variables of different types are not equal. If JavaScript did not include these operators, most of use would build them ourselves.


#### Bitwise Operators

Many, perhaps most, languages include bitwise operators. They are meant to be extremely low-level, fast commands that allow you to shift around the bits of a binary integer. Of course, JavaScript does not have integers, only floats. This means that JavaScript has to convert your float to an integer before applying the bitwise operators. This involves a lot of error-handling and special cases. And the end result is so slow there is no reason left to have them in the language. Avoid them.


#### void

In JavaScript, for some reason, `void` is an operator that takes in a value and returns `undefined`. Which, yes, is exactly as useless as it sounds.


#### To Be Continued?

What is it about JavaScript that drives you insane? Leave your thoughts in the comments below.
