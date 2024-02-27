from datetime import datetime, timedelta
import bcrypt
import jwt
import pymongo
from app import app, mongo
from flask import request, jsonify
from models import User  # Import the User model
from utils import hash_password, compare_passwords  # Helper for password encryption

@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'}), 200
        return response
    
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        response = jsonify({'error': 'Username and password are required'}), 400

    password_hash = hash_password(password)
    new_user = User(username=username, password_hash=password_hash)

    try:
        mongo.users.insert_one(new_user.to_mongo())
        response = jsonify({'message': 'User created successfully'}), 201
    except pymongo.errors.DuplicateKeyError: 
        response = jsonify({'error': 'A user with that username already exists'}), 400 
    
    return response


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'}), 200
        return response
    
    username = request.json.get('username')
    password = request.json.get('password')

    user = mongo.users.find_one({'_id': username})
    if user and compare_passwords(password, user['password_hash']):
        token = jwt.encode({ 
            'username': str(user['_id']),  # Assuming _id is your MongoDB ObjectID
            'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
        }, app.config['SECRET_KEY'])  # Use your app's secret key

        response = jsonify({'token': token}), 200
    else:
        response = jsonify({'error': 'Invalid username or password'}), 401

    return response
    
