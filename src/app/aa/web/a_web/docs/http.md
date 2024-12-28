# http

在 浏览器 输入 url(包括ip_url) 会发生什么:

- if 有url 响应 缓 and 未过期
  - 从缓存中获取数据
- else
  - if is ip_url
    - 建立 TCP 连接
    - 发送 HTTP 请求
    - 服务器处理请求
    - 服务器返回 HTTP 响应
    - 浏览器解析渲染页面
    - 断开 TCP 连接
  - elif 有 DNS 缓存
    - 从 DNS 缓存中获取 ip
    - 建立 TCP 连接
    - 发送 HTTP 请求
    - 服务器处理请求
    - 服务器返回 HTTP 响应
    - 浏览器解析渲染页面
    - 断开 TCP 连接
  - else
    - 向 DNS 服务器请求, 将域名解析为 ip, 将结果存储到 DNS 缓存中
    - 建立 TCP 连接
    - 发送 HTTP 请求:
      - 发生 http 请求行 (http request line: GET /lib?q=web HTTP/1.1)
      - 发送 http 请求头 (http request header)
      - 发送 http 请求空行
    - 服务器处理请求
    - 服务器返回 HTTP 响应:
      - 发送 http 响应行 (http response line)
      - 发送 http 响应头 (http response header)
      - 发送 http 响应空行
      - 发送 http 响应体 (http response body)
    - 浏览器解析渲染页面
    - 断开 TCP 连接

## 一次 HTTP 请求的过程

- 建立连接: TCP连接
