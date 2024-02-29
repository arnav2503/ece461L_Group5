from datetime import datetime, timedelta
import jwt
import pymongo
from app import app, mongo
from flask import request, jsonify
from models import User  # Import the User model
from utils import hash_password, compare_passwords  # Helper for password encryption
from functools import wraps

# User Authentication Routes
def login_required(f):
    @wraps(f)
    def secured_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            response = jsonify({'error': 'Token is missing'}), 401
            return response

        try:
            token = token.split(' ')[1]  # Remove 'Bearer' from token
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            kwargs['payload'] = payload
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            response = jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            response = jsonify({'error': 'Invalid token'}), 401

        return response

    return secured_function

@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = "OK", 200
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

@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'}), 200
        return response
    
    username = request.json.get('username').toLowerCase()
    password = request.json.get('password')

    user = mongo.users.find_one({'_id': username})
    if user and compare_passwords(password, user['password_hash']):
        token = jwt.encode({ 
            'username': str(user['_id']),  # Assuming _id is your MongoDB ObjectID
            'exp': datetime.utcnow() + timedelta(seconds=30)  # Token expires in 24 hours
        }, app.config['SECRET_KEY'], algorithm='HS256')  # Use your app's secret key

        response = jsonify({'token': token}), 200
    else:
        response = jsonify({'error': 'Invalid username or password'}), 401

    return response

@app.route('/api/validate-token', methods=['GET'])
@login_required
def validate_token():
    response = jsonify({'message': 'Token is valid'}), 200
    return response

@app.route('/api/get-user', methods=['GET'])
@login_required
def get_user(payload):
    user = mongo.users.find_one({'_id': payload['username']})
    response = jsonify({'username': user['_id']}), 200
    return response

@app.route('/api/get-project', method=['GET'])
@login_required
def get_project(payload):
    username = mongo.projects.find_one({'_id': payload['username']})


