import { Zap, CalendarDays, CalendarRange, TrendingUp } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { energyZones, energyDailyTrend, energyWeeklyTrend } from '@/modules/environment-monitoring/mock';
import { EnergyCharts } from '@/modules/environment-monitoring/components/energy/EnergyCharts';

export function EnergyUsagePage() {
  const currentKw = energyZones.reduce((sum, z) => sum + z.currentKw, 0);
  const dailyKwh = energyZones.reduce((sum, z) => sum + z.dailyKwh, 0);
  const weeklyKwh = energyZones.reduce((sum, z) => sum + z.weeklyKwh, 0);
  const monthlyKwh = energyZones.reduce((sum, z) => sum + z.monthlyKwh, 0);
  const peakKw = Math.max(...energyZones.map((z) => z.peakKw));

  return (
    <div>
      <PageHeader title="Energy Usage" description="Campus-wide power consumption across every metered zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Current Consumption" value={`${currentKw.toFixed(1)} kW`} icon={Zap} tone="neutral" />
        <StatCard label="Daily Usage" value={`${dailyKwh.toFixed(0)} kWh`} icon={CalendarDays} tone="neutral" />
        <StatCard label="Weekly Usage" value={`${weeklyKwh.toFixed(0)} kWh`} icon={CalendarRange} tone="neutral" />
        <StatCard label="Monthly Usage" value={`${monthlyKwh.toFixed(0)} kWh`} icon={CalendarRange} tone="neutral" />
        <StatCard label="Peak Usage" value={`${peakKw.toFixed(1)} kW`} icon={TrendingUp} tone="warning" />
      </div>

      <EnergyCharts daily={energyDailyTrend} weekly={energyWeeklyTrend} />
    </div>
  );
}
