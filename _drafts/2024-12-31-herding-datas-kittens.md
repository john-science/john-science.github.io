---
layout: post
title: "Herding Data's Kittens"
tags: [Linux, Networking, Software]
summary: Being a software lead on a team of scientists who write code.
---
{% include JB/setup %}

## <a name="outline"></a>Outline

* [Outline](#outline)
* [Who is this talk for?](#target-audience)
* [Advocacy and Building a Culture](#advocacy)
  * [Help people directly](#direct-help)
  * [Lead by Example](#lead-by-example)
  * [Active Education](#active-edu)
  * [Gather Acolytes](#gather-acolytes)
  * [Traditional Leadership](#leadership-is-boring)
  * [This works!](#trust-the-system)
* [Building Educational Resources](#building-edu-resources)
* [The Topics](#edu-topics)
  * [Your Programming Language](#lang)
  * [Best Practices](#best-practices)
  * [Git](#git)
  * [Testing](#testing)
  * [Documentation](#doc)
  * [Software Concepts](#software-concepts)
  * [ideas for managers](#software-mgt-concepts)
* [Conclusion](#conclusion)


## <a name="target-audience"></a>Who is this for?

This is for all those software engineers on software projects filled with scientists and (non-software) engineers.

You find yourself thrown onto a team with smart people, who are doing interesting things. They write software every day. But software is not what thye love. They have no software education. And they produce so much software you can not just "re-write" all of it for them.

Your team is filled with data scientists, regular scientists, or non-software enginers, but you are one of the only true software engineers on the team.

You are out there, in every company in the world that builds airplanes and power plants, in every weather prediction agency, in every data science unit in a Big Tech company. You might be the lone software engineer on your team, or one of a very few. You are out there, and you are seen. It is going to be a wild ride.

As time goes on, there is more and more need for a single software engineer who can lead a team of people who output "code", even if though they are experts in another field. Meteorologists build weather models. Aerospace engineers build computational fluid dynamics models. Data scientists dig through computer security data, medical data, and everything else.

There is a whole world out there writing code, outside the software-first companies. And there is a growing need for individual software engineers to be embedded on these teams, to: reduce costs and technical debt, and to improve: software quality and reliability.

> I guess it is relevant, and I have to talk about myself here. For the last 18 years. I have worked in high-energy particle physics modeling at Fermilan and CERN. I have worked in environmental engineering, modeling climate change, and global weather. I have worked in real-time satellite fire detection and wild fire smoke modeling. I have worked in real time medical modeling for neonatal ICU patients. ANd I currently work in nuclear reactor design and safety analysis modeling. I have worked on multi-physics scientific models with physicists, data scientists, chemical engineers, data engineers, forest fire experts, and nuclear engineers. The common thread is that I have been a software lead on a great variety of projects where none of the other people writing software were software engineers.


## <a name="advocacy"></a>Advocacy and Building a Culture

How can you, as a software engineer, lead your team in the right direction?

First, we should talk about different kinds of leadership. Sure, sometimes being a "leader" means being in charge and telling people what to do. Well, if you are software engineer, you might not also be a manager, we do not always get the chance to lead by fiat. And the argument I make here is that that type of "leadership" won't be terribly effective for you. If you have a large, varied team of people who are new to a broad, complicated technical field like software, trying to rule by decree probably won't help. What your team will need is education, training, and experience. And none of those can be obtained via the hammer of authority.

Sure, there is a place for rules and policies, and we'll get there. But we won't start there, that comes later.


<div class="admonition">
  <p class="admonition-title">Stay Calm</p>
  <p>Smart people can learn.</p>
</div>


### <a name="direct-help"></a>Help people directly

TODO: (have office hours, even)

You can greatly influence people just by helping them. A data scientist comes to you with a bug, and you can solve it for them, and show them a "best practice" for their programming language, or a unit testing plan, and show them how that would have prevented their issue. If you do this several times, and people keep re-learning the same lesson, most people will internalize it and start using what you showed them. This grass roots helping and micro-education is a powerful tool. Sure, it is "leadership", but not through ordering people around.


### <a name="lead-by-example"></a>Lead by Example


You can also lead by example. If your team is not using a linter or unit testing when you arrive, you will. And smart people on your team will see the difference between your code and theirs, and many will just follow along when they see what "professional code" looks like. This works. No, it won't work for 100% of people, but it will work easily for _some_ people, and that's enough of a foothold to start building a culture.


### <a name="active-edu"></a>Active Education

Lastly, direct education and advocacy are helpful. Give like talks about "best practices", and educate the team on code optimization or automated testing. If you have managers who have never managed a software team before, give talks and educate them on core concepts like [technical debt](https://antineutrino.net/2023/01/31/tech-debt) and software maintainance. If you are working with a team of smart people, they _will_ learn. They _can_ be taught. Alternately, if you complain that the management team does not understand something important like software rot or the bus factor, the problem might be yours for not educating them.

### <a name="gather-acolytes"></a>Gather Acolytes

Lastly, direct education and advocacy are helpful. Give like talks about "best practices", and educate the team on code optimization or automated testing. If you have managers who have never managed a software team before, give talks and educate them on core concepts like [technical debt](https://antineutrino.net/2023/01/31/tech-debt) and software maintainance. If you are working with a team of smart people, they _will_ learn. They _can_ be taught. Alternately, if you complain that the management team does not understand something important like software rot or the bus factor, the problem might be yours for not educating them.

This might sound rather mercenary, even Machiavelien, but the truth is you can't do anything alone. And if you want to change a culture of people, you need other people. Alone, you can talk to one person at a time, together, your team can educate each other at an exponential rate. <phrasing>

This does mean that you have to trust people. You don't have to trust them to be perfect in educating each other, and sharing precisely the write ideas. But you have to trust them to move the needle forward.

> Perfect is the enemy of better.


### <a name="leadership-is-boring">Traditional "Leadership"</a>

Lastly, company policies, procedures, and boring "leadership"

Maybe some things will be easier if you are "in charge"...

Processes and procedures... 

### <a name="trust-the-system">This works!

TODO

But:

If done well, the progress will be faster than you expect. Even though you will never be "done".


## <a name="building-edu-resources">Building Educatiional Resources

> This won't be hard: the internet is full of introductory software educational resources.

The trick here is to pull together a set of resources and make them the official "do it this way" system for your team.

You may have to give internal talks to your team, put together internal wike pages, etc etc. You will have to share them actively, not just passively.

TODO


## <a name="edu-topics">Eductaional Topics

TODO: Intro. The high level is here, but detailed discussions of all these topics can be found below.

Anecdotes to throw in:

  * Anecdote: EPA DB example "calc_emissions_data_2023_v17.py"
  * Contrary Anecdote: On a 20-year-old software project, I failed to get a team to use Git.
  * Anecdote: every time someone opened a branch, they would open a PR
  * Anecdote: We don't put our analysis scripts in git, because they aren't testable (git repo design)
  * Anecdote: Git repos with 24 git submodules. submodules instead of versioned releases for a large team of scientists, who don't know git well. (Advanced workflow)

### <a name="lang">Your Programming Language

<div class="admonition">
  <p class="admonition-title">Age Old Wisdom</p>
  <p>The best programming language for your project is the one your team already knows.</p>
</div>

  * If you can use a hammer, you can build a house. This _might_ have been true in the 1700s, but even then you are relying on other people to provide you boards cut to the right length, and you have to pay someone else to paint it. A lot of people will think that they can build a complicated scientific model or data pipeline because they can write a for-loop. It will be your job to convince them there is more to "engineering" software than just "writing code", but it is also your job not to dampen their enthusiasm.
  * If Python, show them venvs immediately: https://antineutrino.net/2023/04/11/python-venvs
  * https://github.com/john-science/python_for_scientists

### <a name="best-practices">Best practices

  * **linting and style**

### <a name="git">Git

> Sure, you can use SVN or something other than Git. But let's be real.

  * Again, expect everyone to come in with different levels of knowledge, from none on up. Also, try to fight the idea that Git is somehow hard to understand (thanks, XKCD), just give them a single, well-defined workflow and you can make it simpler.
  * https://antineutrino.net/2016/12/14/git-intro
  * https://antineutrino.net/2022/03/30/introduction-to-git
  * https://antineutrino.net/2019/08/11/git-stash-workflows
  * https://antineutrino.net/2023/04/23/intermediate-git

### <a name="testing">Testing
  * Anecdote: basically every time I have added code coverage to an uncovered section of a code base, I have found bugs. Just... every time.
  * Some scientists (and their managers) will see this as a waste of time, prove them wrong. (TODO: Write some arguements, show some data, possibly another post.)
  * https://antineutrino.net/2022/11/08/good-unit-tests

### <a name="doc">Documentation
  * Most scientists (and their managers) won't know what this means. And they won't see the real value.

### <a name="software-concepts">Software Concepts

  * API
  * library, vs applications vs scripts

### <a name="software-mgt-concepts">Software Management Concepts

  * technical debt (the start-up problem)
  * versioned releases
  * software release life cycle: https://en.wikipedia.org/wiki/Software_release_life_cycle
  * CI / CD or software development life cycle

## <a name="conclusion">Keep Learning

The most important thing is to keep learning. Software is a broad topic, and it is constantly evolving. The moment you stop thinking of yourself as a student, your skills will begin to rot. And if you don't consider yourself a student, you will be a bad teacher.

<a href="/assets/images/software/hiking_with_books.png">
<img src="/assets/images/software/hiking_with_books.png" alt="Keep Learning">
</a>
