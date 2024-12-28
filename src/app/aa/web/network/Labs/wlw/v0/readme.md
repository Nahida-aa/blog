# 使用说明

.html 和 .pdf 都由 .md 文件直接或间接生成，如果可以建议查看 .md 文件(预览), 以获得更好的阅读体验。

## 环境要求

- Python 3.x
- Tkinter
- SQLite3

## 服务端

- server.py
- udp_protocol.py
- database.py
- streetlights.db

### 启动服务器

```sh
python server.py
```

## 客户端
- streetlight_client.py
- udp_protocol.py

### 启动客户端

```sh
# 需要注意填写服务端的IP地址
python streetlight_client.py
```
