import json

def read_json(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    return data