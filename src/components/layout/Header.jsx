import React from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Bell, User } from 'lucide-react'
import { useAuth } from '../../App'

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    const titles = {
      '/dashboard': 'Dashboard',
      '/add-client': 'Add Client',
      '/my-clients': 'My Clients',
      '/all-clients': 'All Clients',
      '/visit-notes': 'Visit Notes',
      '/visit-notes-manager': 'Visit Notes Manager',
      '/search': 'Search',
      '/manage-agents': 'Manage Agents',
      '/duplicate-checker': 'Duplicate Checker',
      '/reports': 'Reports',
      '/system-settings': 'System Settings',
      '/profile': 'Profile & Settings'
    }
    return titles[path] || 'CRM System'
  }

  const getBreadcrumb = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Overview'
    if (path.startsWith('/')) return path.substring(1).replace('-', ' ')
    return path
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Mobile menu button and page title */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500 capitalize">
              {getBreadcrumb()}
            </p>
          </div>
        </div>

        {/* Right side - Notifications and user info */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User avatar and info */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 