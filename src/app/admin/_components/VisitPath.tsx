'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Cell } from 'recharts';

interface Visit {
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
}

interface VisitPathProps {
  visits: Visit[];
}

const VisitPath: React.FC<VisitPathProps> = ({ visits }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const pathMap = new Map<string, number>();

    const processedData = visits.map((visit) => {
      if (!pathMap.has(visit.path)) {
        pathMap.set(visit.path, pathMap.size + 1);
      }
      const pathIndex = pathMap.get(visit.path)!;

      return {
        path: visit.path,
        count: 1,
        pathIndex
      };
    });

    const aggregatedData = processedData.reduce((acc, curr) => {
      const key = curr.path;
      if (!acc[key]) {
        acc[key] = { ...curr, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, any>);

    setData(Object.values(aggregatedData));
  }, [visits]);

  return (
    <ResponsiveContainer width="100%" height={data.length * 16}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="count"  fontSize={12} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="path" fontSize={12} tickLine={false} axisLine={false} interval={0} width={256} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#8884d8" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisitPath;