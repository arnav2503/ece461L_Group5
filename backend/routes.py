from datetime import datetime, timedelta, UTC
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
        
        else: 
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
                return response
            except jwt.InvalidTokenError:
                response = jsonify({'error': 'Invalid token'}), 401
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
    return secured_function

@app.route('/api/active', methods=['GET'])
def active():
    response = 'OK', 200
    return response

@app.route('/api/error', methods=['GET'])
def error():
    response = 'ERROR', 500
    return response

@app.route('/api/user/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    if request.method == 'POST':
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
            return response
        except pymongo.errors.DuplicateKeyError: 
            response = jsonify({'error': 'That username is already taken.'}), 409 
            return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response

@app.route('/api/user/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    if request.method == 'POST':
        try:
            username = request.json.get('username')
            password = request.json.get('password')

            user = mongo.users.find_one({'_id': username})
            
            if user and compare_passwords(password, user['password_hash']):
                token = jwt.encode({ 
                    'username': str(user['_id']),  
                    'exp': datetime.utcnow() + timedelta(hours=24)  
                }, app.config['SECRET_KEY'], algorithm='HS256')  

                response = jsonify({'token': token, 'username': user['_id'], 'display_name': user['display_name']}), 200
                return response
            else:
                response = jsonify({'error': 'Invalid username or password'}), 401
                return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response

@app.route('/api/user', methods=['GET', 'PATCH', 'OPTIONS'])
@login_required
def user(payload):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    if request.method == 'GET':
        try: 
            user = mongo.users.find_one({'_id': payload['username']}, {'password_hash': 0})

            if not user:
                response = jsonify({'error': 'User not found'}), 404
                return response
            else:
                response = user, 200
                return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response
    
    if request.method == 'PATCH':
        # Get patched field from request
        patched_field = request.json.get('field')
        if not patched_field:
            response = jsonify({'error': 'Field to patch is required'}), 400
            return response
        if patched_field not in ['username', 'password', 'display_name']:
            response = jsonify({'error': 'Invalid field to patch'}), 400
            return response
        
        # Get new value for patched field
        new_value = request.json.get('value')
        if not new_value:
            response = jsonify({'error': 'New value for field is required'}), 400
            return response
        
        if patched_field == 'username':
            # immutable field
            response = jsonify({'error': 'Username cannot be changed'}), 400
            return response

        if patched_field == 'password':
            # not implemented yet
            response = jsonify({'error': 'Password change not implemented yet'}), 501
            return response
        
        if patched_field == 'display_name':
            try:
                mongo.users.find_one_and_update({'_id': payload['username']}, {'$set': {'display_name': new_value}})
                response = jsonify({'message': 'Display name updated successfully'}), 200
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
    
@app.route('/api/projects/project-<id>', methods=['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'])
@login_required
def view_project(payload, id):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response
    
    if request.method == 'GET':
        try: 
            response = mongo.projects.find_one({"_id":id}), 200
            if not response:
                response = jsonify({'error': 'Project not found'}), 404
                return response
            total_resources = 0
            total_capacity = 0
            for resource in response[0]['hardware_list'].keys():
                total_resources += response[0]['hardware_list'][resource]
                total_capacity += mongo.resources.find_one({'_id': resource})['capacity']
            response[0]['resources_used'] = total_resources
            response[0]['resources_capacity'] = total_capacity
            return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response
        
    if request.method == 'POST':
        try:
            data = request.get_json()

            if not id:
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
            hardware_list = {}
            for resource in mongo.resources.find():
                hardware_list[resource['_id']] = 0
            project = Project(
                id = id,
                name = data['name'],
                description = data['description'],
                owner = payload['username'],
                start_date = datetime.strptime(data['start_date'][:10], '%Y-%m-%d'),
                end_date = datetime.strptime(data['end_date'][:10], '%Y-%m-%d'),
                hardware_list = hardware_list,
                assigned_users = []
            )

            mongo.projects.insert_one(project.to_mongo())
            mongo.users.find_one_and_update({'_id': payload['username']}, {'$push': {'project_list': id}})
            response = jsonify({'message': 'Project created successfully', 'project_id': id}), 201
            return response
        except pymongo.errors.DuplicateKeyError:
            response = jsonify({'error': 'A project with that ID already exists'}), 409
            return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response

    if request.method == 'DELETE':
        try:
            project = mongo.projects.find_one({'_id': id})
            if not project:
                response = jsonify({'error': 'Project not found'}), 404
                return response
            if project['owner'] != payload['username']:
                response = jsonify({'error': 'You do not have permission to delete this project'}), 403
                return response
            
            for resource in project['hardware_list']:
                mongo.resources.find_one_and_update({'_id': resource}, {'$inc': {'available': project['hardware_list'][resource]}})
            
            mongo.projects.delete_one({'_id': id})
            mongo.users.find_one_and_update({'_id': payload['username']}, {'$pull': {'project_list': id}})
            response = jsonify({'message': 'Project deleted successfully'}), 200
            return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response
    
    if request.method == 'PATCH':
        data = request.get_json()
        if not data:
            response = jsonify({'error': 'No data provided to update'}), 400
            return response
        if not data['field']:
            response = jsonify({'error': 'Field to update is required'}), 400
            return response
        if data['field'] not in ['name', 'description', 'start_date', 'end_date', 'users']:
            response = jsonify({'error': 'Invalid field to update'}), 400
            return response
        if data['field'] != 'users' and not data['value']:
            response = jsonify({'error': 'Value to update field is required'}), 400
            return response
        if data['field'] == 'users' and not data['method']:
            response = jsonify({'error': 'Method to update users is required'}), 400
            return response
        if not mongo.projects.find_one({'_id': id}):
            response = jsonify({'error': 'Project not found'}), 404
            return response
        
        field = data['field']
        if data['field'] == 'users':
            method = data['method']
            if method not in ['assign', 'unassign']:
                response = jsonify({'error': 'Invalid method to update users'}), 400
                return response
        else:
            value = data['value']
        
        if field == 'name':
            try:
                mongo.projects.find_one_and_update({'_id': id}, {'$set': {'name': value}})
                response = jsonify({'message': 'Project name updated successfully'}), 200
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
        elif field == 'description':
            try:
                mongo.projects.find_one_and_update({'_id': id}, {'$set': {'description': value}})
                response = jsonify({'message': 'Project description updated successfully'}), 200
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
        elif field == 'start_date':
            try:
                mongo.projects.find_one_and_update({'_id': id}, {'$set': {'start_date': datetime.strptime(value[:10], '%Y-%m-%d')}})
                response = jsonify({'message': 'Project start date updated successfully'}), 200
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
        elif field == 'end_date':
            try:
                mongo.projects.find_one_and_update({'_id': id}, {'$set': {'end_date': datetime.strptime(value[:10], '%Y-%m-%d')}})
                response = jsonify({'message': 'Project end date updated successfully'}), 200
                return response
            except Exception as e:
                response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                return response
        elif field == 'users':
            if method == 'assign':
                try: 
                    project = mongo.projects.find_one({'_id': id})
                    if not project:
                        response = jsonify({'error': 'Project not found'}), 404
                        return response

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
                except Exception as e:
                    response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                    return response
            elif method == 'unassign':
                try:
                    project = mongo.projects.find_one({'_id': id})
                    if not project:
                        response = jsonify({'error': 'Project not found'}), 404
                        return response
                    
                    if payload['username'] not in project['assigned_users']:
                        response = jsonify({'error': 'You are not assigned to this project'}), 403
                        return response

                    mongo.projects.find_one_and_update({'_id': id}, {'$pull': {'assigned_users': payload['username']}})
                    mongo.users.find_one_and_update({'_id': payload['username']}, {'$pull': {'project_list': id}})
                    response = jsonify({'message': 'Project unassigned successfully'}), 200
                    return response
                except Exception as e:
                    response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                    return response
            else: 
                response = jsonify({'error': 'Invalid method to update users'}), 400
                return response
        else:
            response = jsonify({'error': 'Invalid field to update'}), 400
            return response

@app.route('/api/resources', methods=['GET', 'OPTIONS'])
@login_required
def get_resources(payload):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    if request.method == 'GET':
        try:
            resources = []
            for resource in mongo.resources.find():
                resources.append(resource)

            if resources.count == 0:
                response = jsonify({'error': 'No resources found'}), 404
                return response
            
            response = resources, 200
            return response
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response

@app.route('/api/resources/hw-<resource_id>', methods=['GET', 'PATCH', 'OPTIONS'])
@login_required
def get_resource(payload, resource_id):
    if request.method == 'OPTIONS':
        response = "OK", 200
        return response

    if request.method == 'GET':
        try:
            resource = mongo.resources.find_one({'_id': resource_id})
            if not resource:
                response = jsonify({'error': 'Resource not found'}), 404
                return response
            return resource, 200
        except Exception as e:
            response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
            return response

    if request.method == 'PATCH':
        # require field, method, value, and associated project id
        data = request.get_json()
        if not data:
            response = jsonify({'error': 'No data provided to update'}), 400
            return response
        if not data['field']:
            response = jsonify({'error': 'Field to update is required'}), 400
            return response
        if data['field'] not in ['name', 'description', 'capacity', 'available']:
            response = jsonify({'error': 'Invalid field to update'}), 400
            return response
        
        field = data['field']

        if field == 'name':
            # Not implemented yet
            response = jsonify({'error': 'Resource name change not implemented yet'}), 501
            return response
        elif field == 'description':
            # Not implemented yet
            response = jsonify({'error': 'Resource description change not implemented yet'}), 501
            return response
        elif field == 'capacity':
            # Not implemented yet
            response = jsonify({'error': 'Resource capacity change not implemented yet'}), 501
            return response
        elif field == 'available':
            # verify method, value, and project id
            if not data['method']:
                response = jsonify({'error': 'Method to update available is required'}), 400
                return response
            if not data['value']:
                response = jsonify({'error': 'Value to update available is required'}), 400
                return response
            if not data['project_id']:
                response = jsonify({'error': 'Project ID is required'}), 400
                return response
            if data['method'] not in ['checkout', 'checkin']:
                response = jsonify({'error': 'Invalid method to update available'}), 400
                return response
            
            method = data['method']
            value = data['value']
            project_id = data['project_id']

            if method == 'checkout':
                try:
                    resource = mongo.resources.find_one({'_id': resource_id})
                    if not resource:
                        response = jsonify({'error': 'Resource not found'}), 404
                        return response
                    if resource['available'] == 0 or resource['available'] < value:
                        response = jsonify({'error': 'The requested resource is out of stock'}), 409
                        return response
                    project = mongo.projects.find_one({'_id': project_id})
                    if not project:
                        response = jsonify({'error': 'Project not found'}), 404
                        return response
                    user = mongo.users.find_one({'_id': payload['username']})
                    if not user:
                        response = jsonify({'error': 'User not found'}), 404
                        return response
                    if payload['username'] not in project['assigned_users'] and payload['username'] != project['owner']:
                        response = jsonify({'error': 'You do not have permission to check out resources for this project'}), 403
                        return response
                    if resource_id not in project['hardware_list']:
                        project['hardware_list'][resource_id] = 0

                    project['hardware_list'][resource_id] += value
                    mongo.projects.find_one_and_update({'_id': project_id}, {'$set': {'hardware_list': project['hardware_list']}})
                    mongo.resources.find_one_and_update({'_id': resource_id}, {'$inc': {'available': -value}})
                    response = jsonify({'message': 'Resource checked out successfully'}), 200
                    return response
                except Exception as e:
                    response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                    return response
                
            elif method == 'checkin':
                try:
                    resource = mongo.resources.find_one({'_id': resource_id})
                    if not resource:
                        response = jsonify({'error': 'Resource not found'}), 404
                        return response
                    project = mongo.projects.find_one({'_id': project_id})
                    if not project:
                        response = jsonify({'error': 'Project not found'}), 404
                        return response
                    if payload['username'] not in project['assigned_users'] and payload['username'] != project['owner']:
                        response = jsonify({'error': 'You do not have permission to check in resources for this project'}), 403
                        return response
                    if resource_id not in project['hardware_list']:
                        response = jsonify({'error': 'The requested resource is not checked out for this project'}), 409
                        return response
                    if project['hardware_list'][resource_id] < value:
                        response = jsonify({'error': 'The requested quantity is greater than the checked out quantity'}), 409
                        return response
                    if value + resource['available'] > resource['capacity']:
                        response = jsonify({'error': 'The requested quantity exceeds the resource capacity'}), 409
                        return response

                    project['hardware_list'][resource_id] -= value
                    mongo.projects.find_one_and_update({'_id': project_id}, {'$set': {'hardware_list': project['hardware_list']}})
                    mongo.resources.find_one_and_update({'_id': resource_id}, {'$inc': {'available': value}})
                    response = jsonify({'message': 'Resource checked in successfully'}), 200
                    return response
                except Exception as e:
                    response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
                    return response