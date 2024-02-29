# Project Management Routes
import datetime
import pymongo
from flask import jsonify, request

from backend.routes import login_required
from app import app, mongo


@app.route('/api/create-project', methods=['POST'])
@login_required
def create_project(payload):
    try:
        data = request.get_json()
        project_data = {
            '_id': data['name'],
            'description': data['description'],
            'owner': payload['username'],
            'start_date': datetime.strptime(data['start_date'], '%Y-%m-%d'),
            'end_date': datetime.strptime(data['end_date'], '%Y-%m-%d'),
            'hardware_list': {},
            'assigned_users': []
        }

        if not project_data['_id']:
            response = jsonify({'error': 'Project ID is required'}), 400
            return response
        if not project_data['start_date']:
            response = jsonify({'error': 'Project start date is required'}), 400
            return response
        if not project_data['end_date']:
            response = jsonify({'error': 'Project end date is required'}), 400
            return response
        
        # for managing assignment see: https://docs.mongoengine.org/guide/defining-documents.html#many-to-many-with-listfields
        result = mongo.projects.insert_one(project_data)
        user = mongo.users.find_one({'_id': payload['username']})
        user['projects'].append(project_data['_id'])
        mongo.users.update_one({'_id': payload['username']}, {'$set': {'projects': user['projects']}})
        response = jsonify({'message': 'Project created successfully'}), 201
        return response
    except pymongo.errors.DuplicateKeyError:
        response = jsonify({'error': 'A project with that ID already exists'}), 409
        return response
    except Exception as e:
        response = jsonify({'error': f'An unexpected error occured: {str(e)}'}), 500
        return response

@app.route('/api/get-assigned-projects', methods=['GET'])
@login_required
def get_projects(payload):
    user = mongo.users.find_one({'_id': payload['username']})
    project_ids = user['projects']
    projects = list(mongo.projects.find({'_id': {'$in': project_ids}}))
    response = jsonify({'projects': projects}), 200
    return response

@app.route('/api/get-unassingned-projects', methods=['GET'])
@login_required
def get_unassigned_projects(payload):
    user = mongo.users.find_one({'_id': payload['username']})
    project_ids = user['projects']
    projects = list(mongo.projects.find({'_id': {'$nin': project_ids}}))
    response = jsonify({'projects': projects}), 200
    return response

@app.route('/api/projects/<project-id>/assign-project', methods=['POST'])
@login_required
def assign_project(payload):
    project_id = request.view_args['project-id']
    user = mongo.users.find_one({'_id': payload['username']})
    project = mongo.projects.find_one({'_id': project_id})
    if project['owner'] == user['_id']:
        assigned_users = project['assigned_users']
        assigned_users.append(user['_id'])
        mongo.projects.update_one({'_id': project_id}, {'$set': {'assigned_users': assigned_users}})
        response = jsonify({'message': 'Project assigned successfully'}), 200
    else:
        response = jsonify({'error': 'You do not have permission to assign this project'}), 403
    return response