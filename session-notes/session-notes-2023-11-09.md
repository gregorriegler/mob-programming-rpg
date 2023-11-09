# Session Date: 2023-11-09

## Active Co-Authors
Co-Authored-By: Blaise Pabon <blaise@gmail.com>
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: Idan Melamed <idanmel@gmail.com>
Co-Authored-By: Llewellyn Falco <llewellyn.falco@gmail.com>

## Inactive Co-Authors
Co-Authored-By: arrockt <cariari385@gmail.com>
Co-Authored-By: Austin Chadwick <austin.chadwick11@gmail.com>
Co-Authored-By: Blessed538 <blesseddominic98@gmail.com>
Co-Authored-By: Eddie Bush <eddie@craftsmanshipcounts.com>
Co-Authored-By: Gabriel Mbaiorga <gabrielmbaiorga@gmail.com>
Co-Authored-By: Rea <reasu@protonmail.com>
Co-Authored-By: Tsvetan Tsvetanov <cpi.cecko@gmail.com>
Co-Authored-By: Willem Larsen <willemlarsen@gmail.com>
Co-Authored-By: David Campey <campey@gmail.com>
Co-Authored-by: Zac Ball <zac156@gmail.com>
Co-Authored-By: Kitastro <admin@metafor.co.za>
Co-Authored-By: Woody Zuill <wzuill@yahoo.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

We did look through GoL implementations of Diana from her in-person pairing with Llewellyn after the Coderetreat.
Code: https://github.com/4dsherwood/GameOfLife_OutsideIn_Python_multiple_implemetations

### Observations
- Proving that the interface was robust, the tests where not changing but we had different kinds of implementation.
- TDD Mindset, saw 3 minutes checkins
- Interresting was the "lazy" implementation
- Probe the limits of the "lazy" implementation
- Ivett introduced the "lazy" implementation to Llewellyn
- Its not only about the depth of recursion, but also about the breadth
- Depending on what you want it can be faster
- Functional. We are always returning functions
- The infinite aspect
- Its runtime constrained
- A GPU solution with arrays feels right. The "always" and the "only"
- Sparseness
- We started discussing Outside-In, this is where this all started.

- Gregor - Excited to get back to X.  Was excited to move forward with Y.  It's OK to follow the flow.
- Nitsan - It is not _all_ free-for-all.  We do have a structure.  We can dance in that structure.
- Gregor - Likes following whatever is interesting (game, AI tools, TDD).  Concerned that newcomers were not included appropriately.
- Diana - She did not notice right away.  When she did notice, she called it out.
- Llewellyn/Diana "pairing" \
  
  It was like like dedicated-driver.

  Idea - What about lean coffee to get input from everyone.

  Lean Coffee -- An agendaless form for a meeting where ideas are generated early by everyone, then dot voted for what to do first, then continually agreed on whether to sata on similar item or move to next one.

There are a few parts of lean coffee.  One part is up front idea generation.  Another part is the "roman voting" on where to put (or move) focus.





TO DO-
Bonding?  - michael/gregro get back to this
Bonding worked well.
By just going to the backlog, we wouldnt have gotten where we went
Its an inclusive open,closed (diverge,converge) pattern
How we treat people.
Want to be fair and welcome to everybody joining

Collaboration Patterns
- Allow ourselves the space to drive the wave rather than just doing the backlog
- Backlog doesnt have as much passion/energy
- Getting into analyzing mode
- Penguin Pebbling
  - Find it Effective
  - Talking kills the mob.
    - Instead of discussing better choose an option and try
- Types of talking
  - Done a lot of stuff, and now everybody has a lot of questions (retroactive)
- Digesting (Just digest)
- The exact people showing up all the time VS not the exact people showing up (consistency of the group)
- 

How to start is context-sensitive, depending on who shows up.  

Heuristic? -- If more than 4, lets' do lean coffee to check passion/intent.

ChatGPT for TDD!  Does it work for Approvals?
  - Llewellyn assumed no.  
  - Nitsan countered with "LLM is good for approbals because it's human language".  Nitsan has found interesting patterns.
  - Grgor noticed that by trying to solve well-known problem, we were not sure if ChatGPT was answering our question or providing the well-known solution.  How do we use ChatGPT for novel problems.  Gregor would be interested to explore this more.
  - Llewellyn - Has had success in 'rename' refactoring.  Not so much on other transformations.



* Side conversation on ChatGPT doing refactoring

Llewellyn shared code.
and prompt ("Find and execute refactorings")

Nitsan - You did 4 things wrong
1. Started with *hard* problem, not a *small* problem.  Outside in.  Maybe inside out is easier to accomplish.

Nitsan - This is how I'm thinking about this.
- What do I need?
- Line ranges.
- .... (sidelined conversation)

"Find a single section of this long method that can be extracted (i.e. has repeated code)
"Then do it"
To do it, we need line range (possibly selected by mouse (like IntelliJ expects))
Proposal - Make smaller steps
- Smaller code.

Problem - Engineer the prompt (that, secondarily, solves the problem)


Different problem vs Smaller problem


Goal: Learn how to prompt
Anti-goal: Make it solve a specific problem
Context: There are _many_ problems to solve.
Ergo: We need to decide which problem to solve
Suggestion: Iterate around teaching that 'do not break for loop'.  Because when it breaks a for loop, it ixposes a bug in our prompt.

Iteration... by giving it a counter-example, we can 'teach' it how to not break expressions that it does not know are illegal, but that we do know are not legal.

Add subheadings
- Formatting
- Examples
- Code Block
- 

See also: Diana's Google Doc - https://docs.google.com/document/d/10HvnTC64ItGhWEzuS_aWhRHyNlXv5ME6s18K2IahhAs/edit




  - 


### How did that feel?
- Cool
- Took a side conversation, made it the main course of this session
- Surprised how easily I could set cells alive in it 
  - The seed is just a function
    - Modulo makes for a checker board
    - Every 10 by 10, can make a glider
- Not following the procedure
- Uncomfortable to follow too much passion
- No votes, etc. just followed the passion. Surfing

### What worked well, we want to do more of it?

### Questions
- Still want to know the number when it times out
  - Want to know numbers, limits
  - Want to prove it empirically

### Ideas
- Could have checked if this was ok with everyone
- Could have welcomed people, do checkins earlier
- There are plenty of optimizations
  - Caching

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




