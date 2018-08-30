---
layout: post
title: "Tools for Cleaning Up Git Repos"
tags: [Git, Software, Linux]
summary: A couple of useful tools for doing the Spring Cleaning on your old Git repos.
---
{% include JB/setup %}

Whether you have been maintaining the same project for years or just jumped onto something new, you should occassionally tidy up your repos. This doesn't have to happen often, say once a year. Do it in Spring and call it Spring Cleaning.

Below are a couple scripts to help you find the cob webs and dust bunnies in your repos.


### Which files haven't been edited in years?

A good place to start on your spring cleaning is to find all the files in your repos that haven't been edited in years. Sure, some of these will just be static resources. But the shell script below will also turn up any unused and forgotten files you might have lying around.

(If you aren't running Linux / Bash, the Git commands in this script will still work fine.)

**git_largest_files.sh**:

```shell
#!/bin/bash

########################################################################
#  Find the loneliest files in your Git repo.                          #
#                                                                      #
#  i.e. Sort all the files in a local Git repo by the date of their    #
#       last commit.                                                   #
#                                                                      #
#  WARNING: This script will be slow for large repos.                  #
########################################################################

# set file paths
TMP_PATH='all_the_lonely_files.tmp'
OUT_PATH='lonely_files.txt'
rm -f "${TMP_PATH}"

# loop through all the files in the repo
# and get the date for the last time it was commited to
for f in `git ls-tree --full-tree -r HEAD | awk '{print $(NF)}'`; do
	echo `git log -1 --format=%cd --date=short ${f}` "${f}" >> "${TMP_PATH}"
done

# uniquely sort the results by commit date
grep -v '^#' "${TMP_PATH}" | sort -u > "${OUT_PATH}"
rm -f "${TMP_PATH}"
```


### What are the biggest files in your repo?

Git keeps a complete history of all the files ever committed and all the changes to those files. So if you want to find the largest files in your repo, you have to search through the entire history of your repo. Luckily, Git gives us the power to do that pretty easily.

**git_lonliest_files.sh**:

```shell
#!/bin/bash

########################################################################
#  Find the largest files in your Git repo.                            #
#                                                                      #
#  i.e. Sort all the files in a local Git repo by their file size at   #
#       any point in your repos history.                               #
#       (Even deleted files take up space in your repo.)               #
#                                                                      #
#  To remove a large file from the history of your repo, do:           #
#                                                                      #
#  git filter-branch --force --index-filter 'git rm --cached \         #
#      --ignore-unmatch path/to/thing.bin' --prune-empty \             #
#      --tag-name-filter cat -- --all                                  #
#  git push -f                                                         #
#                                                                      #
#  WARNING: This script will be slow for very large / old repos.       #
########################################################################

# set file paths
TMP_PATH='big_files.tmp'
OUT_PATH='largest_files.txt'
rm -f "${TMP_PATH}"

# loop through all past commits and grab the file sizes
for commit in $(git rev-list --all); do
	git ls-tree -r --long "${commit}" | \
		awk '{print $(NF-1) "\t" $(NF)}' >> "${TMP_PATH}"
done

# uniquely sort the results by file size
sort -u --numeric-sort --reverse "${TMP_PATH}" >  "${OUT_PATH}"
rm -f "${TMP_PATH}"

```

Did someone commit a 100MB data file and then quickly `git rm` it, thinking no one would notice? Well, you just noticed, and now you can filter it out of your history so it stops slowing you down.
