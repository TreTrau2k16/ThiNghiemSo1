export interface Project {
  id: string;
  name: string;
  category: 'civil' | 'industrial';
  location: string;
  year: number;
  area: number; // in m2
  method: string;
  materialsUsed: string[];
  description: string;
  image: string;
  beforeImage?: string;
  status: 'Completed' | 'In progress';
  solutionsHighlights: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: string; // lucide icon name
  badgeColor: string;
}

export interface WaterproofingMethod {
  id: string;
  name: string;
  structureType: 'terrace' | 'toilet' | 'basement' | 'wall';
  description: string;
  layers: string[];
  materials: { name: string; brand: string }[];
  suitability: string;
  warrantyYears: number;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  structureType: string;
  areaSize: number;
  notes?: string;
  estimatedCostMin?: number;
  estimatedCostMax?: number;
  createdAt: string;
  status: 'Processing' | 'Received' | 'Contacted';
}
