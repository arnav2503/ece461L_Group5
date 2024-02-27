from bson import ObjectId
from flask import Flask, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_login import LoginManager, login_user, logout_user, login_required 
from config import config  # Import your configurations

app = Flask(__name__)
app.config.from_object(config['development'])  # Or your desired environment
CORS(app, origins="http://localhost:5173",  supports_credentials=True) 
mongo = PyMongo(app)
 
from routes import * 

# Import API routes

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return mongo.db.users.find_one({'_id': ObjectId(user_id)})

if __name__ == '__main__':
    app.run(debug=True)
