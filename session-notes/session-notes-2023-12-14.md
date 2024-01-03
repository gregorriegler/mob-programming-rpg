# Session Date: 2023-12-14
## Facilitated by
 - Joel Silberman

## Co-Authors
Co-Authored-By: Nathaniel Herman <nathaniel.herman@gmail.com>
Co-Authored-By: Blaise Pabon <blaise@gmail.com>
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>

# Agenda

## Bond (15 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Discussing Mid Session Retro 15min
...
## Work the Backlog (75 min.)

### Items we could do
1. Review Pull Request from Michael
2. Continue Commit message generator
3. Show and Tell instead of review Michaels Pull Request
4. Align backlog and readme (overall doc) to reflect what we are doing (4)
5. Kata and record it and publish it
6. Continue Kata from last week (6)
7. Make GPT do something new

### We voted on // at 15:50
1. Continue [kata](https://cyber-dojo.org/kata/edit/EtbGU6) from last week 
2. Align backlog and readme (overall doc) to reflect what we are doing

Everybody has 3 points give me in chat like this: Examples: 123 or 111 or 445

---

## mid session retro at 16:26

(change direction? open ended)

Blaise - no input
Gregor - like the coding! and fluency of it. we have a drive, focus, getting to decisions quicker. still not very easy
Diana - like the flow, the way we're conducting our work, made space for people to see and observe how we work with each other
Michael - feel good about momentum. helping: Joel spoke out loud - "anybody can propose and speak, but the Talker decides. Keeps things moving.
Nathen - losing focus, then regaining. appreciate how people are clear and explaining. let's keep going
Nitsan - more friction than we have usual, but creating space for everybody which I like. I am ready to refactor the hell out of the code
Joel - like that we tied a 10m retro, pleased with the way it's going, like that we've picked up from last time


more notes from Diana:

Michael suggested:
<Let's do a small step> Make a helper function that is called is-divisible-by-15
Gregor: I hear the 15 suggestion and I want to just make a generic function
After we did implemented the “is-divisible-by” function

Gregor heard Michaels suggestion
And decided to go another way


Gregor as typer said: I still have my paste buffer


JOEL did well
Tre-state the timing
Do differently: make a specific request:
Gregor could you please check the code in?
Could be during his typing or as a sidebar

---


-   Consider checking the recent `git log -p`
-   Check the [global backlog](../docs/backlog.md)

## Leave Breadcrumbs (5 min.)

-   Update the [global backlog](../docs/backlog.md)

## Reflect / Retro (25 min.)
Format
1. Practice 10-minute (1 min/person) mid-session retro
2. More.  Old format || fre-form. 10 minutes.


### Round 1 - 10-minute (1 min/person) format
- Nitsan - Happy about many things.  Clojure+++.
  - Plus - Hearing all voices for decision making
  - Plus - Facilitation keeps us on track

- Nat - Continues to like TDD-talk and thought process.

- Gregor - Time-box retro forces prioritization.
  - Like - Strong facilitation.  Decisions quicker.
  - Like - Unstructured retro allows better answers.  Questions not needed.

- Joel - 
    - Worked well - typing proposal first
    - Intersting - how we got 6 to vote on.  Instead of finger voting.


- Michael 
  - Strong facilitation, shared leadership. Sometimes strong facilitation gets in the way, sometimes it helps.
  - Dont always like voting. 
  - Sometimes prefer voices. 
  - Happy about things going fast.  

### Round 2 - 

What might we do differently?

- Michael - Rotate facilitator (with goal of self-facilitation as a goal).
- Nitsan - Plus-one for Michael's proposal for rotating facilitator.  OK putting back training wheels.
- Gregor - Plus-one for rotating facilitator.
- Nate - Ditto
- Gregor - Allowing facilitation speeds up decision making.
- Michael - Yes... AND sometimes it slowed it down.
- Joel - SM-like-person's goal is to grow team's abilities.
  - Explicit role definitions (and goals) - Talker, Typer, Facilitator



What is structure for this next few minutes???

# Rotating facilitator

As we rotate facilitatiors, we will learn and experience different styles.  Will eventually "normalize".  Feedback to facilitator.  As goal to learn.

Observation - As facilitator, focus is different.  Not able to focus on chat.  Did focus on mob flow.  Didd consensus-building.  

Voting - Too much?  (Michael - YES!).  Does this imply non-alignment?  Important to balance talking vs doing.

Observation - It is helpful to do back-to-back facilitation to learn on 2nd turn.  Doing that could take a long time to roll back around.

Expectations of facilitator
- Delegating "helper roles" (e.g. timer, researcher)

Actions:
 - Get facilitator chosen early (either in previous session, or QUICKLY at beginning).
 - Nitsan will step up for next week.
 - Inspect-and-adapt for subsequent weeks.


# Other topics

- Nitsan
Would this session recording have been instructive to others?

Observation 
- Recording all, then finding good segments.  Good to hightlight some ideas
- There are no good videos out there to get a feel for what it is (other than reading.... but that's not the same as the experience).
- Pulling out segments to commett on would be helpful to others.
- ... and to ourselves (like sports teams)

Next step:
- Keep it in the backlog.
- Gregor will test solution for recording.


Joel
- We did not commit often enough to feel comfortable.

- Gregor
We used a failing test for many iterations.  It felt like ApprovalTests.

- Nitsan
Are there ways to refactor this code without failing tests?  The way Nitsan did it broke the test.

It's good to _stay_ in green.  It's comfortable.  But this time, it felt OK to stay in ~red~ orange state (red to guide on way to green).

Failing test can be guiding light.  Force.  Pulling forward.  Eventually need to make it pass.  But do it slowly (not ASAP).

For compiled languages, get to red (not yellow-uncompilable).  Stay in REPL(?) you can operate differently.  This evaluate/print loop gives the feedback loop differently from red/green/refactor.  But it's still using test to guide.  In this way, it's similar to approvals.

REPL (Read Evaluate Print Loop)

"Tiny steps take you a long way"
  -- Nitsan Avni






Roles:
 - Facilitator
 - Talker
 - Typer
 - Mob




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
