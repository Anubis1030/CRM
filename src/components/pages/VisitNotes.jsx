import React, { useState } from 'react'
import { Save, Search, Plus, FileText, Clock, User } from 'lucide-react'
import toast from 'react-hot-toast'

const VisitNotes = () => {
  const [selectedClient, setSelectedClient] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [visitType, setVisitType] = useState('phone')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real app, this would come from API
  const myClients = [
    { id: 1, name: 'John Smith', company: 'Tech Corp' },
    { id: 2, name: 'Sarah Johnson', company: 'Design Studio' },
    { id: 3, name: 'Mike Wilson', company: 'Marketing Inc' },
  ]

  const recentNotes = [
    {
      id: 1,
      clientName: 'John Smith',
      type: 'phone',
      content: 'Discussed new service requirements. Client interested in premium package.',
      date: '2024-01-15 10:30 AM',
      duration: '30 min'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      type: 'meeting',
      content: 'Follow-up meeting. Reviewed proposal details and pricing.',
      date: '2024-01-14 2:00 PM',
      duration: '45 min'
    },
    {
      id: 3,
      clientName: 'Mike Wilson',
      type: 'email',
      content: 'Sent product information and scheduled next call.',
      date: '2024-01-13 11:15 AM',
      duration: '15 min'
    },
  ]

  const filteredClients = myClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedClient || !noteContent.trim()) {
      toast.error('Please select a client and add note content')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Visit note saved successfully!')
      setNoteContent('')
      setSelectedClient('')
      setLoading(false)
    }, 1000)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'phone': return '📞'
      case 'meeting': return '🤝'
      case 'email': return '📧'
      case 'other': return '📝'
      default: return '📝'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'phone': return 'bg-blue-100 text-blue-800'
      case 'meeting': return 'bg-green-100 text-green-800'
      case 'email': return 'bg-purple-100 text-purple-800'
      case 'other': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visit Notes</h1>
        <p className="text-gray-600">Add and manage client interaction notes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Note Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center mb-6">
              <Plus className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Add New Note</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Client *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10 mb-2"
                  />
                </div>
                
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Choose a client</option>
                  {filteredClients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interaction Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['phone', 'meeting', 'email', 'other'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="visitType"
                        value={type}
                        checked={visitType === type}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {getTypeIcon(type)} {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes *
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                  className="input-field"
                  placeholder="Enter detailed notes about the interaction..."
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  {noteContent.length}/1000 characters
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Recent Notes */}
        <div>
          <div className="card">
            <div className="flex items-center mb-6">
              <FileText className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Recent Notes</h3>
            </div>

            <div className="space-y-4">
              {recentNotes.map(note => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{note.clientName}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(note.type)}`}>
                          {getTypeIcon(note.type)} {note.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {note.date}
                    </div>
                    <div>{note.duration}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Notes
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <FileText className="h-5 w-5 text-gray-400 ml-2" />
          </div>
          <div className="text-sm text-gray-600">Notes This Month</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <span className="text-lg ml-2">📞</span>
          </div>
          <div className="text-sm text-gray-600">Phone Calls</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <span className="text-lg ml-2">🤝</span>
          </div>
          <div className="text-sm text-gray-600">Meetings</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <span className="text-lg ml-2">📧</span>
          </div>
          <div className="text-sm text-gray-600">Email Follow-ups</div>
        </div>
      </div>
    </div>
  )
}

export default VisitNotes 