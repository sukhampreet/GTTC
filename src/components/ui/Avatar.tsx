import { cn } from '@/utils/cn';

export interface AvatarProps {
  initials: string;
  className?: string;
  size?: 'sm' | 'md';
}

const SIZE_CLASSES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'size-7 text-[10px]',
  md: 'size-8 text-xs',
};

export function Avatar({ initials, className, size = 'md' }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border border-primary-600/40 bg-primary-900 font-semibold text-primary-300',
        SIZE_CLASSES[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}
