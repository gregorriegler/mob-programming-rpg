# test_session_notes_cleaner.py
import unittest
from approvaltests import verify

from src.session_notes_cleanup.session_notes_cleaner import SessionNotesCleaner


class TestSessionNotesCleaner(unittest.TestCase):
    def test_initialization(self):
        cleaner = SessionNotesCleaner()
        # Add assertions here to test initial conditions
        self.assertIsNotNone(cleaner)

    def test_import_approvalTests(self):
        verify("approvalTests::verify is imported\n")


if __name__ == '__main__':
    unittest.main()
