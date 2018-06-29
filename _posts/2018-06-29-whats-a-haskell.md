---
layout: post
title: "What's a Haskell? - Part 1"
tags: [Software, Haskell]
summary: A Day-1 Exploration of the Haskell Language
---
{% include JB/setup %}

This will be a skeptical, shallow-dive into Haskell. I just want to take a single-day look at the Haskell language and see what it's all about. If you have spent a decade using Haskell in production and know all of its deep secrets, you will probably hate me for how much of your beautiful temple I am missing out on.  `#sorrynotsorry`

The first time I encounter a new language, I tend to bang out a few trivial examples just to get the flavor of things.


### Trivial Example 1: Hello World

Okay, in Python, this is beautiful and short:

{% highlight python %}
print("Hello, World!")
{% endhighlight %}

It is somewhat less short in Java:

{% highlight java %}
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
{% endhighlight %}

Let's see what this looks like Haskell:

{% highlight python %}
putStrLn "Hello, World!"
{% endhighlight %}

Not bad: simple and lightweight, though `putStrLn` lacks elegance.


### Trivial Example 2: Fibonacci Function

Okay, the first function I usually try to build in a new language calculates the Nth term in the Fibonacci series. Since I am just trying to get the flavor of the language I don't worry about overflow, performance, memoization, etcetera.

Here it is in Stupid Python:

{% highlight python %}
def fibonacci(n):
    if n < 1:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
{% endhighlight %}

Here it is in slow, recursive C:

{% highlight c %}
long fibonacci(long a, long b, int n) {
    return (--n > 0) ? (fibonacci(b, a + b, n)) : (a);
}
{% endhighlight %}

And actually, my usually trivial example in Haskell wasn't as quick to construct as I was expecting. But it is highly readable:

{% highlight python %}
fibonacci x =
  if x < 1
    then 0
    else if x < 2
           then 1
           else fibonacci (x - 1) + fibonacci (x - 2)
{% endhighlight %}


### Okay, but what's a Haskell?

Haskell is:

* a programming language designed by an academic committee
* purely functional
* statically typed (with automatic type inference)
* compiled (though there is an interpreter)
* list-centric
* no side effects! (Is that really possible?)


### So Far I Hate `ghci`

The `ghci` is the GNU interpretter for Haskell. Okay, you have my attention, I like all of those words.

Oh wait, no, I hate it.

You see, in most interpretters you write code in your language of choice. For instance in Python you can ask for help in the interpreter by doing:

{% highlight python %}
help(something)
{% endhighlight %}

Easy, right?  You did that by using Python code. The `help` statement is just a Python function that you are calling. Okay, now let's try this in `hgci`:

{% highlight python %}
:? something
{% endhighlight %}

Okay, wait, but `:?` isn't Haskell code. It is it's own special syntax that you have to learn just for the `hgci`. So as a newbie learning Haskell you have to learn all the language syntax and another whole collection of syntax just for the `hgci`.

Also, you can't do multi-line programs in the `hgci`. Here is what our simple `factorial` function looks like in the `hgci`:

{% highlight python %}
let {factorial :: (Integral a) => a -> a  ; factorial 0 = 1  ; factorial n = n * factorial (n - 1) }
{% endhighlight %}

Also, it says `prelude>` all over the place for now reason. Which gets old.

No thanks. Hard pass.


### And That's Everything

That's it, I covered the entire language.

Ha. No.

I don't even know what a Monad is yet!  An Applicative Functor?  What?

Okay, I thought that since Lisp (and MIT-Scheme) had such little syntax to learn, Haskell would be fast to spin up on. And so far Haskell seems more like a fully fledge modern language (Java, not C++ or Scala), with a lot of syntax to learn.
