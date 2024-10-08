// components/Toc.tsx
import React, { useState } from 'react';
import { MdTocTreeNode } from '@/types/mdx';

interface TocProps {
  toc: MdTocTreeNode[];
}

const TocItem: React.FC<{ node: MdTocTreeNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {node.text}
      </div>
      {isOpen && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TocItem key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Toc: React.FC<TocProps> = ({ toc }) => {
  return (
    <nav>
      <ul>
        {toc.map((node, index) => (
          <TocItem key={index} node={node} />
        ))}
      </ul>
    </nav>
  );
};

export default Toc;