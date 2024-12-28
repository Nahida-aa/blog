# crawler

Python 网络爬虫

## 1. 基础知识

### HTTP 协议

#### HTTP&HTTPS

#### URL&URI

- URI: Uniform Resource Identifier 统一资源标识符, 是一个更广泛的概念, 是用于标识资源的字符串. 它可以是一个 URL，也可以是一个 URN（Uniform Resource Name，统一资源名称）。URI 是一个更广泛的概念，包含了 URL 和 URN
  - **URN（也是 URI）**：
   ```
   urn:isbn:0451450523
   ```
- URL: Uniform Resource Locator 统一资源定位符, 是一种特定类型的 URI
  1. **方案（Scheme）**：例如 `http`、`https`、`ftp` 等。
  2. **权威（Authority）**：包括用户信息、主机名和端口号。
  3. **路径（Path）**：资源在服务器上的路径。
  4. **查询（Query）**：提供额外的参数。
  5. **片段（Fragment）**：资源内的一个片段。

  ```sh
  http://www.example.com:80/path/to/resource?query=example#fragment
  ```

#### request methods

##### GET
##### POST
##### UPDATE
##### PUT
##### DELETE

#### request headers

```ts
{
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Referer": "https://www.example.com",
  "cookie": "_ga=GA1.1.473308913.1729963494; tmr_lvid=f2edb560b4993e29d7840822f3db9368; tmr_lvidTS=1731776261208; _ga_DVGZCE0F9H=GS1.1.1732723299.11.0.1732723299.0.0.0"
}
```

#### response status_code

- **状态码**：200（成功）、404（未找到）、500（服务器错误）等。

### Session & Cookie

#### Session
**Session**（会话）是一种在服务器端存储用户数据的机制，用于在多个请求之间保持用户的状态。每个用户在访问网站时，服务器会为其创建一个唯一的 Session ID，并将其存储在服务器端。用户的所有相关数据都与这个 Session ID 关联。

- **特点**：
  - 存储在服务器端。
  - 安全性较高，因为数据不暴露在客户端。
  - 适用于存储敏感信息和大量数据。
  - 需要通过 Cookie 或 URL 参数将 Session ID 传递给客户端。

- **工作原理**：
  1. 用户首次访问网站时，服务器创建一个 Session，并生成一个唯一的 Session ID。
  2. 服务器将 Session ID 通过 Cookie 或 URL 参数发送给客户端。
  3. 客户端在后续请求中将 Session ID 发送回服务器。
  4. 服务器根据 Session ID 找到对应的 Session 数据，处理请求。

```py
from flask import Flask, session, redirect, url_for, request

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

@app.route('/login', methods=['POST'])
def login():
    session['username'] = request.form['username']
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
```

#### Cookie
**Cookie** 是一种在客户端存储数据的机制，用于在多个请求之间保持用户的状态。Cookie 是由服务器生成并发送给客户端的，客户端会将 Cookie 存储在本地，并在后续请求中将其发送回服务器。

- **特点**：
  - 存储在客户端。
  - 数据量有限（通常不超过 4KB）。
  - 可以设置过期时间，控制 Cookie 的有效期。
  - 适用于存储非敏感信息和少量数据。

- **工作原理**：
  1. 服务器在响应中生成一个 Cookie，并将其发送给客户端。
  2. 客户端将 Cookie 存储在本地。
  3. 客户端在后续请求中将 Cookie 发送回服务器。
  4. 服务器根据 Cookie 中的数据处理请求。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Example</title>
</head>
<body>
    <button onclick="setCookie('username', 'JohnDoe', 7)">Set Cookie</button>
    <button onclick="alert(getCookie('username'))">Get Cookie</button>

    <script>
        function setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        function getCookie(name) {
            const cname = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) == 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return "";
        }
    </script>
</body>
</html>
```

### HTML 和 CSS 基础
- **HTML 标签和结构**：了解常见的 HTML 标签及其属性。
- **CSS 选择器和样式**：了解如何使用 CSS 选择器选择和操作 HTML 元素。

### 正则表达式
- **基本语法和使用**：匹配和提取文本数据。
- **常见的正则表达式模式**：如匹配数字、字母、特定格式的字符串等。

## 2. Python 编程基础

### Python 基础语法
- 变量和数据类型
- 控制结构（条件语句、循环）
- 函数和模块

### 文件操作
- 读取和写入文件
- 文件路径操作

## 3. 网络爬虫相关库

### urllib 库 (python built-in)

[./demo/urllib_demo.py](./demo/urllib_demo.py)

### requests 库 (conda built-in)

[./requests_demo/1.py](./requests_demo/1.py)
- 发送 HTTP 请求
- 处理响应（状态码、内容、头部信息）
- 会话管理

### BeautifulSoup 库
- 解析 HTML 和 XML
- 查找和提取数据（find、find_all、select 等方法）
- 遍历和修改 DOM 树

### Scrapy 框架（如果考试涉及高级内容）
- Scrapy 项目结构
- 编写爬虫（Spider）
- 处理请求和响应
- 管道（Pipeline）和中间件（Middleware）

## 4. 实践技能

### 编写简单的爬虫
- 发送请求并获取响应
- 解析 HTML 内容并提取数据
- 保存数据到文件或数据库

### 处理动态内容
- 使用 Selenium 或 Playwright 处理 JavaScript 渲染的页面
- 模拟用户操作（点击、输入等）

### 处理反爬虫机制
- 设置请求头（User-Agent、Referer 等）
- 使用代理 IP
- 设置请求间隔和随机延迟

## 示例题目

### 基础题目
- 使用 Requests 库发送一个 GET 请求，并打印响应的状态码和内容。
- 使用 BeautifulSoup 解析一个 HTML 页面，提取所有的链接（`<a>` 标签的 `href` 属性）。

### 进阶题目
- 编写一个爬虫，爬取某个网站的所有文章标题和链接，并保存到 CSV 文件中。
- 使用 Selenium 模拟登录某个网站，并爬取登录后的页面内容。

## 示例代码

### 使用 Requests 和 BeautifulSoup 爬取数据

```python
import requests
from bs4 import BeautifulSoup

# 发送 GET 请求
url = 'https://example.com'
response = requests.get(url)

# 检查响应状态码
if response.status_code == 200:
    # 解析 HTML 内容
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # 提取所有链接
    links = soup.find_all('a')
    for link in links:
        href = link.get('href')
        print(href)
else:
    print(f'Failed to retrieve the page. Status code: {response.status_code}')
```

### 使用 Selenium 模拟登录并爬取数据

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 设置 WebDriver
driver = webdriver.Chrome()

# 打开登录页面
driver.get('https://example.com/login')

# 输入用户名和密码
username = driver.find_element(By.NAME, 'username')
password = driver.find_element(By.NAME, 'password')
username.send_keys('your_username')
password.send_keys('your_password')

# 提交表单
password.send_keys(Keys.RETURN)

# 等待页面加载
driver.implicitly_wait(10)

# 爬取登录后的页面内容
content = driver.find_element(By.ID, 'content')
print(content.text)

# 关闭 WebDriver
driver.quit()
```

## 结论

Python 网络爬虫考试可能会涵盖 HTTP 协议、HTML 和 CSS 基础、正则表达式、Python 编程基础、网络爬虫相关库（如 Requests 和 BeautifulSoup），以及实践技能（如编写爬虫、处理动态内容和反爬虫机制）。通过掌握这些知识和技能，你将能够应对考试中的各种题目
