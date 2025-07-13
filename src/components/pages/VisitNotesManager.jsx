import React, { useState } from 'react'
import { Search, Filter, Eye, Trash2, FileText, User, Calendar } from 'lucide-react'
import Table from '../ui/Table'
import Modal from '../ui/Modal'
import toast from 'react-hot-toast'

const VisitNotesManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [agentFilter, setAgentFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data
  const allNotes = [
    {
      id: 1,
      clientName: 'John Smith',
      agentName: 'Agent User',
      type: 'phone',
      content: 'Discussed new service requirements. Client interested in premium package and wants to schedule a demo next week.',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '30 min',
      clientId: 1,
      agentId: 1
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      agentName: 'Jane Agent',
      type: 'meeting',
      content: 'Follow-up meeting. Reviewed proposal details and pricing. Client needs time to discuss with team before making decision.',
      date: '2024-01-14',
      time: '2:00 PM',
      duration: '45 min',
      clientId: 2,
      agentId: 2
    },
    {
      id: 3,
      clientName: 'Mike Wilson',
      agentName: 'Bob Agent',
      type: 'email',
      content: 'Sent product information and scheduled next call. Client responded positively to initial proposal.',
      date: '2024-01-13',
      time: '11:15 AM',
      duration: '15 min',
      clientId: 3,
      agentId: 3
    },
  ]

  const agents = ['Agent User', 'Jane Agent', 'Bob Agent', 'Alice Agent']

  const columns = [
    {
      key: 'clientName',
      label: 'Client',
      sortable: true,
      render: (clientName) => (
        <div className="font-medium text-gray-900">{clientName}</div>
      )
    },
    {
      key: 'agentName',
      label: 'Agent',
      sortable: true,
      render: (agentName) => (
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-3 w-3 mr-1" />
          {agentName}
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (type) => {
        const typeColors = {
          phone: 'bg-blue-100 text-blue-800',
          meeting: 'bg-green-100 text-green-800',
          email: 'bg-purple-100 text-purple-800',
          other: 'bg-gray-100 text-gray-800'
        }
        const typeIcons = {
          phone: '📞',
          meeting: '🤝',
          email: '📧',
          other: '📝'
        }
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeColors[type]}`}>
            {typeIcons[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )
      }
    },
    {
      key: 'content',
      label: 'Note Preview',
      render: (content) => (
        <div className="text-sm text-gray-600 max-w-xs truncate">
          {content}
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date & Time',
      sortable: true,
      render: (_, note) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(note.date).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">{note.time}</div>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      render: (duration) => (
        <div className="text-sm text-gray-600">{duration}</div>
      )
    }
  ]

  const filteredNotes = allNotes.filter(note => {
    const matchesSearch = !searchTerm || 
      note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAgent = !agentFilter || note.agentName === agentFilter
    const matchesType = !typeFilter || note.type === typeFilter
    const matchesDate = !dateFilter || note.date.includes(dateFilter)
    
    return matchesSearch && matchesAgent && matchesType && matchesDate
  })

  const handleViewNote = (note) => {
    setSelectedNote(note)
    setShowNoteModal(true)
  }

  const handleDeleteNote = (note) => {
    setSelectedNote(note)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    toast.success('Note deleted successfully')
    setShowDeleteModal(false)
    setSelectedNote(null)
  }

  const actionButtons = (note) => (
    <>
      <button
        onClick={() => handleViewNote(note)}
        className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
        title="View Note"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleDeleteNote(note)}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
        title="Delete Note"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visit Notes Manager</h1>
        <p className="text-gray-600">View and manage all client interaction notes across agents</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client or note content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Agent Filter */}
          <div>
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

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="phone">Phone</option>
              <option value="meeting">Meeting</option>
              <option value="email">Email</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{allNotes.length}</div>
          <div className="text-sm text-gray-600">Total Notes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {allNotes.filter(n => n.type === 'phone').length}
          </div>
          <div className="text-sm text-gray-600">Phone Calls</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {allNotes.filter(n => n.type === 'meeting').length}
          </div>
          <div className="text-sm text-gray-600">Meetings</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {allNotes.filter(n => n.type === 'email').length}
          </div>
          <div className="text-sm text-gray-600">Emails</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">
            {allNotes.filter(n => n.date === new Date().toISOString().split('T')[0]).length}
          </div>
          <div className="text-sm text-gray-600">Today</div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredNotes}
        onRowClick={handleViewNote}
        actions={actionButtons}
        itemsPerPage={15}
      />

      {/* Note Details Modal */}
      {selectedNote && (
        <Modal
          isOpen={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          title="Note Details"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <p className="mt-1 text-sm text-gray-900">{selectedNote.clientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Agent</label>
                <p className="mt-1 text-sm text-gray-900">{selectedNote.agentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedNote.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <p className="mt-1 text-sm text-gray-900">{selectedNote.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedNote.date).toLocaleDateString()} at {selectedNote.time}
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">{selectedNote.content}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleDeleteNote(selectedNote)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Note
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedNote && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Note"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this note for <strong>{selectedNote.clientName}</strong>? 
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

export default VisitNotesManager 