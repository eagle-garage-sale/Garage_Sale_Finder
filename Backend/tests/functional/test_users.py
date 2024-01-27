from conftest import post_json

def test_valid_registration(test_client):
    """
    GIVEN a Flask app configured for testing
    WHEN the '/api/users/register' route is given a POST request with valid data
    THEN check for valid response
    """


    response = post_json(test_client, '/api/users/register', {
        "username":"bigeeeee",
        "email": "bige@bige.com",
        "password": "oHyEs95@"
    })
    assert response.status_code == 200


def test_valid_login(test_client):
    """
    GIVEN a Flask app configured for testing
    WHEN the '/api/users/login' route is given a POST request with valid data
    THEN check for valid response
    """

    response = post_json(test_client, '/api/users/login', {
        "email":"bige@bige.com",
        "password": "oHyEs95@"
    })

    assert response.status_code == 200
    assert b"login successful!" in response.data
    

def test_invalid_login(test_client):
    """
    GIVEN a Flask app configured for testing
    WHEN the '/api/users/login' route is given a POST request with a nonexistant user
    THEN check for valid reponse (401) 
    """

    response = post_json(test_client, '/api/users/login', {
        "email": "skibiditoilet@braindamage.com",
        "password": "sk1b1d1"
    })

    assert response.status_code == 401
    assert b"Invalid email or password" in response.data