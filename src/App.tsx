import { useState, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchResults } from '@/components/SearchResults';
import { HomePage } from '@/pages/HomePage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { FeaturedPage } from '@/pages/FeaturedPage';
import { CategoryDetailPage } from '@/pages/CategoryDetailPage';
import { ResourceDetailPage } from '@/pages/ResourceDetailPage';
import { searchResources } from '@/services/searchService';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const searchResults = useMemo(() => {
    return searchResources(submittedQuery);
  }, [submittedQuery]);

  const isSearching = submittedQuery.trim().length > 0;

  const handleSearchChange = useCallback((query: string) => {
    setSearchInput(query);
  }, []);

  const handleSearchSubmit = useCallback((query: string) => {
    setSubmittedQuery(query);
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar
          searchQuery={searchInput}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <main className="flex-1">
          {isSearching ? (
            <SearchResults results={searchResults} query={submittedQuery} />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchInput} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/featured" element={<FeaturedPage />} />
              <Route path="/category/:id" element={<CategoryDetailPage />} />
              <Route path="/resource/:id" element={<ResourceDetailPage />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}
