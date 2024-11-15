// src/app/Example.tsx

import React from 'react';

interface Props {
  name: string;
  age: number;
}

export async function SomeModule() {
  console.log("SomeModule");
  return (
    <div>
      <h1>SomeModule</h1>
    </div>
  )
}

const Example: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      
      <h1>Hello, {name}!</h1>{/*  */}
      <p>You are {age} years old.</p>
      <SomeModule />
    </div>
  );
};

export default Example;