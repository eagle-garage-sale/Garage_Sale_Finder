import secrets
import bleach

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, fields
import jwt



app = Flask(__name__)

#Add Databases
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'


# Secret key
app.config['SECRET_KEY'] = secrets.token_hex(16)

# Initialize database
db = SQLAlchemy(app)

from dbModels import Users, GarageSales, images 


with app.app_context():
    db.create_all()


rest_api = Api(version="1.0", title="users API")

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

@rest_api.route('/api/users/register')
class Register(Resource):
    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400