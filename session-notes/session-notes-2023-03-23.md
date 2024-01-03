# Session Date: 2023-03-23
## Co-Authors
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>

# Agenda

## Bond

- Try a [warmup exercise](../docs/warmup-exercises.md)

## Goals

- Check the [global backlog](../docs/backlog.md)

## Reflect

### How did that feel?

- Productive
- A little bit out-of-control, but it's ok
    - Nitsan broke the strong-style rule, but it was timeboxed
- We had multiple ideas around refactoring Game.ts, felt messy +1
- Passing it from team to team, made us re-discuss the same decision; not really mobbing
    - Should we have a "Yes and..." rule between mobs?
- Questions about when to use property getters/setters in TypeScript

### What worked well, we want to do more of it?

- Type definitions - good safeguarding; also added stricter compiler settings to backlog
- Good communication / bookmarking using the backlog.md
- Finishing with tests all green
- Get to root of problem(s) and fix (or plan to fix in backlog)
- Set timer to go off when want to do retro

### Idea

- Write your Ideas to the [global backlog](../docs/backlog.md)
- Formal time for when intend to do retro (e.g., 30 min. before end of session)
- See further musings below:

# Some musings

Should we consider MVC (model view controller)?
- In react (with TS), is there a standard way to do this (or an alternative that meets the same goal)?
- Goal: Just expose the lightest interfaces to the UI 

Player (model)
 public Name

Game (model)
 public Mob (i.e., Players)
 public Timer

Game (controller) (i.e., just the lightest interfaces that the UI needs to get model info/func)
 public AddPlayer
 public GetPlayerNames
 public SetPlayerNames
 public GetTimeRemaining
 public Start/Stop/PauseTimer

UI (view)
 AddPlayer
  Game.Players.push(new Player("Fred")) // or...
  Game.AddPlayer(new Player("Fred"))
 Show a list of players
  Game.GetPlayerNames()
   <ul>...
 Rename/ChangePlayers
  Game.SetPlayerNames()
 TimeRemaining
 Start/Stop/PauseTimer

