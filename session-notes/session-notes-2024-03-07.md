# Session Date: 2024-03-07

## Agenda

- [X] HH:00 **Bond:** Bonding
- [ ] **Facilitator:** Identify who facilitates and record [here](#facilitated-by)
- [ ] **Time-Archivist:** Identify who keeps records times for sections [below](#how-we-spent-our-time-today)
- [ ] **Co-Authors:** Update the [Co-Authors](#co-authors) 
- [ ] **Welcome Newcomers:** If we have any newcomers review our [onboarding notes](../docs/onboarding-notes.md)
- [ ] HH:25 **Decide on What to Code** by 25 min after the hour; choose either:
    - continue with [last session's WIP](../docs/backlog.md#doing-wip)
    - new kata
    - well refined backlog item
    - new item - "follow the energy" - something else that can be coded by the mob
- [ ] put today's plan into [doing WIP](../docs/backlog.md#doing-wip)
- [ ] HH:30 **Code:** Get to coding by 30 min after the hour 
  - [x] setup the mobtime Timer
        NOTE: to open mob timer manually find "mobtime" in [this file](../.gitpod.yml)
    - [ ] Everyone: turn on mob timer sounds 📣
    - [X] Add "Retro" as the last participant in the timer
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
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>

## Inactive Co-Authors

## Retro [Templates](../docs/retro-templates.md)

Retro Notes go here:

### Mid-Session Retro 1 (1 minute per person - what liked/disliked & propose changes)


Joel
- Liked - "let's do TDD" - helping each other when forgetting
- hello world - testing the test system - a more precise name vs. testing fizzbuzz
- Liked - getting the cyber-dojo quickly, in the background - updting the gitpod

Diana
- Liked - at 20m after start time, having code running
- Liked - sharing the screen, starting cyber-dojo - getting into the shared context
- Liked - feels safe not to know, to not have the screen work correctly

Gregor
- good to be back! thanks for wuickly starting something
- love double-loop
- Q: double looping, started from outside; is it ok to have the first test pass w/o a running program?

Nitsan
- thesting hello world vs testing our instance of fizz buzz
- we do not have a program
- CHANGE. fizzbuzz should be an actual program and we should test it more from the outside
- we can explore.

### Mid-Session Retro 2 (1 minute per person - what liked/disliked & propose changes)

Diana
- Love the fact that changing the approach to fizzbuzz, makes it confusing all of the sudden
- Helpful asking "what is your intention?", could phrase it just enough to pass it forward
- Being a verbal thinker - by answering a Q, helps me discover what am thinking

Joel
- Enjoyed it, nice flow
- improve - have timer sound
- trying to capture the output from separate program, but deffered to keep the focus, and the steps small
- Liked: code is now cleaner, working with refactoring, removing clutter helps us focus

Gregor
- Enjoyed wroking together! We understand each other, how we would approach things, feels comfortable
- Wish - should have asked on what was the high level intent for the `first_line` variable

nitsan
- good points in this retro
- one min pers person retro
 - people are veery insightful and conveying a lot
 -  Gregor:  I wish I could have asked about the intention
 - I learn about how to hand over something clearly,
 - could have stoppped and not do anytyhing
 - the first test:  test the first line of the program
 - make it clear that we are only asserting on the first line
 - very small difference:  1 vs 1\n
 - the assertion tests the whole output of the program
 - have the test, test. what it says
 - change the test to what it affects the test
 - WRITE test before code, write the name of the test before the code
 - the name should tell me whjat the test is trying to do 

### Retro #3

Joel
- Getting into an issue, haven't figured it out yet - what are the pattern that already exist for double-loop TDD?
  - I would like to get to testing the inner loop already
  - right now feels like we're duplicating a loop in tests and prod

Diana
- Going OK
- Interesting doing fizzbuzz in an unusual way - how much learning there is!
- Liked - able to mute other person's audio on Gather
- Liked - Joel verbally talked through his thinking, the outcome he wanted, help me getting aligned
- Worried - are we going to dup the fizzbuzz asserts up to 100?! But prob shouldn't be worried, as this is software and we'll be able to extract commonalities later, incrementally.

Nitsan
- from my perspective. we are at the outer loop and we have not gone into the inner loop
- we are following the familiar pattern of adding more fizzbuzz numbers
- joel did. anice step extracted a function called fizzbuzz. 
- not testing outer loop yet
- we have to think and learn when we changed the rules 

### Retro #4

Joel
- Feel like we're picking up speed wihtout hurrying
- Clearer direction now
- Double lines between function - less lines on the screen
- Would like to move to parameterized tests (e.g. all the fizz, all the buzz...)
- Learning a lot, outer and inner.

Nitsan
- It's getting clearer but still have questions: Feels like we're duplicating the same test value in inner and outer loop
- Wonder if we should ask, what can *only* be tested from the outside; and then all the details go inside

### Final Retro

### How we spent our time today:
- Time-Archivist will record the total time for each section of today's session:
  - __ minutes coding
  - __ minutes template edits (?)
  - H1:00 - H0:__ bonding            (__ min)
  - H1:__ - H1:__ agenda & deciding  (__ min)
  - H1:__ - H2:__ round 1 of coding  (__ min)
  - ...
  - Thoughts:
    - __
