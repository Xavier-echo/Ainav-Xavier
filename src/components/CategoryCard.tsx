import { Link } from 'react-router-dom';
import { Category } from '../types';
import {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
};

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || FileText;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Gradient glow on hover */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: category.color }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color: category.color }} />
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-400">
            {category.resourceCount} 个资源
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
          {category.name}
        </h3>
        <p className="text-sm leading-relaxed text-gray-500 line-clamp-2">
          {category.description}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2" style={{ color: category.color }}>
          <span>探索资源</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
