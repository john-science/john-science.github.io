---
layout: post
title: "Linux Networking Commands: A Friendly Intro"
tags: [Linux, Networking, Software]
summary: A soft, friendly introduction to networking in Linux.
---
{% include JB/setup %}

Networking is a whole field that you could spend your entire life studying. And Linux is a big ecosystem. So getting started learning to deal with your network in Linux could be a little intimidating. This guide will not attempt to teach you everything. I certainly don't know everything. You will not find the deep secrets of networking here. This will be a beginner-level, friendly introduction to four Linux commandline networking tools that will help form a solid starting point to explore your network.


## The Basics - You might already know them!

Okay, if you have spent much time in Linux at all, these three commands will probably be familiar to you. I was going to leave them out of this discussion as they are *so* basic. But, really, if you haven't seen these before you will absolutely need them if you want to explore or configure your local network.

#### ping

The `ping` command is used to test if you can reach an IP address on your network. Let's see if we can reach Wikipedia today:

```shell
$ ping wikipedia.com
PING wikipedia.com (208.80.154.232) 56(84) bytes of data.
64 bytes from ncredir-lb.eqiad.wikimedia.org (208.80.154.232): icmp_seq=1 ttl=55 time=15.4 ms
64 bytes from ncredir-lb.eqiad.wikimedia.org (208.80.154.232): icmp_seq=2 ttl=55 time=15.3 ms
^C
--- wikipedia.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 15.300/15.366/15.433/0.140 ms
```

Great!  We see above the IP adress we reach Wikipedia through and we get little pings sent out at regular intervals to give us some metrics on our latency and connection speed to the host.

Of course, you can also `ping` IP addresses, not just the URL and get the same information:

```shell
$ ping 208.80.154.232
PING 208.80.154.232 (208.80.154.232) 56(84) bytes of data.
64 bytes from 208.80.154.232: icmp_seq=1 ttl=55 time=15.5 ms
64 bytes from 208.80.154.232: icmp_seq=2 ttl=55 time=15.2 ms
64 bytes from 208.80.154.232: icmp_seq=3 ttl=55 time=15.4 ms
^C
--- 208.80.154.232 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 15.271/15.428/15.566/0.187 ms
```

### ssh

The [ssh](https://en.wikipedia.org/wiki/Secure_Shell) command is used to connect to another computer using the OpenSSH client. You will, of course, need credentials to make this connection happen. You may need an SSH key shared with the remote server, and you will probably need a username and password.

```shell
$ ssh my_user_name@208.80.154.232
```

And when you are done doing whatever it is you are doing on the remote server don't forget to exit:

```shell
exit
```

### nslookup

The `nslookup` command is used to query your DNS mapping for a given IP address. For instance:

```shell
$ nslookup wikipedia.com
Server:		192.168.76.13
Address:	192.168.76.13#53

Non-authoritative answer:
Name:	wikipedia.com
Address: 208.80.154.232
```


## ip

> TODO: show / manipulate routing, devices, policy routing and tunnels

* [ip examples](https://www.cyberciti.biz/faq/linux-ip-command-examples-usage-syntax/)


## firewalld

> TODO

* [linuxconfig](https://linuxconfig.org/introduction-to-firewalld-and-firewall-cmd-command-on-linux)


## netstat

> TODO: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships

* [binary tides tutorial](https://www.binarytides.com/linux-netstat-command-examples/)
* [Some YouTube tutorial](https://www.youtube.com/watch?v=O0iQ6-ybZak)


## Bonus Round

> TODO: [fail2ban](https://en.wikipedia.org/wiki/Fail2ban) is a simple tool( written in Python) to help fight / prevent brute-force network attacks. In particular, if an IP address fails to login N times, their IP will be automatically banned for M days. So anyone try thousands of common username/password combinations will get automatically blocked. This is particularly useful for servers that are exposed to the public, as they will almost certainly see a lot of these brute-force attacks.

> TODO: files of interest: knownhosts, hostfile
