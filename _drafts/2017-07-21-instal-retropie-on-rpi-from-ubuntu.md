---
layout: post
title: "Installing RetroPie on a Raspberry Pi 3 from Ubuntu"
tags: [Software, Raspberry Pi, Ubuntu, Linux]
summary: A Linux user's guide to installing RetroPie onto a Raspberry Pi.
---
{% include JB/setup %}

I recently got a Raspberry Pi 3 and wanted to install the RetroPie emulation system onto it. But all of the tutorials I found were high-level users of Windows and the Mac OS. It involved downloading tons of sketchy software online to do basic things, like formatting an SD card. But I wanted to do as much as possible from the commandline, and I knew it couldn't be that complicated. So here is a RetroPie installation guide for your typical Linux user.

## The Process

Just FYI, the laptop I used for this installation process runs Ubuntu 16.10.

### Step 0 - Get Your Gear

For this process, I needed:

* RPi3 (and power adapter) (1.5 amps?)
* Micro SD card (I got 32GB, but 4 GB would be enough)
* USB keyboard and mouse
* USB game controller (I used a wired PS3 remote)
* Ethernet cable (optional on RPi 3, but needed on 0, 1, and 2.

### Step 1 - Grab Retro Pie

* [How to Format an SD card](https://www.techwalla.com/articles/format-sd-card-linux) - the RPi3 takes a Micro SD card, but the same process.
* In the end, I had to unmount the SD card using the GUI.
* Then I used the Gnome Disk Utility ("Disk") to check the SD card was set up correctly. It was.
* Grab RetroPie for the RPi3 at: https://retropie.org.uk/download/  It was 640MB gzipped, and 2.2GB gunzipped. So there is why you need such a big SD card. A typical Atari ROM is about 100kb, and your typical SNES rom is a couple MB.
* You can't just copy the RetroPie image over (...why? boot sector?), so you need to use the `dd` command. Easy.  https://askubuntu.com/questions/179437/how-can-i-burn-a-raspberry-pi-image-to-sd-card-from-ubuntu
* Don't forget to eject your SD card correctly before moving on.

### Step 2 - RetroPie Setup

* This was dead easy.  I navigated to the set up script.
* Whoops, actually, I had to activate the WIFI (sp?) first. Or you could use an ethernet cable.   https://github.com/RetroPie/RetroPie-Setup/wiki/Wifi
* Controller Setup - dead easy

### Step 3 - Loading ROMs

* back to the laptop
* legal disclaimer

### Step 4 - Play Games!

We accidentally stayed up late into the evening on a work night, reliving our favorite childhood games.  And playing new ones.  Whoops.  Great fun though.



