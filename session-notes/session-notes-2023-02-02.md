# Session Date: 2023-02-02
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Eddie Bush <eddie@craftsmanshipcounts.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>

Goal: LEARN - Learn by refactoring 
Goal: Decide - Terminology we will use (as related to README.md in Willem's game, and also related to conversation with Willem)

Goal: DO - new integration test
Goal: DO - Refactor current test

Links:
https://beta.tldraw.com/r/v2_c_Nqp_KRwsJE-kWiSbPVrQo

BOND
DECIDE

# Goal - Today
- Read by refactor the old integration test, because it has a lot of details
    - The goal of the test is to verify that the state is properly propagated between two games
- Write ?this? integration test

Get "Points" out of `Player`

# Goal - Other
- Exploratory testing
    - A: which part? Q: all the app
    - run the app
- altertative impl for 'points'
    - **Add integration test to propagate the changing of point
    - let's do a parallel change - don't break things while you work
    - cur
    rent impl:
        ```ts
        private readonly _points: Map<Role, number>;
        ```
        - 'points' is the `number` piece of this `Map`
    - the `Map` itself is also a form of primitive obsession (maybe 'role-sheet'?)
    - potential new design: Point to be a Value Object
    - idea: evolve the Map from `number` to `Point` (Value Object)
        - explicitely make points to start with zero
    - first test: start with value zero
- Walk over Willems Input and make Tasks out of them?

# Findings 
- In Integration test afterEach is not always run
    - Reproducible by running test and keep changing code     
- Primitive with _points
    - this._points.set(role, Math.max(3,this._points.get(role)!! + 1)); should be _points.increment or something
- Refresh after timer starts causes wrong time to be shown (starting over).
- Allow the roles to be configurable (the ones shown in the "Help" page)
- What should happen when points are full? (e.g. for Driver role)
    - right now - once you have achieved 3 points, you can select a new role to gain points
    - in the original game design - you could redistribute earned points to other roles
    - UI:
        - collapse the full bar (slider)
    - or: more levels per role: Driver, Super Driver, Master Driver, indicated with different colors maybe...
- user checks checkboxes of things they did -> gains points; instead of inputting points directly
- Disciplinarian badge shows as a broken image

## Idea
- Have the mob be the archivist role together (something like 2min code 1min archive)
- Intention needs to be documented right there, when it happens



# Retro

## How did that feel?
- Gregor - felt very good, very relaxed, calm, free
    - feels self-sufficient
- Like what we did
    - **invented** remote mob drawing using [tldraw](https://beta.tldraw.com/r/v2_c_Nqp_KRwsJE-kWiSbPVrQo)
- felt like "Norming"
- it feels like there is a familiarity with this group
    - it helps with the flow
- the thing with the ubiquitous language is very helpful in many respects
    - cant wait for the code to reflect that
- really appreciate that time explaining the function reference (how we run a test not on ci)
- we could have defered the function reference and focused on the function body
- it was learning
- how do you sequence the learning? I was overwhelmed
- were going in one direction, -> had an idea -> going in another direction
- went from read by refactoring (learning) to picture learning
- lots of extracting and naming, drives you to domain language
- liked to put trust in the mob and have the following talker to continue the intent
- i felt like i just needed to be heard in my rotation as talker
- in the beginning I had the feeling - if the timer was 1 minute longer we would have more work done
    - is 2 min too short for this group?

## What worked well, we want to do more of it?
- michael stepping up and pointing out that we are shifting directions
- putting our intentions as comments into the code
- facilitating from within the mob
- read by refactoring to get on the same page
- rotate in the middle of something and have the following talker continue the intent
- talker becomes typist (makes conversations less awkward)
- side discussions outside the rotation timer

# experiments
- 3 minute rotations
- typist becomes talker
