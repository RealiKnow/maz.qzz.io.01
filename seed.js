const { db } = require('./src/lib/db')
const bcrypt = require('bcryptjs')

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('29012012', 10)
    await db.admin.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: hashedPassword
      }
    })

    // Create default website content
    const defaultContent = [
      { key: 'site_name', value: 'My Personal Website' },
      { key: 'logo_url', value: '/logo.svg' },
      { key: 'main_text', value: 'Welcome to my personal website!' },
      { key: 'about_text', value: 'This is where I share my thoughts, projects, and connect with amazing people like you.' },
      { key: 'footer_text', value: '© 2024 My Personal Website. All rights reserved.' }
    ]

    for (const content of defaultContent) {
      await db.websiteContent.upsert({
        where: { key: content.key },
        update: {},
        create: content
      })
    }

    // Create default social links
    const defaultSocialLinks = [
      { id: '1', platform: 'Instagram', url: 'https://instagram.com/yourusername', isActive: true },
      { id: '2', platform: 'TikTok', url: 'https://tiktok.com/@yourusername', isActive: true }
    ]

    for (const link of defaultSocialLinks) {
      await db.socialLink.upsert({
        where: { id: link.id },
        update: {},
        create: link
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await db.$disconnect()
  }
}

seed()