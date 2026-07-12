import { ResourceCard } from '../components/ResourceCard';
import { resources } from '../data/resources';
import { Star } from 'lucide-react';

export function FeaturedPage() {
  const featuredResources = resources.filter((r) => r.isFeatured);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
              <Star className="h-5 w-5 text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">精选推荐</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            由社区编辑精选的高质量学习资源，涵盖从入门到高级的各个阶段。
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {/* All Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">全部资源</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources
              .filter((r) => !r.isFeatured)
              .map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
