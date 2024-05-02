import pytest
from fizzbuzz import fizz_buzz, Rule

# Default rules
default_rules = [
    Rule("Fizz", 3),
    Rule("Buzz", 5)
]

def fizz_buzz_default(num):
    return fizz_buzz(num, default_rules)

@pytest.mark.parametrize("input, expected", [
    (1, "1"),
    (2, "2"),
    (13, "13"),
])
def test_return_number(input, expected):
    assert fizz_buzz_default(input) == expected

@pytest.mark.parametrize("input, expected", [
    (3, "Fizz"),
    (6, "Fizz"),
])
def test_return_fizz(input, expected):
    assert fizz_buzz_default(input) == expected

@pytest.mark.parametrize("input, expected", [
    (5, "Buzz"),
    (10, "Buzz"),
])
def test_return_buzz(input, expected):
    assert fizz_buzz_default(input) == expected

@pytest.mark.parametrize("input, expected", [
    (15, "FizzBuzz"),
    (30, "FizzBuzz"),
])
def test_return_fizzbuzz(input, expected):
    assert fizz_buzz_default(input) == expected
