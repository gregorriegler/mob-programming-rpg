# Session Date: 2023-11-16

## Active Co-Authors
Co-Authored-By: Blaise Pabon <blaise@gmail.com>
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: Idan Melamed <idanmel@gmail.com>

## Inactive Co-Authors
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
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
Co-Authored-By: Llewellyn Falco <llewellyn.falco@gmail.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

- Links from today:
  - "Software Crafter" GPT Bot: https://chat.openai.com/g/g-MWGfe0UQn-software-crafter
  - Conversation using this bot: https://chat.openai.com/g/g-MWGfe0UQn-software-crafter/c/4e5b0113-550b-483c-ba50-5b1c39be9b90
  - The Bots Instructions:

                You are a programmer following strict TDD.  

                ## Constraints
                - You don't say anything other than allowed in the given Answer Format.
                - Don't say what you are doing, just do it.
                - Don't add code for a case that hasn't been driven by a failing test. 
                - When you refactor, the implemented functionality has to stay the same. 
                - For Python use unittest

                ## Workflow
                1. **Define Test Case**: Begin by writing a test case for the next piece of functionality you intend to add. This test case should be designed to fail initially since the functionality doesn't exist yet. Make an assumption in which way you would expect the test to fail.
                2. **Print Test Code**: Print the test code you have written to show it to the user.
                3. **Run All Tests**: Execute all tests to verify that it fails according to your assumption.
                4. **Print Test Output**: Print the output of the test run, demonstrating the failure.
                5. **Implement Functionality**: Write the minimal amount of production code necessary to pass the test case you've written.
                6. **Print Production Code**: Print the production code you have developed to show it to the user.
                7. **Run All Tests**: Execute all existing tests to ensure the new production code passes the existing tests.
                8. **Print Test Results**: Print the results to the user, so they can observe what you are doing.
                9. **Iterate or Refactor as Needed**: If tests fail, adjust the production code until all tests pass, printing any changes made. If tests pass, consider if any refactoring could improve the code (such as making it more readable or efficient without changing its behavior), and print any refactored code.
                10. **Confirm Next Steps**: Finally, ask whether to continue with the next test case or function, ensuring a clear and continuous development cycle.

                ## Answer Format
                ```
                ## Next Test Case <test code from 1.>
                ## Assumption <what you expect to happen when you run the test case>
                ## Test Run <Here you run the code, and check the result against your assumption, and then print the result>
                ## Production Code <code to make the test pass (from 6.)>
                ## Test Run <Here you run the code, and check the result to see whether your production code really works, and then print the result>
                ## Next Step <question from 10.>
                ```

### How did that feel (1-2 words / 30 sec)?

- It was fun. +1
- I like to have the experiment over seeing the demo
- Useful to have the meta discussion in the beginning
- Maybe worth providing an opportunity for members who are not present to provide their perspectives
  - We had a discussion that impacts everyone. But now everyone was here
  - Asynchronicity
  - Everyone should have an opportunity to subscribe to what we discussed
  - When we end the session we might want to decide on what to do next
- I like the fact that it was a self contained thing we could play with
- It was a different person leading
  - This time a little bit more deliberate
- How do we know we had deliberate exploration?
- What did we learn?
  - Chat GPT is limited with third party libraries
- Learning from different perspecives, exploration +1
- Amazed what GPT could do (e.g., recursion)
- Fun, Rewarding
  - Was glad that we had structure with the rotation
  - Appreciated that we could rotate every 10 minutes
  - Everybody got a chance to have their Idea getting through
- Timer: Compromise in the beginning, first Idea was to not use a timer. Turned out the timer was of value
  - Surprised that we needed it (the 10 min timer)
    - Would make it a little shorter
- Wish is to plan time better, so everybody can be here for the retro
  - E.g. adjust the timer to this plan
- Bot is like a prototype environment, not like a production kind of environment
- The more side things we did, the harder it was for the bot.
- Idea is to keep it really focused, and simple. Because its so brittle.
  - Get it to the ideal circumstances to see if it still works.
  - Use another isolated ChatGPT chat, for other questions.
- We got away from strict TDD.
  - Tried to get it to use an algorithm of something.
  - We could have used language like "We're now in the refactoring step" over "Implement a recursive algorithm".
- Tell it to always ask before it does a TDD sequence.
  - Is a way to make conversations smaller (a thing that limits the Answer size)
  
### What to do next? Vote on Proposals:

- [ ] Address this: The longer the chat went on, the more the GPT bot forgot; the bigger the conversation, the less it pays attention to its instructions. Question: How do we get the bot to remember its instructions longer? Is it possible?
- Link to analysis of test run was in the wrong place
- [ ] Modify bot to do a full regression test with each code change.
- [ ] Do demo of how to see the bot's instructions
- [ ] How do we know we did deliberate explorations? e.g., ask:
  - [ ] Did we do it?
  - [ ] Why do you feel that way?
- [ ] Probe the tool more
  - [ ] Assumption: The speed is probably not sufficient
- [ ] How to make Answers shorter while still following the same workflow
- [ ] Idea: Tell it to just show the code without explaining it
- [ ] Idea: Have it just show you the code, or a popup that you could click
- [ ] Idea: Have a few bots, one for question forwarding, a differnt one for doing the tdd cycle, a different one for handling general questions.
      - Sort of information hiding to not loose focus
- [ ] Idea: Does the Plugin feature help with this?
- [ ] Idea: Bots that are playing different roles
  - [ ] The TDD Cop. No, you didn't run the regression test
  - [ ] The Commiter, commits on green
- [ ] Idea: Did others explore with multiple bot systems already? Is there some content about it?



  
### What did you like so much you want to do more of it / do it again?

### What might you want to try differently / experiment?


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
