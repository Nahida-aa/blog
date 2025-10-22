import React from 'react';
import { Background } from './Background';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Docs',
}
const DocsPage: React.FC = () => {
  return (
    <div >
      Docs
      <Background />
    </div>
  );
};

export default DocsPage;