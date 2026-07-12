import { useParams, Link } from 'react-router-dom';
import { ResourceCard } from '../components/ResourceCard';
import { categories } from '../data/categories';
import { resources } from '../data/resources';
import {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
  ArrowLeft, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
};

export function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">分类未找到</h1>
        <Link to="/categories" className="text-amber-400 hover:text-amber-300">
          ← 返回分类导航
        </Link>
      </div>
    );
  }

  const categoryResources = resources.filter((r) => r.category === id);
  const Icon = iconMap[category.icon] || FileText;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-white transition-colors">首页</Link>
          <span className="text-gray-600">/</span>
          <Link to="/categories" className="text-gray-500 hover:text-white transition-colors">分类导航</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-10 flex items-start gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <Icon className="h-8 w-8" style={{ color: category.color }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed">{category.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-400">
                {categoryResources.length} 个资源
              </span>
            </div>
          </div>
        </div>

        {/* Resources */}
        {categoryResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">该分类下暂无资源</p>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回分类导航
          </Link>
        </div>
      </div>
    </div>
  );
}
