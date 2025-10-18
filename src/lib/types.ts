export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramItem {
  id: string;
  sieName: string;
  description: string;
  programs: string[];
  updatedAt: Date;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  period: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  approved: boolean;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
}