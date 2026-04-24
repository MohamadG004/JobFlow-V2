import { format, eachDayOfInterval, subDays } from 'date-fns';
import type { Application, AnalyticsData } from '@/types';

export const STATUS_COLORS: Record<string, string> = {
  Applied: '#3B82F6',
  Interview: '#F59E0B',
  Offer: '#10B981',
  Rejected: '#EF4444',
};

export function computeAnalytics(applications: Application[]): AnalyticsData {
  const total = applications.length;

  const statusCounts = applications.reduce<Record<string, number>>((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = (['Applied', 'Interview', 'Offer', 'Rejected'] as const).map((s) => ({
    name: s,
    value: statusCounts[s] || 0,
    color: STATUS_COLORS[s],
  }));

  // Daily applications (last 7 days)
  const now = new Date();
  const sixDaysAgo = subDays(now, 6);
  const days = eachDayOfInterval({ start: sixDaysAgo, end: now });

  const weeklyApplications = days.map((day) => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    const count = applications.filter((app) => {
      const appliedDate = new Date(app.applied_date);
      return appliedDate >= dayStart && appliedDate <= dayEnd;
    }).length;

    return {
      week: format(day, 'MMM d'),
      count,
    };
  });

  const activeApplications = (statusCounts['Applied'] || 0) + (statusCounts['Interview'] || 0);
  const offersReceived = statusCounts['Offer'] || 0;
  const interviewRate = total > 0
    ? Math.round(((statusCounts['Interview'] || 0) + offersReceived) / total * 100)
    : 0;

  return {
    statusDistribution,
    weeklyApplications,
    totalApplications: total,
    activeApplications,
    offersReceived,
    interviewRate,
  };
}