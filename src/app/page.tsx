'use client'

import { useEffect, useState } from 'react'
import { Instagram, ExternalLink } from 'lucide-react'
import { TikTokIcon } from '@/components/TikTokIcon'

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

export default function Home() {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsiteData()
  }, [])

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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
      case 'tiktok':
        return <TikTokIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      default:
        return <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8" />
    }
  }

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'from-gradient-instagram-start to-gradient-instagram-end hover:from-gradient-instagram-start hover:to-gradient-instagram-end'
      case 'tiktok':
        return 'from-gradient-tiktok-start to-gradient-tiktok-end hover:from-gradient-tiktok-start hover:to-gradient-tiktok-end'
      default:
        return 'from-gradient-default-start to-gradient-default-end hover:from-gradient-default-start hover:to-gradient-default-end'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-30"></div>
        </div>
      </div>
    )
  }

  const logoUrl = websiteData?.content.find(c => c.key === 'logo_url')?.value || '/logo.svg'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 6 + 4}s`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
        
        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white/10 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-white/10 rotate-12 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo with glow effect */}
          {logoUrl && (
            <div className="mb-8 sm:mb-12">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative bg-black/20 backdrop-blur-sm rounded-full p-2">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {websiteData?.socialLinks && websiteData.socialLinks.length > 0 && (
            <div className="space-y-8 sm:space-y-12">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                  CONNECT WITH ME
                </h2>
                <div className="flex justify-center space-x-2">
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
                {websiteData.socialLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group relative overflow-hidden rounded-3xl p-1
                      bg-gradient-to-r ${getSocialColor(link.platform)}
                      transform transition-all duration-500 hover:scale-110 hover:rotate-1
                      shadow-2xl hover:shadow-4xl
                      min-w-[200px] sm:min-w-[220px] lg:min-w-[240px]
                      animate-fade-in-up
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="relative bg-black/30 backdrop-blur-md rounded-3xl p-8 sm:p-10">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex flex-col items-center space-y-4 sm:space-y-6">
                        <div className="p-4 sm:p-6 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                          {getSocialIcon(link.platform)}
                        </div>
                        <span className="text-white font-bold text-xl sm:text-2xl tracking-wider">
                          {link.platform}
                        </span>
                        <div className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          Click to visit
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 py-12 sm:py-16 mt-auto overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Main footer content */}
          <div className="border-t border-white/10 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 py-12">
                {/* Copyright section with logo */}
                <div className="flex flex-col items-center lg:items-start space-y-4">
                  <div className="flex items-center space-x-3">
                    {/* Copyright logo */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300 shadow-lg">
                        <span className="text-white font-bold text-lg">©</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-white font-semibold text-lg">© 2024</h3>
                      <p className="text-white/70 text-sm">All Rights Reserved</p>
                    </div>
                  </div>
                </div>

                {/* Gradient text section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-lg font-bold animate-gradient">
                      {websiteData?.content.find(c => c.key === 'footer_text')?.value || 'Connect With Me Everywhere'}
                    </p>
                    <div className="mt-2 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer group">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:animate-pulse"></div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer group">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full group-hover:animate-pulse"></div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer group">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar with additional effects */}
          <div className="border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 text-sm font-medium">
                    Made with ❤️ and Next.js
                  </p>
                </div>
                <div className="flex items-center space-x-6 text-xs">
                  <span className="text-white/40 hover:text-white/60 transition-colors cursor-pointer">Privacy</span>
                  <span className="text-white/40 hover:text-white/60 transition-colors cursor-pointer">Terms</span>
                  <span className="text-white/40 hover:text-white/60 transition-colors cursor-pointer">Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations and gradients */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 8s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .from-gradient-instagram-start {
          --tw-gradient-from: #f58529;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(245, 133, 41, 0));
        }
        .to-gradient-instagram-end {
          --tw-gradient-to: #dd2a7b;
        }
        .from-gradient-tiktok-start {
          --tw-gradient-from: #000000;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0));
        }
        .to-gradient-tiktok-end {
          --tw-gradient-to: #25f4ee;
        }
        .from-gradient-default-start {
          --tw-gradient-from: #6366f1;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(99, 102, 241, 0));
        }
        .to-gradient-default-end {
          --tw-gradient-to: #8b5cf6;
        }
      `}</style>
    </div>
  )
}