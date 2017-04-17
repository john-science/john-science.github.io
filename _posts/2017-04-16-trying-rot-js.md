---
layout: post
title: "Making a Roguelike in ROT.js"
tags: [Roguelikes, ROT.js, Text-Based Games, Games, Software, JavaScript]
summary: Experimenting with Web-Based, Client-Side Roguelikes in ROT.js
---
{% include JB/setup %}

[Roguelikes](https://en.wikipedia.org/wiki/Roguelike) are old-school computer games. They're usually text-based and <span title="other than Dwarf Fortress">not that computationally intensive</span>, by today's standards.  Why not build them as client-side JS apps? Enter [ROT.js](http://ondras.github.io/rot.js/hp/).

I initially ran into ROT.js when playing [The Royal Wedding](http://ondras.github.io/trw/); the most beautiful roguelike I have ever played. When I found out the engine behind it was an open-source JS library, I just had to try it. I found [this](http://www.roguebasin.com/index.php?title=Rot.js_tutorial) short ROT.js tutorial on [RogueBasin](http://www.roguebasin.com/index.php?title=Main_Page), and built my own [mini game](http://jsfiddle.net/wqbb8udm/4/) on JSFiddle in about 10 minutes.


### [Ananus aus Caracas](http://antineutrino.net/apps/ananus_aus_caracas.html) - A ROT.js Experiment

I have to say, my first experiment (playable [here](http://antineutrino.net/apps/ananus_aus_caracas.html)) using ROT.js was really enjoyable.  I didn't build a complete roguelike, but expanded upon the RogueBasin tutorial and built a fun little game where you sneak through deparment stores stealing Pineapples (Ananus).

I expanded upon the tutorial game by:

* adding graphical tiles
* increasing the game to 20 levels
* adding difficulty settings
* allowing for multiple bad guys
* making bad guys smarter as the game progresses
* adding non-Canvas game elements
* adding a restart button when you win or lose


### Things that were Easy

I thought creating a basic roguelike for your typical desktop browser was pretty easy. There were actually quite a few things I thought were easy to do using ROT.js:

* Creating a simple game map
* Allowing the player to move around using arrow keys
* Handling the full richness of the game loop
* Dealing with the HTML Canvas
* Customizing multiple, independent game AIs
* Adding graphical tiles


### Things that were Less Easy

Maybe these aren't valid complaints, but I couldn't find what I wanted in the [manual](http://ondras.github.io/rot.js/hp/) and end up giving up a few features:

* **Mobile Support** I couldn't find any support for mobile platforms. I mean, this is a JavaScript game, why shouldn't users be able to swipe right to move right?
* **Menus** Roguelikes always have intricate menus for character creation, inventories, you name it. But I strangely couldn't find support for menus in ROT.js. Maybe these could be better handled outside the ROT.js canvas in HTML, but then I got annoyed trying to turn on/off the ROT.js Canvas to deal with menus.
* **Dynamic Resizing** I would like the HTML canvas to be the size of the entire window (or screen), but I had trouble making that happen.
* **Maps Bigger Than Canvas** Roguelikes often have game maps bigger than can be displayed on the screen. As the player moves around, the displayed part of the map changes to stay centered on the player. [The Royal Wedding](http://ondras.github.io/trw/) does this, but it was not obvious how.


### Conclusions

There are a few things I would like to be able to do easier in ROT.js, but the pros far out-weigh the cons. My little experiment was enough to convince me that my next pet project will be in ROT.js. I think it does the one thing I want: it lets me focus on the game I want to build and not on the tools I am using to build it.

**Play the experimental game [here](http://antineutrino.net/apps/ananus_aus_caracas.html).**

