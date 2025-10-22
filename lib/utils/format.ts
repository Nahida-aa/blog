import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';  // 导入中文语言包
import relativeTime from 'dayjs/plugin/relativeTime';  // 相对时间插件
import localizedFormat from 'dayjs/plugin/localizedFormat';  // 本地化格式插件
import duration from 'dayjs/plugin/duration';  // 持续时间插件

// 64606397 -> 64.61M
// 1234 -> 1234
// 12345 -> 12.35K
// 123456 -> 1.23M
export const formatSize = (size: number): string => {
  if (size < 1000) {
    return `${size}`;
  } else if (size < 1000000) {
    return `${(size / 1000).toFixed(2)}K`;
  } else {
    return `${(size / 1000000).toFixed(2)}M`;
  }
};
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// 配置 dayjs
dayjs.locale('zh-cn');  // 设置语言为中文
dayjs.extend(relativeTime);  // 启用相对时间插件
dayjs.extend(localizedFormat);  // 启用本地化格式插件
dayjs.extend(duration);  // 启用持续时间插件

export type DateFormat = 'relative' | 'full' | 'date' | 'time' | 'datetime';

/**
 * 格式化时间
 * @param date 要格式化的日期
 * @param format 格式化类型
 * - relative: 相对时间（例如：3小时前）
 * - full: 完整格式（例如：2025年9月19日 14:30:00）
 * - date: 仅日期（例如：2025年9月19日）
 * - time: 仅时间（例如：14:30:00）
 * - datetime: 日期和时间（例如：2025-09-19 14:30）
 */
export function formatDate(date: Date | string | number, format: DateFormat = 'relative'): string {
  const d = dayjs(date);

  switch (format) {
    case 'relative':
      return d.fromNow();
    case 'full':
      return d.format('YYYY/MM/DD HH:mm:ss');
    case 'date':
      return d.format('YYYY/MM/DD');
    case 'time':
      return d.format('HH:mm');
    case 'datetime':
      return d.format('YYYY/MM/DD HH:mm');
    default:
      return d.format('YYYY/MM/DD HH:mm:ss');
  }
}

/**
 * 格式化时间范围
 * @param start 开始时间
 * @param end 结束时间
 * @returns 格式化后的时间范围字符串
 */
export function formatDateRange(start: Date | string | number, end: Date | string | number): string {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  // 如果是同一天
  if (startDate.isSame(endDate, 'day')) {
    return `${startDate.format('YYYY年MM月DD日 HH:mm')} - ${endDate.format('HH:mm')}`;
  }

  // 如果是同一年
  if (startDate.isSame(endDate, 'year')) {
    return `${startDate.format('MM月DD日 HH:mm')} - ${endDate.format('MM月DD日 HH:mm')}`;
  }

  // 不同年
  return `${startDate.format('YYYY年MM月DD日 HH:mm')} - ${endDate.format('YYYY年MM月DD日 HH:mm')}`;
}

/**
 * 智能格式化时间
 * 根据时间的远近自动选择合适的显示格式
 */
export function smartFormatDate(date: Date | string | number): string {
  const d = dayjs(date);
  const now = dayjs();

  // 如果是今天
  if (d.isSame(now, 'day')) {
    // return d.fromNow(); // 显示相对时间
    return d.format('HH:mm');
  }

  // 如果是昨天
  if (d.isSame(now.subtract(1, 'day'), 'day')) {
    return `昨天 ${d.format('HH:mm')}`;
    // return `昨天 ${d.format('HH:mm')}`;
  }

  // 如果是本周
  if (d.isSame(now, 'week')) {
    return `${d.format('dddd HH:mm')}`; // 显示星期几
  }

  // 如果是今年
  if (d.isSame(now, 'year')) {
    return d.format('MM/DD/ HH:mm');
  }

  // 其他情况
  return d.format('YYYY/MM/DD/ HH:mm');
}

/**
 * 获取持续时间
 * @param seconds 秒数
 * @returns 格式化后的持续时间
 */
export function formatDuration(seconds: number): string {
  const duration = dayjs.duration(seconds, 'seconds');

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}秒`;
  }

  if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}分钟`;
  }

  if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return minutes > 0 ? `${hours}小时${minutes}分钟` : `${hours}小时`;
  }

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  return hours > 0 ? `${days}天${hours}小时` : `${days}天`;
}