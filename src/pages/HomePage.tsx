import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { ResourceCard } from '../components/ResourceCard';
import { HeroSection } from '../components/HeroSection';
import { categories } from '../data/categories';
import { resources } from '../data/resources';

interface HomePageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export function HomePage({ searchQuery, onSearchChange, onSearchSubmit }: HomePageProps) {
  const featuredResources = resources.filter((r) => r.isFeatured);

  return (
    <div>
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        totalResources={resources.length}
        totalCategories={categories.length}
      />

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">知识分类</h2>
              <p className="mt-2 text-gray-500">从基础到进阶，系统掌握 AI 协作技能</p>
            </div>
            <Link
              to="/categories"
              className="hidden sm:inline-flex text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">精选推荐</h2>
              <p className="mt-2 text-gray-500">社区精选，从这些资源开始你的学习之旅</p>
            </div>
            <Link
              to="/featured"
              className="hidden sm:inline-flex text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            不知道从哪里开始？
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            按照我们精心设计的 learning path，从 Markdown 基础开始，逐步掌握提示词工程和需求文档编写，最终成为 AI 协作高手。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/category/markdown-basics"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              开始学习
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              浏览所有分类
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
