---
layout: post
title: "Everything Wrong With JavaScript - Part 1"
tags: [JavaScript, Software]
summary: Design Flaws and Major Problems with JavaScript
---

{% include JB/setup %}

This will not be an angry tirade against JavaScript. For all of its flaws, JavaScript is a very successful language, widely used around the world. It is also the most popular functional programming language ever. However, the first version of JavaScript was notoriously written in just two weeks, so there are problems. In this series I will attempt to catalogue all of those problems.

Just to be clear, this series will only discuss problems with JavaScript 1.3 (ECMAScript 3). This was the defacto version for over a decade, and I don't think ECMAScript 5 or 6 have added any problems of their own.


### Design Problems

In part 1 of this series I will only describe design flaws and major problems with JavaScript.


#### Global Variables

JavaScript is built around global variables. All top-level variables are tossed into the *global object*. This is a fundamental design choice in JavaScript, but causes serious problems because global variables are evil.

JavaScript gives us three ways to define a global variable:

    var x = value;     // in global scope
    window.x = value;  // anywhere
    x = value;         // anywhere

The first option seems fair. Most languages force variables defined in the global scope to be global. Fine. And the second option is just a DOM-specific variation on the first. Again, fine. The third option is evil though. If you forget to declare a variable, it will automatically get upgraded to global. This *must* have been a feature added to help beginners, but it definitely causing more problems than it solves.

People have designed all kinds of patterns and frameworks to help each other get around JavaScript's global-centric design. I usually rely on closure:

    var f = {function() {
      var hidden = 1;  // not global

      return {
        // export your interface here
      };
    }());


#### No Tail Recursion Optimization

In some languages, if a function returns the result of calling itself recursively, the interpreter or compiler will replace the code with a loop. This can make the code much faster and also save the developer from return stack overflow. Tail recursion is one of the most common programming patterns used in functional programming and so optimizing for it correctly is extremely important. JavaScript was designed to be a functional language like Scheme (with Java's syntax) which makes it even worse that JavaScript does not provide any such optimization.

It is not hard to create a tail recursive function in JavaScript that explodes the return stack. Here is a tail recursive Factorial function:

    function Factorial(current, result) {
      if (current === 1) {
        return result;
      }

      return Factorial(current - 1, result * current);
    }

For small numbers, there is no problem:

    >> Factorial(4, 1);
       24

But in situations where you want a moderate number of iterations you overflow the call stack:

    >> Factorial(5199, 1);
       InternalError: too much recursion


#### Array

JavaScript does not have arrays. Arrays are contiguous blocks of memory that contain a sequence of elements of the same type. They are a staple in many languages. JavaScript has a built-in type called `Array` that looks vaguely like an array on the surface.

The name "Array" appears to be chosen to help people who started with Java, C, Fortan or the like, where Arrays are key. In the end, the name just makes these people stumble in the beginning. There are several types of common functionality for real arrays (see part 2 of this series) that are missing or just impossible with a JavaScript "Array". At the very least, the `Array` object in JavaScript should have been given a different name.


#### Block Scope

JavaScript has the same curly bracket syntax `{}` as C and Java, but the brackets denote lexical scoping, not block scoping. Most of us grealy prefer block scoping. It was a brave choice to use lexical scoping, but not one I will argue against. However, it feels more awkward than creative when it uses stolen syntax.


#### Variable Declaration Order

You can declare variables after you use them in JavaScript. At best, this can make code very hard to read. At worst, it leads to some annoyingly hard-to-find bugs. This is a result of the lack of block scoping mentioned above.

The standard approach to dealing with this is to declare all your variables at the very top of the function.


#### Unicode

JavaScript only supports 16-bit unicode. Because, well, it's old. But this is the internet we're talking about; it spans the world. It would be nice if JavaScript supported 32-bit unicode.


#### include

JavaScript lacks an include keyword to import other JavaScript files. There are ways to work around this using the DOM, but it is still a bizarre choice. Imagine:

* building all the cities of the Roman Empire, but no roads between them.
* teaching every person in the world to write, then blinding them.
* your favorite programming language without include/import: Java, C, C++, Python...


#### Weak Typing / Lack of Static Typing

Vanilla JavaScript is designed around a very weak typing system, without even optionally static typing. Myself, I prefer static typing, and this is a pretty common complaint about JavaScript. But, in the end, it was a purposeful design choice for the language. I just can't muster any nerd rage about this one.


### To Be Continued

What is it about JavaScript that drives you insane? Leave your thoughts in the comments below.
