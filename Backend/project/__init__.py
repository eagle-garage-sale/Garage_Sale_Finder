import os
import sqlalchemy as sa
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, fields, Resource

db = SQLAlchemy()


#Factory function, this function can be called from anywhere to start a session
def create_app():
    from project.ReadKeys import ExtractKeys
    app = Flask(__name__)
    config_type = os.getenv('CONFIG_TYPE', default='config.DevelopmentConfig')
    app.config.from_object(config_type)

    keys = ExtractKeys('keys.txt')

    # Check if the database needs to be initialized
    engine = sa.create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    inspector = sa.inspect(engine)
    if not inspector.has_table("user_accounts"):
        with app.app_context():
            db.drop_all()
            db.create_all()
            app.logger.info('Initialized the database!')
    else:
        app.logger.info('Database already contains the users table')

    AccessGarageSales = GarageSaleDAO()


    from project.dbModels import Users, GarageSales
    initialize_extensions(app)
    
    from project.JWT import CreateJWT, decodeJWT
    import project.ReadKeys
    from project.geocoding import ObtainCoordinates, ObtainGeoCodingApiData
    from project.garageSaleDAO import GarageSaleDAO
    api = Api(app)
    # api models ensure that data provided by front end matches these specifications. JSON keys must match the
    # names of these values in order for this to work.
    garagesale_model = api.model('GarageSaleModel', {"street_address": fields.String(required=True, min_length=5, max_length=100),
                                                        "state": fields.String(required=True, min_length=2, max_length=2),
                                                        "city": fields.String(required=True, min_length=1, max_length=100),
                                                        "zip_code": fields.String(required=True, min_length=5, max_length=10),
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
        return {"HELLO!"}, 200

    # Add garage sale entry
    @api.route('/api/garagesales/register', endpoint = 'garagesale_register')
    class GarageSalesRegister(Resource):

        @api.expect(garagesale_model, validate=True)
        def post(self):

            # Get JSON string submitted by user
            req_data = request.get_json()


            
            #Take values from specified JSON keys and get the user_id from jwt token
            _street_address = req_data.get("street_address")
            _state = req_data.get("state")
            _city = req_data.get("city")
            _zip_code = req_data.get("zip_code")
            _user_id = req_data.get("user_id")
            _start_date = req_data.get("start_date")
            _end_date = req_data.get("end_date")
            _open_time = req_data.get("open_time")
            _close_time = req_data.get("close_time")
            _description = req_data.get("description")
            locationInfo = ObtainGeoCodingApiData(_street_address, _city, _state, _zip_code, keys[2])
            coordinates = ObtainCoordinates(locationInfo)



            # Make a new garage sale object from the values specified above
            new_sale = GarageSales(street_address = _street_address,
                                    state = _state, city = _city, zip_code = _zip_code,
                                        user_id = _user_id, start_date = _start_date,
                                        end_date = _end_date, open_time = _open_time,
                                            close_time = _close_time, description = _description,
                                            latitude = coordinates[0], longitude = coordinates[1])

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
    class PullSales(Resource):
        def post(self):
            salesCollection = AccessGarageSales.GetGarageSales()
            GarageSaleJSON = AccessGarageSales.convertGarageSaleListToJSON(salesCollection)
            print (GarageSaleJSON)
            return {'success': True, "msg":"Successfully got garage sale list!", "sales": GarageSaleJSON}, 200

    #1. Get Sales from database and put into array
    #2. Convert array to json
    #3. Create an api route

    return app


def initialize_extensions(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()

    






