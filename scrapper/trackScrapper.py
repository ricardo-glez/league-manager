from bs4 import BeautifulSoup as bs
import requests
s = requests.session()
url = r'http://p0298.tracktio.com:9000/'

headers = {'inputEmail': 'usr', 'inputPassword': 'pswd', '_Id': 'submit'}
page=s.get(url)
soup=bs(page.content,'lxml')
value=soup.find_all('input')
headers.update({'value_name':value})
auth = s.post(url, params=headers, cookies=page.cookies)
print(soup, value)
