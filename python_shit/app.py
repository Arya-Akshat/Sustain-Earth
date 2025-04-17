from flask import Flask, jsonify, request
import Actual

from flask_cors import CORS


app = Flask(__name__)

CORS(app)  # This will enable CORS for all routes
@app.route('/')
def func():
    city = request.args.get('city', '')
    retVal = Actual.main(city)
    return jsonify(retVal)