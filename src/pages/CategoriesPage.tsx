import { useState } from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';
import { Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const difficultyFilters = ['全部', '入门', '进阶', '高级'] as const;

export function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">分类导航</h1>
          <p className="text-gray-400 max-w-2xl">
            按主题浏览所有学习资源，找到你感兴趣的方向，系统性地提升 AI 协作能力。
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Filter className="h-4 w-4 text-gray-500" />
          {difficultyFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                activeFilter === filter
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
