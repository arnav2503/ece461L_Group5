import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = True
    MONGO_URI = os.environ.get('MONGO_URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    PORT = os.getenv('PORT', 5001)

class ProductionConfig():
    DEBUG = False
    MONGO_URI = os.environ.get('MONGO_URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    PORT = os.getenv('PORT', 5001)

config = {
    'development': Config,
    'production': ProductionConfig
}
