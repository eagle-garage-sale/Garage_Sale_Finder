import secrets
import bleach

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import jwt
from MakeJWT import CreateJWT
import ReadKeys
import AuthorizationFilters





app = Flask(__name__)
api = Api(app)
CORS(app)

#Add Databases
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'

keys = ReadKeys.ExtractKeys('keys.txt')

# Initialize database
db = SQLAlchemy(app)

from dbModels import Users, images, GarageSales
from garageSaleDAO import GarageSaleDAO
with app.app_context():
    db.create_all()

AccessGarageSales = GarageSaleDAO()

signup_model = api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })



@app.route('/')
def hello():
    return "HELLO!"

@api.route('/api/users/register', endpoint = 'register')
class Register(Resource):
    @api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()
        print(req_data)

        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.query.filter_by(email=_email).first()
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400
        
        new_user = Users(username=_username, email=_email, password=_password)

        db.session.add(new_user)
        db.session.commit()

        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200


# Login backend code
login_model = api.model('LoginModel', {"email": fields.String(required=True,min_length=4, max_length=64), 
                                       "password": fields.String(required=True, min_length=4, max_legnth=16)})
# Note for UI: Max password length 16 characters
@api.route('/api/users/login', endpoint='login')
class Login(Resource):
    @api.expect(login_model, validate=True)
    def post(self):
        req_data = request.get_json()
        _email = req_data.get('email')
        _password = req_data.get('password')


        # Check if the email exists in the database
        user = Users.query.filter_by(email=_email).first()
        

        # if both email and password are present, then check if the password is the same with the one in database
        if user and user.password == _password:
            token = CreateJWT(user.id, _email, _password, keys[1])
            print (token)
            return {'success':True,  "msg":"login successful!"}, 200
        else:
            return {"success":False, "msg":"Invalid email or password"}, 401
        

