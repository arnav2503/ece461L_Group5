import os

class Config:
    DEBUG = True
    MONGO_URI = os.environ.get('MONGO_URI')

config = {
    'development': Config
}
