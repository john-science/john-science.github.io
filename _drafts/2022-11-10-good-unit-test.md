---
layout: post
title: "Good Unit Tests and Testable Code"
tags: [Software, Python]
summary: Good tests help you, and good code is testable.
---
{% include JB/setup %}

This is really just about how to design a good test, so the main take-aways will work for any language. But in order to have a meaningful discussion, we need working examples, so the tech stack for this talk is: [python]([https://pythongeeks.org/python-unit-testing/](https://github.com/john-science/python_for_scientists/blob/main/classes/17_testing_projects/lecture_17.md)) and [pytest](https://docs.pytest.org/en/7.2.x/how-to/usage.html).

Before we start, install `pytest`, `pytest-cov`, and `requests`:

```bash
pip install pytest
pip install pytest-cov
pip install requests
```


# Why test?

* To catch bugs.
* To save you heart ache and time in the future.
* To keep your code stable over the years.


# What is a "Good" Unit Test?

## 0. The Counter Example

Let's say we want to test this simple code (`quad.py`):

```python
import math

def quadratic_equation(a, b, c):
    term = math.sqrt(b * b - 4 * a * c)

    min_x = (-b - term) / 2 * a
    max_x = (-b + term) / 2 * a

    return [min_x, max_x]
```

And here is our test file (`test_quad.py`):

```python
import unittest
from quad import quadratic_equation

class TestQuadEqn(unittest.TestCase):
    def test_quan_eqn(self):
        a = 1
        b = 5
        c = 6

        vals = quadratic_equation(a, b, c)

        self.assertEqual(vals[0], -3)
        self.assertEqual(vals[1], -2)

if __name__ == "__main__":
    unittest.main()
```

If we put these files both in the same folder, we can run them with `pytest test_quad.py`:

```
$ pytest test_quad.py
============ test session starts ============ 
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]
============ 1 passed in 0.05s ============
```

> Success!

Our tests pass, so our code must be good. Hurray. This would be a good time to run code coverage on our unit tests, so see how much of our code is actually tested. Luckily, `pytest-cov` makes this really `pytest -cov=quad test_quad.py`:

```
$ pytest --cov=quad test_quad.py
============ test session starts ============
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]

----------- coverage: platform win32, python 3.9.7-final-0 -----------
Name      Stmts   Miss  Cover
-----------------------------
quad.py       6      0   100%
-----------------------------
TOTAL         6      0   100%
============ 1 passed in 0.18s ============
```

> Success, again!

Well, that was easy. We wrote a single unit test, and we got 100% code coverage.

> Ship it!


## 1. Covers _all_ Important Concepts

If you remmeber elementary school, you probably spot a few different issues with the code above.

What _are_ the important concepts with the quadratic equation?

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Quadratic_eq_discriminant.svg/220px-Quadratic_eq_discriminant.svg.png" alt="Number of Intercepts">

An important concept about the [quadratic equation](https://en.wikipedia.org/wiki/Quadratic_equation) is the [discriminant](https://en.wikipedia.org/wiki/Quadratic_equation#Discriminant) (`disc = b*b - 4ac`):

* If `disc` is positive, there are two roots.
* If `disc` is zero, there is one root.
* If `disc` is negative, there are no real roots.

And what happens when we give our `quad` method inputs so that the discriminant is negative?  Let's try that in `test_quad.py`:

```python
import unittest
from quad import quadratic_equation

class TestQuadEqn(unittest.TestCase):
    def test_quan_eqn(self):
        a = 10
        b = 1
        c = 10

        vals = quadratic_equation(a, b, c)

        self.assertEqual(vals[0], -3)
        self.assertEqual(vals[1], -2)

if __name__ == "__main__":
    unittest.main()
```

And run it:

```
$ pytest test_quad.py 
============ test session starts ============
platform linux -- Python 3.9.14, pytest-7.2.0
collected 1 item

test_quad.py F                  [100%]

============ FAILURES ============
____________ TestQuadEqn.test_quan_eqn ____________
self = <test_quad.TestQuadEqn testMethod=test_quan_eqn>

    def test_quan_eqn(self):
        a = 10
        b = 1
        c = 10
    
>       vals = quadratic_equation(a, b, c)

test_quad.py:12: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

a = 10, b = 1, c = 10

    def quadratic_equation(a, b, c):
>       term = math.sqrt(b * b - 4 * a * c)
E       ValueError: math domain error

quad.py:5: ValueError
============ short test summary info ============
FAILED test_quad.py::TestQuadEqn::test_quan_eqn - ValueError: math domain error
============ 1 failed in 0.03s ============
```

Right, so we had a unit test and we had 100% "code coverage". But we failed to test 3 important concepts in our code, so we missed a couple of different bugs.

### Fixing this Mess: Test-Driven Development

Okay, so our code is broken. Let's re-write it to acutally work with these three discriminant options:

```python
import math

def quadratic_equation(a, b, c):
    disc = b * b - 4 * a * c

    if disc < 0:
        return []

    term = math.sqrt(disc)
    max_x = (-b + term) / 2 * a
    if disc == 0:
        return [max_x]

    min_x = (-b - term) / 2 * a
    return [min_x, max_x]
```

And now we can re-write our test:

```python
import unittest
from quad import quadratic_equation

class TestQuadEqn(unittest.TestCase):
    def test_quan_eqn(self):
        vals = quadratic_equation(10, 1, 10)
        self.assertEqual(len(vals), 0)

        vals = quadratic_equation(1, -10, 25)
        self.assertEqual(vals[0], 5)

        vals = quadratic_equation(1, 5, 6)
        self.assertEqual(vals[0], -3)
        self.assertEqual(vals[1], -2)

if __name__ == "__main__":
    unittest.main()
```

Awesome, and now we run it:

```
$ pytest --cov=quad test_quad.py
============ test session starts ============
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]

----------- coverage: platform win32, python 3.9.7-final-0 -----------
Name      Stmts   Miss  Cover
-----------------------------
quad.py       6      0   100%
-----------------------------
TOTAL         6      0   100%
============ 1 passed in 0.18s ============
```

Awesome.

> Test-Driven Development: We used tests to write better code.

We rewrote our code to be correct after writing tests that cover all the important concepts our code should have. This is called "test-driven development", and it's a great tool to have under your belt.

### Did we forget anything?

Did we forget to test anything in our quadratic function?


## 2. Understandable - by Strangers New to the Code

Okay, so, would someone who has never seen this code before understand just how good our test is? Probably not, we don't explain about the discriminant, and the three cases we are testing.  So, essentially, that test is useless to anyone but us. (And probably in 5 years, it will be useless to us too.) So, let's fix it:

```python
import unittest
from quad import quadratic_equation

class TestQuadEqn(unittest.TestCase):
    def test_quan_neg_disc(self):
        """
        There are no solutions to the quadratic equation if
        the discriminant is negative.
        """
        a = 10
        b = 1
        c = 10
        vals = quadratic_equation(a, b, c)
        self.assertEqual(len(vals), 0)

    def test_quan_zero_disc(self):
        """
        There is one solution to the quadratic equation if
        the discriminant is exactly zero.
        """
        a = 1
        b = -10
        c = 25
        vals = quadratic_equation(a, b, c)
        self.assertEqual(vals[0], 5)

    def test_quan_pos_disc(self):
        """
        There are two solutions to the quadratic equation if
        the discriminant is positive.
        """
        a = 1
        b = 5
        c = 6
        vals = quadratic_equation(a, b, c)
        self.assertEqual(vals[0], -3)
        self.assertEqual(vals[1], -2)

if __name__ == "__main__":
    unittest.main()
```

Okay, we now have three tests, and they are three times as long as the first one, but only accomplish the same thing. But there's no points for writing unreable code in as few lines as possible. We now have three, easy-to-read tests which explain themselves.


# Making Code Testable

Poorly-Written Code isn't testable:

* functions are too long
* important logic is mixed with file I/O
* important logic is mixed with external processes
* hard-coded variables hide important information
* inflexible code is less useful

## 0. The Counter Example

As yet another example of test-driven development, let's look at a funny little funcion that finds the total population of the world by looking on Wikipedia; `world_pop.py`:

```python
import requests

def get_world_pop():
    # get world population data from Wikipedia
    url = "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)"

    r = requests.get(url)

    rows = str(r.content).split("<table")[1].split("table>")[0].split("<tr")[2:-1]

    pops = {}
    for row in rows:
        country = row.split("<td")[1].split("</a>")[0].split(">")[-1]
        pop = int(row.split("<td")[5].split("<")[0].split(">")[1].replace(",",""))
        pops[country] = pop

    # write population of each country to a CSV file
    csv_file = "world_pop.csv"
    with open(csv_file, "w") as f:
        f.write("Country,Population\n")
        for country, pop in pops.items():
            f.write(",".join([country, str(pop)]) + "\n")

    # return world total population
    total_pop = sum(pops.values())
    return total_pop
```

(At the time of this writing, this function works and has no errors.)

As you can see from the comments, this function is a three-step process:

1. get world population data from Wikipedia
2. write population of each country to a CSV file
3. return world total population

> :warning: This is a silly little example meant to motivate a discussion of testing. NEVER scrape Wikipedia for data, they offer a simple, easy, complete download of any-and-all of their data [here](https://en.wikipedia.org/wiki/Wikipedia:Database_download).

And, we can test this function with a simple test:

```python
import unittest
from world_pop import get_world_pop

class TestWorldPop(unittest.TestCase):
    def test_world_pop(self):
        self.assertEqual(get_world_pop(), 7710537362)

if __name__ == "__main__":
    unittest.main()
```

Running this test (with code coverage):

```
$ pytest --cov=world_pop test_world_pop.py 
============ test session starts ============
platform linux -- Python 3.9.14, pytest-7.2.0,
collected 1 item 

test_world_pop.py .                             [100%]

---------- coverage: platform linux, python 3.9.14-final-0 -----------
Name           Stmts   Miss  Cover
----------------------------------
world_pop.py      27      9   100%
----------------------------------
TOTAL             27      9   100%
============ 1 passed in 0.35s ============
```

Success! We ran a single unit test and our code passed!

(Kidding, that code is a mess and the test is a symptom.)


## 1. Poorly-Written Code can Always be Refactored

Here are some questions about the above code:

1. What happens if/when Wikipedia changes the exact alyout of their web page?
2. What happens _when_ the Earth's population changes?
3. How do we test the edge cases of the CSV writer in this function?
4. How do we test the edge cases of the HTML parser in this function?
5. How do we test that the total population is calculated correctly?

To a novice programmer, the above function "works" because it ran once. To a more seasoned programmer, the above function is really three different functions all Frankensteined together. There are three completely different pieces of functionality here that all have there own edge cases. But glued together like this, these edge cases aren't testable. Also, two of the three sub-functions here could be helpful in other places and reused. But not if they are all part of one mega function.

So, what would a [refactor](https://en.wikipedia.org/wiki/Code_refactoring) of this code look like?

First, let's break the main method down into three methods:

```python
import requests

CSV_PATH = "world_pop.csv"
WIKI_POP_URL = "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)"

def get_world_pop(url=WIKI_POP_URL, csv_path=CSV_PATH):
    pops = get_world_pop_wikipedia(url)
    write_pops_csv(pops, csv_path)
    return sum_values(pops)
```



## 2. Good tests should test very small parts of the Codes alone

> TODO


## 3. Good tests shouldn't be fragile

> TODO


## TODO: Surpise Second Post? 

> The High Cost of Unused Code

Probably a different post?
