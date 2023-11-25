from jsonFunctions import json_extract
import http.client
import urllib.parse
import json
import string





'''
Send a request to positionstack geocoding api with street address, city, state
and zipcode as parameters for the query. The api will return a large nested json string
containing coordinate information, country, county info, and more.
We just want the coordinates, but the ObtainCoordinates function will handle extraction.
We might want the other data from the api later.
'''

def ObtainGeoCodingApiData(streetaddr, city, state, zipcode, key):
    conn = http.client.HTTPConnection('api.positionstack.com')

    params = urllib.parse.urlencode({
        'access_key': key,
        'query': streetaddr + ', ' + city + ' ' + state + ', ' + zipcode,
        'limit': 1,
    })

    conn.request('GET', '/v1/forward?{}'.format(params))

    res = conn.getresponse()
    data = res.read()


    return data


#Pull coordinate data into an array that will be sent to the front end for
#google maps markers
def ObtainCoordinates(geocodingData):
    #obtain latitude and longitude from geocodingData
    latitude = json_extract(json.loads(geocodingData), 'latitude')
    longitude = json_extract(json.loads(geocodingData), 'longitude')

    #Convert them from a "list" to a floating point value.
    latitude = latitude[0]
    longitude = longitude[0]
    coordinates = [latitude, longitude]
    return coordinates
            
            