#!/bin/bash

# Determine the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SESSION_NOTES_DIR="$SCRIPT_DIR/session-notes"

# Get today's date
TODAY=$(date +"%Y-%m-%d")

# Find the latest session notes before today, sorting in descending order and picking the topmost
LATEST_NOTE=$(find "$SESSION_NOTES_DIR" -type f -name "session-notes-????-??-??.md" \
    | grep -E "$SESSION_NOTES_DIR/session-notes-[0-9]{4}-[0-9]{2}-[0-9]{2}.md" \
    | sort -r \
    | grep -v "$TODAY" \
    | head -n 1)

if [[ -z "$LATEST_NOTE" ]]; then
    echo "No previous session note found!"
    exit 1
fi

# Create or update the symlink
SYMLINK_PATH="$SESSION_NOTES_DIR/_previous-session-notes.md"

# Remove the symlink if it already exists
[[ -L "$SYMLINK_PATH" ]] && rm "$SYMLINK_PATH"

# Create a new symlink
ln -s "$LATEST_NOTE" "$SYMLINK_PATH"

# Feedback to the user
echo "Symlink created/updated for $LATEST_NOTE"