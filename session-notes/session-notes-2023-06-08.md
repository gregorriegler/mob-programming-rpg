# Co-Authors (This Session)

## Active Co-Authors

Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: David Campey <campey@gmail.com>

## Inactive Co-Authors

Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: arrockt <cariari385@gmail.com>
Co-Authored-By: Austin Chadwick <austin.chadwick11@gmail.com>
Co-Authored-By: Blessed538 <blesseddominic98@gmail.com>
Co-Authored-By: Eddie Bush <eddie@craftsmanshipcounts.com>
Co-Authored-By: Gabriel Mbaiorga <gabrielmbaiorga@gmail.com>
Co-Authored-By: Idan Melamed <idanmel@gmail.com>
Co-Authored-By: Rea <reasu@protonmail.com>
Co-Authored-By: Tsvetan Tsvetanov <cpi.cecko@gmail.com>
Co-Authored-By: Willem Larsen <willemlarsen@gmail.com>
Co-Authored-By: David Campey <campey@gmail.com>
Co-Authored-by: Zac Ball <zac156@gmail.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

### How did that feel?

Diana - felt good today.

Liked! Diana timeboxing, like lean coffee - after 2min - "do we want to keep talking about this?"

Liked! Michael suggestion to time the Driver - might be interesting to experiment with that - maybe having a separate timer for the Typist.

Also - would be nice to go back to 4min Talking rotation.

Rotating Typists slower - less friction to rotate, leading to more flow

Rotating Typists faster - feels more alive, theater "I'm David and I'm typing..."

#### Interruptions / Bias to Action

Many interruptions and talking over each other, not a lot of "air space", but helpful towards bias to action. e.g. Speaker taking control and going forward w/o stopping. May feel rude, but also may be effective.

"overlapped speaking"

[The Church of Interruption](https://sambleckley.com/writing/church-of-interruption.html) - good read - exploring this tension, considering different cultures; There're quadrants. (waiting for others to finish / ) - how to navigate all these different styles.

Is it ok to have parallel speech? We should be explicit about this.

"I've noticed you were interrupted, how was it for you?"

Passing the ball around quickly, many inputs, fluid conversation - success!

It was confusing at first trying to figure out what mob was doing (as I joined late).

-   Mob time had top goals.
-   Maybe RPG timer was doing that.
-   Eventually found work in backlog.

Progress felt slow (near the end of session - deciding next step after ProgressBar refactor).

Felt like the intention from last session was <good> because "TODO" was left in code. (+1)

We are feeling smooth about where to look. Well oriented.

Suggestion for progressBar becoming react component. Didn't know all of what it was. Still curious about implications.

Pattern: extracting react components. It makes code MUCH more readable. Instead of "<div ...>", seeing "{progressBar}" feels more natural. More compact. More understandable. A real simplifier.

Confused about whether to look at backlog or last week's notes to find next action.

Nitsan not sure if facilitation was pushy when Diana asked question to group. It worked fine for Diana.

Insight: When mobbing you learn more than if you coded it yourself. You HEAR intent and SEE execution. Lacking \_\_\_\_ you might not realize intent.

Strengthening of ^^^: Even if only 1 person does not understand, it is helpful to STOP. It's not only valuable to person who now understands something new, it strengthens others' understanding because they have to explain it (and therefore know it better)

Yes, and... When someone uses turn for asking questions. That moment!!! It doesn't have to be during a term (mor specifid) because HEAR intent and SEE execution.

When talker clearly states intent (WHY), it strengthens understanding so that the execution (HOW) is more clear.

It is like Nullable Hypothesis. Strong statement BEFORE action improves learning.

### What worked well, we want to do more of it?

David contributing value right away, verbalizing very clearly his reasoning and inner thinking. (e.g. where should we put the ChatGPT summary?)

Combining "How/What" and "Why" - e.g. "use double-hashes in markdown (how) to make it go up a level (why)."

One more example - "we should put it in the same file (what), so there's only a single place to look (why)."

Pattern - identify a _need_, and only then address _it_.

Newcomers - add value without disrupting, it's a skill. Good work David!!

"What is the request?" - Prompting the Talker to verbalize and integrate the mob's intention.

Noticing the 'Save All' button.

Reading by refactoring.

Updating "next" in backlog.

Putting "[ ]" in last session notes makes it easier to find, prioritize, and do.

2-minute rule (from GTD) worked (even as 2x) to time box an item (then put it on backlog).

### ChatGPT Summary

The mob programming session primarily dealt with code readability and documentation improvements. Here's a summary:

1. **VSCode Settings**: A new setting was added to the VSCode configuration to allow for the spelling of domain-specific words like "rpgui".

2. **Backlog Updates**: A new task was added to consider adding domain words to the cSpell dictionary. Furthermore, the team marked as completed the extraction of the progress bar as a component, indicating their ongoing efforts towards making the codebase more modular and maintainable. There's also an ongoing task to consider extracting more components for better code readability and structure.

3. **Session Notes**: The notes for the sessions on 2023-06-01 and 2023-06-08 were updated, highlighting the active and inactive co-authors, the metaphoric agenda for the sessions ("Walking in the woods"), and the reflections or retrospectives on how the sessions felt and what worked well.

From the retrospectives:

-   The team had mixed feelings about the momentum of their sessions; some felt they started slow but then gained speed, leading to more productivity than expected.
-   They also observed a tendency towards "bias to action" with many inputs, fluid conversation, and quick passing of tasks. However, they noted that there were many interruptions and overlapping speaking, which they agreed to navigate more effectively in future sessions.
-   They found value in extracting components for better readability and understanding of the code.
-   Newcomers were able to add value without disrupting, and the team encouraged the explicit verbalization of reasoning and intentions during the programming process.
-   There was a suggestion to implement the auto-save setting to avoid having to manually save files.
-   Finally, there was an idea to pay more attention to the spelling of domain words and possibly adding these to the cSpell dictionary.

These discussions during the retrospective highlight the team's continuous drive for process improvement, maintaining open communication, and their strong focus on code quality.

### Ideas

-   Consider creating a backlog item if the idea is something we want to implement in a future mobbing session in [global backlog](../docs/backlog.md)
    for an idea (that was generated at this retro).

-   Consider paying attention to blue lines (from cspell). Especially if they relate to domain language. (e.g. RPG_ui)

-   [ ] Add domain words to cspell(1) dictionary. It may (or may not) get checked in (or ignored as part of IDE or .ignore).

-   [ ] auto-save setting, to avoid having to manually save files
