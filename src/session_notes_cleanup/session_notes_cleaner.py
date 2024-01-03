import os
import re
import shutil
import sys

inactive_co_author_header_pattern = r'^#+\s*Inactive\s(Co-Authors)?.*$'
active_co_author_header_pattern = r'^#+\s*(Active Co-Authors|Co-Authors \(This Session\)).*$'

# TODO
# - Return codes similar to diff(1)

class SessionNotesCleaner:
    def __init__(self):
        pass

    def contains_inactive_coauthors(self, text):
        return bool(re.search(inactive_co_author_header_pattern, text,
                              flags=re.IGNORECASE | re.MULTILINE))

    def delete_inactive_coauthors(self, text):
        return re.sub(r'^#+\s*Inactive Co-Authors.*?(?=^#|\Z)', '', text,
                      flags=re.IGNORECASE | re.MULTILINE | re.DOTALL)

    def contains_active_coauthors(self, text):
        return bool(re.search(active_co_author_header_pattern, text,
                              flags=re.IGNORECASE | re.MULTILINE))

    def standardize_coauthor_heading(self, text):
        # Co-Authors (This Session)
        # Active Co-Authors
        # active_co_author_search_pattern = r'^#+\s*((?:Active\s+)?)Co-?Authors.*$'
        active_co_author_search_pattern = active_co_author_header_pattern
        active_co_author_replace_pattern = r'## Co-Authors'
        standardized_text_for_active_authors = \
            re.sub(active_co_author_search_pattern, active_co_author_replace_pattern, text,
                   flags=re.IGNORECASE | re.MULTILINE)

        # Inactive Co-Authors
        # Inactive
        inactive_co_author_search_pattern = inactive_co_author_header_pattern
        inactive_co_author_replace_pattern = r'## Inactive Co-Authors'
        standardized_text_for_active_and_inactive_authors \
            = re.sub(inactive_co_author_search_pattern, inactive_co_author_replace_pattern,
                     standardized_text_for_active_authors,
                     flags=re.IGNORECASE | re.MULTILINE)

        return standardized_text_for_active_and_inactive_authors

    def remove_coauthor_headings(self, text):
        # Regular expression to match 1st and 2nd level headings with "Co-Authors"
        # Assumes Markdown formatting where 1st level is '# ' and 2nd level is '## '
        standard_text = self.standardize_coauthor_heading(text)
        pattern = r'^#{1,2}\s*Co-Authors.*$\n?'
        cleaned_text = re.sub(pattern, '', standard_text,
                              flags=re.IGNORECASE | re.MULTILINE)

        return cleaned_text

    def add_coauthor_heading_before_co_authored_by_list(self, text):
        search_pattern = r'^(Co-Authored-By.*)$'
        replace_pattern = r'## Co-Authors\n\1'
        cleaned_text = re.sub(search_pattern, replace_pattern, text,
                              count=1,
                              flags=re.IGNORECASE | re.MULTILINE)
        return cleaned_text

    def get_date_from_filename(self, filename):
        match = re.search(r'^session-notes-(\d{4}-\d{2}-\d{2}).*[.]md$', filename)
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
        text = self.standardize_coauthor_heading(text)
        # if self.contains_active_coauthors(text) and self.contains_inactive_coauthors(text):
        text = self.delete_inactive_coauthors(text)

        text = self.remove_coauthor_headings(text)
        text = self.add_coauthor_heading_before_co_authored_by_list(text)
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
            print(f"# No changes were needed for the file: {filename}")
        else:
            print(f"# Changes were made to the file: {filename}")
            new_filename = filename + ".new"
            with open(new_filename, 'w') as new_file:
                new_file.write(contents)
            shutil.copystat(filename, new_filename)
            original_backup_filename = filename + ".original"
            os.rename(filename, original_backup_filename)
            os.rename(new_filename, filename)
            print(f"# You can view changes by issuing this command:\ndiff -u {original_backup_filename} {filename}")


def main():
    cleaner = SessionNotesCleaner()
    for filename in sys.argv[1:]:
        cleaner.cleanup_file(filename)


if __name__ == "__main__":
    main()
