import json
from project.dbModels import Users

# The user DAO will read a record from the user table and return
# a User object. 

# This will be an object that is returned upon reading a valid record
# from the Users table
class User():
    def __init__(self, id, username, email, password):

        self.id = id
        self.username = username
        self.email = email
        self.password = password

        #Serializes the class to json when called
        def toJson(self):
            return json.dumps(self, default=lambda o: o.__dict__)
        
class UserRecordDAO():

    # This getter function should return a single User object
    # as it searches by user_id
    def GetUserById(self, user_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            return User(user.id, user.username, user.email, user.password)
        else:
            return False
        
    #Get all users in db
    def GetUsers(self):
        users = Users.query.all()
        user_collection = []

        for user in users:
            entry = User(user.id, user.username, user.email, user.password)
            user_collection.append(entry)
        return user_collection
    
    #Converts attributes of user object to a json string
    def convertUserToJSON(self, user):
        json_str = json.dumps(user.toJson())
        return json_str
    

    
