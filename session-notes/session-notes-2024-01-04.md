# Session Date: 2024-01-04

## Facilitated by

Gregor

## Co-Authors

Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>

# Inbox

Ideas for this session

- find the template by typing "template"
- prune the backlog / simplify the markdown files - how to get started with a session; make it easier to navigate into the session
  - we actually have two backlogs: 1. for the RPG game 2. the things we're interested in doing as a team
- clean-up the YYYY-MM-DD from the newly generated session notes
- we could first do a kata - code in the beginning

Agenda - today proposal

- [x] bonding
- [ ] get the .md files in shape - timeboxed to 25 min
  - [ ] create a single chronological workflow, in one place
- [ ] condensed coding
- [ ] backlog refinement

Agenda - Ideal

- bonding
- short decisions / review reminders
- get to coding quickly on a kata or other well refined backlog item
- mid-session retro
- more coding
- 10m retro
- backlog refinement
- improving process (e.g. the .md files)
- final longer retro
- 
-----------------

A single chronological Session Workflow
# Here is what we usually do

- [x] **Bond:** Bonding
- [x] **Facilitator:** Identify who facilitates
- [x] **Co-Authors:** Update the [Co-Authors](#co-authors) 
- [x] **Welcome Newcomers:** If we have any newcomers review our [onboarding notes](../docs/onboarding-notes.md)
- [~x] **Code:** Get to coding quickly on a kata or other well refined backlog item
  - [x] Everyone: turn on mob timer sounds 📣
  - [~x] Code
  - [x] 1m/person mid-session retro
  - [ ] More code
  - [ ] 1m/person retro
- [x] **Process improvement:** Improving process (e.g. the .md files)
  - The process is defined by the [template](./session-notes-YYYY-MM-DD.md)
- [~x] **Backlog refinement**
- [ ] **Retro:** Final longer retro

-----------------------------------

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

https://cyber-dojo.org/kata/edit/qeUSkn

### Mid Session Retro (1 min each)

Nitsan: Happy we did this, Feel like we're not done, can make it more compact (single source of truth) 
        Would be happy to code if you have capacity.
        Felt good in terms of collaboration.

Joel:   Plus one on all of those.
        In the beginning we had different Ideas. 
        I'm glad we didnt talk too long on it.
        It worked out really well, good demonstration of just try it.
        Blew past timebox but totally worth it.

Gregor: Went a lot differently than I thought, was thinking about small changes, but we did a overhaul really.
        Confusing to me, becasue so diffeent than anticipated;
        Very happy with the end result - fills its purpose
        yes - happy doing coding still

### Second Retro (1 min each)

Nitsan: Feels more fluent with clojure. Like to go on, maybe get to some place new today.

Joel:   Enjoyable, being recorded made me be more careful about what I said. I want not be aware of it. Like how the coding unfolded. 3 min is plenty time

Gregor: Liked how the code unfolded;
        Noticed how big of a deal when the tests are **slow** - e.g. was the `str` correct? because the test result wasn't immediate we went to chatGPT; 
        Happy about recording, and excited how it might affect our retro later

### How did that feel?

### What worked well, we want to do more of it?

### Ideas

-   Consider creating a backlog item if the idea is something we want to implement in a future mobbing session in [global backlog](../docs/backlog.md)
    for an idea (that was generated at this retro).

## Summary (Generated by ChatGPT)

Useful command for today's changes:

```shell
git diff --ignore-all-space `git log --since="1 day ago" --pretty=format:%H | tail -1`
```

Useful prompts:

```
Here are all the changes made to the repo during a single mob programming session

could you please summarize what happened?
what are some main points from the retro that was help at the end?
```

```
here are notes from today's mob programming session retro.
Infer values of the team.

{
    $notes    
}
```
