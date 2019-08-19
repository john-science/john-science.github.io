---
layout: post
title: "The Most Common Linux Commands"
tags: [Linux]
summary: Getting Started with the Linux Commandline
---
{% include JB/setup %}

So you're learning your way around the Linux commandline and there are *all* these commands you have to know. It turns out, all of those commands are programs that you can find in:

* `/bin/`
* `/usr/bin/`

And if you want to learn more about them, try typing:

    $ man something
    $ something --help

## The Most Common Commands

> Don't Panic

Okay, this list may seem a little long. It is. But each of these tools is likely to be on every Linux computer you see for the rest of your life. They can become the toolbox you use to build practically anything.

* [\|](https://www.geeksforgeeks.org/piping-in-unix-or-linux/) - "pipe" the outputs of one command into another
* [>](https://ryanstutorials.net/linuxtutorial/piping.php) - "pipe" the outputs of a command into a file
* [>>](https://ryanstutorials.net/linuxtutorial/piping.php) - "append" the outputs of a command to a file
* [awk](https://likegeeks.com/awk-command/) - programming language for pattern-matching and parsing text
* [bg](https://www.thegeekdiary.com/understanding-the-job-control-commands-in-linux-bg-fg-and-ctrlz/) - places the current job in the background
* [cat](https://www.lifewire.com/uses-of-linux-cat-command-4011235) - display and concatenate files
* [cd](https://www.computerhope.com/unix/ucd.htm) - change directory
* [chmod](https://tecadmin.net/tutorial/linux/linux-chmod-command/) - change the permissions on a file (or files)
* [chown](https://www.cyberciti.biz/faq/how-to-use-chmod-and-chown-command/) - change the owner of a file (or files)
* [cp](https://www.lifewire.com/copy-files-using-linux-cp-command-4022366) - copies a file (or directory if you use `-r`)
* [crontab](https://www.lifewire.com/crontab-linux-command-4095300) - run programs at regular intervals
* [cut](https://www.geeksforgeeks.org/cut-command-linux-examples/) - remove sections from each line in a file
* [date](https://www.lifewire.com/display-date-time-using-linux-command-line-4032698) - prints the current date/time to the terminal
* [echo](https://www.tecmint.com/echo-command-in-linux/) - print a string to the terminal
* [emacs](http://www.jesshamrick.com/2012/09/10/absolute-beginners-guide-to-emacs/) - a command line text editor (VIM is better)
* [exit](https://www.howtoforge.com/linux-exit-command/) - close the terminal or exit your shell script
* [fg](https://www.thegeekdiary.com/understanding-the-job-control-commands-in-linux-bg-fg-and-ctrlz/) - brings a background job to the foreground
* [find](https://www.lifewire.com/uses-of-linux-command-find-2201100) - search for files inside a directory
* [grep](https://www.lifewire.com/linux-grep-command-3571842) - search for a string in a file (or files)
* [gunzip](https://www.geeksforgeeks.org/gunzip-command-in-linux-with-examples/) - Decompress a ZIP file
* [gzip](https://www.lifewire.com/example-uses-of-the-linux-gzip-command-4078675) - Compress a file using the GZIP utiltity
* [head](https://www.cyberciti.biz/faq/unix-linux-show-first-10-20-lines-of-file/) - Shwo the first N lines in a file.
* [history](https://www.tecmint.com/history-command-examples/) - show the last N commands you've typed in
* [htop](https://linuxtogether.org/htop-command-explanation/) - Show the processes currently running on your computer.
* [killall](https://www.lifewire.com/how-to-kill-processes-using-linux-4062677) - kill all processes that match a name
* [ls](https://www.lifewire.com/uses-of-linux-ls-command-4054227) - lists the contents of a directory
* [make](https://www.lifewire.com/make-linux-command-unix-command-4097054) - run Makefiles to build code (originally for C code)
* [man](https://www.lifewire.com/man-linux-command-4095406) - print the "man"ual for the program
* [mkdir](https://www.lifewire.com/create-directories-linux-mkdir-command-3991847) - make new directories
* [mv](https://www.lifewire.com/move-files-with-linux-mv-command-2201103) - move a file (or files)
* [ping](https://www.lifewire.com/uses-of-command-ping-2201076) - test if an IP (or web) address is reachable
* [pkill](https://www.lifewire.com/how-to-kill-processes-using-linux-4062677) - kill process by ID or name
* [ps](https://www.lifewire.com/uses-of-linux-ps-command-4058715) - show the running processes
* [pwd](https://www.lifewire.com/find-out-which-directory-pwd-command-4022996) - print the path to you current directory
* [rm](https://www.lifewire.com/delete-files-using-linux-rm-command-4023999) - remove a file (or files)
* [rsync](https://www.lifewire.com/copying-directories-with-rsync-3971105) - copy (and synchronize) files easily
* [scp](https://www.garron.me/en/articles/scp.html) - "secure copy" files over an SSH connection
* [sed](https://www.lifewire.com/example-uses-of-sed-2201058) - programming language for filtering and transforming text
* [screen](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/) - manage multiple Linux commandline sessions
* [sleep](https://www.lifewire.com/use-linux-sleep-command-3572060) - idle. wait. Do nothing for N seconds.
* [sort](https://www.geeksforgeeks.org/sort-command-linuxunix-examples/) - alphabetize a list of strings (usually a file)
* [su](https://www.lifewire.com/what-to-know-sudo-command-3576779) - enter the "super user", where you have heightened permissions
* [sudo](https://www.lifewire.com/what-to-know-sudo-command-3576779) - "super user do" one command, with heightened permissions
* [tail](https://www.lifewire.com/view-end-of-line-tail-command-4028901) - Show the last N lines in a file.
* [tar](https://www.howtogeek.com/248780/how-to-compress-and-extract-files-using-the-tar-command-on-linux/) - create, compress, and decompress tar balls
* [time](https://www.lifewire.com/command-return-time-command-4054237) - 
* [top](https://www.lifewire.com/linux-top-command-2201163) - What processes are running? (htop is better)
* [uname](https://www.lifewire.com/display-system-information-uname-command-3964321) - print information about the operating system
* [uptime](https://www.computerhope.com/unix/uptime.htm) - Tell how long the system has been running.
* [vi](https://linuxconfig.org/vim-tutorial) - A commandline text editor (replaced by VIM)
* [vim](https://linuxconfig.org/vim-tutorial) - The best commandline text editor.
* [wc](https://www.lifewire.com/wc-linux-command-4092589) - "word count" in a file (or "line count" if you add `-l`)
* [which](https://www.lifewire.com/linux-which-command-4062680) - Show the path to the program.
* [zip](https://www.lifewire.com/practical-examples-of-the-zip-command-2201158) - compress a file (or directory) with ZIP


### Bonus Round

How did I generate this list? Actually, I used four of the above commands together!

    history | awk -F " " '{print $2}' | sort -u

Try it out. Can you explain how this works?
