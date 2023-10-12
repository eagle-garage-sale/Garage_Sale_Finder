NOTE

BEFORE RUNNING BACKEND

Make sure that in flask_restx/api.py (should be in your .venv folder once you install the flask_restx dependency) that the following is changed.

flask.scaffold -> flask.sansion.scaffold

should be around line 17

Original issue here
https://github.com/python-restx/flask-restx/issues/567
