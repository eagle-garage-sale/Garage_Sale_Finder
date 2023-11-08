import secrets
import bleach

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import jwt





app = Flask(__name__)
api = Api(app)
CORS(app)

#Add Databases
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'



# Initialize database
db = SQLAlchemy(app)

from dbModels import Users, images, GarageSales
from garageSaleDAO import GarageSaleDAO
with app.app_context():
    db.create_all()

AccessGarageSales = GarageSaleDAO()

garagesale_model = api.model('GarageSaleModel', {"location": fields.String(required=True, min_length=2, max_length=100),
                                              "user id": fields.Integer(required=True),
                                              "start date": fields.String(required=True, min_length=4, max_length=12),
                                              "end date": fields.String(required=True, min_length=4, max_length=12),
                                              "open time": fields.String(required=True, min_length=4, max_length=12),
                                              "close time": fields.String(required=True, min_length=4, max_length=12),
                                              "description": fields.String(required=True, min_length=4, max_length=500)
                                              })

signup_model = api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })



@app.route('/')
def hello():
    return "HELLO!"

@api.route('/api/garagesales/register', endpoint = 'garagesales_register')
class GarageSalesRegister(Resource):
    @api.expect(garagesale_model, validate=True)
    def post(self):

        req_data = request.get_json()
        print(req_data)

        _location = req_data.get("location")
        _user_id = req_data.get("user_id")
        _start_date = req_data.get("start_date")
        _end_date = req_data.get("end_date")
        _open_time = req_data.get("open_time")
        _close_time = req_data.get("close_time")
        _description = req_data.get("description")

        new_sale = GarageSales(location = _location, user_id = _user_id, start_date = _start_date, end_date = _end_date, open_time = _open_time, close_time = _close_time, description = _description)

        db.session.add(new_sale)
        db.session.commit()

        return {"success": True,
                "garageSaleID": new_sale.id,
                "msg": "The garage sale was successfully registered"}, 200



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
            #Generate a JSON web token for authentication
            #token = jwt({"user_id": user.id}, 'secret_key', algorithm='HS256')
            return {'success':True,  "msg":"login successful!"}, 200
        else:
            return {"success":False, "msg":"Invalid email or password"}, 401
        

#NOT MEANT TO BE AN ACTUAL ROUTE
#Just something to test the Garage Sale DAO during development until automated testing is figured out
#Note to team: Remove after sprint 2

"""
@app.route('/api/givefirstsale')
def giveObject():

    new_sale = GarageSales(location="76201", user_id = 1, start_date = "1111", 
                               end_date = "2020", open_time = "8", close_time = "9", description = "tiki")

    db.session.add(new_sale)
    db.session.commit()

    #Insert garage sale primary id argument to the GetGarageSaleById function to test out the 
    #record obtaining functionality of the Garage Sale DAO
    test_sale = AccessGarageSales.GetGarageSaleById(2)

    if test_sale:
        print (test_sale.description)
        return {'success':True, "msg": "Garage Sale exists!"}, 200
    
    
    #We are returning a success HTTP code because we don't want the user to see
    #the lack of a search result as an error. 
    else:
        return {'success':False, "msg": "Garage Sale does not exists!"}, 200
    

@app.route('/api/returnsalesfromuser')
def returnAllSalesFromUser():

    sales = AccessGarageSales.GetGarageSalesByUserId(1)

    print(sales)
    if sales:
        for sale in sales:
            print (sale.description)
        return {'success':True, "msg": "Garage Sale exists!"}, 200
    
    
    #We are returning a success HTTP code because we don't want the user to see
    #the lack of a search result as an error. 
    else:
        return {'success':False, "msg": "Garage Sale does not exists!"}, 200

    
"""
@app.route('/api/testJSON')
def testJSON():
    new_sale = GarageSales(location="76201", user_id = 1, start_date = "1111", 
                               end_date = "2020", open_time = "8", close_time = "9", description = "tiki")

    db.session.add(new_sale)
    db.session.commit()

    test_sale = AccessGarageSales.GetGarageSaleBySaleId(1)

    return AccessGarageSales.convertGarageSaleToJSON(test_sale)

@app.route('/api/testJSONList')
def testJSONList():

    new_sale = GarageSales(location="76201", user_id = 1, start_date = "1111", 
                               end_date = "2020", open_time = "8", close_time = "9", description = "tiki")

    db.session.add(new_sale)
    db.session.commit()

    new_sale = GarageSales(location="76301", user_id = 1, start_date = "1111", 
                               end_date = "2025", open_time = "9", close_time = "11", description = "big")

    db.session.add(new_sale)
    db.session.commit()

    test_collection = AccessGarageSales.GetGarageSalesByUserId(1)

    return AccessGarageSales.convertGarageSaleListToJSON(test_collection)