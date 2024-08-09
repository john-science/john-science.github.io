---
layout: post
title: "Herding Data's Kittens"
tags: [Linux, Networking, Software]
summary: Being a software lead on a team of scientists who write code.
---
{% include JB/setup %}

## Who is this for?

This is for all those software engineers on software projects filled with scientists and (non-software engineers).

If you work at a FAANG company, building websites, this talk might not apply to you. But in the real world, every engineering company and scientific research group write software. Even at Big Tech companies, a huge amount of software gets produced around the world by data scientists. As time goes on, there is more and more need for a single software engineer who can lead a team of people who output "code", even if though they are experts in another field. Meteorologists build weather models. Aerospace engineers build computational fluid dynamics models. Data scientists dig through computer security data, medical data, and everything else.

There is a whole world out there writing code, outside the software-first companies. And there is a growing need for individual software engineers to be embedded on these teams, to: reduce costs and technical debt, and to improve: software quality and reliability.

> I guess it is relevant, and I have to talk about myself here. For the last 18 years. I have worked in high-energy particle physics modeling at Fermilan and CERN. I have worked in environmental engineering, modeling climate change, and global weather. I have worked in real-time satellite fire detection and wild fire smoke modeling. I have worked in real time medical modeling for neonatal ICU patients. ANd I currently work in nuclear reactor design and safety analysis modeling. I have worked on multi-physics scientific models with physicists, data scientists, chemical engineers, data engineers, forest fire experts, and nuclear engineers. The common thread is that I have been a software lead on a great variety of projects where none of the other people writing software were software engineers.


## Advocacy and Building a Culture

You find yourself thrown onto a team with smart people, who are doing interesting things. They write software every day. But software is not what thye love. They have no software education. And they produce so much software you can not just "re-write" all of it for them. How can you, as a software engineer, lead your team in the right direction?

First, we should talk about different kinds of leadership. Sure, sometimes being a "leader" means being in charge and telling people what to do. Well, we may not always get that chance. And in my experience, that does not help solving the main problems you will find anyway: educating the staff, and building a culture.

You can greatly influence people just by helping them. A data scientist comes to you with a bug, and you can solve it for them, and show them a "best practice" for their programming language, or a unit testing plan, that would have saved them from ever needing help. If you do this several times, and people keep re-learning the value of unit testing, most people will internalize the lesson and start using what you showed them. This grass roots helping and micro-education is a powerful tool. It is leadership, but not through ordering people around.

You can also lead by example. If your team is not using a linter or unit testing when you arrive, you will. And smart people on your team will see the difference between your code and theirs, and many will just follow along when they see what "professional code" looks like. This works. Not for every scientist or engineer you work with, but it will work seemlessly and easily for many smart people who are just new to software.

Lastly, direct education and advocacy are helpful. Give like talks about "best practices", and educate the team on code optimization or automated testing. If you have managers who have never managed a software team before, give talks and educate them on core concepts like [technical debt](https://antineutrino.net/2023/01/31/tech-debt) and software maintainance. If you are working with a team of smart people, they _will_ learn. They _can_ be taught. Alternately, if you complain that the management team does not understand something important like software rot or the bus factor, the problem might be yours for not educating them.

I have started on several teams that were all nuclear engineers or climate modelers, who were not particularly interested in software but used it every day like they would math or any other tool. The more you advocate for good software practices, the more you help the team, the more peopel will start to see the value in these things. You can build a group of acolytes to help spread your message. New scientists and non-software engineers who are hired onto the team will see the improved software culture as the status quo and will accept it as the norm.

If done well, the progress will be faster than you expect. Even though you will never be "done".


## Your Team

Maybe you are a software engineer but the people you work with aren't, they produce software as an output and that is because of the modern world. Like, they might produce mathematics when they balance their checkbook. I might use it as a tool, but they may not understand it.

And they different members of the smart people on your team might have different levels of understanding. And that's great. We love smart people. We love enthusiasm and energy and ambition. We love when they are doing something interesting. But the first thing to know is that not everyone is going to love software or think it's important.

So you're going to have to advocate. You're going to have to try to create A real environment where people learn important things about software. Another really important a beep, boop. An important idea to keep in mind. Is that everyone starts off at a different place. If you have a team of 10 or 100, or a thousand, smart people all writing software.

Some of them might be nearly professional software Engineers, some of them may barely know how to write a while loop. Educational topics. Technical debt. Code quality. Bugs. Quality assurance. Testing. Documentation. Building a Grassroots team colon acolytes for your own personal religion. 


## Topics

* **Your programming language**
  * If you can use a hammer, you can build a house. This _might_ have been true in the 1700s, but even then you are relying on other people to provide you boards cut to the right length, and you have to pay someone else to paint it. A lot of people will think that they can build a complicated scientific model or data pipeline because they can write a for-loop. It will be your job to convince them there is more to "engineering" software than just "writing code", but it is also your job not to dampen their enthusiasm.
* **Best practices**
  * **linting and style**
* **Git**
  * Again, expect everyone to come in with different levels of knowledge, from none on up. Also, try to fight the idea that Git is somehow hard to understand (thanks, XKCD), just give them a single, well-defined workflow and you can make it simpler.
* **Testing**
  * Some scientists (and their managers) will see this as a waste of time, prove them wrong. (TODO: Write some arguements, show some data, possibly another post.)
* **Documentation**
  * Most scientists (and their managers) won't know what this means. And they won't see the real value.
* **software ideas**: API, library, vs applications vs scripts
* **management ideas**: technical debt

