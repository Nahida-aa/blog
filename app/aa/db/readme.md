主键（Primary Key）是数据库表中用于唯一标识每一行记录的字段。设计主键时，有几种常见的方案，包括自增 ID 和 UUID。不同的数据库管理系统（DBMS）对这些方案有不同的实现方式和数据类型。

### 自增 ID

自增 ID 是一种常见的主键设计方案，通常用于整数类型的字段。每次插入新记录时，数据库会自动生成一个唯一的整数值。

#### 自增 ID 在不同数据库中的实现

1. **MySQL**:
   - 数据类型：`INT` 或 `BIGINT`
   - 实现方式：使用 `AUTO_INCREMENT`
   ```sql
   CREATE TABLE example (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );
   ```

2. **PostgreSQL**:
   - 数据类型：`SERIAL` 或 `BIGSERIAL`
   - 实现方式：使用 `SERIAL` 或 `BIGSERIAL`
   ```sql
   CREATE TABLE example (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );
   ```

3. **SQLite**:
   - 数据类型：`INTEGER`
   - 实现方式：使用 `AUTOINCREMENT`
   ```sql
   CREATE TABLE example (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL
   );
   ```

4. **Microsoft SQL Server**:
   - 数据类型：`INT` 或 `BIGINT`
   - 实现方式：使用 `IDENTITY`
   ```sql
   CREATE TABLE example (
     id INT IDENTITY(1,1) PRIMARY KEY,
     name NVARCHAR(255) NOT NULL
   );
   ```

### UUID

UUID（Universally Unique Identifier）是一种标准的 128 位全局唯一标识符，通常用于需要跨系统唯一标识的场景。

#### UUID 在不同数据库中的实现

1. **MySQL**:
   - 数据类型：`CHAR(36)` 或 `BINARY(16)`
   - 实现方式：使用 `UUID()` 函数生成 UUID
   ```sql
   CREATE TABLE example (
     id CHAR(36) PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );

   INSERT INTO example (id, name) VALUES (UUID(), 'example');
   ```

2. **PostgreSQL**:
   - 数据类型：`UUID`
   - 实现方式：使用 `uuid-ossp` 扩展生成 UUID
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   CREATE TABLE example (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name VARCHAR(255) NOT NULL
   );
   ```

3. **SQLite**:
   - 数据类型：`TEXT`
   - 实现方式：使用 `uuid()` 函数生成 UUID（需要自定义函数或使用扩展）
   ```sql
   CREATE TABLE example (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL
   );

   INSERT INTO example (id, name) VALUES (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-' || '4' || substr(lower(hex(randomblob(2))), 2) || '-' || substr('89ab', abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))), 2) || '-' || lower(hex(randomblob(6))), 'example');
   ```

4. **Microsoft SQL Server**:
   - 数据类型：`UNIQUEIDENTIFIER`
   - 实现方式：使用 `NEWID()` 函数生成 UUID
   ```sql
   CREATE TABLE example (
     id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
     name NVARCHAR(255) NOT NULL
   );
   ```

### 总结

不同的数据库管理系统对自增 ID 和 UUID 的实现方式和数据类型有所不同。以下是常见的设计方案：

- **自增 ID**:
  - MySQL: `INT AUTO_INCREMENT`
  - PostgreSQL: `SERIAL`
  - SQLite: `INTEGER AUTOINCREMENT`
  - Microsoft SQL Server: `INT IDENTITY`

- **UUID**:
  - MySQL: `CHAR(36)` 或 `BINARY(16)`
  - PostgreSQL: `UUID`
  - SQLite: `TEXT`
  - Microsoft SQL Server: `UNIQUEIDENTIFIER`

选择哪种主键设计方案取决于具体的应用场景和需求。如果需要跨系统唯一标识，UUID 是一个不错的选择；如果只需要在单个数据库中唯一标识，自增 ID 可能更简单和高效。希望这些信息能帮助你更好地设计数据库主键。
