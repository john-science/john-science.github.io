---
layout: post
title: "Git: to Stash, or not to Stash"
tags: [Software, Git]
summary: A simple introduction to git stash workflows
---
{% include JB/setup %}

`git stash` temporarily hides changes you've made to your branch so you can work on something else, and then come back and re-apply those changes later. Stashing is handy if you are halfway through working on something but you need to switch branches and do something completely different.


## Let's Build a Toy Repo

TODO


## The Simple Workflow - git stash

TODO

    git stash
    git stash pop

## The Detailed Workflow - git stash list

TODO

    git stash save "something"
    git stash save "something else"
    git stash save "nothing"
    git stash list
    git stash drop stash@{2}
    git stash list
    git stash pop stash@{1}
    git stash clear

## My Personal Workflow - git commit

TODO

    git commit
