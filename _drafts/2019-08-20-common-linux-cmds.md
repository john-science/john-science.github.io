---
layout: post
title: "Getting Started with the Linux Commandline"
tags: [Linux]
summary: A currated list of common Linux commands.
---
{% include JB/setup %}

So you're learning your way around the Linux commandline and there are *all* these commands you type in. What are all these commands? It turns out, they are programs that you can find in:

* `/bin/`
* `/usr/bin/`

And if you want to learn more about them, try typing:

    $ man something
    $ something --help

Okay, this list may seem a little long to start with. But each of these tools is likely to be on every Linux computer you see for the rest of your life. Learn them once, know them forever.

* [|](https://www.geeksforgeeks.org/piping-in-unix-or-linux/) - "pipe" the outputs of one command into another
* [>](https://ryanstutorials.net/linuxtutorial/piping.php) - "pipe" the outputs of a command into a file
* [>>](https://ryanstutorials.net/linuxtutorial/piping.php) - "append" the outputs of a command to a file
* [awk](https://likegeeks.com/awk-command/) - programming language for pattern-matching and parsing text
* [bg]() - 
* [cat]() - 
* [cd]() - change directory
* [chmod]() - change the permissions on a file (or files)
* [chown]() - change the owner of a file (or files)
* [cp]() - copies a file (or directory if you use `-r`)
* [crontab]() - 
* [date]() - prints the current date/time to the terminal
* [display]() - 
* [echo]() - print a string to the terminal
* [emacs]() - a command line text editor (VIM is better)
* [exit]() - close the terminal
* [fg]() - 
* [find]() - 
* [grep]() - search for a string in a file (or files)
* [head]() - Shwo the first N lines in a file.
* [history]() - show the last N commands you've typed in
* [htop]() - Show the processes currently running on your computer.
* [killall]() - 
* [ls]() - lists the contents of a directory
* [make]() - 
* [man]() - print the "man"ual for the program
* [mkdir]() - 
* [mv]() - move a file (or files)
* [ping]() - 
* [pkill]() - 
* [ps]() - 
* [pwd]() - print the path to you current directory
* [rm]() - remove a file (or files)
* [rsync]() - 
* [scp]() - 
* [sed]() - programming language for filtering and transforming text
* [screen]() - 
* [sleep]() - idle. wait. Do nothing for N seconds.
* [sort]() - alphabetize a list of strings (usually a file)
* [su]() - enter the "super user", where you have heightened permissions
* [sudo]() - "super user do" one command, with heightened permissions
* [tail]() - Show the last N lines in a file.
* [tar]() - 
* [top]() - Show what processes are running on your computer (htop is better).
* [uname]() - print information about the operating system
* [uuidgen]() - generate a random UUID
* [vi]() - A commandline text editor (replaced by VIM)
* [vim]() - The best commandline text editor.
* [wc]() - "word count" in a file (or "line count" if you add `-l`)
* [which]() - Show the path to the program.

### Bonus Round

How did I generate this list? Actually, I used three of the above commands together!

    history | awk -F " " '{print $2}' | sort -u

Try it out. Can you explain how this works?
