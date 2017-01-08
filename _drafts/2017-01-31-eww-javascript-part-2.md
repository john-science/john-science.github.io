---
layout: post
title: "EWW JavaScript - Part 2"
tags: [JavaScript, Software]
summary: Everything Wrong With JavaScript - Part 2 - Minor Problems
---
{% include JB/setup %}

In part 1 of this series, we covered the major problems with JavaScript. But not all of the problems with JavaScript are large-scale systemic problems. Some of the problems are just niggling little details which demand that you constantly work around them. Those petty annoyances are what we are covering today.

Again, I want to make it clear that I like the language. It has a friendly, homemade LISP feel, and I appreciate it for its minimalist structure. Most major languages bloat up hugely as they age, but JavaScript has not.

### Minor Problems

What follows will be the least technical part of the EWW JavaScript series. These are just the petty, little things that bother people, but not the serious structural flaws we will meet later in the series.

#### The Name

JavaScript is a terrible name.  Basically everyone who encounters the language the first time is forced to ask the question:

> Hey, wait, is JavaScript related to Java?

The answer, of course, is no.  But why create the confusion in the first place?  It turns out this was a ploy made by the handsomest guys in marketing at Netscape in 1995. And we're stuck with it. 


#### new

JavaScript is not a vanilla object oriented language, where there is a hard-line difference between classes and the objects that are instances of those classes. JavaScript provided a much more expressive inheritance system, which is a glorious idea. In particular, JavaScript provides a protypal inheritance, where objects inherit the properties of other objects. Arguments about performance not withstanding, this is expressive and powerful.

Then some clever bloke decided to add the `new` keyword to the language. The `new` keyword uses the `prototype` object on a given function and constructs a new object from it. And, of course, it allows for some extra logic at instantiation so that an object can be configured. This is an interesting and useful idea.

However. Every function has a `prototype` object. And there is no way to identify at compile time which functions are truely constructors. You must simply hope that the function you call `new` on is meant to be a constructor. Because there is no way to know at run time. The `prototype` object is what is important. While many people have designed ways to determine which functions are meant to be constructors ("The first letter is capital!"), it seems safer to just not use the `new` keyword.


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

There may have been a use-case for this `.length` method that made it a beautiful idea. But that use-case is not immediately clear upon inspection.


#### Array vs Object

Most everything in JavaScript is an object, including functions and Arrays. Which is fine. But for some reason when you try to find the type of an Array, JavaScript returns "object". This is inconvenient, to be sure, but also quite unexpected. After all, Arrays are built into the foundations of the language; it is a strange omission (sp?).

    >> a = [1,2,3];
    >> typeof(a)
       "object"

To be sure, people have come up with all kinds of tricks to get around this. Casting the object to JSON and looking for square brackets usually works. But what if the Array was created in a different window? The only test I have found that works cross-browser, and cross-window is pretty inefficient:

    var isArray = function(value) {
      return Object.prototype.toString.apply(value) === '[object Array]';
    }


#### Array Dimensions

The object we call an Array in JavaScript is extremely general, able to act like a Queue or Stack extremely easily. But because it is meant to be so general it doesn't have a basic array initializer, which is pretty annoying. You either have to write your own initializer, or design your code to not try an access an element of the array that hasn't been filled yet.

My bias is to know ahead of time the exact state of the objects I am working with. Which we can do by creating our own array initializer:

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

### Array.sort

JavaScript does not come with extensive standard libraries the way that some modern languages do (like Python). So you would expect the standard libraries that do come with JavaScript to be well-designed and dependable. You would be totally wrong, but you can expect anything you want, I guess.

The default sorting method on Arrays does not sort numbers correctly:

    >> a = [2, 7, 18, 5, 9];
    >> a.sort();
    [18, 2, 7, 9];

Seriously, it would have take like an hour to do a type check on the default `sort` method and use slightly different logic. But, no, the default method converts everything to Strings before sorting them. And here we are. Luckily, we can pass our own sorting function to this method, to fix the problem that should have been fixed in the standard library 20-some years ago:

    >> a.sort(function(a, b) {
         return a - b;
       });

### String.substring

The `.substring()` method does the exact same as the `.slice()` method, expect that it does not accept negative values.

It was redundant and useless 20 years ago, and it still is.

### Auto-Magic Semicolons

Another feature that undoubtedly came from a desire to help beginners with JavaScript is automatic inject of semicolons. This has caused me problems in the past, but has never saved me any work. Particularly because of outlying cases that different browsers try and treat differently. The classic bad example is this code:

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

### Reserved Words

For reasons lost to time (or I'm too lazy to look up) JavaScript has a ton of reserved words that are not actually used in the language. Which is the kind of thing tends to make one simultaneously angry and tired. The reserved words which make sense are:

    arguments await* break case    catch class* const continue debugger default delete do else enum* eval export* extends* false finally for function if implements import* in instanceof interface let* new null package private protected public return static super* switch this throw true try typeof var void while with yield

Keywords marked with `*` were useless, but are now used in ECMAScript 5/6.

And here is the offending list of keywords that have never been used in the language:

    abstract boolean byte char double final float goto int long native short synchronized throws transient volatile

I should mention here that ECMAScript 5 and 6 actually removes all of the above unused reserved words. Sadly, a lot of people still use Internet Explorer, so we are not in an ECMAScript 5 world yet.

### typeof

The `typeof` operator is supposed to return a string that describes the type of an object.

    >> typeof 3.14
    "number"
    >> typeof 'hi'
    "String"
    >> typeof {whatever: "stuff"}
    "object"

But there are many examples of complete counter-intuitive behaivor:

    >> typeof null
    "object"
    >> typeof [1, 2, 3]
    "object"
    >> typeof NaN
    "number"

### parseInt

The `parseInt` function is supposed to take in a string, and if possible, convert it to an integer:

    >> parseInt("3")
    3
    >> parseInt("3.14")
    3
    >> parseInt("whoops")
    NaN

The problem is that if you pass it a string that starts with some numbers, it will parse the leading characters and drop the rest; silently.

    >> parseInt("1600 Pennsylvania Avenue")
    1600

### NaN

The type of `NaN`, which remember is literally an abbreviation for "Not a Number" is... `"number"`:

    >> typeof NaN
    "number"

And it doesn't stop there. The way JavaScript evaluates `NaN` in predicate statements is mind-boggling:

    >> NaN === NaN
    false
    >> NaN !== NaN
    true

### ==

The usual boolean operators (`==` and `!=`) do not act like you would expect in JavaScript. The first thing they do is convert the things on either side of the operator to the same type, and *then* they compare them. This is obviously radically slower than the typical boolean operators in, like, every single other programming language.

These operators also result in a hot mess in other ways:

    >> '' == '0'
    false
    >> '0' == ''
    true

    >> false == 'false'
    false
    >> false == '0'
    true

The list goes on and on. 

The only solution is to use `===` and `!==`, which are the usual boolean operators from other languages. They do not do any type conversion at all. To variables of different types are not equal. If JavaScript did not include these operators, most of use would write them ourselves as functions.

### Bitwise Operators

Many, perhaps most, languages include bitwise operators. They are meant to be extremely low-level, fast commands that allow you to actually shift around the bits of a binary integer. Of course, JavaScript does not have integers, only decimals. This means that JavaScript has to convert your float to an integer before applying the bitwise operators. This involves a lot of error-handling and special cases. And the end result is so slow there is no reason left to have them in the language. Avoid them.

### void

In JavaScript, for some reason, `void` is an operator that takes in a value and returns undefined. Which, yes, is exactly as useless as it sounds. Find me a good use case for this operator and I will buy you a coffee/beer.


### To Be Continued?

Have I missed something? What is it about JavaScript that drives you insane? Tell us in the comments below.
