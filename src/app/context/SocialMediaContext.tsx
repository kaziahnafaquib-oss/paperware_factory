import { ReactNode, createContext, useContext, useState } from 'react';

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'LinkedIn' | 'Facebook' | 'Youtube';
  caption: string;
  captionKey?: string;
  img: string;
  date: string;
  dateKey?: string;
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

export function SocialMediaProvider({ children }: { children: ReactNode }) {
  // Default Links
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://www.instagram.com/paperware_factory/",
    facebook: "https://www.facebook.com/paperwarefactory",
    linkedin: "https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true",
    youtube: "https://www.youtube.com/@PaperwareFactory"
  });

  // Default Posts (moved from ContactPage)
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1765371512971-9d4da531d004?q=80&w=800",
      caption: "Our minimalist design HQ where engineering meets sustainability. Creating the future of paperware.",
      captionKey: "social_post_1",
      date: "1h ago",
      dateKey: "time_1h_ago",
      isHidden: false
    },
    {
      id: '2',
      platform: "LinkedIn",
      img: "https://images.unsplash.com/photo-1761125802333-d145773f4461?q=80&w=800",
      caption: "Enterprise solutions for sustainable high-volume manufacturing. Scaling global impact with Tier-1 partners.",
      captionKey: "social_post_2",
      date: "4h ago",
      dateKey: "time_4h_ago",
      isHidden: false
    },
    {
      id: '3',
      platform: "Facebook",
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
      caption: "Behind the scenes at our state-of-the-art production facility. Precision engineering in action.",
      captionKey: "social_post_3",
      date: "2d ago",
      dateKey: "time_2d_ago",
      isHidden: false
    },
    {
      id: '4',
      platform: "Youtube",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
      caption: "Watch how we recycle 10 tons of paper daily into premium packaging solutions.",
      captionKey: "social_post_4",
      date: "3d ago",
      dateKey: "time_3d_ago",
      isHidden: false
    },
    {
      id: '5',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800",
      caption: "Fresh batch of custom printed cups ready for dispatch to our cafe partners in Dhaka.",
      captionKey: "social_post_5",
      date: "5d ago",
      dateKey: "time_5d_ago",
      isHidden: false
    },
    {
      id: '6',
      platform: "LinkedIn",
      img: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800",
      caption: "Proud to announce our ISO 9001:2015 certification renewal. Quality is our promise.",
      captionKey: "social_post_6",
      date: "1w ago",
      dateKey: "time_1w_ago",
      isHidden: false
    },
    {
      id: '7',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800",
      caption: "Sustainable doesn't mean boring. Check out our new vibrant summer collection!",
      captionKey: "social_post_7",
      date: "1w ago",
      dateKey: "time_1w_ago",
      isHidden: true
    },
    {
      id: '8',
      platform: "Facebook",
      img: "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=800",
      caption: "Community cleanup drive sponsored by Paperware. Giving back to the environment we love.",
      captionKey: "social_post_8",
      date: "2w ago",
      dateKey: "time_2w_ago",
      isHidden: false
    },
    {
      id: '9',
      platform: "Youtube",
      img: "https://images.unsplash.com/photo-1565514020176-db967528cb8e?q=80&w=800",
      caption: "Customer Success Story: How 'Cafe Brew' reduced their plastic footprint by 80%.",
      captionKey: "social_post_9",
      date: "2w ago",
      dateKey: "time_2w_ago",
      isHidden: false
    },
    {
      id: '10',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1509785303662-999d5338d0e6?q=80&w=800",
      caption: "Minimalist aesthetics for the modern brand. #Paperware #Design",
      captionKey: "social_post_10",
      date: "3w ago",
      dateKey: "time_3w_ago",
      isHidden: false
    },
    {
      id: '11',
      platform: "LinkedIn",
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800",
      caption: "Hiring Alert! We are looking for a Senior Supply Chain Manager to join our team.",
      captionKey: "social_post_11",
      date: "3w ago",
      dateKey: "time_3w_ago",
      isHidden: false
    },
    {
      id: '12',
      platform: "Facebook",
      img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800",
      caption: "Happy Independence Day! Celebrating the spirit of Bangladesh.",
      captionKey: "social_post_12",
      date: "1mo ago",
      dateKey: "time_1mo_ago",
      isHidden: false
    },
    {
      id: '13',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1520607162513-77705e68572c?q=80&w=800",
      caption: "Textures of sustainability. Close up of our recycled paper mesh.",
      captionKey: "social_post_13",
      date: "1mo ago",
      dateKey: "time_1mo_ago",
      isHidden: true
    },
    {
      id: '14',
      platform: "Youtube",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
      caption: "Factory Tour 2024: See where the magic happens.",
      captionKey: "social_post_14",
      date: "1mo ago",
      dateKey: "time_1mo_ago",
      isHidden: false
    },
    {
      id: '15',
      platform: "LinkedIn",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
      caption: "Discussing the future of sustainable packaging at the Dhaka Trade Expo.",
      captionKey: "social_post_15",
      date: "2mo ago",
      dateKey: "time_2mo_ago",
      isHidden: false
    },
    {
      id: '16',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800",
      caption: "Coffee just tastes better in a cup that doesn't hurt the planet. ☕",
      captionKey: "social_post_16",
      date: "2mo ago",
      dateKey: "time_2mo_ago",
      isHidden: false
    },
    {
      id: '17',
      platform: "Facebook",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
      caption: "Brainstorming session for our upcoming biodegradable cutlery line.",
      captionKey: "social_post_17",
      date: "2mo ago",
      dateKey: "time_2mo_ago",
      isHidden: false
    },
    {
      id: '18',
      platform: "Youtube",
      img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800",
      caption: "Paperware x GreenEarth NGO: A partnership for change.",
      captionKey: "social_post_18",
      date: "3mo ago",
      dateKey: "time_3mo_ago",
      isHidden: false
    },
    {
      id: '19',
      platform: "Instagram",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
      caption: "Groceries look good in our durable paper bags. #EcoLifestyle",
      captionKey: "social_post_19",
      date: "3mo ago",
      dateKey: "time_3mo_ago",
      isHidden: false
    },
    {
      id: '20',
      platform: "LinkedIn",
      img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800",
      caption: "Our CEO speaking about circular economy at the Global Manufacturing Summit.",
      captionKey: "social_post_20",
      date: "4mo ago",
      dateKey: "time_4mo_ago",
      isHidden: false
    }
  ]);

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