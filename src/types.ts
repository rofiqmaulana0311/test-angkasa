export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string; // Lucide icon name representation
}

export interface PortfolioItem {
  id: string;
  client: string;
  title: string;
  category: 'logo' | 'identity' | 'collateral' | 'motion';
  themeClass: string;
  mockupType: 'nexus' | 'luminar' | 'vault' | 'kosmik' | 'strata';
  image?: string; // Optional custom user image path path relative to public e.g. "/images/portfolio1.png"
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  role: string;
  avatarText: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  num: string;
  name: string;
  priceIdr: string;
  features: string[];
  badge: string;
}
