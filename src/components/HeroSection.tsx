import { useState } from 'react';
import { Search, ArrowDown, Check } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  totalResources: number;
  totalCategories: number;
}

export function HeroSection({ searchQuery, onSearchChange, onSearchSubmit, totalResources, totalCategories }: HeroSectionProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    onSearchChange(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      onSearchSubmit?.(searchQuery);
    }
  };

  const handleSubmitClick = () => {
    onSearchSubmit?.(searchQuery);
  };
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          持续更新中
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-white">让 AI 理解你的</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            每一个需求
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 leading-relaxed">
          从 Markdown 基础到高级提示词工程，从需求文档到项目规划。
          <br className="hidden sm:block" />
          一站式导航，帮你掌握与 AI 高效协作的核心技能。
        </p>

        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onKeyDown={handleKeyDown}
                placeholder="搜索你感兴趣的主题..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-6 text-base text-white placeholder-gray-500 transition-all focus:border-amber-500/40 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <button
              onClick={handleSubmitClick}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95"
              title="确认搜索"
            >
              <Check className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalResources}</div>
            <div className="text-sm text-gray-500">精选资源</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalCategories}</div>
            <div className="text-sm text-gray-500">知识分类</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">免费</div>
            <div className="text-sm text-gray-500">开放访问</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600 animate-bounce">
            <span className="text-xs">向下滚动</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
