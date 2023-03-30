# Reminders

- See Agenda in Retro md / template
- Before Retro: Update the Backlog
- Before/Beginning of Session: Set timer/expectations for retro for 30 min before end of session

## Backlog

# Doing

- Rename microretro* files and retro folder to refect actual contents (agenda + retro/session notes)
- Refactor `game.players`  
  - Encapsulate player_collection into class Mob (or Ensemble)
- Use property getters as appropriate
  - but **why?**
    - syntactic sugar
    - user code looks ?cleaner?
    - is it more readable? lower cognitive load?
  - [x] `player.name`
    - [x] where is `player.name` used?
    - [ ] More? Should we research the pros/cons and intent within TypeScript specifically?
- Fix any types (now that set compiler options to disallow implicit any)

# To Do (prioritized)

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

## 2023-03-30
- Set TypeScript compiler option to disallow implicit any

## Older
- Rename Game.players to Game.mob
- Replace all `getByRole("button",...)` with `getButton(...)` because for us Role has a different meaning than the Testlibrary
- Create GitPod yaml file (for when new workspace is created)
- create a global backlog
- create a microretro template
- Finish up the refactor test path
- improve on font https://github.com/gregorriegler/mob-programming-rpg/issues/4
