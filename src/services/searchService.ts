import Fuse from 'fuse.js';
import { resources } from '../data/resources';
import { notes } from '../data/notes';
import { Resource } from '../types';

export interface SearchResult {
  item: Resource;
  matches: Array<{
    key: string;
    value: string;
  }>;
}

let fuse: Fuse<Resource & { content: string }> | null = null;

const buildIndex = () => {
  const searchableData = resources.map((resource) => ({
    ...resource,
    content: notes[resource.id] || '',
  }));

  fuse = new Fuse(searchableData, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.2 },
      { name: 'content', weight: 0.1 },
    ],
    includeMatches: true,
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });

  return fuse;
};

export const getFuse = () => {
  if (!fuse) {
    return buildIndex();
  }
  return fuse;
};

export const searchResources = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const fuseInstance = getFuse();
  const results = fuseInstance.search(query);

  return results.map((result) => ({
    item: result.item as Resource,
    matches: (result.matches || []).map((match) => ({
      key: match.key || '',
      value: match.value || '',
    })),
  }));
};

export const highlightMatch = (text: string, query: string): string => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '**$1**');
};
