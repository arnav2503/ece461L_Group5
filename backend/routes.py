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
        response = jsonify({'error': 'That username is already taken.'}), 400 
    
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
        print(data['start_date'], data['end_date'])
        hardware_list = dict()
        for resource in mongo.resources.objects.find():
            hardware_list[resource] = 0

        project = Project(
            id = data['id'],
            name = data['name'],
            description = data['description'],
            owner = payload['username'],
            start_date = datetime.strptime(data['start_date'][:10], '%Y-%m-%d'),
            end_date = datetime.strptime(data['end_date'][:10], '%Y-%m-%d'),
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
    
@app.route('/api/update-display-name', methods=['POST', 'OPTIONS'])
@login_required
def update_display_name(payload):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    new_display_name = request.json.get('displayName')
    if not new_display_name:
        response = jsonify({'error': 'New display name is required'}), 400
        return response

    try:
        mongo.users.find_one_and_update({'_id': payload['username']}, {'$set': {'display_name': new_display_name}})
        response = jsonify({'message': 'Display name updated successfully'}), 200
        return response
    except Exception as e:
        response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
        return response

@app.route('/api/projects/project-<id>', methods=['GET', 'DELETE', 'OPTIONS'])
@login_required
def view_project(payload, id):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    if request.method == 'GET':
        response = mongo.project.find_one({"_id":id})
        return response
    
    if request.method == 'DELETE':
        project = mongo.projects.find_one({'_id': id})
        if project['owner'] != payload['username']:
            response = jsonify({'error': 'You do not have permission to delete this project'}), 403
            return response
        
        mongo.projects.delete_one({'_id': id})
        mongo.users.find_one_and_update({'_id': payload['username']}, {'$pull': {'project_list': id}})
        response = jsonify({'message': 'Project deleted successfully'}), 200
        return response

@app.route('/api/projects/project-<id>/assign', methods=['POST', 'OPTIONS'])
@login_required
def assign_project(payload, id):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    if request.method == 'POST':
        project = mongo.projects.find_one({'_id': id})

        user = mongo.users.find_one({'_id': payload['username']})
        if not user:
            response = jsonify({'error': 'User not found'}), 404
            return response

        if user['_id'] in project['assigned_users'] or user['_id'] == project['owner']:
            response = jsonify({'error': 'User is already assigned to this project'}), 409
            return response

        mongo.projects.find_one_and_update({'_id': id}, {'$push': {'assigned_users': user['_id']}})
        mongo.users.find_one_and_update({'_id': user['_id']}, {'$push': {'project_list': id}})
        response = jsonify({'message': 'User assigned to project successfully'}), 200
        return response

@app.route('/api/projects/assigned', methods=['GET', 'OPTIONS'])
@login_required
def get_assigned_projects(payload):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    project_ids = mongo.users.find_one({'_id': payload['username']}, {'project_list': 1})
    projects = []
    for project_id in project_ids['project_list']:
        project = mongo.projects.find_one({'_id': project_id})
        project.pop('assigned_users', None)
        resourcesUsed = 0
        for resource in project['hardware_list']:
            resourcesUsed += project['hardware_list'][resource]
        project['resourcesUsed'] = resourcesUsed
        resourcesCapacity = 0
        for resource in mongo.resources.find():
            resourcesCapacity += resource['capacity']
        project['resourcesCapacity'] = resourcesCapacity
        project.pop('hardware_list', None)
        if 'start_date' in project:
            project['start_date'] = project['start_date'].strftime('%Y-%m-%d')
        if 'end_date' in project:
            project['end_date'] = project['end_date'].strftime('%Y-%m-%d')
        projects.append(project)

    response = projects, 200
    return response

@app.route('/api/projects/project-<id>/unassign', methods=['POST', 'OPTIONS'])
@login_required
def unassign_project(payload, id):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    project = mongo.projects.find_one({'_id': id})
    if payload['username'] not in project['assigned_users']:
        response = jsonify({'error': 'You are not assigned to this project'}), 403
        return response

    mongo.projects.find_one_and_update({'_id': id}, {'$pull': {'assigned_users': payload['username']}})
    mongo.users.find_one_and_update({'_id': payload['username']}, {'$pull': {'project_list': id}})
    response = jsonify({'message': 'Project unassigned successfully'}), 200
    return response