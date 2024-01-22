import jwt


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


# Eventually roles will be included in the JWT tokens, but this is after
# our core featureset is complete