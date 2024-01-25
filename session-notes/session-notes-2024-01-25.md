# Session Date: 2024-01-25

## Facilitated by
Michael

## Co-Authors
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>

# Agenda

- [x] **Bond:** Bonding
- [x] **Facilitator:** Identify who facilitates
- [x] **Co-Authors:** Update the [Co-Authors](#co-authors) 
- [x] **Welcome Newcomers:** If we have any newcomers review our [onboarding notes](../docs/onboarding-notes.md)
- [x] **Code:** Get to coding quickly on a kata or other well refined backlog item - **Vending Machine**
  - [x] Everyone: turn on mob timer sounds 📣
  - [x] Add 'Retro' as the last participant to the timer 
  - [x] Code - H1:34
  - [x] 1m/person mid-session retro - H1:59
  - [x] More code
  - [x] 1m/person retro - H2:37
  - [ ] ...
- [ ] **Process improvement:** Improving process (e.g. the .md files)
  - The process is defined by the [template](./session-notes-YYYY-MM-DD.md)
- [ ] **Backlog refinement**
- [ ] **Retro:** Final longer retro

## Retro [Templates](../docs/retro-templates.md)

### Retro #1

5-minues, popcorn style!

What's important for the very next coding round?

Looking vs. not looking at the code
 - was a good learning experience
 - also was surprised by it
 - went with it
 - +1

Michael facilitating +1
- trying something new - try it, you will know if you like it or not
- not familiar with pytest+approvals - eiger to learn more
- glad to slow down for exaplanation

- Like writing the prompt into a shared location before we submit it to chat!

- Record? - yes
    - Primarily for own usage

- +1 D clearly stating the overall intention of this coding round
- Happy joining, and direclty getting into the rotation

### Retro #2

Diana: Consider changing IDE & testing framework; not doing approval tests.

Nitsan: Too much information. We created a lot of failing tests. 

Gregor: Not easy to follow. What's the goal?

Nitsan: Goal is to have AI generate the code as a start. 
We have 2 implementations now, so can  just take the best.
The refined prompt worked better.

Gregor: Test framework change would be better - all tests in one file. GPT doesn't generate approved files. 

Joel: Likes having a facilitator and deferring by default to the facilitator (similar to deferring to talker) - helps things keep moving. Could use a different testing framework, e.g., Cucumber.

RAW Notes from CHAT:
diana
7:15 AM
what you believe is the right thing to do as a SM
Vs
what others suggest they think you should do
ex: managers and team members have
sometimes asked me to give my oppion for whatrothers could do./ should do
3M post it
the year in review:
what I read
----
facilitating simple and great conversations
liberating structures
NVC and _____
light structure so people can have heavy conversations
and COnnect at a deeper level
enough structure
soft skills and
engineering (possibly: saiying it was thought through in advance)
---
Michael Great bonding Question
Joel thanks for using the down time to get the GitPod Ready
Joel S
7:22 AM
https://gregorriegl-mobprogramm-8gwrnudp9z9.ws-us107.gitpod.io
---
diana
7:28 AM
Gregor - COuld you please record the session when you arrive
(diana, Joel and Michael)
RETRO Question
what does the facilitator do?
could we do that some other way?
faciltator can keep us on track to OUR agreed upon agenda
and timeboxing
should we bring this to a vote
Joel S
7:32 AM
---
https://mobtime.fly.dev/friendly-grid
---
https://cyber-dojo.org/kata/edit/pA562v
---
---
https://mobtime.fly.dev/friendly-grid
diana
7:44 AM
provide Generative AI
a ROLE
a GOAL and
a TASK
Michael
7:47 AM
https://mobtime.fly.dev/friendly-grid
diana
7:48 AM
Good collab approach
Write the prompt in a shared file FIRST
I think I helped write the cyber-dojo code to show the COlored Diff
diana
7:58 AM
----
midsession retro
could someone save the notes above
into our GitHub
Retro: Q:
something important enough to propse doing different
AND for the RETRO
REcording could be used for the Future REtro
-----
I have a hard stop in 1 hour
Joel S
8:08 AM
https://gregorriegl-mobprogramm-8gwrnudp9z9.ws-us107.gitpod.io
diana
8:08 AM
topic for final retro:
Gregor has a hard time starrting on time
request to consider:
could we start later or on a different day -
OBS
TOPIC:
consider simpler TALKER TIMER label in mobtimer
^Michael idea ^
RETRO:
consider:
adding the plan for the day into the Session notes
so that anyone who joins late can ?EASILY ? get info about what we are working on
by reading the note

### Retro #3

Our original prompt said TDD, so ChatGPT put it into its suggested prompt

Nitsan - suggests start with tests, then write code after

Gregor - likes prompt archiving (keeping the prompts)

Nitsan - consider just one prompt file and use file history in cyber-dojo to see older versions

Ideas - revert back to earlier cyber-dojo project version

Gregor - If starting from scratch, what would you do differently?

Nitsan - Metaprompting - a distraction; part of too many changes at once

Joel - Clarify Goal: little bit unclear about the direction. Using pytest without approval tests. Overall goal is to simply:
- Do the vending machine kata as a refactoring, but it doesn't exist. so we want chat to generate it for us.
different sense of what the goal was

Michael - challenge of talking about 2 approaches: keep talking or just keep going with direction started; challenge to balance

Nitsan - not too attached to idea of metaprompting

Joel - learning is always good - even if learning what seemed like a good idea at first later was a rabbit hole

Proposal:
- Get ChatGPT to create with single file implementation 
  1. Generate clear human readable tests (and we check they are correct)
  2. Generate the code to pass the tests
- Try with Vending Machine and single prompt (fallback if slow/hard: do with FizzBuzz or something else easier)
