import jwt
from jwt.exceptions import ExpiredSignatureError

# This does not make much sense at the moment, but when all routes
# are passed through these filters first, this function will be the
# first filter.
def ScanWhiteList(routeString):
    whiteList = ['/', '/api/users/register', '/api/users/login']
    furtherProcessingNeeded = True
    for route in whiteList:
        if routeString == route:
            furtherProcessingNeeded = False
            break
    
    return furtherProcessingNeeded


# This decodes the JWT, with a successful decoding the function will return true.
# Exception handling needs to be improved to handle most of the JWT decoding 
# exceptions, such as invalid signatures as an example.
def decodeJWT(JWT,secretKey):
    header_data = jwt.get_unverified_header(JWT)
    try:
        payload = jwt.decode(JWT, key=secretKey, algorithms=[header_data['alg'], ])
        return True

    except ExpiredSignatureError as error:
        print(f'Unable to decode the token, error: {error}')
        return False


# Eventually roles will be included in the JWT tokens, but this is after
# our core featureset is complete