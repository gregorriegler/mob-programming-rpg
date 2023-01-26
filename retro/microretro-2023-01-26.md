# Goal
- Exploratory testing
    - A: which part? Q: all the app
    - run the app
- altertative impl for 'points'
    - Add integration test to propagate the changing of point
    - let's do a parallel change - don't break things while you work
    - current impl:
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

# Terminology
RoleName - Driver, Navigator, Researcher
Role has points and a RoleName and becomes a Badge (the hat you are wearing)
Place in the Rotation
Activity? Skill? XP?
Badge
Rolesheets = Playbooks (the things you have to do)
Spots/Position in a Rotation (e.g. DriverSpot) is like a chair in the rotation (the chair is not a role)

Roles vs Spots: You can spend many rounds on roles. In the position of a driver you can be many roles

Roles vs. Skills?

Individual Behaviors = Micro-Skills

Role - it's a paradigm, a hat

A Driver (a role) has skills e.g. Typing, Asking Question, Putting Blinders on, Respond to one person, constantly seeking better undertanding of tooling

A Driver shows behavior

the point of the game - talk about actual operation competency - what is actually observalbe

## Can the UI help solve this?

### greatest mob of all time - the GOAT!

track total points / badges over time

### reduce stress

Your first round - is stressful
You forget to do the behaviors
Mobbers are racking-up points - they could help the Driver and Navigator

Next (Wingman) -> Navigator -> Driver

Wingman:
- 

We're trying to automate the facilitator.

Most challenging part of game (says Willem) is when you are driving (or navigating), it is so stressful that your first spot in rotation (first time around)...
WHat happens is that you forget to do behaviors. (Driver might freak. Same for navigator). Getting buried in proble.
Willem has tried different behaviors (i.e. wing person). "Next" (about to be navigator). They watch navigator.
Flip side.... if you are in multi-person mob. You rack up points all the time. Celebrated a moment. They have loads of opportunities to slack back (or over focus) on getting _other_ roles to get points.
Keep track of total number of badges. Total points. Arcade game.
Richard Sheridan -- Menlo Labs -- Full-day interview. Your job is to make sure that SOMEONE ELSE gets a second interview.
Team score. Not individual score. It only matters that it opens up other badges. How many badges does the group (not me) have?
The mob is trying to accumulate badges. INDIVIDUALS get badges, but they accrue to MOB.
They can become a badge. Different from "place in rotation".
Could create more ornate navigator skills. Star pilot.
RoleName ... how to match to BadgeName. Is it a 1-to-1?
Looking at game....As driver spot in rotation, but working on research role, can you work on 2 roles at same time?

Some roles are attached to rotation.  Others are not.  Should be allowed to double up.

Role -- Play book.  Like a fighter has a play book.  Things they can do.  Role sheet.  Roles.
Are independent:
* Spots in rotation
* Roles

Disagreed with (Willem)
* Role is hat you are wearing as a mobber.

* Chair you are sitting in is not a role.

Spot in rotation is like position on sports team.  It may be a helpful model (or not).

Wing man is needed because you only have one crack "at bat".  The 2 hot spots provide limited opportunities to get points.

Nitsan -- another metaphor.  Only one person at the keyboard.  Only one person at the microphone.  Could be 100's of people not in those 2 hot spots.

Only 2 seats in the front of the bus.  Lot's of sheets in the back of the bus.FACILITATOR is game leader (not navigator).

Gregor pulled Willem in as SME.We added Willem as co-author of commit.

It's only team points (We focus on the Team, not the individual)

# Retro

## How did that feel?
- We were kind of dispersed +1
    - trying to go in many different directions +1
    - still don't know which one to choose
    - feel lucky with how we made the introduction of Point (could have gotten worse)
    - it hindered flow
- Encouraging
- good Teamwork, everybody was adding
- did not understand lots of the cli commands we used
- should use more ChatGPT for arbitrary tasks
- happy to see more people join +1
- happy to see familiar faces again +1
- surprised and happy to have 4 people again
- we got something done, but not enough following a single intention through
- jump a bit between problems

## What worked well, we want to do more of it?
- have an inclusive and welcoming and respectful group
- having design decisions, and pausing the timer
    - as we're just talking, it's ok to not have the timer run
    - timer might put unwanted pressure
- manual testing - to make sure everything still works
- renaming the commit message to be more precise - was easy
- we saved a useful command into the code as comment - so it's available for next times
    - this is an example of being good with documenting and archiving our intentions
    - these are like breadcrumbs for us for next sessions

## Idea
- Have the mob be the archivist role together (something like 2min code 1min archive)
- Intention needs to be documented right there, when it happens