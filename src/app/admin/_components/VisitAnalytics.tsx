'use client'
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveSankey } from '@nivo/sankey';
// import Globe3D from './Globe3D';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import IpTime from './IpTime';

interface Visit {
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
}

interface VisitAnalyticsProps {
  visits: Visit[];
}

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const VisitAnalytics: React.FC<VisitAnalyticsProps> = ({ visits }) => {
  const [pathChartData, setPathChartData] = useState<{ path: string; count: number }[]>([]);
  const [geoData, setGeoData] = useState<{ coordinates: [number, number]; value: number }[]>([]);
  const [browserData, setBrowserData] = useState<{ name: string; value: number }[]>([]);
  const [heatmapData, setHeatmapData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);
  const [sankeyData, setSankeyData] = useState<{ nodes: { id: string }[], links: { source: string; target: string; value: number }[] }>({ nodes: [], links: [] });
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 24]);

  useEffect(() => {
    processData();
  }, [visits, timeRange]);

  const processData = () => {
    const filteredVisits = visits.filter(visit => {
      const hour = new Date(visit.timestamp).getHours();
      return hour >= timeRange[0] && hour < timeRange[1];
    });

    // Process path chart data
    const pathCounts = filteredVisits.reduce((acc, visit) => {
      acc[visit.path] = (acc[visit.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setPathChartData(Object.entries(pathCounts).map(([path, count]) => ({ path, count })));

    // Process geo data
    // Note: In a real application, you would use a geolocation API to get coordinates from IPs
    const geoCounts = filteredVisits.reduce((acc, visit) => {
      const [lat, lng] = [Math.random() * 180 - 90, Math.random() * 360 - 180]; // Dummy coordinates
      const key = `${lat},${lng}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setGeoData(Object.entries(geoCounts).map(([coords, value]) => ({
      coordinates: coords.split(',').map(Number) as [number, number],
      value
    })));

    // Process browser data
    const browserCounts = filteredVisits.reduce((acc, visit) => {
      const browser = getBrowserFromUserAgent(visit.userAgent);
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setBrowserData(Object.entries(browserCounts).map(([name, value]) => ({ name, value })));


  };

  const getBrowserFromUserAgent = (userAgent: string): string => {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
    return 'Other';
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Visit Heatmap (Time, IP, Visit Count)</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <IpTime visits={visits} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>IP Geolocation</CardTitle>
        </CardHeader>
        <CardContent>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
                ))
              }
            </Geographies>
            {geoData.map((d, i) => (
              <Marker key={i} coordinates={d.coordinates}>
                <circle r={Math.sqrt(d.value) * 2} fill="#F00" stroke="#fff" strokeWidth={2} />
              </Marker>
            ))}
          </ComposableMap>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browser Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={browserData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {browserData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Interactive Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={`${timeRange[0]}-${timeRange[1]}`}
            onValueChange={(value) => {
              const [start, end] = value.split('-').map(Number);
              setTimeRange([start, end]);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-24">All Day</SelectItem>
              <SelectItem value="0-12">Morning (0-12)</SelectItem>
              <SelectItem value="12-24">Afternoon (12-24)</SelectItem>
              <SelectItem value="9-17">Work Hours (9-17)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* <Card className="col-span-2">
        <CardHeader>
          <CardTitle>3D Globe Visualization</CardTitle>
        </CardHeader>
        <CardContent style={{ height: '400px' }}>
          <Globe3D data={geoData.map(d => ({ lat: d.coordinates[0], lng: d.coordinates[1], value: Math.log(d.value) }))} />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default VisitAnalytics;