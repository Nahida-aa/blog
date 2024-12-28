# auth

认证

## client

### jwt -> cookie

```ts
// 从服务器接收的 access_token
const accessToken = "your-access-token";

// 解码 JWT 以获取过期时间
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const decodedToken = parseJwt(accessToken);
const expTimestamp = decodedToken.exp * 1000; // 将秒转换为毫秒

// 设置 access_token 的 Cookie 过期时间
const accessTokenExpires = new Date(expTimestamp).toUTCString();

document.cookie = `access_token=${accessToken}; expires=${accessTokenExpires}; path=/; secure; HttpOnly`;
```

### cookie -> jwt

```ts
// 从 Cookie 中获取令牌
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 获取 access_token 和 refresh_token
let accessToken = getCookie("access_token");

// 检查 access_token 是否存在
if (!accessToken) {
   const refreshToken = getCookie("refresh_token");
  // 使用 refresh_token 获取新的 access_token
  fetch("/api/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      accessToken = data.access_token;
      // 从新的 access_token 中提取过期时间
      const decodedToken = parseJwt(accessToken);
      const expTimestamp = decodedToken.exp * 1000; // 将秒转换为毫秒
      const accessTokenExpires = new Date(expTimestamp).toUTCString();
      document.cookie = `access_token=${accessToken}; expires=${accessTokenExpires}; path=/; secure; HttpOnly`;
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
      // 如果 refresh_token 也过期，要求用户重新登录
      window.location.href = "/login";
    });
}
```

### cookies api

```ts
export async function cookies() {
  // 获取所有 Cookie
  const allCookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  return {
    get(name: string) {
      return { name, value: allCookies[name] };
    },
    getAll() {
      return Object.entries(allCookies).map(([name, value]) => ({ name, value }));
    },
    has(name: string) {
      return name in allCookies;
    },
    set(name: string, value: string, options: { expires?: Date; maxAge?: number; domain?: string; path?: string; secure?: boolean; httpOnly?: boolean; sameSite?: 'lax' | 'strict' | 'none'; priority?: 'low' | 'medium' | 'high'; encode?: (value: string) => string; partitioned?: boolean } = {}) {
      let cookieString = `${name}=${encodeURIComponent(value)}`;
      if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
      if (options.path) {
        cookieString += `; path=${options.path}`;
      } else {
        cookieString += `; path=/`;
      }
      if (options.secure) {
        cookieString += `; secure`;
      }
      if (options.httpOnly) {
        cookieString += `; HttpOnly`;
      }
      if (options.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`;
      }
      if (options.priority) {
        cookieString += `; Priority=${options.priority}`;
      }
      if (options.encode) {
        cookieString = options.encode(cookieString);
      }
      document.cookie = cookieString;
    },
    delete(name: string) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
    clear() {
      Object.keys(allCookies).forEach((name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    },
    toString() {
      return document.cookie;
    }
  };
}
```

设计一个支持多个应用的登录认证系统，可以考虑以下步骤：

1. **使用单点登录 (SSO)**：
   - 通过单点登录系统，用户只需登录一次，即可访问多个应用。常见的 SSO 协议有 OAuth 2.0、OpenID Connect 和 SAML。

2. **集中认证服务器**：
   - 设置一个集中认证服务器（如 Identity Provider，IdP），负责处理所有应用的用户认证请求。

3. **使用标准协议**：
   - 采用 OAuth 2.0 或 OpenID Connect 协议，确保认证过程的安全性和标准化。

4. **共享会话和令牌**：
   - 通过共享会话或令牌机制，确保用户在一个应用登录后，其他应用也能识别用户的登录状态。

5. **跨域处理**：
   - 处理跨域请求，确保不同域名的应用能够安全地与认证服务器通信。可以使用 CORS（跨域资源共享）策略。

6. **安全性措施**：
   - 实施安全措施，如 HTTPS、CSRF 防护、令牌加密等，确保认证过程的安全性。

以下是一个简单的架构示意图：

```
+-------------------+       +-------------------+
|                   |       |                   |
|    应用 A         |       |    应用 B         |
|                   |       |                   |
+--------+----------+       +---------+---------+
         |                            |
         |                            |
         |                            |
         |                            |
         |                            |
         v                            v
+-------------------+       +-------------------+
|                   |       |                   |
|  认证服务器 (IdP) | <----> |  用户数据库      |
|                   |       |                   |
+-------------------+       +-------------------+
```

通过这种设计，用户在任意一个应用登录后，认证服务器会生成一个令牌，并将其分发给其他应用，确保用户在多个应用间的无缝切换。