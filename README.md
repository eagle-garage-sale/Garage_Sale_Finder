NOTE

BEFORE RUNNING BACKEND

Make sure that in flask_restx/api.py (should be in your .venv folder once you install the flask_restx dependency) that the following is changed.

flask.scaffold -> flask.sansio.scaffold

should be around line 17

Original issue here
https://github.com/python-restx/flask-restx/issues/567

<h1>HOW TO TEST BACKEND MANUALLY: </h1>

This guide will go through how to test the registration route using Postman. This program is great for manual testing because you can save collections of various requests and is far easier to use than typing curl commands into a command line.

1. [Install Postman](https://www.postman.com/downloads/)

2. Make sure that your backend is running, to start it, activate your virtual environment (.venv\Scripts\Activate for windows systems). Then run your backend with flask --app app run

3. Postman starts you on "My Workspace". On the left window,
    click "New" and then "HTTP".

4. Change your request type (GET, POST, PUT, DELETE) using the drop down menu that by default is set to "GET", set it to POST for this route.

5. Enter api url, by default it should be http://127.0.0.1:5000/api/users/register.

6. In the Headers tab, type "Content-Type" for the key, and "application/json" for the value.

7. In the Body tab, make sure to select "raw" from the drop down menu, and "JSON" from the second drop down menu. Fill out the following in the editor below.

{
    "username":"test1001",
    "email":"test1001@tikiman.com",
    "password":"pass"

}

It can be anything you want of course. This is how you would format it.

8. Click send, and look at the bottom console for results, if the user name is already in your database it should return "Email already taken" and you'll get a 400 error code. If it is successful you should recieve a 200 error code.

9. For testing login, it essentially the same procedure, just use /api/users/login instead of register and don't include a username in your json data.
