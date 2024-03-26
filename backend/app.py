import certifi
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import config  # Import your configurations
import os

app = Flask(__name__)
CORS(app, supports_credentials=True) 
app.config.from_object(config[os.getenv('FLASK_ENV', 'development')])

import certifi
ca = certifi.where()

# Connect to MongoDB
client = MongoClient(app.config['MONGO_URI'], tlsCAFile=ca)
mongo = client.get_database("461l")

from routes import * 

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=app.config['PORT'])