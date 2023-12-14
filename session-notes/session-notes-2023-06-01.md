# Session Date: 2023-06-01
## Co-Authors

## Co-Authors

Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: David Campey <campey@gmail.com>
Co-Authored-by: Zac Ball <zac156@gmail.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)
-   We will use the metaphor of - "Walking in the woods" - for today's session.

### Metaphor of - "Walking in the woods" - for today's session.

Grounding. Connecting with nature. Green. Soothing. Green living
spaces. Calming. Alive.

Safe. Relaxing. Home. Fresh air. Good ideas. Lots of content (for
talks).

Always something unexptcted to find and enjoy.

Finding something that has always been there
And i find something new and unexpected

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

### How did that feel?

-   slow to get momentum (+1) - slower than wanted - but then faster than expected (but not faster than wanted)
-   similar to the walk in the park
    -   see something new that never noticed before
    -   see something new and can't unsee it, didn't go looking for it
-   not having an expectation, then finding and following it
-   back/forth quick passing worked well
-   glad got something done, actually did improvements
-   didn't get very much done, wished got into flow sooner
-   learned some new things
    -   new perspective on destructurising - law of demeter
    -   principle of least knowledge
    -   typescript, and defining types in the syntax
    -   lift ticket kata - database coupling
-   observed: Gregor is very skilled at being in a mob, doing many subtle things maybe not not consciously
    -   e.g. Michael was the talker and asked me if I knew, and he then said "Michael(talker) would you like me to tell you what I see?"
    -   great job to defer to the person who is talking
    -   seeing the sistinctions of the roles, when good to talk, when not
    -   example of invitation, not a demand.
    -   could say yes/no
    -   non-violent == consequences of the reqeust i.e. no consequence
    -   veiled demand
-   my skill to see people's skills and let them know it
    -   David noted this
    -   and be cautious not to over-do it feel serotonin when I do it
-   2nd half, hand-offs really quick,
    -   light-weight intent helped that
    -   have seen heavy weight in the past
-   liked typist rotation stating time, general let's aim for without having two timers going
    -   great open space facilitation - "whatever happened is the only thing that could have"
    -   he had a system, but said "okay" when the request was made.
    -   So long as not walking over you when you really care.
-   example in the beginning agreed to have a longer typist
    -   fit into everyone type for the same amount of time
    -   demanded I also get to type
    -   will let us know when want something
    -   example with piece of paper - let me know what you want - both have to put pressure on it
    -   if I step away, then it will fall
    -   Andrea Brandt - [Mindful Anger](https://www.goodreads.com/book/show/17986443-mindful-anger), 8 keys to [] passive aggression
    -   Crucial conversations - flow of meaning into the pool -
-   roosters at 3am - just birds talking - birdsong
-   give gift of getting into flow easier
    -   bonding up front nice, middle bit felt not like bias for action
    -   if do less of that can get more into flow
    -   like lean coffee mechanism thumbs
    -   hope template improvements will not take as much time
    -   had to stop when on a roll
-   helped flow: michael said - "state current intention" at the end
    -   helped the hand-offs
    -   instead of "stop talking", more "hand on the baton"
    -   great to see the hand-offs
-   observations: new guest Zac
    -   great to see code
    -   mesmerising to see retrospective, even though a fly on the wall
-   how the communication unfolds
    -   how speaking to each other, almost invited into it,
    -   no one was like who are you, what are you doing? rather let me be.
    -   trying to get my head aroud "what is this"
    -   nice to experience first hand
-   great retro many interesting observations, ideas on NVC (Non-Violent Communication), psychology, new books
-   Metaphors we live by
    -   https://www.amazon.com/Metaphors-We-Live-George-Lakoff/dp/0226468011/ref=sr_1_1?keywords=metaphors+we+live+by&qid=1685625691&sr=8-1
    -   "Welfare mom" story about the city - not clean language, like "deadbeat dad"
    -   He who controls the frame, controls the conversation
    -   Could choose different frames, the metaphors are huge
    -   Ontological Coaching - https://www.linkedin.com/pulse/what-so-special-ontological-coaching-alan-sieler/
    -   Diana is trained in that! Doesn't surprise Gregor :)
-   Take a walk in the woods, to discover things that were there all the time
-   Today's session was like a walk in the woods like:
    -   your background - view, and sounds. Quickly noticed it was real
-   good ideas are part of it
-   Created a safe space, we were vulnerable, allowed us to hear and share true and authentic experiences with each other
-   "Thank you, you bring your whole self"
-

### What worked well, we want to do more of it?

### Ideas (for future backlog items)

-   Consider creating a backlog item if the idea is something we want to implement in a future mobbing session in [global backlog](../docs/backlog.md)
    for an idea (that was generated at this retro).

## Summary (Generated by ChatGPT)

The changes made during the mob programming session were primarily focused on code refactoring and documentation updates. Here's a summary:

1. **Code Refactoring**:
    - In `PlayerDisplay.tsx`, a minor change was made to replace the unused variable `item` with `_` in the `Array.map()` function.
    - In `RoleSheet.tsx`, the function's parameter was refactored. Instead of directly destructuring the props in the function parameters, a new type named `AppleSauce` was defined to represent the props, which was then used as the type of the function parameter. This was done to enhance code readability.
    - A TODO comment was added to indicate the need to extract the progress bar as a separate component for better code organization and maintainability.
2. **Backlog Update**:

    - An update was made to `backlog.md` indicating the intent to refactor the codebase and make the target area of code more readable, including a potential task to extract the progress bar as a component. This shows that the team is focusing on improving the quality of the codebase for better maintainability.

3. **Session Notes Addition**:
    - Two session notes were updated (`session-notes-2023-06-01.md` and `session-notes-2023-MM-DD.md`), detailing the contributors, the agenda of the sessions, their outcomes, and reflections.
    - These updates show the team's commitment to documentation and maintaining transparency of the development process.

The retrospective after the session highlighted several key points:

-   The team felt that the session started slow but gained momentum, leading to faster progress than expected. They also expressed a wish to get into the flow of work sooner in the future.
-   Team members appreciated the quick passing of tasks and the improvements made during the session.
-   They learned new things during the session, such as new perspectives on destructurising, the law of demeter, the principle of least knowledge, TypeScript syntax, and about database coupling through the lift ticket kata.
-   They discussed Non-Violent Communication (NVC) and psychology, showing a focus on maintaining good team communication and dynamics.
-   They also discussed the metaphor of the session being like a walk in the woods, which symbolized a journey of discovery.
-   They appreciated the fast typist rotation and the use of lightweight intents.
-   Finally, they discussed potential future improvements, including getting into a flow state faster, reducing upfront bonding time, and improving template usage.
