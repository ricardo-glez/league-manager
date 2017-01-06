from bs4 import BeautifulSoup as bs
import requests
s = requests.session()
url = r'http://p0298.tracktio.com:9000/'
headers = {'inputEmail': 'admin', 'inputPassword': 's3cret', '_Id': 'submit'}
page=s.get(url)
# En el valor soup se muestra el contenido de la pagina,
# que al corroborarlo con el markup html del sitio de tracksphere no incluye el formulario
# por lo que no es posible ingresar desde la aplicacion
soup=bs(page.content,'lxml')
#En esta parte se busca los inputs del formulario para ingresar los datos pero no aparecen en el html
value=soup.find_all('input')
headers.update({'value_name':value})
auth = s.post(url, params=headers, cookies=page.cookies)
print(soup, value)
