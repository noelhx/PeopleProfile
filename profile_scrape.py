import json
import urllib2
from bs4 import BeautifulSoup
from selenium import webdriver
driver = webdriver.Chrome('C://PeopleProfile/chromedriver.exe')
profile_link = "https://www.linkedin.com/in/shannon-feng"
driver.get(profile_link)
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')
driver.close()

summary = soup.find('div', { 'class' : 'description' })
summary = json.dumps(summary.getText())

img = soup.find('a', {'class': 'photo'})
img = json.dumps(img.get('href'))

print '{ "summary":' +summary+ ', "img":' +img+ ' }'  # prints in JSON format
