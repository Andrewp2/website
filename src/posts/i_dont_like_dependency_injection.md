---
title: I don't like dependency injection [WIP]
subtitle: The argument against DI
tags: [programming, software_engineering]
---

Object-oriented programming seems to have gotten a lot of hate over the past few
years. I felt it personally just by noticing what people were talking about on
places like Reddit, Hacker News, Twitter, and elsewhere on the internet, but
some of the stats regarding object-oriented languages have been downright
dramatic.

The largest fall from grace has definitely been Java. In
<a href="https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages">
the 2020 StackOverflow developer survey</a> Java was sitting at the 5th place in
popularity, where 40.2% of respondents said that they were using Java in their
programming. By the
<a href="https://survey.stackoverflow.co/2022/#section-most-popular-technologies-programming-scripting-and-markup-languages">year
2022</a> Java had fallen to 6th place, with only 33.27% of programmers using
Java. That's a pretty incredible drop for it to happen over only 2
years.<a href="#[1]"><sup>[1]</sup></a> C# has also fallen ~3% from 31.4% to
27.98%. Languages that have filled the gap are either not object-oriented
whatsoever, like Rust, or allow for object-orientation but don't enforce it,
like Python; Typescript; and Go.

Despite all this, it still seems strange to attack dependency injection of all
things. I mean, isn't it the D in
<a href="https://en.wikipedia.org/wiki/SOLID">SOLID</a>? If you have to accept
that you live in an object-oriented world (say you work in a team that only uses
Java), isn't dependency injection an unqualified good? Or, at the very least, as
a project gets bigger and bigger it becomes more and more necessary to use
dependency injection?

I don't think so. I think dependency injection has become a sort of crutch for
programmers to avoid thinking about their dependencies, and the lifetimes that
those dependencies have. I think dependency injection is at best useless, and at
worst turns code into a sludge of globals that hides behind the masquerade of
being a "best practice".

Before I get into the argument proper, I want to make something clear. I don't
just think that dependency injection is broken because frameworks like Spring
can completely destroy your stack trace, or that DI frameworks create a slew of
annotations on every method you write. I think that dependency injection is a
fundamentally broken concept, and that no framework could ever possibly make it
work.

---

<a id="[1]">[1]</a> Of course, this is a pretty naive analysis of the data.
Perhaps SO's demographics have changed over the years in a way that disfavors
Java (perhaps professional programmers have switched to using internal wikis),
or perhaps Java has fallen out of favor for reasons other than it being
object-oriented (perhaps programmers were scared by Log4Shell, or JDK licensing
issues with Oracle, etc.). It's not really possible to do a scientific
experiment that would ever tell us exactly how programmers feel about
object-orientation, because programmers choose the languages they choose for
reasons that go far beyond mere language design. It would be like trying to do
an experiment showing that if Julius Caesar was never assassinated, the UK
wouldn't have voted for Brexit. The cause and effect are so far apart, and so
much happens in the middle, that science becomes an obviously inadequate tool to
study the topic.

---
