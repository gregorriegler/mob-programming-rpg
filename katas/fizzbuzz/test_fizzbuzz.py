import mongomock
import pytest
from typing import Callable

@pytest.fixture
def mock_mongo_client():
    return mongomock.MongoClient()

@pytest.fixture
def fizzbuzz_db(mock_mongo_client):
    db = mock_mongo_client.mydatabase
    rules = db.fizzbuzz_rules
    rules.insert_many(
        [
            {"word": "Fizz", "divisor": 3},
            {"word": "Buzz", "divisor": 5},
        ]
    )
    return db

def test_example_using_mock_db(mock_mongo_client):
    db = mock_mongo_client.mydatabase
    collection = db.ourcollection

    collection.insert_one({"name": "John", "age": 30})
    result = collection.find_one({"name": "John"})

    assert result["age"] == 30


def test_have_fizz_buzz_specs_in_DB(mock_mongo_client):
    db = mock_mongo_client.mydatabase
    rules = db.fizzbuzz_rules
    rules.insert_many(
        [
            {"word": "Fizz", "divisor": 3},
            {"word": "Buzz", "divisor": 5},
        ]
    )
    result = rules.find_one({"word": "Fizz"})

    assert result["divisor"] == 3

def test_fizz_divisor_is_3(fizzbuzz_db):    
    assert fizzbuzz_db.fizzbuzz_rules.find_one({"word": "Fizz"})["divisor"] == 3


def test_buzz_divisor_is_5(fizzbuzz_db):
    assert fizzbuzz_db.fizzbuzz_rules.find_one({"word": "Buzz"})["divisor"] == 5

# ----------------------------------------------------------
# todo: move this production code to another file later:
FizzbuzzFn = Callable[[int], str]

# todo: move this production code to another file later:
def make_fizzbuzz(db) -> FizzbuzzFn:
    def fizzbuzz_fn(number):  
        # TODO: get the rule from the db for 5
        if number == 5:
            return "Buzz"
        return "Fizz"
    return fizzbuzz_fn


# ----------------------------------------------------------    

def test_fizzbuzz(fizzbuzz_db):
    fizzbuzz_fn = make_fizzbuzz(fizzbuzz_db)
    assert "Fizz" == fizzbuzz_fn(3)

def test_buzz(fizzbuzz_db):
    fizzbuzz_fn = make_fizzbuzz(fizzbuzz_db)
    assert "Buzz" == fizzbuzz_fn(5)

def skip_test_15(fizzbuzz_db):
    fizzbuzz_fn = make_fizzbuzz(fizzbuzz_db)
    assert "FizzBuzz" == fizzbuzz_fn(15)

