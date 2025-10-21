import React from 'react';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../hooks/useData';
import { Users, BookOpen, Award, DollarSign, TrendingUp, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const systemLogs = [
    { id: 1, type: 'info', message: 'User registration completed', timestamp: '2 minutes ago', user: 'john.doe@example.com' },
    { id: 2, type: 'warning', message: 'High server load detected', timestamp: '15 minutes ago', user: 'System' },
    { id: 3, type: 'success', message: 'Course published successfully', timestamp: '1 hour ago', user: 'instructor@example.com' },
    { id: 4, type: 'error', message: 'Payment processing failed', timestamp: '2 hours ago', user: 'user@example.com' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2250%22 height=%2250%22 viewBox=%220 0 50 50%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.08%22%3E%3Cpath d=%22M25 0L50 25L25 50L0 25z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Monitor system health and manage platform operations
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">System Status: Healthy</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">+{analytics?.monthlyGrowth}% Growth</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analytics?.totalUsers || 0}
          change={analytics?.monthlyGrowth}
          icon={<Users className="h-8 w-8" />}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800"
        />
        <StatCard
          title="Active Courses"
          value={analytics?.activeCourses || 0}
          change={15}
          icon={<BookOpen className="h-8 w-8" />}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800"
        />
        <StatCard
          title="Certificates Issued"
          value={analytics?.certificatesIssued || 0}
          change={22}
          icon={<Award className="h-8 w-8" />}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(analytics?.totalRevenue || 0).toLocaleString()}`}
          change={18}
          icon={<DollarSign className="h-8 w-8" />}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <div className="xl:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                User Growth Analytics
              </h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  7d
                </Button>
                <Button variant="ghost" size="sm">
                  30d
                </Button>
                <Button variant="primary" size="sm">
                  90d
                </Button>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            <div className="h-80 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-6 flex items-end justify-between">
              {analytics?.userGrowth.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-1000 hover:from-blue-600 hover:to-purple-600"
                  style={{
                    height: `${(value / Math.max(...analytics.userGrowth)) * 100}%`,
                    width: '6%',
                    animationDelay: `${index * 100}ms`,
                    animation: 'growUp 1s ease-out forwards'
                  }}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </Card>
        </div>

        {/* System Overview */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card glassmorphic className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="neumorphic" className="w-full justify-start">
                <Users className="h-5 w-5 mr-3" />
                Manage Users
              </Button>
              <Button variant="neumorphic" className="w-full justify-start">
                <BookOpen className="h-5 w-5 mr-3" />
                Review Courses
              </Button>
              <Button variant="neumorphic" className="w-full justify-start">
                <Activity className="h-5 w-5 mr-3" />
                System Health
              </Button>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Database</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">API Server</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">CDN</span>
                </div>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">Degraded</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* System Logs */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent System Logs
            </h3>
            <Button variant="secondary" size="sm">
              View All Logs
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {systemLogs.map((log, index) => (
                <tr 
                  key={log.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                      log.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                      log.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {log.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-500">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};