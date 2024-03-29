# Session Date: 2023-09-14

## Co-Authors

Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Work the Backlog (75 min.)

-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)

https://github.com/nitsanavni/cursor-approvals-kata

### How did that feel?
- Take a step back, take a step back, take a step back.
  - Felt like walking away from the thing we wanted to do.
  - Don't think it goes to waste, lots of learning going on.
- AIs are so versatile.
  - Understand the thing I want to do for me
  - Confident that we can get there
  - Need to build it in smaller steps
  - If we want it to do TDD we need to train it
- we didn't go that far today; but we're all set now
- surprised - previous time, we did not think to give it the test results; just assumed it was aware of it; wondering what will be the effect of providing test results
- was trying really hard towards working on a problem that doesn't have much data on the internet, to avoid bias
- last time I thought: "it should be able to figure out what the next step is" e.g. after a failing test - next step is to make it pass
- when we started test-driving `verify` - wanted to avoid any bias - let's only give it the essense of approvals; maybe that way we could even discover a completely new way of writing approval tests
- super curious about watching and participating in using ChatGPT or other tools to be the assitant to coding; excited about this
- even coming in late, still got to see something and get excited!
- Liked: very excited about this tool, looking forward 
- Interrested in continuing with these experiments
- My impression was that by writing the specs we got to a shared unterstanding
- throwing and using files added to the complexity
  - Would have liked to do something much simpler
- Like the IDea of pushing it how far it can go
- Like to see how that experiment goes

### What worked well, we want to do more of it?

- liked! iterate on the description of how we want to work - the TDD.md file +1
- Iterate on the working agreements we give to Chat
- Use files to give working agreements (include them in the prompt) +1
- Description Block using {} as in SudoLang https://github.com/paralleldrive/sudolang-llm-support/blob/main/sudolang.sudo.md
- Put a reminder to the backlog (turn on timer sound) +1
- Getting more IDeas from Nitsans SudoLang experiment
- Two different kinds of Experiments
  1: Hide your intentions
    - Can it find the pattern
    - Example for a fizz buzz description that doesnt tell the pattern "divisible by 3" but just inputs/outputs
      - https://cyber-dojo.org/kata/edit/kqYva5
  2: Give all intentions


### Ideas

- Need to be explicit about what the files mean
- TDD Machine https://github.com/nitsanavni/tdd-machine/tree/main
- https://cyber-dojo.org/kata/edit/kqYva5
- Class Room cyber dojo https://cyber-dojo.org/dashboard/show/2cdNGy
- Provide the Rule of 3 in our instructions for ChatGPT
  
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
here are notes from today's mob programming session retro

please summarize
and aslo - go up one or two levels asking "why?" (values, etc.)
```
