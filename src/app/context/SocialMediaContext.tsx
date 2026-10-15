import React, { createContext, useContext, useState } from 'react';

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'LinkedIn' | 'Facebook' | 'Youtube';
  caption: string;
  img: string;
  date: string;
  url?: string;
  isHidden?: boolean;
}

interface SocialMediaContextType {
  socialLinks: Record<string, string>;
  updateSocialLink: (platform: string, url: string) => void;
  posts: SocialPost[];
  addPost: (post: Omit<SocialPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<SocialPost>) => void;
  deletePost: (id: string) => void;
}

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export function SocialMediaProvider({ children }: { children: React.ReactNode }) {
  // Default Links
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://www.instagram.com/paperware_factory/",
    facebook: "https://www.facebook.com/paperwarefactory",
    linkedin: "https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true",
    youtube: "https://www.youtube.com/@PaperwareFactory"
  });

  // Default Posts (moved from ContactPage)
  const [posts, setPosts] = useState<SocialPost[]>([]); // no demo posts; real posts only

  const updateSocialLink = (platform: string, url: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: url }));
  };

  const addPost = (post: Omit<SocialPost, 'id'>) => {
    const newPost = { ...post, id: Math.random().toString(36).substr(2, 9), isHidden: false };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<SocialPost>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <SocialMediaContext.Provider value={{ socialLinks, updateSocialLink, posts, addPost, updatePost, deletePost }}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
}