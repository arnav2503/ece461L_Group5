import os

class Config:
    DEBUG = True
    MONGO_URI = os.environ.get('MONGO_URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')

config = {
    'development': Config
}
