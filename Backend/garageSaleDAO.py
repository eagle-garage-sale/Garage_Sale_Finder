import json
from dbModels import GarageSales

# The garage sale DAO will read an object from the database and return
# either a GarageSale object or an array of said objects. The purpose of this
# DAO is to perform CRUD operations on the database and to simplify readability
# in the app routes file. A user DAO might later be created to further abstract
# CRUD operations on the user table.


# This will be an object that is can be returned upon reading a valid record
# from the GarageSale table
class GarageSale():
    def __init__(self, id, street_address, state, city, zip_code, 
                 user_id, start_date, end_date, 
                 open_time, close_time, description, latitude, longitude):
        
        self.id = id
        self.street_address = street_address
        self.state = state
        self.city = city
        self.zip_code = zip_code
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.open_time = open_time
        self.close_time = close_time
        self.description = description
        self.latitude = latitude
        self.longitude = longitude

    #Serializes the class to json when called
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)


# The garage sale DAO contains a collection of functions designed to transform garage sale database information 
# into a usable Garage Sale object or an array of garage sale objects 
#
class GarageSaleDAO():
    
    # This getter funciton should only return a single Garagle Sale object
    # as it searches by primary id
    def GetGarageSaleBySaleId(self, saleId): 
        sale = GarageSales.query.filter_by(id = saleId).first()
        if sale:
            return GarageSale(sale.id, sale.street_address, sale.state, 
                              sale.city, sale.zip_code,
                              sale.user_id, sale.start_date,
                              sale.end_date, sale.open_time, sale.close_time,
                              sale.description, sale.latitude, sale.longitude)
        else:
            return False
        
    # Returns an array of garage sales by a single user id
    def GetGarageSalesByUserId(self, id):
        sales = GarageSales.query.filter_by(user_id = id).all()
        sale_collection = []

        for sale in sales:
            entry = GarageSale(sale.id, sale.street_address, sale.state, 
                              sale.city, sale.zip_code, sale.user_id, sale.start_date, 
                               sale.end_date, sale.open_time, sale.close_time, 
                               sale.description, sale.latitude, sale.longitude)
            sale_collection.append(entry)

        return sale_collection

    #Converts attributes of garage sale object to a json string
    def convertGarageSaleToJSON(self, sale):
        json_str = json.dumps(sale.toJson(), indent=9)
        print(json_str)
        return json_str
    
    #Builds json string from a collection of garage sales
    def convertGarageSaleListToJSON(self, collection):
        json_str = ""
        for sale in collection:
            json_str += self.convertGarageSaleToJSON(sale)
        return json_str

        
    

        