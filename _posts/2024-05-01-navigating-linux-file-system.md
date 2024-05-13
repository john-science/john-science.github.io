---
layout: post
title: "Navigating the Linux File System"
tags: [Linux, BASH]
summary: A beginners guide to navigating the Linux file system with BASH.
---
{% include JB/setup %}


[Linux](https://en.wikipedia.org/wiki/Linux) is a family of operating systems, and by far the most popular type of command line (shell) is [BASH](https://en.wikipedia.org/wiki/Bash_(Unix_shell)). So, one of the first things that a new Linux user will have to learn is how to use the BASH command line. And probably the best place to start learning any Linux command line is how to nagivate around the file system. To that end, this is a quick, beginners guide to navigating a Linux file sytem using BASH.


## Linux File System

Before we can learn to navigate a Linux file system, first let's build a mental image of one:

<img style="max-width:100%" src="/assets/images/software/linux_file_system.png" alt="Linux file system">

The Linux file system is a tree, where there is one top-level directory (`/`), that has sub-directories, which have their own sub-directories, and so on. When you are on the BASH command line, you are _somewhere_ in this directory tree.

> Fun Fact: In Windows they are called "folders", but in every other operating system they are called "directories".


## Special Characters

It might sound odd to start this guide with special cases, but we need to start somewhere. You will want to regularly use these special characers mix-and-match style with nearly all BASH commands. They represent:

* `.` (prounounced "dot") - the current directory in the filesystem.
* `..` (prounounced "dot-dot") - one level above the current directory.
* `/` (prounounced "forward slash") - the "root" of the filesystem.
* `~` (prounounced "tilde") - the home directory of the current user.

We will see these in practice below, which should help clarify them.


## Print Working Directory (pwd)

Above, we said that if you are on the BASH command line, you are always _somewhere_ in the file tree. So our first question is "Where?", which is what the `pwd` command is for. Go to a BASH terminal and type:

```shell
$ pwd
/home/aeinstein
```

While navigating around a file system, I frequently use the `pwd` command to check where I'm at. It's super easy to orient yourself.


### Absolute and Relative Paths

As an aside, we should take a closer look at the path that `pwd` gave us: `/home/aeinstein`. The first thing to notice is that it starts with a `/`. A path that starts with a `/` is an "absolute path", fully defining the path to a directory/file starting at the root of the file tree.

Sometimes, you will see people write files paths in the "relative path" format, like `photos/mine/`. Since this path doesn't start with a `/` we take the path to mean "starting here, go into a directory called photos, then inside another directory called mine".

All file/directory paths in a Linux system can be absolute or relative.

> Fun Fact: In Windows, directory paths use `\` as separators, but every other operating system uses `/`.


## List Files and Directories (ls)

A common thing you will want to ask BASH is "What is in this directory?":


```shell
$ ls
Dir2 file1.txt
```

In the above example, we see this directory has one sub-directory (`Dir2`) and one file (`file1.txt`).

But what's in that sub-directory? We can find out:

```shell
$ ls Dir2
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

So far, we haven't done much actual _nagivating_ of the Linux file tree. To actually _change_ the directory we are in:

```shell
$ ls
Dir2 file1.txt
$ cd Dir2
$ ls
file3.txt file4.md
```

We can also change directory to the root of the file tree:

```shell
$ cd /
$ ls
bin boot etc home lib lib64 media mnt opt root sbin sys tmp usr var
```

The `cd` command also has a special argument that will "go back to the last directory I was in" (`cd -`):

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


## Linux is Case Sensitive

If you are coming from the wonderful world of Windows, you will probably stub your toes on the idea:

> Linux is case sensitive for EVERYTHING: file, paths, directories, or commands.

For instance:

```shell
$ ls Dir2
file3.txt file4.md
$ ls dir2
ls: cannot access dir2/: No such file or directory
```

You've been warned.


## Learning More about a Linux Command

So far, we have covered a few Linux / BASH tools: `pwd`, `cd`, and `ls`. These tools can actually take a lot more parameters and optional arguments. For instance, we can _list_ the name of a file, or we can list detailed information on that file with `ls -lh`:

```shell
$ ls file1.txt
file1.txt
$ ls -lh file1.txt
-rw-r--r-- 1 aeinstein domain users 0 Apr 10 15:01 file1.txt
```

Now `ls -lh` is a useful command flag to know about. But since nearly all command tools have optional flags and arguments, the really important thing here is to know how to learn about all these options. In Linux, there are two standard ways to get a help menu or manual for a command:

```shell
man something

something --help
```

An important idea to wrap your head around is that all of the "commands" we have learned thus far are actually just programs (they would have a `.exe` file extension in Windows). We can use the `which` command to give us the path to these executables we have learned:

```shell
$ which pwd
/usr/bin/pwd

$ which cd
/usr/bin/cd

$ which ls
/usr/bin/ls

$ which man
/usr/bin/man

$ which which
/usr/bin/which
```

This is your "teach a person to fish" moment. To learn to use the BASH command line, you need to learn more commands, for things other than just navigating the file system. Happily, Linux provides you the tools you need to teach yourself.
