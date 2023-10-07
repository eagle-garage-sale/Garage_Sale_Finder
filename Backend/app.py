import secrets
import bleach

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)

#Add Databases
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'


# Secret key
app.config['SECRET_KEY'] = secrets.token_hex(16)

# Initialize database
db = SQLAlchemy(app)

from dbModels import Users


with app.app_context():
    db.create_all()


def sanatize(data):
    return bleach.clean(data)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
    
@app.route('/api/users/register')
