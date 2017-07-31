import requests, urlparse, json
from linkedin import linkedin
from selenium import webdriver

API_KEY = '78cganekthclde'
API_SECRET = 't3Aq9CePzUviXfdu'
RETURN_URL = "http://localhost:8888/"
authentication = linkedin.LinkedInAuthentication(API_KEY, API_SECRET, RETURN_URL, ['r_basicprofile'])
#url = """https://www.linkedin.com/uas/oauth2/authorization?scope=r_basicprofile&state=b2f
#59c57e0e98fc858a6d4ddfacb469f&redirect_uri=http%3A//localhost%3A8888/&response_t
#ype=code&client_id=78cganekthclde"""

#print authentication.authorization_url
application = linkedin.LinkedInApplication(authentication)

driver = webdriver.Chrome('C://PeopleProfile/chromedriver.exe')
driver.get(authentication.authorization_url)

while "localhost:8888" not in driver.current_url:
    {
    }

authorization_url = driver.current_url
parsed_code = urlparse.urlparse(authorization_url)
code = urlparse.parse_qs(parsed_code.query)['code']
authentication.authorization_code = code[0]
authentication.get_access_token()

print json.dumps(application.get_profile(selectors=['id', 'first-name', 'last-name', 'headline', 'picture-url']))
