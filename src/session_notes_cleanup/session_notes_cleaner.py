import os
import re
import shutil
import sys


class SessionNotesCleaner:
    def __init__(self):
        pass

    def contains_inactive_coauthors(self, text):
        return bool(re.search(r'^#+\s*Inactive Co-Authors', text, re.IGNORECASE | re.MULTILINE))

    def delete_inactive_coauthors(self, text):
        return re.sub(r'^#+\s*Inactive Co-Authors.*?(?=^#|\Z)', '', text,
                      flags=re.IGNORECASE | re.MULTILINE | re.DOTALL)

    def contains_active_coauthors(self, text):
        return bool(re.search(r'^#+\s*Active Co-Authors', text, re.IGNORECASE | re.MULTILINE))

    def standardize_coauthor_heading(self, text):
        return re.sub(r'^#+\s*.*Co-?Author.*', '## Co-Authors',
                      text,
                      flags=re.IGNORECASE | re.MULTILINE)

    def get_date_from_filename(self, filename):
        match = re.search(r'(\d{4}-\d{2}-\d{2})', filename, re.IGNORECASE)
        return match.group(1) if match else None

    def slurp_file(self, filename):
        try:
            with open(filename, 'r') as file:
                return file.read()
        except FileNotFoundError:
            return None

    def contains_session_date(self, text):
        return bool(re.search(r'^#+\s*Session Date', text, re.IGNORECASE | re.MULTILINE))

    def cleanup_contents(self, text, session_date):
        if not self.contains_session_date(text):
            text = f"# Session Date: {session_date}\n" + text
        if self.contains_active_coauthors(text) and self.contains_inactive_coauthors(text):
            text = self.delete_inactive_coauthors(text)
        text = self.standardize_coauthor_heading(text)
        return text

    def cleanup_file(self, filename):
        original_contents = SessionNotesCleaner().slurp_file(filename)
        if original_contents is None:
            print(f"File not found: {filename}")
            return

        contents = original_contents
        date_as_string = self.get_date_from_filename(filename)
        contents = self.cleanup_contents(contents, date_as_string)
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
    cleaner = SessionNotesCleaner()
    for filename in sys.argv[1:]:
        cleaner.cleanup_file(filename)


if __name__ == "__main__":
    main()
