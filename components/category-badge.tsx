import { Cog, LayoutGrid, Database, Zap } from 'lucide-react';

type Category = 'Algorithm Orchestration' | 'Campaign Structure' | 'Data Enrichment' | 'Direct Action';

interface CategoryBadgeProps {
  category: Category;
}

const categoryConfig: Record<Category, { bg: string; text: string; icon: React.ElementType }> = {
  'Algorithm Orchestration': {
    bg: 'bg-[#45a19c]/10',
    text: 'text-[#45a19c]',
    icon: Cog,
  },
  'Campaign Structure': {
    bg: 'bg-[#5c74b5]/10',
    text: 'text-[#5c74b5]',
    icon: LayoutGrid,
  },
  'Data Enrichment': {
    bg: 'bg-[#f59e0b]/10',
    text: 'text-[#d97706]',
    icon: Database,
  },
  'Direct Action': {
    bg: 'bg-[#6c757d]/10',
    text: 'text-[#6c757d]',
    icon: Zap,
  },
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
      <Icon size={12} />
      {category}
    </span>
  );
}
