from project.dbModels import Users

def test_new_user(new_user):
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the username, email, and password fields are defined correctly
    """

    
    assert new_user.username == "tikiman"
    assert new_user.email == "tikiman@big.com"
    assert new_user.password == "th1s1s@pain"