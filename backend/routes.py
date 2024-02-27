import pymongo
from app import app, mongo
from flask import request, jsonify
from flask_login import current_user, login_required, login_user, logout_user
from models import User  # Import the User model
from utils import compare_passwords, hash_password  # Helper for password encryption

@app.route('/signup', methods=['POST']) 
def signup():
    data = request.get_json()

    # Input validation
    if not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing username or password'}), 400 

    # Ensure username uniqueness (handled by MongoDB index)
    try:
        new_user = User(
            _id=data['username'], 
            password_hash=hash_password(data['password']) 
        )
        new_user.save() 

        login_user(new_user)  
        return jsonify({'message': 'User created and logged in'}) 

    except pymongo.errors.DuplicateKeyError:
        return jsonify({'error': 'Username already exists'}), 409  

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = mongo.db.User.find_one({'username': username})
    if user and compare_passwords(password, user['password_hash']):
        login_user(user)  # Use Flask-Login's login_user 
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'})

@app.route('/test-auth')
def test_auth():
    if current_user.is_authenticated:
        return jsonify({
            'message': 'You are logged in!',
            'username': current_user.username
        })
    else:
        return jsonify({'message': 'Please log in'}), 401 