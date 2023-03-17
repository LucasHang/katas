import os

logs = list()

def log(message):
    # Don't know how to validate a `NODE_ENV` equivalent in python
    logs.append(message)