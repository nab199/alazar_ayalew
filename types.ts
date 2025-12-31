
export enum AppSection {
  HOME = 'HOME',
  WORK = 'WORK',
  TESTIMONIALS = 'TESTIMONIALS',
  CONTACT = 'CONTACT'
}

export type PhotoCategory = 'Wedding' | 'Modeling' | 'Graduation' | 'Celebrity';
export type VideoCategory = 'Promotion' | 'Short Film' | 'Wedding' | 'Modeling';

export interface Project {
  id: string;
  title: string;
  type: 'Photography' | 'Videography';
  category: PhotoCategory | VideoCategory;
  imageUrl: string;
  videoUrl?: string; // Required for Videography
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}
