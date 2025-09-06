import { supabase, WebsiteContent, SocialLink, WebsiteData } from './supabase'

// Admin credentials
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '29012012'
}

// Storage functions using Supabase
export const supabaseStorage = {
  // Get current website data
  getWebsiteData: async (): Promise<WebsiteData> => {
    try {
      // Fetch website content
      const { data: content, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('created_at', { ascending: true })

      if (contentError) {
        console.error('Error fetching website content:', contentError)
        throw contentError
      }

      // Fetch social links
      const { data: socialLinks, error: socialLinksError } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (socialLinksError) {
        console.error('Error fetching social links:', socialLinksError)
        throw socialLinksError
      }

      return {
        content: content || [],
        socialLinks: socialLinks || []
      }
    } catch (error) {
      console.error('Error in getWebsiteData:', error)
      // Return default data if there's an error
      return {
        content: [
          { id: '1', key: 'logo_url', value: '/logo.svg', created_at: '', updated_at: '' },
          { id: '2', key: 'footer_text', value: 'Connect With Me Everywhere', created_at: '', updated_at: '' },
          { id: '3', key: 'site_name', value: 'My Personal Website', created_at: '', updated_at: '' },
          { id: '4', key: 'main_text', value: 'Welcome to my personal website!', created_at: '', updated_at: '' },
          { id: '5', key: 'about_text', value: 'This is where I share my thoughts, projects, and connect with amazing people like you.', created_at: '', updated_at: '' }
        ],
        socialLinks: [
          { id: '1', platform: 'Instagram', url: 'https://instagram.com/yourusername', is_active: true, created_at: '', updated_at: '' },
          { id: '2', platform: 'TikTok', url: 'https://tiktok.com/@yourusername', is_active: true, created_at: '', updated_at: '' }
        ]
      }
    }
  },

  // Update website content
  updateContent: async (key: string, value: string): Promise<void> => {
    try {
      // Check if content exists
      const { data: existingContent } = await supabase
        .from('website_content')
        .select('id')
        .eq('key', key)
        .single()

      if (existingContent) {
        // Update existing content
        const { error } = await supabase
          .from('website_content')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key)

        if (error) {
          console.error('Error updating content:', error)
          throw error
        }
      } else {
        // Insert new content
        const { error } = await supabase
          .from('website_content')
          .insert([
            {
              key,
              value,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])

        if (error) {
          console.error('Error inserting content:', error)
          throw error
        }
      }

      console.log('Content updated:', { key, value })
    } catch (error) {
      console.error('Error in updateContent:', error)
      throw error
    }
  },

  // Update social link
  updateSocialLink: async (id: string, updates: Partial<SocialLink>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('social_links')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating social link:', error)
        throw error
      }

      console.log('Social link updated:', { id, updates })
    } catch (error) {
      console.error('Error in updateSocialLink:', error)
      throw error
    }
  },

  // Add new social link
  addSocialLink: async (link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>): Promise<SocialLink> => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .insert([
          {
            ...link,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error adding social link:', error)
        throw error
      }

      console.log('Social link added:', data)
      return data
    } catch (error) {
      console.error('Error in addSocialLink:', error)
      throw error
    }
  },

  // Remove social link
  removeSocialLink: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error removing social link:', error)
        throw error
      }

      console.log('Social link removed:', id)
    } catch (error) {
      console.error('Error in removeSocialLink:', error)
      throw error
    }
  },

  // Authenticate admin
  authenticateAdmin: async (username: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()

      if (error) {
        console.error('Error authenticating admin:', error)
        return false
      }

      // For now, use direct password comparison
      // In production, you should use proper password hashing
      return data && data.password === password
    } catch (error) {
      console.error('Error in authenticateAdmin:', error)
      return false
    }
  },

  // Initialize database with default data
  initializeDatabase: async (): Promise<void> => {
    try {
      // Check if admin exists
      const { data: adminExists } = await supabase
        .from('admins')
        .select('id')
        .eq('username', ADMIN_CREDENTIALS.username)
        .single()

      if (!adminExists) {
        // Create admin user
        const { error: adminError } = await supabase
          .from('admins')
          .insert([
            {
              username: ADMIN_CREDENTIALS.username,
              password: ADMIN_CREDENTIALS.password,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])

        if (adminError) {
          console.error('Error creating admin:', adminError)
        }
      }

      // Check if default content exists
      const defaultContent = [
        { key: 'logo_url', value: '/logo.svg' },
        { key: 'footer_text', value: 'Connect With Me Everywhere' },
        { key: 'site_name', value: 'My Personal Website' },
        { key: 'main_text', value: 'Welcome to my personal website!' },
        { key: 'about_text', value: 'This is where I share my thoughts, projects, and connect with amazing people like you.' }
      ]

      for (const content of defaultContent) {
        const { data: existingContent } = await supabase
          .from('website_content')
          .select('id')
          .eq('key', content.key)
          .single()

        if (!existingContent) {
          const { error } = await supabase
            .from('website_content')
            .insert([
              {
                key: content.key,
                value: content.value,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])

          if (error) {
            console.error('Error creating default content:', error)
          }
        }
      }

      // Check if default social links exist
      const defaultSocialLinks = [
        { platform: 'Instagram', url: 'https://instagram.com/yourusername', is_active: true },
        { platform: 'TikTok', url: 'https://tiktok.com/@yourusername', is_active: true }
      ]

      for (const link of defaultSocialLinks) {
        const { data: existingLink } = await supabase
          .from('social_links')
          .select('id')
          .eq('platform', link.platform)
          .single()

        if (!existingLink) {
          const { error } = await supabase
            .from('social_links')
            .insert([
              {
                platform: link.platform,
                url: link.url,
                is_active: link.is_active,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])

          if (error) {
            console.error('Error creating default social link:', error)
          }
        }
      }

      console.log('Database initialized successfully')
    } catch (error) {
      console.error('Error initializing database:', error)
    }
  }
}