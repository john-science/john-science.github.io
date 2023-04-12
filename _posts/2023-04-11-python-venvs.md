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

Nearly every time we use Python (or any modern programming langauge), we will want third-party dependencies. That is, we will want to use Python tools that don't come pre-packaged with the Python programming language.

<span style="display:inline;border:0px"><img src="https://numpy.org/doc/stable/_static/numpylogo.svg" alt="numpy logo" style="width:100px;display:inline;border:0px">
<img src="https://scipy.org/images/logo.svg" alt="scipy logo" style="width:100px;display:inline;border:0px">
<img src="https://docs.pytest.org/en/7.3.x/_static/pytest_logo_curves.svg" alt="pytest logo" style="width:100px;display:inline;border:0px">
<img src="https://cdn.hackr.io/uploads/posts/attachments/1661435997Dn3JeIBdJo.webp" alt="scikit learn logo" style="width:100px;display:inline;border:0px">
<img src="https://www.gstatic.com/devrel-devsite/prod/vb33fefd4f475972d9db8a48eb99721b7e7821d5a39de2b21c4f6caf579ea0944/tensorflow/images/lockup.svg" alt="tensorflow logo" style="width:100px;display:inline;border:0px"></span>


## What is a Virtual Environment?

The important question here is really:

> What is a Python Path?

How does the Python interpretter know where to look when you do an import?

* ```import math```
* ```import numpy```
* ```from my_script import my_function```

It turns out, understanding this problem and how Python solves it is pivitol to understanding Python programs.  For instance, let's say you have installed `numpy`; the world's most popular Python math library.  But then, for whatever reason, you create a file called `numpy.py` in your current directory.  What happens in your script if you type "`import numpy`"? 

This, and other similar problems, is called "dendency resolution".  And the Python interpretter solves this using a defined order of operations:

1. First, Python tries to import local files
2. Then, it tries to import from the Standard Library
3. Then, it tries to import from various installed libraries.

Now, understanding that order of operations is important to predicting what your Python program wil do.  Though we are glossing over a lot of details in number 3 above.  But we _can_ gloss over those details because you can always get an exact list of the ordered list of directories Python will look for an import by looking at `sys.path`.

Okay, that's all cute, but:

> What is a Virtual Enviroment?

That was the question, right?

Well, imagine you are working on three different projects on your laptop. Some days you work on one project, other days you work on another. You keep switching back and forth. But each project uses a different version of `numpy`.  Uh oh. You are now in "dependency hell", just like the cartoon above. The Python interpretter can't resolve this problem for you.

> The solution is to use Python virtual environments.

In fact, it is a good practice to create and use a virtual enviornment for _every_ Python project you work on.  (Don't worry, it's super easy!)


## Creating a venv

To experiment with virtual environments, we need some Python code. Let's create a little Python script and call it `whats_a_path.py`:

```python
import sys

for path in sys.path:
    print(path)
```

Now, from the commandline, we can run this script (in Windows or 'Nix):

```bash
λ python whats_a_path.py

C:\Users\USER_NAME\codes\scratch
C:\Users\USER_NAME\tools\Python3.9.7\python39.zip
C:\Users\USER_NAME\tools\Python3.9.7\DLLs
C:\Users\USER_NAME\tools\Python3.9.7\lib
C:\Users\USER_NAME\tools\Python3.9.7
C:\Users\USER_NAME\tools\Python3.9.7\lib\site-packages
```

Now, your path may look a little different, but you will see a lot of similarities. By default, in the path you will see:

* The directory you are currently in.
* The directory your Python is installed in.
* Some extra directories Python uses to store third-party libraries.

Okay! Finally! Let's create a virtual environment:

```bash
python -m venv my_venv
```

You should see the folder "`my_venv`", and now we can activate the venv to use it:

```bash
# on Windows
my_venv/Scripts/activate.bat

# on Linux/Mac
source my_venv/bin/activate

(my_venv) λ
```

And now, we should see our command prompt has changed and it says "`(my_venv)`". This will signify that inside this command prompt, from here on out, when we run Python commands, they will use our "virtual enviroment. For example:

```bash
(my_venv) λ python whats_a_path.py

C:\Users\USER_NAME\codes\scratch
C:\Users\USER_NAME\tools\Python3.9.7\python39.zip
C:\Users\USER_NAME\tools\Python3.9.7\DLLs
C:\Users\USER_NAME\tools\Python3.9.7\lib
C:\Users\USER_NAME\tools\Python3.9.7
C:\Users\USER_NAME\tools\Python3.9.7\lib\site-packages
C:\Users\USER_NAME\codes\scratch\my_venv
C:\Users\USER_NAME\codes\scratch\my_venv\lib\site-packages
```

Notice the important change here, the `my_venv` folders are now in the path. And they come BEFORE the Python system libraries. This tells us that when we run Python code inside our venv, it will look in a special set of directories in that venv for third-party libraries. This is how we keep the third-party libraries in our various projects separate.

### Bonus Round: Python versions

If you have multiple versions of Python installed on your computer, you can also create virtual environments with different versions of Python:

```bash
λ python3.7 -m venv venv_37

λ python3.8 -m venv venv_38

λ python3.9 -m venv venv_39
```


## Adding a Library

Okay, but so far, we haven't really _used_ the virtual env for anything.  Let's install something:

```bash
(my_venv) λ pip install numpy==1.24.2

blah blah blah... installing...
Successfully installed numpy-1.24.2

(my_venv) λ python
Python 3.9.7 (tags/v3.9.7:1016ef3, Aug 30 2021, 20:19:38) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import numpy
>>> numpy.__version__
'1.24.2'
```

> Huzzah!

Now, if we leave our virtual env, we can show that this did what we thought it did: installed NumPy only into our venv.

```bash
(my_venv) λ deactivate
λ 
λ python
Python 3.9.7 (tags/v3.9.7:1016ef3, Aug 30 2021, 20:19:38) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import numpy
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'numpy'
>>>
```

And THAT is the whole idea.  

We can now install whatever dependencies our projects need, but keep our projects separate. We can avoid dependency hell!

Seriously though, it takes one line to create a venv, one line to activate it, and one line to deactivate it. I use virtual environments in 99% of my Python work, and I highly suggest you do the same.


## requirements files

Okay, so we can now easily create totally independent Python enviornments, and keep them separate on the same machine. That's super helpful. But there's another super helpful, super easy to understand and use, tool that helps in all this: the `requirements.txt` file.

It's easy.  You just create a dead simple, plain text file, where each line is your library. Like this one:

```text
numpy
scipy>=1.9
matplotlib
tensorflow==2.12.0
```

And then all you have to do get a virtual environment going is activate your venv and:

```bash
(my_venv) λ pip install -r requirements.txt
```

Done.  Super easy to use.

And this is how practically all Python projects share their dependeny needs: they just keep a little `requirements.txt` file in their repo for people to build their venv with.
