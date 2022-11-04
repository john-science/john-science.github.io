---
layout: post
title: "Good Unit Tests and Testable Code"
tags: [Software, Python]
summary: Good tests help you, and good code is testable.
---
{% include JB/setup %}

This is really just about how to design a good test, so the main take-aways will work for any language. But in order to have a meaningful discussion, we need working examples, so the tech stack for this talk is: [python]([https://pythongeeks.org/python-unit-testing/](https://github.com/john-science/python_for_scientists/blob/main/classes/17_testing_projects/lecture_17.md)) and [pytest](https://docs.pytest.org/en/7.2.x/how-to/usage.html).

Before we start, install `pytest` and `pytest-cov`:

```bash
pip install pytest
pip install pytest-cov
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
λ pytest test_quad.py
============ test session starts ============ 
platform win32 -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]
============ 1 passed in 0.05s ============
```

> Success!

Our tests pass, so our code must be good. Hurray.  This would even be a good time to run code coverage on our unit tests, so see how much of our code is actually tested by our tests. Luckily, `pytest` makes this really easy to do:

```
λ pytest --cov=quad test_quad.py
============ test session starts ============
platform win32 -- Python 3.9.7, pytest-7.0.1
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


## 1. covers _all_ important concepts

TODO

## 2. is short

TODO

## 3. is readable / understandable by strangers seeing the code for the first time

TODO

## 4. not fragile

TODO

## 5. Covers as small a part of the code as possible

TODO



# Code coverage!

TODO

> Fun Fact: I can write a very short test that always passes for this function:

<img src="https://imgs.xkcd.com/comics/random_number.png" alt="What is a Good test?">


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
