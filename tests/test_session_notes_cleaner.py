# test_session_notes_cleaner.py
import re
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

    def strip_trailing_whitespace(self, text):
        # Regular expression pattern to match trailing horizontal whitespace on each line, excluding newline
        pattern = r'[ \t]+\n'
        # Replace matched patterns with nothing (i.e., remove them)
        return re.sub(pattern, '\n', text)

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
    - resfreshing, collaborative

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
        verify(stripped_text)

    def test_sample_file_has_no_trailing_whitespace(self):
        text = self.sample_file_contents()
        stripped_text = self.strip_trailing_whitespace(text)
        self.assertEquals(text, stripped_text)

if __name__ == '__main__':
    unittest.main()
