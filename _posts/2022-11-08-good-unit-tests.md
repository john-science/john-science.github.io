---
layout: post
title: "Good Unit Tests and Testable Code"
tags: [Software, Python]
summary: Good tests help you, and good code is testable.
---
{% include JB/setup %}

This post is about how to design a good test, so the main take-aways will work for any language. But, in order to have a meaningful discussion we need working examples. So the tech stack for this talk is: [python]([https://pythongeeks.org/python-unit-testing/](https://github.com/john-science/python_for_scientists/blob/main/classes/17_testing_projects/lecture_17.md)) and [pytest](https://docs.pytest.org/en/7.2.x/how-to/usage.html).

Before we start, install `pytest` and `pytest-cov` for testing, and `requests` for example code:

```bash
pip install pytest
pip install pytest-cov
pip install requests
```


# Important Concepts to Learn

The goal here is to understand a few key concepts about good unit tests:

* Good unit tests cover all the important concepts of the code.
* Good unit tests cover the smallest possible unit of code.
* Good unit tests are understandable by strangers new to the code.
* Good unit tests shouldn't be fragile.
* Poorly-written code can always be refactored.
* Test-Driven Development: Use tests to help you write better code.


# What is a "Good" Unit Test?

## 0. The Counter Example

Let's say we want to test this simple function to calculate the roots of the quadratic equation (`quad.py`):

```python
import math

def quadratic_equation(a, b, c):
    term = math.sqrt(b * b - 4 * a * c)

    min_x = (-b - term) / 2 * a
    max_x = (-b + term) / 2 * a

    return [min_x, max_x]
```

Here is an example test file (`test_quad.py`):

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

If we put these files both in the same folder, we can run the test with `pytest test_quad.py`:

```
$ pytest test_quad.py
============ test session starts ============ 
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]
============ 1 passed in 0.05s ============
```

> Success! Our test passes!

This would be a good time to run code coverage on our unit tests, to see how much of our code is actually tested. Luckily, `pytest-cov` makes this really easy with `pytest --cov=quad test_quad.py`:

```
$ pytest --cov=quad test_quad.py
============ test session starts ============
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]

----------- coverage: platform linux, python 3.9.7-final-0 -----------
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


## 1. Covers All Important Concepts

If you rememeber elementary school math, you probably spot a few issues with the `quad` function above.

Whenever we write tests, the first question is always the same:

> What are the important concepts here?

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Quadratic_eq_discriminant.svg/220px-Quadratic_eq_discriminant.svg.png" alt="Number of Intercepts">

An important concept about the [quadratic equation](https://en.wikipedia.org/wiki/Quadratic_equation) is the [discriminant](https://en.wikipedia.org/wiki/Quadratic_equation#Discriminant) (`disc = b*b - 4ac`):

* If `disc` is positive, there are two roots.
* If `disc` is zero, there is one root.
* If `disc` is negative, there are no real roots.

What happens when we give our `quad` method inputs so that the discriminant is negative?  Let's try that in `test_quad.py`:

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

Whoops. We had a unit test. And we had 100% "code coverage". But we failed to test the 3 important concepts in our code, so we missed that our function had multiple bugs.


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

Notice that we fixed two bugs:

1. Negative discriminants no longer result in error.
2. When `discriminant == 0`, we now get one returned intercept, not two.

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

And we run can run it (with coverage):

```
$ pytest --cov=quad test_quad.py
============ test session starts ============
platform linux -- Python 3.9.7, pytest-7.0.1
collected 1 item

test_quad.py .                  [100%]

----------- coverage: platform linux, python 3.9.7-final-0 -----------
Name      Stmts   Miss  Cover
-----------------------------
quad.py       6      0   100%
-----------------------------
TOTAL         6      0   100%
============ 1 passed in 0.18s ============
```

Awesome.

> Test-Driven Development: We used tests to write better code.

Another way people use [test-driven development](https://www.agilealliance.org/glossary/tdd/) is they write the important unit tests _before_ they write their code. It is likely drawing out a blueprint for all your important features before you start writing. (Just another tool to have under your belt.)


### Did we forget anything?

Did we forget to test anything in our quadratic function?


## 2. Good Tests are Understandable by Strangers New to the Code

**Brass Tacks**: Would someone who has never seen this code before understand how good our test is? Probably not: we don't explain about the discriminant and our three cases.  So, essentially, that test is useless to anyone but us. (And probably in 2 years it would be useless to us, too.) But that's easy to fix:

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

Okay, we now have three tests. They are three times as long as the first one, and do the same thing. But that's okay. You don't win points for writing tests in as few lines as possible.

> We now have three, easy-to-read tests which explain themselves.


# Making Code Testable

Poorly-written code isn't testable:

* functions are too long
* hidden constants hide important information
* important logic is mixed with file I/O
* important logic is mixed with external processes


## 0. The Counter Example

As yet another example of test-driven development, let's look at a funny little funcion that finds the total population of the world by looking on Wikipedia (`world_pop.py`):

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

> :warning: This is a silly little example meant to motivate a discussion of testing. NEVER scrape Wikipedia for data; they provide an easy download of all of their data [here](https://en.wikipedia.org/wiki/Wikipedia:Database_download).

And we can test this function with a simple test:

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

1. What happens if/when Wikipedia changes the exact layout of that page?
2. What happens _when_ the Earth's population changes?
3. How do we test the edge cases of the CSV writer in this function?
4. How do we test the edge cases of the HTML parser in this function?
5. How do we test that the total population is calculated correctly?

To a novice programmer, the above function "works" because it ran once. To a more seasoned programmer, the above function is really three different functions all Frankensteined together. There are three completely different pieces of functionality here that all have there own edge cases. But glued together like this, those edge cases aren't testable. Also, two of the three sub-functions here could be helpful/reused in other places. But not if they are all part of one mega function.

So, what would a [refactor](https://en.wikipedia.org/wiki/Code_refactoring) of this code look like?

First, let's break the function down into three sub-functions:

```python
import requests

CSV_PATH = "world_pop.csv"
WIKI_POP_URL = "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)"

def get_world_pop(url=WIKI_POP_URL, csv_path=CSV_PATH):
    pops = get_world_pop_wikipedia(url)
    write_pops_csv(pops, csv_path)
    return sum_values(pops)
```

**NOTE**: We also pulled out two constants, so we aren't hiding important information deep in the code. Remember that the next person who looks at your code will also be busy, and you should value their time.

Okay, so a more complete version of our program might look like (`world_pop.py`):

```python
import requests

CSV_HEADER = "Country,Population\n"
CSV_PATH = "world_pop.csv"
WIKI_POP_URL = "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)"

def get_world_pop(url=WIKI_POP_URL, csv_path=CSV_PATH):
    """get the world population from Wikipedia"""
    pops = get_world_pop_wikipedia(url)
    write_pops_csv(pops, csv_path)
    return sum_values(pops)

def get_world_pop_wikipedia(url):
    """NOTE: This is a terrible way to parse HTML. Use BeautifulSoup."""
    r = requests.get(url)
    rows = str(r.content).split("<table")[1].split("table>")[0].split("<tr")[2:-1]

    pops = {}
    for row in rows:
        country = row.split("<td")[1].split("</a>")[0].split(">")[-1]
        pop = int(row.split("<td")[5].split("<")[0].split(">")[1].replace(",",""))
        pops[country] = pop
    
    return pops

def write_pops_csv(pops, csv_path):
    """write population of each country to a CSV file"""
    with open(csv_path, "w") as f:
        f.write(CSV_HEADER)
        for country, pop in pops.items():
            f.write(",".join([country, str(pop)]) + "\n")

def sum_values(dct):
    """Return the sum of all the values in a dictionary
    (assuming all values are numerical).
    """
    return sum(dct.values())
```

And if we run the test, it still passes.


## 2. Good Unit Tests Cover the Smallest Possible Unit of Code

Now that our code is broken into pieces, we can actually test each piece. Let's start from the bottom, with testing the simplest function (`sum_values()`):

```python
def test_sum_values(self):
    # Test Case: empty dict
    d = {}
    self.assertEqual(world_pop.sum_values(d), 0)

    # Test Case: integers and floats
    d = {"a": 1, "b": 2.2}
    self.assertEqual(world_pop.sum_values(d), 3.2)

    # Test Case: large set of values
    d = {str(i): i for i in range(100)}
    self.assertEqual(world_pop.sum_values(d), 4950)
```

Well, that is how we would _want_ our function `sum_values()` to work, but it doesn't quite. Right now if we pass an empty `dict` to `sum_values()`, we get an error. So, based on our testing, we will modify our function to handle this edge case better:

```python
def sum_values(dct):
    """Return the sum of all the values in a dictionary
    (assuming all values are numerical).
    """
    if len(dct):
        return sum(dct.values())
    else:
        return 0
```

Cool. Now let's test the `write_pops_csv()` method, by passing it one empty `dict` and one full one, and verifying that the function (a) creates an output file by name we give it, and (b) the file has the correct number of lines:

```python
def test_write_pops_csv(self):
    # Test Case: no data = no file
    pops = {}
    csv_path = "no_data.csv"
    with self.assertRaises(ValueError):
        world_pop.write_pops_csv(pops, csv_path)

    self.assertFalse(os.path.exists(csv_path))

    # Test Case: arbitrary data
    n = 100
    pops = {str(i): i for i in range(n)}
    csv_path = "data100.csv"
    world_pop.write_pops_csv(pops, csv_path)

    self.assertTrue(os.path.exists(csv_path))
    num_lines = len(open(csv_path, "r").readlines())
    self.assertEqual(num_lines, n + 1)
    os.remove(csv_path)  # cleanup
```

Again, we find this test fails, so we need to add a little safety catch for our empty `dict` case to the top of the function:

```python
def write_pops_csv(pops, csv_path):
    if not len(pops):
        raise ValueError("There is no population data to write to CSV.")
    # ...
```


## 3. Good Tests Shouldn't be Fragile

The last function we have to test is the one that: 

* gets the HTML from Wikipedia
* parses the primary data table for population
* and builds a population dictionary by country.

For the moment, let's ignore that this function is a "bad idea", and just think about the testing. This test is fragile in a couple ways, what happens if:

1. we try to run the test and don't have an internet connection?
2. the the number of people in the world goes up?

Well, in both of those cases our test would fail even though our code still runs. 

To fix this, we need to:

1. Fake an internet connection and the webpage.
2. Fake some HTML data with a static world population.

Well, luckily for us Python provides a great way to fake any internet connection, database connection, external process location or practically anything else with `unittest.mock.MagicMock`. (If you don't want to learn HOW I did this, fine. But it's important to know WHY.)

```python
import os
import unittest
from unittest.mock import MagicMock, patch
import world_pop

EX_HTML = """<!DOCTYPE html><html><head></head><body><table>
<thead><th></th><th>Country</th><th>region</th><th>subregion</th><th>pop1</th><th>pop2</th><th>Change</th></thead><tr></tr>
<tr>::before<td><a>Aba</a></td><td>Asia</td><td>East Asia</td><td>400</td><td>401</td><td>+0.25%</td></tr>
<tr>::before<td><a>Bac</a></td><td>Asia</td><td>East Asia</td><td>100</td><td>101</td><td>+1.0%</td></tr>
<tr></tr></table></body></html>"""

class TestWorldPop(unittest.TestCase):
    @patch('world_pop.requests')
    def test_world_pop_end2end(self, mock_requests):
        # mock the response return value of the get() method
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = EX_HTML
        mock_requests.get.return_value = mock_response

        self.assertEqual(world_pop.get_world_pop(csv_path="end2end.csv"), 502)

if __name__ == "__main__":
    unittest.main()
```

So that is the end-to-end test, and now (finally) we can add another little unit test for the first little function:

```python
@patch('world_pop.requests')
def test_get_world_pop_wikipedia(self, mock_requests):
    # mock the response return value of the get() method
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.content = EX_HTML
    mock_requests.get.return_value = mock_response

    pops = world_pop.get_world_pop_wikipedia(world_pop.WIKI_POP_URL)
    self.assertEqual(len(pops), 2)
    self.assertIn("Aba", pops)
    self.assertIn("Bac", pops)
```

And now we have 4 unit tests for 4 functions. They unit tests have 100% code coverage, yes, but more importnaly they cover all the major features of our code separately. And we can read the tests to convince ourselves of exactly how our code functions.


# Important Take-Aways

What should we keep in mind when writing "good" tests?

* Good unit tests cover all the important concepts of the code.
* Good unit tests cover the smallest possible unit of code.
* Good unit tests are understandable by strangers new to the code.
* Good unit tests shouldn't be fragile.
* Poorly-written code can always be refactored.
* Test-Driven Development: Use tests to help you write better code.
