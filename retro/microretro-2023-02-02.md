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



# Retro

## How did that feel?

## What worked well, we want to do more of it?

## Idea
- Have the mob be the archivist role together (something like 2min code 1min archive)
- Intention needs to be documented right there, when it happens
