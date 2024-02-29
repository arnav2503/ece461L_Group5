from mongoengine import Document, StringField, ReferenceField, ListField, DateTimeField, DictField, IntField

class User(Document):
    username = StringField(required=True, unique=True, primary_key=True)
    password_hash = StringField(required=True)  
    project_list = ListField(ReferenceField('Project'), default=list)

class Project (Document):
    id = StringField(required=True, unique=True, primary_key=True)
    description = StringField()
    owner = ReferenceField(User) 
    start_date = DateTimeField()
    end_date = DateTimeField()
    hardware_list = DictField() # {hardware_id: resources checked out (int)} 

# class HardwareResource (Document):
#     id = StringField(required=True, unique=True)
#     capacity = IntField()
#     availability = IntField(max_value=capacity)
    