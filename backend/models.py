from mongoengine import Document, StringField, ReferenceField, ListField

class User(Document):
    username = StringField(required=True, unique=True, primary_key=True)
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
    