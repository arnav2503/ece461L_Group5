from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import config  # Import your configurations

app = Flask(__name__)
CORS(app, supports_credentials=True) 
app.config.from_object(config['development'])

# Connect to MongoDB
client = MongoClient(app.config['MONGO_URI'])
mongo = client.get_database("461l")
 
from backend.auth_routes import * 
from backend.project_routes import *

if __name__ == '__main__':
    app.run(debug=True, port=5001)

