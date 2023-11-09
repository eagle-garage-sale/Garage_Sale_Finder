import jwt


# Generate JWT token with important user info (id, email, and password) as payloads.
# These values can be extracted from the token, and will be useful for features such
# as displaying all the user's garage sales or profile settings.
# it also allows the website to function without sessions. JWT tokens also expire
# so new ones will need to be generated upon each log in.
def CreateJWT(id, email, password, secretKey):
   payload_data = {
        "user_id": id,

        "email": email,

        "password": password
    }
   token = jwt.encode(payload=payload_data, key=secretKey, algorithm='HS256')
   return token
    
