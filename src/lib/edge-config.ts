// Edge-compatible configuration storage
export interface WebsiteContent {
  id: string
  key: string
  value: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  isActive: boolean
}

export interface WebsiteData {
  content: WebsiteContent[]
  socialLinks: SocialLink[]
}

// Default data for Edge Runtime
export const defaultWebsiteData: WebsiteData = {
  content: [
    { id: '1', key: 'logo_url', value: '/logo.svg' },
    { id: '2', key: 'footer_text', value: 'Connect With Me Everywhere' },
    { id: '3', key: 'site_name', value: 'My Personal Website' },
    { id: '4', key: 'main_text', value: 'Welcome to my personal website!' },
    { id: '5', key: 'about_text', value: 'This is where I share my thoughts, projects, and connect with amazing people like you.' }
  ],
  socialLinks: [
    { id: '1', platform: 'Instagram', url: 'https://instagram.com/yourusername', isActive: true },
    { id: '2', platform: 'TikTok', url: 'https://tiktok.com/@yourusername', isActive: true }
  ]
}

// Admin credentials for Edge Runtime
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '29012012'
}