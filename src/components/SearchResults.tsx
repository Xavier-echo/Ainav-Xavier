import { Link } from 'react-router-dom';
import { SearchX, FileText } from 'lucide-react';
import { SearchResult } from '../services/searchService';
import { categories } from '../data/categories';
import { cn } from '../lib/utils';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            搜索 "<span className="text-amber-400">{query}</span>"
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            找到 <span className="text-amber-400 font-medium">{results.length}</span> 个相关结果
          </p>
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => {
              const category = categories.find((c) => c.id === result.item.category);
              const contentMatch = result.matches.find((m) => m.key === 'content');

              return (
                <Link
                  key={result.item.id + '-' + index}
                  to={`/resource/${result.item.id}`}
                  className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {highlightText(result.item.title, query)}
                        </h3>
                        {category && (
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ backgroundColor: `${category.color}15`, color: category.color }}
                          >
                            {category.name}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {highlightText(result.item.description, query)}
                      </p>

                      {contentMatch && (
                        <div className="text-sm text-gray-500 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/5">
                          <span className="text-amber-400/70 text-xs">内容匹配：</span>
                          <p className="line-clamp-2">{getSnippet(contentMatch.value, query)}</p>
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">未找到相关资源</h3>
            <p className="text-sm text-gray-600 max-w-md">
              试试其他关键词，或浏览下方的分类导航
            </p>
            <Link
              to="/categories"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              浏览全部分类
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className={cn(
          'bg-amber-400/20 text-amber-300 px-0.5 rounded',
          'decoration-amber-400/50 underline underline-offset-2'
        )}
      >
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

function getSnippet(content: string, query: string): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) return content.slice(0, 100) + '...';

  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 50);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < content.length ? '...' : '';

  return prefix + content.slice(start, end) + suffix;
}
