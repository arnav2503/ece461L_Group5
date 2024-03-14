from datetime import datetime, timedelta
import jwt
import pymongo
from app import app, mongo
from flask import request, jsonify
from models import Project, User  # Import the User model
from utils import hash_password, compare_passwords  # Helper for password encryption
from functools import wraps

# User Authentication Routes
def login_required(f):
    @wraps(f)
    def secured_function(*args, **kwargs):
        if request.method == 'OPTIONS':
            response = "OK", 200
            return response
        
        token = request.headers.get('Authorization')
        if not token:
            response = jsonify({'error': 'Token is missing'}), 401
            print('Missing token')
            return response

        try:
            token = token.split(' ')[1]  # Remove 'Bearer' from token
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            kwargs['payload'] = payload
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            response = jsonify({'error': 'Token has expired'}), 401
            print('Token has expired')
        except jwt.InvalidTokenError:
            response = jsonify({'error': 'Invalid token'}), 401
            print('Invalid token')

        return response

    return secured_function

@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    username = request.json.get('username')
    password = request.json.get('password')
    display_name = request.json.get('displayName')

    if not username or not password:
        response = jsonify({'error': 'Username and password are required'}), 400

    password_hash = hash_password(password)
    new_user = User(username=username, password_hash=password_hash, display_name=display_name)

    try:
        mongo.users.insert_one(new_user.to_mongo())
        response = jsonify({'message': 'User created successfully'}), 201
    except pymongo.errors.DuplicateKeyError: 
        response = jsonify({'error': 'A user with that username already exists'}), 400 
    
    return response

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    username = request.json.get('username')
    password = request.json.get('password')

    user = mongo.users.find_one({'_id': username})
    if user and compare_passwords(password, user['password_hash']):
        token = jwt.encode({ 
            'username': str(user['_id']),  # Assuming _id is your MongoDB ObjectID
            'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
        }, app.config['SECRET_KEY'], algorithm='HS256')  # Use your app's secret key

        response = jsonify({'token': token, 'username': user['_id'], 'display_name': user['display_name']}), 200
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
    user = mongo.users.find_one({'_id': payload['username']}, {'_id': 1, 'display_name': 1, 'project_list': 1})
    response = user, 200
    return response

@app.route('/api/create-project', methods=['POST', 'OPTIONS'])
@login_required
def create_project(payload):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    try:
        data = request.get_json()

        if 'id' not in data or not data['id']:
            response = jsonify({'error': 'Project ID is required'}), 400
            return response
        if 'name' not in data or not data['name']:
            response = jsonify({'error': 'Project name is required'}), 400
            return response
        if 'description' not in data or not data['description']:
            response = jsonify({'error': 'Project description is required'}), 400
            return response
        if 'start_date' not in data or not data['start_date']:
            response = jsonify({'error': 'Project start date is required'}), 400
            return response
        if 'end_date' not in data or not data['end_date']:
            response = jsonify({'error': 'Project end date is required'}), 400
            return response
        if data['start_date'] > data['end_date']:
            response = jsonify({'error': 'Project start date cannot be after the end date'}), 400
            return response

        hardware_list = dict()
        for resource in mongo.resources.objects.find():
            hardware_list[resource] = 0

        project = Project(
            id = data['id'],
            name = data['name'],
            description = data['description'],
            owner = payload['username'],
            start_date = data['start_date'],
            end_date = data['end_date'],
            hardware_list = hardware_list,
            assigned_users = []
        )
        mongo.projects.insert_one(project.to_mongo())
        mongo.users.find_one_and_update({'_id': payload['username']}, {'$push': {'project_list': data['id']}})
        response = jsonify({'message': 'Project created successfully'}), 201
        return response
    except pymongo.errors.DuplicateKeyError:
        response = jsonify({'error': 'A project with that ID already exists'}), 409
        return response
    except Exception as e:
        response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
        return response