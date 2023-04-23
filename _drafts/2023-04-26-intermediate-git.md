---
layout: post
title: "Real Git Workflows"
tags: [Software, Git]
summary: An Introduction to Branch Merging, Conflicts, and Rebasing
---
{% include JB/setup %}


This guide is a follow up to my [Gentle Introduction to Git](https://antineutrino.net/2022/03/30/introduction-to-git). There I describe what Git is, and discuss the important topics of commits and branches.


> TODO


# git merge

Let's say you are working on some code and need to add a feature. Your first step is to create a feature branch to work on:

```bash
# make sure your 'main' branch is up-to-date
git checkout main
git pull origin main

# create a new branch
git checkout -b new-feature

# you do a lot of work, and make some commits
git commit -am "Feature commit 1"
git commit -am "Feature commit 2"
git commit -am "Feature commit 3"
```

The point of [`git merge`](https://www.atlassian.com/git/tutorials/using-branches/git-merge) is to get your commits into the `main` branch, or the `main` branch might get new commits you want. In git, all of these problems are solved with `git merge`.


## fast foward: the best case scenario

Let's start with the easiest case first: your feature branch is one (or more) commits ahead of main.  In this case, the merge is just a "fast forward" where your branch can be merged into `main` with no problems:

```bash
# make sure your 'main' branch is up-to-date
git checkout main
git pull origin main

# merge the `new-feature` branch in `main`
git merge new-feature
```

It's great when this happens:

<img src="https://wac-cdn.atlassian.com/dam/jcr:d90f2536-7951-4e5e-ab79-f45a502fb4c8/03-04%20Fast%20forward%20merge.svg?cdnVersion=971" alt="fast forward merge" >

However, if you are using GitHub, you may want to use a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (PR) here instead of `git merge`. Under the hood, the PR uses the `git merge`, actually. So this is good to know. And don't worry, we'll cover the GitHub PR process a bit later.


## the merge commit

BUT, and here's the kicker, what if while you were working on your feature branch, there were new commits on the `main` branch?

<img src="https://wac-cdn.atlassian.com/dam/jcr:7afd8460-b7bf-4c42-b997-4f5cf24f21e8/01%20Branch-2%20kopiera.png?cdnVersion=969" alt="Two branches" >

This happens all the time. And at first, you might stub your toe on it pretty hard. But we have the tools to solve it. The first solution, and the most clunky, is to create a merge commit, that combines the two branches:

```bash
# grab the new commits from the 'main' branch
git checkout main
git pull origin main

# merge the `main` branch commits into your feature branch
git checkout new-feature
git merge main
```

This will create a merge commit:

<img src="https://wac-cdn.atlassian.com/dam/jcr:c6db91c1-1343-4d45-8c93-bdba910b9506/02%20Branch-1%20kopiera.png?cdnVersion=969" alt="Two merged branches" >

And, broadly, our problem is solved; our feature branch is up-to-date with the `main` branch. We can do better than this though, generally, since this merge commit will sit in your history forever. Aside from just junking up the git history of your project, it will also make it hard for you to do many git operations within your commit history.


## merge conflicts

> The above git merges were either "fast forward" merges or we created a "merge commmit". There is another, less nice, possibility: **merge conflicts**.

Merge conflicts are a common stumbling block for new git users. But it only takes a little effort to:

1. Understand what a merge conflict is.
2. Learn a tool to handle the merge conflict.

### What is a merge conflict?

Okay, you just tried to merge `main` into your feature branch and BAM you got a merge conflict!

```bash
$ git merge main
Auto-merging setup.py
CONFLICT (content): Merge conflict in setup.py
Automatic merge failed; fix conflicts and then commit the result.
```

The merge failed! Oh noes! But why?

Essentially, git does a great job at merging different commits from different branches. It's quite a beautiful mathematical solution, so most of the time git can just auto-magically combine commits for you. But there is one scenario where git won't (by default) be able to know how to resolve the merge:

> What if both your feature branch and the `main` branch change the same line?

The problem is clear. If you make a change to a particular line, say in the `setup.py` as shown above, but that SAME line has a totally different change in the `main` branch, git won't know how to combine the two changes. So it says "Yeah, there is a conflict here, you figure it out."  And, frankly, most of the time this is where automation fails, and you DO need a real human to see if the changes are compatible. 

So that's what a "merge conflict" is, and why you just got burnt.

(For more advanced git users, git provides [merge strategies](https://www.atlassian.com/git/tutorials/using-branches/merge-strategy) to attempt to automate this process. But those strategies can be REAL dangerous if you don't know exactly what changes have been made in both branches, so we will ignore them here.)

### Resolving Merge Conflicts

> Okay, now that we know WHY we got a merge conflict, how do we resolve them?

This is actually easier than you might think. In the merge conflict message above, git explicitly lists the files that have conflicts:

```bash
$ git merge main
Auto-merging setup.py
CONFLICT (content): Merge conflict in setup.py
Automatic merge failed; fix conflicts and then commit the result.
```

So we just need to go through each `CONFLICT` file, open them in _any_ text editor and fix the conflicts. The conflicts will be REALLY clearly identified by git:

```
    long_description=README,
<<<<<<< HEAD
    python_requires=">=3.8",
=======
    python_requires=">=3.9",
>>>>>>> main
    packages=find_packages(),
```

Between two lines that look like `<<<<<<< HEAD` and `=======` there will be the line(s) changed by your branch, and after that between the `=======` and `>>>>>>> main` will be the line(s) changed by the `main` branch (or whatever branch you are trying to merge in).  You just need to remove everything that isn't what you want. Say, for instance, you want what is in the `main` branch, you would just use your text editor to change the above to:

```
    long_description=README,
    python_requires=">=3.9",
    packages=find_packages(),
```

Now do this for all the conflicts in the file (if there are more than one), save the file and exit.

On the command line you should now see this:

```bash
# git status
On branch new-feature
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   setup.py

no changes added to commit (use "git add" and/or "git commit -a")
```

As it says, you can now "`git add`" the file you just fixed:

```bash
$ git add setup.py 
$ git status
On branch tmp-feature
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
	modified:   setup.py
```

If there are conflicts for more than one file, you do it for all of them. Then tell git the conflicts are all resolved by making a merge commit:

```bash
$ git commit -am "Merging in the main branch"
[new-feature 0338b785] Merging in the main branch
$
$ git status
On branch new-feature
nothing to commit, working tree clean
```

Done!

Awesome, success.

So, what did we learn?

1. A merge conflict happens when you try to merge another branch into yours, but both branches have commits that affect the same line differently, and git will make you resolve that issue.
2. Resolving a merge conflict is as easy as opening the code in _any_ text editor and picking the changes you like best.


# git rebase

Okay, so the solution around adding a million merge commits into your git history is to use the [`git rebase`](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) command.  

Using `git rebase` can actually get you quite a lot. Broadly, it can collapse many commits into one. And that is kind of a super power in the git world.

Okay, let's imagine you are two commits ahead of the `main` branch but the first commit was just a half-complete placeholder of your work. You really only _want_ to have one commit, so it would be better if you could collapse your branch into two commits:

```bash
λ git log --oneline -n 3
c15b3ff (HEAD -> new-feature) Okay, my feature is complete
6808678 placeholder... it's almost working
26bda05 (origin/main, origin/HEAD, main) The last commit in the `main` branch.
```

Well, if you want to squash those last two commit into one you would do:

```git
git rebase -i HEAD~2
```

And you would get thrown into a screen that looked like this:

```git
pick 6808678 placeholder... it's almost working
pick c15b3ff (HEAD -> new-feature) Okay, my feature is complete

# a bunch of stuff
```

To squash these two files into one, change all but the first want from saying "pick" to saying "s" or "squash":

```git
pick 6808678 placeholder... it's almost working
s c15b3ff (HEAD -> new-feature) Okay, my feature is complete

# a bunch of stuff
```

Then it will let you make a new commit message for your new, combined commit:

```git
# This is a combination of 2 commits.
# This is the 1st commit message:

placeholder... it's almost working

# This is the commit message 2:

Okay, my feature is complete
```

Just comment out the text you don't want, or write something new in. Your commit message will be whatever is left uncommented.

Your two commits are now squashed down into one:

```bash
λ git log --oneline -n 2
3c7af50 (HEAD -> new-feature) Okay, my feature is complete
26bda05 (origin/main, origin/HEAD, main) The last commit in the `main` branch.
```

This is a useful tool for fixing merge 


## rebase warning

> NEVER rebase the git history on the `main` branch.

Say you and your team are working on a github repository together. The rule here is that you NEVER rebase commits that other people on your team already have. That is, leave the `main` branch alone. For instance, if the GitHub repo permissions are set too loose, you could use `git rebase` to wipe the entire history of your teams project down to one commit.  This would be a disaster.  Even just squashing a few commits in the `main` branch would cause _super_ nasty merge conflicts for your team mates. So: NEVER rebase commits that are already on your `main` branch.


# merge tools

> TODO: like GitHub
