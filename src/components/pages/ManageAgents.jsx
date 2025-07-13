import React, { useState } from 'react'
import { Search, Plus, Edit, Eye, UserCheck, UserX, Mail, Phone } from 'lucide-react'
import Table from '../ui/Table'
import Modal from '../ui/Modal'
import toast from 'react-hot-toast'

const ManageAgents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showAgentModal, setShowAgentModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock data
  const agents = [
    {
      id: 1,
      name: 'Agent User',
      email: 'agent@company.com',
      phone: '(555) 123-4567',
      status: 'active',
      role: 'agent',
      clientsAssigned: 15,
      lastLogin: '2024-01-15 09:30 AM',
      joinDate: '2023-06-15',
      performance: {
        notesThisMonth: 24,
        callsThisMonth: 12,
        meetingsThisMonth: 8
      }
    },
    {
      id: 2,
      name: 'Jane Agent',
      email: 'jane@company.com',
      phone: '(555) 234-5678',
      status: 'active',
      role: 'agent',
      clientsAssigned: 12,
      lastLogin: '2024-01-15 08:45 AM',
      joinDate: '2023-08-20',
      performance: {
        notesThisMonth: 18,
        callsThisMonth: 9,
        meetingsThisMonth: 6
      }
    },
    {
      id: 3,
      name: 'Bob Agent',
      email: 'bob@company.com',
      phone: '(555) 345-6789',
      status: 'inactive',
      role: 'agent',
      clientsAssigned: 8,
      lastLogin: '2024-01-10 02:15 PM',
      joinDate: '2023-04-10',
      performance: {
        notesThisMonth: 5,
        callsThisMonth: 3,
        meetingsThisMonth: 1
      }
    },
  ]

  const columns = [
    {
      key: 'name',
      label: 'Agent',
      sortable: true,
      render: (_, agent) => (
        <div>
          <div className="font-medium text-gray-900">{agent.name}</div>
          <div className="text-sm text-gray-500">{agent.email}</div>
        </div>
      )
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (_, agent) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {agent.phone}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => {
        const statusColors = {
          active: 'bg-green-100 text-green-800',
          inactive: 'bg-red-100 text-red-800',
          pending: 'bg-yellow-100 text-yellow-800'
        }
        const statusIcons = {
          active: UserCheck,
          inactive: UserX,
          pending: UserCheck
        }
        const Icon = statusIcons[status]
        return (
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
            <Icon className="h-3 w-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      }
    },
    {
      key: 'clientsAssigned',
      label: 'Clients',
      sortable: true,
      render: (count) => (
        <div className="text-sm text-gray-900 font-medium">{count}</div>
      )
    },
    {
      key: 'performance',
      label: 'This Month',
      render: (_, agent) => (
        <div className="text-sm text-gray-600">
          <div>{agent.performance.notesThisMonth} notes</div>
          <div>{agent.performance.callsThisMonth} calls</div>
        </div>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Active',
      sortable: true,
      render: (lastLogin) => (
        <div className="text-sm text-gray-600">{lastLogin}</div>
      )
    }
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = !searchTerm || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || agent.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleViewAgent = (agent) => {
    setSelectedAgent(agent)
    setShowAgentModal(true)
  }

  const handleToggleStatus = (agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active'
    toast.success(`Agent ${agent.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`)
  }

  const actionButtons = (agent) => (
    <>
      <button
        onClick={() => handleViewAgent(agent)}
        className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => window.open(`mailto:${agent.email}`)}
        className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleToggleStatus(agent)}
        className={`p-2 transition-colors duration-200 ${
          agent.status === 'active' 
            ? 'text-gray-400 hover:text-red-600' 
            : 'text-gray-400 hover:text-green-600'
        }`}
        title={agent.status === 'active' ? 'Deactivate' : 'Activate'}
      >
        {agent.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
      </button>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Agents</h1>
          <p className="text-gray-600">View and manage agent accounts and performance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{agents.length}</div>
          <div className="text-sm text-gray-600">Total Agents</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {agents.filter(a => a.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {agents.filter(a => a.status === 'inactive').length}
          </div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {agents.reduce((sum, agent) => sum + agent.clientsAssigned, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Assignments</div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredAgents}
        onRowClick={handleViewAgent}
        actions={actionButtons}
      />

      {/* Agent Details Modal */}
      {selectedAgent && (
        <Modal
          isOpen={showAgentModal}
          onClose={() => setShowAgentModal(false)}
          title="Agent Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.email}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.phone}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">{selectedAgent.status}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Join Date:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {new Date(selectedAgent.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Performance</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Clients Assigned:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.clientsAssigned}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Notes This Month:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.performance.notesThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Calls This Month:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.performance.callsThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Meetings This Month:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.performance.meetingsThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Last Login:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAgent.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => window.open(`mailto:${selectedAgent.email}`)}
                className="btn-secondary"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </button>
              <button
                onClick={() => handleToggleStatus(selectedAgent)}
                className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                  selectedAgent.status === 'active'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {selectedAgent.status === 'active' ? (
                  <>
                    <UserX className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Agent Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Agent"
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" className="input-field" placeholder="Enter full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="input-field" placeholder="Enter email address" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" className="input-field" placeholder="Enter phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="input-field">
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Agent
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageAgents 