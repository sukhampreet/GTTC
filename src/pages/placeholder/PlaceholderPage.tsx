import { PageHeader } from '@/components/ui/PageHeader';
import { ComingSoon } from '@/components/feedback/ComingSoon';

export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader title={title} description={description ?? 'Module implementation is planned for a future sprint.'} />
      <ComingSoon moduleName={title} />
    </div>
  );
}
