---
layout: post
title: "What's a Haskell?"
tags: [Software, Haskell]
summary: A Day-1 Exploration of the Haskell Language
---
{% include JB/setup %}

This will be a skeptical, shallow-dive into Haskell. I just want to take a single-day look at the Haskell language and see what it's all about. If you have spent a decade using Haskell in production and know all of its deep secrets, you will probably hate me for how much of your beautiful temple I am glossing over.  `#sorrynotsorry`

The first time I encounter a new language, I tend to bang out a few trivial examples just to get the flavor of things.

### Hello World

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

### Fibonacci Function

Okay, the first function I usually try to build in a new language calculates the Nth term in the Fibonacci series. Since I am just trying to get the flavor of the language I don't worry about overflow or performance issues here.

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
