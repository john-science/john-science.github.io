---
layout: post
title: "An Introduction to Git"
tags: [Software, Git]
summary: A Gentle, if Technical, Introduction to Git
---
{% include JB/setup %}


This guide will not cover installation, security issues, or the beautiful mathematical groundwork inside Git. Instead, this guide is an introduction in how to use Git.


## What is Git?

First things first, what is [Git](https://en.wikipedia.org/wiki/Git)?

Git is, by a wide margin, the most popular [version control](https://en.wikipedia.org/wiki/Version_control) system in the world.

A "version control system" (VCS) is a tool that tracks all the changes made to our code over time, in a special database called a "repository".

This gives us the ability to easily see the entire history of our project. So we can look back to see who made what changes when. And if someone introduces broken code into our codebase, we can find out who and when. And, if necessary, easily revert our project back to an earlier state.

In short, a Version Control System allows us to:

1. Track the history of our code base
2. Work together easily

### Centralized vs Distributed VCS

There are two kinds of Version Control Systems:

1. Centralized
2. [Distributed](https://en.wikipedia.org/wiki/Distributed_version_control)

#### Centralized VCS

In a "centralized version control system", all team members connect to a central server where the repository is hosted. That is the one place where the "true" version of the codebase lives. Everyone on the team must connect to the central server to get the latest code, or to inspect the history of the codebase.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Server-based-network.svg/464px-Server-based-network.svg.png"
srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Server-based-network.svg/991px-Server-based-network.svg.png 991w,
https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Server-based-network.svg/464px-Server-based-network.svg.png 464w,
https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Server-based-network.svg/232px-Server-based-network.svg.png 332w" 
sizes="(max-width: 38em) 100vw, 50vw"
alt="Client-Server Model">

The two most common Centralized VCS are:

* Subversion
* Microsoft Foundation Server

The problem with this centralized model is the single point of failure. If the server goes down, the entire time is haulted and cannot work. They can not upload any progress they have made, or grab the latest version of the codebase.


#### Distributed VCS

In a [Distributed version control system](https://en.wikipedia.org/wiki/Distributed_version_control), every team member has a full copy of the project on their machine. (That is, they also have a local copy of the project history.) This means team members can synchronize their work with each other, even if the central server is offline. It also means the VCS is typically must Faster for developers to use, as most actions can be undertaken locally, and don't require network communication.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/P2P_network.svg/551px-P2P_network.svg.png"
srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/P2P_network.svg/882px-P2P_network.svg.png 882w,
https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/P2P_network.svg/551px-P2P_network.svg.png 551w,
https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/P2P_network.svg/276px-P2P_network.svg.png 276w" 
sizes="(max-width: 38em) 100vw, 50vw"
alt="Peer-to-Peer Model">

Two of the most popular distributed VCS are:

* Git
* Mercurial

### Why Git?

Why did Git get so popular? Aside from being the first really popular decentralized VCS, Git is:

* free
* open source
* very scalable
* very fast


## What is GitHub?

[GitHub](https://en.wikipedia.org/wiki/GitHub) (and GitHub Enterprise) are meant to provide a web-focused interface for Git. While this does give the appearance of turning Git into a more Centralized version control system, all developers still maintain a full history of their codebase locally. And GitHub provides a number of helpful tools for teams working with Git repositories.

There are alternatives to GitHub; GitLab and BitBucket are both popular.


## The Git Commandline

Git is easy to use from the [command line](https://en.wikipedia.org/wiki/Command-line_interface) in Windows, Linux, MacOS, and all major operating systems. If you don't want to use the command line, don't worry! Every major IDE in the world has tools built in (or plugins available) to help you use Git.

But, no matter what interface you use, you will still have to understand the same basic concepts about Git.

For the purposes of this introduction, I will use the command line, as it is a universal inteface that everyone can use the same everywhere.


## Configuring Git

The first time we use Git on a new computer, we should configure two important things about you:

* your name
* your email

These configurations can be done on three levels:

1. System - This applies to all users on this computer (not recommended).
2. Global - All repositories for this user (recommended).
3. Local - Done on a repository-by-repository basic (can be helpful situationally).

Here are some quick examples of how I would set my user name and email on the global level:

```shell
git config --global user.name "Emmy Noether"
git config --global user.email enoether@brynmawr.edu
```
Done! That was easy. Optionally, you can also specify your default editor at this stage, but that is a very machine-specific and user-specific setting, so I will leave that as an exercise for the reader.

To get more information about `git config`, you can also type one of these on the command line:

```shell
git config --help

git config -h
```

## Initializing a Repository

You may not create a new Git repository (repo) very often, but we will practice it here because (a) it's important, and (b) it servers as a good place to start talking about Git workflows.

First, we need to create an empty folder (let's call it `OceanCleanup`) and nagivate into it. Then, to create a fresh, new Git repo, we simply type:

```shell
git init
```

After doing that, you will find a new (albeit hidden) folder gets created named `.git`. This folder is the database that Git uses to track the history of a codebase. It is not meant to be human-readable, and it is not meant to be hand-edited. A good rule-of-thumb for new Git users is to never delete this folder, or even navigate into it. Just let Git manage it for you.

Again, for more information on [git init](https://git-scm.com/docs/git-init), type on the command line:

```shell
git init --help
```


## The Git Workflow

Now let's talk about the day-to-day Git workflow.

### The Commit

Every day, as part of our work, we will be making changes to the code in our project directory. (Remember that inside our project directory is the hidden `.git` directory that contains our repository database.

Every day, if we make changes to one or more files, we might come upon a good stopping point or saveable state for our code. Maybe we fixed a bug or built a feature, but maybe this is just a good state where the code works, and we want to save the working code state before continue working and start breaking things again.

At this point we will take a snapshot of the entire code database and store it in the code repository. This snapshot is called a [commit](https://git-scm.com/docs/git-commit). Commits are definitely how people work with Git. They find a good place to save their code, and they take a snapshot of the entire codebase at this point in time. And Git saves an entire copy of the codebase at each commit. (In other VCS, a commit might just be a "diff" showing the changes between two commits, but by clever use of mathematics saving an entire copy of the repo at each commit makes Git MUCH faster to use than other VCS tools.)

This snapshot / commit will include several things:

* your name
* your email
* the datetime of the snapshot
* a short message from you, describing the change
* a unique ID defining your snapshot
* a link back to the previous snapshot
* a complete snapshot of the repo at this point


### The Staging Area

Git has a special "staging area" (or "index") that doesn't exist in most other VCS tools. It is essentially a preview of the changes we are proposing for the next snapshot (the next commit).

<img src="https://git-scm.com/images/about/index1@2x.png" alt="Git Workflow">

The idea is that you make changes to the code, and they are temporary. But when you have a collection of changes you like, you make a snapshot of the current state of the project directory. Any files with changes need to be added to your snapshot (commit) using `git add`. Then, when you have a collection of staged files that have been added, you can `git commit` them, which saves your project snapshot to the repository.

### A Worked Example

First, we will create two files in our repository, with some content: `file1.txt` and `file2.py`.

Now, we want to add these two files to the staging area:

```shell
git add file1.txt file2.py
```

Now that these two files are in the staging area, this is the project state we are proposing for the next commit.

If we review these stages and decide we like them, we can take a snapshot, and permanently store these changes in the repository:

```shell
git commit -m "First commit"
```

The comment we add to this commit is important. Make the goal of the changes as clear as you can, but be brief.

At this point it is important to understand that the Staging Area still has both `file1` and `file2` in it. It is a common source of confusion that since we have made a commit, the Staging Area is empty. It's not.

We continue hacking at our code. Let's say we make a change to `file1.txt`. Those changes are not staged. In order to stage them we need to:

```shell
git add file1.txt
```

Now, in order to save a snapshot of the repository in this new state, we need to make a second commit:

```shell
git commit -m "Fixed a bug in file1"
```

Our repository now has two commits in it.

We continue hacking at our code. Let's say we decide to delete `file1.txt`. So we delete it. But then we need to notify git of the changes:

```shell
git add file1.txt
```

It is a little confusing here that we are "adding" something, when really we are "removing" a file. But remember, what we are doing is "adding a change to the staging area". Okay, so now we commit our snapshot to the repository again:

```shell
git commit -m "Removing a non-code text file"
```

We now have three commits in our repository:

* Removing a non-code text file
* Fixed a bug in file1
* First Commit

## Git Commit

The commit is so central to our Git workflow, let's look at it a little more.

### Commit Messages

When we made this commit above:

```shell
git commit -m "Fixed a bug in file1"
```

We only made a short, one-line comment. And if we can completely describe the situation in one line, that's great. Let's keep it brief. But try to keep it under 50 characters. If you need more than 50 characters in your commit comment, let's make a multi-line commit message. To do this, we will leave off the `-m`:

```shell
git commit
```

Now Git will open up some sort of text editor. And you can type in a good, multi-line commit message. If you need to make a multi-line commit message, the best practice is to make the first line short, and leave the second line blank:

```
Fixed a bug in file1.

This bug was really tricky. Let me tell you about it. Oh boy.
It caused these funny problems:
- Problem One
- Problem Two
- And so on.
```

Which text editor it opens is configurable using `git config --global core.editor "something --wait"`. But, Git will always provide you with a simple text editor as default. In Mac, Linux, and Unix, it will be a command line editor like VIM or EMACS by default. 

> When writing commit messages: remember your audience.

It may be that you need to look back this commit two years from now, and you have entirely forgotten about it, and you need a good, quick refresher. Or it might be that some stranger needs to figure out what was going on here 4 years from now, and they are looking at 100 other commits in the commit history too. Try to keep your explanations clear, but also concise enough that busy people have time to read them.

### Commit Best Practices

We should aim to make a commit every time we have done one _thing_ as a unit: we solved one bug, we built one small feature, something you can describe as logically separate. If you find yourself describing multiple changes that happened in a commit, your commit might be too big.

Ideally, every commit in an estabilished project would leave the project in a working state. (That's not always possible, but it's nice when it is.)

Also, try never to commit any file over 5MB. Do not confuse Git with a hard drive backup program. There actually _is_ a tool out there, called "Git Large File System" that allows for larger files in Git. But that's not recommended, or even maybe a good idea to ever use. Git is to store _code_, not _data_.

### Skipping the Staging Area

If you want to bipass the Staging Area workflow, you can `git commit --all` or:

```shell
git commit -a -m "Commiting all changes - skipping the Staging Area"
```

But this is definitely meant as a convenience method, for people who know exactly what is going on and want to move fast and be dangerous. This is also a good time for us to talk about the `.gitignore` file.


## gitignore

TODO


## Renaming or Moving Files

Let's say we move `file2.py` to `main.py` (using a non-Git command like `mv file2.py main.py`). In order to make this change in Git, we need to add both of these file paths to our Staging Area:

```shell
mv file2.py main.py  # not a Git command

git add file2.py
git add main.py
```

Now we can commit the changes:

```shell
git commit -m "Renaming file2 to main"
```

At this point, Git will check and quickly find out that we didn't remove `file2.py` and add some branch new `main.py`. Git will know that we just renamed the file. Which will be really helpful when looking through the history later.

Just to save typing, Git provides a little helper command to rename (or "move") files: `git mv`. So, what we could have typed instead of the two `git add` statements above:

```shell
git mv file2.py main.py
git commit -m "Renaming file2 to main"
```

The helper command `git mv` saves some typing, but can also hide how we are interacting with the staging area.


## TODO

### Pushing Your Changes (Optional)

Most new Git users will think this is the point where we have to talk about `git push`. But, really, there is always a full and complete Git repository on your computer, in that little `.git` sub-directory. However, if you are working on GitHub or with some other centralized repository for your team, it may be the time to use `git push`, which we will talk about in more detail later.


## References

* [Official Git Docs](https://git-scm.com/)
* [Getting Started with the Git Command Line](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)
* [What is GitHub.com?](https://en.wikipedia.org/wiki/GitHub)
* [git staging area](https://git-scm.com/about/staging-area)
* [gitignore](https://git-scm.com/docs/gitignore)
* git commands
  * [git add](https://git-scm.com/docs/git-add)
  * [git commit](https://git-scm.com/docs/git-commit)
  * [git config](https://git-scm.com/docs/git-config)
  * [git init](https://git-scm.com/docs/git-init)
  * [git status](https://git-scm.com/docs/git-status)
* The beautiful mathematics behind Git
  * [Hash Functions](https://en.wikipedia.org/wiki/Hash_function)
  * [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory)
* [Think Like a Git](http://think-like-a-git.net/) - Popular website for understand Git the hard way.
