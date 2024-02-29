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

@app.route('/api/login', methods=['POST', 'OPTIONS'])
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

# @app.route('/api/get-project', method=['GET'])
# @login_required
# def get_project(payload):
#     username = mongo.projects.find_one({'_id': payload['username']})

# # Project Routes
# @app.route('/api/create-project', methods=['POST'])
# @login_required
# def create_project(payload):
#     try:
#         data = request.get_json()
#         project_data = {
#             '_id': data['name'],
#             'description': data['description'],
#             'owner': payload['username'],
#             'start_date': datetime.strptime(data['start_date'], '%Y-%m-%d'),
#             'end_date': datetime.strptime(data['end_date'], '%Y-%m-%d'),
#             'hardware_list': {},
#             'assigned_users': []
#         }

#         if not project_data['_id']:
#             response = jsonify({'error': 'Project ID is required'}), 400
#             return response
#         if not project_data['start_date']:
#             response = jsonify({'error': 'Project start date is required'}), 400
#             return response
#         if not project_data['end_date']:
#             response = jsonify({'error': 'Project end date is required'}), 400
#             return response
        
#         # for managing assignment see: https://docs.mongoengine.org/guide/defining-documents.html#many-to-many-with-listfields
#         result = mongo.projects.insert_one(project_data)
#         user = mongo.users.find_one({'_id': payload['username']})
#         user['projects'].append(project_data['_id'])
#         mongo.users.update_one({'_id': payload['username']}, {'$set': {'projects': user['projects']}})
#         response = jsonify({'message': 'Project created successfully'}), 201
#         return response
#     except pymongo.errors.DuplicateKeyError:
#         response = jsonify({'error': 'A project with that ID already exists'}), 409
#         return response
#     except Exception as e:
#         response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
#         return response

# @app.route('/api/get-assigned-projects', methods=['GET'])
# @login_required
# def get_projects(payload):
#     user = mongo.users.find_one({'_id': payload['username']})
#     project_ids = user['projects']
#     projects = list(mongo.projects.find({'_id': {'$in': project_ids}}))
#     response = jsonify({'projects': projects}), 200
#     return response

# @app.route('/api/get-unassingned-projects', methods=['GET'])
# @login_required
# def get_unassigned_projects(payload):
#     user = mongo.users.find_one({'_id': payload['username']})
#     project_ids = user['projects']
#     projects = list(mongo.projects.find({'_id': {'$nin': project_ids}}))
#     response = jsonify({'projects': projects}), 200
#     return response

# @app.route('/api/projects/<project-id>/assign-project', methods=['POST'])
# @login_required
# def assign_project(payload):
#     project_id = request.view_args['project-id']
#     user = mongo.users.find_one({'_id': payload['username']})
#     project = mongo.projects.find_one({'_id': project_id})
#     if project['owner'] == user['_id']:
#         assigned_users = project['assigned_users']
#         assigned_users.append(user['_id'])
#         mongo.projects.update_one({'_id': project_id}, {'$set': {'assigned_users': assigned_users}})
#         response = jsonify({'message': 'Project assigned successfully'}), 200
#     else:
#         response = jsonify({'error': 'You do not have permission to assign this project'}), 403
#     return response

# @app.route('/api/projects/<project-id>/unassign-project', methods=['POST'])
# @login_required
# def unassign_project(payload):
#     project_id = request.view_args['project-id']
#     user = mongo.users.find_one({'_id': payload['username']})
#     project = mongo.projects.find_one({'_id': project_id})
#     if project['owner'] == user['_id']:
#         response = jsonify({'error': 'You cannot unassign yourself from a project you own'}), 403
#     elif user['_id'] in project['assigned_users']:
#         mongo.projects.update_one({'_id': project_id}, )
#         mongo.users.update_one({'_id': user['_id']}, {'$pull': {'projects': project_id}})
#         response = jsonify({'message': 'Project unassigned successfully'}), 200
#     else:
#         response = jsonify({'error': 'You do not have permission to unassign this project'}), 403
#     return response