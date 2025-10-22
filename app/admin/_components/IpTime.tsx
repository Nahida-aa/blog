'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

interface Visit {
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
}

interface HeatmapChartProps {
  visits: Visit[];
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ visits }) => {
  const [data, setData] = useState<any[]>([]);
  const [ipMap, setIpMap] = useState<Map<string, number>>(new Map());
  const [timeMap, setTimeMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const ipMap = new Map<string, number>();
    const timeMap = new Map<number, string>();
    const pathMap = new Map<string, Set<string>>();

    // Sort visits by timestamp in ascending order
    const sortedVisits = [...visits].sort((a, b) => a.timestamp - b.timestamp);

    const processedData = sortedVisits.map((visit, index) => {
      if (!ipMap.has(visit.ip)) {
        ipMap.set(visit.ip, ipMap.size);
      }
      const ipIndex = ipMap.get(visit.ip)!;

      const date = new Date(visit.timestamp);
      const timeKey = date.getTime();
      if (!timeMap.has(timeKey)) {
        timeMap.set(timeKey, format(date, 'yyyy-MM-dd HH:mm:ss'));
      }

      const key = `${timeKey}-${visit.ip}`;
      if (!pathMap.has(key)) {
        pathMap.set(key, new Set());
      }
      pathMap.get(key)!.add(visit.path);

      return {
        x: timeKey,
        y: ipIndex,
        z: 1,
        time: timeKey,
        ip: visit.ip,
        paths: Array.from(pathMap.get(key)!)
      };
    });

    const aggregatedData = processedData.reduce((acc, curr) => {
      const key = `${curr.x}-${curr.y}`;
      if (!acc[key]) {
        acc[key] = { ...curr, z: 0 };
      }
      acc[key].z += 1;
      acc[key].paths = curr.paths;
      return acc;
    }, {} as Record<string, any>);

    setData(Object.values(aggregatedData));
    setIpMap(ipMap);
    setTimeMap(timeMap);
  }, [visits]);

  const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

  return (
    <ResponsiveContainer width="100%" height={Math.max(400, ipMap.size * 10)}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 100 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Time"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(tick) => format(new Date(tick), 'MM/dd HH:mm')}
          label={{ value: 'Time', position: 'insideBottomRight', offset: -10 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="IP"
          tickFormatter={(tick) => Array.from(ipMap.keys())[tick]}
          interval={0}
          width={100}
          label={{ value: 'IP Address', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const { x, y, z, paths } = payload[0].payload;
              const ipArray = Array.from(ipMap.keys());
              return (
                <div className="custom-tooltip  p-2 border  rounded shadow-md">
                  <p className="font-bold">{`Time: ${format(new Date(x), 'yyyy-MM-dd HH:mm:ss')}`}</p>
                  <p className="font-bold">{`IP: ${ipArray[y]}`}</p>
                  <p className="font-bold">{`Visits: ${z}`}</p>
                  <p className="font-bold mt-2">Paths:</p>
                  <ul className="list-disc pl-5">
                    {paths.map((path: string, index: number) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter data={data} shape="square">
          {data.map((entry, index) => {
            const colorIndex = Math.min(Math.floor(entry.z / 2), colors.length - 1);
            return <Cell key={`cell-${index}`} fill={colors[colorIndex]} />;
          })}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default HeatmapChart;