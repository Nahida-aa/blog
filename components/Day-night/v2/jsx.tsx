import React from 'react';

interface CloudSonsProps {
  prefix: string;
}
const CloudSons: React.FC<CloudSonsProps> = ({ prefix }) => (
  <>
    {[...Array(6)].map((_, i) => <div key={`${prefix}-${i}`} className="cloud-son"></div>)}
  </>
);

interface StarSonsProps {
  size: string;
  index: number;
}

const StarSons: React.FC<StarSonsProps> = ({ size, index }) => (
  <div className={`star ${size}`}>
    {[...Array(4)].map((_, j) => <div key={`star-son-${index}-${j}`} className="star-son"></div>)}
  </div>
);

export  {CloudSons,StarSons};