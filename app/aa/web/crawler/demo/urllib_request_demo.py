import urllib.request

url = "https://github.com/xia-aa"
response = urllib.request.urlopen(url) # data=None 时: request.method=GET, else request.method=POST
# print(response.read())
html = response.read().decode("utf-8")
print(html)

# 构建请求对象
headers = {}
request = urllib.request.Request(url, headers=headers)
response = urllib.request.urlopen(request)