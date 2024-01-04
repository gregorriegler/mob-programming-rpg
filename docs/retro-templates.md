# Micro Retro

### How did that feel?

### What worked well, we want to do more of it?


# 1 Minute Retro

### Say anything that would be useful in 1 minute


# Generate ChatGPT Summary

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
