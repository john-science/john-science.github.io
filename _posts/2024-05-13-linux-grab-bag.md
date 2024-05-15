---
layout: post
title: "Linux Grab Bag"
tags: [Linux, BASH, Python]
summary: A grab bag of important Linux concepts for beginners.
---
{% include JB/setup %}

There is no way to make this list "complete". And this will not be a deep dive into these topics. For that, see the included links.

The problem we want to solve is the classic "I don't know what I don't know" problem of a Windows user transitioning to Linux for the first time.


## Shell Variables

Linux, like Windows, has the idea of a [shell variable](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/). The idea isn't hard to understand:

> While you are on the [command line](https://antineutrino.net/2024/05/01/navigating-linux-file-system) there can be variables set that you can use, or that can be used by programs you run.

For instance, we can create and use shell variables quite easily:

```shell
$ THING=123
$ echo $THING
123
$ WHAT="stuff and things"
$ echo $WHAT
stuff and things
```

Easy, right?

Be warned, `THING` and `WHAT` above will disappear when you log out or close the shell.


## Environment Variables

There are really special shell variables called "enviornment variables" that are like shell variables but they are system-wide and are inherited by all child processes and shells.

You can find all of the "environment variables" you have set in your shell by doing:

```shell
jstilley@devwebsvc1:/var/www/html/softwaredocs$ printenv
SHELL=/bin/bash
USER=aeinstein
MAIL=/var/mail/aeinstein
PATH=/home/aeinstein/bin:/home/aeinstein/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
LANG=en_US.UTF-8
SHLVL=1
HOME=/home/aeinstein
LOGNAME=aeinstein
```

If you want to add a special shell variable, you use `export`:

```shell
$ export XYZ=123
$ printenv
...
XYZ=123
...
```


## PATH

One really important BASH environment variable to know about is [`PATH`](https://linuxhandbook.com/add-to-path/):

```shell
$ echo $PATH
/home/aeinstein/bin:/home/aeinstein/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
```

Whenever you type a command on the command line (or execute a command in the script), it will look for that command in the above list of directories to see if the command is found.  For instance, when you do this:

```shell
$ pwd
/var/www/html/softwaredocs
$ which pwd
/bin/pwd
```

How does BASH know what `pwd` or `which` are? Well, it goes through all the directories in the `PATH` variable, in order, until it finds an executable with the given name.

Sometimes, you will want to use programs that are in your own area, and that means adding your program's directory to the `PATH`:

```shell
$ export PATH=/home/aeinstein/xyz:$PATH
$ echo $PATH
/home/aeinstein/xyz:/home/aeinstein/bin:/home/aeinstein/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
```

Now, whenever you type a command, BASH can look in your directory to see if it can find your program!


## alias

Another really useful trick in BASH is to create your own little commands from other commands. Here are some I use all the time:

```shell
$ alias ls='ls -lh'
$
$ ls whatever.txt
whatever.txt
$ ls -lh whatever.txt
-rwxrwxrwx 1 aeinstein domain users 465 Apr 24 22:57 whatever.txt
$ lh whatever.txt
-rwxrwxrwx 1 aeinstein domain users 465 Apr 24 22:57 whatever.txt
```

I'm saving myself a little time here by typing `lh` instead of `ls -lh`. This [alias](https://linuxhandbook.com/linux-alias-command/) may not be that useful to you, but after a while you will find yourself doing the same things over and over again in BASH. This is a great way to customize the shell for yourself.

Again, watch out, your aliases will all disappear when you close the shell or log out.


## .bashrc

Wouldn't it be nice if you could have shell variables set ever time you log back onto your machine? Or if you could save all your favorite aliases, and have them set automatically every time you open a new shell?

Well, you can, by adding the lines you want to a file called `~/.bashrc`:

```shell
# handy aliases I like
alias ls='ls -lh'
alias python='/usr/bin/python3.9'

# aliases for Git
alias lol='git log --graph --decorate --pretty=oneline --abbrev-commit'
alias push='git push origin $1'
alias pull='git pull origin $1'
alias gitd='git diff --name-only'

# set some handy shell variables
export XYZ=123

# find the length of a string (you can use quotes)
function strlen {
    echo ${#1}
}

# sort lines in a file
function sortfile {
    grep -v '^#' ${1} | sort -u
}

# view a CSV in a more human-readable format
function viewcsv {
    column -s, -t < ${1} | less -#2 -N -S
}
```

Once you have your `~/.bashrc` file, you can log out and now every time you log back in it will be loaded. Or you can load it manually with:

```shell
$ source ~/.bashrc 
```

A `~/.bashrc` can make your terminal more custom to you, save you some time, and increase your efficiency in BASH. I have [a nice starter `.bashrc` file](https://gist.github.com/john-science/f6aa96de49a9cba76d53889db6daad7c) that I copy onto any new Linux system I use.



## history

One last, really helpful, command to know in BASH is [history](https://www.howtogeek.com/44997/how-to-use-bash-history-to-improve-your-command-line-productivity/).

If you type `history`, you will see the last N commands you typed on the shell. The record even extends past the last few times you logged out.

```shell
$ history
  1 THING=123
  2 echo $THING
  3 WHAT="stuff and things"
  4 echo $WHAT
  5 export XYZ=123
  6 printenv
  7 echo $PATH
  8 export /home/aeinstein/xyz:$PATH
  9 echo $PATH
 10 alias ls='ls -lh'
 11 ls whatever.txt
 12 ls -lh whatever.txt
 13 lh whatever.txt
 14 vi ~/.bashrc
 15 history
```

As you might expect, the last line in your `history` output is usually "history"!


## Linux Permissions

Every file and directory in Linux has its own [permissions](https://www.geeksforgeeks.org/permissions-in-linux/).

### Viewing Permissions - `ls -l`

To view the permissions is easy:

```shell
ls -l

drwxr-xr-x. 4 aeinstein aeinstein    68 Jun 13 20:25 Dir2
-rwxrw-r--. 1 aeinstein aeinstein  4017 Feb 24  2022 .bashrc
```

So, there are a few columns to look at here:

* File type: `-` for `.bashrc` and `d` for the directory `Dir2`.
* Permission settings: `rwxrw-r--`
* Extended attributes: dot (`.`)
* User owner: `aeinstein`
* Group owner: `aeinstein`

### Understanding Permissions

Let's try to understand the permissions settings: `rwxrw-r--`

This is composed of three clumps: `rwx`, `rw-`, and `r--`

In order, these three clups are:

1. The permissions the `U`ser has.
2. The permissions the `G`roup has.
3. The permissions any `O`ther user on the computer has.

But what do these letters mean?

* `r` - read permissions
* `w` - write permissions
* `x` - execute permissions

### Modifying Permissions - `chmod`

Now the fun part, how do we change the permissions of a file? Well, first things first, you need write permissions on a file/directory to change its permissions. We are going to use `chmod` to modify the permissions of a file. (There is another way to do this, but let's just learn one thing rather than two.)

#### Octal Values

We can cleanly represent all combinations of `r`, `w`, and `x` using a single number and a little math. We will map these three letters to the numbers:

* `r` (read): 4
* `w` (write): 2
* `x` (execute): 1

Now we add up these numbers depending on what the file has:

* Owner: `rwx = 4+2+1 = 7`
* Group: `rw- = 4+2+0 = 6`
* Others: `r-- = 4+0+0 = 4`

Now we can see the `.bashrc` file above had permissions `764`:

> `764` == `rwxrw-r--`

We can also make some other mappings:

> `777` == `rwxrwxrwx`
> `760` == `rwxrw----`
> `740` == `rwxr-----`
> `700` == `rwx------`


#### Using Octal Values

Okay, let's say we want to make a shell script that everyone can read, write, and execute:

```shell
$ chmod 777 hello_world.sh
```

Well, that works, but it's probably not very safe. Let's change it so only we can write or execute the script, but everyone else can read it. That's probably safer:

```shell
$ chmod 744 hello_world.sh
```

Oh, wait, let's say we want to do this same thing to everything in a whole directory. That's probably something we want to do every now and then:

```shell
$ chmod 744 -R Dir2
```

> DO NOT TYPE THIS EXAMPLE!

But, watch out! Linux will let you make mistakes. Do NOT type this:

```shell
$ chmod 000 hello_world.sh
```

Now even YOU can't see or edit that file. Oh no!


### Further Reading

This has been extremely brief discussion of Linux permissions for more information see these references:

* [Geeks for Geeks article](https://www.geeksforgeeks.org/permissions-in-linux/)
* [Linux Handbook post](https://linuxhandbook.com/linux-file-permissions/)
* [Linuxize post](https://linuxize.com/post/understanding-linux-file-permissions/)


## The Shebang Line

A common workflow in Linux is to cobble together a ton of BASH commands into a text file and run them. For a little toy example, let's say we want to run these commands:

```shell
$ NAME="Mom"
$ echo "Hi, ${NAME}"
Hi, Mom
```

Well, we could put that in a script called "hello_world.sh", so we don't have to type it to run it again tomorrow:

```shell
$ cat hello_world.sh
NAME="Mom"
echo "Hi, ${NAME}"
```

And now we can run it:

```shell
$ bash hello_world.sh
Hi, Mom
```

But in the above example, we have to run it using "bash ". What if we try to run it like any other program?

```shell
$ ./hello_world.sh
-bash: ./hello_world.sh: Permission denied
```

Oh, right, we need to change the file permissions (see above) to be executable:

```shell
$ chmod 770 hello_world.sh
$ ./hello_world.sh
Hi, Mom
```

Okay, thie trick is that last line won't always work for you. It'll be hit and miss. Because... how does BASH know if this text file is a BASH script or not?

To ensure BASH will always know this is a BASH script, we want to add the [shebang](https://linuxize.com/post/bash-shebang/) line to the top of the file:

```shell
$ cat hello_world.sh
#!/bin/bash

NAME="Mom"
echo "Hi, ${NAME}"
```

Now BASH will always be able to run this script:

```shell
$ ./hello_world.sh
Hi, Mom
```

More importantly, you can put any executable in that shebang line. For instance, Python or Perl are common shebang targets.

<img style="max-width:100%" src="/assets/images/somthing_completely_different.jpg" alt="And now for something completely different">


## Activating a Python Virtual Env

If you are a Windows Python user, you might be used to doing something like this to activate your vitual environment:

```shell
venv\\Scripts\\activate.bat
```

Well, on Linux, you will have to do it slightly differently:

```shell
source venv/bin/activate
```

The difference, of course, is that the `activate.bat` is a Windows Batch file and `activate` is a multi-shell "Linux" script.
