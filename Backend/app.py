from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"