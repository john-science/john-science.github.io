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

### The Staging Area

Git has a special "staging area" (or "index") that doesn't exist in most other VCS tools. It is essentially a preview of the changes we are proposing for the next snapshot (the next commit).

<img src="https://git-scm.com/images/about/index1@2x.png" alt="Git Workflow">

The idea is that you make changes to the code, and they are temporary. But when you have a collection of changes you want to 

3. (Optionally) push those changes to a remote repo
4. Show a worked example or two





## References

* [Official Git Docs](https://git-scm.com/)
* [Getting Started with the Git Command Line](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)
* [What is GitHub.com?](https://en.wikipedia.org/wiki/GitHub)
* [git staging area](https://git-scm.com/about/staging-area)
* The beautiful mathematics behind Git
  * [hash functions](https://en.wikipedia.org/wiki/Hash_function)
  * [graph theory](https://en.wikipedia.org/wiki/Graph_theory)
* git commands
  * [git config](https://git-scm.com/docs/git-config)
  * [git init](https://git-scm.com/docs/git-init)
  * [git add](https://git-scm.com/docs/git-add)
  * [git commit](https://git-scm.com/docs/git-commit)
* [Think Like a Git](http://think-like-a-git.net/) - Popular website for understand Git the hard way.
