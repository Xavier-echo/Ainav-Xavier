import { Link } from 'react-router-dom';
import { Resource } from '../types';
import { ExternalLink, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

const difficultyColors = {
  '入门': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  '进阶': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  '高级': 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/20',
        resource.isFeatured && 'border-amber-500/20'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {resource.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </div>
      )}

      <Link
        to={`/resource/${resource.id}`}
        className="block p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-amber-400 line-clamp-1">
              {resource.title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-gray-500 line-clamp-2">
              {resource.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium',
                difficultyColors[resource.difficulty]
              )}>
                {resource.difficulty}
              </span>
              {resource.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition-all group-hover:border-amber-500/30 group-hover:text-amber-400 group-hover:bg-amber-500/10">
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
