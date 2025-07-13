import React, { useState } from 'react'
import { Search, Filter, Eye, Phone, Mail, MapPin, Building } from 'lucide-react'
import Table from '../ui/Table'
import Modal from '../ui/Modal'

const SearchClient = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    industry: '',
    priority: '',
    dateRange: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)

  // Mock data
  const allClients = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      company: 'Tech Corp',
      address: '123 Main St, New York, NY',
      status: 'client',
      priority: 'high',
      source: 'Referral',
      industry: 'Technology',
      assignedAgent: 'Agent User',
      lastContact: '2024-01-15',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 234-5678',
      company: 'Design Studio',
      address: '456 Oak Ave, Los Angeles, CA',
      status: 'prospect',
      priority: 'medium',
      source: 'Website',
      industry: 'Design',
      assignedAgent: 'Jane Agent',
      lastContact: '2024-01-14',
      createdDate: '2024-01-02'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 345-6789',
      company: 'Marketing Inc',
      address: '789 Pine St, Chicago, IL',
      status: 'lead',
      priority: 'low',
      source: 'Social Media',
      industry: 'Marketing',
      assignedAgent: 'Bob Agent',
      lastContact: '2024-01-13',
      createdDate: '2024-01-03'
    },
    // Add more mock data...
  ]

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
      key: 'contact',
      label: 'Contact Info',
      render: (_, client) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <Mail className="h-3 w-3 mr-1" />
            {client.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {client.phone}
          </div>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (_, client) => (
        <div className="text-sm text-gray-600 flex items-center">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{client.address}</span>
        </div>
      )
    },
    {
      key: 'industry',
      label: 'Industry',
      sortable: true,
      render: (industry) => (
        <div className="flex items-center text-sm text-gray-600">
          <Building className="h-3 w-3 mr-1" />
          {industry}
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
    }
  ]

  const filteredClients = allClients.filter(client => {
    // Text search
    const matchesSearch = !searchTerm || 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())

    // Filters
    const matchesStatus = !filters.status || client.status === filters.status
    const matchesSource = !filters.source || client.source === filters.source
    const matchesIndustry = !filters.industry || client.industry === filters.industry
    const matchesPriority = !filters.priority || client.priority === filters.priority

    return matchesSearch && matchesStatus && matchesSource && matchesIndustry && matchesPriority
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      status: '',
      source: '',
      industry: '',
      priority: '',
      dateRange: ''
    })
  }

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setShowClientModal(true)
  }

  const actionButtons = (client) => (
    <button
      onClick={() => handleViewClient(client)}
      className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
      title="View Details"
    >
      <Eye className="h-4 w-4" />
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search Clients</h1>
        <p className="text-gray-600">Find and view client information across the database</p>
      </div>

      {/* Search and Filters */}
      <div className="card space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, company, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center ${showFilters ? 'bg-primary-50 text-primary-700' : ''}`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Statuses</option>
                  <option value="lead">Lead</option>
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Sources</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div>
          <span className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredClients.length}</span> of{' '}
            <span className="font-medium">{allClients.length}</span> clients
          </span>
        </div>
        {(searchTerm || Object.values(filters).some(f => f)) && (
          <div className="text-sm text-gray-600">
            Active filters: {searchTerm && 'Search'} {Object.values(filters).filter(f => f).length > 0 && `${Object.values(filters).filter(f => f).length} filters`}
          </div>
        )}
      </div>

      {/* Results Table */}
      <Table
        columns={columns}
        data={filteredClients}
        onRowClick={handleViewClient}
        actions={actionButtons}
        itemsPerPage={15}
      />

      {/* Client Details Modal */}
      {selectedClient && (
        <Modal
          isOpen={showClientModal}
          onClose={() => setShowClientModal(false)}
          title="Client Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedClient.firstName} {selectedClient.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.email}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.phone}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Address:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Business Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Company:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.company}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Industry:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.industry}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">{selectedClient.status}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Priority:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">{selectedClient.priority}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Source:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.source}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Assigned Agent:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedClient.assignedAgent}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => window.open(`mailto:${selectedClient.email}`)}
                className="btn-secondary"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </button>
              <button
                onClick={() => window.open(`tel:${selectedClient.phone}`)}
                className="btn-secondary"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SearchClient 