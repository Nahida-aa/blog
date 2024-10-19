"use client"
import { useEffect, useState } from 'react';

const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

interface AgeProps {
  birthday: string;
}

const Age: React.FC<AgeProps> = ({ birthday }) => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    setAge(calculateAge(birthday));
  }, [birthday]);

  return <>{age}</>
};

export default Age;