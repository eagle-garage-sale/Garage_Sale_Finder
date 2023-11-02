import json
from dbModels import GarageSales

# The garage sale DAO will read an object from the data base and return a json object containing


#This will be an object that is returned upon database access
class GarageSale():
    def __init__(self, id, location, user_id, start_date, end_date, open_time, close_time, description):
        self.id = id
        self.location = location
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.open_time = open_time
        self.close_time = close_time
        self.description = description


#The garage sale DAO contains a collection of functions designed to transform garage sale database information into a usable object. 
#It also contains an array constructor that will then be converted to json data for frontend code to use to render listings
class GarageSaleDAO():
    
    def GetGarageSaleById(self, saleId): 
        sale = GarageSales.query.filter_by(id = saleId).first()
        if sale:
            return GarageSale(sale.id, sale.location,
                              sale.user_id, sale.start_date,
                              sale.end_date, sale.open_time, sale.close_time,
                              sale.description)
        else:
            return False
        
    def GetGarageSalesByUserId(self, id):
        sales = GarageSales.query.filter_by(user_id = id).all()
        sale_collection = []

        for sale in sales:
            entry = GarageSale(sale.id, sale.location, sale.user_id, sale.start_date, 
                               sale.end_date, sale.open_time, sale.close_time, sale.description)
            sale_collection.append(entry)

        return sale_collection


        
    

        