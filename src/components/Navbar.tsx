import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Compass, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onSearchFocus?: () => void;
}

export function Navbar({ searchQuery, onSearchChange, onSearchSubmit, onSearchFocus }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { label: '首页', path: '/' },
    { label: '分类导航', path: '/categories' },
    { label: '精选推荐', path: '/featured' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5 text-black" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              AI<span className="text-amber-400">Nav</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={handleKeyDown}
                  onFocus={onSearchFocus}
                  placeholder="搜索资源、教程、技巧..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 transition-all focus:border-amber-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSubmitClick}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-black transition-all hover:bg-amber-400 active:scale-95"
                title="确认搜索"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-2">
            <div className="relative mb-3 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索资源..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSubmitClick}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-black transition-all hover:bg-amber-400 active:scale-95"
                title="确认搜索"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
