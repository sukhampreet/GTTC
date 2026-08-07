import { CreditCard, PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { Button } from '@/components/ui/Button';
import { cardRecords } from '@/modules/access-control/mock';
import { CardManagementTable } from '@/modules/access-control/components/cards/CardManagementTable';

export function CardManagementPage() {
  const active = cardRecords.filter((c) => c.status === 'active').length;
  const lost = cardRecords.filter((c) => c.status === 'lost').length;
  const expired = cardRecords.filter((c) => c.status === 'expired').length;

  return (
    <div>
      <PageHeader
        title="Card Management"
        description="Issue, track and manage RFID access cards and their assigned permissions."
        actions={
          <Button size="sm">
            <PlusCircle className="size-3.5" />
            Issue Card
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Cards" value={cardRecords.length} icon={CreditCard} tone="neutral" />
        <StatCard label="Active" value={active} icon={CreditCard} tone="success" />
        <StatCard label="Lost / Stolen" value={lost} icon={CreditCard} tone="danger" />
        <StatCard label="Expired" value={expired} icon={CreditCard} tone="warning" />
      </div>

      <CardManagementTable cards={cardRecords} />
    </div>
  );
}
