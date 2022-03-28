---
layout: post
title: "An Introduction to Git"
tags: [Software, Git]
summary: A Gentle, if Technical, Introduction to Git
---
{% include JB/setup %}


This guide will not cover installation or security issues, as they are heavily situationally dependent. Instead, this guide focuses on providing an introduction to the Git comamnd line.

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


## Configuring Git

TODO



## References

TODO
