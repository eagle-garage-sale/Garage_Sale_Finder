import os
from project import create_app, db
from project.dbModels import Users
import pytest


@pytest.fixture(scope='module')
def new_user():
    user = Users(username="tikiman", email="tikiman@big.com", password="th1s1s@pain")
    return user


@pytest.fixture(scope='module')
def test_client():

    # Set the Testing configuration prior to creating the Flask application
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    flask_app = create_app()


    # Create a test client using hte flask application configured for testing
    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client


