import mongomock
import pytest

@pytest.fixture
def mock_mongo_client():
    return mongomock.MongoClient()

def test_example_using_mock_db(mock_mongo_client):
    db = mock_mongo_client.mydatabase
    collection = db.ourcollection

    collection.insert_one({"name": "John", "age": 30})
    result = collection.find_one({"name": "John"})

    assert result["age"] == 30

def test_have_fizz_buzz_specs_in_DB(mock_mongo_client):
    db = mock_mongo_client.mydatabase
    collection = db.ourcollection

    # input: 9
    # output: fizz
    # denominator: 3
    collection.insert_one({"word": "Fizz", "denominator": 3})
    result = collection.find_one({"word": "Fizz"})

    assert result["denominator"] == 3