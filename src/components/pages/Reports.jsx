import React, { useState } from 'react'
import { Download, Calendar, TrendingUp, Users, FileText, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Reports = () => {
  const [dateRange, setDateRange] = useState('30')
  const [reportType, setReportType] = useState('overview')

  // Mock data for charts
  const clientsData = [
    { month: 'Jan', leads: 45, prospects: 32, clients: 28 },
    { month: 'Feb', leads: 52, prospects: 38, clients: 31 },
    { month: 'Mar', leads: 48, prospects: 42, clients: 35 },
    { month: 'Apr', leads: 61, prospects: 45, clients: 38 },
    { month: 'May', leads: 55, prospects: 48, clients: 42 },
    { month: 'Jun', leads: 67, prospects: 52, clients: 45 }
  ]

  const agentPerformance = [
    { name: 'Agent User', clients: 15, notes: 24, calls: 12 },
    { name: 'Jane Agent', clients: 12, notes: 18, calls: 9 },
    { name: 'Bob Agent', clients: 8, notes: 5, calls: 3 },
    { name: 'Alice Agent', clients: 18, notes: 32, calls: 15 }
  ]

  const sourceData = [
    { name: 'Website', value: 35, color: '#3b82f6' },
    { name: 'Referral', value: 28, color: '#10b981' },
    { name: 'Social Media', value: 20, color: '#f59e0b' },
    { name: 'Cold Call', value: 12, color: '#ef4444' },
    { name: 'Advertisement', value: 5, color: '#8b5cf6' }
  ]

  const handleExport = (type) => {
    // Simulate export functionality
    const fileName = `report_${type}_${new Date().toISOString().split('T')[0]}.csv`
    console.log(`Exporting ${fileName}`)
    toast.success(`${type} report exported successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your CRM performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field w-40"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="btn-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">287</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <p className="text-sm text-green-600">+5% from last month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+18% from last month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,280</p>
              <p className="text-sm text-green-600">+23% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Pipeline */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Client Pipeline</h3>
            <button
              onClick={() => handleExport('pipeline')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#fbbf24" />
              <Bar dataKey="prospects" fill="#3b82f6" />
              <Bar dataKey="clients" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Leads</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Prospects</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Clients</span>
            </div>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Lead Sources</h3>
            <button
              onClick={() => handleExport('sources')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {sourceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Agent Performance</h3>
          <button
            onClick={() => handleExport('agents')}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={agentPerformance} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="clients" fill="#3b82f6" />
            <Bar dataKey="notes" fill="#10b981" />
            <Bar dataKey="calls" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Clients</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Notes</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Calls</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('clients')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Client Report</div>
            <div className="text-xs text-gray-500">Export all client data</div>
          </button>
          <button
            onClick={() => handleExport('notes')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Notes Report</div>
            <div className="text-xs text-gray-500">Export all visit notes</div>
          </button>
          <button
            onClick={() => handleExport('performance')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Performance Report</div>
            <div className="text-xs text-gray-500">Export agent metrics</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports 