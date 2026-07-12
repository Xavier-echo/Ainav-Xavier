import { Compass, Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                <Compass className="h-4 w-4 text-black" />
              </div>
              <span className="text-base font-bold text-white">
                AI<span className="text-amber-400">Nav</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              帮助你掌握与 AI 高效协作的核心技能，让每一次对话都有价值。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">快速导航</h4>
            <ul className="space-y-2.5">
              {[
                { label: '首页', path: '/' },
                { label: '分类导航', path: '/categories' },
                { label: '精选推荐', path: '/featured' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">热门分类</h4>
            <ul className="space-y-2.5">
              {['Markdown 基础', '提示词工程', '需求文档编写', 'AI 协作技巧'].map((name) => (
                <li key={name}>
                  <span className="text-sm text-gray-500">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">关于</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-gray-500">开源项目</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">社区贡献</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">联系我们</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 AINav. 用 <Heart className="inline h-3.5 w-3.5 text-rose-500 fill-rose-500" /> 打造
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
