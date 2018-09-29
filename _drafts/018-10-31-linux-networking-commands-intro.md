---
layout: post
title: "Linux Networking Commands: A Friendly Intro"
tags: [Linux, Networking, Software]
summary: A soft, friendly introduction to networking in Linux.
---
{% include JB/setup %}

Networking is a whole field that you could spend your entire life studying and working in. And Linux is a big ecosystem. So getting started learning to deal with your network in Linux could sound a little intimidating. This guide will not attempt to teach you everything, you will not find the deep secrets of Linux and networking here. Instead, this will be a beginner-level, friendly introduction to four Linux commandline networking tools that will help form a solid starting point to explore and work on your network.


## ss

> TODO: [ss](https://en.wikipedia.org/wiki/Iproute2)

Socket Statistics (`ss`) is a part of the IProute2 Linux network tools. It gives you a bunch of statistics on your network sockets.


## nmap

> TODO: [nmap](https://en.wikipedia.org/wiki/Nmap)

`nmap` is an open-source security scanner that allows you to scanner your local network to build a map of the hosts and services.


## ifconfig

> TODO: [ifconfig](https://en.wikipedia.org/wiki/Ifconfig)

`ifconfig` is used to display and coonfigure your network interface.


## iptables

> TODO: [iptables](https://en.wikipedia.org/wiki/Iptables)

`iptables` is a network management tool to set priviledges for network packet communications.


## Bonus Round

> TODO: [fail2ban](https://en.wikipedia.org/wiki/Fail2ban) is a simple tool( written in Python) to help fight / prevent brute-force network attacks. In particular, if an IP address fails to login N times, their IP will be automatically banned for M days. So anyone try thousands of common username/password combinations will get automatically blocked. This is particularly useful for servers that are exposed to the public, as they will almost certainly see a lot of these brute-force attacks.

> TODO: files of interest: knownhosts
