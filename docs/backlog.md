# Reminders

-   Each Session has an auto-generated [session notes file](../session-notes/_todays-session-notes.md) 

## Working Agreements

-   **Dogfood Burger**: Focus on one feature at a time, dogfooding only that feature before and after implementing the feature to remain focused on coding.
-   **Encouraging ad hoc facilitation**: It's ok for anybody to interrupt for 10 seconds and say they're feeling uncomfortable or point out that we are not adhering to our working agreements.

## Backlog

# As we go...

-   r Split classes into separate files
-   r Fix implicit any types (now that set compiler options to disallow implicit any)

# Doing (WIP)

- FizzBuzz Kata: https://www.youtube.com/watch?v=l2lZ_7-HgnE

# To Do (prioritized) (r = refactor, d = doc, f = feature, b = bug, e = environment)

- Kata short with learning goal
- Automate co-authors further for committing

# Someday maybe later

-
-   **Points Form** Gain points using a form per player, where you choose actions/skills deserving points [scoring points](../docs/scoring-points.md)
    -   [ ] F!! Show the skills in the card - below the points bar, per role
        -  Consider using TDD starting with [RoleSheet.spec.ts](../webapp/src/RoleSheet.spec.tsx), replace dummy text with actual skills in the card
        -   Manually test in UI, using this command in the terminal:
            -   To show skills: `REACT_APP_FEATURE_FLAG_SHOW_SKILLS_PER_ROLE=1 npm start`
            -   To hide skills: `npm start`
        -   Remove feature flag when done
    -   [ ] F!! Gain points (based on these skills per role)
-   **Timer Sync** B Timer does not refresh for many people without restarting.
-   enable feature flag for all Fs
-   F Positions should stay in same place on screen (with player names rotating through).
-   F Make timer time-out more obvious. Maybe with noise. Maybe by locking screen.
-   F Add skills to mobber (Speak up. Be quiet)
-   F Add skill to navigator - Yes, and... (continuing intent of previous navigator)
-   F Capture mobber-level skill - quietly taking notes (without interrupting flow). Personal notes. Notes for the mob.
    -   Personal "Parking Lot" (to think about and MAYBE or (maybe not) share with mob
    -   Public - Possible future backlog items
-   F Capture xxx role skill - Manage attention (both own attentoin and mob's attention)
-   F!! Ability to rename Positions; e.g., Navigator -> Talker, Driver -> Typist, Mobber -> Next
-   Problem: Points are capped at 3 per role
    -   Potential Solution: Increment points per skill/action (e.g. listen on the edge of your seat)
    -   Potential Solution: Allow the points to continue past 3
        -   Just show the number
        -   Color coding for Badges (Level 2 Driver, Level 3 Driver)
-   Problem: Points given in an input field

    -   Potential Solution: F!! gain points using a form per player, where you choose actions/skills deserving points
    -   Potential Solution: Just have a button +1 (needs undo)

-   D Capture snapshot of [Team Agreements](team-agreements.md), then incrementally add missing (or modified) practices.

-   See Agenda in Retro md / [template](../session-notes/session-2023-MM-DD.template.md)

-   e We want to continuously see the same errors in the dev environment that we see in the CI enviornment (many possible solutions, e.g., script changes to jest test runner or some other way); currently CI is doing: `npm run build` with `noImplicitAny=false` but the dev environment has `noImplicitAny=true`
-   e Avoid ports pop-ups from npm test
    https://www.gitpod.io/docs/configure/workspaces/ports#configure-port-ranges
-   r Refactor `game.players`
    -   r Encapsulate player_collection into class Mob (or Ensemble)
-   r Use property getters as appropriate
    -   but **why?**
        -   syntactic sugar
        -   user code looks ?cleaner?
        -   is it more readable? lower cognitive load?
    -   [x] `player.name` instead of player.name()....
        -   [x] where is `player.name` used?
        -   [-] More? Should we research the pros/cons and intent within TypeScript specifically?
-   r Need a `Position` Type instead of String
-   In this File `TestHarnessConvenienceFunctions.ts`
    -   Replace all `getByRole('list', ...)` with `getList(...)` because for us Role has a different meaning than the Testlibrary
    -   Replace all `getByRole('listitem', ...)` with `getListItem(...)` because for us Role has a different meaning than the Testlibrary
    -   Replace all `getByRole('???', ...)` with `get???(...)` because for us Role has a different meaning than the Testlibrary
-   Keep on refactoring primitive obsession
-   which ecmascript version do we want to target for typescript? [tsconfig.json](../webapp/tsconfig.json)
-   Document in the readme.md to explain how to start the app
-   [Issues in GitHub](https://github.com/gregorriegler/mob-programming-rpg/issues)
    -   Support small screen
    -   Option to play without the built-in timer
-   Allow for local changes to env file (for testing) that do not break produciton.
-   Need badge icon(s) for:

    -   Disciplinarian

-   F!! Change label of button to toggle between "Start", "Pause".
-   F!! Separate button for "Cancel".
-   F!! Time less than 1:00.

# DONE (most recently finished first)

- [ ] Install extension to extract whole React components:
  - [x] Abracabra - it works, but requires multiple steps (extract function in module scope; move to file; quick fix to convert parameters to destructured object; remove return type; change call site from function call to <... />)
  - [ ] VSCode React Refactoring - works locally, but not on remote/GitPod  
-   change the README to only have the first mob session
-   Fix broken pipeline by explicitly declaring fields to be optional using the `?`. `npm run build` fails while `npm test` succeeds/passes!!!

## 2023-03-30

-   Set TypeScript compiler option to disallow implicit any
-   Rename microretro\* files and retro folder to refect actual contents (agenda + retro/session notes)

## Older

-   Rename Game.players to Game.mob
-   Replace all `getByRole("button",...)` with `getButton(...)` because for us Role has a different meaning than the Testlibrary
-   Create GitPod yaml file (for when new workspace is created)
-   create a global backlog
-   create a microretro template
-   Finish up the refactor test path
-   improve on font https://github.com/gregorriegler/mob-programming-rpg/issues/4
