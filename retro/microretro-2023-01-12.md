# Goal
- Bug: Game ID should be in the URL
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
- Game ID should be in the URL - this is blocking us from testing the game in multi-player mode
 - It works on the deployed enviroment (http://gregorriegler.com/mob-programming-rpg/pgh1xavnrx8), but not in our testing 
   environment (https://3000-gregorriegl-mobprogramm-dvv8izva1zo.ws-eu82.gitpod.io/)
- Allow the roles to be configurable (the ones shown in the "Help" page)

# Retro

## How did that feel?
- Easy to get into the project (nice intro)
- Sense of accomplishment (we found and fixed a bug)
- I like that in an ensemble you can always get something done in a single session
- Felt like I contributed
- Rushed (too quick)
    - 5 was a more honest timer of what we did
- Comfortably uncomfortable
- Got some stuff done
- Shared knowledge
- Excited (first contribution to open source) 
- Learned a lot (how to think about problems)
- Environment allows you to grow your piece
- Did not feel any pressure
- Felt a lot of pressure
    - First time so many (new) people BUT HAPPY!!
- Nervous but after a while and progress I felt calm
- Excited to accomplished somethink

## What worked well, we want to do more of it?
- The culture of "Yes, and" continue the thought of the previous talker
- Weird: Having a setup line in the test that doesn't survive in the end (it did not survive because we do not depend on it anymore, in prod code)
    - You test for behavoir, not for non-behavior, the behavoir changed so we didnt need to test for that line anymore.
- Should have ran all tests all the time
- Did not retro every 30 minutes
    - Saving retro to the end but allow questions in the middle    
- Good experiment with the physical timer
- Everybody shared their screen made rotating easier
- Too much happening on screen to have the timer of the screen to
- Saw people asking questions when things are unclear, I like when that happens
- Everybody shares their screen
    - Helpful to see a Talker's screen too
    - If anybody has issues, we can see what they see on their screen
- No Windows    

## Idea
- Rotate the timekeeper

M
- Everyone sharing screen.  Makes it easier to rotate.
https://github.com/gregorriegler/mob-programming-rpg/commit/5a24060cf37d98b938625b3c2a1cfa1cf10cf983

