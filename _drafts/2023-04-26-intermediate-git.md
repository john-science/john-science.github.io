---
layout: post
title: "Intermediate Git"
tags: [Software, Git]
summary: An Introduction to Merging and Submodules
---
{% include JB/setup %}


This guide is a follow up to my [Gentle Introduction to Git](https://antineutrino.net/2022/03/30/introduction-to-git). There I describe what Git is, and discuss the important topics of commits and branches.


# Branch Merging

> TODO


## git merge

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

The point of `git merge` is to get your commits into the `main` branch (or any other branch, but we'll just talk about `main` right now to make things easier).


### fast foward: the best case scenario

Let's start with the easiest case first: your feature branch is one (or more) commits ahead of main:

<img src="https://wac-cdn.atlassian.com/dam/jcr:d90f2536-7951-4e5e-ab79-f45a502fb4c8/03-04%20Fast%20forward%20merge.svg?cdnVersion=971" alt="your branch" >

TODO

<img src="https://wac-cdn.atlassian.com/dam/jcr:d90f2536-7951-4e5e-ab79-f45a502fb4c8/03-04%20Fast%20forward%20merge.svg?cdnVersion=971" alt="fast forward merge" >



### the merge commit

BUT, and here's the kicker, what if while you were working on your feature branch, there were new commits on the `main` branch?

<img src="https://wac-cdn.atlassian.com/dam/jcr:7afd8460-b7bf-4c42-b997-4f5cf24f21e8/01%20Branch-2%20kopiera.png?cdnVersion=969" alt="Two branches" >

This happens all the time. And at first, you might stub your toe on it pretty hard. But we have the tools to solve it. The first solution, and the most clunky, is to create a merge commit, that combines the two branches:

```bash
git checkout main
git pull origin main
git checkout new-feature
git merge main
```

This will create a merge commit:

<img src="https://wac-cdn.atlassian.com/dam/jcr:c6db91c1-1343-4d45-8c93-bdba910b9506/02%20Branch-1%20kopiera.png?cdnVersion=969" alt="Two merged branches" >

And, broadly, our problem is solved; our feature branch is up-to-date with the `main` branch. 


reference 1:  https://www.atlassian.com/git/tutorials/using-branches/git-merge




## merge conflicts

> TODO


## merge tools

> TODO: like GitHub


# Submodules

> TODO
