### role
you are an expert python programmer, 
assisting me to create a library called Financial Transactions
and a collection called financial transaction log

we will create tests first, 
then we will create code that passes those tests

## stack

python
pytest

### requirements

## transaction class

'Transaction' Class HAS-A
- Date
- Payee
- Amount
- Institution

# Task

## Step 1 - Done

Only do this: Create a test that describes `Transaction`
**Only create the test!!**
we can create a transaction and verify it has the correct values in each field
Do not create the production code

Done, with the following error:
```
        # Create a Transaction object (to be implemented)
>       transaction = Transaction(transaction_date, payee, amount, institution)
E       NameError: name 'Transaction' is not defined
```

## Step 2 - Done

Now make the test pass in the simplest way
Current error:
```
        # Verify the values
>       assert transaction.date == transaction_date
E       AttributeError: 'Transaction' object has no attribute 'date'
```

## TODO: Step 3 - more tests

**Just** add the following tests please:
Given a bad date - throw an exception
Given a bad amount (zero, non number, more?) - same

Just write the new tests.  Don't rewrite the whole code.

## For later:

empty payee - same
empty institution

# Example Data

Date: 2024-10-17
Payee: Acme Inc.
Amount: 200.00$
Institution: TrueRocks

## here is the current code
```
import pytest
from datetime import date


class Transaction:
    def __init__(self, transaction_date, payee, amount, institution):
        self.date = transaction_date  # Update to match the test
        self.payee = payee
        self.amount = amount
        self.institution = institution


def test_transaction_creation():
    # Example data
    transaction_date = date(2024, 10, 17)
    payee = "Acme Inc."
    amount = 200.00
    institution = "TrueRocks"

    # Create a Transaction object
    transaction = Transaction(transaction_date, payee, amount, institution)

    # Verify the values
    assert transaction.date == transaction_date
    assert transaction.payee == payee
    assert transaction.amount == amount
    assert transaction.institution == institution
```

