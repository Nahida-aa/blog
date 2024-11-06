
```sh
pnpm prisma init

pnpm prisma migrate dev
# Prisma 检测到数据库模式与迁移历史记录不一致，并提示你需要重置数据库模式。这意味着所有现有数据将被删除，并重新应用迁移
pnpm prisma migrate deploy
pnpm prisma generate
pnpm dev
```
