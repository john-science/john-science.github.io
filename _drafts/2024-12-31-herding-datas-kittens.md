---
layout: post
title: "Herding Data's Kittens"
tags: [Linux, Networking, Software]
summary: Being a software lead on a team of scientists who write code.
---
{% include JB/setup %}

> TODO: Add images and/or annotations to every subsection below!

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
  * [Software Management Concepts](#software-mgt-concepts)
* [Burn Out](#burn-out)
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

How can you, as a software person, lead your team in the right direction?

First, we should talk about different kinds of leadership. Sure, sometimes being a "leader" means being in charge and telling people what to do. Well, if you are software engineer, you might not also be a manager, we do not always get the chance to lead by fiat. And the argument I make here is that that type of "leadership" won't be terribly effective for you. If you have a large, varied team of people who are new to a broad, complicated technical field like software, trying to rule by decree probably won't help. What your team will need is education, training, and experience. And none of those can be obtained via the hammer of authority.

Sure, there is a place for rules and policies, and we'll get there. But we won't start there, and neither should you.


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

If done well, the progress will be faster than you expect. Even though you will never be "done".

I know, I know. You have that one person on your team who is just too stubborn and it's like a brick wall.

<div class="admonition">
  <p class="admonition-title">Stay Calm</p>
  <p>Smart people can learn.</p>
</div>

Even if you work at a Big Tech software group, or even BiggestTech with the best software engineers in the world, there will always be differences of opinion and people who just can't learn.


#### This Works!

You might be sitting there thinking:

> Boy, this sounds like a lot of work. I just want to write code.

Yeah, this will be a lot of work. At first, this will be like 25-50% of your job, but it will taper off to a low-level hum of like 10% after a while. The truth is, you can not teach a large team of people a complicated technical field with the click of a button. It will take time and effort. Sorry.

<div class="admonition">
  <p class="admonition-title">Life Advice</p>
  <p>Anyone who says all your problems are easy to fix is selling something.</p>
</div>

I promise you, I have done this in multiple different scenarios (government, start-up, enterprise) and it works. It will be slow to start, but smart people will grab on to good ideas and run with them. And it's not like you won't have levers. If you teach a smart person software, you are making them more hirable and filling out there resume. A lot of people will realize that, and learn everything they can.

For some people, there will be eye-opening events. Moments where they see hours of debugging and annoyance waved away the first time they see:

* a unit test catch a bug that would have been invisible in production for months
* automated CI run unit tests across an ecosystem
* docstrings or documentation turn tribal knowledge into plain text
* best practices make an illegible corner of the codebase into just another library

Will every person have one of the above "Ah ha!" moments? No. But smart people will notice. People who are even vaguely interested in software to begin with will love to see what "professional" code looks like. And the poor grunts on your team who have historically spent the most time finding and fixing the hardest problems will see the benefit the soonest.

If you focus on only what matters, and only try to share information with people that makes a tangible difference in their lives, people _will_ learn. When someone asks "but why do we really need a code auto-formatter?" you will be able to SHOW them the difference between messy code and clean code and why it will make everyone's life easier. When people ask "Do I really need good code coverage?" you can remind them that they just spent 2 weeks finding a bug that would have been caught immediately if there had been a 5-line unit test.

If you stay focused on software tools and ideas that will help your team, your team will notice the improvement.

But. All this means that your team has to trust you to provide good ideas to improve their lives. And so you have to trust that they are capable of learning.


<div class="admonition">
  <p class="admonition-title">What if I don't work with smart people?</p>
  <p>Then you are the problem..</p>
</div>


## <a name="building-edu-resources">Building Educatiional Resources

> This won't be hard: the internet is full of introductory software educational resources.

The trick to spinning up a team on a new tech stack is the same, even if your team is not software savvy to begin with.

1. Pull together a set of resources and make them the official "do it this way" system for your team.
    * Teaching a large group of people (or even a single person) everything about software would be very hard. But teaching a small group of people one workflow is much more manageable.
2. Your job is not to teach computer science, but just the user-level how-to.
    * You will teach people how to use a Python `list`, but you won't try to tell them it is an auto-resizing, variable length, C-array of pointers to objects. Just show them how to _use_ the `list`. 
3. TODO: TBD

Imagine you join a team that isn't using version control. You decide to convince them to use Git. Now, teaching a large group of people with varrying software backgrounds _everything_ about Git would be pretty daunting. But just deciding on a single workflow and teaching them that is actually quite easy. 

The Git Exampls:

* You show them a `main` branch versus a `feature` branch,
* then you show them a GitHub Pull Request,
* then the only tricky thing they have to learn is how to handle merge conflicts and you're done.

Sure, they won't know about GitLab, just GitHub. But you can convince your team to use _one_ and not _both_, and you're done. Sure, they won't know about interactive rebases, but if you let standardize on all GitHub PRs doing "Squash and Merge", they usually won't need to. And so on. You can leave out a lot of detail (like Git's decentralized nature) and it won't affect anyone's ability to do their job.

No, you will not attempt to teach your team the beautiful graph theory of Git. You will not even spend the time to explain the wonderful de-centralized nature of Git repositories. Because these things are not "how to use git", which is your only goal. If one scientist shows interest in these things, great! Wonderful. Take them out for a `∈ (coffee, beer, boba, whiskey, tea, cake)` and make a new friend.

> Admonition: Choose your Fights


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


## <a name="burn-out">Burn Out

* TODO: Learn to recognize Burn Out
* TODO: Learn to recognize Burn Out Early

More specifically, in this case, you will have to learn to pick your fights, and move on. But just because one day (or year) you have to give up on one thing (pre-commit hooks, unit tests, linters, whatever), doesn't mean you can't come back to it later.

Your goal isn't to push a boulder up hill forever.  You can take breaks with each little boulder, and come back to it later. (And try to cement them in place at the top of the hill, so you don't have to come back to them as often.)


## <a name="conclusion">Keep Learning

The most important thing is to keep learning. Software is a broad topic, and it is constantly evolving. The moment you stop thinking of yourself as a student, your skills will begin to rot. And if you don't consider yourself a student, you will be a bad teacher.

<a href="/assets/images/software/hiking_with_books.png">
<img src="/assets/images/software/hiking_with_books.png" alt="Keep Learning">
</a>
