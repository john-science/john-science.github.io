---
layout: post
title: "Good Unit Tests and Testable Code"
tags: [Software, Python]
summary: Good tests help you, and good code is testable.
---
{% include JB/setup %}


> TODO


# Why test? / What's a test? (Finds bugs, sure.)

* They are there to save you heart ache and time in the future.
* Also, to catch bugs.
* They keep your code stable over the years, without you having to watch it like a hawk.


# What is a "Good" Unit Test?

<img src="https://imgs.xkcd.com/comics/random_number.png" alt="What is a Good test?">

1. covers _all_ important concepts
2. is short
3. is readable / understandable by strangers seeing the code for the first time
4. not fragile
5. Covers as small a part of the code as possible


# Code coverage!

TODO


# Making Code Testable

Poorly-Written Code isn't testable

* funtions are too long
* mixing important logic in the same method with: DB calls, IO, web comm, or external EXEs / processes


# TODO: Ideas for code to test:

* maybe just show one test for each thing above?
* Maybe `monte_carlo_pi` with printing to a file every 1,000 lines.


## TODO: Surpise Second Post? 

> The High Cost of Unused Code

Probably a different post?
