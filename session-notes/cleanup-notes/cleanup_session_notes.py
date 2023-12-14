# Python code for the specified tasks

import re
import os
import shutil
import sys

def get_date_from_filename(filename):
    match = re.search(r'(\d{4}-\d{2}-\d{2})', filename, re.IGNORECASE)
    return match.group(1) if match else None

def slurp_file(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        return None

def contains_inactive_coauthors(contents):
    return bool(re.search(r'^#+\s*Inactive Co-Authors', contents, re.IGNORECASE | re.MULTILINE))

def contains_active_coauthors(contents):
    return bool(re.search(r'^#+\s*Active Co-Authors', contents, re.IGNORECASE | re.MULTILINE))

def contains_session_date(contents):
    return bool(re.search(r'^#+\s*Session Date', contents, re.IGNORECASE | re.MULTILINE))

def delete_inactive_coauthors(contents):
    return re.sub(r'^#+\s*Inactive Co-Authors.*?(?=^#|\Z)', '', contents, flags=re.IGNORECASE | re.MULTILINE | re.DOTALL)

def normalize_coauthor_heading(contents):
    return re.sub(r'^#+\s*.*Co-Author.*', '## Co-Authors', contents, flags=re.IGNORECASE | re.MULTILINE)

def cleanup_file(filename):
    original_contents = slurp_file(filename)
    if original_contents is None:
        print(f"File not found: {filename}")
        return

    contents = original_contents
    date_as_string = get_date_from_filename(filename)

    if not contains_session_date(contents):
        contents = f"# Session Date: {date_as_string}\n" + contents

    if contains_active_coauthors(contents) and contains_inactive_coauthors(contents):
        contents = delete_inactive_coauthors(contents)

    contents = normalize_coauthor_heading(contents)

    if contents == original_contents:
        print(f"No changes were needed for the file: {filename}")
    else:
        print(f"Changes were made to the file: {filename}")
        new_filename = filename + ".new"
        with open(new_filename, 'w') as new_file:
            new_file.write(contents)
        shutil.copystat(filename, new_filename)
        original_backup_filename = filename + ".original"
        os.rename(filename, original_backup_filename)
        os.rename(new_filename, filename)
        print(f"You can view changes by issuing this command: diff -u {original_backup_filename} {filename}")

def main():
    for filename in sys.argv[1:]:
        cleanup_file(filename)

if __name__ == "__main__":
    main()
