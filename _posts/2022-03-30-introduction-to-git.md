---
layout: post
title: "An Introduction to Git"
tags: [Software, Git]
summary: A Gentle, if Technical, Introduction to Git
---
{% include JB/setup %}


This guide will not cover installation, security issues, or the beautiful mathematical groundwork inside Git. This is meant only as an introduction in how to use Git.


# What is Git?

First things first, what is [Git](https://en.wikipedia.org/wiki/Git)?

<img src="https://imgs.xkcd.com/comics/git.png" alt="What is Git?">

Git is, by a wide margin, the most popular [version control](https://en.wikipedia.org/wiki/Version_control) system in the world.

A "version control system" (VCS) is a tool that tracks all the changes made to a codebase over time. This tracking is done in a special database called a "repository".

A VCS gives users the ability to easily see the entire history of our project. Users can look back to see who made what changes when. And, if necessary, users can easily revert the project back to an earlier state.

In short, a Version Control System allows users to:

1. Track the history of the codebase
2. Work together more easily

### Centralized vs Distributed VCS

There are two kinds of Version Control Systems:

1. [Centralized](https://en.wikipedia.org/wiki/Version_control)
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

The problem with this centralized model is the single point of failure. If the server goes down, the entire team is haulted and cannot work.


#### Distributed VCS

In a [Distributed version control system](https://en.wikipedia.org/wiki/Distributed_version_control), every team member has a full copy of the repository on their machine. (That is, they also have a local copy of the history.) This means team members can synchronize their work with each other, even if the central server is offline. It also means the VCS is much faster for developers to use, as most actions can be undertaken locally, and don't require network communication.

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


<br/><br/>
# The Local Repository Workflow

## The Git Commandline

Git is easy to use from the same [command line](https://en.wikipedia.org/wiki/Command-line_interface) in Windows, Linux, MacOS. If you don't want to use the command line, don't worry! Every major IDE has Git tools built right in.

No matter what interface you use, you will still have to understand the same basic concepts about Git.

For the purposes of this introduction, I will use the command line, as it is a universal inteface; the same everywhere.


## Configuring Git

The first time you use Git on a computer, you should configure two important things about yourself:

* your name
* your email

These configurations can be done on three levels:

1. System - This applies to all users on this computer (not recommended).
2. Global - All repositories for this user (recommended).
3. Local - Done on a repository-by-repository basic (can be helpful situationally).

Here are some quick examples of how I would set your user name and email on the global level:

```shell
git config --global user.name "Emmy Noether"
git config --global user.email enoether@brynmawr.edu
```

Done! That was easy.

(Optionally, you can also specify your default editor at this stage, but that is a very machine-specific and user-specific setting, so I will leave that as an exercise for the reader.)

To get more information about `git config`, you can also type one of these on the command line:

```shell
git config --help

git config -h
```

## Initializing a Repository

You may not create a new Git repository (repo) very often, but we will practice it here because (a) it's important, and (b) it serves as a good place to start talking about Git workflows.

First, we need to create an empty folder (let's call it `OceanCleanup`) and nagivate into it. Then, to create a new Git repo, we simply type:

```shell
git init
```

After doing that, you will find a new (albeit hidden) folder gets created, named `.git`. This folder is the database that Git uses to track the history of a codebase. It is not meant to be human-readable, and it is not meant to be hand-edited. A good rule-of-thumb for new Git users is to never delete this folder, or even navigate into it. Just let Git manage it for you.

Again, for more information on [git init](https://git-scm.com/docs/git-init), type:

```shell
git init --help
```


## The Git Workflow

Now let's talk about the day-to-day Git workflow.

### The Commit

Every day, as part of our work, we will be making changes to the code in our project directory. (Remember that inside our project directory is the hidden `.git` directory that contains our repository database.)

On any given day, if we make changes to one or more files, we might come upon a good, saveable state for our codebase. Maybe we fixed a bug, maybe we built a new feature, but maybe this is just a good state where the code works, and we want to save the working code state before continue working and breaking everything again.

At this point we will take a snapshot of the entire code database and store it in the code repository. This snapshot is called a [commit](https://git-scm.com/docs/git-commit).

(In other VCS, a commit might just be a "diff" showing the changes between two commits, but by clever use of mathematics saving an entire copy of the repo at each commit makes Git MUCH faster to use than other VCS tools.)

Each snapshot / commit will include several things:

* name of the author
* email of the author
* the datetime of the snapshot
* a short message, describing the change
* a unique ID defining the snapshot
* a link back to the previous snapshot
* a complete snapshot of the repo at that point


### The Staging Area

Git has a special "staging area" (or "index") that doesn't exist in most other VCS tools. It is essentially a preview of the changes we are proposing for the next snapshot (commit).

<img src="https://git-scm.com/images/about/index1@2x.png" alt="Git Workflow">

The idea is that you make changes to the code, and they are temporary. But when you have a collection of changes you like, you make a snapshot of the current state of the Staging Area. Any files with changes need to be added to your snapshot (commit) using `git add`. Then, when you have a collection of staged files that have been added, you can `git commit` them, which saves your project snapshot to the repository.

**NOTE**: Git used to called the Staging Area the Index, so you may still see that term a lot in the documentation and online.


### A Worked Example

First, we will create two files in our repository, with any arbitrary content: `file1.txt` and `file2.py`.

To add these two files to the staging area:

```shell
git add file1.txt file2.py
```

With these files in the staging area, this is the project state we are proposing for the next commit.

If we review these stages and decide we like them, we can take a snapshot, and permanently store these changes in the repository:

```shell
git commit -m "First commit"
```

The comment we add to this commit is important; make the comment short but clear.

At this point, it is important to understand that the staging area still has both `file1` and `file2` in it. It is a common source of confusion that since we have made a commit, the staging area is empty. It is not.

Let's say we make a change to `file1.txt`. Those changes are not staged. In order to stage them we need to:

```shell
git add file1.txt
```

Then, in order to save a snapshot of the repository in this new state, we need to make a second commit:

```shell
git commit -m "Fixed a bug in file1"
```

Our repository now has two commits in it.

Let's say we decide to delete `file1.txt`. So we delete it. But then we need to notify git of the changes:

```shell
rm file1.txt

git add file1.txt
```

It might be confusing here that we are "adding" something, when really we are "removing" a file. But remember, what we are doing is "adding a change to the staging area". Now we can commit our snapshot to the repository again:

```shell
git commit -m "Removing a non-code text file"
```

We now have three commits in our repository:

```shell
$ git log --oneline

f3bd845 (HEAD -> main) Removing a non-code text file
2027533 Fixed a bug in file1
14b2753 First commit
```


## Git Commit

The commit is so central to our Git workflow, it is worth a closer look.

### Commit Messages

When we made this commit above:

```shell
git commit -m "Fixed a bug in file1"
```

We only made a short, one-line comment. And if we can completely describe the situation in one line, that's great. But try to keep it under 50 characters. If you need more than 50 characters in your commit message, mskr iy a multi-line message. To do this, we will leave off the `-m`:

```shell
git commit
```

Then Git will open up some sort of text editor. And you can type in a multi-line commit message that is as long as you like. If you need to make a multi-line commit message, the best practice is to make the first line short, and leave the second line blank:

```
Fixed a bug in file1.

This bug was really tricky. This and that were happening.
So we had to do this and that to fix it.
It caused these funny problems:
- Problem One
- Problem Two
- And so on.
```

Which text editor it opens is configurable using `git config --global core.editor "something --wait"`. But, Git will always provide you with a simple text editor as default. In Mac, Linux, and Unix, it will be a command line editor like VIM or EMACS by default. 

> When writing commit messages: remember your audience.

It may be that you need to look back this commit two years from now. Maybe you will have entirely forgotten about this work, and you need a good, quick refresher. Or it might be that some stranger needs to figure out what you did here 4 years from now, and they are looking at 100 other commits in the commit history too. Try to keep your explanations clear, but also concise enough that busy people have time to read them.


### Commit Best Practices

We should aim to make a commit every time we have done one _thing_ as a unit: we solved one bug, we built one feature, one logical thing. If you find yourself describing multiple changes that happened in a commit, your commit might be too big.

Ideally, every commit in an estabilished project would leave the project in a functional state.

Also, try never to commit any file over 5MB. Do not confuse Git with a hard drive backup. Git is used to store _code_ not _data_.


### Skipping the Staging Area

If you want to bipass the staging area workflow, you can `git commit --all` or:

```shell
git commit -a -m "Commiting all changes - skipping the Staging Area"
```

But this is meant as a convenience method, for people who know exactly what is going on and want to move fast and be dangerous. This is also a good time for us to talk about the `.gitignore` file.


### But... That's not how I learned it!

Perhaps you have been using Git for a while and you have a slightly different workflow from the two listed above. Sure, that's possible. Git has all kinds of helper features built it to make your life easier, mostly to help save you precious key strokes. This guide does not attempt to show EVERY way to do things in Git, but an original way that provides a clear understanding of how we interact with the staging area.


## .gitignore

In most code bases there are files that get created while using the code that you don't want to add to your repository.

For instance, if your code base generates log files, you won't need to share or synchronize those with othe team members. Similarly, depeneding on your programming language, compiled binary files are not included in a Git repository.

> Git repositories are only meant for code: not log files or compiled binaries.

Let's say we've run our code and there is now a big, ugly log file at `OceanCleanup/logs/dev.log`.

We want to tell Git to ignore all log files in this directory. To do that, we will create a new file in our project: `.gitignore`. To ignore everythiing inside this `/logs/` directory, the `.gitignore` file only needs to have one line:

```
logs/
```

If, for some reason, we might want to put code in the `/logs/` dir, but we want to specifically only want to have Git ignore only the log files in that directory:

```
logs/*.log
```

Or maybe we just want to be safe:

```
logs/
*.log
```

So, let's commit our new file:

```shell
git add .gitignore
git commit -m "Creating my first gitignore file!"
```

Easy!

> The `.gitignore` is so important, that it is usually the first file added to a Git repository.

Since so many people have been using Git for so long, there are great collection of example `.gitignore` files for various programming langauges on [github](https://github.com/github/gitignore). Just pick the correct one for your language: [python](https://github.com/github/gitignore/blob/main/Python.gitignore), [C++](https://github.com/github/gitignore/blob/main/C%2B%2B.gitignore), or whatever. The examples on this page have been used by millions of people and are a great place to start.


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

At this point, Git will check and quickly find out that moved one file, we didn't delete one and add a totally new one. Git will know that we just renamed the file. Which will be really helpful when looking through the history later.

Just to save typing, Git provides a little helper command to rename (or "move") files: `git mv`. So, what we could have typed the following instead of the two `git add` statements above:

```shell
git mv file2.py main.py
git commit -m "Renaming file2 to main"
```

The helper command `git mv` saves some typing, but can also hide how we are interacting with the staging area.


## Git Status

> `git status` is the Git command I type most.

To make this interesting, we will make two changes to our working area:

1. Adding a new file `noether.txt`, with some arbitrary content.
2. Changing one line in `main.py`.

Now we will run:

```shell
git status
```

And the result will look something like:

```shell
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   main.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	noether.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's look at this, piece by piece.

The first line says we are on branch `main`:

```shell
On branch main
```

Each repository can have multiple "branches" of the code, which are completely separate copies of the project directory/file structure. Branches are designed so that people can work independently without interferring with each other. The most common workflow is to create a feature branch, and work in it until your like your product, and then "merge" or "pull request" that branch back into the "main" branch.

Next it says our changes to `main.py` have not been staged yet:

```shell
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   main.py
```

Then it says we have one untracked (new) file in the working area:

```shell
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	noether.txt
```
Finally, since we haven't used `git add` on any of these changes yet, it says we don't have any changes staged:

```shell
no changes added to commit (use "git add" and/or "git commit -a")
```

Let's add both of our changes to the Staging Area:

```shell
git add main.py noether.txt
```

And check the git status again using `git status`:

```shell
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   main.py
	new file:   noether.txt
```

That is a clean staging area, ready for a commit:

```shell
git commit -m "Adding super awesome new feature"
```

Before I do most anything in Git, I first do a `git status` just to make sure I know what's going on and there aren't any surprises waiting for me. I think this is a good habit to get into.


### Short Status

As it happens, `git status` is a bit verbose. If you want something shorter to quickly glance at, you might be interested in the "short status".

In the situation above, after we modified `main.py` and added the new file `noether.txt`, this would have shown:

```shell
git status -s
 M main.py
?? noether.txt
```

Notice that there are two columns of identifiers to the left of each file.

We "Modified" `main.py` we see `.M` next to `main.py`. But that `M` is on the right, to indicate the change is not staged yet. If we `git add main.py` at this point, we would instead see `M.` next to `main.py`, where the `M` is in the left column, meaning it is staged.

We also added a brand new file, but hadn't added it to the staging area, which is why both the left and right columns show `?` on this line: `?? noether.txt`. If we had added `git add noether.txt` at this point, we would have seen:

```shell
git status -s
M  main.py
A  noether.txt
```

The `A` next to `noether.txt` here is because we "added" a new file.

### What changes have been staged?

The `git status` commands above are great, but they only show which files have been changed. To get a line-by-line comparison of what has been changed used:

```shell
git diff
```

And, probably more importantly, to review the actual line-by-line changes that have been staged, you can use:

```shell
git diff --staged
```

The outputs here can be pretty verbose, and can be pretty clunky for hand-checking very large changes.


## Viewing the History

To view all the recent git commits, we type `git log`:

```shell
$ git log
commit f3bd84594b3087ad8d063e63fe208e01d352413c (HEAD -> main)
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:13:08 2022 -0400

    Adding super awesome new feature

commit e41be631394c6806a50d7ebe6c7b303ce84d42db
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:12:08 2022 -0400

    Adding my first gitignore file!

commit bdd6dc3b2819929077ca1f4cbbc4bfae53dc5cc5
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:11:13 2022 -0400

    Renaming file2 to main

commit 20275337d0f032fd5cf67b270c3aa9d454d243d1
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:10:37 2022 -0400

    Removing a non-code text file

commit 14b2753defb3f232905ff6e4fc141a95ad491552
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:10:05 2022 -0400

    First commit
```

This is pretty verbose, but useful. First off, we can finally see these strange commit IDs that Git uses. These are called [hash values](https://en.wikipedia.org/wiki/Hash_function) and we won't talk much about _why_ they look so funny. All you really need to know is they are unique IDs for each commit.

The rest of the information is what we have put into the commit: author name and email, the datetime the commit was made, and the commit message we wrote.

For a quicker view of the commit history, you can use the flag `git commit --oneline`:

```shell
$ git log --oneline
f3bd845 (HEAD -> main) Adding super awesome new feature
e41be63 Adding my first gitignore file!
bdd6dc3 Renaming file2 to main
2027533 Removing a non-code text file
14b2753 First commit
```

This is particularly useful if you are trying to find a particular change. Of course, this is _only_ as useful as the first line of the commit message. So hopefully you've been writing good messages!


## Viewing a Commit

To look at a particular commit in great detail, we use the `git show` command, and point at the unique ID of the commit we want:

```shell
$ git show bdd6dc3
commit bdd6dc3b2819929077ca1f4cbbc4bfae53dc5cc5
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:11:13 2022 -0400

    Renaming file2 to main

diff --git a/file2.py b/main.py
similarity index 100%
rename from file2.py
rename to main.py
```

The `git show` command will give a full diff of every change made in the commit. So it can be very long. In this case, all we did was rename a file, so the print-out is short.

If typing that strange commit ID is a pain, we can also start with the `HEAD` commit (the current commit from the `git log` command above), and count back a few commits:

```shell
$ git show HEAD~2
commit bdd6dc3b2819929077ca1f4cbbc4bfae53dc5cc5
Author: Emmy Noether <enoether@brynmawr.edu>
Date:   Wed Mar 30 08:11:13 2022 -0400

    Renaming file2 to main

diff --git a/file2.py b/main.py
similarity index 100%
rename from file2.py
rename to main.py
```


## Unstaging Changes

Let's say we make a change to `main.py` and then we `git add main.py`. But then we decide that change was wrong, and we want to rever it. Unfortunately, we have already staged this change for the commit.

We can un-stage this change using `git restore`:

```shell
git restore --staged main.py
```

There, our staging area is clean again. The file `main.py` will still have all of those changes, but they won't be staged for the next commit.


## Discarding Changes

If we want to remove all of the unstaged changes in `main.py` and fully revert it back to the last commit, we can use `git restore` again but without the `--staged` flag:

```shell
git restore main.py
```

This checks out a fresh copy of the file from the previous commit. And now our working area is clean again:

```shell
$ git status
On branch main
nothing to commit, working tree clean
```


<br/><br/>
# The Remote Repository Workflow

Thus far, all the work we've done in Git has only been using a "local" repository. That is, we have only been using our own `.git` directory.

## Cloning a Repository

It is very common to want to work with other people, and to store a shared version of the repository somewhere helpfully central for everyone to us.

For this example, we're going to pretend we work at GitHub, and we are going to pretend to make a (stupid) change to the GitHub team's gitignore repo. First, we need to check out a full copy of the remote repository (that includes the entire project history):

```shell
$git clone https://github.com/github/gitignore

Cloning into 'gitignore'...
remote: Enumerating objects: 9724, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 9724 (delta 0), reused 0 (delta 0), pack-reused 9723
Receiving objects: 100% (9724/9724), 2.29 MiB | 5.60 MiB/s, done.
Resolving deltas: 100% (5289/5289), done.

$ cd gitignore
```

This will create the directory `gitignore`, which we can navigate into. Inside this directory, we will see our local copy of the repository inside the hidden `.git` directory.

Just to make sure everything is okay, let's check the status:

```shell
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

## Creating a New Branch

We haven't talked about it much, but so far we have been working in the `main` branch of our repositories. This is the default name given to the mainline version of the code.

<img src="https://git-scm.com/book/en/v2/images/head-to-master.png" alt="Git Branches">

But imagine you spend two weeks working on a big change to a codebase. It changes dozens of files and while you are working on this big, new "feature" in the codebase, everything is kind of broken. Well, your team mates will want to work in a non-broken codebase for the next two weeks, so you make a complete copy of the code base to work in, and call that copy something short describing your feature.

Now you work in this new copy of the code base until such a time as you are ready to merge your "branch" back into "main" for other people to share.

Let's create a new "feature branch" and call it `python_logs`:

```shell
$ git checkout -b python_logs
Switched to a new branch 'python_logs'
```

Now we can do whatever nonsense we want in our feature branch, without breaking the codebase for our team mates.


## Pushing Changes

First, let's make some arbitray change to the codebase and commit it:

```shell
$ echo "logs/" >> Python.gitignore 

$ git add Python.gitignore  

$ git commit -m "Adding log directories to Python .gitignore"
[python_logs f60fb39] Adding log directories to Python .gitignore
 1 file changed, 1 insertion(+)

$ git status
On branch python_logs
nothing to commit, working tree clean
```

Okay, now that we have a change, let's say we want to push these changes back to our team on GitHub (**Plaese Note**: this will not work exactly as written, because we are NOT members of the GitHub team and do not have permissions to do this):

```shell
git push origin python_logs
```


## Pulling Changes

If someone on our team makes a change to our `python_logs` branch, we can get all of those new changes to our branch by doing:

```shell
git pull origin python_logs
```


## Fetching All Branches

If we just want to update all the branches in our local repository to match whatever is in the remote repo, we use `git fetch`:

```shell
git fetch
```


<br/><br/>

# Further Topics

This was by no means a full guide to Git; it was just meant as an easy introduction for new users. In particular, I think there are some other important topics worth learning about:

1. **Merge Conflicts** - The reason `git push`, `git pull`, and `git fetch` above were so short is we didn't talk about what happens when you're version of a branch differs from someone else's version on your team. There are various ways these "merge conflicts" can come about, and various ways to handle fixing them.
2. **Submodules** - A somewhat more advanced Git topic, Git allows repos to include pointers to completely separate repos. This can be quite useful, but also a bit messy.


<br/><br/>

# References

* [Official Git Docs](https://git-scm.com/)
* [Getting Started with the Git Command Line](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)
* [What is GitHub.com?](https://en.wikipedia.org/wiki/GitHub)
* [git staging area](https://git-scm.com/about/staging-area)
* [undoing things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)
* [git branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
* [git branching and merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [gitignore](https://git-scm.com/docs/gitignore)
  * [gitignore examples]](https://github.com/github/gitignore)
* git commands
  * [git add](https://git-scm.com/docs/git-add)
  * [git commit](https://git-scm.com/docs/git-commit)
  * [git config](https://git-scm.com/docs/git-config)
  * [git init](https://git-scm.com/docs/git-init)
  * [git fetch](https://git-scm.com/docs/git-fetch)
  * [git log](https://git-scm.com/docs/git-log)
  * [git pull](https://git-scm.com/docs/git-pull)
  * [git push](https://git-scm.com/docs/git-push)
  * [git show](https://git-scm.com/docs/git-show)
  * [git status](https://git-scm.com/docs/git-status)
* The beautiful mathematics behind Git
  * [Hash Functions](https://en.wikipedia.org/wiki/Hash_function)
  * [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory)
* [Think Like a Git](http://think-like-a-git.net/) - Popular website for understand Git the hard way.
