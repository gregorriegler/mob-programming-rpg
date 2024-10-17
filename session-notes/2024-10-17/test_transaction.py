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

