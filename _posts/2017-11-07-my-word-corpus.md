---
layout: post
title: "What words do I use most often?"
tags: [Language, Data Analysis, Software]
summary: Analyzing my English word corpus to help me learn a new language.
---

{% include JB/setup %}

I am learning a new language and wanted a list of the words I, personally, use the most. Baring differences between languages, I figured this would be a good place to start learning vocabulary. As a data source, I scraped all the chat messages and personal emails I have written in the past year (about 20,000 lines of text).

## Method Overview

The lists below are the result of analyzing my own informal writing, after doing some basic data clean-up:

* Remove numbers and web addresses
* Make everything lowercase
* Remove (most) punctuation and syntax
* Replace contractions with multiple words - "can't" became "can" and "not"
* Remove pronouns, conjunctions, prepositions, and articles
* Remove proper nouns
* Try to reduce all verb forms to a single case - "falling" and "fell" became "fall"
* Remove words that only appear once

Having a complete dataset for your own language usage is really fascinating. There is a lot to learn about yourself and your language. I highly recommend trying it.


## Initial Results - Top 100

Here I take it for granted that certain things are obviously necessary to learn in any language:

* pronouns
* articles
* conjuctions
* prepositions
* numbers
* the alphabet
* proper nouns

Apparently, the 100 most common words I use are:

    have not to-be will just get would can yes doing know all about good there think really what time work more thing day lot mean people sure very see want could how going okay now year maybe say make job also right should guess cool way much need hard only first probably little week might love take weekend try any which too sound fun awesome use new sorry long off big last back then something who next today month look nice around great never find these actually better kind before anyway bit couple idea those most game data interview other


## Final Results - Top 400

I did not find the above "top 100" list very helpful. I found it more useful to split the vocabulary by part-of-speech. Below are the 400 most common words in my vocabulary, organized by their programmatically detected part-of-speech.

#### Nouns

    time thing day people year job way week weekend sound fun back today month couple bit idea game data interview problem man hour night photo home dog phone house world question school place plan position life science language money news person software field part end movie guy project book water minute list lunch reason computer bus family food information head stuff doctor weight course code morning city email figure hand luck friend episode system option card file country laptop area hate class town honey beer hello top past badger route company resume library account process number rust office case god outdoors scientist car video goal finger model gym residency valley level wedding mind sense keyboard kid text desk camera website vacation spot deal tool dream air body key mountain crap rock camp version apartment graduate park chance name student script word feet building

#### Verbs

    have to-be will get can doing know think work mean see want going say make should guess need might take love try use look find hear thank keep start talk hope feel move heard tell help wait come point watch happen seem trip put read learn shit bet remember run give call climb live ask drive bring build turn let care change buy sleep show open stay worry camping set backpacking wonder understand suppose miss leave spend write pick hike bought play save lose stop fit test meet forget imagine sent lead spent research expect pack crossed

#### Adverbs

    not yes about there really very how okay now maybe also probably too off then around never actually anyway before always here why tonight again down soon tomorrow ever away already totally definitely far later usually yesterday obviously together once ago quite hopefully instead close else apparently somewhere basically mostly early

#### Adjectives

    just all good more a lot sure right cool much hard only first little which any awesome new sorry long big last next nice great better kind most other enough least real old easy bad whole many super own able every easier different happy fine best important either both interesting less free glad busy “true” another lost amazing second interested stupid online crazy current high ready fast favorite each serious short late full black under small modern medical expensive fair entire wrong