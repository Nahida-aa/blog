import requests

# get请求
response = requests.get('http://www.baidu.com')
response.encoding = 'utf-8'
print(response.text)