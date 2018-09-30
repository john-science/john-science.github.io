---
layout: post
title: "Installing a Pi-Hole"
tags: [Privacy, Raspberry Pi, Software, Linux]
summary: Installing a Pi-Hole on my home network, with Comcast and a Raspberry Pi.
---
{% include JB/setup %}

I am stuck using Comcast as my ISP and haven't found much helpful information on how this affects the Pi-Hole installation process. I assume I don't have any real control over this Comcast modem/router/switch combination box. So I thought I would share what I found.


## What's a Pi-Hole?

A Pi-Hole is a piece of software that filters all ads from your home internet traffic. It is a great tool for privacy and even helps filter out malware.

A Pi-Hole works at the modem/router level of your home network, by filtering out all traffic from known advertising or malicious IPs.


## Setting up the Raspberry Pi

* **Step 1** Get a Raspberry Pi.

You will want at least a Raspberry Pi version 2 for performance reasons. I got a Pi version 3B kit, with a power cable, SD card, and a case.

* **Step 2** Install an operating system on your Pi.

To do this, you will need an SD card reader, the ability to format your SD card, and the a disk image utility.

Personally, I am running all of this from a Ubuntu 16.04 machine. First, I need to format my 32GB micro SD card. To start, I need it's name:

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

I first I thought "unmount" wasn't installed. But, actually it is "umount". I will seriously *never* remember that. Somebody saved themselves one keystroke 30 years ago and has been wasting my time every since. I'm going to make an alias (`alias unmount='umount'`).

Now I just need to format it:

    $ mkdosfs -I -F32 /dev/mmcblk1p1

(Why did I choose the `FAT32` file system? Good question. I have no idea.)

Formatting my little 32GB drive took 15 minutes. *Yawn.*


**Step 3** Installig the Raspbian OS

I got the Raspbian OS from the official download site [here](https://www.raspberrypi.org/downloads/raspbian/). I decided to get the "Stretch Lite" version.

Last time I downloaded the Raspian OS it took an hour, today it took 2 minutes. Has their website gotten faster, or is it my internet connection?

For the install, I just followed their [offical Linux guide](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md).


**Step 3.5** Raspberry Pi Keyboard Localization

Every single time... The Raspberry Pi always comes with some crazy localization for the keyboard and I have to go in and fix it.

    sudo raspi-config

`Localization Options` then `Keyboard Setup`


**Step 4** Change the Password

The Raspbian OS comes with a default username/password. But we are trying to build a security device here, so let's change that default password. Since Raspbian is just a Linux distro, changing the password is as easy as:

    $ passwd

Pick something longer than 10 characters. If you want a safe (client-side JS) way to test how strong your password is test it out [here](http://antineutrino.net/apps/password_analyzer).


**Step 5** Check the Installation

How do you check if a Linux installation is working? Just play around and make sure you can do things:

    $ top
    $ ping bing.com
    $ python
    >>> print("Yeah, because everyone uses Bing.")


## Installing Pi-Hole

First things first, I hooked my Raspberry Pi up to the internet. I connected it via Ethernet cable to my router. Presto, I have internet.

To install the Pi-Hole itself, I went to [pi-hole.net](pi-hole.net) and read through their source code a bit. When I felt like I know what was going on, it was as easy as doing this one line, and following the menus:

    curl -sSL https://install.pi-hole.net | bash

And we're rolling. Easy.

**Bonus Points - Disconnecting WIFI and Bluetooth**

We really don't need the WIFI and the Bluetooth on and running on our Raspberry Pi any more. They're not going to be used and, worse, they are an unnecessary security weakness in our system. So let's turn them off. Their are [two strategies](https://raspberrypi.stackexchange.com/questions/53149/disable-power-on-wifi-and-bluetooth-interfaces-during-boot) to do this.

*First Method: Remove the Hardward definitions*

We define out hardware in `/boot/config.txt` in Raspbian, so we can disable these devices like so:

    dtoverlay=pi3-disable-bt
    dtoverlay=pi3-disable-wifi

*Second Method: Blacklist the Device Drivers*

We define our device drivers in Raspbian here: `/etc/modprobe.d/raspi-blacklist.conf`. So all we have to do to disable the drivers is blacklist them like so:

    #wifi
    blacklist brcmfmac
    blacklist brcmutil
    #bt
    blacklist btbcm
    blacklist hci_uart


> TODO!!!


## Setting up the Modem

> TODO


## Configure the Comcast Router

Next, you need to log into your Comcast router. For some reason, this is not going to be the same for everyone. After some playing around, I found my router's IP was `10.0.0.1`. And then, to my horror, I found the username/password to my Comcast router was `admin`/`password`. So, I changed that. You may also find your default password is `admin` or `highspeed`. These are straight-up terryible but Comcast justifies it by say that have to beinside the network to log into the router anyway.

> TODO


## Up and Running

> TODO


## Retrospective

> TODO

