#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Set the session-notes directory
DIR="$SCRIPT_DIR/session-notes"

# Get today's date in the format YYYY-MM-DD
TODAY=$(date +"%Y-%m-%d")

# Set the filename based on today's date
TODAYS_FILE="$DIR/session-notes-$TODAY.md"

# Set the symlink name
SYMLINK="$DIR/_todays-session-notes.md"

# Check if the file for today's date exists
if [ -f "$TODAYS_FILE" ]; then
    # Remove the old symlink if it exists
    [ -L "$SYMLINK" ] && rm "$SYMLINK"
    
    # Create a new symlink to today's file
    ln -s "$TODAYS_FILE" "$SYMLINK"
    echo "Symlink updated to point to $TODAYS_FILE"
else
    echo "Error: $TODAYS_FILE does not exist!"
fi
