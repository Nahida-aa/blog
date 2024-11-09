# API Doc
## 公告板块
### 公告base
#### 获取公告基础内容 列表
**方法**: GET /announcements

**描述**: 获取公告板块基础内容的 列表

**请求参数**:
| 参数 | 类型 |必填| 描述 |
| --- | --- | --- | --- |
| selected | boolean | 否 | 获取符合条件的内容,不填时获取全部内容 |

**Response**:
- 状态码: `200 OK`
- 响应体:
```json
[
  {
    "id": 1,
    "logo": "/path/to/logo.webp",
    "name": "MC联合创作论坛",
    // 一句话简介
    "desc": "创作者们的联合创作基地",
    // 文化宣传标语
    "slogan": "保持自己的热情 珍惜每一份情谊\n
               好好的做出计划 陪伴着彼此生长",
    // 创建时间,更新时间
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-01T12:00:00Z",
    // 是否选用
    "selected": true
  }
  ...
]
```
#### 获取一个公告基础内容
**方法**: GET /announcements/:id

e.g. GET /announcements/1

**描述**: 获取一个公告板块基础内容

**请求参数**: 无

**响应**:
- 状态码: `200 OK`
- 响应体:
```json
{
  "id": 1,
  "logo": "/path/to/logo.webp",
  "name": "MC联合创作论坛",
  // 一句话简介
  "desc": "创作者们的联合创作基地",
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
              好好的做出计划 陪伴着彼此生长",
  // 创建时间,更新时间
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-01T12:00:00Z",
  // 是否选用
  "selected": true
}
```

#### 创建一个公告基础内容

**方法**: POST /announcements

**描述**: 创建一个新的公告基础内容

**请求参数**: 无

**请求体**:
```json
{
  "logo": "/path/to/logo.webp", // 必填
  "name": "MC联合创作论坛", // 必填
  // 一句话简介
  "desc": "创作者们的联合创作基地", // 必填
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长", // 必填
  // 是否选用
  "selected": true // 非必填, 默认为 false
}
```
**响应**:
- 状态码: `201 Created`
- 响应体:
```json
{
  "id": 1,
  "logo": "/path/to/logo.webp",
  "name": "MC联合创作论坛",
  // 一句话简介
  "desc": "创作者们的联合创作基地",
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长",
  // 创建时间,更新时间
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-01T12:00:00Z",
  // 是否选用
  "selected": true
}
```
#### 更新一个公告基础内容
**方法**: PATCH /announcements/:id

用于部分更新资源。客户端发送的请求体只包含需要更新的字段，服务器会更新这些字段而不改变其他字段

**请求体**:
```json
{
  "logo": "/path/to/logo.webp", // 非必填
  "name": "MC联合创作论坛", // 非必填
  // 一句话简介
  "desc": "创作者们的联合创作基地", // 非必填
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长", // 非必填
  // 是否选用
  "selected": true // 非必填
}
```
**响应**:
- 状态码: `200 OK`
- 响应体:
```json
{
  "id": 1,
  "logo": "/path/to/logo.webp",
  "name": "MC联合创作论坛",
  // 一句话简介
  "desc": "创作者们的联合创作基地",
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长",
  // 创建时间,更新时间
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-01T12:00:00Z",
  // 是否选用
  "selected": true
}
```
#### 替换一个公告基础内容
**方法**: PUT /announcements/:id

用于替换整个资源。客户端发送的请求体应该包含资源的完整表示，服务器会用这个表示替换现有资源

**请求体**:
```json
{
  "logo": "/path/to/logo.webp", // 必填
  "name": "MC联合创作论坛", // 必填
  // 一句话简介
  "desc": "创作者们的联合创作基地", // 必填
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长", // 必填
  // 是否选用
  "selected": false // 非必填
}
```

**响应**:
- 状态码: `200 OK`
- 响应体: 无
```json
{
  "id": 2,
  "logo": "/path/to/logo.webp",
  "name": "MC联合创作论坛",
  // 一句话简介
  "desc": "创作者们的联合创作基地",
  // 文化宣传标语
  "slogan": "保持自己的热情 珍惜每一份情谊\n
             好好的做出计划 陪伴着彼此生长",
  // 创建时间,更新时间
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-01T12:00:00Z",
  // 是否选用
  "selected": false
}
```
#### 删除一个公告基础内容
**方法**: DELETE /announcements/:id

**描述**: 删除一个公告基础内容

**请求参数**: 无

**响应**:
- 状态码: `204 No Content`
- 响应体: 无

### 迎新资料

/announcements/materials
```json
[
  {
    "id": 1,
    "title": "用户协议",
    "url": "xxx", // 用于 直接拿到 通过 base64 编码的md内容 的api
    "download_md_url": "xxx.md",
    "download_pdf_url": "xxx.pdf",
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-01T12:00:00Z",
    "selected": true
  },
  {
    "id": 2,
    "title": "介绍资料",
    "url": "xxx",
    "download_md_url": "xxx.md",
    "download_pdf_url": "xxx.pdf",
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-01T12:00:00Z",
    "selected": true
  }
]
```

### 平台寄语
/announcements/message
