export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  features: string[];
  technicalSpecs: {
    [key: string]: string;
  };
  compatibility: string[];
  licenseType: 'subscription' | 'perpetual';
  licenseDuration?: string;
  downloads: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewRelease: boolean;
  releaseDate: string;
}

export type ProductCategory = 
  | 'antivirus' 
  | 'vpn' 
  | 'password-manager' 
  | 'encryption' 
  | 'firewall'
  | 'security-suite'
  | 'monitoring'
  | 'courses';