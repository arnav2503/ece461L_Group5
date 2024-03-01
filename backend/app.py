import certifi
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import config  # Import your configurations

app = Flask(__name__)
CORS(app, supports_credentials=True) 
app.config.from_object(config['development'])

import certifi
ca = certifi.where()

# Connect to MongoDB
print(app.config['MONGO_URI'])
client = MongoClient(app.config['MONGO_URI'], tlsCAFile=ca)
mongo = client.get_database("461l")

from routes import * 
# from project_routes import *

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], port=app.config['PORT'])

