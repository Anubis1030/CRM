import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, UserPlus, FileText, Calendar, TrendingUp, Activity } from 'lucide-react'
import { useAuth } from '../../App'
import StatsCard from '../ui/StatsCard'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Mock data - in real app, this would come from API
  const agentStats = {
    myClients: 15,
    todayVisits: 3,
    pendingNotes: 2,
    thisWeekClients: 5
  }

  const adminStats = {
    totalClients: 287,
    totalAgents: 12,
    newToday: 8,
    activeAgents: 9
  }

  const recentActivity = [
    { id: 1, action: 'New client added', client: 'John Smith', time: '2 hours ago' },
    { id: 2, action: 'Visit note updated', client: 'Sarah Johnson', time: '4 hours ago' },
    { id: 3, action: 'Client contacted', client: 'Mike Wilson', time: '6 hours ago' },
  ]

  const quickActions = user?.role === 'admin' ? [
    { title: 'Add New Client', description: 'Register a new client', path: '/add-client', icon: UserPlus },
    { title: 'Manage Agents', description: 'View and manage agents', path: '/manage-agents', icon: Users },
    { title: 'View Reports', description: 'Analytics and insights', path: '/reports', icon: TrendingUp },
  ] : [
    { title: 'Add New Client', description: 'Register a new client', path: '/add-client', icon: UserPlus },
    { title: 'My Clients', description: 'View assigned clients', path: '/my-clients', icon: Users },
    { title: 'Add Visit Notes', description: 'Update client notes', path: '/visit-notes', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your {user?.role === 'admin' ? 'CRM system' : 'clients'} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === 'admin' ? (
          <>
            <StatsCard
              title="Total Clients"
              value={adminStats.totalClients}
              icon={Users}
              change="12% this month"
              changeType="positive"
              color="primary"
            />
            <StatsCard
              title="Active Agents"
              value={adminStats.activeAgents}
              icon={Activity}
              change="3 online now"
              changeType="positive"
              color="green"
            />
            <StatsCard
              title="New Today"
              value={adminStats.newToday}
              icon={Calendar}
              change="2 more than yesterday"
              changeType="positive"
              color="blue"
            />
            <StatsCard
              title="Total Agents"
              value={adminStats.totalAgents}
              icon={Users}
              change="1 added this week"
              changeType="positive"
              color="purple"
            />
          </>
        ) : (
          <>
            <StatsCard
              title="My Clients"
              value={agentStats.myClients}
              icon={Users}
              change="2 new this week"
              changeType="positive"
              color="primary"
            />
            <StatsCard
              title="Today's Visits"
              value={agentStats.todayVisits}
              icon={Calendar}
              change="On schedule"
              changeType="neutral"
              color="green"
            />
            <StatsCard
              title="Pending Notes"
              value={agentStats.pendingNotes}
              icon={FileText}
              change="2 overdue"
              changeType="negative"
              color="orange"
            />
            <StatsCard
              title="This Week"
              value={agentStats.thisWeekClients}
              icon={TrendingUp}
              change="3 more than last week"
              changeType="positive"
              color="blue"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group text-left"
                >
                  <action.icon className="h-8 w-8 text-primary-600 mb-3 group-hover:text-primary-700" />
                  <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.client}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all activity
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 