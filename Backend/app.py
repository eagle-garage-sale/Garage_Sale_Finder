from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date

app = Flask(__name__)

#Add Databases
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"