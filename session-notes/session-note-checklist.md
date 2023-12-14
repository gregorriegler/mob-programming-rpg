# Updating this file for a new session

The point of this is to list all manual steps that we have to do in a session as a reminder, and get rid of them by automating them later.

Start of Session
- If new participants, add them both to (1) daily file and (2) template file
   (While template is open, float active participants up in the list)

During Session
As work proceeds
- Update backlog and WIP
- Copy Co-authors from here to commit message

Close of Session
- Remove "Inactive Co-Authors" section completely (to prevent spurious github changes)
- Remove this whole "Updating..." section, leaving "Session Date" at top of file
- Add notes for retro
- Add ideas for next time
- Commit final change
- confirm that the automation worked (cleanup script of session notes which should be a commit hook)
- (Maybe) delete Gitpod.io work space
