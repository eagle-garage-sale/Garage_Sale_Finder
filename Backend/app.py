import secrets
import bleach

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import jwt
from JWT import CreateJWT, extract_id
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

# import database models (these create the tables for our database and define the object that can be added to them)
from dbModels import Users, GarageSales
from garageSaleDAO import GarageSaleDAO

with app.app_context():
    db.create_all()

# This object with convert data from the Garage Sale table and convert it into JSON ready to be shipped to
# react front end.
AccessGarageSales = GarageSaleDAO()


# api models ensure that data provided by front end matches these specifications. JSON keys must match the
# names of these values in order for this to work.
garagesale_model = api.model('GarageSaleModel', {"location": fields.String(required=True, min_length=2, max_length=100),
                                              "user_id": fields.Integer(required=True),
                                              "start_date": fields.String(required=True, min_length=4, max_length=12),
                                              "end_date": fields.String(required=True, min_length=4, max_length=12),
                                              "open_time": fields.String(required=True, min_length=4, max_length=12),
                                              "close_time": fields.String(required=True, min_length=4, max_length=12),
                                              "description": fields.String(required=True, min_length=4, max_length=500)
                                              })

signup_model = api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

login_model = api.model('LoginModel', {"email": fields.String(required=True,min_length=4, max_length=64), 
                                       "password": fields.String(required=True, min_length=4, max_legnth=16)})



@app.route('/')
def hello():
    return "HELLO!"

# Add garage sale entry
@api.route('/api/garagesales/register', endpoint = 'garagesales_register')
class GarageSalesRegister(Resource):

    @api.expect(garagesale_model, validate=True)
    def post(self):

        # Get JSON string submitted by user
        req_data = request.get_json()

        if req_data.get("jwt") is None:
            # Return HTTP code 401 (unauthorized) upon completion. 
                return {"success": False,
                        "msg": "Unauthorized!"}, 401
        
        else:
            token = req_data.get("jwt")
            
            #Take values from specified JSON keys and get the user_id from jwt token
            _location = req_data.get("location")
            _user_id = extract_id(token, keys[1])
            _start_date = req_data.get("start_date")
            _end_date = req_data.get("end_date")
            _open_time = req_data.get("open_time")
            _close_time = req_data.get("close_time")
            _description = req_data.get("description")


            # Make a new garage sale object from the values specified above
            new_sale = GarageSales(user_id = _user_id, location = _location,  start_date = _start_date, end_date = _end_date, open_time = _open_time, close_time = _close_time, description = _description)

            # Perform insertion query to GarageSales table and finalize query.
            db.session.add(new_sale)
            db.session.commit()

            # Return HTTP code 200 (success) upon completion. 
            return {"success": True,
                    "garageSaleID": new_sale.id,
                    "msg": "The garage sale was successfully registered"}, 200




# Add new user
@api.route('/api/users/register', endpoint = 'register')
class Register(Resource):
    @api.expect(signup_model, validate=True)
    def post(self):

        # Get JSON string submitted by user
        req_data = request.get_json()
    
        #Take values from specified JSON keys
        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        # Make a variable containing data from a Users table query of the first record with an email equaling
        # the user sent email
        user_exists = Users.query.filter_by(email=_email).first()

        # If this value is not null - this is if the value exists in the database, return 400 error
        # code stating the email has been taken. 
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400
        
        # Otherwise, proceed with database insert query. 
        # Make an object that can be inserted into the Users table
        new_user = Users(username=_username, email=_email, password=_password)

        # Perform insertion query
        db.session.add(new_user)
        db.session.commit()

        # Return success message with HTTP 200 code.
        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200



# Note for UI: Max password length 16 characters
@api.route('/api/users/login', endpoint='login')
class Login(Resource):
    @api.expect(login_model, validate=True)
    def post(self):
        req_data = request.get_json()
        _email = req_data.get("email")
        _password = req_data.get("password")

        # Check if the email exists in the database
        user = Users.query.filter_by(email=_email).first()
        

        # if both email and password are present, then check if the password is the same with the one in database
        if user and user.password == _password:

            #Create JWT token and send back to the user. They will need this for future transactions with the website.
            token = CreateJWT(user.id, _email, _password, keys[1])
            return {'success':True,  "msg":"login successful!", "jwt": token}, 200
        else:
            return {"success":False, "msg":"Invalid email or password"}, 401
        
@api.route('/api/home/sales', endpoint='sales')
class PullSales():
    def PullSales(self):
        salesCollection = AccessGarageSales.GetGarageSales()
        GarageSaleJSON = AccessGarageSales.convertGarageSaleListToJSON(salesCollection)
        return {'success': True, "msg":"Successfully got garage sale list!", "sales": GarageSaleJSON}, 200

#1. Get Sales from database and put into array
#2. Convert array to json
#3. Create an api route