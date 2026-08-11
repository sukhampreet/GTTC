import { Moon, Sun } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/utils/cn';
import { useThemeStore } from '@/store/themeStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { SelectField, ToggleField } from '@/modules/settings/components/shared/FormField';

export function AppearancePage() {
  const { theme, setTheme } = useThemeStore();
  const { collapsed, setCollapsed } = useSidebarStore();

  return (
    <div>
      <PageHeader title="Appearance" description="Personalize the interface. Reuses the platform's existing theme and sidebar state." />

      <div className="space-y-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Theme</AppCardTitle>
          </AppCardHeader>
          <AppCardContent>
            <div className="grid grid-cols-2 gap-3 sm:max-w-md">
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-(--radius-md) border p-4 transition-colors',
                  theme === 'dark' ? 'border-primary-500 bg-primary-500/10' : 'border-border-default hover:bg-surface-hover',
                )}
              >
                <Moon className="size-5 text-text-secondary" />
                <span className="text-[12.5px] font-medium text-text-primary">Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-(--radius-md) border p-4 transition-colors',
                  theme === 'light' ? 'border-primary-500 bg-primary-500/10' : 'border-border-default hover:bg-surface-hover',
                )}
              >
                <Sun className="size-5 text-text-secondary" />
                <span className="text-[12.5px] font-medium text-text-primary">Light</span>
              </button>
            </div>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Layout</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="UI Density" options={['Comfortable', 'Compact']} />
            <SelectField label="Dashboard Layout Preference" options={['Default Grid', 'Compact Grid', 'List View']} />
            <ToggleField
              label="Collapse Sidebar by Default"
              defaultChecked={collapsed}
              hint="Applies the platform's existing sidebar collapse state"
            />
            <ToggleField label="Reduce Motion" hint="Minimizes transitions and animations across the interface" />
          </AppCardContent>
        </AppCard>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[11.5px] text-text-tertiary underline-offset-2 hover:text-text-secondary hover:underline"
        >
          {collapsed ? 'Sidebar is currently collapsed' : 'Sidebar is currently expanded'} — toggle now
        </button>
      </div>
    </div>
  );
}
