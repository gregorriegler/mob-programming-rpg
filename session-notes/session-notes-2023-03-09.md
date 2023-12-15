# Session Date: 2023-03-09
## Co-Authors
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Rea <reasu@protonmail.com>


# Links
1st session - 
2nd session - https://gregorriegl-mobprogramm-bgos20rvbrp.ws-us89b.gitpod.io/

# Agenda

-   Font change
    -   1. Where should we make the change in the code?
        -   It's inherited from the [`rpgui.min.css`](../webapp/public/rpgui.min.css) and in [`rpgui.css`](../webapp/public/rpgui.css)
    -   2. Refactor to localize font change to one spot (our spot, not RPG-UI's definition spot), extend, not modify (so that we do overriding of the original)
        -   revert our changes to original font + comment out the courier new change
        -   if it works -> uncomment
    -   3. Family & Size (maybe Roboto, or ChatGPT suggestions)

## Short Mid-session Retro

-   mobbing works! surprised
-   +1 Joel has a different style, but it still works, just works
-   Uncomfortable in the beginning, but got better as we went
-   liked - started with a specific GH issue about improving the font of the game
-   not only what font to use, but where to change it
-   many ideas about how to go about it
-   got better direction - "make it more readable"
-   change in one single place, w/o changing the 3rd party css file
-   "more than the sum of the parts"
-   used some AI in the process
-   very curious where this is going - are we under-utilising it?
-   happy to work with the team and new people


## Micro-retro at end of session #2
- Felt good to be here after a while.  Wished she could stay longer, but body was tired.
- Glad to see a visible change.
- In small group, it's still working.  Closer to pairing.  Liked it (with only 3).  Also liked 4 and 5 (before others dropped).
- Surprising to see so many folks in both sessions.  Exicting!
- Felt more tired than normal.
- Happy we organized today.  Was a good group effort.  
- Learned a lot about styling and fonts.
- With limited CSS knowledge, having 3 brains helped a lot.
- Different kind of work (instead of testing/refactoring).
- We like to change the ENV file to change locally, but that breaks production system.

## Bond

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Goals

-   Check the [global backlog](../docs/backlog.md)

## Reflect

### How did that feel?

### What worked well, we want to do more of it?

### Idea

-   Write your Ideas to the [global backlog](../docs/backlog.md)
