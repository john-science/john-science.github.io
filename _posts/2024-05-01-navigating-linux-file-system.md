---
layout: post
title: "Navigating the Linux File System"
tags: [Linux, BASH]
summary: A beginners guide to navigating the Linux file system with BASH.
---
{% include JB/setup %}


[Linux](https://en.wikipedia.org/wiki/Linux) is a type of operating system, and by far the most popular type of command line (shell) is [BASH](https://en.wikipedia.org/wiki/Bash_(Unix_shell)). So, one of the first things that a new Linux user willl have to learn is how to use the BASH command line. And probably the best place to start learning any Linux command line is how to nagivate around the file system. To that end, this is a quick, beginners guide to navigating a Linux file sytems using BASH.


## Linux File System

Before we can learn to navigate a Linux fyle system, first let's build a mental image of a Linux file system:

![Linux file system](/assets/images/software/linux_file_system.png)

The Linux file system is a tree, where there is one top-level directory (`/`), with a common set of sub-directories (don't worry, you don't have to memorize these):

* `/bin/`
* `/boot/`
* `/etc/`
* `/home/`
* `/lib/`
* `/media/`
* `/mnt/`
* `/opt/`
* `/root/`
* `/sbin/`
* `/tmp/`
* `/usr/`
* `/var/`

There are two important take-aways from all of this:

1. There is a the top-level directory is `/`, and that has sub-directories, which have sub-directories of their own, and so on.
2. If you are on the BASH command line, you are _somewhere_ in this directory tree.

> Fun Fact: In Windows they are called "folders", but in every other operating system they are called "directories".


## Special Characters

It might sound odd to start this guide with special cases, but we need to start somewhere. You will want to regularly use these special characers mix-and-match style with nearly all BASH commands. With that out of the way, here they are:

* `.` (prounounced "dot") - Represents the current directory in the filesystem.
* `..` (prounounced "dot-dot") - Represents one level above the current directory.
* `/` (prounounced "forward slash") - Represents the "root" of the filesystem.
* `~` (prounounced "tilde") - Represents the home directory of the current user.

We will see these in practice below, which should help clarify them.


## Print Working Directory (pwd)

![print working directory](/assets/images/software/pwd.jpeg)

Above, we said that if you are on the BASH command line, you are always _somewhere_ in the file tree. So our first question is "Where?", and this is what the `pwd` command gives us:

```shell
$ pwd
/home/aeinstein
```

While navigating around a file system, I frequently use the `pwd` command to check where I'm at. It's super easy to orient yourself.


### Absolute and Relative Paths

As an aside, we should take a closer look at the path that `pwd` gave us: `/home/aeinstein`. The first thing to notice is that it starts with a `/`. A path that starts with a `/` is an "absolute path", fully defining the directory/file path starting at the root of the file tree.

Sometimes, you will see people write files paths in the "relative path" format, like `photos/mine/`. Since this path doesn't start with a `/` we take the path to mean "starting here, go into a directory called photos, then inside another directory called mine".

All file/directory paths in a Linux system can be absolute or relative.

> Fun Fact: In Windows, directory paths use `\` as separators but every other operating system use `/`.


## List Files and Directories (ls)

Knowing where you are in the file tree is important, but probably the most common thing you will want to ask BASH is "What is in this directory?":


```shell
$ ls
dir2 file1.txt
```

In this example, we see this directory has one sub-directory (`dir2`) and one file (`file1.txt`).

But what's in that sub-directory? Well we can find out:

```shell
$ ls dir2
file3.txt file4.md
```

Here we see two files in this sub-directory: `file3.txt` and `file4.md`.

We could also list the contents of the root directory of the file tree:

```shell
$ ls /
bin boot etc home lib lib64 media mnt opt root sbin sys tmp usr var
```

Or we could list the contents of the folder that is one up in the file tree:

```shell
$ ls ..
aeinstein enoether inewton
```

I use `ls` all the time while on the BASH terminal.


## Change Directory (cd)

So far, we haven't done much actual _nagivating_ of the Linux file tree. We haven't actually _changed_ the directory we are in:

```shell
$ ls
dir2 file1.txt
$ cd dir2
$ ls
file3.txt file4.md
```

We can also change directory to the root of the file tree:

```shell
$ cd /
$ ls
bin boot etc home lib lib64 media mnt opt root sbin sys tmp usr var
```

The `cd` command also has a special argument that will "go back to the last directory I was in":

```shell
$ cd /
$ pwd
/
$ cd -
/home/aeinstein
$ pwd
/home/aeinstein
```

In short, we use the `cd` command to move around the file tree.


## Learning More about a Linux Command

So far, we have covered a few Linux / BASH tools: `pwd`, `cd`, and `ls`. But these tools can actually take a lot more parameters and optional arguments. For instance, we can _list_ the name of a file, or we can list detailed information on a file:

```shell
$ ls file1.txt
file1.txt
$ ls -lh file1.txt
-rw-r--r-- 1 aeinstein domain users 0 Apr 10 15:01 file1.txt
```

Now `ls -lsh` is a useful command flag to know about. But since nearly all command tools have optional flags and arguments, the really important thing here is to know how to learn about all these options. There are two standard ways to get a help menu or manual for a command:

```shell
man something

something --help
```

This is your "teach a person to fish" moment. To learn to use the BASH command line, you need to learn more and more commands, for things other than just navigating the file system. And Linux provides you the tools you need to teach yourself.
