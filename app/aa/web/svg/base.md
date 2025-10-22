---
title: svg/base
created_at: 2024-11-17T22:07:18Z
pushed_at: 
updated_at: 2024-11-17T22:07:18Z
authors:
  - name: aa
    github: Nahida-aa
    twitter: 
private: false
svg: 
image: 
tags: []
description: 
draft: false
---
是的，对于一个复杂的 SVG 图标来说，可能会有多个 `path` 元素，每个 `path` 元素可以有不同的颜色。为了处理这种情况，你可以通过传递颜色数组来设置每个 `path` 的颜色。

以下是一个示例，展示如何处理具有多个 `path` 元素的 SVG 图标，并为每个 `path` 设置不同的颜色：

### 1. 创建通用图标组件

```typescript
// src/components/Icon.tsx
import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  colors?: string[];
}

const Icon: React.FC<IconProps> = ({ name, size = 24, colors = [] }) => {
  const SvgIcon = require(`../icons/${name}.svg`).default;

  return (
    <SvgIcon
      width={size}
      height={size}
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {React.Children.map(SvgIcon.props.children, (child, index) => {
        if (React.isValidElement(child) && child.type === 'path') {
          return React.cloneElement(child, {
            fill: colors[index] || 'currentColor',
          });
        }
        return child;
      })}
    </SvgIcon>
  );
};

export default Icon;
```

### 2. 创建单独的图标组件

```typescript
// src/components/icons/HomeIcon.tsx
import React from 'react';
import Icon from '../Icon';

const HomeIcon: React.FC<{ size?: number; colors?: string[] }> = (props) => {
  return <Icon name="home" {...props} />;
};

export default HomeIcon;
```

### 3. 示例 SVG 图标

假设你有一个 `home.svg` 文件，内容如下：

```xml
<!-- src/icons/home.svg -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  <path d="M0 0h24v24H0z" fill="none"/>
</svg>
```

### 4. 使用图标组件

```typescript
import React from 'react';
import HomeIcon from './components/icons/HomeIcon';

const App: React.FC = () => {
  return (
    <div>
      <HomeIcon size={32} colors={['blue', 'red']} />
    </div>
  );
};

export default App;
```

通过这种方式，你可以为每个 `path` 元素设置不同的颜色，并且可以根据需要调整图标的大小。
