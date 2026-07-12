import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resources } from '../data/resources';
import { notes } from '../data/notes';
import { categories } from '../data/categories';
import {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
  ArrowLeft, ExternalLink, Star, Tag, BookOpen, Clock, BarChart,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap: Record<string, LucideIcon> = {
  FileText, Sparkles, ClipboardList, Bot, LayoutGrid, Code2, Bug, Award,
};

const difficultyColors = {
  '入门': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  '进阶': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  '高级': 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const resource = resources.find((r) => r.id === id);
  const noteContent = useMemo(() => (id ? notes[id] : ''), [id]);
  const hasNote = !!noteContent;

  if (!resource) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">资源未找到</h1>
        <Link to="/" className="text-amber-400 hover:text-amber-300">
          ← 返回首页
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === resource.category);
  const CategoryIcon = category ? (iconMap[category.icon] || FileText) : FileText;
  const relatedResources = resources
    .filter((r) => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);

  const readingTime = Math.ceil(noteContent.length / 500) || 5;
  const wordCount = noteContent.length || 0;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-white transition-colors">首页</Link>
          <span className="text-gray-600">/</span>
          {category && (
            <>
              <Link to={`/category/${category.id}`} className="text-gray-500 hover:text-white transition-colors">
                {category.name}
              </Link>
              <span className="text-gray-600">/</span>
            </>
          )}
          <span className="text-gray-300 truncate">{resource.title}</span>
        </nav>

        {/* Resource Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {resource.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">
                <Star className="h-3 w-3 fill-amber-400" />
                精选推荐
              </span>
            )}
            <span className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium',
              difficultyColors[resource.difficulty]
            )}>
              {resource.difficulty}
            </span>
            {category && (
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: `${category.color}15`, color: category.color }}
              >
                {category.name}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{resource.title}</h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">{resource.description}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>预计阅读 {readingTime} 分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>约 {wordCount} 字</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{resource.tags.length} 个标签</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            to={category ? `/category/${category.id}` : '/categories'}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            返回{category?.name || '分类'}
          </Link>
          <a
            href={resource.url}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            外部链接
          </a>
        </div>

        {/* Tags */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/5 border border-white/5 px-3 py-1.5 text-sm text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Note Content */}
        {hasNote && (
          <article className="mb-16">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                  <span className="font-medium text-white">学习笔记</span>
                </div>
                <span className="text-xs text-gray-500">AINav 原创</span>
              </div>

              <div className="p-6 sm:p-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 mt-2 pb-3 border-b border-white/10">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg sm:text-xl font-semibold text-white mt-8 mb-3">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base font-semibold text-white mt-6 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed my-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 my-4 text-gray-300 pl-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 my-4 text-gray-300 pl-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-amber-500/50 bg-amber-500/5 pl-4 py-2 my-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-white/10 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block bg-white/[0.03] border border-white/10 rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono text-gray-300">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-white/[0.03] border border-white/10 rounded-xl p-4 my-4 overflow-x-auto">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
                        <table className="w-full text-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-white/5">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="text-left px-4 py-3 font-semibold text-white border-b border-white/10">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-gray-300 border-b border-white/5">
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="my-8 border-white/5" />
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {noteContent}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        )}

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <div className="border-t border-white/5 pt-12">
            <h3 className="text-lg font-semibold text-white mb-6">相关推荐</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedResources.map((r) => {
                const rCategory = categories.find((c) => c.id === r.category);
                const RIcon = rCategory ? (iconMap[rCategory.icon] || FileText) : FileText;
                return (
                  <Link
                    key={r.id}
                    to={`/resource/${r.id}`}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                        <RIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-500">{rCategory?.name}</span>
                    </div>
                    <h4 className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
