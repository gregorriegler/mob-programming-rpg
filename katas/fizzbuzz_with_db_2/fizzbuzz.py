# The starting point for this code is from GPT4: https://chat.openai.com/share/df0f70f0-b2a0-44b7-8c48-e252ad95ca24
# TODO: Uncomment out and factor out the Database logic below
# from pymongo import MongoClient

class Rule:
    def __init__(self, word, divisor):
        self.word = word
        self.divisor = divisor

# TODO: When implement DB logic.
# def get_rules_from_db(collection):
#     # Fetches rules from MongoDB, sorted by the divisor in ascending order
#     rules = []
#     try:
#         rules_data = collection.find({}).sort("divisor", 1)  # Sorting by 'divisor' in ascending order
#         for rule in rules_data:
#             rules.append(Rule(rule['word'], rule['divisor']))
#     except Exception as e:
#         print(f"An error occurred while fetching rules from MongoDB: {e}")
#     return rules

def does_rule_apply(number, divisor):
    return number % divisor == 0 # Later: if we want 'contains' functionality, add: `or str(divisor) in str(num)`

def fizz_buzz(number, rules=None):
    # TODO: Use default rules from MongoDB if no rules are specified
    # if rules is None:
    #     rules = default_rules_from_db
    output = []
    for rule in rules:
        if does_rule_apply(number, rule.divisor): 
            output.append(rule.word)
    return ''.join(output) if output else str(number)

# TODO: DB work:

# # MongoDB connection setup
# client = MongoClient('mongodb://localhost:27017/')  # Connect to your MongoDB server
# db = client['fizzbuzz_db']  # Specify the database
# collection = db['rules']  # Specify the collection

# # Fetch default rules from MongoDB
# default_rules_from_db = get_rules_from_db(collection)

# # Example usage of the fizz_buzz function with MongoDB
# print([fizz_buzz(i) for i in range(1, 16)])  # Uses default rules
