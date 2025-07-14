import React, { useState } from 'react'
import { Search, AlertTriangle, Merge, Trash2, Eye } from 'lucide-react'
import Table from '../ui/Table'
import Modal from '../ui/Modal'
import toast from 'react-hot-toast'

const DuplicateChecker = () => {
  const [threshold, setThreshold] = useState('high')
  const [selectedPair, setSelectedPair] = useState(null)
  const [showMergeModal, setShowMergeModal] = useState(false)

  // Mock duplicate data jdndjn 
  const duplicates = [
    {
      id: 1,
      similarity: 95,
      clients: [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '(555) 123-4567',
          company: 'Tech Corp'
        },
        {
          id: 2,
          name: 'John Smith',
          email: 'j.smith@techcorp.com',
          phone: '(555) 123-4567',
          company: 'Tech Corp'
        }
      ],
      matchingFields: ['name', 'phone', 'company'],
      riskLevel: 'high'
    },
    {
      id: 2,
      similarity: 85,
      clients: [
        {
          id: 3,
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '(555) 234-5678',
          company: 'Design Studio'
        },
        {
          id: 4,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@design.com',
          phone: '(555) 234-5679',
          company: 'Design Studio Inc'
        }
      ],
      matchingFields: ['name', 'company'],
      riskLevel: 'medium'
    }
  ]

  const columns = [
    {
      key: 'similarity',
      label: 'Match %',
      sortable: true,
      render: (similarity, pair) => (
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            pair.riskLevel === 'high' ? 'bg-red-500' :
            pair.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}></div>
          <span className="font-medium">{similarity}%</span>
        </div>
      )
    },
    {
      key: 'clients',
      label: 'Potential Duplicates',
      render: (clients) => (
        <div className="space-y-2">
          {clients.map((client, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium text-gray-900">{client.name}</div>
              <div className="text-gray-500">{client.email} • {client.company}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'matchingFields',
      label: 'Matching Fields',
      render: (fields) => (
        <div className="flex flex-wrap gap-1">
          {fields.map(field => (
            <span key={field} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {field}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'riskLevel',
      label: 'Risk Level',
      sortable: true,
      render: (level) => {
        const colors = {
          high: 'bg-red-100 text-red-800',
          medium: 'bg-yellow-100 text-yellow-800',
          low: 'bg-green-100 text-green-800'
        }
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[level]}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        )
      }
    }
  ]

  const filteredDuplicates = duplicates.filter(duplicate => {
    if (threshold === 'high') return duplicate.riskLevel === 'high'
    if (threshold === 'medium') return ['high', 'medium'].includes(duplicate.riskLevel)
    return true // 'all'
  })

  const handleMerge = (pair) => {
    setSelectedPair(pair)
    setShowMergeModal(true)
  }

  const handleDelete = (pair) => {
    toast.success('Duplicate client removed')
  }

  const confirmMerge = () => {
    toast.success('Clients merged successfully')
    setShowMergeModal(false)
    setSelectedPair(null)
  }

  const actionButtons = (pair) => (
    <>
      <button
        onClick={() => handleMerge(pair)}
        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
        title="Merge Records"
      >
        <Merge className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleDelete(pair)}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
        title="Remove Duplicate"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Duplicate Checker</h1>
        <p className="text-gray-600">Identify and manage potential duplicate client records</p>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detection Threshold
            </label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="input-field w-48"
            >
              <option value="high">High Risk Only (90%+)</option>
              <option value="medium">Medium & High (75%+)</option>
              <option value="all">All Potential Matches</option>
            </select>
          </div>
          
          <button className="btn-primary">
            <Search className="h-4 w-4 mr-2" />
            Scan for Duplicates
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {duplicates.filter(d => d.riskLevel === 'high').length}
          </div>
          <div className="text-sm text-gray-600">High Risk</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {duplicates.filter(d => d.riskLevel === 'medium').length}
          </div>
          <div className="text-sm text-gray-600">Medium Risk</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {duplicates.filter(d => d.riskLevel === 'low').length}
          </div>
          <div className="text-sm text-gray-600">Low Risk</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {duplicates.length}
          </div>
          <div className="text-sm text-gray-600">Total Found</div>
        </div>
      </div>

      {/* Alert */}
      {filteredDuplicates.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Potential Duplicates Found
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                We found {filteredDuplicates.length} potential duplicate records. 
                Review these carefully and merge or remove duplicates to maintain data integrity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <Table
        columns={columns}
        data={filteredDuplicates}
        actions={actionButtons}
        itemsPerPage={10}
      />

      {/* Merge Modal */}
      {selectedPair && (
        <Modal
          isOpen={showMergeModal}
          onClose={() => setShowMergeModal(false)}
          title="Merge Client Records"
          size="lg"
        >
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning: This action cannot be undone
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Merging will combine the information from both records. Choose which information to keep.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {selectedPair.clients.map((client, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Record {index + 1}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 text-gray-900">{client.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 text-gray-900">{client.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2 text-gray-900">{client.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Company:</span>
                      <span className="ml-2 text-gray-900">{client.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowMergeModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmMerge}
                className="btn-primary"
              >
                <Merge className="h-4 w-4 mr-2" />
                Merge Records
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default DuplicateChecker 