---
layout: post
title: "Installing a Pi-Hole"
tags: [Privacy, Raspberry Pi, Software, Linux]
summary: Installing a Pi-Hole on my home network, with Comcast and a Raspberry Pi.
---
{% include JB/setup %}

I am stuck using Comcast as my ISP and haven't found much helpful information on how this changes affects the Pi-Hole installation process. So I thought I would share what I found.


## What's a Pi-Hole?

A Pi-Hole is a piece of software that filters all ads from your home internet traffic. It is a great tool for privacy and even helps filter out malware.

A Pi-Hole works at the modem/router/DHCP level of your home network, by filtering out all traffic from known advertising or malicious IPs (we're looking at you, ads.google).


## Setting up the Raspberry Pi

* **Step 1** Get a Raspberry Pi. (Version 2 or newer preferred for performance.)

I got a Pi version 3B kit, with a power cable, SD card, and a case.

* **Step 2** Install an operating system on your Pi.

To do this, you will need an SD card reader, the ability to format your SD card, and the a disk image utility.

Personally, I am running all of this from a Ubuntu 16.04 machine.

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

I first I thought "unmount" was not installed. But, actually it is "umount". Somebody trying to save themselves one keystroke 30 years ago. I'm going to make an alias (`alias unmount='umount'`).

Now I just need to format it:

    $ mkdosfs -I -F32 /dev/mmcblk1p1

(Why, you may ask, did I choose the `FAT32` file system? Good question. I have no idea.)

Formatting my little 32GB drive took 15 minutes. *Yawn.*

**Step 2.5** Unbreaking the Keyboard

Every time...

    sudo raspi-config

Localization Options > Keyboard Setup

**Step 3** Installig the Raspbian OS

I got the Raspbian OS from the official download site [here](https://www.raspberrypi.org/downloads/raspbian/). I decided to get the "Stretch Lite" version.

Last time I downloaded the Raspian OS it took an hour, today it says 2 minutes. Has there website gotten faster, or is it my internet connection?

Okay, let's read ahead. To install the Raspbian OS, I will follow the offical Linux guide [here](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md).

**Step 4** Change the Password

The Raspbian OS comes with a default username/password. But we are trying to build a security device here, so let's change that default password. Since Raspbian is just a Linux distro, changing the password is as easy as:

    $ passwd

Pick something greater than 12 characters long. If you want a safe (client-side JS) way to test how strong your password is testanti it out [here](http://antineutrino.net/apps/password_analyzer).


**Step 5** Check the Installation

How do you check if a Linux installation is working? Just play around and make sure you can do things:

    $ top
    $ ping bing.com
    $ python
    >>> print("Yeah, because everyone uses Bing.")


## Installing Pi-Hole

First things first, I hooked my Raspberry Pi up to the internet...

> TODO

> TODO: bonus points: turn off WIFI and Bluetooth on the Pi.  It's going to be hooked up to the modem by wire anyway, and it IS a security device, so let's lock it down.  https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=146598

    curl -sSL https://install.pi-hole.net | bash


## Setting up the Modem

> TODO


## Configure the Comcast Router

> TODO


## Up and Running

> TODO


## Retrospective

> TODO

