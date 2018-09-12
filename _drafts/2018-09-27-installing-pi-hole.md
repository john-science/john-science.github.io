---
layout: post
title: "Installing a Pi-Hole"
tags: [Privacy, Raspberry Pi, Software]
summary: Installing a Pi-Hole on my home network, with Comcast and a Raspberry Pi.
---
{% include JB/setup %}

A Pi-Hole is a tool to filter out all internet traffic from your network that is ad-related. It does this by filtering out IP addresses known to be related to ads, information tracking, or malware.

This page will be an example walk-through of my installation experience, along with some retrospective on life behind a Pi-Hole.

I am a typical American end-user, stuck using Comcast Xfinity for my ISP. I have 3-5 internet-enabled devices connected to my home network at any one time. And I will be doing this installation from a Linux computer (though that won't matter much).


## Setting up the Raspberry Pi

* **Step 1** Get a Raspberry Pi. (Version 2 or newer preferred for performance.

You will also need a small set of peripherals for your Raspbery Pi: a power cable, an SD card, and optionally a case.

* **Step 2** Install an operating system on your Pi.

To do this, you will need an SD card reader, the ability to format your SD card, and the a disk image utility.

First, I need to format my 32GB micro SD card. To start, I need it's name:

    $  mount
    /dev/sda1
    ...
    /dev/mmcblk1p1
    /dev/mmcblk1p2
    /dev/mmcblk1p3

Oh, oops, at some point I already formatted this disk into three partitions. What crazy thing was I doing that day? ([I remember](https://github.com/theJollySin/i-wish-i-were-at-defcon-25-hack-a-thon), but it doesn't matter.)

Before I can format it, I need to unmount it:

    $ umount /dev/mmcblk1p1
    $ umount /dev/mmcblk1p2
    $ umount /dev/mmcblk1p3

I first I thought unmount was not installed. But, actually it is umount. Somebody trying to save themselves one keystroke 30 years ago. How convenient.

Now I just need to format it:

    $ mkdosfs -I -F32 /dev/mmcblk1p1

(Why, you may ask, did I choose the `FAT32` file system? Good question. I have no idea.)

Formatting my little 32GB drive took 15 minutes. Yawn.


**Step 3** Installig the Raspbian OS

I got the Raspbian OS from the official download site [here](https://www.raspberrypi.org/downloads/raspbian/). I decided to get the "Stretch Lite" version.

Last time I downloaded the Raspian OS it took an hour, today it says 2 minutes. Has there website gotten faster, or is it my internet connection?

Okay, let's read ahead. To install the Raspbian OS, I will follow the offical Linux guide [here](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md).

**Step 4** Check the Installation

> TODO


## Installing Pi-Hole

> TODO


## Setting up the Modem

> TODO


## Configure the Comcast Router

> TODO


## Up and Running

> TODO


## Retrospective

> TODO

