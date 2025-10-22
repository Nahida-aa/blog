import urllib.parse

url: str = "https://www.google.com/search?q=python+%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB&oq=python+%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgMGIAEMgcIAhAAGIAEMgkIAxAAGAwYgAQyCQgEEAAYDBiABDIKCAUQABiABBiiBNIBCDg1NDZqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8"

# 解析url
parsed_url = urllib.parse.urlparse(url)
print(parsed_url)
ParseResult = "ParseResult(scheme='https', netloc='www.google.com', path='/search', params='', query='q=python+%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB&oq=python+%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgMGIAEMgcIAhAAGIAEMgkIAxAAGAwYgAQyCQgEEAAYDBiABDIKCAUQABiABBiiBNIBCDg1NDZqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8', fragment='')"

# 解码url
decode_url = urllib.parse.unquote(url)
print(decode_url) # https://www.google.com/search?q=python+网络爬虫&oq=python+网络爬虫&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgMGIAEMgcIAhAAGIAEMgkIAxAAGAwYgAQyCQgEEAAYDBiABDIKCAUQABiABBiiBNIBCDg1NDZqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8

query_params = urllib.parse.parse_qs(parsed_url.query)
print(f"query_params:{query_params}")

# 编码url
# Correct way to encode the query parameters back to a URL-encoded string
encoded_query = urllib.parse.urlencode(query_params, doseq=True)
print(f"encoded_query: {encoded_query}")

# Reconstruct the full URL with the encoded query parameters
encoded_url = urllib.parse.urlunparse(parsed_url._replace(query=encoded_query))
print(f"encoded_url: {encoded_url}")
if url == encoded_url:
    print("The original URL and the reconstructed URL are the same.")