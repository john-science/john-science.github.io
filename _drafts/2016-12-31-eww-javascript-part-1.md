---
layout: post
title: "EWW JavaScript - Part 1"
tags: [JavaScript, Software]
summary: Everything Wrong With JavaScript - Part 1 - Design Problems
---

{% include JB/setup %}

This will not be an angry tirade against JavaScript. It is an enjoyable language to learn. It is a high-level langauge with a small standard library, and a quirky selection of programming paradigms. But the original version of JavaScript was notoriously written in just two weeks, and there are all kinds of problems. Some of them are design flaws, some are issues in the standard libary, some are serious, some hardly matter at all.

In this series I will try to catalogue all the problems in JavaScript without resorting to personal preference; only problems that generally affect most if not all developers.

This series will only discuss problems with Vanilla JavaScript (ECMAScript 3). This is the heart of the JavaScript language, and I do not believe ECMAScript 5 has added any real problems to the language.


### Design Problems

In part 1 of this series I will only describe major problems and design flaws in JavaScript.


#### Global Variables

All top-level variables are tossed together into the *global object*. This is a fundamental design choice in JavaScript, but causes many problems because global variables are evil.

JavaScript gives us three ways to define a global variable.

    var x = value;     // outside of any function
    window.x = value;  // anywhere
    x = value;         // anywhere

The first of these three options seems fair. Most languages force variables defined outside any other scope to be global. Fine. And the second option is just a DOM-specific variation on the first option. Again, fine. The third option is evil though. If you forget to declare your variables, they automatically get upgraded to global. This *must* have been a feature added to help beginners, but this is a prime example of a feature causing more problems than it solves.

People have designed all kinds of patterns and frameworks to help each other get around JavaScript's global-centric design. I usually use some kind of closure:

    var f = {function() {
      var hidden = 1;  // not global

      return {
        // export your interface here
      };
    }());


#### No Tail Recursion Optimization

In some languages, if a function returns the result of calling itself recursively, the interpreter or compiler will replace the code with a loop. This can make the code much faster and also save the developer from return stack overflow. Tail recursion is one of the most common programming patterns used in functional programming and so optimizing for it correctly is extremely important in those languages. JavaScript was designed to be a functional language like Scheme, with Java's syntax, which makes it worse that JavaScript does not provide any such optimization.

It is not hard to create a tail recursive function in JavaScript that explodes the return stack. Let us try to write a tail recursive Factorial function:

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

JavaScript does not have arrays. Arrays are contiguous blocks of memory that contain a sequence of elements of the same type. They are a staple in many languages. JavaScript has a built-in type called `Array` that looks vaguely like arrays, but they are not.

Perhaps the problem is just one of symmantics. Historically, the name `Array` was used to make JavaScript seem more like Java. It was meant to make the language more accessible to an audience that were new to the language. However, the end effect is the opposite, since everyone new to JavaScript has to stumble on the nomenclature. The problem could have been easily fixed by changing the name `Array` to `Sequence`, or some such.


#### Block Scope

JavaScript has the same curly bracket syntax `{}` as C and Java, but the brackets denote lexical scoping, not block scoping. Most of us grealy prefer block scope, as it helps compartmentalize the code. It was a brave choice to use lexical scoping, but not one I will argue against. However, it feels more awkward than creative when it uses stolen syntax.


#### Variable Declaration Order

You can declare variables after you use them in JavaScript. This is a result of the lack of block scoping mentioned above.

The standard approach to dealing with both of these problems is to declare all your variables at the very top of the function.


#### Unicode

JavaScript only supports 16-bit unicode. Because, well, it's old. But this is the internet we're talking about; it spans the world. It would be nice if JavaScript supported 32-bit unicode.


#### include

I am imagining sitting down to design a language and thinking, "No, I don't want a keyword to include or import other files." I try to imagine, but fail. It is an inscrutable decision. I picture building the city of Rome, but no roads leading to it.


#### Weak Typing / Lack of Static Typing

Vanilla JavaScript is designed around a very weak typing system, without even optionally static typing. Myself, I prefer static typing, and this is a pretty common complaint about JavaScript. But, in the end, it was a purposeful design choice for the language. I just can't muster any nerd rage about this one.


### To Be Continued

Have I missed something? What is it about JavaScript that drives you insane? Tell us in the comments below.
