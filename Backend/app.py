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
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'



# Initialize database
db = SQLAlchemy(app)

from dbModels import Users, GarageSales, images 


with app.app_context():
    db.create_all()


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