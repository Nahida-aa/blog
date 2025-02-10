---
title: local
created_at: 2025-02-07T16:30:43Z
pushed_at: 
updated_at: 2025-02-07T16:30:43Z
authors:
  - name: aa
    github: Nahida-aa
private: false
svg: 
image: 
tags: [local]
description: 
draft: false
---

## LM Studio

```py
import requests

response = requests.get("http://localhost:1234/v1/models")
if response.status_code == 200:
    models = response.json()
    print("Available models:", models)
else:
    print("Failed to get models:", response.status_code)
```
