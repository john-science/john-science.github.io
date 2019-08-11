---
layout: post
title: "Git: to Stash, or not to Stash"
tags: [Software, Git]
summary: A quick introduction to git stash workflows
---
{% include JB/setup %}

`git stash` temporarily hides changes you've made to your branch so you can work on something else, and then come back and re-apply those changes later. Stashing is handy if you are halfway through working on something but you need to switch branches to do something else.


## A Toy Repo

Let's build a little test repo, so we have something to use for concrete examples later.

    $ mkdir hello
    $ cd hello
    $ git init

    $ echo "def main():
        print('hello world')
    if __name__ == '__main__':
        main()
    " > hello_world.py

    $ echo "bin/
    dist/" > .gitignore

    $ echo "Which license do I want?" > LICENSE

    $ git add hello_world.py LICENSE .gitignore
    $ git commit hello_world.py LICENSE .gitignore -m "initializing repo"

Okay, this is just about the smallest repo in the world:

* hello/
  * hello_world.py
  * LICENSE
  * .gitignore


## The Simple Workflow - git stash

Okay, the first `git stash` workflow to know about is easy and fast.  Let's say we modify some file:

    $ echo "sdist/
    eggs/
    .eggs/" >> .gitignore

But we're not done with our changes to the `.gitignore` file, and suddenly we have other work to do. Someone on our team has made big changes to the repo in some other branch, and we need to go work on the other branch.

Easy, to save our work locally, without commit any changes we just do:

    $ git stash

Suddenly, our working directory is clean again and we can go about our business.

    $ cat .gitignore
    bin/
    dist/

An hour or a week passes and we want to get back to what we were doing. To retrieve our local changes we just do:

    $ git stash pop

And everything is back, just the way we left it:

    $ cat .gitignore
    bin/
    dist/
    eggs/
    .eggs/

It really is that easy. Though, I should note, files that aren't yet `git add`ed to your repo won't get caught by `git stash`.


## The Detailed Workflow - git stash list

> Everybody likes the simple life, until it gets complicated.

Let's say the workflow above appeals to you. You start using it every day and it becomes something you rely upon. In that situation, people who started out liking the new feature for its simplicity start asking for more power. Along with that new power comes more syntax to learn.

I feel like this is how most software evolves.

Anyway, the more detailed workflow here is that you `git stash` multiple times and want to pick and chose which stashes to apply from your history.

So, let's make some changes:

    $ echo ".tox/
    docs/
    __pycach__/" >> .gitignore
    $ git stash save "adding things to .gitignore"
    
    $ echo "MIT or GNU GPLv3.0?" > LICENSE
    $ git stash save "narrowed my open sources licenses down"
    
    $ echo "htmlcov/
    cover/
    .coverage/" >> .gitignore
    $ git stash save "adding coverage artifacts to .gitignore"

Now we have three `git stash` references stored locally. First things first, we want to list them:

    $ git stash liststash@{0}: On master: adding coverage artifacts to .gitignore
    stash@{1}: On master: narrowed my open sources licenses down
    stash@{2}: On master: adding things to .gitignore

Let's say we realize we don't have any coverage tests in this project and we don't need that last stash in the list:

    $ git stash drop stash@{2}
    $ git stash list
    stash@{0}: On master: adding coverage artifacts to .gitignore
    stash@{1}: On master: narrowed my open sources licenses down

THEN we decide we want to apply that second stashed item to our repo:

    $ cat LICENSE 
    Which license do I want?
    
    $ git stash pop stash@{1}
    
    $ cat LICENSE 
    MIT or GNU GPLv3.0?

Lastly, say we want to completely drop all the stashes we have in our local repo:

    $ git stash clear

And that's about it. The more detailed `git stash` workflow involves managing a labelled list of stash items. It is certainly more powerful, but also requires more work to operate. Still, it's only a handful of easily Googlable commands.


## My Personal Workflow

    git commit

Okay, cards on the table, I don't use `git stash`. I just `git commit` my changes. Even if it leaves my branch in some wonky state. That's fine. I always work on disposable branches. And I never Pull Request my personal working branches to a group/shared branch until it is clean.

Does this mean my personal commit history is slightly longer than other people's? Possibly. But that has never been a problem before.

There's nothing wrong with `git stash`. It has its place and I can totally see it as part of a solid workflow. It's just not part of mine. Still, I think it's a helpful tool to know about and one worth trying to see if it's right for you.
