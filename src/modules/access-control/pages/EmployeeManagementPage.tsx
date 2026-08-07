import { Users, ScanFace, CreditCard, UserRoundPlus } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { Button } from '@/components/ui/Button';
import { employeeAccessRecords } from '@/modules/access-control/mock';
import { EmployeeTable } from '@/modules/access-control/components/employees/EmployeeTable';

export function EmployeeManagementPage() {
  const withFace = employeeAccessRecords.filter((e) => e.assignedFace).length;
  const withCard = employeeAccessRecords.filter((e) => e.assignedCard).length;

  return (
    <div>
      <PageHeader
        title="Employee Management"
        description="Directory of employees and their assigned access credentials and levels."
        actions={
          <Button size="sm">
            <UserRoundPlus className="size-3.5" />
            Add Employee
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Employees" value={employeeAccessRecords.length} icon={Users} tone="neutral" />
        <StatCard label="Face Enrolled" value={withFace} icon={ScanFace} tone="success" />
        <StatCard label="Card Assigned" value={withCard} icon={CreditCard} tone="info" />
      </div>

      <EmployeeTable employees={employeeAccessRecords} />
    </div>
  );
}
