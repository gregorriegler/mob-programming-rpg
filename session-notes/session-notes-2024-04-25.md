# Session Date: 2024-04-25

## Agenda

- [x] HH:00 **Bond:** Bonding
- [x] **Facilitator:** Identify who facilitates and record [here](#facilitated-by)
- [ ] **Time-Archivist:** Identify who keeps records times for sections [below](#how-we-spent-our-time-today)
- [x] **Co-Authors:** Update the [Co-Authors](#co-authors) 
- [x] **Welcome Newcomers:** If we have any newcomers review our [onboarding notes](../docs/onboarding-notes.md)
- [x] HH:25 **Decide on What to Code** by 25 min after the hour; choose either:
    - continue with [last session's WIP](../docs/backlog.md#doing-wip)
    - new kata
    - well refined backlog item
    - new item - "follow the energy" - something else that can be coded by the mob
- [ ] put today's plan into [doing WIP](../docs/backlog.md#doing-wip)
- [x] HH:30 **Code:** Get to coding by 30 min after the hour 
  - [x] setup the mobtime Timer
        NOTE: to open mob timer manually find "mobtime" in [this file](../.gitpod.yml)
    - [x] Everyone: turn on mob timer sounds 📣
    - [x] Add "Retro" as the last participant in the timer
    - [x] Append "(Facilitor)" to the name of the participant who is facilitating
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
Joel

## Time-Keeper:

## Co-Authors
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: Matt <matthew.anderson11@gmail.com>

## Retro [Templates](../docs/retro-templates.md)

Retro Notes go here:

### Mid-Session Retro 1 (1 minute per person - what liked/disliked & propose changes)

Typer (most;y): Nitsan

Diana
- Noticed - did a good job of not being worried about not being set up; was quick to get set up
- "don't know if I should refactor..."

Gregor
- Surprised to see a new person! Good to see you all again
- Learned: `skip_test_`
- Cool: using `pytest-watch` - a continuous test runer
- `make_fizzbuzz` - pass the db - how can we not pass it?
  - Maybe: fetch data -> pass the data to `make_fizzbuzz`

Nitsan
- make_fizzbuzz - idea was to separate the entire app from the tests (that's why the db is injected); can also have something
  that accepts the rules without the db (later)
- we could try having a failing test about not using the db correctly

Joel
- would have liked longer bonding, but good to get to codign quickly
- borderline case: is what we're doing a bit too complex?
- figuring out how to fizzbuzz + db kata
- could we do this kata on cyber dojo?
- to improve (in the future) python refactoring tool on gitpod

### Mid-Session Retro 2 (1 minute per person - what liked/disliked & propose changes)

Nitsan
- In retrospect, prefer not to be testing 7, but 5 again; only change 1 thing between 2 tests; last tested 5, so
  now do it again and expect a different word (only change was the rule, not the number); e.g., input = 5, word = something else

Diana
- Like that we have a rotation with being Typer first and then becoming the Talker
- Used my turn to get better understanding
- Wait and watch

Joel
- Getting into a bit of a flow
- Figuring out how to write this test
- a test for not fizz nor buzz: two variables: 1. the number 2. the rules
- Next: continue as we are
- Good to do the retro now

### Retro 3

Nitsan
- Wondering about this pattern: many refactorings until the change is very small (possibly 1 line)
- Dilemma: do this on green? or red? (or orange?) We have a relevant failing test. Let's do the simplest thing to pass;
  maybe refactor so it's easier & maybe better than refactoring on red. "Orange state" - want a failing test to tell us
  where we're going and also the ability to refactor.

Diana
- Request: when talking, make sure to state your intention, and how it fits
- Enjoying the rotations

Joel
- Happy +1 on stating the intention
- Thought this would be simpler than it is; surprised how complicated this is, and how it fits into TDD
- Things getting clearer
- Clear intentions: helps with different ideas people might have


### Retro 4

Diana
- I have faith we'll get there this way with the group
- Having the db, and ask something wrong, that would fail

Joel
- Like the pattern we have
- Something we're doing is a bit confusing
- Maybe extract helper function for readability
- Losing track about red / refactor

Nitsan
- Liked how we uncovered the bug for the new test, i.e., duplicate test with new rule; resulted in different failure.
- Is this a refactoring, or are we adding functionality? Duplication can be refactored. Mainly we are still adding functionality.

### Retro 5

Diana
- was very important to write the comments and pseudo-code
- just followed it
- did not understand the intention w/o the comments; fine following
- amazing - ChatGPT gave us something too verbose; still learned from it

Joel
- like our progress
- found it easier to state intentions with comments / pseudo-code; capturing on the screen makes it easier to follow
- enjoyed the session!

Nitsan
- Like doing fizzbuzz with db - so many considerations; very interesting to manage everyone's understanding 
- Don't have a clear idea how to go about it, but like exploring different directions together

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
