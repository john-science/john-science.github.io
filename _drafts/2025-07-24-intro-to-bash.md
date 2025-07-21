---
layout: post
title: "An Introduction to BASH"
tags: [Linux, BASH]
summary: A beginners guide to the BASH shell.
---
{% include JB/setup %}


Okay, lets start from first principles.

## What is "Linux"?

TBD

Linux is an open-source operating system. It was created in 1991 by Linux Torvalds, a then student at the University of Helsinky. He was trying to create a free version of the Minix operating system, which was popular at the time. "Min Unix" -> Minix.

The Linux Kernel
https://github.com/torvalds/linux/tree/master

The Kernel has several key components: process scheduler, memory manager, device driver, file system. These are exposed with the System Call Interface which provides the Kernel API, which itself is wrapped by the C standad library (GNU C lib). This C standard library provides the Kernel API that applications can interact with.

The user space is built of this GNU API and provides things like a GUI or a command line (like BASH)!

Most webservers in the world, and a huge percentage of all other computer devices, run Linux. If you have a "Smart TV", it's probably a bot net, but it is definitely running Linux. 

There are a growing number of operating systems in the world based on the Linux Kernel:

https://en.wikipedia.org/wiki/List_of_Linux_distributions#/media/File:Linux_Distribution_Timeline.svg



## What is "BASH"?

> The Bourne-Again Shell

Probably, this is technically a "command language interpretter for interacting with a computer on the command line". But that's boring. It's "the command line". You know it when you see it.

https://wallpapercave.com/wp/i89B2zG.jpg

BASH is just another one of these "command lines". There are many other flavors. CSH is the worst. ZSH is popular. BASH is my favorite.

The idea of a "shell" or commandline to wrap a computer kernel came about in 1971. And in 1979 the Bourne shell was created, and quickly became the most popular. In 1989, BASH came out. And it is still the best. It is the default on MacOS and most Linux distros. 

To find out if you are running BASH, type `which $SHELL` on the command line:

```bash
$ which $SHELL
/bin/bash
```

If you get an error, you are probably on Windows.


Bonus: Unix shell, not _quite_ POSIX-compliant, but you can run it with a `--posix` to make it so.



## Understanding the BASH Command Line

TBD

### Bashrc

When you first launch the shell, it executes to BASH scripts in your user home directory:

1. `.bashrc`
2. `.bash_profile`

This allows you to customize how your shell looks and acts. This is a great tool.

Here is the `.bashrc` I copy to all the Linux machines I use. This is just my own, super minimal starting position for working on any new machine:

https://gist.github.com/john-science/f6aa96de49a9cba76d53889db6daad7c


### shebang! Writing our own BASH scripts

You can create a BASH Script by creating a new file with a name ending in `.sh`.

The first line in that file should be a sheband, followed by the path to the BASH executable:

```bash
#!/usr/bin/bash/
```

We put our BASH code below that.


TBD

### A Complete Programming Language

TBD

A dynamic, interpetted programming languages, that allows us to write scripts.

#### Variables

TBD: Shell vs Environment: https://antineutrino.net/2024/05/13/linux-grab-bag

```bash
GREET="hello world"
echo $GREET
```

To run this script, go to the command line and type the file name:

```bash
$ ./hello_world.sh
hello world
```

#### Positional Arguments

What if we want to pass some arguments into the script?

```bash
$ ./hello_world.sh mom
```

Positional arguments will be accessible in your BASH scripts by using the variable names `$1`, `$2`, `$3`, etcetera.

```bash
GREET="hello $1"
echo $GREET
```

Then on the command line:


```bash
$ ./hello_world.sh mom
hello mom
```


#### Loops

What if you need more user input in a BASH script?

You can create loops in BASH

```bash
while true; do
    read -p "Do you want a cup of coffee?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
```



#### If

We can also implement conditional logic:

```bash
if [ $2 -lt 16 ] ; then
    echo "You are too young for coffee. Go have a Mountain Dew and a Pepsi and a Red Bull"
else
    echo "Enjoy your coffee!"
fi
```


### Running programs in the background

Putting an `&` after your command will run it in the background, and all you to keep working in your shell:

```bash
$ my_long_program &
```





### So many Toys!

My most common BASH commands: https://antineutrino.net/2019/08/19/common-linux-cmds

* which / man / help / --help
* navigation: https://antineutrino.net/2024/05/01/navigating-linux-file-system
* PATH
* history
* alias
* grep
   * https://www.grymoire.com/Unix/Grep.html
* whole languages: awk and sed
   * https://www.grymoire.com/Unix/Awk.html
	  * https://github.com/TheMozg/awk-raycaster  -  https://github.com/TheMozg/awk-raycaster/blob/master/awkaster.awk
   * https://www.grymoire.com/Unix/Sed.html
	  * https://aurelio.net/projects/sedsokoban/  -  https://github.com/aureliojargas/sokoban.sed/blob/master/sokoban.sed

### Permissions

TBD
