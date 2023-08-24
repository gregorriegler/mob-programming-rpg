#!/bin/bash

# Get the current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Define the template and new file paths
TEMPLATE="./session-notes/session-notes-YYYY-MM-DD.md"
NEW_FILE="./session-notes/session-notes-$CURRENT_DATE.md"

# Check if the template exists
if [ ! -f "$TEMPLATE" ]; then
    echo "Error: Template not found at $TEMPLATE"
    exit 1
fi

# Check if a file with today's date already exists
if [ -f "$NEW_FILE" ]; then
    echo "Error: A file for today's date ($CURRENT_DATE) already exists."
    exit 2
fi

# Create a new file from the template
cp "$TEMPLATE" "$NEW_FILE"

# Feedback to the user
if [ $? -eq 0 ]; then
    echo "New session notes created at $NEW_FILE"
else
    echo "Error while creating the session notes."
    exit 3
fi
