---
layout: post
title: "Installing RetroPie on a Raspberry Pi 3 from Ubuntu"
tags: [Software, Raspberry Pi, Ubuntu, Linux]
summary: A Linux user's guide to installing RetroPie onto a Raspberry Pi.
---
{% include JB/setup %}

Installing [RetroPie](https://retropie.org.uk/) onto a [Raspberry Pi](https://www.raspberrypi.org/) is not not difficult or time consuming. But since all the guides out there are for Windows and Mac users, I thought the Linux users served a simple setup guide.


## The Process

Specifically, this installation guide will be for Ubuntu 16.10. BUT, the process will be extremely similar for all major Linux distributions.


### Step 0 - Equipment

Before you can start, you will need some basic equipment.  Here is what I used:

* **[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)** - Obviously, you could also get the RPi1 or RPi2. But I just got the newest model available at the time.
  * **1.5 amp power adapater** - sold separately
* **Micro SD card** - I got a 32GB card, but 4 GB would be enough.
* **USB game controller** - I used a wired PS3 remote, but they sell USB replicates for ALL the old console remotes. Pick your favorite!
* **HDMI cable**
* **USB keyboard**
* **(Optiona) Ethernet cable** - The RPi 3 has Wi-Fi, but older models do not.

The RPi 3 has Wi-Fi, which makes the process a little easier. But if you have an older model RPi, all you need is a single Ethernet cable to finish this installation.  And you only need the USB mouse and keyboard for the initial setup. So I just borrowed them for this project, I didn't have to buy them.


### Step 1 - Load Retro Pie

The process here is simple: format your Micro SD card, get the RetroPie disk image, and load the image onto your SD card.

#### Formatting the SD Card

To format your Micro SD card you will need the ability to connect it up to your Linux machine. My laptop had a built-in SD card slot, and my Micro SD card came with a Micro-to-Normal SD card adapater. There are also a ton of SD-to-USB converters out there. 

First, you have to find the path to your Micro SD card, and its device name. After you connect your SD card your laptop, run `mount`:

    $ mount
    /dev/sda3 on / type ext4 (rw)
    /dev/sda2 on /boot type ext4 (rw)
    /dev/sda1 on /boot/efi type vfat (rw,umask=0077,shortname=winnt)
    /dev/sda5 on /aa type ext4 (rw)
    /dev/mmbklp1
   
It should be obvious that the last one on the list is your SD card. If it is *not* obvious to you, then eject the card and run `mount` again. The drive that disappears is your SD card.

Second, `unmount` your card:

    $ unmount /dev/mmbklp1

Alternatively, you can use the "eject" button that appears next to your drive in your GUI file explorer. But I recommend using `unmount`.

Lastly, format the SD card:

    $ mkdosfs -I -F32 /dev/mmbklp1

And that's it! Just to be sure, you can use the [Gnome-Disk-Utility](https://apps.ubuntu.com/cat/applications/precise/gnome-disk-utility/) to open up your drive and make sure it is formatted correctly. I saw a 32GB partition and a 4MB system partition after formatting. That is about standard for a single-partition drive.

#### Get RetroPie

You can grab a copy of the [RetroPie disk image](https://retropie.org.uk/download/), and gunzip it. This is free, so downloading directly from the RetroPie website is the safest option.

The image will be about 2.2GB gunzipped. An Atari ROM is about 100kb and your typical SNES ROM might be a couple MB. So you will probably not need more than 4GB of space on your RetroPie SD card.

#### Load the Disk Image

You can't just copy the RetroPie disk image over to your SD card.  You need to do a special kind of copy.  The easiest way to do this is from the commandline:

    $ sudo dd if=retropie-4.2-rpi2_rpi3.img of=/dev/mmbklp1 status=progress bs=4M

Done! Now don't forget to properly eject your SD card correctly before removing it.


### Step 2 - RetroPie Setup

This is a mostly automated process, just follow the menu options for "setup" and, optionally, "WIFI setup" and you will be golden.

#### Hardware Setup

* Connect the USB keyboard to the RPi.
* Connect the RPi to your TV / monitor using the HDMI cable.
* Connect up any USB game controllers you want to use.
* Put the Micro SD card into the RPi.
* (Optional) Connect your RPi to your router with the ethernet cable.
* LASTLY connect the RPi to power using your 1.5 amp adapter.

#### Software Setup

As soon as you boot up your RPi you should see the Raspberry logo on the screen, then a lot of Linux boot text roll past, then the RetroPie logo.

You will see a "RetroPie-Setup.sh" script.  Run this script.  It will try to grab a bunch of tools and updates from various git repositories online. If you are connect via ethernet, you're done. If not, you will need to go to the [WIFI Setup](https://github.com/RetroPie/RetroPie-Setup/wiki/Wifi) menu option first and get connected.

The automated "RetroPie-Setup.sh" script takes a couple of minutes to run, and you're done.

Lastly, you will have to do a (VERY QUICK) setup for one or both of your game controllers. Essentially, it just asks you to his the "A" button on your controller, and when you do it has a mapping of what "A" looks like. It will do this for all buttons on your controller and 30 seconds later you are read to play.


### Step 3 - Loading ROMs

Now that you have the OS correctly built on your Micro SD card, you will need ROMS to actually play any games.

> This is murky territory because there are totally legal ways to acquire these ROMS, but a lot of people use sketchy, illegal download sites to get their ROMs. I will not tell you what the laws are in your area and I will not tell you what you should or shouldn't do. But be careful when downloading strange binary executables from sketchy, semi-legal websites.

Anyway, wherever you get your ROMs, you will need to load them back onto your SD card to use them. The SD card now has a simple Linux distribution on it, so all you need to do is copy your ROMs to the correct directory:

    /home/pi/ROMS/

This directory will have sub-directories for each gaming system (Atari, NES, SNES, etc). Copy the ROMs into the correct directory, no installation required.


### Step 4 - Play!

We shared our favorite games from childhood the first night.  We stayed up late playing through the opening levels and dying on hard games.  Not remembering until it was far too late that it was a work night. Whoops.  Good fun though.
