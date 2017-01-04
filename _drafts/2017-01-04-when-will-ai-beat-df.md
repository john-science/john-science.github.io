---
layout: post
title: "When Will AI Beat Dwarf Fortress?"
tags: [Software, Dwarf Fortress, Machine Learning, TensorFlow]
summary: You think Go is the hardest game in the world? Try surviving Dwarf Fortress at a random starting location.
---
{% include JB/setup %}

In May 1997, IBM's Deep Blue became the first computer system to beat a reigning world champion in a chess tournament. In March 2016, Google's AlphaGo surprised the world by beating world-ranked Go player Lee Sedol in a tournament.

The success of AlphaGo is notable because Go is significantly more complex than chess, and people thought it might be another decade before the game was solved. The number of legal game positions in chess is around 10<sup>43</sup>, but the number of legal game positions on a 19x19 Go board is more like 10<sup>170</sup>; that is 130 orders of magnitude difference. (Note: This is not a direct measure of the complexity needed to solve each game, but that is more subjective so I will leave it as an exercise for the reader.)

Today, the AlphaGo team announced they had been dominating the online Go world anonymously under the pseudonyms Master (P) and Magister (P). This latest success and their far more public victory in March 2016 has generated a lot of interest in deep learning, which AlphaGo uses in a couple different ways.

These days, machine learning hobbists are able to use canned deep learning libraries, like TensorFlow, to play and beat all kinds of games. For instance, Kevin Hughes seems to have solved MarioKart 64 over Christmas (link below).

It is a brave new world (apparently). After all, we are told that Go is the most complex game in the world, and software is now better at it than humans.

At this point, anyone who plays Dwarf Fortess is having a good chuckle. Comparing Go to Dwarf Fortess is like comparing chess to fusion reactor design. After all, humans win Go games all the time, but playing Dwarf Fortress is more of an experimental exercise in probing what is possible. The community motto is "Losing is Fun".

> Show me something new. Use Deep Learning to solve a game that humans can't: beat Dwarf Fortess.


#### Quick Aside: "Beating" Dwarf Fortess

There is no "You Win" screen in Dwarf Fortress. Players typically create their own metrics for success: build a Turing Machine in-game, domesticate a megabeast, or colonize the circus. But if the goal is just to one-up humans, an obvious choice would be to build a fortress that lasts for longer than human players can manage. Experienced players regularly report successful fortresses surviving 100 in-game years. If machine learning could be employed to keep a fortress going for 1000 years, it would clearly be superior.


#### References

1. [Chess Mathematics](https://en.wikipedia.org/wiki/Shannon_number)
2. [Go Mathematics](https://en.wikipedia.org/wiki/Go_and_mathematics)
3. [AlphaGo - Press Tweet](https://twitter.com/demishassabis/status/816660463282954240)
4. [AlphaGo - Secret Games](http://www.nature.com/news/google-reveals-secret-test-of-ai-bot-to-beat-top-go-players-1.21253)
5. [TensorKart - on Kevin Hughes blog](http://kevinhughes.ca/blog/tensor-kart)
