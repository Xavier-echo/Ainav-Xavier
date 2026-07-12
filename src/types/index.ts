export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  difficulty: '入门' | '进阶' | '高级';
  icon: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  resourceCount: number;
}

export interface NavItem {
  label: string;
  path: string;
}
