---
layout: post
title: "Python Virtual Environments"
tags: [Software, Python]
summary: A quick introduction to Python Virtual Environments.
---
{% include JB/setup %}


> Python Virtual Environments are a super light weight, easy-to-use solution to one of software's oldest problems: managing dependencies.

<img src="https://imgs.xkcd.com/comics/python_environment.png" alt="Relevant XKCD Comic" style="width:50%">


## What problem are we trying to solve?

Nearly every time we use Python (or any modern programming langauge), we will want third-party dependencies. That is, we will want to use NumPy, Pandas, SciPy, or other helpful Python tools for math, plotting, web development, and the like. We nearly always want to use tools that don't come pre-packaged with the Python programming language.

<span style="display:inline;border:0px"><img src="https://numpy.org/doc/stable/_static/numpylogo.svg" alt="numpy logo" style="width:100px;display:inline;border:0px">
<img src="https://scipy.org/images/logo.svg" alt="scipy logo" style="width:100px;display:inline;border:0px">
<img src="https://docs.pytest.org/en/7.3.x/_static/pytest_logo_curves.svg" alt="pytest logo" style="width:100px;display:inline;border:0px">
<img src="https://matplotlib.org/_static/images/logo_dark.svg" alt="matplotlib logo" style="width:100px;display:inline;border:0px">
<img src="https://www.gstatic.com/devrel-devsite/prod/vb33fefd4f475972d9db8a48eb99721b7e7821d5a39de2b21c4f6caf579ea0944/tensorflow/images/lockup.svg" alt="tensorflow logo" style="width:100px;display:inline;border:0px"></span>


## What is a Virtual Environment?

The important question here is really:

> What is a Python Path?

When Python code is running, how does the Python interpretter know where to look when you do an import?

* ```import math```
* ```import numpy```
* ```from my_script import my_function```

It turns out, understanding this problem and how Python solves it is pivitol to understanding Python programs.  For instance, let's say you have installed in your Python the third-party math library `numpy`.  But then, for whatever reason, you create a file called `numpy.py` in your current directory.  What happens in your script if you type "`import numpy`"? 

This is called "dendency resolution".  And the Python interpretter solves this using a defined order of operations:

1. Try to import local files first
2. Try to import from the Standard Library
3. Try to import from various installed libraries.

Now, understanding that order of operations for all Python imports is super important to understanding Python.  Though we are glossing over a lot of details in number 3 there. But it _can_ gloss over those details because you can always get an exact list of the ordered list of directories Python will look for an import by looking at `sys.path`.

Okay, that's all cute, but:

> What is a Virtual Enviroment?

That was the question, right?

Well, imagine you are working on three different projects on your laptop. Some days you work on one project, other days you work on another. You keep switching back and forth. But each project uses a different version of `numpy`.  Uh oh. You are no in "dependency hell", just like the cartoon above. The Python interpretter can't resolve this problem for you.

> The solution is to use Python virtual environments.

In fact, it is a good practice to create an use a virtual enviornment for _every_ Python project you work on.  (Don't worry, it's super easy!)


## Creating a venv

To experiment with virtual environments, let's first create a little Python script (and call it `whats_a_path.py`):

```python
import sys

for path in sorted(sys.path):
    print(path)
```

Now, from the commandline, we can run this script (in Windows or 'Nix):

```bash
λ python whats_a_path.py

C:\Users\USER_NAME\codes\scratch
C:\Users\USER_NAME\tools\Python3.9.7
C:\Users\USER_NAME\tools\Python3.9.7\DLLs
C:\Users\USER_NAME\tools\Python3.9.7\lib
C:\Users\USER_NAME\tools\Python3.9.7\lib\site-packages
C:\Users\USER_NAME\tools\Python3.9.7\python39.zip
```

Now, your path may look a little different, but you will see a lot of similarities. By default, in the path you will see:

* The directory you are currently in.
* The directory your Python is installed in.
* Some extra directories Python uses to store libraries (like `lib`).

## Adding a Library

TODO


## requirements files

TODO


https://www.youtube.com/watch?v=KxvKCSwlUv8

