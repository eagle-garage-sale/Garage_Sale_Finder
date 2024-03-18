import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError, InvalidSignatureError, InvalidKeyError, MissingRequiredClaimError

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


# This decodes the JWT, with a successful decoding the function will return the payload
# Exception handling needs to be improved to handle most of the JWT decoding 
# exceptions, such as invalid signatures as an example.
def decodeJWT(JWT,secretKey):
    header_data = jwt.get_unverified_header(JWT)
    try:
        payload = jwt.decode(JWT, key=secretKey, algorithms=[header_data['alg'], ])
        return payload

    except ExpiredSignatureError as error:
        print(f'Unable to decode the token, error: {error}')
        return False
    
    except InvalidTokenError as error:
        print(f'Unable to decode the token, error: {error}')
        return False
    
    except InvalidKeyError as error:
        print(f'Unable to decode the token, error: {error}')
        return False
    
    except InvalidSignatureError as error:
        print(f'Unable to decode the token, error: {error}')
        return False
    
    except MissingRequiredClaimError as error:
        print(f'Unable to decode the token, error: {error}')
        return False
    


# Take the data from the JWT token, and retrun only the user_id. With this
# we can parse the database and obtain any users account information
def extract_id(token, secretKey):
   data = decodeJWT(token, secretKey)
   return data["user_id"]

def extract_email(token, secretKey):
    data = decodeJWT(token, secretKey)
    return data["email"]