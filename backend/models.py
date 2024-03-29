from mongoengine import Document, StringField, ReferenceField, ListField, DateTimeField, DictField, IntField

class User(Document):
    username = StringField(required=True, unique=True, primary_key=True)
    password_hash = StringField(required=True)  
    display_name = StringField()
    project_list = ListField(ReferenceField('Project'), default=list) # https://docs.mongoengine.org/guide/defining-documents.html#many-to-many-with-listfields

class Project (Document):
    id = StringField(required=True, unique=True, primary_key=True)
    name = StringField()
    description = StringField()
    owner = ReferenceField(User) 
    start_date = DateTimeField()
    end_date = DateTimeField()
    hardware_list = DictField() # https://docs.mongoengine.org/guide/defining-documents.html#embedded-documents
    assigned_users = ListField(ReferenceField(User), default=list) # https://docs.mongoengine.org/guide/defining-documents.html#many-to-many-with-listfields
