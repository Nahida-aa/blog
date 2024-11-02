# file

next 默认监控 
- app/
- components/
- pages/

发生变化(包括文件夹和项目无关文件)时，会重新编译

## 1

```yml
src/app/(blog)/aa/[...slug]/page.tsx
src/app/(blog)/layout.tsx
```
菜单结构是
```yml
Blog:
  log:
    2024:
      11:
        2:
         readme.mdx
  ai:
    index.mdx
Comments
Tags
Friends
```

访问 /aa/log/2024/11/2/readme.mdx 时自动展开
菜单 Blog, log, 2024, 11, 2
