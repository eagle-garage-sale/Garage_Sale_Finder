from app import db
from sqlalchemy import ForeignKey


# User table model
class Users(db.Model):
    __tablename__ = "user_accounts"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return "<username %r>" % self.username
    
class GarageSales(db.Model):
    __tablename__ = "garage_sales"
    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String(100), nullable = False)
    user_id = db.Column(ForeignKey("user_accounts.id"))
    start_date = db.Column(db.String(12), nullable = False)
    end_date = db.Column(db.String(12), nullable = False)
    open_time = db.Column(db.String(12), nullable = False)
    close_time = db.Column(db.String(12), nullable = False)
    description = db.Column(db.String(500))


#not sure how we are going to do image retrieval and storage for now, take this as theoretical.
class images(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(ForeignKey("user_accounts.id"))
    garage_sale_id = db.Column(ForeignKey("garage_sales.id"))
    file_path = db.Column(db.String(500), nullable = False)
