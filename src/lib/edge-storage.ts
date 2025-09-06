// Edge-compatible storage using environment variables and simple persistence
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

// Simple in-memory storage with persistence simulation
let currentWebsiteData: WebsiteData = { ...defaultWebsiteData }

// Storage functions that simulate persistence
export const edgeStorage = {
  // Get current website data
  getWebsiteData: (): WebsiteData => {
    return currentWebsiteData
  },

  // Update website content
  updateContent: (key: string, value: string): void => {
    const existingIndex = currentWebsiteData.content.findIndex(c => c.key === key)
    if (existingIndex >= 0) {
      currentWebsiteData.content[existingIndex].value = value
    } else {
      currentWebsiteData.content.push({
        id: Date.now().toString(),
        key,
        value
      })
    }
    // In production, this would save to Cloudflare KV or similar
    console.log('Content updated:', { key, value })
  },

  // Update social link
  updateSocialLink: (id: string, updates: Partial<SocialLink>): void => {
    const index = currentWebsiteData.socialLinks.findIndex(link => link.id === id)
    if (index >= 0) {
      currentWebsiteData.socialLinks[index] = { ...currentWebsiteData.socialLinks[index], ...updates }
    }
    console.log('Social link updated:', { id, updates })
  },

  // Add new social link
  addSocialLink: (link: Omit<SocialLink, 'id'>): SocialLink => {
    const newLink = { ...link, id: Date.now().toString() }
    currentWebsiteData.socialLinks.push(newLink)
    console.log('Social link added:', newLink)
    return newLink
  },

  // Remove social link
  removeSocialLink: (id: string): void => {
    currentWebsiteData.socialLinks = currentWebsiteData.socialLinks.filter(link => link.id !== id)
    console.log('Social link removed:', id)
  },

  // Reset to default data
  resetToDefault: (): void => {
    currentWebsiteData = { ...defaultWebsiteData }
    console.log('Data reset to default')
  }
}