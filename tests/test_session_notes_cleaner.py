# test_session_notes_cleaner.py
import re
import unittest

from approvaltests import verify
from approvaltests.reporters import GenericDiffReporterFactory, ClipboardReporter, MultiReporter

from src.session_notes_cleanup.session_notes_cleaner import SessionNotesCleaner

# Set up ApprovalTests reporter(s)
default_reporter = GenericDiffReporterFactory().get_first_working()
# TODO - Set reporter for whole file/class
# from approvaltests.core import approval
# approval.DEFAULT_REPORTER = default_reporter

first_working_reporter = GenericDiffReporterFactory().get_first_working()
clipboard_reporter = ClipboardReporter()
# bc_reporter = GenericDiffReporterFactory().get("Beyond Compare")
preferred_multi_reporter = MultiReporter(first_working_reporter, clipboard_reporter)
preferred_multi_reporter = first_working_reporter


class TestSessionNotesCleaner(unittest.TestCase):
    # def setUp(self) -> None:

    # self.addCleanup(first_working_reporter.report)

    def test_initialization(self):
        cleaner = SessionNotesCleaner()
        # Add assertions here to test initial conditions
        self.assertIsNotNone(cleaner)

    def test_import_approvalTests(self):
        verify("approvalTests::verify is imported\n")

    def test_sample_file_has_no_trailing_whitespace(self):
        text = self.sample_file_contents()
        stripped_text = self.strip_trailing_whitespace(text)
        self.assertEqual(text, stripped_text)

    def test_contains_active_coauthors(self):
        text = self.sample_file_contents()
        cleaner = SessionNotesCleaner()
        self.assertTrue(cleaner.contains_active_coauthors(text))

    def test_contains_inactive_coauthors(self):
        text = self.sample_file_contents()
        cleaner = SessionNotesCleaner()
        self.assertTrue(cleaner.contains_inactive_coauthors(text))

    def test_delete_inactive_coauthors(self):
        cleaner = SessionNotesCleaner()
        text = self.sample_file_contents()
        clean_text = cleaner.delete_inactive_coauthors(text)
        verify(clean_text, preferred_multi_reporter)

    def test_normalize_coauthor_heading(self):
        text = ""
        text += "## Co-Authors (This Session)\n"
        text += "## Active Co-Authors\n"
        text += "\n"
        text += "## Inactive Co-Authors\n"
        text += "## Inactive\n"

        cleaner = SessionNotesCleaner()
        clean_text = cleaner.standardize_coauthor_heading(text)
        acceptance_text = f'Before\n{text}====\nAfter\n{clean_text}====\n'
        verify(acceptance_text, preferred_multi_reporter)

    def test_remove_coauthor_headings(self):
        cleaner = SessionNotesCleaner()
        text = ""
        text += "## Co-Authors (This Session)\n"
        text += "## Active Co-Authors\n"
        text += "\n"
        text += "## Inactive Co-Authors\n"
        text += "## Inactive\n"
        clean_text = cleaner.remove_coauthor_headings(text)
        acceptance_text = f'Before\n{text}====\nAfter\n{clean_text}====\n'
        verify(acceptance_text, preferred_multi_reporter)

    def test_add_coauthor_heading_before_co_authored_by_list(self):
        cleaner = SessionNotesCleaner()
        text = ""
        text += "## Facilitator\n"
        text += "Everyone\n"
        text += "\n"
        text += "Co-Authored-By: Manny\n"
        text += "Co-Authored-By: Moe\n"
        text += "Co-Authored-By: Jack\n"
        clean_text = cleaner.add_coauthor_heading_before_co_authored_by_list(text)
        acceptance_text = f'Before\n{text}====\nAfter\n{clean_text}====\n'
        verify(acceptance_text, preferred_multi_reporter)

    def test_get_date_from_filename(self):
        cleaner = SessionNotesCleaner()

        # Test with valid filenames
        self.assertEqual(cleaner.get_date_from_filename("session-notes-2022-10-20.md"), "2022-10-20")
        self.assertEqual(cleaner.get_date_from_filename("session-notes-2021-01-01.md"), "2021-01-01")
        self.assertEqual(cleaner.get_date_from_filename("session-notes-2021-01-01-part2.md"), "2021-01-01")

        # Test with filenames that do not follow the expected pattern
        self.assertIsNone(cleaner.get_date_from_filename("session-notes.md"), "Missing date part")
        self.assertIsNone(cleaner.get_date_from_filename("Session-notes-2000-01-01.md"), "Incorrect capitalization")
        self.assertIsNone(cleaner.get_date_from_filename("session-notes-2000-01-01.txt"), "Invalid extension")

        self.assertIsNone(cleaner.get_date_from_filename("notes-2022-10-20.md"), "Incorrect leading part")

        self.assertIsNone(cleaner.get_date_from_filename("session-notes-2022-13-01.md"), "Invalid month")
        self.assertIsNone(cleaner.get_date_from_filename("session-notes-2022-00-10.md"), "Invalid month")

        self.assertIsNone(cleaner.get_date_from_filename(""), "Empty")
        self.assertIsNone(cleaner.get_date_from_filename(" "), "Blank")

    def test_cleanup_contents(self):
        cleaner = SessionNotesCleaner()
        text = self.sample_file_contents()
        clean_text = cleaner.cleanup_contents(text, "2023-12-07")
        verify(clean_text, preferred_multi_reporter)

    @staticmethod
    def strip_trailing_whitespace(multi_line_text):
        # Regular expression pattern to match trailing horizontal whitespace on each line, excluding newline
        pattern = r'[ \t]+\n'
        # Replace matched patterns with nothing (i.e., remove them)
        return re.sub(pattern, '\n', multi_line_text)

    def sample_file_contents(self):
        text = '''# Session Date: 2023-12-07

## Active Co-Authors   
Co-Authored-By: Nathaniel Herman <nathaniel.herman@gmail.com>   
Co-Authored-By: Blaise Pabon <blaise@gmail.com>         
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>       
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net> 
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>   
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: Nathaniel Herman <nathaniel.herman@gmail.com>


## Inactive Co-Authors
Co-Authored-By: Blaise Pabon <blaise@gmail.com>
Co-Authored-By: Gregor Riegler <rieglerg85@gmail.com>
Co-Authored-By: Michael R. Wolf <MichaelRWolf@att.net>
Co-Authored-By: Nitsan Avni <nitsanav@gmail.com>
Co-Authored-By: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>
Co-Authored-By: 4dsherwood <4dsherwood@users.noreply.github.com>
Co-Authored-By: arrockt <cariari385@gmail.com>
Co-Authored-By: Austin Chadwick <austin.chadwick11@gmail.com>
Co-Authored-By: Blessed538 <blesseddominic98@gmail.com>
Co-Authored-By: Eddie Bush <eddie@craftsmanshipcounts.com>
Co-Authored-By: Gabriel Mbaiorga <gabrielmbaiorga@gmail.com>
Co-Authored-By: Idan Melamed <idanmel@gmail.com>
Co-Authored-By: Rea <reasu@protonmail.com>
Co-Authored-By: Tsvetan Tsvetanov <cpi.cecko@gmail.com>
Co-Authored-By: Willem Larsen <willemlarsen@gmail.com>
Co-Authored-By: David Campey <campey@gmail.com>
Co-Authored-by: Zac Ball <zac156@gmail.com>
Co-Authored-By: Kitastro <admin@metafor.co.za>
Co-Authored-By: Woody Zuill <wzuill@yahoo.com>
Co-Authored-By: Llewellyn Falco <llewellyn.falco@gmail.com>

# Agenda

## Bond (30 min.)

-   Try a [warmup exercise](../docs/warmup-exercises.md)

## Do ?
FizzBuzz in Clojure
https://cyber-dojo.org/kata/edit/EtbGU6


## Mid Session Retro (10 min.)
Tips: 
- TRY FOR 10 MIN. LIMIT. HAVE A HELPER ALSO TIME. AT END OF TIME, VOTE TO EXTEND IF NEEDED ONLY
- Remember "Kindness, consideration and respect" - assume good intent; everyone is doing the best they can 

How did that feel (1-2 words / 30 sec)?
- frustrating, fulfilling, overwhelmed
- exciting, playful
- curious, scared, fulfilled
- rocky, relieved
- refreshing, collaborative

What did you like so much you want to do more of it / do it again?
- clojure
- everybody involved
- observation doing thinking for another person
- practicing thinking out loud +1
- Nn8 doing like a pro:
  - I feel overwhelmed
  - Modeled being honest and verbalizing where he was and what he was thinking.
  - Stream of thought
- Modeling how we can get off track and on track
- Copying an old test case to create a new one

What might you want to try differently / experiment?
- Remind newcomers to enter their author info (eg. Co-Authored-By: Blaise Pabon <blaise@gmail.com>)

## Do ?
Continue FizzBuzz in Clojure
https://cyber-dojo.org/kata/edit/EtbGU6

# 2nd Retro (END OF SESSION)

What to do next? Vote on Proposals:
- Proposals:
    - 1. spending less time deciding on what we're doing (more time coding)
    - 2. shared leadership, dedicated facilitation
    - 3. consider a checklist for newcomers (was a discussion about this)
    - 4. consider items in the backlog (reminders, what are we working on, etc.
'''
        return self.strip_trailing_whitespace(text)


def test_strip_trailing_whitespace(self):
    text = '''Line with trailing spaces        
Line with trailing tabs
    Line with 4 leading spaces
        Line with 2 leading tabs
Following line is empty

Following line has 3 tabs
            
Following line has 4 spaces
    
This is last line.                
'''
    stripped_text = self.strip_trailing_whitespace(text)
    verify(stripped_text, preferred_multi_reporter)


if __name__ == '__main__':
    unittest.main()
