import os
from project import create_app, db
from project.dbModels import Users
import pytest
import json



#Premade User object for testing anything requiring the user model (for example)
#we can create 
@pytest.fixture(scope='module')
def new_user():
    user = Users(username="tikiman", email="tikiman@big.com", password="th1s1s@pain")
    return user

@pytest.fixture(scope="module")
def fake_jwt_cookie():
    jwt = "_xsrf=2|8f94afa9|f33d112a4665e95638ea8dd7405c9ef4|1706063475"
    return jwt



#Starts the application for functional tests
@pytest.fixture(scope='module')
def test_client():

    # Set the Testing configuration prior to creating the Flask application
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    flask_app = create_app()


    # Create a test client using hte flask application configured for testing
    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client

#Formats the json data to match what would be sent to the post routes.
def post_json(client, url, json_dict):
    return client.post(url, data=json.dumps(json_dict), content_type='application/json')

