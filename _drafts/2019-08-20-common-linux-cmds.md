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
* [cp](https://www.lifewire.com/copy-files-using-linux-cp-command-4022366) - copies a file (or directory if you use `-r`)
* [crontab]() - 
* [cut](https://www.geeksforgeeks.org/cut-command-linux-examples/) - remove sections from each line in a file
* [date]() - prints the current date/time to the terminal
* [display]() - 
* [echo]() - print a string to the terminal
* [emacs]() - a command line text editor (VIM is better)
* [exit]() - close the terminal
* [fg]() - 
* [find](https://www.lifewire.com/uses-of-linux-command-find-2201100) - search for files inside a directory
* [grep](https://www.lifewire.com/linux-grep-command-3571842) - search for a string in a file (or files)
* [gunzip](https://www.geeksforgeeks.org/gunzip-command-in-linux-with-examples/) - Decompress a ZIP file
* [gzip](https://www.lifewire.com/example-uses-of-the-linux-gzip-command-4078675) - Compress a file using the GZIP utiltity
* [head]() - Shwo the first N lines in a file.
* [history]() - show the last N commands you've typed in
* [htop]() - Show the processes currently running on your computer.
* [killall]() - 
* [ls](https://www.lifewire.com/uses-of-linux-ls-command-4054227) - lists the contents of a directory
* [make]() - 
* [man](https://www.lifewire.com/man-linux-command-4095406) - print the "man"ual for the program
* [mkdir]() - 
* [mv]() - move a file (or files)
* [ping](https://www.lifewire.com/uses-of-command-ping-2201076) - test if an IP (or web) address is reachable
* [pkill]() - 
* [ps]() - 
* [pwd]() - print the path to you current directory
* [rm](https://www.lifewire.com/delete-files-using-linux-rm-command-4023999) - remove a file (or files)
* [rsync]() - 
* [scp]() - 
* [sed]() - programming language for filtering and transforming text
* [screen]() - 
* [sleep](https://www.lifewire.com/use-linux-sleep-command-3572060) - idle. wait. Do nothing for N seconds.
* [sort](https://www.geeksforgeeks.org/sort-command-linuxunix-examples/) - alphabetize a list of strings (usually a file)
* [su](https://www.lifewire.com/what-to-know-sudo-command-3576779) - enter the "super user", where you have heightened permissions
* [sudo](https://www.lifewire.com/what-to-know-sudo-command-3576779) - "super user do" one command, with heightened permissions
* [tail](https://www.lifewire.com/view-end-of-line-tail-command-4028901) - Show the last N lines in a file.
* [tar]() - 
* [time](https://www.lifewire.com/command-return-time-command-4054237) - 
* [top]() - Show what processes are running on your computer (htop is better).
* [uname]() - print information about the operating system
* [uuidgen]() - generate a random UUID
* [vi]() - A commandline text editor (replaced by VIM)
* [vim]() - The best commandline text editor.
* [wc]() - "word count" in a file (or "line count" if you add `-l`)
* [which]() - Show the path to the program.
* [zip]() - compress a file (or directory) with ZIP

### Bonus Round

How did I generate this list? Actually, I used three of the above commands together!

    history | awk -F " " '{print $2}' | sort -u

Try it out. Can you explain how this works?
