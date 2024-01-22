from project import db
from sqlalchemy import ForeignKey


# Here is a collection of classes that do two things,
#   1. Format database tables
#   2. Define instantiable objects that can be placed into said tables.
# For example:
'''
Users table has the following columns:
id  username  email  password

Whenever we add a "row" to this table, it must contain an id, username, email, and password.
The id in this instance, is a primary key, which means that it does not need to be included in
any row addition query. The id will increment with each new "record" (also refered to as a row)

Lets say we want to add a user to the users table, we need to first create a "Users" object (defined below).
This class has a collection of variables that are formatted as "db.Columns" this simply attaches attributes 
to the variables - so for example we can make it a string with a limit of 25 chars. In MYSQL, this would be
a "VARCHAR" with the "length" of 25.

We would create this object like so:

user_entry = Users(username="lemon", email="lemon@jello.com", password="BigBoy97@2").

The next step is to add this formatted object to the database like such:
    db.session.add(user_entry)
    db.commit()

TL;DR to add a new entry:
    1. Create object with appropriate arguments
    2. Add object to table
    3. Finalize this "query"

    user_entry = Users(username="lemon", email="lemon@jello.com", password="BigBoy97@2")
    db.session.add(user_entry)
    db.commit()

For more information on other CRUD operations (create, read, update, delete) using SQLAlchemy, refer to app.py comments
or refer to sqlalchemy documentation to https://docs.sqlalchemy.org/en/20/orm/quickstart.html#simple-select
'''

#Add Databases



# User table model
class Users(db.Model):
    __tablename__ = "user_accounts"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return "<username %r>" % self.username
    
# Garage Sale model
class GarageSales(db.Model):
    __tablename__ = "garage_sales"
    id = db.Column(db.Integer, primary_key = True)
    street_address = db.Column(db.String(100), nullable = False)
    state = db.Column(db.String(3), nullable = False)
    city = db.Column(db.String(30), nullable = False)
    zip_code = db.Column(db.String(10), nullable = False)
    user_id = db.Column(ForeignKey("user_accounts.id"))
    start_date = db.Column(db.String(12), nullable = False)
    end_date = db.Column(db.String(12), nullable = False)
    open_time = db.Column(db.String(12), nullable = False)
    close_time = db.Column(db.String(12), nullable = False)
    description = db.Column(db.String(500))
    latitude = db.Column(db.String(30), nullable = False)
    longitude = db.Column(db.String(30), nullable = False)

    def __repr__(self):
        return "<id %r>" % self.id


#not sure how we are going to do image retrieval and storage for now, take this as theoretical.
class images(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(ForeignKey("user_accounts.id"))
    garage_sale_id = db.Column(ForeignKey("garage_sales.id"))
    file_path = db.Column(db.String(500), nullable = False)
