---
layout: post
title: "Installing RetroPie on a Raspberry Pi with Ubuntu"
tags: [Software, Raspberry Pi, Ubuntu, Linux, Games]
summary: A Linux user's guide to installing RetroPie onto a Raspberry Pi.
---
{% include JB/setup %}

Installing [RetroPie](https://retropie.org.uk/) onto a [Raspberry Pi](https://www.raspberrypi.org/) is not not difficult or time consuming. But since all the guides out there seem to be for Windows and Mac users, I thought the Linux users deserved a guide.


## The Installation Process

This installation was done using Ubuntu 16.10. But the process will be extremely similar for all major Linux distributions.


### Step 0 - Hardware

Before you can start, you will need some basic hardware.  Here is what I used:

* **[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)**
* **1.5 amp power adapater** - sold separately
* **Micro SD card** - I got a 32GB card, but 4 GB would be enough.
* **USB game controller(s)**
* **HDMI cable** - for TV connection
* **USB keyboard** - only for initial setup
* **(Optiona) Ethernet cable** - The RPi 3 has Wi-Fi, but older models do not.

The RPi 3 has Wi-Fi. But if you have an older model RPi, all you need is a single Ethernet cable to finish the installation.  Also, I used a wired PS3 controller, but they sell USB replicas of ALL the old game consoles. Pick your favorite!


### Step 1 - Load Retro Pie

The process is simple: format your Micro SD card, get the RetroPie disk image, and load the image onto your SD card.

#### Formatting the SD Card

To format your Micro SD card you will need the ability to connect it up to your Linux machine. My laptop had a built-in SD card slot, and my Micro SD card came with a Micro-to-normal SD card adapter. But if you lack these options, there are a ton of inexpensive SD-to-USB converters out there. 

First, you have to find the path to your Micro SD card and its device name. After you connect your SD card your laptop, run `mount`.  For example, here is what I saw:

    $ mount
    /dev/sda3 on / type ext4 (rw)
    /dev/sda2 on /boot type ext4 (rw)
    /dev/sda1 on /boot/efi type vfat
    /dev/sda5 on /aa type ext4 (rw)
    /dev/mmbklp1
   
That the last one on the list is my SD card. If it is *not* obvious to you which is which, then eject the SD card and run `mount` again. The drive that disappears is your SD card. Easy test.

Second, `unmount` your card:

    $ unmount /dev/your-device-name

Alternatively, you can use the "eject" button that appears next to your drive in your GUI file explorer. But I recommend using `unmount`.

Lastly, format the SD card:

    $ mkdosfs -I -F32 /dev/your-device-name

And that's it! To check your work, you can use the [Gnome-Disk-Utility](https://apps.ubuntu.com/cat/applications/precise/gnome-disk-utility/). Open up your SD card to see if it is correctly formatted. For instance, I saw a 32GB FAT32 partition and a 4MB filesystem partition.

#### Get RetroPie

You can grab a copy of the [RetroPie disk image](https://retropie.org.uk/download/), and gunzip it. It is [free](http://www.oreilly.com/openbook/freedom/).

The image will be about 2.2GB gunzipped. An Atari ROM is about 100kb and your typical SNES ROM might be a couple MB. This is why I say you can easily get away with a 4GB SD card for this project.

#### Load the Disk Image

You can't just `cp` the RetroPie disk image over to your SD card.  Because `cp` has to work within a filesystem, and you are trying to overrwite the partition tables, the filesystem, and everything. So you need to use the `dd` command:

    $ sudo dd if=retropie-4.2-rpi2_rpi3.img of=/dev/your-device-name status=progress bs=4M

Done! Now don't forget to properly eject your SD card correctly before removing it.


### Step 2 - RetroPie Setup

This is a mostly automated process, just follow the menu options for "setup" and, optionally, "WIFI setup" and you will be fine.

#### Hardware Setup

* Connect the USB keyboard to the RPi.
* Connect the RPi to your TV / monitor using the HDMI cable.
* Connect your USB game controller(s).
* Put the Micro SD card into the RPi.
* (Optional) Connect your RPi to your router with the ethernet cable.
* LASTLY connect the RPi to power using your 1.5 amp adapter.

#### Software Setup

As soon as you boot up your RPi you should see the Raspberry logo on the screen, then a lot of Linux boot text roll past, then the RetroPie logo, and more rolling text.

You will see a "RetroPie-Setup.sh" script. Run this script. It will try to grab a bunch of things from various git repositories online. If you are not connected via ethernet, you will first need to go to the [WIFI Setup](https://github.com/RetroPie/RetroPie-Setup/wiki/Wifi) menu and get connected.

The automated "RetroPie-Setup.sh" script takes a couple of minutes to run.

Lastly, you will have to do a (very quick) setup for your game controller(s). Essentially, it just asks you to hit the "A" button on your controller, so it knows what "A" looks like. It does that for all the buttons on your controller and 30 seconds later you are ready to play.


### Step 3 - Loading ROMs

Now that you have the OS correctly built on your Micro SD card, you will need ROMs for your games.

> This is murky territory. There are valid, legal ways to get (or create) ROMs. But a lot of people use sketchy, potentially illegal download sites. I cannot tell you what the law is in your area. And I will not tell you what you should or shouldn't do. But please take precautions if downloading strange executables from sketchy websites.

Anyway. Wherever you get your ROMs, you will need to load them onto your SD card. The SD card now has a simple Linux distribution on it, so all you need to do is copy your ROMs to the directory:

    /home/pi/RetroPie/roms/

This directory will have sub-directories for each gaming system (Atari, NES, SNES, etc).


### Step 4 - Play!

Last night we stayed up late sharing games from our childhood. We played through the opening levels of some, and died repeatedly on the harder games. We probably shouldn't have stayed up late on a work night, but it was totally worth it.  Project successful.
