from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/')
def func():
    retVal = ''
    return jsonify(retVal)