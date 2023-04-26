---
layout: post
title: "Intermediate Git Topics"
tags: [Software, Git]
summary: An Introduction to Merging, Conflicts, Rebasing, and Submodules
---
{% include JB/setup %}

[Last time](https://antineutrino.net/2022/03/30/introduction-to-git) we discussed the basics of how Git records the history of changes to a codebase using commits, and we learned about different "branches" of a Git repo. In order to understand this lecture, you're going to need a solid grasp of those topics.

> How do people actually _use_ git in the real world?

While you _can_ use Git by yourself to track a project (as I have done many times), the real power and complexity of using Git is learning the workflows necessary for multiple people to work on the same repository.

While the intermediate topics below will be generally useful to everyone who uses Git, I am going to talk about most of them through the lens of a really common Git team workflow:

* Your team has a repository on GitHub (or similar).
* You repo has a `main` branch.
* Everyone works in a feature branch when they are coding.
* Feature branches get merged into the `main` branch when they are ready.

We'll also cover some more intermediate Git topics like `git rebase` and `submodules`.


# git merge

Let's say you are working a new feature for your teams codebase. Your first step is to create a feature branch to work in:

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

The point of [`git merge`](https://www.atlassian.com/git/tutorials/using-branches/git-merge) is to get your commits into the `main` branch, or the `main` branch might get new commits you want. In Git, all of these problems are solved with `git merge`.


## fast foward: the best case scenario

Let's start with the easiest case first: your feature branch is one (or more) commits ahead of `main`.  In this case, the merge is just a "fast forward" where your branch can be merged into `main` with no problems:

```bash
# make sure your 'main' branch is up-to-date
git checkout main
git pull origin main

# merge the `new-feature` branch in `main`
git merge new-feature
```

It's great when this happens:

<img src="https://wac-cdn.atlassian.com/dam/jcr:d90f2536-7951-4e5e-ab79-f45a502fb4c8/03-04%20Fast%20forward%20merge.svg?cdnVersion=971" alt="fast forward merge" >

However, if you are using GitHub, you will want to use a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (PR) here instead of `git merge`. Under the hood, the PR uses the `git merge`, actually. So this is good to understand. And don't worry, we'll cover the GitHub PR process later.


## the merge commit

BUT, and here's the kicker, what if while you were working on your feature branch, there were new commits on the `main` branch?

<img src="https://wac-cdn.atlassian.com/dam/jcr:7afd8460-b7bf-4c42-b997-4f5cf24f21e8/01%20Branch-2%20kopiera.png?cdnVersion=969" alt="Two branches" >

This happens all the time. And it is a common place for new Git users to stub their toe. But we have the tools to solve it. The first solution, and the most clunky, is to create a "merge commit" to combine the two branches:

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

And, broadly, our problem is solved; our feature branch is up-to-date with the `main` branch.

We can do better though. That merge commit will sit in your history forever, and your history will looked "forked" and not a straight line. Aside from just junking up the git history of your project, it will also make it hard for you to do many Git operations within your commit history.


## merge conflicts

> The above Git merges were either "fast forward" merges or we created a "merge commmit". There is another, less nice, possibility: **merge conflicts**.

Merge conflicts are a common stumbling block for new Git users. But it only takes a little effort to:

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

Essentially, Git does a great job at merging different commits from different branches. It's quite a beautiful mathematical solution, so most of the time Git can just auto-magically combine commits for you. But there is one scenario where Git won't (by default) be able to know how to resolve the merge:

> What if both your feature branch and the `main` branch change the same line?

The problem is clear. If you make a change to a particular line, say in the `setup.py` as shown above, but that SAME line has a totally different change in the `main` branch, Git won't know how to combine the two changes. So it says "Yeah, there is a conflict here, you figure it out."  And, frankly, most of the time you DO need a real human to solve that problem.

So that's what a "merge conflict" is, and why you just got burnt.

(For more advanced Git users, Git provides [merge strategies](https://www.atlassian.com/git/tutorials/using-branches/merge-strategy) to attempt to automate this process. But those strategies can be REAL dangerous if you don't know exactly what changes have been made in both branches, so we will ignore them here.)

### Resolving Merge Conflicts

> Okay, now that we know WHY we got a merge conflict, how do we resolve it?

This is actually easier than you might think. In the merge conflict message above, Git explicitly lists the files that have conflicts:

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


## Rebase Warning

> NEVER rebase the git history on the `main` branch.

Say you and your team are working on a github repository together. The rule here is that you NEVER rebase commits that other people on your team already have. That is, leave the `main` branch alone. For instance, if the GitHub repo permissions are set too loose, you could use `git rebase` to wipe the entire history of your teams project down to one commit.  This would be a disaster.  Even just squashing a few commits in the `main` branch would cause _super_ nasty merge conflicts for your team mates. So: NEVER rebase commits that are already on your `main` branch.


# Merge Tools

There are SO many great tools for helping people with the above workflows, it would be impossible to show them all. The first, and most important, tool you can use to do _anything_ in git is the command line.  As shown above, you can do any merge operation with the git command line. But also, there are also a ton of graphical (GUI) front ends for git, like [TortoiseGit](https://tortoisegit.org/) that attempt to make these things easier. Also, all modern IDEs will have git workflows built right in to help make these things easier: [XCode Git Support](https://code.visualstudio.com/docs/sourcecontrol/overview) or [Eclipse EGit](https://www.eclipse.org/egit/).

For this example, we're going to look at the tools Git provides for merges, conflicts, and rebasing. GitHub's tools are clear, and super common.


## GitHub Merge Tool: The Pull Request

Let's say we have a simplt one-line commit that in a branch named `new-feature`. If we want to `git merge` this branch in the `main` branch of our repo, GitHub provides a Pull Request (PR):

<img src="/assets/images/git/0_make_pr.png" alt="Creating a GitHub PR">

This is how we can get our commit into the `main` branch. And it also allows everyone on our team to easily view the change, comment on it, and review it. Great stuff. We can enter a description (which is super important) and maybe assign reviewers (if we have that power):

<img src="/assets/images/git/1_open_pr.png" alt="Opening a PR">

The PR page also lets people clearly and easily view all the code that was changed. Here, we only changed one line of text:

<img src="/assets/images/git/2_pr_contents.png" alt="What files changed in this PR?">

Now, your PR reviewers may have comments. They may ask for explanation and clarification. And it is your job as the person who opened the PR to respond to those comments. You may even have to tweak your PR by adding more commits to your branch. Eventually, hopefully, your reviewer(s) may "Approve" your PR. Then, and only then, you will be able to "merge" your branch into `main`. But there you will have three options:

<img src="/assets/images/git/3_git_merge_type.png" alt="Options for merging the PR">

1. **"Create a merge commit"** - If you can avoid it, I highly recommend never selecting this option. In fact, I recommend turning this AS an option in all your Git repositories. Merge commits clutter up your git history and make doing lots of things (like "git rebase") significantly harder, and sometimes impossible. 
2. **"Squash and merge"** - This will take your entire PR and "squash" it down to one commit which gets added to the `main` branch. (You get a chance to re-write the commit message if you want.) This is the default option I like best, if it's possible. If your PR has one-and-only-one idea in it, then it makes sense to fully squash all the commit history of you working through the solution and make the git history a lot simpler and more clear.
3. **"Rebase and merge"** - If your PR has multiple commits, this feature will add those multiple commits to the history of the `main` branch. The only time this is useful is when your PR has multiple ideas and goals, and it can't be squashed. In that scenario, "Rebase and merge" is a great option. Though, again, is is usually a sign of a sloppy PR if it has more than one purpose.


## GitHub Conflict Resolving Tool

> Okay, but what happens on GitHub when there's a merge conflict?

Remember, our example PR is a one-line change to a README file. Let's say while you weren't looking, a change was made to that exact line in the `main` branch. We say "you branch has fallen being `main`". Well, GitHub will tell you and provide a nice interface to resolve the conflict:

<img src="/assets/images/git/4_conflict_found.png" alt="Merge conflict found on GitHub">

So we click the handy "Resolve conflicts" button and GitHub will direct us a a Conflict Resolver UI that will allow us to quickly see all the conflicts and decide how to resolve them (in every file with conflicts):

<img src="/assets/images/git/5_github_conflict_resolver_ui.png" alt="The GH conflict resolver UI">

Just like on the command line, you will see the `<<<<<<< new-feature` and `>>>>>>> main` lines that show us the conflicting lines in each branch. And we can use the GitHub UI exactly like a normal text editor to resolve the conflicts. Then we click the "Mark as resolved" button on the top-right and Commit the merge into our branch:

<img src="/assets/images/git/6_mark_as_resolved.png" alt="Mark Conflict as resolved">


# Submodules

For our last topic, let's do something completely different. Instead of talking about Git tools that teams use to interact within a repo let's talk about git tools teams use to work _between_ repos: [git submodules](https://www.atlassian.com/git/tutorials/git-submodule).

Now, why would you use "`git submodule`" instead of just installing another piece of software like normal? Typical reason people resort to using submodules are:

* The other git repo you depend on changes it's API too fast for you to want to bother trying to keep up.
* The other git repo doesn't release an easily-installable version of itself, but it _is_ open source.

Essentially, a git "submodule" is a link from your repo to another git repo, pointed at a very specific commit (or less-commonly branch). Submodules are definitely and "intermediate" and not a "beginner" Git feature, as they can get confusing for new Git users. If at all possible, use git submodules sparingly.

<img src="/assets/images/git/9_submodules.jpg" alt="Submodules are a Sometimes Tool">


## Adding a Submodule

To add a new submodule to your repo, you use the command `git submodule add`:

```bash
$ git submodule add https://bitbucket.org/jaredw/awesomelibrary
Cloning into '/Users/atlassian/git-submodule-demo/awesomelibrary'...
remote: Counting objects: 8, done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 8 (delta 1), reused 0 (delta 0)
Unpacking objects: 100% (8/8), done.
```

Not only will this check out the repo, it will also add a `.gitmodules` file to your repo:

```bash
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

 new file:   .gitmodules
 new file:   awesomelibrary
```

If you want, you can no go into the "awesomelibrary" folder on the command line and checkout the exact commit you want from the other repo with "git checkout ababa0101".

So, add both of these to commit the submodule to your repo:

```bash
$ git add .gitmodules awesomelibrary/
$ git commit -m "added submodule"
[main (root-commit) d5002d0] added submodule
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 awesomelibrary
```

If you aren't adding your submodule, but just checking out a repo that already has submodules, you'll want to type this to grab the submodule code and update it to the write commit:

```bash
$ git submodule update --init --recursive
```

Once submodules are initialized, they can be used like any other repository. That is, submoduels have their own branches and history. Let's try a simple submodule workflow:

```bash
$ cd awesomelibrary/
$ git checkout -b new_awesome
Switched to a new branch 'new_awesome'
$ echo "new awesome file" > new_awesome.txt
$ git status
On branch new_awesome
Untracked files:
  (use "git add <file>..." to include in what will be committed)

 new_awesome.txt

nothing added to commit but untracked files present (use "git add" to track)
$
$ git add new_awesome.txt
$ git commit -m "added new awesome textfile"
[new_awesome 0567ce8] added new awesome textfile
 1 file changed, 1 insertion(+)
 create mode 100644 new_awesome.txt
$ git branch
  main
* new_awesome
$
$ git push origin new_awesome  # only if you own the submodule repo.
```

Here we have created a new text file `new_awesome.txt` and added the file to the submodule. How does this look from the parent repo?

```bash
$ cd ..
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

 modified:   awesomelibrary (new commits)

no changes added to commit (use "git add" and/or "git commit -a")
```

Running `git status` shows the parent repository is aware of the new commits to the `awesomelibrary` submodule. It doesn't go into detail about the specific updates because that is the submodule repositories responsibility. The parent repository is only concerned with pinning the submodule to a commit. Now we can update the parent repository again by doing a `git add` and `git commit` on the submodule. This will put everything into a good state with the local content. If you are working in a team environment it is critical that you then `git push` the submodule updates, and the parent repository updates.

When working with submodules, a common pattern of confusion and error is forgetting to push updates for remote users. If we revisit the `awesomelibrary` work we just did, we pushed only the updates to the parent repository. Another developer would go to pull the latest parent repository and it would be pointing at a commit of `awesomelibrary` that they were unable to pull because we had forgotten to push the submodule. This would break the remote developers local repo. To avoid this failure scenario make sure to always commit and push the submodule and parent repository.
