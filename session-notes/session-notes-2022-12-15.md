# Goal

- curios to test the rotation issue again manually
    - fix failing ci (test)
        - hard-coded path to npm in the test
    - deploy to heroku (automatically)
- Test: 'two games with the same init game - same players' passes but the process is hanging on CI
- Game ctor should use props obj iso multi params
- !! potential bug: rotate button should not use rotateToTarget
- !! remove old and then unused rotate functions
- automate committing WITH coauthors. for example: create a script to commit with given co-authors, and then use it all the time
    - gitpod should be able to get the co-authors from github api
- create a GitHub issue on gitpod - "follow" another user on https://github.com/gitpod-io/gitpod/issues


# Retro

## How did that feel?
- a bit more comfortable now; had some back-and-forth with the CI and the tests; got an overview, feeling more comfortable with the project
- many learnings: options, rebasing a HEAD commit
- surprising to be able to make progress while including a completely new member
- glad we fixed the bug :) +1
- very short time to 1. fix problems 2. deploy 3. validate +1
- because of mobbing, easier to onboard on a project he has never worked on +1

## What worked well, we want to do more of it?
- able to make progress and resolve problems while including a new person to the mob
- copying the backlog from the previous retro notes
- using the retro files to orient ourselves

## Idea
- Bug: when we changed the timer - we deleted a player
- Bug: running the app on gitpod - did not yield a GameId in the URL
- Discuss the release process (what do we do about heroku? probably switch service)