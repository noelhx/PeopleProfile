import requests, urlparse, json
from linkedin import linkedin

API_KEY = '78cganekthclde'
API_SECRET = 't3Aq9CePzUviXfdu'
RETURN_URL = "http://localhost:8888/"
authentication = linkedin.LinkedInAuthentication(API_KEY, API_SECRET, RETURN_URL, ['r_basicprofile'])
#url = """https://www.linkedin.com/uas/oauth2/authorization?scope=r_basicprofile&state=b2f
#59c57e0e98fc858a6d4ddfacb469f&redirect_uri=http%3A//localhost%3A8888/&response_t
#ype=code&client_id=78cganekthclde"""

#print authentication.authorization_url
application = linkedin.LinkedInApplication(authentication)
