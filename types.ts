
export enum SectionId {
  HOME = 'home',
  NEWS = 'news',
  PUBLICATIONS = 'publications',
  EXPERIENCE = 'experience',
  AWARDS = 'awards',
  ACTIVITIES = 'activities',
  MISC = 'misc',
  CONTACT = 'contact'
}

export interface Author {
  name: string;
  isMe: boolean;
  url?: string;
  note?: string; // e.g., "*" or "(Project Lead)"
}

export interface Publication {
  id: string;
  title: string;
  authors: Author[];
  venue: string;
  year: string | number;
  abstract?: string; // Used for highlights/descriptions
  tags: string[];
  category?: string; // Added for grouping (e.g., "Segmentation and Tracking")
  links: {
    pdf?: string;
    code?: string;
    projectPage?: string;
    video?: string;
    arxiv?: string;
    poster?: string;
    website?: string;
    zhihu?: string; // Added support for Zhihu links
    huggingface?: string; // Added support for HF
  };
  thumbnail?: string;
  githubRepo?: string; // Format: "User/Repo" for ghbtns.com iframe
}

export interface NewsItem {
  id: string;
  date: string;
  content: string;
  link?: string; // Optional link for the news item content
}

export interface Experience {
  id: string;
  role: string;
  institution: string;
  period: string;
  description?: string;
  logo?: string; // Optional logo path
}

export interface Award {
  id: string;
  year: string;
  title: string;
  description?: string;
  link?: string;
}

export interface ProfessionalActivity {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'scholar' | 'email';
}
