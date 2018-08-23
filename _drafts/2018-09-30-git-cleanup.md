---
layout: post
title: "Cleaning Up Your Old Git Repos"
tags: [Physics, Math]
summary: A couple of useful tools for doing the spring cleaning on your old Git repos.
---
{% include JB/setup %}

Blah Blah Blah... intro


lonely files

```shell
#!/bin/bash

########################################################################
#  Find the loneliest files in your Git repo.                          #
#                                                                      #
#  i.e. Sort all the files in a local Git repo by the date of their    #
#       last commit.                                                   #
#                                                                      #
#  WARNING: This script will be slow for very large repos.             #
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

blah blah blah, witty things


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
#  git filter-branch --tree-filter 'rm -f path/to/thing.bin' -- --all  #
#                                                                      #
#  WARNING: This script will be slow for very large / old repos.       #
########################################################################

# set file paths
TMP_PATH='all_the_lonely_files.tmp'
OUT_PATH='largest_files.txt'
rm -f "${TMP_PATH}"

# loop through all past commits and grab the file sizes
for commit in $(git rev-list --all); do
	git ls-tree -r --long "${commit}" | \
		awk '{print $(NF-1) "\t" $(NF)}' >> "${TMP_PATH}"
done

# uniquely sort the results be file size
sort -u --numeric-sort --reverse "${TMP_PATH}" >  "${OUT_PATH}"
rm -f "${TMP_PATH}"

```

yack yack yack... closing wittisicsm
