# Reminders

- See Agenda in Retro md / [template](../session-notes/session-2023-MM-DD.template.md)
- Before Retro: Update the Backlog
- Before/Beginning of Session: Set timer/expectations for retro for 30 min before end of session

## Backlog

# As we go...

- r Split classes into separate files
- r Fix implicit any types (now that set compiler options to disallow implicit any)

# Doing


# To Do (prioritized) (r = refactor, d = doc, f = feature, b = bug, e = environment)

- e We want to continuously see the same errors in the dev environment that we see in the CI enviornment (many possible solutions, e.g., script changes to jest test runner or some other way); currently CI is doing: `npm run build` with `noImplicitAny=false` but the dev environment has `noImplicitAny=true`
- e Avoid ports pop-ups from npm test
  https://www.gitpod.io/docs/configure/workspaces/ports#configure-port-ranges
- r Refactor `game.players`
  - r Encapsulate player_collection into class Mob (or Ensemble)
- r Use property getters as appropriate
  - but **why?**
    - syntactic sugar
    - user code looks ?cleaner?
    - is it more readable? lower cognitive load?
  - [x] `player.name` instead of player.name()....
    - [x] where is `player.name` used?
    - [-] More? Should we research the pros/cons and intent within TypeScript specifically?
- r Need a `Position` Type instead of String
- In this File `TestHarnessConvenienceFunctions.ts`
  - Replace all `getByRole('list', ...)` with `getList(...)` because for us Role has a different meaning than the Testlibrary
  - Replace all `getByRole('listitem', ...)` with `getListItem(...)` because for us Role has a different meaning than the Testlibrary
  - Replace all `getByRole('???', ...)` with `get???(...)` because for us Role has a different meaning than the Testlibrary
- Keep on refactoring primitive obsession
- which ecmascript version do we want to target for typescript? [tsconfig.json](../webapp/tsconfig.json)
- Document in the readme.md to explain how to start the app
- [Issues in GitHub](https://github.com/gregorriegler/mob-programming-rpg/issues)
  - Support small screen
  - Option to play without the built-in timer
- Allow for local changes to env file (for testing) that do not break produciton.
- Need badge icon(s) for:
  - Disciplinarian

# DONE (most recently finished first)

- Fix broken pipeline by explicitly declaring fields to be optional using the `?`. `npm run build` fails while `npm test` succeeds/passes!!!

## 2023-03-30

- Set TypeScript compiler option to disallow implicit any
- Rename microretro\* files and retro folder to refect actual contents (agenda + retro/session notes)

## Older

- Rename Game.players to Game.mob
- Replace all `getByRole("button",...)` with `getButton(...)` because for us Role has a different meaning than the Testlibrary
- Create GitPod yaml file (for when new workspace is created)
- create a global backlog
- create a microretro template
- Finish up the refactor test path
- improve on font https://github.com/gregorriegler/mob-programming-rpg/issues/4
