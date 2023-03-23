# Doing

- Refactor `game.players`  
  - Encapsulate player_collection into class Mob (or Ensemble)
- Use property getters as appropriate
  - [x] `player.name`
    - [ ] where is `player.name` used?
    - [ ] more?
- TypeScript compiler options: disallow Any type,... (stricter)

# To Do (prioritized)

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

# DONE (most recently finished first)

- Rename Game.players to Game.mob
- Replace all `getByRole("button",...)` with `getButton(...)` because for us Role has a different meaning than the Testlibrary
- Create GitPod yaml file (for when new workspace is created)
- create a global backlog
- create a microretro template
- Finish up the refactor test path
- improve on font https://github.com/gregorriegler/mob-programming-rpg/issues/4
