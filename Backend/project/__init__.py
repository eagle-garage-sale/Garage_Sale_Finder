import os
import sqlalchemy as sa
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, fields, Resource
from flask_cors import CORS
from werkzeug.utils import secure_filename
import base64
import json
from PIL import Image
from io import BytesIO

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
    app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024 * 10

        
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
    from project.userRecordDAO import UserRecordDAO

    #This object is how we will manipulate our collection of garage sales in memory
    #It's also our way of converting this data to JSON for frontend delivery
    AccessGarageSales = GarageSaleDAO()

    #This object is how we will manipulate user objects in memory
    AccessUsers = UserRecordDAO()

    # api models ensure that data provided by front end matches these specifications. JSON keys must match the
    # names of these values in order for this to work.
    api = Api(app)
    CORS(app)

   
    garagesale_model = api.model('GarageSaleModel', {"title": fields.String(required=True, min_length=4, max_lenght=100),
                                                    "street_address": fields.String(required=True, min_length=5, max_length=100),
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
    userId_model = api.model('UserIDModel', {"token": fields.String(required=True,min_length=1, max_length=100000)})
    
    token_model = api.model("tokenModel", {"token": fields.String(required=True,min_length=1, max_length=100000)})


    @app.route('/')
    def hello():
        return {"msg": "HELLO!"}, 200
    
    @app.route('/garagesales/ImageUpload', methods=['POST'])
    def imageHandler():

        #Image uploads
        if request.method == "POST":
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
            
    @app.route('/garagesales/ImageViewer', methods=['POST'])
    def imageDownloader():
        if request.method == "POST":

            #Get json data (the garage sale id)
            req_data = request.get_json()
            print(req_data)

            _garage_sale = req_data.get("garage_sale_id")

            #Find user_id based on garage sale id
            sale = AccessGarageSales.GetGarageSaleBySaleId(_garage_sale)
            user_id = sale.user_id

            #Get email through user_id
            user = AccessUsers.GetUserById(user_id)
            email = user.email.split("@")[0]
            user_folder_path = os.path.join(app.config['UPLOAD_FOLDER'], email)
            image_names = os.listdir(user_folder_path)
            base64_image_collection = []

            #Go through the specified image folder and convert 
            for filename in image_names:
                img = os.path.join(user_folder_path, filename)
                ##compress images first
                compressed_img = Image.open(img)
                compressed_img.thumbnail((300,150))
                im_file = BytesIO()
                compressed_img.save(im_file, format=compressed_img.format)
                im_bytes = im_file.getvalue()
    
                encoded_image = base64.b64encode(im_bytes)
                base64_image_collection.append(encoded_image)
                print(compressed_img.size)
             

            #Convert the base64_image_collection into JSON 
            json_str = "["
            i = 0
            for image in base64_image_collection:
                image = image.decode('utf-8')
                print(type(image))
                if len(base64_image_collection) > 1 and i < len(base64_image_collection) - 1:
                    json_str += json.dumps(image) + ','
                else:
                    json_str += json.dumps(image)
                i += 1

            json_str +=']'
        
            return {"success": True,
                        "images": json_str}, 200
            

    

    # POST: Add garage sale entry
    # DELETE: Delete garage sale from passed user id
    @api.route('/api/garagesales/register', endpoint = 'garagesale_register')
    class GarageSalesRegister(Resource):

        @api.expect(garagesale_model, validate=True)
        def post(self):

            # Get JSON string submitted by user
            req_data = request.get_json()
            print(req_data)

            #Take values from specified JSON keys and get the user_id from jwt token
            _title = req_data.get("title")
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
            
            user_garage_sale = AccessGarageSales.GetGarageSalesByUserId(_user_id)

            if not user_garage_sale:
                    
                # Make a new garage sale object from the values specified above
                new_sale = GarageSales( title = _title,
                                        street_address = _street_address,
                                        state = _state, city = _city, zip_code = _zip_code,
                                            user_id = _user_id, start_date = _start_date,
                                            end_date = _end_date, open_time = _open_time,
                                                close_time = _close_time, description = _description, tag = _tag,
                                                latitude = coordinates[0], longitude = coordinates[1])

                # Perform insertion query to GarageSales table and finalize query.
                db.session.add(new_sale)
                db.session.commit()


                # Return HTTP code 200 (success) upon completion. 
                return {"success": True,
                        "garageSaleID": new_sale.id,
                        "msg": "The garage sale was successfully registered"}, 200
            else:
                return {"success": False,
                        "msg": "You already have a garage sale listing, either delete your sale or wait for the current one to expire."}
            

        @api.expect(token_model, validate=True)  
        def delete(self):
            req_data = request.get_json()
            _user_id = ""
            _user_email = ""
            token = req_data.get("token")

            if decodeJWT(token, keys[1]) is not False:
                _user_id = extract_id(token, keys[1])
                _user_email = extract_email(token, keys[1]).split("@")[0] + '/'
                print(_user_email)
            else:
                return {"sucess": False,
                        "msg": "Bad JWT token"}, 401
            GarageSales.query.filter_by(user_id=_user_id).delete()

            print("REMOVING IMAGES")
            user_folder = os.path.join(app.config['UPLOAD_FOLDER'], _user_email)
            for file_name in os.listdir(user_folder):
                  file = user_folder + file_name
                  print(file)
                  os.remove(file)
            
            print("other userID: ", _user_id)
            db.session.commit()
            

            #db.drop_all()
            #GarageSales.query.delete()
            #db.session.commit()
            return {'success': True, "msg":"Successfully deleted the garage sale list!"}, 200

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
                return {"success":False, "msg":"Invalid email or password"}
            
            
            

    

    @api.route('/api/home/sales', endpoint='sales')
    class PullSales(Resource):
        def post(self):
                salesCollection = AccessGarageSales.GetGarageSales()
                GarageSaleJSON = AccessGarageSales.convertGarageSaleListToJSON(salesCollection)
                print (GarageSaleJSON)
                return {'success': True, "msg":"Successfully got garage sale list!", "sales": GarageSaleJSON}, 200


    #Get Garage Sale by User ID Route.
    @api.route('/api/home/usersales', endpoint='usersales')
    
    class UserSales(Resource):
        @api.expect(userId_model, validate=True)
        def post(self):

            #Extract userId from request
            req_data = request.get_json()
            print(req_data)
            _user_id = ""
            token = req_data.get("token")
   
            if decodeJWT(token, keys[1]) is not False:
                _user_id = extract_id(token, keys[1])
            else:
                return {"sucess": False,
                        "msg": "Bad JWT token"}, 401

            salesCollection = AccessGarageSales.GetGarageSalesByUserId(_user_id)
            GarageSaleJSON = AccessGarageSales.convertGarageSaleListToJSON(salesCollection)
            print (GarageSaleJSON)
            return {'success': True, "msg":"Successfully got garage sale list by user ID!", "sales": GarageSaleJSON}, 200
        

    return app

    
def initialize_extensions(app):
    db.init_app(app)
    with app.app_context():


        db.create_all()

