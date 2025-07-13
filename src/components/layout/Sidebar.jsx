import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  FileText, 
  Search, 
  Settings, 
  User,
  LogOut,
  Copy,
  BarChart3,
  Shield,
  X,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../App'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const agentNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Client', href: '/add-client', icon: UserPlus },
    { name: 'My Clients', href: '/my-clients', icon: Users },
    { name: 'Visit Notes', href: '/visit-notes', icon: FileText },
    { name: 'Search Client', href: '/search', icon: Search },
  ]

  const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'All Clients', href: '/all-clients', icon: Users },
    { name: 'Visit Notes Manager', href: '/visit-notes-manager', icon: FileText },
    { name: 'Add Client', href: '/add-client', icon: UserPlus },
    { name: 'Manage Agents', href: '/manage-agents', icon: User },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Duplicate Checker', href: '/duplicate-checker', icon: Copy },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'System Settings', href: '/system-settings', icon: Shield },
  ]

  const navItems = user?.role === 'admin' ? adminNavItems : agentNavItems

  const handleLogout = () => {
    logout()
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">CRM System</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`
                  mr-3 h-5 w-5 transition-colors duration-200
                  ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                `} />
                {item.name}
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 text-primary-600" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <NavLink
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className={`
              group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              ${location.pathname === '/profile'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <Settings className={`
              mr-3 h-5 w-5 transition-colors duration-200
              ${location.pathname === '/profile' ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
            `} />
            Profile & Settings
          </NavLink>
          
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar 