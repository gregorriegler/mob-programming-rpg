# Goal
- Limit number of points to 3 per role
- Exploratory testing
    - A: which part? Q: all the app
    - run the app
- Tests start too fast (should wait a sec)
- Need another Service to host the wsserver
- How the URL looks like in a deployed 

# Agreements
- All Findings first?
    - 

# Findings 
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

# Retro

## How did that feel?

## What worked well, we want to do more of it?

## Idea

