"use server"
// 读取原始环境变量，可能包含意外的引号或空白，清理后再使用
const rawApiKey = process.env.WAKATIME_API_KEY ?? '';
// 去除首尾单/双引号并 trim 空白，避免像 "'waka_xxx'" 这样的值导致认证失败
const apiKey = rawApiKey.replace(/^['"]|['"]$/g, '').trim();
const auth = apiKey ? Buffer.from(apiKey + ':').toString('base64') : '';
// https://nextjs.org/docs/app/getting-started/layouts-and-pages#rendering-with-search-params

export const getWakaTimeSummary = async () => {
  console.log('getWakaTimeSummary called, rawApiKey length:', rawApiKey.length, 'startsWith:', rawApiKey.slice(0, 1));
  console.log('getWakaTimeSummary called, apiKey:', apiKey);
  console.log('getWakaTimeSummary called, auth:', auth);

  if (!apiKey) {
    throw new Error('WAKATIME_API_KEY is not set or empty');
  }

  const url = 'https://wakatime.com/api/v1/users/current/summaries?start=2025-10-10&end=2025-10-16&cache=true&paywalled=true';
  const res = await fetch(url, {
    headers: {
      'Authorization': `Basic ${auth}`,
    }
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('WakaTime API returned error', res.status, body);
    // 返回原始信息以便前端能做展示或调试
    throw new Error(`WakaTime API ${res.status}: ${body}`);
  }

  return await res.json();
}