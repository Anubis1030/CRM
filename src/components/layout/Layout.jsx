import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../pages/Dashboard'
import AddClient from '../pages/AddClient'
import MyClients from '../pages/MyClients'
import AllClients from '../pages/AllClients'
import VisitNotes from '../pages/VisitNotes'
import VisitNotesManager from '../pages/VisitNotesManager'
import SearchClient from '../pages/SearchClient'
import ManageAgents from '../pages/ManageAgents'
import DuplicateChecker from '../pages/DuplicateChecker'
import Reports from '../pages/Reports'
import SystemSettings from '../pages/SystemSettings'
import Profile from '../pages/Profile'
import { useAuth } from '../../App'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-client" element={<AddClient />} />
            
            {/* Agent Routes */}
            {user?.role === 'agent' && (
              <>
                <Route path="/my-clients" element={<MyClients />} />
                <Route path="/visit-notes" element={<VisitNotes />} />
                <Route path="/search" element={<SearchClient />} />
              </>
            )}

            {/* Admin Routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/all-clients" element={<AllClients />} />
                <Route path="/visit-notes-manager" element={<VisitNotesManager />} />
                <Route path="/manage-agents" element={<ManageAgents />} />
                <Route path="/search" element={<SearchClient />} />
                <Route path="/duplicate-checker" element={<DuplicateChecker />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/system-settings" element={<SystemSettings />} />
              </>
            )}

            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Layout 