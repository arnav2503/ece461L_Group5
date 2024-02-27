from flask_login import UserMixin
from app import mongo
from mongoengine import Document, StringField, IntField, ReferenceField, ListField


class User(Document, UserMixin):
    username = StringField(required=True, unique=True)
    password_hash = StringField(required=True)  
    project_list = ListField(ReferenceField('Project'), default=list)

# class Project (Document):
#     id = StringField(required=True, unique=True)
#     description = StringField()
#     owner = ReferenceField(User) 

# class HardwareResource (Document):
#     id = StringField(required=True, unique=True)
#     capacity = IntField()
#     availability = IntField(max_value=capacity)
    