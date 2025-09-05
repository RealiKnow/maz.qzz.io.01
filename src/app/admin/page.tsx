'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Save, 
  Plus, 
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Palette,
  BarChart3,
  Users,
  Globe,
  Zap,
  Shield,
  Bell,
  Database,
  Eye,
  Edit,
  Copy,
  Download,
  Upload
} from 'lucide-react'

interface WebsiteContent {
  id: string
  key: string
  value: string
}

interface SocialLink {
  id: string
  platform: string
  url: string
  isActive: boolean
}

interface WebsiteData {
  content: WebsiteContent[]
  socialLinks: SocialLink[]
}

interface Analytics {
  visitors: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: string
}

export default function AdminDashboard() {
  const [websiteData, setWebsiteData] = useState<{
    content: WebsiteContent[]
    socialLinks: SocialLink[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications] = useState([
    { id: 1, message: 'Welcome to the advanced admin panel!', type: 'success', time: '2 min ago' },
    { id: 2, message: 'Your website is running smoothly', type: 'info', time: '1 hour ago' }
  ])
  const router = useRouter()

  // Mock analytics data
  const [analytics] = useState<Analytics>({
    visitors: 1247,
    pageViews: 3421,
    bounceRate: 32.5,
    avgSessionDuration: '3m 24s'
  })

  useEffect(() => {
    checkAuth()
    fetchWebsiteData()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchWebsiteData = async () => {
    try {
      const response = await fetch('/api/website')
      const data = await response.json()
      setWebsiteData(data)
    } catch (error) {
      console.error('Error fetching website data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (key: string, value: string) => {
    if (!websiteData) return
    setWebsiteData({
      ...websiteData,
      content: websiteData.content.map(c => 
        c.key === key ? { ...c, value } : c
      )
    })
  }

  const updateSocialLink = (id: string, field: string, value: string | boolean) => {
    if (!websiteData) return
    setWebsiteData({
      ...websiteData,
      socialLinks: websiteData.socialLinks.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    })
  }

  const addSocialLink = () => {
    if (!websiteData) return
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: '',
      url: '',
      isActive: true
    }
    setWebsiteData({
      ...websiteData,
      socialLinks: [...websiteData.socialLinks, newLink]
    })
  }

  const removeSocialLink = (id: string) => {
    if (!websiteData) return
    setWebsiteData({
      ...websiteData,
      socialLinks: websiteData.socialLinks.filter(link => link.id !== id)
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        updateContent('logo_url', data.url)
      } else {
        alert('Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('An error occurred while uploading the file')
    } finally {
      setUploading(false)
    }
  }

  const saveChanges = async () => {
    if (!websiteData) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/admin/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteData),
      })

      if (response.ok) {
        // Add success notification
        alert('Changes saved successfully!')
      } else {
        alert('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('An error occurred while saving changes')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const getContentValue = (key: string, defaultValue: string = '') => {
    return websiteData?.content.find(c => c.key === key)?.value || defaultValue
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-30"></div>
        </div>
      </div>
    )
  }

  if (!websiteData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading data</h1>
          <button 
            onClick={fetchWebsiteData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Advanced Admin Panel</h1>
                <p className="text-sm text-gray-500">Full control over your website</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={saveChanges}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeTab === 'content' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Edit className="w-5 h-5" />
                <span>Content</span>
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeTab === 'social' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Social Links</span>
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeTab === 'appearance' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Palette className="w-5 h-5" />
                <span>Appearance</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.visitors.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Page Views</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.pageViews.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Eye className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.bounceRate}%</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.avgSessionDuration}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-900 font-medium">Preview Website</span>
                    </button>
                    <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <Download className="w-5 h-5 text-green-600" />
                      <span className="text-green-900 font-medium">Export Data</span>
                    </button>
                    <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <Database className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-900 font-medium">Backup</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Edit className="w-5 h-5 mr-2" />
                    Website Content
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={getContentValue('site_name')}
                        onChange={(e) => updateContent('site_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter site name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo URL
                      </label>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={getContentValue('logo_url')}
                          onChange={(e) => updateContent('logo_url', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="https://example.com/logo.png"
                        />
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                          <label className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center justify-center space-x-2 w-full sm:w-auto transition-all duration-200 transform hover:scale-105">
                            <ImageIcon className="w-4 h-4" />
                            <span>{uploading ? 'Uploading...' : 'Upload Logo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                          {getContentValue('logo_url') && (
                            <div className="flex items-center space-x-2">
                              <img
                                src={getContentValue('logo_url')}
                                alt="Logo preview"
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                }}
                              />
                              <span className="text-sm text-gray-500">Preview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Text
                      </label>
                      <textarea
                        value={getContentValue('main_text')}
                        onChange={(e) => updateContent('main_text', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={3}
                        placeholder="Enter main text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Text
                      </label>
                      <textarea
                        value={getContentValue('about_text')}
                        onChange={(e) => updateContent('about_text', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={4}
                        placeholder="Enter about text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Footer Text
                      </label>
                      <textarea
                        value={getContentValue('footer_text')}
                        onChange={(e) => updateContent('footer_text', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={2}
                        placeholder="Enter footer text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Social Links
                    </h2>
                    <button
                      onClick={addSocialLink}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Link</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {websiteData.socialLinks.map((link) => (
                      <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-3 w-full">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Platform
                                </label>
                                <input
                                  type="text"
                                  value={link.platform}
                                  onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                  placeholder="Instagram, TikTok, etc."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  URL
                                </label>
                                <input
                                  type="url"
                                  value={link.url}
                                  onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                  placeholder="https://instagram.com/username"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={link.isActive}
                                  onChange={(e) => updateSocialLink(link.id, 'isActive', e.target.checked)}
                                  className="mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                  Active
                                </label>
                              </div>
                            </div>
                            <button
                              onClick={() => removeSocialLink(link.id)}
                              className="text-red-600 hover:text-red-700 mt-2 sm:mt-0 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Appearance Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value="#6366f1"
                            className="w-12 h-12 rounded-lg border border-gray-300"
                          />
                          <span className="text-sm text-gray-600">#6366f1</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Color
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value="#8b5cf6"
                            className="w-12 h-12 rounded-lg border border-gray-300"
                          />
                          <span className="text-sm text-gray-600">#8b5cf6</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme Style
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                          <div className="text-center">
                            <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                            <span className="text-sm font-medium">Modern</span>
                          </div>
                        </button>
                        <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400">
                          <div className="text-center">
                            <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-gray-600 rounded mb-2"></div>
                            <span className="text-sm font-medium">Classic</span>
                          </div>
                        </button>
                        <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400">
                          <div className="text-center">
                            <div className="w-full h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded mb-2"></div>
                            <span className="text-sm font-medium">Nature</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        value="https://yourwebsite.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Meta Description
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={3}
                        placeholder="Enter meta description for SEO"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                        <p className="text-sm text-gray-600">Temporarily disable your website</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Analytics</h3>
                        <p className="text-sm text-gray-600">Track visitor statistics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}