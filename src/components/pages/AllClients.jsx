import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Edit, Eye, Phone, Mail, Trash2, UserCheck } from 'lucide-react'
import Table from '../ui/Table'
import Modal from '../ui/Modal'
import toast from 'react-hot-toast'

const AllClients = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [agentFilter, setAgentFilter] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data - in real app, this would come from API
  const clients = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      company: 'Tech Corp',
      status: 'client',
      priority: 'high',
      assignedAgent: 'Agent User',
      lastContact: '2024-01-15',
      source: 'Referral',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 234-5678',
      company: 'Design Studio',
      status: 'prospect',
      priority: 'medium',
      assignedAgent: 'Jane Agent',
      lastContact: '2024-01-14',
      source: 'Website',
      createdDate: '2024-01-02'
    },
    // More mock data...
  ]

  const agents = ['Agent User', 'Jane Agent', 'Bob Agent', 'Alice Agent']

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (_, client) => (
        <div>
          <div className="font-medium text-gray-900">
            {client.firstName} {client.lastName}
          </div>
          <div className="text-sm text-gray-500">{client.company}</div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contact',
      render: (_, client) => (
        <div>
          <div className="text-sm text-gray-900">{client.email}</div>
          <div className="text-sm text-gray-500">{client.phone}</div>
        </div>
      )
    },
    {
      key: 'assignedAgent',
      label: 'Assigned Agent',
      sortable: true,
      render: (agent) => (
        <div className="flex items-center">
          <UserCheck className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{agent}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => {
        const statusColors = {
          lead: 'bg-yellow-100 text-yellow-800',
          prospect: 'bg-blue-100 text-blue-800',
          client: 'bg-green-100 text-green-800',
          inactive: 'bg-gray-100 text-gray-800'
        }
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      }
    },
    {
      key: 'createdDate',
      label: 'Created',
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    }
  ]

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || client.status === statusFilter
    const matchesAgent = !agentFilter || client.assignedAgent === agentFilter
    
    return matchesSearch && matchesStatus && matchesAgent
  })

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setShowClientModal(true)
  }

  const handleEditClient = (client) => {
    navigate(`/edit-client/${client.id}`)
  }

  const handleDeleteClient = (client) => {
    setSelectedClient(client)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    toast.success(`Client ${selectedClient.firstName} ${selectedClient.lastName} deleted`)
    setShowDeleteModal(false)
    setSelectedClient(null)
  }

  const handleContactClient = (client, method) => {
    if (method === 'email') {
      window.open(`mailto:${client.email}`)
    } else if (method === 'phone') {
      window.open(`tel:${client.phone}`)
    }
    toast.success(`Contacted ${client.firstName} ${client.lastName}`)
  }

  const actionButtons = (client) => (
    <>
      <button
        onClick={() => handleViewClient(client)}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleEditClient(client)}
        className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
        title="Edit Client"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleContactClient(client, 'email')}
        className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleContactClient(client, 'phone')}
        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
        title="Call Client"
      >
        <Phone className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleDeleteClient(client)}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
        title="Delete Client"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Clients</h1>
          <p className="text-gray-600">Manage all clients in the system</p>
        </div>
        <button
          onClick={() => navigate('/add-client')}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Statuses</option>
              <option value="lead">Lead</option>
              <option value="prospect">Prospect</option>
              <option value="client">Client</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Agent Filter */}
          <div className="lg:w-48">
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
          <div className="text-sm text-gray-600">Total Clients</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'client').length}
          </div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {clients.filter(c => c.status === 'prospect').length}
          </div>
          <div className="text-sm text-gray-600">Prospects</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {clients.filter(c => c.status === 'lead').length}
          </div>
          <div className="text-sm text-gray-600">Leads</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {clients.filter(c => c.status === 'inactive').length}
          </div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredClients}
        searchTerm={searchTerm}
        onRowClick={handleViewClient}
        actions={actionButtons}
      />

      {/* Client Details Modal */}
      {selectedClient && (
        <Modal
          isOpen={showClientModal}
          onClose={() => setShowClientModal(false)}
          title="Client Details"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedClient.firstName} {selectedClient.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.company}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned Agent</label>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.assignedAgent}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedClient.status}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleContactClient(selectedClient, 'email')}
                className="btn-secondary"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </button>
              <button
                onClick={() => handleContactClient(selectedClient, 'phone')}
                className="btn-secondary"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </button>
              <button
                onClick={() => handleEditClient(selectedClient)}
                className="btn-primary"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedClient && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Client"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong>{selectedClient.firstName} {selectedClient.lastName}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AllClients 