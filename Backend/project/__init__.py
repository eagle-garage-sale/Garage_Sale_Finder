import os
import sqlalchemy as sa
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, fields, Resource
from flask_cors import CORS
from werkzeug.utils import secure_filename

db = SQLAlchemy()


#Factory function, this function can be called from anywhere to start the application
def create_app():
    from project.ReadKeys import ExtractKeys
    app = Flask(__name__)

    #The following two lines setup the apps configuration, which can be
    #found in config.py.
    config_type = os.getenv('CONFIG_TYPE', default='config.DevelopmentConfig')
    app.config.from_object(config_type)
    app.config['UPLOAD_FOLDER'] = 'UserFolders/'
    ALLOWED_EXTENSIONS = set(['jpg', 'png'])

        
    def allowedFile(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


    #Save all our neccessary keys to an array.
    keys = ExtractKeys('keys.txt')


    from project.dbModels import Users, GarageSales

    #Only extension is SQLAlchemy, this ties it to the session
    initialize_extensions(app)
    
    


   
    #Now that the app has started, we can make our imports
    from project.JWT import CreateJWT, decodeJWT, extract_id, extract_email
    from project.geocoding import ObtainCoordinates, ObtainGeoCodingApiData
    from project.garageSaleDAO import GarageSaleDAO

    #This object is how we will manipulate our collection of garage sales in memory
    #It's also our way of converting this data to JSON for frontend delivery
    AccessGarageSales = GarageSaleDAO()

    # api models ensure that data provided by front end matches these specifications. JSON keys must match the
    # names of these values in order for this to work.
    api = Api(app)
    CORS(app)

   
    garagesale_model = api.model('GarageSaleModel', {"street_address": fields.String(required=True, min_length=5, max_length=100),
                                                        "state": fields.String(required=True, min_length=2, max_length=2),
                                                        "city": fields.String(required=True, min_length=1, max_length=100),
                                                        "zip_code": fields.String(required=True, min_length=5, max_length=10),
                                                    "start_date": fields.String(required=True, min_length=4, max_length=12),
                                                    "end_date": fields.String(required=True, min_length=4, max_length=12),
                                                    "open_time": fields.String(required=True, min_length=4, max_length=12),
                                                    "close_time": fields.String(required=True, min_length=4, max_length=12),
                                                    "description": fields.String(required=True, min_length=4, max_length=500),
                                                    "tag": fields.String(required=True, min_length=4, max_length=500),
                                                    "token": fields.String(required=True, min_length=0, max_length=100000)
                                                    })

    signup_model = api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                                    "email": fields.String(required=True, min_length=4, max_length=64),
                                                    "password": fields.String(required=True, min_length=4, max_length=16)
                                                    })

    login_model = api.model('LoginModel', {"email": fields.String(required=True,min_length=4, max_length=64), 
                                            "password": fields.String(required=True, min_length=4, max_legnth=16)})
    
  


    @app.route('/')
    def hello():
        return {"msg": "HELLO!"}, 200
    
    @app.route('/garagesales/addImage', methods=['POST', 'GET'])
    def fileUpload():

        username = request.form.get("username")
        
        user_folder = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if request.method == 'POST':
            file = request.files.getlist('file')
            for f in file:
                filename = secure_filename(f.filename)
                if allowedFile(filename):
                    f.save(os.path.join(user_folder, filename))
                else:
                    return jsonify({'message': 'File type not allowed'}), 400
            return jsonify({"name": filename, "status": "success"})
        else:
            return jsonify({"status": "failed"})

    # Add garage sale entry
    @api.route('/api/garagesales/register', endpoint = 'garagesale_register')
    class GarageSalesRegister(Resource):

        @api.expect(garagesale_model, validate=True)
        def post(self):

            # Get JSON string submitted by user
            req_data = request.get_json()
            print(req_data)

            #Take values from specified JSON keys and get the user_id from jwt token
            _street_address = req_data.get("street_address")
            _state = req_data.get("state")
            _city = req_data.get("city")
            _user_id = ""
            _user_email = ""
            _zip_code = req_data.get("zip_code")
            _start_date = req_data.get("start_date")
            _end_date = req_data.get("end_date")
            _open_time = req_data.get("open_time")
            _close_time = req_data.get("close_time")
            _description = req_data.get("description")
            _tag = req_data.get("tag")
            
            print(keys[2])
            locationInfo = ObtainGeoCodingApiData(_street_address, _city, _state, _zip_code, keys[2])
            coordinates = ObtainCoordinates(locationInfo)
            token = req_data.get("token")


            if decodeJWT(token, keys[1]) is not False:
                _user_id = extract_id(token, keys[1])
            else:
                return {"sucess": False,
                        "msg": "Bad JWT token"}, 401




            # Make a new garage sale object from the values specified above
            new_sale = GarageSales(street_address = _street_address,
                                    state = _state, city = _city, zip_code = _zip_code,
                                        user_id = _user_id, start_date = _start_date,
                                        end_date = _end_date, open_time = _open_time,
                                            close_time = _close_time, description = _description, tag = _tag,
                                            latitude = coordinates[0], longitude = coordinates[1])

            # Perform insertion query to GarageSales table and finalize query.
            db.session.add(new_sale)
            db.session.commit()

            # Add images

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


            #Add a folder for the users uploaded images
            user_folder = os.path.join(app.config['UPLOAD_FOLDER'], _email.split("@")[0])
            os.mkdir(user_folder)
            
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
                return {'success':True,  "msg":"login successful!", "jwt": token, "username": _email.split("@")[0]}, 200
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


        db.drop_all()
        db.create_all()

