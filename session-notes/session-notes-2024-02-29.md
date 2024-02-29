# Session Date: 2024-02-29

## Agenda

- [x] HH:00 **Bond:** Bonding
- [ ] **Facilitator:** Identify who facilitates and record [here](#co-authors)
- [ ] **Time-Archivist:** Identify who keeps records times for sections [below](#how-we-spent-our-time-today)
- [x] **Co-Authors:** Update the [Co-Authors](#co-authors) 
- [x] **Welcome Newcomers:** If we have any newcomers review our [onboarding notes](../docs/onboarding-notes.md)
- [x] HH:25 **Decide on What to Code** by 25 min after the hour; choose either:
    - continue with [last session's WIP](../docs/backlog.md#doing-wip)
    - new kata
    - well refined backlog item
    - new item - "follow the energy" - something else that can be coded by the mob
- [x] put today's plan into [doing WIP](../docs/backlog.md#doing-wip)
- [x] HH:30 **Code:** Get to coding by 30 min after the hour 
  - [ ] setup the mobtime Timer
        NOTE: to open mob timer manually find "mobtime" in [this file](../.gitpod.yml)
    - [ ] Everyone: turn on mob timer sounds 📣
    - [ ] Add "Retro" as the last participant in the timer
    - [ ] Append "(Facilitor)" to the name of the participant who is facilitating
  - [ ] Code
  - [ ] 10m mid-session retro
  - [ ] More code
  - [ ] 10m retro
- [ ] **Process improvement:** Improving process (e.g. the .md files)
  - The process is defined by the [template](./session-notes-YYYY-MM-DD.md)
- [ ] **Backlog refinement**
- [ ] **Retro:** Final longer retro (consider: aim to start 30 min before end time)
- [ ] Done by end of 3 hour (consider: aim to finish 10 min early)

## Facilitated by:

## Time-Keeper:

## Co-Authors
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>

## Retro [Templates](../docs/retro-templates.md)

Notes: 
- We had a newcomer, Matt, for the first hour and worked on FizzBuzz together (Matt, Joel, & Nitsan)
- Then it was just Joel & Nitsan working on FizzBuzz using double-loop TDD

# Retro 4

Nitsan
- Interesting, more nuanced understanding of the concept 
- Like that outer loop is more property-based, e.g., has 100 lines,...; while inside is more
  thorough, e.g., edge cases
- Consider how we manage long-lived failing tests; we skip, then unskip,... requiring keeping
  track of more things in our heads 
- We are learning

Joel
- +1
- Would prefer to stay in the green
- The later tests could be skipped
- Reducing redundant code
- Sould we split into more and more tests?
- Idea - use parametrized tests to reduce duplication

# Retro 3

Nitsan
- Interesting
- Wondering about boilerplate code. Can we extract it away? 
- We are in the details but double-loop TDD should be higher level

Joel
- Interesting
- Liked - used GPT to figure out how to assert against stdout
- Was a good way to do: Retro after going twice in the rotation
- Happy to do FizzBuzz differently than usual
- Also - double loop TDD

# Retro 2

Matt

- A lot more comfortable
- The timer - thougths - 
- Cool experience
- Retro every 10m instead every two weeks (if you're lucky)
- Difficult to track how to exactly share the screen, unfamiliar computer setup

Joel

- Also felt more comfortable, good pace, TDD
- Liked - being explicit about the TDD stages, "I expect the test to fail / pass"
- Talking at a high level of intent - e.g. "inline the variable"
- also liked - frequent retros

Nitsan

- Short time to get from nervous to comfortable - super happy about that
- Meta - using a kata; we started on one path, which was more complicated than the
  2nd path. Future: Want to start simpler, then later can add more complexity.
- Frequent retros +1; we changed directions from complex to simpler path after 1st retro;
  workflow of explicitly stopping and asking, "Do we want to change anything?" 

# Retro 1

Joel

- Nice to have somebody new :)
- Doing something a bit different with FizzBuzz - print 1-100
    - interesting
    - added complexity
- going forward:
  Get a sense of the room about the path forward -
  do we want to continue on this path with the "print", or some other way?

Matt

- Nervous, first time
- Setup steps for coding - maybe something for newbies to look at before joining

Nitsan
- Happy to have new person
- Curious about double-loop TDD; readme says print 1-100 rather than write function 
  to process  each number
- Let's to the latter (not print all 1-100), since the former adds complexity
