"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import UserData from './_components/UserData';
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { addMinutes, addHours, addDays, format } from "date-fns";

import VisitAnalytics from './_components/VisitAnalytics';

interface Visit {
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
}

const DashboardPage = () => {
  const [data, setData] = useState<Visit[]>([]);
  const [pathChartData, setPathChartData] = useState([]);
  const [timeChartData, setTimeChartData] = useState([]);
  const [ipChartData, setIpChartData] = useState([]);
  const [deviceChartData, setDeviceChartData] = useState([])
  const [browserChartData, setBrowserChartData] = useState([])

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [precision, setPrecision] = useState('hour');

  const precisionOptions = [
    { value: 'minute', label: 'Minute' },
    { value: 'hour', label: 'Hour' },
    { value: 'day', label: 'Day' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/visits');
      const result = await response.json();
      setData(result.visits);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 根据页面路径统计访问次数
    const paths = data.map(visit => visit.path);
    const uniquePaths = [...new Set(paths)];
    const pathCounts = uniquePaths.map(path => ({
      path,
      count: paths.filter(p => p === path).length,
    }));
    setPathChartData(pathCounts);

    // 根据时间统计访问次数
    const timeCounts = data.reduce((acc, visit) => {
      const date = new Date(visit.timestamp);
      if (dateRange?.from && date < dateRange.from) return acc;
      if (dateRange?.to && date > dateRange.to) return acc;

      let key;
      if (precision === 'minute') {
        key = format(date, 'yyyy-MM-dd HH:mm');
      } else if (precision === 'hour') {
        key = format(date, 'yyyy-MM-dd HH:00');
      } else {
        key = format(date, 'yyyy-MM-dd');
      }

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // 确保所有时间点都有数据，即使值为0
    const startDate = dateRange?.from || new Date(Math.min(...data.map(visit => visit.timestamp)));
    const endDate = dateRange?.to || new Date(Math.max(...data.map(visit => visit.timestamp)));
    const timeData = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      let key;
      if (precision === 'minute') {
        key = format(currentDate, 'yyyy-MM-dd HH:mm');
        currentDate = addMinutes(currentDate, 1);
      } else if (precision === 'hour') {
        key = format(currentDate, 'yyyy-MM-dd HH:00');
        currentDate = addHours(currentDate, 1);
      } else {
        key = format(currentDate, 'yyyy-MM-dd');
        currentDate = addDays(currentDate, 1);
      }

      timeData.push({
        date: key,
        count: timeCounts[key] || 0,
      });
    }

    setTimeChartData(timeData);

    // 根据IP统计访问次数
    const ips = data.map(visit => visit.ip);
    const uniqueIps = [...new Set(ips)];
    const ipCounts = uniqueIps.map(ip => ({
      ip,
      count: ips.filter(i => i === ip).length,
    }));
    setIpChartData(ipCounts);
  }, [data, dateRange, precision]);

  //   // 根据设备统计访问次数
  //   const devices = data.map(visit => new UAParser(visit.userAgent).getDevice().type || 'Unknown');
  //   const uniqueDevices = [...new Set(devices)];
  //   const deviceCounts = uniqueDevices.map(device => ({
  //     device,
  //     count: devices.filter(d => d === device).length,
  //   }));
  //   setDeviceChartData(deviceCounts);

  //   // 根据浏览器统计访问次数
  //   const browsers = data.map(visit => new UAParser(visit.userAgent).getBrowser().name || 'Unknown');
  //   const uniqueBrowsers = [...new Set(browsers)];
  //   const browserCounts = uniqueBrowsers.map(browser => ({
  //     browser,
  //     count: browsers.filter(b => b === browser).length,
  //   }));
  //   setBrowserChartData(browserCounts);
  // }, [data, dateRange, precision]);

  return (
    <div className="space-y-4">
      <UserData />
      <VisitAnalytics visits={data} />


      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visits / page</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={pathChartData.length * 24}>
            <BarChart layout="vertical" data={pathChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                type="category"
                dataKey="path"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={256} // 增加宽度以显示完整的路径
                interval={0} // 确保每个路径都显示
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#adfa1d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <div>
          <label>Time Range</label>
          <DatePickerWithRange
            className="w-[300px]"
            onChange={(range) => setDateRange(range)}
          />
        </div>
        <div>
          <label>Precision</label>
          <Select onValueChange={(value) => setPrecision(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select precision" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Precision</SelectLabel>
                {precisionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visits / Time</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visits / IP</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={ipChartData.length * 24}>
            <BarChart layout="vertical" data={ipChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                type="category"
                dataKey="ip"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={128} // 增加宽度以显示完整的 IP 地址
                interval={0} // 确保每个 IP 地址都显示
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visits / Device</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={deviceChartData.length * 24}>
            <BarChart layout="vertical" data={deviceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                type="category"
                dataKey="device"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={200} // 增加宽度以显示完整的设备名称
                interval={0} // 确保每个设备名称都显示
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;